"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AddressMap from "@/feature/map/components/sections/regist/AddressMap";
import InputComponent from "@components/common/input/InputComponent";
import { ButtonComponent } from "@components/common/button";

interface RegistLocationProps {
  type: "hotspot" | "wifi";
}

export default function RegistLocation({ type }: RegistLocationProps) {
  const router = useRouter();

  const [inputAddress, setInputAddress] = useState("서울 강남구");
  const [searchAddress, setSearchAddress] = useState("서울 강남구");
  const [latLng, setLatLng] = useState<{ lat: number; lng: number } | null>(null);

  const handleSearch = () => {
    setSearchAddress(inputAddress);
  };

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

      <div className="flex gap-8">
        <InputComponent
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
          placeholder="예: 서울 강남구 테헤란로 123"
        />
        <ButtonComponent size="md" variant="outlineGray" onClick={handleSearch}>
          검색
        </ButtonComponent>
      </div>

      <AddressMap address={searchAddress} onLatLngChange={(lat, lng) => setLatLng({ lat, lng })} />

      <ButtonComponent variant="primary" size="lg" onClick={handleNext}>
        다음
      </ButtonComponent>
    </div>
  );
}
