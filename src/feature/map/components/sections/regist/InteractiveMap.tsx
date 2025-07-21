import { useEffect, useRef } from "react";

interface InteractiveMapProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
}

export default function InteractiveMap({ onLocationSelect }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const infoWindowRef = useRef<naver.maps.InfoWindow | null>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);

  useEffect(() => {
    if (!window.naver || !mapRef.current) return;

    const map = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(37.5665, 126.978), // 초기 중심
      zoom: 15,
    });

    infoWindowRef.current = new naver.maps.InfoWindow({ content: "", borderWidth: 0 });

    naver.maps.Event.addListener(map, "click", (e) => {
      const lat = e.coord.lat();
      const lng = e.coord.lng();
      const latlng = new naver.maps.LatLng(lat, lng);

      // 기존 마커 제거
      if (markerRef.current) markerRef.current.setMap(null);
      markerRef.current = new naver.maps.Marker({ map, position: latlng });

      // 👉 새 방식: v2.results 기반 주소 처리
      naver.maps.Service.reverseGeocode(
        {
          coords: latlng,
          orders: [naver.maps.Service.OrderType.ADDR, naver.maps.Service.OrderType.ROAD_ADDR].join(
            ","
          ),
        },
        (
          status: naver.maps.Service.Status,
          response: naver.maps.Service.ReverseGeocodeResponse
        ) => {
          if (status === naver.maps.Service.Status.ERROR || !response?.v2?.results?.length) {
            infoWindowRef.current?.setContent(
              '<div style="padding:10px;">주소를 가져올 수 없습니다.</div>'
            );
            infoWindowRef.current?.open(map, latlng);
            onLocationSelect(lat, lng, "주소 없음");
            return;
          }

          const results = response.v2.results;
          const htmlAddresses: string[] = [];

          results.forEach((item) => {
            const addrType = item.name === "roadaddr" ? "[도로명 주소]" : "[지번 주소]";
            const region = item.region;
            const land = item.land;

            const address =
              `${region.area1.name} ${region.area2.name} ${region.area3.name} ${
                region.area4.name || ""
              } ` +
              `${land.number1 || ""}${land.number2 ? "-" + land.number2 : ""} ` +
              `${land.addition0?.value || ""}`.trim();

            htmlAddresses.push(`${addrType} ${address}`);
          });

          const contentHtml = `
            <div style="padding:10px;min-width:200px;line-height:150%;">
              ${htmlAddresses.join("<br />")}
            </div>
          `;

          infoWindowRef.current?.setContent(contentHtml);
          infoWindowRef.current?.open(map, latlng);

          // 상위 컴포넌트에 첫 번째 주소 전달
          onLocationSelect(lat, lng, htmlAddresses[0] || "주소 없음");
        }
      );
    });
  }, []);

  return <div ref={mapRef} className="w-full h-[400px] rounded-12 shadow-md" />;
}
