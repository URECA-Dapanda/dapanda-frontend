import axiosInstance from "@/lib/axios";
import type { WifiDetailResponse } from "@/feature/map/types/mapApiTypes";

export async function getMapDetailById(productId: string): Promise<WifiDetailResponse> {
  const res = await axiosInstance.get(`/api/products/wifi/${productId}`);
  return res.data.data;
}
