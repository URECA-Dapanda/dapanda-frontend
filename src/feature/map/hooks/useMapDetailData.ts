import type { SellerProfile } from "@/feature/map/types/sellerType";

export type MapDetailItem = {
  id: string;
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
};

const dummyList: Record<string, MapDetailItem> = {
  "1": {
    id: "1",
    type: "와이파이",
    imageUrl: ["/starbucks.png"],
    place: "스타벅스 강남",
    address: "서울시 강남구 테헤란로 123",
    openTime: "09:00",
    closeTime: "22:00",
    pricePer10min: 300,
    description: "전원이 있고 빠른 와이파이 가능",
    recentPrice: 250,
    averagePrice: 280,
  },
  "2": {
    id: "2",
    type: "와이파이",
    imageUrl: ["/starbucks.png"],
    place: "이디야 역삼",
    address: "서울시 강남구 역삼동 456",
    openTime: "08:00",
    closeTime: "21:00",
    pricePer10min: 200,
    description: "콘센트 있음, 조용한 분위기",
    recentPrice: 180,
    averagePrice: 190,
  },
};

const dummySeller: SellerProfile = {
  id: "1",
  name: "김판다",
  rating: 4.5,
  reviewCount: 3,
};

export const useMapDetailData = (id: string) => {
  return {
    data: dummyList[id],
    seller: dummySeller,
  };
};
