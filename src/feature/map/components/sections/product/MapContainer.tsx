"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMapInitializer } from "@/feature/map/hooks/useMapInitializer";
import { useMapMarkers } from "@/feature/map/hooks/useMapMarkers";
import { useMapStore } from "@/feature/map/stores/useMapStore";
import { MAP_CONTAINER_ID } from "@/feature/map/constants/map";

export default function MapContainer() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { map, storeList } = useMapStore();
  const router = useRouter();

  useMapInitializer();

  useMapMarkers(map, storeList, {
    onMarkerClick: (store) => {
      router.push(`/map/detail?id=${store.id}`);
    },
  });

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.id = MAP_CONTAINER_ID;
    }
  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
}
