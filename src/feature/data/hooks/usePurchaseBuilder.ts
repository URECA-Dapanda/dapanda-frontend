import { formatPriceString, formatDataSize } from "@lib/formatters";
import { DataDetailResponse } from "@feature/data/types/dataType";

export const buildScrapPaymentInfo = (
  data: DataDetailResponse,
  selectedAmount: number
) => {
  const purchasePrice = Math.floor(selectedAmount * data.pricePer100MB);

  return {
    type: "data" as const,
    title: `${selectedAmount}GB`,
    price: `${purchasePrice.toLocaleString()}원`,
    unitPrice: `${data.pricePer100MB.toLocaleString()}원`,
    badge: "자투리 구매" as const,
    seller: data.memberName,
    cash: formatPriceString(12500), // TODO: 연동
    remainingData: formatDataSize(data.remainAmount - selectedAmount),
    totalAmount: selectedAmount,
    totalPrice: purchasePrice,
    combinations: [
      {
        productId: data.productId,
        mobileDataId: data.itemId,
        memberName: data.memberName,
        price: data.price,
        purchasePrice,
        remainAmount: data.remainAmount,
        purchaseAmount: selectedAmount,
        pricePer100MB: data.pricePer100MB,
        splitType: data.splitType,
        updatedAt: data.updatedAt,
      },
    ],
  };
};

export const buildDefaultPaymentInfo = (data: DataDetailResponse) => {
  return {
    type: "data" as const,
    title: formatDataSize(data.remainAmount),
    price: formatPriceString(data.price),
    unitPrice: formatPriceString(data.pricePer100MB),
    badge: "일반 구매" as const,
    seller: data.memberName,
    cash: formatPriceString(12500),
    remainingData: formatDataSize(data.remainAmount),
    productId: data.productId,
    mobileDataId: data.itemId,
    dataAmount: data.remainAmount,
  };
};
