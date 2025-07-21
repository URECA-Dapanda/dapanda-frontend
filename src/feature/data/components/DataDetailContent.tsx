"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TopSheet from "@/components/common/topsheet/TopSheet";
import { ButtonComponent } from "@components/common/button";
import ProfileCard from "@feature/data/components/sections/ProfileCard";
import { getDataDetail } from "@/feature/data/api/dataRequest";
import { DataDetailResponse } from "@/feature/data/types/dataType";
import { formatRelativeTime } from "@lib/time";
import ItemCard from "@components/common/card/ItemCard";
import UsePaymentModals from "@feature/payment/hooks/usePaymentModals";
import { usePaymentStore } from "@feature/payment/stores/paymentStore";

export default function DataDetailContent() {
  const params = useParams();
  const [data, setData] = useState<DataDetailResponse | null>(null);
  const postId = String(params.postId);
  const renderModals = UsePaymentModals();
  const { setInfo } = usePaymentStore();

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await getDataDetail(postId);
      setData(res);
    };
    fetchDetail();
  }, [postId]);

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

  // 결제에 사용될 info mock 데이터
  // const paymentInfo = {
  //   type: "data" as const,
  //   title: `${data.remainAmount}GB`,
  //   price: `${data.price.toLocaleString()}원`,
  //   unitPrice: `${data.pricePer100MB.toLocaleString()}원`,
  //   badge: "자투리 구매" as const,
  //   seller: data.memberName,
  //   cash: "12,500원", // 추후 API 연동 예정
  //   remainingData: "5.98GB",
  // };
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

        <ButtonComponent 
          variant={"primary"} 
          className="w-full px-60"
          onClick={() =>
            setInfo({
              type: "data",
              title: `${data.remainAmount}GB`,
              price: `${data.price.toLocaleString()}원`,
              unitPrice: `${data.pricePer100MB.toLocaleString()}원`,
              badge: "자투리 구매",
              seller: data.memberName,
              cash: "12,500원",
              remainingData: "5.98GB",
            })
          }        >
          구매하기
        </ButtonComponent>

        <section>
          <h2 className="text-lg font-bold mb-2">{seller.name} 님의 다른 물품</h2>
          <div className="grid grid-cols-2 gap-3">
            <ItemCard>
              <div className="flex flex-col gap-8">
                <div className="w-full aspect-[3/2] bg-gray-100 rounded" />
              </div>
            </ItemCard>

            <ItemCard>
              <div className="flex flex-col gap-8">
                <div className="w-full aspect-[3/2] bg-gray-100 rounded" />
              </div>
            </ItemCard>
          </div>
        </section>
      </div>
      {renderModals}
    </div>
  );
}
