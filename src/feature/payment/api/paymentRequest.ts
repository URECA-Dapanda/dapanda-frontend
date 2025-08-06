import axios from "@lib/axios";
import type { ScrapCombination } from "@feature/payment/types/paymentTypes";
// 통합/분할 구매
export const postDefaultTrade = async ({
  productId,
  mobileDataId,
  dataAmount,
}: {
  productId: number;
  mobileDataId: number;
  dataAmount?: number;
}) => {
  const payload = {
    productId,
    mobileDataId,
    dataAmount: dataAmount ?? null,
  };
  console.log("구매요청 api호출:", payload);
  const res = await axios.post("/api/trades/mobile-data/default", payload);
  return res.data.data.tradeId;
};
// 자투리 구매
export const postScrapTrade = async ({
  totalAmount,
  totalPrice,
  combinations,
}: {
  totalAmount: number;
  totalPrice: number;
  combinations: ScrapCombination[];
}) => {
  const res = await axios.post("/api/trades/mobile-data/scrap", {
    totalAmount,
    totalPrice,
    combinations,
  });
  console.log("자투리구매 api 호출", combinations);
  return res.data.data.tradeId;
};

// 와이파이 구매
export const postWifiTrade = async ({
  productId,
  wifiId,
  startTime,
  endTime,
}: {
  productId: number;
  wifiId: number;
  startTime: string;
  endTime: string;
}): Promise<number> => {
  const res = await axios.post("/api/trades/wifi", {
    productId,
    wifiId,
    startTime,
    endTime,
  });
  if (res.data.code !== 0) {
    throw new Error(res.data.message || "와이파이 결제 실패");
  }

  return res.data.data.tradeId;
};
