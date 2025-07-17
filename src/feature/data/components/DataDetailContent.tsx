"use client";

import TopSheet from "@/components/common/topsheet/TopSheet";
import { ButtonComponent } from "@components/common/button";
import ProfileCard from "@feature/mypage/components/sections/ProfileCard";

interface DataDetailContentProps {
  postId: string;
}

export default function DataDetailContent({ postId }: DataDetailContentProps) {
  // 임시 mock 데이터
  const mockData = {
    imageUrl: "/public/2gb.png",
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

      <div className="px-4 pt-[360px] space-y-20">
        <div className="flex items-center justify-between">
          <div className="title-md">판매자</div>
          <ButtonComponent variant={"outlineGray"} size="xs">
            글 수정하기
          </ButtonComponent>
        </div>
        <ProfileCard />
        <ButtonComponent variant={"primary"} className="w-full px-60">
          구매하기
        </ButtonComponent>

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
