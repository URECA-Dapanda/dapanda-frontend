import axiosInstance from "@/lib/axios";
import { MapType } from "@/feature/map/types/mapType";

interface FetchMapListParams {
  cursorId?: number;
  size: number;
  productSortOption?: "PRICE_ASC" | "AVERAGE_RATE_DESC";
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
  productSortOption,
  open,
  latitude,
  longitude,
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
      id: item.id,
      title: item.title,
      price: `${item.price}원`,
      address: "", // 추후 reverse geocode 필요
      isOpen: open ?? true,
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
