import axiosInstance from "@/lib/axios";

interface WifiDetailResponse {
  address: string;
  productId: number;
  itemId: number;
  price: number;
  memberId: number;
  memberName: string;
  title: string;
  content: string;
  latitude: number;
  longitude: number;
  averageRate: number;
  reviewCount: number;
  imageUrls: string[];
  startTime: string;
  endTime: string;
  updatedAt: string;
  open: boolean;
}

export async function getMapDetailById(productId: string): Promise<WifiDetailResponse> {
  const res = await axiosInstance.get(`/api/products/wifi/${productId}`);
  return res.data.data;
}
