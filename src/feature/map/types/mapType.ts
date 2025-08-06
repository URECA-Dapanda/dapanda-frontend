import { BaseProduct } from "@feature/map/types/mapBase";

export interface MapType extends BaseProduct {
  type: "와이파이" | "핫스팟";
  location: string;
  score: number;
  price: string;
  imageUrl?: string;
  memberName: string;
  title: string;
}

export interface MapDetailItem extends BaseProduct {
  itemId: number;
  wifiId: number;
  type: string;
  title: string;
  imageUrl: string[];
  place: string;
  description: string;
  pricePer10min: number;
  recentPrice: number;
  averagePrice: number;
  memberName: string;
  memberId: number;
  myProduct: boolean;
  reviewCount: number;
}
