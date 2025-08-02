export type TradeType = "PURCHASE_MOBILE_SINGLE" | "PURCHASE_MOBILE_COMPOSITE" | "PURCHASE_WIFI";
export type PostType = "MOBILE_DATA" | "WIFI" | "HOTSPOT";

/**
 * 구매내역, 판매내역 공통 이미지 URL 계산 함수
 */
export function getTradeImageUrl({
  type,
  productImageUrl,
}: {
  type: TradeType | PostType;
  productImageUrl?: string;
}): string {
  if (
    type === "PURCHASE_MOBILE_SINGLE" ||
    type === "PURCHASE_MOBILE_COMPOSITE" ||
    type === "MOBILE_DATA"
  ) {
    return "/default-data.png";
  }

  if (type === "PURCHASE_WIFI" || type === "WIFI") {
    return productImageUrl?.trim() ? productImageUrl : "/default-wifi.png";
  }
  return "/default-data.png";
}
