import { BaseProduct } from "@feature/map/types/mapBase";

export interface WifiItemResponse extends BaseProduct {
  price: number;
  itemId: number;
  memberName: string;
  imageUrl: string | null;
  averageRate: number;
  distanceKm: number;
}

export interface WifiDetailResponse extends BaseProduct {
  itemId: number;
  price: number;
  memberId: number;
  memberName: string;
  content: string;
  imageUrls: string[];
  averageRate: number;
  reviewCount: number;
  myProduct: boolean;
  updatedAt: string;
}

export interface FetchMapListParams {
  cursorId?: number;
  size: number;
  productSortOption?: "PRICE_ASC" | "AVERAGE_RATE_DESC" | "DISTANCE_ASC";
  open?: boolean;
  latitude: number;
  longitude: number;
}
