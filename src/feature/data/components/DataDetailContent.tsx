"use client";

import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import TopSheet from "@/components/common/topsheet/TopSheet";
import { ButtonComponent } from "@components/common/button";
import ProfileCard from "@feature/data/components/sections/ProfileCard";
import { getDataDetail } from "@/feature/data/api/dataRequest";
import { DataDetailResponse } from "@/feature/data/types/dataType";
import { formatRelativeTime } from "@lib/time";

interface DataDetailContentProps {
  postId: string;
}

export default function DataDetailContent({ postId }: DataDetailContentProps) {
  const [data, setData] = useState<DataDetailResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("postId: ", postId);
    console.log("요청한 postId = productId:", postId);

    const fetchDetail = async () => {
      try {
        const res = await getDataDetail(postId);
        setData(res);
      } catch (err: unknown) {
        const error = err as AxiosError<{ code: number }>;
        const code = error.response?.data?.code;
        if (code === 3002) {
          setError("존재하지 않는 상품입니다.");
        } else if (code === 3003) {
          setError("유효하지 않은 상품입니다.");
        } else {
          setError("상품 조회 실패");
        }
      }
    };
    fetchDetail();
  }, [postId]);

  if (error) return <div className="text-red-500 text-center mt-20">{error}</div>;
  if (!data) return <div className="text-center mt-20">로딩 중...</div>;

  const topSheetData = {
    imageUrl: `/public/${data.pricePer100MB}.png`,
    //imageUrl: `/${data.pricePer100MB}.png`,
    title: `${data.remainAmount}GB 데이터 팝니다`,
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

      <div className="px-4 pt-[360px] space-y-20">
        <div className="flex items-center justify-between">
          <div className="title-md">판매자</div>
          <ButtonComponent variant={"outlineGray"} size="xs">
            글 수정하기
          </ButtonComponent>
        </div>
        <ProfileCard name={seller.name} joinDate="2024.01.15" reviewCount={seller.reviewCount} />
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
