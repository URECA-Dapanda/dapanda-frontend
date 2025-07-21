"use client";

import { useState } from "react";
import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";
import { getDataList } from "@feature/data/api/dataRequest";
import { DataType } from "@feature/data/types/dataType";
import DataItemCard from "@feature/data/components/sections/default/DataItemCard";
import VirtualizedInfiniteList from "@components/common/list/VirtualizedInfiniteList";
import { UserDropdownMenu } from "@components/common/dropdown/UserDropdownMenu";
import { ButtonComponent } from "@/components/common/button";
import { dataSortOptions } from "@components/common/dropdown/dropdownConfig";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

interface DefaultTabContentProps {
  isSheetOpen: boolean;
}

export default function DefaultTabContent({ isSheetOpen }: DefaultTabContentProps) {
  const [sortLabel, setSortLabel] = useState("최신순");

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

  const convertTabToDataAmount = (tab: string): number | undefined => {
    if (tab === "split") return 0.5;
    return undefined;
  };

  const { parentRef, rowVirtualizer, flatItems, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useVirtualizedInfiniteQuery<DataType>({
      queryKey: ["dataItems", sortLabel],
      queryFn: ({ pageParam = 0 }) =>
        getDataList({
          pageParam,
          sort: convertSortLabelToEnum(sortLabel),
          dataAmount: convertTabToDataAmount("default"),
        }),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      estimateSize: () => 160,
      mode: "scroll",
    });

  return (
    <div className="space-y-4">
      {isSheetOpen && (
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

          <ButtonComponent
            variant="withIcon"
            size="sm"
            className="p-6 body-xs"
            onClick={() => {
              console.log("검색 클릭");
            }}
          >
            SEARCH
            <SlidersHorizontal className="w-20 h-20" />
          </ButtonComponent>
        </div>
      )}

      {/* 리스트 */}
      <VirtualizedInfiniteList
        mode="scroll"
        parentRef={parentRef}
        rowVirtualizer={rowVirtualizer}
        height="700px"
        items={flatItems}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        renderItem={(item: DataType) => <DataItemCard data={item} type="default" />}
      />
    </div>
  );
}
