import { useEffect, useRef } from "react";
import { getAddressVariantsFromLatLng } from "@/feature/map/utils/reverseGeocode";

interface UseInteractiveMapMarkerParams {
  map: naver.maps.Map | null;
  initialLocation?: { lat: number; lng: number };
  onLocationSelect: (lat: number, lng: number) => void;
  isEditMode: boolean;
  editData?: { lat: number; lng: number; address: string };
}

export function useInteractiveMapMarker({
  map,
  initialLocation,
  onLocationSelect,
  isEditMode,
  editData,
}: UseInteractiveMapMarkerParams) {
  const markerRef = useRef<naver.maps.Marker | null>(null);
  const infoWindowRef = useRef<naver.maps.InfoWindow | null>(null);

  // 공통 마커 + InfoWindow 세팅 함수
  const setMarkerWithInfo = (lat: number, lng: number) => {
    const latlng = new window.naver.maps.LatLng(lat, lng);

    // 기존 마커 제거
    if (markerRef.current) markerRef.current.setMap(null);

    // 마커 생성
    if (map) {
      markerRef.current = new window.naver.maps.Marker({ map, position: latlng });

      // InfoWindow 표시
      const html = `
      <div style="padding:8px 12px; background:#e6007e; color:white; border-radius:20px; font-size:12px; box-shadow: 0 2px 10px rgba(0,0,0,0.3); margin-bottom:10px;">
        선택된 위치
      </div>
    `;
      infoWindowRef.current?.setContent(html);
      infoWindowRef.current?.open(map, latlng);
    }
  };

  // 지도 클릭 이벤트 등록
  useEffect(() => {
    if (!map) return;

    infoWindowRef.current = new window.naver.maps.InfoWindow({
      content: "",
      disableAnchor: true,
      backgroundColor: "transparent",
      borderWidth: 0,
      borderColor: "transparent",
      pixelOffset: new window.naver.maps.Point(0, -40),
    });

    const clickListener = window.naver.maps.Event.addListener(map, "click", (e) => {
      const lat = e.coord.lat();
      const lng = e.coord.lng();
      setMarkerWithInfo(lat, lng);
      onLocationSelect(lat, lng);
    });

    return () => {
      window.naver.maps.Event.removeListener(clickListener);
    };
  }, [map, onLocationSelect]);

  // 최초 렌더링 시 초기 위치 적용
  useEffect(() => {
    if (!map || !initialLocation) return;

    const { lat, lng } = initialLocation;
    map.setCenter(new window.naver.maps.LatLng(lat, lng));
    map.setZoom(16);
    setMarkerWithInfo(lat, lng);

    getAddressVariantsFromLatLng(lat, lng);
    onLocationSelect(lat, lng);
  }, [map, initialLocation, onLocationSelect]);

  // edit 모드 초기 마커 세팅
  useEffect(() => {
    if (!map || !isEditMode || !editData) return;

    const { lat, lng } = editData;
    const latlng = new window.naver.maps.LatLng(lat, lng);
    map.setCenter(latlng);
    map.setZoom(16);
    setMarkerWithInfo(lat, lng);

    onLocationSelect(lat, lng);
  }, [map, isEditMode, editData, onLocationSelect]);
}
