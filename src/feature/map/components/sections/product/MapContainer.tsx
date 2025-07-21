"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMapInitializer } from "@/feature/map/hooks/useMapInitializer";
import { useMapMarkers } from "@/feature/map/hooks/useMapMarkers";
import { useMapStore } from "@/feature/map/stores/useMapStore";
import { MAP_CONTAINER_ID } from "@/feature/map/constants/map";

export default function MapContainer() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { map, storeList, myPosition } = useMapStore(); // ✅ myPosition 추가
  const router = useRouter();

  useMapInitializer();

  useMapMarkers(map, storeList, {
    onMarkerClick: (store) => {
      router.push(`/map/detail?id=${store.id}`);
    },
  });

  // ✅ 내 위치 마커 따로 렌더링
  useEffect(() => {
    if (!map || !myPosition) return;

    const marker = new window.naver.maps.Marker({
      position: myPosition,
      map,
      icon: {
        content:
          '<div style="background:#e6007e;width:12px;height:12px;border-radius:9999px;"></div>',
      },
    });

    return () => marker.setMap(null); // 클린업
  }, [map, myPosition]);

  // 지도 DOM ID 설정
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.id = MAP_CONTAINER_ID;
    }
  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
}
