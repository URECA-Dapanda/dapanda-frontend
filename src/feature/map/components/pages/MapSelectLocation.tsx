"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import InteractiveMap from "../sections/regist/InteractiveMap";
import { ButtonComponent } from "@components/common/button";

export default function MapSelectLocationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = (searchParams.get("type") as "wifi" | "hotspot") ?? "wifi"; // ✅ type 쿼리에서 가져옴

  const [selected, setSelected] = useState<{ lat: number; lng: number; address: string } | null>(
    null
  );

  const handleNext = () => {
    console.log("선택된 위치", selected);
    if (!selected) return alert("위치를 선택해주세요");
    const { lat, lng, address } = selected;
    router.push(
      `/map/regist/${type}/form?lat=${lat}&lng=${lng}&address=${encodeURIComponent(address)}`
    );
  };

  const goToSearch = () => {
    router.push(`/map/regist/${type}/location`); // ✅ 위치 검색 페이지로 이동
  };

  return (
    <div className="space-y-16 p-24 max-w-[375px] mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="title-md">지도에서 위치 선택</h1>
        <button onClick={goToSearch} className="text-primary underline text-sm">
          위치 검색
        </button>
      </div>

      <div className="relative">
        <InteractiveMap
          onLocationSelect={(lat, lng, address) => {
            setSelected({ lat, lng, address });
          }}
        />
        <div className="absolute top-0 left-0 w-full px-16 py-8 bg-black-60 text-white">
          지도를 움직여 위치를 지정하세요.
        </div>
      </div>

      {selected && <div className="text-center text-primary font-semibold">{selected.address}</div>}

      <ButtonComponent variant="primary" size="xl" onClick={handleNext}>
        다음 단계로
      </ButtonComponent>
    </div>
  );
}
