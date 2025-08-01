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
        itemId: detail.itemId,
        productId: detail.productId,
        wifiId: detail.itemId,
        type: "와이파이",
        address: detail.address,
        imageUrl: detail.imageUrls ?? [],
        place: detail.title,
        startTime: detail.startTime.slice(11, 16),
        endTime: detail.endTime.slice(11, 16),
        pricePer10min: detail.price,
        description: detail.content,
        recentPrice: detail.price,
        averagePrice: detail.averageRate,
        memberName: detail.memberName,
        memberId: detail.memberId,
        myProduct: detail.myProduct,
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
