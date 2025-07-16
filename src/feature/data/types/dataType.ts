export interface RawDataItem {
  id: number;
  price: number;
  itemId: number;
  memberName: string;
  remainAmount: number;
  pricePer100MB: number;
  splitType: boolean;
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

export function mapRawToDataType(raw: RawDataItem): DataType {
  return {
    id: raw.id,
    userId: raw.itemId,
    title: `${raw.remainAmount}GB 데이터 팝니다`,
    userName: raw.memberName,
    price: `${raw.price.toLocaleString()}원`,
    pricePer: `${raw.pricePer100MB}원/100MB`,
    date: "3시간 전",
  };
}
