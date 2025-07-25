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
  myProduct: boolean;
  updatedAt: string;
  open: boolean;
}

export async function getMapDetailById(id: string): Promise<WifiDetailResponse> {
  const res = await axiosInstance.get(`/api/products/wifi/${id}`);
  return res.data.data;
}
