export interface RawDataItem {
  productId: number;
  price: number;
  mobileDataId: number;
  memberName: string;
  remainAmount: number;
  purchaseAmount: number;
  pricePer100MB: number;
  splitType: boolean;
  updatedAt: string;
}

export interface DataType {
  productId: number;
  mobileDataId: number;
  title: string;
  purchaseAmount: number;
  userName: string;
  price: string;
  pricePer: string;
  date: string;
  splitType: boolean;
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
  selectedAmount: number;
  pricePer100MB: number;
  averageRate: number;
  reviewCount: number;
  updatedAt: string;
  splitType: boolean;
}

export function mapRawToDataType(raw: RawDataItem): DataType {
  return {
    productId: raw.productId,
    mobileDataId: raw.mobileDataId,
    title: `${raw.remainAmount}GB`,
    purchaseAmount: raw.purchaseAmount,
    userName: raw.memberName,
    price: `${raw.price.toLocaleString()}원`,
    pricePer: `${raw.pricePer100MB}원/100MB`,
    date: raw.updatedAt,
    splitType: raw.splitType,
  };
}
