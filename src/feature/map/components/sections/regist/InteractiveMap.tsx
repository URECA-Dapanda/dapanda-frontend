"use client";

import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useInitializeMap } from "@/feature/map/hooks/useInitializeMap";
import { useMyLocation } from "@/feature/map/hooks/useMyLocation";
import { getMapDetailById } from "@/feature/map/api/getMapDetailById";
import { useInteractiveMapMarker } from "@/feature/map/hooks/useInteractiveMapMarker";

interface InteractiveMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialLocation?: { lat: number; lng: number };
}

export default function InteractiveMap({ onLocationSelect, initialLocation }: InteractiveMapProps) {
  const searchParams = useSearchParams();
  const mapRef = useRef<HTMLDivElement>(null);

  const map = useInitializeMap(mapRef);
  useMyLocation(map);

  const isEditMode = searchParams.get("edit") === "true";
  const id = searchParams.get("id");
  const editData = useRef<{ lat: number; lng: number; address: string } | undefined>(undefined);

  // 초기 데이터 로드 후 마커 세팅을 위한 editData 준비
  if (isEditMode && id && !editData.current) {
    getMapDetailById(id).then((data) => {
      editData.current = {
        lat: data.latitude,
        lng: data.longitude,
        address: data.address,
      };
    });
  }

  useInteractiveMapMarker({
    map,
    initialLocation,
    onLocationSelect,
    isEditMode,
    editData: editData.current,
  });

  return <div ref={mapRef} className="w-full h-full" />;
}
