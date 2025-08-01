export interface RawDataItem {
  productId: number;
  price: number;
  itemId: number;
  mobileDataId: number;
  memberName: string;
  profileImageUrl: string;
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
  memberName: string;
  profileImageUrl: string;
  price: string;
  pricePer100MB: string;
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
  myProduct: boolean;
  splitType: boolean;
  updatedAt: string;
}

export function mapRawToDataType(raw: RawDataItem): DataType {
  return {
    productId: raw.productId,
    mobileDataId: raw.itemId ?? raw.mobileDataId,
    title: `${raw.remainAmount}GB`,
    purchaseAmount: raw.purchaseAmount,
    memberName: raw.memberName,
    profileImageUrl: raw.profileImageUrl,
    price: `${raw.price.toLocaleString()}원`,
    pricePer100MB: `${raw.pricePer100MB}원/100MB`,
    date: raw.updatedAt,
    splitType: raw.splitType,
  };
}
