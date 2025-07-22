import type { QueryFunctionContext } from "@tanstack/react-query";
import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";
import { getMapList } from "@/feature/map/api/mapRequest";
import type { MapType } from "@/feature/map/types/mapType";

interface UseMapInfiniteQueryParams {
  latitude: number;
  longitude: number;
  sortOption?: "PRICE_ASC" | "AVERAGE_RATE_DESC";
  open?: boolean;
  size?: number;
}

export const useMapInfiniteQuery = ({
  latitude,
  longitude,
  sortOption,
  open = true,
  size = 10,
}: UseMapInfiniteQueryParams) =>
  useVirtualizedInfiniteQuery<MapType>({
    queryKey: [
      "mapItems",
      `lat:${latitude}`,
      `lng:${longitude}`,
      `sort:${sortOption ?? "NONE"}`,
      `open:${open}`,
    ],
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) =>
      getMapList({
        cursorId: typeof pageParam === "number" ? pageParam : undefined,
        size,
        latitude,
        longitude,
        productSortOption: sortOption,
        open,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    estimateSize: () => 200,
    mode: "button",
  });
