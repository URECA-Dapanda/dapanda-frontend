"use client";

import { useEffect, useRef, useState } from "react";
import { useMyLocation } from "@feature/map/hooks/useMyLocation";
import { useInitializeMap } from "@feature/map/hooks/useInitializeMap";

interface AddressSearchMapProps {
  onLatLngChange?: (lat: number, lng: number) => void;
}

interface NaverPlaceItem {
  title: string;
  address: string;
  mapx: string;
  mapy: string;
}

export default function AddressSearchMap({ onLatLngChange }: AddressSearchMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NaverPlaceItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // 지도 초기화
  const map = useInitializeMap(mapRef);
  useMyLocation(map);

  // 자동완성 검색
  useEffect(() => {
    const delay = setTimeout(() => {
      if (!query) return setResults([]);
      fetch(`/api/naver-search?query=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => setResults(data.items ?? []))
        .catch(() => setResults([]));
    }, 300); // debounce

    return () => clearTimeout(delay);
  }, [query]);

  // 주소 선택 시 지도 이동
  const handleSelect = (item: NaverPlaceItem) => {
    const lat = parseFloat(item.mapy) / 1e7;
    const lng = parseFloat(item.mapx) / 1e7;

    if (map) {
      const latlng = new window.naver.maps.LatLng(lat, lng);
      map.setCenter(latlng);
      map.setZoom(16);
      new window.naver.maps.Marker({ position: latlng, map });
    }

    onLatLngChange?.(lat, lng);
    setQuery(item.title.replace(/<[^>]+>/g, "")); // 태그 제거 후 표시
    setResults([]); // 드롭다운 닫기
  };

  return (
    <div className="w-full space-y-8">
      {/* 입력창 */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(-1);
          }}
          placeholder="주소를 입력하세요 (예: 선릉역)"
          className="w-full p-4 border border-gray-300 rounded-md"
        />

        {/* 자동완성 드롭다운 */}
        {results.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-2 max-h-[200px] overflow-y-auto">
            {results.map((item, i) => (
              <li
                key={i}
                onClick={() => handleSelect(item)}
                className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${
                  selectedIndex === i ? "bg-gray-100" : ""
                }`}
              >
                <div className="font-medium" dangerouslySetInnerHTML={{ __html: item.title }} />
                <div className="text-sm text-gray-500">{item.address}</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 지도 */}
      <div ref={mapRef} className="w-full h-[300px] rounded-12 shadow-md" />
    </div>
  );
}
