import axiosInstance from "@/lib/axios";
import { MapType } from "@/feature/map/types/mapType";

interface FetchMapListParams {
  cursorId?: number;
  size: number;
  productSortOption?: "PRICE_ASC" | "AVERAGE_RATE_DESC" | "DISTANCE_ASC";
  open?: boolean;
  latitude: number;
  longitude: number;
}

interface WifiItemResponse {
  id: number;
  price: number;
  itemId: number;
  memberName: string;
  title: string;
  latitude: number;
  longitude: number;
  imageUrl: string | null;
  averageRate: number;
  distanceKm: number;
  updatedAt: string;
  open: boolean;
}

interface WifiRegisterRequest {
  price: number;
  title: string;
  content: string;
  latitude: number;
  longitude: number;
  startTime: string;
  endTime: string;
  address: string;
  images: string[];
}

export interface WifiUpdateRequest {
  productId: number;
  price: number;
  title: string;
  content: string;
  latitude: number;
  longitude: number;
  address: string;
  startTime: string;
  endTime: string;
  images: string[];
}

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
  latitude,
  longitude,
}: FetchMapListParams): Promise<{ items: MapType[]; nextCursor?: number }> {
  const params = {
    size,
    latitude,
    longitude,
    ...(cursorId !== undefined && { cursorId }),
    ...(productSortOption && { productSortOption }),
  };

  try {
    const res = await axiosInstance.get<ApiResponse>("/api/products/wifi", { params });
    const json = res.data;

    const items: MapType[] = json.data.data.map((item) => ({
      id: item.id,
      title: item.title,
      price: `${item.price}원`,
      address: "", // 추후 reverse geocode 필요
      open: item.open,
      location: `${item.latitude},${item.longitude}`,
      score: item.averageRate,
      type: "와이파이",
      updatedAt: new Date(item.updatedAt).toLocaleTimeString(),
    }));

    return {
      items,
      nextCursor: json.data.pageInfo.nextCursorId ?? undefined,
    };
  } catch (e) {
    console.error("getMapList error:", e);
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
    console.error("postWifiRegister error:", error);
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
    console.error("putWifiUpdate error:", error);
    throw new Error("와이파이 상품 수정에 실패했습니다.");
  }
}

export const getWifiPriceRecommendation = async () => {
  const response = await axiosInstance.get("/api/products/market-price", {
    params: { productType: "WIFI" },
  });
  return response.data.data;
};
