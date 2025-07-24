"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import InteractiveMap from "@feature/map/components/sections/regist/InteractiveMap";
import { ButtonComponent } from "@components/common/button";
import { getMapDetailById } from "@/feature/map/api/getMapDetailById";

export default function MapSelectLocationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = (searchParams.get("type") as "wifi" | "hotspot") ?? "wifi"; // type 쿼리에서 가져옴

  const [selected, setSelected] = useState<{ lat: number; lng: number; address: string } | null>(
    null
  );

  useEffect(() => {
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const address = searchParams.get("address");

    const isEdit = searchParams.get("edit") === "true";
    const productId = searchParams.get("id");

    // 쿼리로 넘어온 lat/lng/address가 있으면 그대로 사용
    if (lat && lng && address) {
      setSelected({
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        address: decodeURIComponent(address),
      });
    }

    //수정 모드일 경우 productId로 기존 상품 정보 불러오기
    else if (isEdit && productId) {
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
    console.log("선택된 위치", selected);
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
    router.push(`/map/regist/${type}/location`); // 위치 검색 페이지로 이동
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
