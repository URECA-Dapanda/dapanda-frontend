export interface RawDataItem {
  id: number;
  price: number;
  itemId: number;
  memberName: string;
  remainAmount: number;
  pricePer100MB: number;
  splitType: boolean;
  updatedAt?: string;
}

export interface DataType {
  id: number;
  userId: number;
  title: string;
  userName: string;
  price: string;
  pricePer: string;
  date: string;
}

export interface ProductItemProps<T> {
  data: T;
}

export interface DataDetailResponse {
  productId: number;
  itemId: number;
  price: number;
  memberId: number;
  memberName: string;
  remainAmount: number;
  pricePer100MB: number;
  averageRate: number;
  reviewCount: number;
  updatedAt: string;
}
