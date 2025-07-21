import { Fragment } from "react";
import { QueryFunctionContext } from "@tanstack/react-query";
import VirtualizedInfiniteList from "@components/common/list/VirtualizedInfiniteList";
import { getMapList } from "@/feature/map/api/mapRequest";
import MapItemCard from "@/feature/map/components/sections/product/MapItemCard";
import SelectTypeCard from "@/feature/map/components/sections/regist/SelectTypeCard";
import type { MapType } from "@/feature/map/types/mapType";
import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";

export default function MapPageContent() {
  const {
    parentRef: parentRefForMap,
    rowVirtualizer: rowVirtualizerForMap,
    flatItems: flatItemsForMap,
    isFetchingNextPage: isFetchingNextPageForMap,
    hasNextPage: hasNextPageForMap,
    fetchNextPage: fetchNextPageForMap,
  } = useVirtualizedInfiniteQuery<MapType>({
    queryKey: ["mapItems"],
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) => getMapList({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    estimateSize: () => 200,
    mode: "button",
  });

  return (
    <Fragment>
      <VirtualizedInfiniteList
        mode="button"
        parentRef={parentRefForMap}
        rowVirtualizer={rowVirtualizerForMap}
        items={flatItemsForMap}
        isFetchingNextPage={isFetchingNextPageForMap}
        hasNextPage={hasNextPageForMap}
        fetchNextPage={fetchNextPageForMap}
        renderItem={(item: MapType) => <MapItemCard data={item} />}
      />
      <SelectTypeCard />
    </Fragment>
  );
}
