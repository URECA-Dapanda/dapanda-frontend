"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import InteractiveMap from "@feature/map/components/sections/regist/InteractiveMap";
import { ButtonComponent } from "@components/common/button";
import { getMapDetailById } from "@/feature/map/api/getMapDetailById";

export default function MapSelectLocationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = (searchParams.get("type") as "wifi" | "hotspot") ?? "wifi";

  const [selected, setSelected] = useState<{ lat: number; lng: number; address: string } | null>(
    null
  );

  useEffect(() => {
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const address = searchParams.get("address");
    const isEdit = searchParams.get("edit") === "true";
    const productId = searchParams.get("id");

    if (lat && lng && address) {
      setSelected({
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        address: decodeURIComponent(address),
      });
    } else if (isEdit && productId) {
      getMapDetailById(productId).then((data) => {
        setSelected({
          lat: data.latitude,
          lng: data.longitude,
          address: data.address,
        });
      });
    }
  }, [searchParams]);

  const handleNext = () => {
    if (!selected) return alert("위치를 선택해주세요");
    const { lat, lng, address } = selected;
    const edit = searchParams.get("edit");
    const id = searchParams.get("id");

    const baseUrl = `/map/regist/${type}/form`;
    const query = `lat=${lat}&lng=${lng}&address=${encodeURIComponent(address)}`;
    const editParams = edit === "true" && id ? `&edit=true&id=${id}` : "";

    router.push(`${baseUrl}?${query}${editParams}`);
  };

  const goToSearch = () => {
    router.push(`/map/regist/${type}/location`);
  };

  return (
    <div className="relative w-full h-screen max-w-[500px] mx-auto">
      {/* 상단 헤더 */}
      <div className="absolute top-0 left-0 w-full z-10 bg-white px-24 py-20 flex justify-between items-center border-b border-gray-200">
        <h1 className="title-md">지도에서 위치 선택</h1>
        <button onClick={goToSearch} className="text-primary underline text-sm">
          위치 검색
        </button>
      </div>

      {/* 지도 영역 */}
      <div className="absolute top-[64px] bottom-[160px] left-0 right-0">
        <InteractiveMap
          onLocationSelect={(lat, lng, address) => {
            setSelected({ lat, lng, address });
          }}
        />

        {/* 지도 안내 텍스트 (중앙 상단) */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 px-16 py-6 bg-black-60 text-white rounded-full text-sm shadow">
          지도를 움직여 위치를 지정하세요
        </div>
      </div>

      {/* 선택된 주소 */}
      {selected && (
        <div className="absolute bottom-[100px] left-0 w-full text-center px-24">
          <div className="text-primary font-semibold text-sm truncate">{selected.address}</div>
        </div>
      )}

      {/* 하단 고정 버튼 */}
      <div className="absolute bottom-0 left-0 w-full px-24 py-20 bg-white border-t border-gray-200">
        <ButtonComponent variant="primary" size="xl" onClick={handleNext} className="w-full">
          다음 단계로
        </ButtonComponent>
      </div>
    </div>
  );
}
