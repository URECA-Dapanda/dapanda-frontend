import { useEffect, useRef } from "react";

interface InteractiveMapProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
}

export default function InteractiveMap({ onLocationSelect }: InteractiveMapProps) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.naver || !mapRef.current) return;

    const map = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(37.5665, 126.978), // 초기 중심
      zoom: 15,
    });

    let marker: naver.maps.Marker | null = null;

    naver.maps.Event.addListener(map, "click", (e) => {
      const lat = e.coord.lat();
      const lng = e.coord.lng();

      if (marker) marker.setMap(null); // 이전 마커 제거
      marker = new naver.maps.Marker({ map, position: e.coord });

      // type ReverseGeocodeResult = {
      //   address: {
      //     roadAddress?: string;
      //     jibunAddress?: string;
      //   };
      // };

      interface NaverReverseGeocodeResponse {
        v2?: {
          address?: {
            roadAddress?: string;
            jibunAddress?: string;
          };
        };
      }

      naver.maps.Service.reverseGeocode(
        {
          coords: new naver.maps.LatLng(lat, lng),
          orders: "addr,roadaddr",
        },
        (status, response) => {
          console.log("✅ response 상태:", status);
          console.log("✅ response 원본:", response);
          try {
            if (status !== naver.maps.Service.Status.OK || !response) {
              throw new Error("주소를 가져올 수 없습니다. 도메인/API 키 확인 필요");
            }

            const result = response as NaverReverseGeocodeResponse;

            const address =
              result?.v2?.address?.roadAddress ??
              result?.v2?.address?.jibunAddress ??
              `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

            onLocationSelect(lat, lng, address);
          } catch (err) {
            console.error("주소 가져오기 실패:", err);
            onLocationSelect(lat, lng, "주소 없음");
          }
        }
      );
    });
  }, []);

  return <div ref={mapRef} className="w-full h-[400px] rounded-12 shadow-md" />;
}
