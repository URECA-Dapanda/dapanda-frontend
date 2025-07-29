"use client";

import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import { BaseBottomSheet } from "@components/common/bottomsheet";
import TopSheet from "@/components/common/topsheet/TopSheet";
import { ButtonComponent } from "@components/common/button";
import ProfileCard from "@feature/data/components/sections/default/ProfileCard";
import { formatRelativeTime } from "@lib/time";
import UsePaymentModals from "@feature/payment/hooks/usePaymentModals";
import { usePaymentStore } from "@feature/payment/stores/paymentStore";
import FilterCardContent from "@feature/data/components/sections/filter/FilterCardContent";
import {
  buildDefaultPaymentInfo,
  buildSplitPaymentInfo,
} from "@feature/data/hooks/usePurchaseBuilder";
import { useDataDetail } from "@feature/data/hooks/useDataDetail";
import { usePriceRecommendation } from "@feature/data/hooks/usePriceRecommendation";
import { useMonthlyDataLimit } from "@feature/data/hooks/useMonthlyDataLimit";
import clsx from "clsx";
import DeletePostModal from "@feature/data/components/sections/modal/DeletePostModal";
import DataRegistModal from "@feature/data/components/sections/modal/DataRegistModal";
import { BadgeComponent } from "@components/common/badge";
import { formatDataSize } from "@lib/formatters";
import OverLimitAlert from "@feature/data/components/sections/default/OverLimitAlert";
import { Trash2, Pencil } from "lucide-react";

export default function DataDetailContent() {
  const { postId } = useParams<{ postId: string }>();
  const { data, isPending, refetch } = useDataDetail(postId);
  const { setInfo } = usePaymentStore();
  const isOwner = data?.myProduct;
  const renderModals = UsePaymentModals();
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [topSheetExpanded, setTopSheetExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { recentPrice, avgPrice } = usePriceRecommendation();
  const handleDeleteModalOpen = useCallback(() => setIsOpen(true), []);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { remainingBuying, remainingSelling, isLoading: isLimitLoading } = useMonthlyDataLimit();

  if (isPending || !data) return <div className="text-center mt-20">로딩 중...</div>;
  const isOverLimit = remainingBuying !== undefined && data.remainAmount > remainingBuying;
  const effectiveMaxAmount = Math.min(data.remainAmount, remainingBuying ?? data.remainAmount);

  const handleSplitPurchase = () => {
    setInfo(buildSplitPaymentInfo(data, selectedAmount));
  };
  const handleDefaultPurchase = () => {
    setInfo(buildDefaultPaymentInfo(data));
  };

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
          recentPrice: recentPrice != null ? data.remainAmount * 10 * recentPrice : undefined,
          averagePrice: avgPrice != null ? data.remainAmount * 10 * avgPrice : undefined,
          hasReported: false,
          memberName: data.memberName,
        }}
        onImageClick={() => { }}
        onExpandChange={setTopSheetExpanded}
      />
      <div
        className={clsx(
          "space-y-12 px-24 transition-all duration-300",
          topSheetExpanded ? "pt-[450px]" : "pt-[300px]"
        )}
      />

      <div className="space-y-28">
        <div className="flex items-center justify-between mx-24 mb-16">
          <div className="title-md">판매자</div>
          {!!isOwner && (
            <div className="flex flex-row gap-4">
              <ButtonComponent variant={"outlineGray"} size="xs" onClick={handleDeleteModalOpen}>
                <Trash2 className="w-12 h-12 mr-2" />
                삭제하기
              </ButtonComponent>
              <ButtonComponent
                variant={"outlineGray"}
                size="xs"
                onClick={() => setEditModalOpen(true)}>
                <Pencil className="w-12 h-12 mr-2" />
                수정하기
              </ButtonComponent>
            </div>
          )}
        </div>

        <ProfileCard sellerId={data.memberId} />

        <div className="space-y-12 px-24 pb-28">
          {data.splitType && (
            <div className="bg-primary2 w-[327px] p-16 rounded-20">
              <FilterCardContent
                buttonText={isOwner ? "내 게시글입니다" : "구매하기"}
                max={effectiveMaxAmount}
                value={[selectedAmount]}
                onValueChange={(v) => setSelectedAmount(v[0])}
                onButtonClick={isOwner ? undefined : handleSplitPurchase}
                disabled={isOwner} />
            </div>
          )}
          {!isLimitLoading && (
            <div className="flex flex-wrap gap-8">
              <BadgeComponent variant="outlined">
                이번 달 구매 가능: <span className="font-semibold ml-4">{formatDataSize(remainingBuying ?? 0)}</span>
              </BadgeComponent>
              <BadgeComponent variant="outlined">
                이번 달 판매 가능: <span className="font-semibold ml-4">{formatDataSize(remainingSelling ?? 0)}</span>
              </BadgeComponent>
            </div>
          )}
          {/* 구매 가능 초과 경고 */}
          <OverLimitAlert
            isSplitType={data.splitType}
            selectedAmount={selectedAmount}
            remainAmount={data.remainAmount}
            remainingBuying={remainingBuying}
          />

          {!data.splitType && (
            <div className="flex justify-center mt-24">
              <ButtonComponent
                variant={"primary"}
                className="w-full px-60"
                onClick={isOwner || isOverLimit ? undefined : handleDefaultPurchase}
                disabled={isOwner || isOverLimit}
              >
                구매하기
              </ButtonComponent>
            </div>
          )}
        </div>
      </div>

      <DeletePostModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <BaseBottomSheet
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        variant="modal"
        zIndex={100}
      >
        <DataRegistModal
          mode="edit"
          onClose={() => { setEditModalOpen(false); refetch(); }}
          defaultValues={{
            productId: data.productId,
            price: data.price,
            amount: data.remainAmount,
            isSplitType: data.splitType,
          }}
        />
      </BaseBottomSheet>

      {renderModals}

    </div>
  );
}
