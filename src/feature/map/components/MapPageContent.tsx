import VirtualizedInfiniteList from "@components/common/list/VirtualizedInfiniteList";
import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";
import { MapType } from "../types/mapType";
import { QueryFunctionContext } from "@tanstack/react-query";
import { getMapList } from "../api/mapRequest";
import MapItemCard from "./sections/product/MapItemCard";
import { Fragment } from "react";
import SelectTypeCard from "./sections/regist/SelectTypeCard";

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
