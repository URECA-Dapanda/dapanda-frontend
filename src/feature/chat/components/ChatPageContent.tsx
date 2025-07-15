"use client";

import { useState } from "react";
import TopSheet from "@/components/common/topsheet/TopSheet";
import FullScreenModal from "@/components/common/modal/FullScreenModal";

export default function ChatPageContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const postData = {
    imageUrl: "/2gb.png",
    uploadTime: "3시간",
    title: "5GB",
    price: 5000,
    unitPrice: 1000,
    recentPrice: 2000,
    averagePrice: 2100,
    hasReported: true,
  };

  const wifiData = {
    imageUrl: "/starbucks.png",
    place: "스타벅스 강남점",
    address: "서울 서대문구 연세로 22",
    openTime: "08:00",
    closeTime: "22:00",
    pricePer10min: 200,
    description: "강남역 2번 출구 앞에 있는 스타벅스",
    recentPrice: 2000,
    averagePrice: 1000,
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">
      <TopSheet type="wifi" data={wifiData} onImageClick={() => setIsModalOpen(true)} />

      {isModalOpen && (
        <FullScreenModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <img
            src={wifiData.imageUrl}
            alt="확대 이미지"
            className="max-w-screen max-h-screen w-auto h-auto object-contain"
          />
        </FullScreenModal>
      )}
    </div>
  );
}
