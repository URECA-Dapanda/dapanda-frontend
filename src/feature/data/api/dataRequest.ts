import axios from "@/lib/axios";

import { DataType, RawDataItem, mapRawToDataType, DataDetailResponse } from "../types/dataType";

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

export async function getDataList({
  pageParam = 0,
  sort = "RECENT",
  dataAmount,
}: {
  pageParam?: number | unknown;
  sort?: "RECENT" | "PRICE_ASC" | "AMOUNT_ASC" | "AMOUNT_DESC";
  dataAmount?: number;
}): Promise<{
  items: DataType[];
  nextCursor?: number;
}> {
  try {
    const response = await axios.post("/api/products/mobile-data", {
      cursorId: isNumber(pageParam) && pageParam > 0 ? pageParam : null,
      size: 10, // 원하는 페이지 크기
      productSortOption: sort,
      ...(dataAmount !== undefined && { dataAmount }), // dataAmount가 있을 때만 추가
    });

    const rawList = response.data.data.data as RawDataItem[];
    const items = rawList.map(mapRawToDataType);
    const nextCursor = response.data.data.pageInfo.nextCursorId ?? undefined;

    return { items, nextCursor };
  } catch {
    console.error("상품 목록 조회 실패:");

    return { items: [], nextCursor: undefined };
  }
}

export async function getDataDetail(productId: string): Promise<DataDetailResponse> {
  const response = await axios.get<{ code: number; message: string; data: DataDetailResponse }>(
    `/api/products/mobile-data/${productId}`
  );
  return response.data.data;
}
