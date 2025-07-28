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

  const [selected, setSelected] = useState<{
    lat: number;
    lng: number;
    roadAddress: string;
    jibunAddress?: string;
    postalCode?: string;
  } | null>(null);

  useEffect(() => {
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const address = searchParams.get("address");
    const isEdit = searchParams.get("edit") === "true";
    const productId = searchParams.get("productId");

    if (lat && lng && address) {
      setSelected({
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        roadAddress: decodeURIComponent(address),
        jibunAddress: undefined,
        postalCode: undefined,
      });
    } else if (isEdit && productId) {
      getMapDetailById(productId).then((data) => {
        setSelected({
          lat: data.latitude,
          lng: data.longitude,
          roadAddress: data.address,
          jibunAddress: undefined,
          postalCode: undefined,
        });
      });
    }
  }, [searchParams]);

  const handleNext = () => {
    if (!selected) return alert("위치를 선택해주세요");
    const { lat, lng, roadAddress } = selected;
    const edit = searchParams.get("edit");
    const productId = searchParams.get("productId");

    const baseUrl = `/map/regist/${type}/form`;
    const query = `lat=${lat}&lng=${lng}&address=${encodeURIComponent(roadAddress)}`;
    const editParams = edit === "true" && productId ? `&edit=true&id=${productId}` : "";

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
      <div className="absolute top-[64px] bottom-[200px] left-0 right-0">
        <InteractiveMap
          onLocationSelect={(lat, lng, roadAddress, jibunAddress, postalCode) => {
            setSelected({ lat, lng, roadAddress, jibunAddress, postalCode });
          }}
        />

        {/* 지도 안내 텍스트 (중앙 상단) */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 px-16 py-6 bg-black-60 text-white rounded-full text-sm shadow whitespace-nowrap">
          지도를 움직여 위치를 지정하세요
        </div>
      </div>

      {/* 선택된 주소 정보 - 실제 데이터 사용 */}
      {selected && (
        <div className="absolute bottom-[80px] left-0 w-full px-24">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-16">
            <div className="text-pink-500 font-semibold text-lg mb-8">{selected.roadAddress}</div>
            <div className="text-xs text-gray-500 space-y-4">
              {selected.jibunAddress && (
                <div className="flex items-center gap-8">
                  <span className="bg-gray-100 px-8 py-4 rounded text-xs">지번</span>
                  <span>{selected.jibunAddress}</span>
                </div>
              )}
              {selected.postalCode && (
                <div className="flex items-center gap-8">
                  <span className="bg-gray-100 px-8 py-4 rounded text-xs">우편번호</span>
                  <span>{selected.postalCode}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 하단 고정 버튼 */}
      <div className="absolute bottom-0 left-0 w-full px-24 py-20 bg-white border-t border-gray-200">
        <ButtonComponent
          variant="primary"
          size="xl"
          onClick={handleNext}
          className="w-full bg-pink-500 hover:bg-pink-600"
        >
          다음 단계로
        </ButtonComponent>
      </div>
    </div>
  );
}
