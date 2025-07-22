import axios from "@lib/axios";
import type { ScrapCombination } from "@feature/payment/types/paymentTypes";
// 일반/자투리 구매 통합
export const postDefaultTrade = async (productId: number, mobileDataId: number, dataAmount?: number) => {
  const payload = {
    productId,
    mobileDataId,
    dataAmount: dataAmount ?? null,
  };
  const res = await axios.post("/api/trades/mobile-data/default", payload);
  return res.data.data.tradeId;
};

export const postScrapTrade = async (
  totalAmount: number,
  totalPrice: number,
  combinations: ScrapCombination[]
) => {
  const res = await axios.post("/api/trades/mobile-data/scrap", {
    totalAmount,
    totalPrice,
    combinations,
  });
  return res.data.data.tradeId;
};
