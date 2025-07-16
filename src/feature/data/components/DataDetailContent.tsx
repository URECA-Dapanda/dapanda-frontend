"use client";

import TopSheet from "@/components/common/topsheet/TopSheet";
import { Button } from "@/components/ui/button";

interface DataDetailContentProps {
  postId: string;
}

export default function DataDetailContent({ postId }: DataDetailContentProps) {
  // 임시 mock 데이터
  const mockData = {
    imageUrl: "/images/2gb.png",
    title: "2GB 데이터 팝니다",
    price: 8000,
    unitPrice: 400,
    uploadTime: "3시간",
    recentPrice: 2000,
    averagePrice: 2100,
    hasReported: false,
  };

  const seller = {
    name: "김데이터",
    rating: 4.9,
    reviewCount: 3,
  };

  return (
    <div className="relative">
      <TopSheet
        type="post"
        data={mockData}
        onImageClick={() => {
          /* 나중에 풀스크린 모달 열기 처리 */
        }}
      />

      <div className="px-4 pt-[360px] pb-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
            <div>
              <p className="font-semibold">{seller.name}</p>
              <p className="text-sm text-gray-500">
                ⭐ {seller.rating} ({seller.reviewCount}개의 리뷰)
              </p>
            </div>
          </div>
          <button className="text-sm text-gray-500 border px-2 py-1 rounded">글 수정하기</button>
        </div>

        <Button className="w-full bg-primary text-white text-lg py-3">구매하기</Button>

        <section>
          <h2 className="text-lg font-bold mb-2">{seller.name} 님의 다른 물품</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-[3/2] bg-gray-100 rounded" />
            <div className="aspect-[3/2] bg-gray-100 rounded" />
          </div>
        </section>
      </div>
    </div>
  );
}
