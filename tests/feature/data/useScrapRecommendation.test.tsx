import { renderHook, act } from "@testing-library/react";
import { useScrapRecommendation } from "@feature/data/hooks/useScrapRecommendation";
import { server } from "@/mocks/server";
import { rest } from "msw";
import { waitFor } from "@testing-library/react";

describe("🔁 useScrapRecommendation", () => {
  const baseUrl = "http://localhost";

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("search 호출 시 결과가 반영된다", async () => {
    // 정상 응답 mock 등록
    server.use(
      rest.get(`${baseUrl}/api/trades/mobile-data/scrap`, (req, res, ctx) => {
        return res(
          ctx.json({
            data: {
              combinations: [
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
              totalAmount: 1,
              totalPrice: 1000,
            },
          })
        );
      })
    );
  
    const { result } = renderHook(() => useScrapRecommendation());
  
    await act(async () => {
      await result.current.search();
    });
  
    expect(result.current.result.length).toBeGreaterThan(0);
    expect(result.current.summary.totalAmount).toBeGreaterThan(0);
  });
  

  it("API 실패 시 결과는 초기값으로 유지된다", async () => {
    server.use(
      rest.get(`${baseUrl}/api/trades/mobile-data/scrap`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const { result } = renderHook(() => useScrapRecommendation());

    await act(async () => {
      await result.current.search();
    });

    expect(result.current.result).toEqual([]);
    expect(result.current.summary.totalAmount).toBe(0);
  });

  it("search 호출 시 로딩 상태를 관리한다", async () => {
    let resolve: () => void;
    const promise = new Promise<void>((res) => (resolve = res));

    server.use(
      rest.get(`${baseUrl}/api/trades/mobile-data/scrap`, async (req, res, ctx) => {
        await promise; // 지연 발생
        return res(
          ctx.json({
            data: {
              combinations: [],
              totalAmount: 1,
              totalPrice: 1000,
            },
          })
        );
      })
    );

    const { result } = renderHook(() => useScrapRecommendation());

    act(() => {
      result.current.search();
    });

    // 🔥 여기서 기다려줘야 `loading = true` 반영됨
    await waitFor(() => {
      expect(result.current.loading).toBe(true);
    });

    // 지연된 응답을 마무리
    resolve!();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });
});
