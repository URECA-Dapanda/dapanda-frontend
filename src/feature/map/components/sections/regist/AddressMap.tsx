"use client";

import { useEffect, useRef } from "react";

interface AddressMapProps {
  address: string;
  onLatLngChange?: (lat: number, lng: number) => void;
}

const AddressMap = ({ address, onLatLngChange }: AddressMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.naver || !mapRef.current || !address) return;

    mapRef.current.id = "map";

    (window.naver.maps.Service as any).searchAddressByKeyword(
      address,
      (
        status: naver.maps.Service.Status,
        response: {
          v2: {
            addresses: {
              x: string;
              y: string;
              roadAddress?: string;
              jibunAddress?: string;
            }[];
          };
        }
      ) => {
        console.log("응답:", response);

        if (
          status !== naver.maps.Service.Status.OK ||
          !response.v2.addresses ||
          response.v2.addresses.length === 0
        ) {
          alert("해당 주소를 찾을 수 없습니다.");
          return;
        }

        const result = response.v2.addresses[0];
        const lat = Number(result.y);
        const lng = Number(result.x);

        const latlng = new naver.maps.LatLng(lat, lng);

        const map = new naver.maps.Map(mapRef.current!, {
          center: latlng,
          zoom: 16,
        });

        new naver.maps.Marker({ position: latlng, map });

        onLatLngChange?.(lat, lng);
      }
    );
  }, [address]);

  return <div ref={mapRef} className="w-full h-[300px] rounded-12 shadow-md" />;
};

export default AddressMap;
