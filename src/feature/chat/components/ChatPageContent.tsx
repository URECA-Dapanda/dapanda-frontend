"use client";

import TopSheet from "@/components/common/topsheet/TopSheet";

export default function ChatPageContent() {
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
    imageUrl: "/creditIcon.png",
    place: "할리스커피 신촌점",
    address: "서울 서대문구 연세로 22",
    openTime: "08:00",
    closeTime: "22:00",
    pricePer10min: 200,
    description: "조용하고 속도 빠름",
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">
      <TopSheet type="post" data={postData} />
    </div>
  );
}
