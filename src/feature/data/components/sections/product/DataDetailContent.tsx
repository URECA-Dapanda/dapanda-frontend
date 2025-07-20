"use client";

import { useParams /* useRouter */ } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import { ChevronRight } from "lucide-react";
import { useProfileStore } from "@/stores/useProfileStore";
import TopSheet from "@/components/common/topsheet/TopSheet";
import { ButtonComponent } from "@components/common/button";
import ProfileCard from "@feature/data/components/sections/ProfileCard";
import { getDataDetail } from "@/feature/data/api/dataRequest";
import { DataDetailResponse } from "@/feature/data/types/dataType";
import { formatRelativeTime } from "@lib/time";
import ItemCard from "@components/common/card/ItemCard";
import FilterCardContent from "@feature/data/components/sections/filter/FilterCardContent";

export default function DataDetailContent() {
  const params = useParams();
  const [data, setData] = useState<DataDetailResponse | null>(null);
  const postId = String(params.postId);
  const currentUserId = useProfileStore((state) => state.id); // 로그인 유저 ID
  const isOwner = data && currentUserId === data.memberId;
  //const router = useRouter();
  // const handleGoToSellerItems = () => {
  //   router.push(`/data/seller/${data.memberId}`); // 실제 경로에 맞게 수정 예정
  // };

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await getDataDetail(postId);
      setData(res);
    };
    fetchDetail();
  }, [postId]);
  // useEffect(() => {
  //   const dummyData: DataDetailResponse = {
  //     productId: 1,
  //     itemId: 1,
  //     price: 3000,
  //     memberId: 123,
  //     memberName: "테스트판매자",
  //     remainAmount: 2.0,
  //     pricePer100MB: 300,
  //     averageRate: 4.7,
  //     reviewCount: 3,
  //     updatedAt: new Date().toISOString(),
  //     splitType: true, // 분할판매 ON
  //   };
  //   setData(dummyData);
  // }, []);

  if (!data) return <div className="text-center mt-20">로딩 중...</div>;

  const topSheetData = {
    imageUrl: `/${data.remainAmount}.png`,
    //imageUrl: `/${data.pricePer100MB}.png`,
    title: `${data.remainAmount}GB`,
    price: data.price,
    unitPrice: data.pricePer100MB,
    uploadTime: formatRelativeTime(data.updatedAt),
    recentPrice: 0,
    averagePrice: data.averageRate,
    hasReported: false,
  };

  const seller = {
    name: data.memberName,
    rating: data.averageRate,
    reviewCount: data.reviewCount,
  };

  return (
    <div className="relative">
      <TopSheet type="post" data={topSheetData} onImageClick={() => {}} />
      <div className="pt-[280px] space-y-12 px-24">
        {data.splitType && (
          <div className="bg-primary2 px-12 py-36 rounded-2xl">
            <FilterCardContent buttonText="구매하기" max={data.remainAmount} />
          </div>
        )}

        <div className="space-y-28">
          <div className="flex items-center justify-between">
            <div className="title-md">판매자</div>
            {isOwner && (
              <ButtonComponent variant={"outlineGray"} size="xs">
                글 수정하기
              </ButtonComponent>
            )}
          </div>
          <ProfileCard
            name={seller.name}
            joinDate="2024.01.15"
            rating={4.5}
            reviewCount={seller.reviewCount}
          />

          <ButtonComponent variant={"primary"} className="w-full">
            구매하기
          </ButtonComponent>
          <section>
            <div
              className="flex items-center mb-16 cursor-pointer" /*onClick={handleGoToSellerItems}*/
            >
              <h2 className="text-lg font-bold">{seller.name} 님의 판매 물품</h2>
              <ChevronRight className="w-24 h-24 pb-40" />
            </div>
            <div className="grid grid-cols-2 gap-68">
              <ItemCard>1</ItemCard>

              <ItemCard>2</ItemCard>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
