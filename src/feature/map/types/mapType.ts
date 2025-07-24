export interface MapType {
  id: number;
  type: "와이파이" | "핫스팟";
  title: string;
  address: string;
  location: string;
  updatedAt: string;
  open: boolean;
  score: number;
  price: string;
}

export type MapDetailItem = {
  productId: string;
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
  reviewCount: number;
  longitude: number;
  latitude: number;
  open: boolean;
};
