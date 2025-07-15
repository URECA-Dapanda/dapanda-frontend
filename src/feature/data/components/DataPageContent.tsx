"use client";

import { useEffect, useState } from "react";
import FilterCard from "./sections/filter/FilterCard";
import BaseBottomSheet from "@/components/common/bottomsheet/BaseBottomSheet";
import { PurchaseModeTabs } from "@/components/common/tabs";

import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";
import { getDataList } from "../api/dataRequest";
import { DataType } from "../types/dataType";
import DataItemCard from "./sections/product/DataItemCard";
import VirtualizedInfiniteList from "@components/common/list/VirtualizedInfiniteList";
import { useHeaderStore } from "@stores/useHeaderStore";

export default function DataPageContent() {
  const [sheetOpen, setSheetOpen] = useState(true);
  const [tab, setTab] = useState("normal");

  const setIsVisible = useHeaderStore((state)=>state.setIsVisible);

  useEffect(()=>{
    setIsVisible(sheetOpen);
  },[sheetOpen, setIsVisible])

  const { parentRef, rowVirtualizer, flatItems, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useVirtualizedInfiniteQuery<DataType>({
      queryKey: ["dataItems", tab],
      queryFn: ({ pageParam = 0 }) => getDataList({ pageParam }),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      estimateSize: () => 160,
      mode: "scroll",
    });

  return (
    <div className="relative h-[100dvh] w-full bg-primary2">
      {/* 상단 필터 영역 */}
      <div className="sticky top-0 z-10 bg-primary2 p-4">
        <FilterCard />
      </div>

      {/* 바텀시트 */}
      <BaseBottomSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onSnapUp={() => setSheetOpen(true)}
        onSnapDown={() => setSheetOpen(false)}
        variant="snap"
        snapHeight={250}
      >
        <div className="space-y-4">
          {/* 탭 */}
          <div className="flex justify-center mt-24">
            <PurchaseModeTabs value={tab} onChange={setTab} />
          </div>

          {/* 리스트 */}
          <VirtualizedInfiniteList
            mode="scroll"
            parentRef={parentRef}
            rowVirtualizer={rowVirtualizer}
            items={flatItems}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            renderItem={(item: DataType) => <DataItemCard data={item} />}
          />
        </div>
      </BaseBottomSheet>
    </div>
  );
}
