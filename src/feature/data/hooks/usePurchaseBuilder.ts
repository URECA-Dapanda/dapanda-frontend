import { formatPriceString, formatDataSize } from "@lib/formatters";
import { DataDetailResponse } from "@feature/data/types/dataType";

// 분할 결제 builder
export const buildSplitPaymentInfo = (
  data: DataDetailResponse,
  selectedAmount: number
) => {
  const purchasePrice = Math.floor(selectedAmount * data.pricePer100MB);

  return {
    type: "data" as const,
    title: `${selectedAmount}GB`,
    price: `${purchasePrice.toLocaleString()}원`,
    unitPrice: `${data.pricePer100MB.toLocaleString()}원`,
    badge: "분할 구매" as const,
    seller: data.memberName,
    remainingData: formatDataSize(data.remainAmount - selectedAmount),
    productId: data.productId,
    mobileDataId: data.itemId,
    dataAmount: selectedAmount,
  };
};
// 일반 결제 builder
export const buildDefaultPaymentInfo = (data: DataDetailResponse) => {
  return {
    type: "data" as const,
    title: formatDataSize(data.remainAmount),
    price: formatPriceString(data.price),
    unitPrice: formatPriceString(data.pricePer100MB),
    badge: "일반 구매" as const,
    seller: data.memberName,
    remainingData: formatDataSize(data.remainAmount),
    productId: data.productId,
    mobileDataId: data.itemId,
    dataAmount: data.remainAmount,
  };
};
