export type PaymentStep = "confirm" | "pay" | "complete" | null;

export interface ScrapCombination {
  productId: number;
  mobileDataId: number;
  memberName: string;
  price: number;
  purchasePrice: number;
  remainAmount: number;
  pricePer100MB: number;
  splitType: boolean;
  updatedAt: string;
}

export interface PaymentInfo {
  type: "data" | "wifi" | "hotspot";
  title: string;
  price: string;
  unitPrice?: string;
  badge?: "일반 구매" | "분할 구매" | "자투리 구매";
  seller?: string;
  location?: string;
  duration?: string;
  remainingData?: string;

  // 기본 구매 / 분할 구매용
  productId?: number;
  mobileDataId?: number;
  dataAmount?: number;

  // 자투리 조합 구매용
  totalAmount?: number;
  totalPrice?: number;
  combinations?: ScrapCombination[];
}
