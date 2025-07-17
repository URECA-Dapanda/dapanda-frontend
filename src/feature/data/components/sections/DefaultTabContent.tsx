"use client";

import { useState } from "react";
import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";
import { getDataList } from "@feature/data/api/dataRequest";
import { DataType } from "@feature/data/types/dataType";
import DataItemCard from "./product/DataItemCard";
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

  const {
    parentRef,
    rowVirtualizer,
    flatItems,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useVirtualizedInfiniteQuery<DataType>({
    queryKey: ["dataItems", "default"],
    queryFn: ({ pageParam = 0 }) => getDataList({ pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    estimateSize: () => 160,
    mode: "scroll",
  });

  return (
    <div className="space-y-4">
      {isSheetOpen && (
        <div className="flex justify-end items-center gap-8 px-24 mb-12">
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
        renderItem={(item: DataType) => <DataItemCard data={item} />}
      />
    </div>
  );
}
