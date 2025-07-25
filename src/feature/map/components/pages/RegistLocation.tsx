"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AddressSearchMap from "@/feature/map/components/sections/regist/AddressMap";
import { ButtonComponent } from "@components/common/button";

interface RegistLocationProps {
  type: "hotspot" | "wifi";
}

export default function RegistLocation({ type }: RegistLocationProps) {
  const router = useRouter();
  const [latLng, setLatLng] = useState<{ lat: number; lng: number } | null>(null);

  const handleNext = () => {
    if (!latLng) {
      alert("위치를 선택해주세요.");
      return;
    }
    router.push(`/map/regist/${type}?lat=${latLng.lat}&lng=${latLng.lng}`);
  };

  return (
    <div className="p-24 space-y-24 max-w-[375px] mx-auto">
      <h1 className="title-md">{type === "hotspot" ? "핫스팟" : "와이파이"} 위치 등록</h1>

      {/* 주소 입력 + 자동완성 + 지도 표시 포함 */}
      <AddressSearchMap onLatLngChange={(lat, lng) => setLatLng({ lat, lng })} />

      <ButtonComponent variant="primary" size="lg" onClick={handleNext}>
        다음
      </ButtonComponent>
    </div>
  );
}
