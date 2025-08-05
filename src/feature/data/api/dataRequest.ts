import axios from "@/lib/axios";

import {
  DataType,
  RawDataItem,
  DataDetailResponse,
  mapRawToDataType,
} from "@feature/data/types/dataType";

export async function getDataList({
  pageParam,
  sort = "RECENT",
  size = 10,
  dataAmount,
}: {
  pageParam?: number | unknown;
  sort?: "RECENT" | "PRICE_ASC" | "AMOUNT_ASC" | "AMOUNT_DESC";
  size?: number;
  dataAmount?: number;
}): Promise<{
  items: DataType[];
  nextCursor?: number;
}> {
  try {
    const searchParam = new URLSearchParams();
    if (pageParam) searchParam.set("cursorId", String(pageParam));
    searchParam.set("productSortOption", sort);
    searchParam.set("size", String(size));
    if (dataAmount) searchParam.set("dataAmount", String(dataAmount));
    const response = await axios.get("/api/products/mobile-data", { params: searchParam });

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

export const postMobileDataProduct = async (
  dataAmount: number,
  price: number,
  isSplitType: boolean
) => {
  try {
    const res = await axios.post("/api/products/mobile-data", {
      price,
      dataAmount,
      isSplitType,
    });

    return res.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ?? "데이터 상품 등록에 실패했습니다.";
    throw new Error(message);
  }
};

export const getPriceRecommendation = async () => {
  const response = await axios.get("/api/products/market-price", {
    params: { productType: "MOBILE_DATA" },
  });
  return response.data.data;
};

export async function deleteDataPost(postId: string) {
  const response = await axios.delete(`/api/products/${postId}`);
  return response.data.message;
}

export async function putMobileDataProduct(data: {
  productId: number;
  changedAmount: number;
  price: number;
  isSplitType: boolean;
}) {
  const response = await axios.put("/api/products/mobile-data", data);
  return response.data;
}

export async function getBuyingDataAmount(): Promise<number> {
  const res = await axios.get("/api/members/buying-data");
  return res.data.data.data;
}

export async function getSellingDataAmount(): Promise<number> {
  const res = await axios.get("/api/members/selling-data");
  return res.data.data.data;
}
