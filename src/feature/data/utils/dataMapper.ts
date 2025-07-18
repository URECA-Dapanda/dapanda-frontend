import { DataType, RawDataItem } from "@feature/data/types/dataType";
import { formatRelativeTime } from "@lib/time";

export function mapRawToDataType(raw: RawDataItem): DataType {
  return {
    id: raw.id,
    userId: raw.itemId,
    title: `${raw.remainAmount}GB 데이터 팝니다`,
    userName: raw.memberName,
    price: `${raw.price.toLocaleString()}원`,
    pricePer: `${raw.pricePer100MB}원/100MB`,
    date: raw.updatedAt ? formatRelativeTime(raw.updatedAt) : "",
  };
}
