"use client";

import { useEffect, useRef, useState } from "react";
import { MapType } from "@feature/map/types/mapType";

interface MapContainerProps {
  onStoreListUpdate?: (list: MapType[]) => void;
  onMapInit?: (map: naver.maps.Map) => void;
}

export default function MapContainer({ onStoreListUpdate, onMapInit }: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [storeList, setStoreList] = useState<MapType[]>([]);

  useEffect(() => {
    if (!window.naver || !mapRef.current) return;

    const DEFAULT_LOCATION = new window.naver.maps.LatLng(37.5665, 126.978);

    const initMap = new window.naver.maps.Map(mapRef.current, {
      center: DEFAULT_LOCATION,
      zoom: 15,
    });

    setMap(initMap);
    onMapInit?.(initMap);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation = new window.naver.maps.LatLng(latitude, longitude);
          initMap.setCenter(currentLocation);

          new window.naver.maps.Marker({
            position: currentLocation,
            map: initMap,
            icon: {
              content:
                '<div style="background:#e6007e;width:12px;height:12px;border-radius:9999px;"></div>',
            },
          });

          const dummy: MapType[] = [
            {
              id: 1,
              title: "핫스팟 A",
              type: "핫스팟",
              address: "서울시 강남구",
              updatedAt: "3시간 전",
              location: `${latitude + 0.001},${longitude + 0.001}`,
              isOpen: true,
              score: 4.5,
              price: "300원",
            },
            {
              id: 2,
              title: "와이파이 B",
              type: "와이파이",
              address: "서울시 서초구",
              updatedAt: "3시간 전",
              location: `${latitude - 0.001},${longitude - 0.001}`,
              isOpen: true,
              score: 4.2,
              price: "무료",
            },
            {
              id: 3,
              title: "와이파이 C",
              type: "와이파이",
              address: "서울시 서초구",
              updatedAt: "3시간 전",
              location: `${latitude - 0.003},${longitude - 0.004}`,
              isOpen: true,
              score: 4.2,
              price: "무료",
            },
            {
              id: 4,
              title: "와이파이 D",
              type: "와이파이",
              address: "서울시 서초구",
              updatedAt: "3시간 전",
              location: `${latitude - 0.001},${longitude - 0.009}`,
              isOpen: true,
              score: 4.2,
              price: "무료",
            },
            {
              id: 5,
              title: "와이파이 E",
              type: "와이파이",
              address: "서울시 서초구",
              updatedAt: "3시간 전",
              location: `${latitude - 0.009},${longitude - 0.001}`,
              isOpen: true,
              score: 4.2,
              price: "무료",
            },
          ];

          setStoreList(dummy);
          onStoreListUpdate?.(dummy);
        },
        () => alert("위치 정보를 가져올 수 없습니다."),
        { enableHighAccuracy: true }
      );
    }
  }, [onStoreListUpdate]);

  useEffect(() => {
    if (!map || !window.naver) return;

    storeList.forEach((store) => {
      const [lat, lng] = store.location.split(",").map(Number);
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(lat, lng),
        map,
        title: store.title,
      });
    });
  }, [map, storeList]);

  return <div ref={mapRef} className="w-full h-full" />;
}
