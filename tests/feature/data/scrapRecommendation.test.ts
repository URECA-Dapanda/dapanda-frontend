import { getScrapRecommendation } from "@/feature/data/api/scrapRecommendation";
import { server } from "@/mocks/server";
import { rest } from "msw";

describe("🔍 getScrapRecommendation", () => {
  const baseUrl = "http://localhost";

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("정상적으로 자투리 조합을 반환한다", async () => {
    server.use(
      rest.get(`${baseUrl}/api/trades/mobile-data/scrap`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: {
              combinations: [
                {
                  productId: 1,
                  itemId: 101,
                  price: 1000,
                  mobileDataId: 200,
                  memberName: "유저",
                  profileImageUrl: "",
                  remainAmount: 0.5,
                  purchaseAmount: 0.1,
                  pricePer100MB: 1000,
                  averageRate: 5,
                  reviewCount: 0,
                  myProduct: false,
                  splitType: true,
                  updatedAt: "2025-08-01T00:00:00",
                },
              ],
              totalAmount: 1.0,
              totalPrice: 8500,
            },
          })
        );
      })
    );

    const result = await getScrapRecommendation(1);
    expect(result.items).toHaveLength(1);
    expect(result.summary.totalAmount).toBe(1.0);
    expect(result.summary.totalPrice).toBe(8500);
  });

  it("API 에러 시 빈 배열과 초기값 반환", async () => {
    server.use(
      rest.get(`${baseUrl}/api/trades/mobile-data/scrap`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const result = await getScrapRecommendation(1);
    expect(result.items).toEqual([]);
    expect(result.summary.totalAmount).toBe(0);
    expect(result.summary.totalPrice).toBe(0);
  });
  it("응답이 성공이지만 조합이 없을 경우 - 빈 배열 처리", async () => {
    server.use(
      rest.get(`${baseUrl}/api/trades/mobile-data/scrap`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: {
              combinations: [],
              totalAmount: 0,
              totalPrice: 0,
            },
          })
        );
      })
    );
  
    const result = await getScrapRecommendation(1);
    expect(result.items).toEqual([]);
    expect(result.summary.totalAmount).toBe(0);
  });
  it("응답에 totalAmount 또는 totalPrice가 누락된 경우 - 기본값 반환", async () => {
    server.use(
      rest.get(`${baseUrl}/api/trades/mobile-data/scrap`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: {
              combinations: [{ productId: 1, itemId: 1, price: 1000, mobileDataId: 1, memberName: "", profileImageUrl: "", remainAmount: 0.1, purchaseAmount: 0, pricePer100MB: 1000, averageRate: 0, reviewCount: 0, myProduct: false, splitType: true, updatedAt: "2025-08-01T00:00:00" }],
              totalAmount: undefined,
              totalPrice: null,
            },
          })
        );
      })
    );
  
    const result = await getScrapRecommendation(1);
    expect(result.summary.totalAmount).toBe(0);
    expect(result.summary.totalPrice).toBe(0);
  });
  it("응답 구조가 잘못된 경우 - 예외 처리", async () => {
    server.use(
      rest.get(`${baseUrl}/api/trades/mobile-data/scrap`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ wrong: "structure" }));
      })
    );
  
    const result = await getScrapRecommendation(1);
    expect(result.items).toEqual([]);
    expect(result.summary.totalAmount).toBe(0);
    expect(result.summary.totalPrice).toBe(0);
  });
  it("요청 파라미터가 0일 경우에도 API 호출 시도", async () => {
    let capturedAmount = -1;
    server.use(
      rest.get(`${baseUrl}/api/trades/mobile-data/scrap`, (req, res, ctx) => {
        capturedAmount = Number(req.url.searchParams.get("dataAmount"));
        return res(ctx.status(200), ctx.json({ data: { combinations: [], totalAmount: 0, totalPrice: 0 } }));
      })
    );
  
    const result = await getScrapRecommendation(0);
    expect(capturedAmount).toBe(0);
    expect(result.items).toEqual([]);
  });
  
});
