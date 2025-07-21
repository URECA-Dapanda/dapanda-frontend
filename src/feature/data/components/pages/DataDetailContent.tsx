"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TopSheet from "@/components/common/topsheet/TopSheet";
import { ButtonComponent } from "@components/common/button";
import ProfileCard from "@feature/data/components/sections/default/ProfileCard";
import { getDataDetail } from "@/feature/data/api/dataRequest";
import { DataDetailResponse } from "@/feature/data/types/dataType";
import { formatRelativeTime } from "@lib/time";
import ItemCard from "@components/common/card/ItemCard";
import UsePaymentModals from "@feature/payment/hooks/usePaymentModals";
import { usePaymentStore } from "@feature/payment/stores/paymentStore";
import FilterCardContent from "../sections/filter/FilterCardContent";
import { useProfileStore } from "@stores/useProfileStore";
import { ChevronRight } from "lucide-react";

export default function DataDetailContent() {
  const params = useParams();
  const [data, setData] = useState<DataDetailResponse | null>(null);
  const postId = String(params.postId);
  const renderModals = UsePaymentModals();
  const { setInfo } = usePaymentStore();
  const currentUserId = useProfileStore((state) => state.id); // 로그인 유저 ID
  const isOwner = data && currentUserId === data.memberId;

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
      <div className="pt-[280px] space-y-12 px-24">
        {data.splitType && (
          <div className="bg-primary2 px-12 py-36 rounded-2xl">
            <FilterCardContent
              buttonText="구매하기"
              max={data.remainAmount}
              onValueChange={() => {}}
              onButtonClick={() => {}}
              value={[]}
            />
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
          <ProfileCard name={seller.name} rating={seller.rating} reviewCount={seller.reviewCount} />
          <div className="flex justify-center px-36">
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
              }
            >
              구매하기
            </ButtonComponent>
          </div>
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
      {renderModals}
    </div>
  );
}
