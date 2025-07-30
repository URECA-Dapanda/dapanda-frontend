export interface MapType {
  productId: number;
  type: "와이파이" | "핫스팟";
  title: string;
  address: string;
  location: string;
  openTime: string;
  closeTime: string;
  open: boolean;
  score: number;
  price: string;
  imageUrl?: string;
}

export type MapDetailItem = {
  itemId: number | undefined;
  productId: number;
  wifiId: number;
  type: string;
  imageUrl: string[];
  place: string;
  address: string;
  openTime: string;
  closeTime: string;
  pricePer10min: number;
  description: string;
  recentPrice: number;
  averagePrice: number;
  memberName: string;
  memberId: number;
  myProduct: boolean;
  reviewCount: number;
  longitude: number;
  latitude: number;
  open: boolean;
};
