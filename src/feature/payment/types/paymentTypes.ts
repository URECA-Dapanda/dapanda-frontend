export type PaymentStep = "confirm" | "pay" | "complete" | null;

export interface PaymentInfo {
  type: "data" | "wifi" | "hotspot";
  title: string;
  price: string;
  unitPrice?: string;
  badge?: "일반 구매" | "자투리 구매";
  seller?: string;
  location?: string;
  duration?: string;
  cash: string;
  remainingData?: string;

  productId?: number;
  mobileDataId?: number;
  dataAmount?: number;
  totalAmount?: number;
  totalPrice?: number;
  combinations?: {
    productId: number;
    mobileDataId: number;
    memberName: string;
    price: number;
    purchasePrice: number;
    remainAmount: number;
    purchaseAmount: number;
    pricePer100MB: number;
    splitType: boolean;
    updatedAt: string;
  }[];
}
