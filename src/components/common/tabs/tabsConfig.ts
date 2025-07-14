export const PURCHASE_MODE_TABS = [
  { label: "일반 구매", value: "normal", content: "일반 구매 내용입니다." },
  { label: "자투리 구매", value: "fragment", content: "자투리 구매 내용입니다." },
] as const;

export const SALES_HISTORY_TABS = [
  { label: "판매 중", value: "selling", content: "판매 중인 내역입니다." },
  { label: "판매 완료", value: "completed", content: "판매 완료된 내역입니다." },
] as const;
