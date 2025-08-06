import {
    getDataList,
    getDataDetail,
    postMobileDataProduct,
    getPriceRecommendation,
    deleteDataPost,
    putMobileDataProduct,
    getBuyingDataAmount,
    getSellingDataAmount,
} from "@/feature/data/api/dataRequest";
import { server } from "@/mocks/server";
import { rest } from "msw";
import "@testing-library/jest-dom";

describe("📦 dataRequest API functions", () => {
    const baseUrl = "http://localhost";

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("getDataList - 데이터를 정상적으로 반환", async () => {
        server.use(
            rest.get(`${baseUrl}/api/products/mobile-data`, (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json({
                        data: {
                            data: [
                                {
                                    productId: 1,
                                    price: 1000,
                                    itemId: 111,
                                    mobileDataId: 222,
                                    memberName: "홍길동",
                                    profileImageUrl: "",
                                    remainAmount: 1,
                                    purchaseAmount: 0,
                                    pricePer100MB: 1000,
                                    averageRate: 4.5,
                                    reviewCount: 10,
                                    myProduct: false,
                                    splitType: false,
                                    updatedAt: "2025-08-01T00:00:00",
                                },
                            ],
                            pageInfo: {
                                nextCursorId: 2,
                            },
                        },
                    })
                );
            })
        );

        const result = await getDataList({ pageParam: 1 });
        expect(result.items.length).toBeGreaterThan(0);
        expect(result.nextCursor).toBe(2);
    });

    it("getDataList - 서버 오류 시 빈 배열과 undefined 반환", async () => {
        server.use(
            rest.get(`${baseUrl}/api/products/mobile-data`, (req, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        const result = await getDataList({ pageParam: 1 });
        expect(result.items).toEqual([]);
        expect(result.nextCursor).toBeUndefined();
    });

    it("getDataDetail - 상품 상세를 정상적으로 반환", async () => {
        server.use(
            rest.get(`${baseUrl}/api/products/mobile-data/:productId`, (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json({
                        code: 0,
                        message: "성공",
                        data: {
                            productId: 1,
                            price: 1000,
                            itemId: 111,
                            mobileDataId: 222,
                            memberName: "홍길동",
                            profileImageUrl: "",
                            remainAmount: 1,
                            purchaseAmount: 0,
                            pricePer100MB: 1000,
                            averageRate: 4.5,
                            reviewCount: 10,
                            myProduct: false,
                            splitType: false,
                            updatedAt: "2025-08-01T00:00:00",
                            state: "ACTIVE",
                        },
                    })
                );
            })
        );

        const data = await getDataDetail("1");
        expect(data.productId).toBe(1);
    });

    it("getDataDetail - 존재하지 않는 productId 요청 시 에러 발생", async () => {
        server.use(
            rest.get(`${baseUrl}/api/products/mobile-data/:productId`, (req, res, ctx) => {
                return res(ctx.status(404), ctx.json({ code: 404, message: "상품을 찾을 수 없습니다" }));
            })
        );

        await expect(getDataDetail("999")).rejects.toThrow();
    });

    it("postMobileDataProduct - 등록 성공 시 응답 확인", async () => {
        server.use(
            rest.post(`${baseUrl}/api/products/mobile-data`, async (req, res, ctx) => {
                return res(ctx.status(200), ctx.json({ code: 0, message: "등록 성공" }));
            })
        );

        const res = await postMobileDataProduct(1, 1000, false);
        expect(res.code).toBe(0);
        expect(res.message).toBe("등록 성공");
    });
    it("postMobileDataProduct - 서버 오류 시 예외 발생", async () => {
        server.use(
          rest.post(`${baseUrl}/api/products/mobile-data`, (req, res, ctx) => {
            return res(ctx.status(500));
          })
        );
      
        await expect(postMobileDataProduct(1, 1000, false)).rejects.toThrow();
      });
      
    it("getPriceRecommendation - 가격 추천 조회 성공", async () => {
        server.use(
            rest.get(`${baseUrl}/api/products/market-price`, (req, res, ctx) => {
                return res(ctx.json({ data: { average: 8000, recent: 8500 } }));
            })
        );

        const data = await getPriceRecommendation();
        expect(data.average).toBe(8000);
        expect(data.recent).toBe(8500);
    });
    it("getPriceRecommendation - 응답 데이터 누락 시 예외 발생", async () => {
        server.use(
          rest.get(`${baseUrl}/api/products/market-price`, (req, res, ctx) => {
            return res(ctx.json({}));
          })
        );
      
        await expect(getPriceRecommendation()).rejects.toThrow();
      });
      
    it("deleteDataPost - 삭제 요청 시 메시지 반환", async () => {
        server.use(
            rest.delete(`${baseUrl}/api/products/:postId`, (req, res, ctx) => {
                return res(ctx.json({ message: "삭제 완료" }));
            })
        );

        const message = await deleteDataPost("1");
        expect(message).toBe("삭제 완료");
    });
    it("deleteDataPost - 삭제 실패 시 예외 발생", async () => {
        server.use(
          rest.delete(`${baseUrl}/api/products/:postId`, (req, res, ctx) => {
            return res(ctx.status(403), ctx.json({ message: "권한 없음" }));
          })
        );
      
        await expect(deleteDataPost("1")).rejects.toThrow();
      });
      
    it("putMobileDataProduct - 수정 성공 응답 확인", async () => {
        server.use(
            rest.put(`${baseUrl}/api/products/mobile-data`, (req, res, ctx) => {
                return res(ctx.json({ code: 0, message: "수정 완료" }));
            })
        );

        const res = await putMobileDataProduct({
            productId: 1,
            changedAmount: 1,
            price: 9000,
            isSplitType: false,
        });

        expect(res.message).toBe("수정 완료");
    });
    it("putMobileDataProduct - 유효하지 않은 요청 데이터 시 에러 발생", async () => {
        server.use(
          rest.put(`${baseUrl}/api/products/mobile-data`, (req, res, ctx) => {
            return res(ctx.status(400), ctx.json({ message: "입력값이 잘못되었습니다" }));
          })
        );
      
        await expect(
          putMobileDataProduct({ productId: 1, changedAmount: -5, price: -1000, isSplitType: false })
        ).rejects.toThrow();
      });
      
    it("getBuyingDataAmount - 구매 데이터 용량 반환", async () => {
        server.use(
            rest.get(`${baseUrl}/api/members/buying-data`, (req, res, ctx) => {
                return res(ctx.json({ data: { data: 1.5 } }));
            })
        );

        const result = await getBuyingDataAmount();
        expect(result).toBe(1.5);
    });

    it("getSellingDataAmount - 판매 데이터 용량 반환", async () => {
        server.use(
            rest.get(`${baseUrl}/api/members/selling-data`, (req, res, ctx) => {
                return res(ctx.json({ data: { data: 0.8 } }));
            })
        );

        const result = await getSellingDataAmount();
        expect(result).toBe(0.8);
    });
    it("getBuyingDataAmount - 서버 응답 오류 시 예외 발생", async () => {
        server.use(
          rest.get(`${baseUrl}/api/members/buying-data`, (req, res, ctx) => {
            return res(ctx.status(500));
          })
        );
      
        await expect(getBuyingDataAmount()).rejects.toThrow();
      });
      
      it("getSellingDataAmount - 서버 응답 오류 시 예외 발생", async () => {
        server.use(
          rest.get(`${baseUrl}/api/members/selling-data`, (req, res, ctx) => {
            return res(ctx.status(500));
          })
        );
      
        await expect(getSellingDataAmount()).rejects.toThrow();
      });
      
});
