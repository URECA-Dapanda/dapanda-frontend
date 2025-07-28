"use client";

import { useState } from "react";
import { useDataFilterStore } from "@feature/data/stores/useDataFilterStore";
import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";
import { getDataList } from "@feature/data/api/dataRequest";
import { DataType } from "@feature/data/types/dataType";
import DataItemCard from "@feature/data/components/sections/default/DataItemCard";
import VirtualizedInfiniteList from "@components/common/list/VirtualizedInfiniteList";
import { UserDropdownMenu } from "@components/common/dropdown/UserDropdownMenu";
import { ButtonComponent } from "@/components/common/button";
import { dataSortOptions } from "@components/common/dropdown/dropdownConfig";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { Pill, PillButton } from "@ui/shadcn-io/pill";
import EmptyState from "@components/common/empty/EmptyState";

interface DefaultTabContentProps {
  isSheetOpen: boolean;
  onSearchClick?: () => void;
}

export default function DefaultTabContent({ isSheetOpen, onSearchClick }: DefaultTabContentProps) {
  const [sortLabel, setSortLabel] = useState("최신순");
  const { dataAmount, clearDataAmount } = useDataFilterStore();

  console.log("sheet", isSheetOpen);

  const convertSortLabelToEnum = (
    label: string
  ): "RECENT" | "PRICE_ASC" | "AMOUNT_ASC" | "AMOUNT_DESC" => {
    switch (label) {
      case "가격 낮은순":
        return "PRICE_ASC";
      case "데이터 적은순":
        return "AMOUNT_ASC";
      case "데이터 많은순":
        return "AMOUNT_DESC";
      default:
        return "RECENT";
    }
  };

  const { parentRef, rowVirtualizer, flatItems, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useVirtualizedInfiniteQuery<DataType>({
      queryKey: ["dataItems", sortLabel, dataAmount !== null ? `${dataAmount}` : "all"],
      queryFn: ({ pageParam = 0 }) =>
        getDataList({
          pageParam,
          sort: convertSortLabelToEnum(sortLabel),
          dataAmount: dataAmount ?? undefined,
        }),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      estimateSize: () => 160,
      mode: "scroll",
    });

  return (
    <div className="bottomSheetContents space-y-4">
      {isSheetOpen && (
        <div className="flex items-center justify-between gap-8 mb-12">
          {/* 왼쪽: 뱃지 (조건부) */}
          <div className="flex items-center gap-4">
            {dataAmount !== null && (
              <Pill>
                {dataAmount}GB
                <PillButton onClick={clearDataAmount}>
                  <X size={12} />
                </PillButton>
              </Pill>
            )}
          </div>

          {/* 오른쪽: 드롭다운 + 검색 버튼 */}
          <div className="flex gap-8 ml-auto">
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

            <ButtonComponent
              variant="withIcon"
              size="sm"
              className="p-6 body-xs"
              onClick={() => {
                onSearchClick?.();
              }}
            >
              SEARCH
              <SlidersHorizontal className="w-20 h-20" />
            </ButtonComponent>
          </div>
        </div>
      )}

      {/* 검색 결과 없을 때 EmptyState, 있으면 list 렌더링 */}
      {flatItems.length === 0 && !isFetchingNextPage ? (
        <EmptyState
          message="검색 결과가 없어요."
          subMessage="조건을 다시 설정해 보시겠어요?"
          className="mt-144"
        />
      ) : (
        <VirtualizedInfiniteList
          mode="scroll"
          parentRef={parentRef}
          rowVirtualizer={rowVirtualizer}
          height={isSheetOpen ? "calc( 70vh + 5px )" : "calc( 47vh - 56px )"}
          items={flatItems}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          renderItem={(item: DataType) => <DataItemCard data={item} type="default" />}
        />
      )}
    </div>
  );
}
