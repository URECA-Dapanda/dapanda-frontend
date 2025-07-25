"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useInitializeMap } from "@/feature/map/hooks/useInitializeMap";
import { useMyLocation } from "@/feature/map/hooks/useMyLocation";
import { getAddressVariantsFromLatLng } from "@/feature/map/utils/reverseGeocode";
import { getMapDetailById } from "@/feature/map/api/getMapDetailById";

interface InteractiveMapProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
}

export default function InteractiveMap({ onLocationSelect }: InteractiveMapProps) {
  const searchParams = useSearchParams();
  const mapRef = useRef<HTMLDivElement>(null);
  const infoWindowRef = useRef<naver.maps.InfoWindow | null>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);

  const map = useInitializeMap(mapRef);
  useMyLocation(map);

  useEffect(() => {
    if (!map) return;

    infoWindowRef.current = new naver.maps.InfoWindow({ content: "", borderWidth: 0 });

    const id = searchParams.get("id");
    const isEditMode = searchParams.get("edit") === "true";

    // edit 모드일 경우 초기 마커 세팅
    if (isEditMode && id) {
      getMapDetailById(id).then((data) => {
        const latlng = new naver.maps.LatLng(data.latitude, data.longitude);
        markerRef.current = new naver.maps.Marker({ map, position: latlng });
        map.setCenter(latlng);

        const html = `
        <div style="padding:10px;min-width:200px;">
          [도로명 주소] ${data.address}
        </div>
      `;
        infoWindowRef.current?.setContent(html);
        infoWindowRef.current?.open(map, latlng);

        onLocationSelect(data.latitude, data.longitude, data.address);
      });
    }

    const listener = naver.maps.Event.addListener(map, "click", async (e) => {
      const lat = e.coord.lat();
      const lng = e.coord.lng();
      const latlng = new naver.maps.LatLng(lat, lng);

      // 기존 마커 제거
      if (markerRef.current) markerRef.current.setMap(null);
      markerRef.current = new naver.maps.Marker({ map, position: latlng });

      // 분리된 유틸 함수 사용
      const addressResult = await getAddressVariantsFromLatLng(lat, lng);

      const html = addressResult
        ? `
          <div style="padding:10px;min-width:200px;line-height:150%;">
            ${
              addressResult.roadAddress
                ? "[도로명 주소] " + addressResult.roadAddress + "<br/>"
                : ""
            }
            ${addressResult.jibunAddress ? "[지번 주소] " + addressResult.jibunAddress : ""}
          </div>
        `
        : `<div style="padding:10px;">주소를 가져올 수 없습니다.</div>`;

      infoWindowRef.current?.setContent(html);
      infoWindowRef.current?.open(map, latlng);

      // 도로명 주소 우선 전달
      onLocationSelect(lat, lng, addressResult?.roadAddress ?? "주소 없음");
    });

    return () => {
      naver.maps.Event.removeListener(listener);
    };
  }, [map, onLocationSelect, searchParams]);

  return <div ref={mapRef} className="w-full h-[400px] rounded-12 shadow-md" />;
}
