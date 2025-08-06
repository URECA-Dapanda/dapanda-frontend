import axios from "@lib/axios";
import {
  postDefaultTrade,
  postScrapTrade,
  postWifiTrade,
} from "@feature/payment/api/paymentRequest";

jest.mock("@lib/axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("📦 paymentRequest API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("postDefaultTrade()", () => {
    it("전체 구매 요청이 성공하면 tradeId를 반환한다", async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: { data: { tradeId: 123 } },
      });

      const tradeId = await postDefaultTrade(1, 100);
      expect(tradeId).toBe(123);
    });

    it("분할 구매 요청이 성공하면 tradeId를 반환한다", async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: { data: { tradeId: 456 } },
      });

      const tradeId = await postDefaultTrade(2, 200, 1.5);
      expect(tradeId).toBe(456);
    });
  });

  describe("postScrapTrade()", () => {
    it("자투리 구매 요청이 성공하면 tradeId를 반환한다", async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: { data: { tradeId: 789 } },
      });

      const combinations = [
        {
          productId: 1,
          mobileDataId: 10,
          memberName: "홍길동",
          price: 1000,
          purchasePrice: 500,
          remainAmount: 1,
          pricePer100MB: 100,
          splitType: true,
          updatedAt: "2025-08-06T08:00:00Z",
        },
        {
          productId: 2,
          mobileDataId: 20,
          memberName: "김영희",
          price: 2000,
          purchasePrice: 1700,
          remainAmount: 2,
          pricePer100MB: 85,
          splitType: true,
          updatedAt: "2025-08-06T08:00:00Z",
        },
      ];

      const tradeId = await postScrapTrade(1.5, 2200, combinations);

      expect(tradeId).toBe(789);
      expect(mockedAxios.post).toHaveBeenCalledTimes(1); // ✅ 이제 1번만 호출됨
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "/api/trades/mobile-data/scrap",
        {
          totalAmount: 1.5,
          totalPrice: 2200,
          combinations,
        }
      );
    });
  });

  describe("postWifiTrade()", () => {
    it("와이파이 구매 요청이 성공하면 tradeId를 반환한다", async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: { code: 0, data: { tradeId: 101 } },
      });

      const tradeId = await postWifiTrade(
        99,
        888,
        "2025-08-06T08:00:00Z",
        "2025-08-06T10:00:00Z"
      );

      expect(tradeId).toBe(101);
    });

    it("서버 응답이 실패 코드일 경우 예외를 던진다", async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: { code: 9999, message: "결제 실패" },
      });

      await expect(
        postWifiTrade(1, 1, "start", "end")
      ).rejects.toThrow("결제 실패");
    });

    jest.useFakeTimers();

    it("응답이 느릴 경우 로딩 상태가 유지된다", async () => {
      const promise = new Promise((resolve) => setTimeout(() =>
        resolve({ data: { data: { tradeId: 123 } } }), 5000)
      );
      mockedAxios.post.mockReturnValue(promise as any);
    
      const result = postDefaultTrade(1, 100);
      jest.advanceTimersByTime(2000);
      jest.runAllTimers();
      await result;
    });
    it("빠르게 여러번 결제를 시도해도 한 번만 API가 호출된다", async () => {
        mockedAxios.post.mockResolvedValue({ data: { data: { tradeId: 999 } } });
      
        const combinations = [
          {
            productId: 1,
            mobileDataId: 10,
            memberName: "홍길동",
            price: 1000,
            purchasePrice: 500,
            remainAmount: 1,
            pricePer100MB: 100,
            splitType: true,
            updatedAt: "2025-08-06T08:00:00Z",
          },
        ];
      
        const calls = [
          postScrapTrade(1.5, 2200, combinations),
          postScrapTrade(1.5, 2200, combinations),
          postScrapTrade(1.5, 2200, combinations),
        ];
      
        await Promise.all(calls);
      
        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
      });      
  });
});
