import { useQuery } from "@tanstack/react-query";
import { getMapDetailById } from "@/feature/map/api/getMapDetailById";
import type { MapDetailItem } from "@/feature/map/types/mapType";

interface UseMapDetailDataResult {
  data?: MapDetailItem;
  isLoading: boolean;
  isError: boolean;
}

export const useMapDetailData = (id: string): UseMapDetailDataResult => {
  const {
    data: detail,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mapDetail", id],
    queryFn: () => getMapDetailById(id),
    enabled: !!id,
  });

  const mapDetailItem: MapDetailItem | undefined = detail
    ? {
        productId: detail.productId.toString(),
        type: "와이파이",
        imageUrl: detail.imageUrls ?? [],
        place: detail.title,
        address: "", // reverse geocoding 필요
        openTime: detail.startTime.slice(11, 16),
        closeTime: detail.endTime.slice(11, 16),
        pricePer10min: detail.price,
        description: detail.content,
        recentPrice: detail.price,
        averagePrice: detail.averageRate,
        memberName: detail.memberName,
        memberId: detail.memberId,
        reviewCount: detail.reviewCount,
        latitude: detail.latitude,
        longitude: detail.longitude,
        open: detail.open,
      }
    : undefined;

  return {
    data: mapDetailItem,
    isLoading,
    isError,
  };
};
