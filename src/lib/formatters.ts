/**
 * 데이터를 GB/MB 단위로 포맷한다
 * @param value - GB 기준 숫자 (예: 0.5, 2 등)
 * @returns "500MB" 또는 "2GB"
 */
export function formatDataSize(value: number): string {
  return value < 1 ? `${Math.round(value * 1000)}MB` : `${value}GB`;
}

/**
 *
 * @param price - 가격 문자열 또는 숫자 (예: "1000", 1000, "1000원" 등)
 * @returns 10,000원
 */
export function formatPriceString(price: string | number): string {
  let numericPrice: number;

  if (typeof price === "string") {
    const cleaned = price.replace(/[^\d.-]/g, "");
    numericPrice = parseFloat(cleaned);
  } else {
    numericPrice = price;
  }

  if (isNaN(numericPrice)) return "0원";

  return `${numericPrice.toLocaleString("ko-KR")}원`;
}
