"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MapContainer from "@/feature/map/components/sections/product/MapContainer";
import MapItemCard from "@/feature/map/components/sections/product/MapItemCard";
import { BottomSheetHeader, BaseBottomSheet } from "@components/common/bottomsheet";
import { MapType } from "@/feature/map/types/mapType";

export default function MapPage() {
  const router = useRouter();
  const [isSnapOpen, setIsSnapOpen] = useState(false);
  const [storeList, setStoreList] = useState<MapType[]>([]);

  return (
    <div className="relative w-full h-[calc(100vh-56px)]">
      <MapContainer onStoreListUpdate={setStoreList} />

      {/* 등록 버튼 */}
      <button
        className="absolute top-24 right-24 z-10 px-16 py-8 bg-primary text-white rounded-20 shadow-md body-sm"
        onClick={() => router.push("/map/regist/hotspot")}
      >
        + 등록
      </button>

      {/* 목록 보기 버튼 */}
      <button
        onClick={() => setIsSnapOpen(true)}
        className="absolute bottom-80 left-1/2 -translate-x-1/2 z-10 px-20 py-10 bg-white border border-gray-400 rounded-20 text-black shadow-md body-sm"
      >
        목록 보기
      </button>

      {/* 바텀시트 - 카드 목록 */}
      <BaseBottomSheet
        isOpen={isSnapOpen}
        onClose={() => setIsSnapOpen(false)} // 닫기 동작 시 상태 업데이트
        variant="hybrid"
        snapHeight={300}
      >
        <BottomSheetHeader title="주변 매장 목록" />
        <div className="p-4 space-y-12 mt-12">
          {storeList.map((store) => (
            <MapItemCard key={store.id} data={store} />
          ))}
        </div>
      </BaseBottomSheet>
    </div>
  );
}
