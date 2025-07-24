import axios from "@lib/axios";
import type { ScrapCombination } from "@feature/payment/types/paymentTypes";
// 통합/분할 구매
export const postDefaultTrade = async (productId: number, mobileDataId: number, dataAmount?: number) => {
  const payload = {
    productId,
    mobileDataId,
    dataAmount: dataAmount ?? null,
  };
  const res = await axios.post("/api/trades/mobile-data/default", payload);
  return res.data.data.tradeId;
};
// 자투리 구매
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
  console.log("자투리구매 api 호출",combinations)
  return res.data.data.tradeId;
};
