"use client";

import { useState } from "react";
import { UserDropdownMenu } from "@components/common/dropdown/UserDropdownMenu";
import { ButtonComponent } from "@/components/common/button";
import { dataSortOptions } from "@components/common/dropdown/dropdownConfig";
import { ChevronDown, Search } from "lucide-react";
import ScrapFilterCard from "@feature/data/components/sections/filter/ScrapFilterCard";
import ScrapLoadingState from "@feature/data/components/sections/scrap/ScrapLoadingState";
import { useScrapRecommendation } from "@feature/data/hooks/useScrapRecommendation";
import CollapsibleDataList from "@feature/data/components/sections/default/CollapsibleDataList";
import EmptyState from "@components/common/empty/EmptyState";
import { usePaymentStore } from "@feature/payment/stores/paymentStore";
import UsePaymentModals from "@feature/payment/hooks/usePaymentModals";
import { formatPriceString } from "@lib/formatters";

export default function ScrapTabContent() {
  const [sortLabel, setSortLabel] = useState("최신순");
  const { value, setValue, loading, result, summary, search } = useScrapRecommendation();
  const [hasSearched, setHasSearched] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const setPayment = usePaymentStore((state) => state.setInfo);
  const renderModals = UsePaymentModals();

  const handleSearch = async () => {
    setHasSearched(true);
    await search();
  };

  const transformedCombinations = result.map((item) => ({
    productId: item.productId,
    mobileDataId: item.mobileDataId,
    memberName: item.memberName,
    price: Number(item.price.replace(/[^0-9]/g, "")),
    purchasePrice: Number(item.price.replace(/[^0-9]/g, "")),
    remainAmount: parseFloat(item.title),
    purchaseAmount: item.purchaseAmount,
    pricePer100MB: Number(item.pricePer100MB.replace(/[^0-9]/g, "")),
    splitType: item.splitType,
    updatedAt: item.date,
  }));
  
  console.log("transformedCombinations", transformedCombinations);

  return (
    <div className="px-24 space-y-24">
      {/* 정렬 드롭다운 */}
      <div className="flex justify-end items-center gap-8 mb-12">
        <UserDropdownMenu
          options={dataSortOptions(setSortLabel)}
          selectedLabel={sortLabel}
          onSelectLabel={setSortLabel}
        >
          <ButtonComponent variant="withIcon" size="sm" className="p-6 body-xs">
            {sortLabel}
            <ChevronDown className="w-20 h-20" />
          </ButtonComponent>
        </UserDropdownMenu>
      </div>

      {/* 필터 카드 */}
      <ScrapFilterCard value={value} setValue={setValue} onSearch={handleSearch} />

      {/* 상태별 렌더링 */}
      {loading && <ScrapLoadingState />}

      {!loading && hasSearched && result.length === 0 && <EmptyState />}

      {!loading && result.length > 0 && (
        <>
          <CollapsibleDataList
            items={result}
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded((prev) => !prev)}
          />

          {(isExpanded || result.length <= 1) && (
            <div className="px-8 mb-64 flex justify-between items-center">
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
                }>
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
