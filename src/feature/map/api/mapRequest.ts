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
  productId: number;
  price: number;
  itemId: number;
  address: string;
  memberName: string;
  title: string;
  latitude: number;
  longitude: number;
  imageUrl: string | null;
  averageRate: number;
  distanceKm: number;
  open: boolean;
  startTime: string;
  endTime: string;
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
    // const res = await axiosInstance.get<ApiResponse>("/api/products/wifi", { params });
    // const json = res.data;

    const mockMapListResponse = {
      items: Array.from({ length: 20 }).map((_, i) => ({
        productId: i + 1,
        title: `테스트 와이파이 ${i + 1}`,
        price: `${(i + 1) * 1000}원`,
        address: `서울특별시 테스트구 테스트동 ${i + 1}번지`,
        open: i % 2 === 0,
        location: `${37.56 + i * 0.001},${126.97 + i * 0.001}`,
        score: (Math.random() * 5).toFixed(1),
        type: "와이파이",
        startTime: "09:00",
        latitude: "",
        longitude: "",
        averageRate: 5,
        endTime: "18:00",
        imageUrl: `/0.1.png`,
      })),
      nextCursor: 21,
    };

    const items: MapType[] = mockMapListResponse.items.map((item) => ({
      productId: item.productId,
      title: item.title,
      price: `${item.price}원`,
      address: item.address,
      open: item.open,
      location: `${item.latitude},${item.longitude}`,
      score: item.averageRate,
      type: "와이파이",
      startTime: item.startTime.slice(0, 5),
      endTime: item.endTime.slice(0, 5),
      imageUrl: item.imageUrl ?? "",
    }));

    return {
      items,
      nextCursor: items.length ?? undefined,
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
