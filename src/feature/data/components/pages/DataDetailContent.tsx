"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import TopSheet from "@/components/common/topsheet/TopSheet";
import { ButtonComponent } from "@components/common/button";
import ProfileCard from "@feature/data/components/sections/default/ProfileCard";
import { formatRelativeTime } from "@lib/time";
import UsePaymentModals from "@feature/payment/hooks/usePaymentModals";
import { usePaymentStore } from "@feature/payment/stores/paymentStore";
import FilterCardContent from "@feature/data/components/sections/filter/FilterCardContent";
import { useProfileStore } from "@stores/useProfileStore";
import { buildDefaultPaymentInfo, buildScrapPaymentInfo } from "@feature/data/hooks/usePurchaseBuilder";
import { useDataDetail } from "@feature/data/hooks/useDataDetail";
import clsx from "clsx";

export default function DataDetailContent() {
  const { postId } = useParams() as { postId: string };
  const { data, loading } = useDataDetail(postId);
  const { setInfo } = usePaymentStore();
  const currentUserId = useProfileStore((state) => state.id);
  const isOwner = data && currentUserId === data.memberId;
  const renderModals = UsePaymentModals();

  const [selectedAmount, setSelectedAmount] = useState(0);
  const [topSheetExpanded, setTopSheetExpanded] = useState(false);

  if (loading || !data) return <div className="text-center mt-20">로딩 중...</div>;

  return (
    <div className="relative">
      <TopSheet
        type="post"
        data={{
          imageUrl: `/${data.remainAmount}.png`,
          title: `${data.remainAmount}GB`,
          price: data.price,
          unitPrice: data.pricePer100MB,
          uploadTime: formatRelativeTime(data.updatedAt),
          recentPrice: 0,
          averagePrice: data.averageRate,
          hasReported: false,
        }}
        onImageClick={() => {}}
        onExpandChange={setTopSheetExpanded}
      />

      <div className={clsx("space-y-12 px-24 transition-all duration-300", topSheetExpanded ? "pt-[430px]" : "pt-[280px]")} />

      <div className="space-y-28">
        <div className="flex items-center justify-between mx-24 mb-16">
          <div className="title-md">판매자</div>
          {isOwner && (
            <ButtonComponent variant={"outlineGray"} size="xs">
              글 수정하기
            </ButtonComponent>
          )}
        </div>

        <ProfileCard name={data.memberName} rating={data.averageRate} reviewCount={data.reviewCount} />

        <div className="space-y-12 px-24 pb-28">
          {data.splitType && (
            <div className="bg-primary2 w-[327px] p-16 rounded-20">
              <FilterCardContent
                buttonText="구매하기"
                max={data.remainAmount}
                value={[selectedAmount]}
                onValueChange={(v) => setSelectedAmount(v[0])}
                onButtonClick={() => {
                  setInfo(buildScrapPaymentInfo(data, selectedAmount));
                }}
              />
            </div>
          )}

          {!data.splitType && (
            <div className="flex justify-center">
              <ButtonComponent
                variant={"primary"}
                className="w-full px-60"
                onClick={() => setInfo(buildDefaultPaymentInfo(data))}
              >
                구매하기
              </ButtonComponent>
            </div>
          )}
        </div>
      </div>

      {renderModals}
    </div>
  );
}