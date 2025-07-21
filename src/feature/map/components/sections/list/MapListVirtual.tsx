import { useEffect, useState } from "react";
import VirtualizedInfiniteList from "@/components/common/list/VirtualizedInfiniteList";
import MapItemCard from "@/feature/map/components/sections/product/MapItemCard";
import { useMapInfiniteQuery } from "@/feature/map/hooks/useMapInfiniteQuery";
import type { MapType } from "@/feature/map/types/mapType";

export default function MapListVirtual() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoords({ lat: coords.latitude, lng: coords.longitude });
      },
      () => alert("위치 정보를 가져올 수 없습니다.")
    );
  }, []);

  // 🧠 좌표가 없어도 기본값 넣어서 Hook은 항상 호출
  const { parentRef, rowVirtualizer, flatItems, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useMapInfiniteQuery({
      latitude: coords?.lat ?? 0, // 또는 DEFAULT_LOCATION.lat
      longitude: coords?.lng ?? 0,
      sortOption: "PRICE_ASC",
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
      renderItem={(item: MapType) => <MapItemCard data={item} />}
    />
  );
}
