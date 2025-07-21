"use client";

import { useEffect, useRef } from "react";

const AddressMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.naver || !mapRef.current) return;

    // 주소 → 좌표 변환
    naver.maps.Service.geocode(
      {
        query: "서울특별시 강남구 테헤란로 427",
      },
      function (status, response) {
        if (status !== naver.maps.Service.Status.OK) {
          alert("Geocode failed");
          return;
        }

        const { x, y } = response.v2.addresses[0]; // x: lng, y: lat
        const latlng = new naver.maps.LatLng(Number(y), Number(x));

        // 지도 그리기
        const map = new naver.maps.Map(mapRef.current!, {
          center: latlng,
          zoom: 16,
        });

        // 마커 찍기
        new naver.maps.Marker({
          position: latlng,
          map,
        });
      }
    );
  }, []);

  return <div ref={mapRef} className="w-full h-[300px] rounded-12 shadow-md" />;
};

export default AddressMap;
