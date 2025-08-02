"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import ScrapFilterCard from "@feature/data/components/sections/filter/ScrapFilterCard";
import ScrapLoadingState from "@feature/data/components/sections/scrap/ScrapLoadingState";
import { useScrapRecommendation } from "@feature/data/hooks/useScrapRecommendation";
import CollapsibleDataList from "@feature/data/components/sections/default/CollapsibleDataList";
import EmptyState from "@components/common/empty/EmptyState";
import UsePaymentModals from "@feature/payment/hooks/usePaymentModals";

export default function ScrapTabContent() {
  const { value, setValue, loading, result, summary, search } = useScrapRecommendation();
  const [hasSearched, setHasSearched] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const renderModals = UsePaymentModals();

  const handleSearch = async () => {
    setHasSearched(true);
    await search();
  };

  return (
    <div className="px-24 space-y-12 h-full">
      {/* 필터 카드 */}
      <ScrapFilterCard value={value} setValue={setValue} onSearch={handleSearch} />

      {/* 상태별 렌더링 */}
      {loading && <ScrapLoadingState />}

      {!loading && hasSearched && result.length === 0 && <EmptyState />}

      {!loading && result.length > 0 && (
        <>
          <CollapsibleDataList
            items={result}
            summary={summary}
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded((prev) => !prev)}
          />
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
