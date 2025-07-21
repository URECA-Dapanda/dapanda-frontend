import type { QueryFunctionContext } from "@tanstack/react-query";
import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";
import { getMapList } from "@/feature/map/api/mapRequest";
import type { MapType } from "@/feature/map/types/mapType";

export const useMapInfiniteQuery = () =>
  useVirtualizedInfiniteQuery<MapType>({
    queryKey: ["mapItems"],
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) => getMapList({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    estimateSize: () => 200,
    mode: "button",
  });
