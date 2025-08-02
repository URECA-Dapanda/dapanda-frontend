"use client";

import { useState } from "react";
import { ButtonComponent } from "@/components/common/button";
import { Search } from "lucide-react";
import ScrapFilterCard from "@feature/data/components/sections/filter/ScrapFilterCard";
import ScrapLoadingState from "@feature/data/components/sections/scrap/ScrapLoadingState";
import { useScrapRecommendation } from "@feature/data/hooks/useScrapRecommendation";
import CollapsibleDataList from "@feature/data/components/sections/default/CollapsibleDataList";
import EmptyState from "@components/common/empty/EmptyState";
import { usePaymentStore } from "@feature/payment/stores/paymentStore";
import UsePaymentModals from "@feature/payment/hooks/usePaymentModals";
import { formatPriceString } from "@lib/formatters";
import { mapRawToDataType } from "@feature/data/types/dataType";

export default function ScrapTabContent() {
  const { value, setValue, loading, result, summary, search } = useScrapRecommendation();
  const [hasSearched, setHasSearched] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const setPayment = usePaymentStore((state) => state.setInfo);
  const renderModals = UsePaymentModals();

  const handleSearch = async () => {
    setHasSearched(true);
    await search();
  };

  // UI용: DataType으로 변환 (문자열로 표시용)
  const displayItems = result.map(mapRawToDataType);

  // 결제용: 실제 숫자 계산용 데이터
  const transformedCombinations = result.map((item) => ({
    productId: item.productId,
    mobileDataId: item.mobileDataId,
    memberName: item.memberName,
    price: item.price,
    pricePer100MB: item.pricePer100MB,
    purchasePrice: Math.floor(item.purchaseAmount! * item.pricePer100MB * 10),
    remainAmount: item.remainAmount,
    purchaseAmount: item.purchaseAmount!,
    splitType: item.splitType,
    updatedAt: item.updatedAt,
  }));

  console.log("transformedCombinations", transformedCombinations);

  return (
    <div className="px-24 space-y-24 h-full">
      {/* 필터 카드 */}
      <ScrapFilterCard value={value} setValue={setValue} onSearch={handleSearch} />

      {/* 상태별 렌더링 */}
      {loading && <ScrapLoadingState />}

      {!loading && hasSearched && result.length === 0 && <EmptyState />}

      {!loading && result.length > 0 && (
        <>
          <CollapsibleDataList
            items={displayItems}
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded((prev) => !prev)}
          />

          {(isExpanded || result.length <= 1) && (
            <div className="px-8 flex justify-between items-center mb-40">
              <div>
                <p className="title-sm">총 용량 {summary.totalAmount}GB</p>
                <p className="title-sm">총 가격 {formatPriceString(summary.totalPrice)}</p>
              </div>
              <ButtonComponent
                variant="secondary"
                size="3xl"
                className="w-152"
                onClick={() =>
                  setPayment({
                    type: "data",
                    badge: "자투리 구매",
                    title: `${summary.totalAmount}GB`,
                    price: formatPriceString(summary.totalPrice),
                    totalAmount: summary.totalAmount,
                    totalPrice: summary.totalPrice,
                    combinations: transformedCombinations,
                  })
                }
              >
                확정하고 결제하기
              </ButtonComponent>
            </div>
          )}
        </>
      )}

      {!hasSearched && !loading && result.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center mt-32">
          <Search className="w-64 h-64 mb-16" />
          <p className="body-md">가장 저렴한 자투리 조합을 찾아드릴게요!</p>
        </div>
      )}

      {renderModals}
    </div>
  );
}
