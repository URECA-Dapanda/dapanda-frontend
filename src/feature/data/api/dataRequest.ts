import axios from "axios";
import { DataType, RawDataItem, mapRawToDataType } from "../types/dataType";

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

export async function getDataList({ pageParam = 0 }: { pageParam?: number | unknown }): Promise<{
  items: DataType[];
  nextCursor?: number;
}> {
  console.log("GET API DATA LIST", pageParam);
  if (!isNumber(pageParam)) return { items: [], nextCursor: undefined };

  try {
    const response = await axios.get<{
      data: {
        data: RawDataItem[];
        pageInfo: {
          nextCursorId: number | null;
          hasNext: boolean;
          size: number;
        };
      };
    }>(`/api/data/list?page=${pageParam}`);

    const rawList = response.data.data.data;
    const items = rawList.map(mapRawToDataType);

    const nextCursor = response.data.data.pageInfo.nextCursorId ?? undefined;

    return {
      items,
      nextCursor, // undefined이면 자동으로 무한스크롤 멈춤
    };
  } catch (error) {
    console.error("데이터 목록 가져오기 실패:", error);
    return { items: [], nextCursor: undefined };
  }
}
