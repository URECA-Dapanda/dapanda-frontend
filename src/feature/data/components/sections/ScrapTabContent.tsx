"use client";

import { useState } from "react";
import { UserDropdownMenu } from "@components/common/dropdown/UserDropdownMenu";
import { ButtonComponent } from "@/components/common/button";
import { dataSortOptions } from "@components/common/dropdown/dropdownConfig";
import { ChevronDown, Search } from "lucide-react";
import ScrapFilterCard from "@feature/data/components/sections/filter/ScrapFilterCard";
import ScrapEmptyState from "@feature/data/components/sections/ScrapEmptyState";
import ScrapLoadingState from "@feature/data/components/sections/ScrapLoadingState";
import { useScrapRecommendation } from "@feature/data/hooks/useScrapRecommendation";
import CollapsibleDataList from "@feature/data/components/sections/product/CollapsibleDataList";

export default function ScrapTabContent() {
  const [sortLabel, setSortLabel] = useState("최신순");
  const {
    value,
    setValue,
    loading,
    result,
    summary,
    search,
  } = useScrapRecommendation();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    setHasSearched(true);
    await search();
  };

  return (
    <div className="px-24 space-y-24">
      {/* 정렬 드롭다운 */}
      <div className="flex justify-end items-center gap-8 mb-12">
        <UserDropdownMenu
          options={dataSortOptions}
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

      {!loading && hasSearched && result.length === 0 && <ScrapEmptyState />}

      {!loading && result.length > 0 && (
        <>
          <CollapsibleDataList items={result} />
          <div className="mt-12 px-8 text-center">
            <p className="text-xl font-semibold">
              총 {summary.totalAmount}GB / {summary.totalPrice.toLocaleString()}원
            </p>
          </div>
        </>
      )}

      {!hasSearched && !loading && result.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center mt-32">
          <Search className="w-64 h-64 mb-16" />
          <p className="body-md">가장 저렴한 자투리 조합을 찾아드릴게요!</p>
        </div>
      )}
    </div>
  );
}
