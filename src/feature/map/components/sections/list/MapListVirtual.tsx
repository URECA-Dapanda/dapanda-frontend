import { useEffect, useState } from "react";
import VirtualizedInfiniteList from "@/components/common/list/VirtualizedInfiniteList";
import MapItemCard from "@/feature/map/components/sections/product/MapItemCard";
import { useMapInfiniteQuery } from "@feature/map/hooks/query/useMapInfiniteQuery";
import type { MapType } from "@/feature/map/types/mapType";
import { showErrorToast } from "@lib/toast";

export default function MapListVirtual() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoords({ lat: coords.latitude, lng: coords.longitude });
      },
      () => showErrorToast("위치 정보를 가져올 수 없습니다.")
    );
  }, []);

  const { parentRef, rowVirtualizer, flatItems, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useMapInfiniteQuery({
      latitude: coords?.lat ?? 0,
      longitude: coords?.lng ?? 0,
      open: true,
    });

  if (!coords) return <div>위치 불러오는 중...</div>;

  return (
    <VirtualizedInfiniteList
      mode="button"
      parentRef={parentRef}
      rowVirtualizer={rowVirtualizer}
      items={flatItems}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      renderItem={(index, item?: MapType) => <MapItemCard data={item} key={index} />}
    />
  );
}
