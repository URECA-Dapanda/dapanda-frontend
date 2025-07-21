import VirtualizedInfiniteList from "@/components/common/list/VirtualizedInfiniteList";
import MapItemCard from "@/feature/map/components/sections/product/MapItemCard";
import type { MapType } from "@/feature/map/types/mapType";
import { useMapInfiniteQuery } from "@/feature/map/hooks/useMapInfiniteQuery";

export default function MapListVirtual() {
  const { parentRef, rowVirtualizer, flatItems, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useMapInfiniteQuery();

  return (
    <VirtualizedInfiniteList
      mode="button"
      parentRef={parentRef}
      rowVirtualizer={rowVirtualizer}
      items={flatItems}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      renderItem={(item: MapType) => <MapItemCard data={item} />}
    />
  );
}
