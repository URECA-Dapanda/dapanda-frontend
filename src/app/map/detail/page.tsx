"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TopSheet from "@/components/common/topsheet/TopSheet";
import TimeSelector from "@/feature/map/components/sections/product/TimeSelector";
import clsx from "clsx";
import MapProfileCard from "@feature/map/components/sections/product/MapProfileCard";
import { ButtonComponent } from "@components/common/button";
import type { SellerProfile } from "@feature/map/types/sellerType";
import { useTimerStore } from "@/stores/useTimerStore";

export default function MapDetailPage() {
  type Time = {
    hour: string;
    minute: string;
    period: "AM" | "PM";
  };
  type DummyDataType = {
    id: string;
    type: string;
    imageUrl: string[];
    place: string;
    address: string;
    openTime: string;
    closeTime: string;
    pricePer10min: number;
    description: string;
    recentPrice: number;
    averagePrice: number;
  };

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [topSheetExpanded, setTopSheetExpanded] = useState(false);

  const [startTime, setStartTime] = useState<Time>({ hour: "07", minute: "00", period: "AM" });
  const [endTime, setEndTime] = useState<Time>({ hour: "09", minute: "00", period: "PM" });

  const router = useRouter();

  const dummyList: Record<string, DummyDataType> = {
    "1": {
      id: "1",
      type: "와이파이",
      imageUrl: ["/starbucks.png"],
      place: "스타벅스 강남",
      address: "서울시 강남구 테헤란로 123",
      openTime: "09:00",
      closeTime: "22:00",
      pricePer10min: 300,
      description: "전원이 있고 빠른 와이파이 가능",
      recentPrice: 250,
      averagePrice: 280,
    },
    "2": {
      id: "2",
      type: "와이파이",
      imageUrl: ["/starbucks.png"],
      place: "이디야 역삼",
      address: "서울시 강남구 역삼동 456",
      openTime: "08:00",
      closeTime: "21:00",
      pricePer10min: 200,
      description: "콘센트 있음, 조용한 분위기",
      recentPrice: 180,
      averagePrice: 190,
    },
  };

  const dummySeller: SellerProfile = {
    id: "1",
    name: "김판다",
    rating: 4.5,
    reviewCount: 3,
  };

  const data = dummyList[id ?? "1"];

  return (
    <div className="w-[375px] mx-auto relative">
      {/* TopSheet (고정된 위치) */}
      <TopSheet
        type="wifi"
        data={data}
        onImageClick={() => {}}
        onExpandChange={setTopSheetExpanded} // 확장 여부 전달받기
      />

      {/* TimeSelector 영역 */}
      <div
        className={clsx(
          "transition-all duration-300 px-24 py-24",
          topSheetExpanded ? "pt-[500px]" : "pt-[280px]"
        )}
      >
        <div className="px-6 py-6 rounded-lg">
          <h3 className="title-md mb-4">이용할 시간</h3>
          <div className="flex items-center justify-center gap-8 mt-12 rounded-12 shadow-material px-24 py-20">
            <TimeSelector label="Start" time={startTime} onChange={setStartTime} type="start" />
            <div className="text-2xl text-gray-400 mt-6">→</div>
            <TimeSelector label="End" time={endTime} onChange={setEndTime} type="end" />
          </div>
        </div>
        <div className="px-6 py-6 rounded-lg">
          <h3 className="title-md mb-4 mt-12">판매자</h3>
          <MapProfileCard seller={dummySeller} />
        </div>
        <div className="px-6 mt-12">
          <ButtonComponent
            className="w-full"
            variant="primary"
            size="xl"
            onClick={() => {
              useTimerStore.getState().startTimer(120);
              router.push("/data");
            }}
          >
            구매하기
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
}
