import axiosInstance from "@/lib/axios";
import type { MapType } from "@/feature/map/types/mapType";
import type { WifiItemResponse, FetchMapListParams } from "@/feature/map/types/mapApiTypes";
import type { WifiRegisterRequest, WifiUpdateRequest } from "@/feature/map/types/registerForm";

interface ApiResponse {
  code: number;
  message: string;
  data: {
    data: WifiItemResponse[];
    pageInfo: {
      nextCursorId: number | null;
      hasNext: boolean;
      size: number;
    };
  };
}

export async function getMapList({
  cursorId,
  size,
  productSortOption = "DISTANCE_ASC",
  latitude = 37.5665,
  longitude = 126.978,
  open,
}: FetchMapListParams): Promise<{ items: MapType[]; nextCursor?: number }> {
  const params = {
    size,
    latitude,
    longitude,
    ...(cursorId !== undefined && { cursorId }),
    ...(productSortOption && { productSortOption }),
    ...(open !== undefined && { open }),
  };

  try {
    const res = await axiosInstance.get<ApiResponse>("/api/products/wifi", { params });
    const json = res.data;

    const items: MapType[] = json.data.data.map((item) => ({
      productId: item.productId,
      title: item.title,
      price: `${item.price}원`,
      address: item.address,
      open: item.open,
      location: `${item.latitude},${item.longitude}`,
      score: item.averageRate,
      type: "와이파이",
      startTime: item.startTime,
      endTime: item.endTime,
      imageUrl: item.imageUrl ?? "",
      memberName: item.memberName,
      latitude: item.latitude,
      longitude: item.longitude,
    }));

    return {
      items,
      nextCursor: json.data.pageInfo.nextCursorId ?? undefined,
    };
  } catch (e) {
    console.debug("getMapList error:", e);
    throw new Error("와이파이 목록 조회에 실패했습니다");
  }
}

export async function postWifiRegister(data: WifiRegisterRequest): Promise<void> {
  try {
    const res = await axiosInstance.post("/api/products/wifi", data);
    if (res.data.code !== 0) {
      throw new Error(res.data.message || "등록 실패");
    }
  } catch (error) {
    console.debug("postWifiRegister error:", error);
    throw new Error("와이파이 등록에 실패했습니다.");
  }
}

export async function putWifiUpdate(data: WifiUpdateRequest): Promise<void> {
  try {
    const res = await axiosInstance.put("/api/products/wifi", data);
    if (res.data.code !== 0) {
      throw new Error(res.data.message || "수정 실패");
    }
  } catch (error) {
    console.debug("putWifiUpdate error:", error);
    throw new Error("와이파이 상품 수정에 실패했습니다.");
  }
}

export const getWifiPriceRecommendation = async () => {
  const response = await axiosInstance.get("/api/products/market-price", {
    params: { productType: "WIFI" },
  });
  return response.data.data;
};
