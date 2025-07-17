"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PlusIcon, ChevronDown, SlidersHorizontal } from "lucide-react";
import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";
import FilterCard from "@/feature/data/components/sections/filter/FilterCard";
import BaseBottomSheet from "@/components/common/bottomsheet/BaseBottomSheet";
import { PurchaseModeTabs } from "@/components/common/tabs";
import { getDataList } from "@/feature/data/api/dataRequest";
import { DataType } from "@/feature/data/types/dataType";
import DataItemCard from "@/feature/data/components/sections/product/DataItemCard";
import VirtualizedInfiniteList from "@components/common/list/VirtualizedInfiniteList";
import { useHeaderStore } from "@stores/useHeaderStore";
import { ButtonComponent } from "@/components/common/button";
import { UserDropdownMenu } from "@components/common/dropdown/UserDropdownMenu";
import { dataSortOptions } from "@components/common/dropdown/dropdownConfig";

export default function DataPageContent() {
  const router = useRouter();
  const handleCardClick = (id: string) => {
    router.push(`/data/${id}`);
  };

  const [sheetOpen, setSheetOpen] = useState(false);
  const [tab, setTab] = useState("normal");
  const setIsVisible = useHeaderStore((state) => state.setIsVisible);
  const [sortLabel, setSortLabel] = useState("최신순");

  useEffect(() => {
    setIsVisible(sheetOpen);
  }, [sheetOpen, setIsVisible]);
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
      case "최신순":
      default:
        return "RECENT";
    }
  };
  const convertTabToDataAmount = (tab: string): number | undefined => {
    if (tab === "split") return 0.5; // 예: 0.5GB 이하 = 분할 판매
    return undefined; // normal일 경우 필터 없음
  };
  const { parentRef, rowVirtualizer, flatItems, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useVirtualizedInfiniteQuery<DataType>({
      queryKey: ["dataItems", tab, sortLabel],
      queryFn: ({ pageParam = 0 }) =>
        getDataList({
          pageParam,
          sort: convertSortLabelToEnum(sortLabel),
          dataAmount: convertTabToDataAmount(tab),
        }),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      estimateSize: () => 160,
      mode: "scroll",
    });

  return (
    <div className="relative w-full bg-primary2">
      <div className="sticky top-0 z-10 bg-primary2 p-4 mt-44">
        <FilterCard />
      </div>
      <div className="fixed bottom-120 right-24 z-50">
        <ButtonComponent
          variant="floatingPrimary"
          size="xl"
          onClick={() => {
            // 등록 모달 열기 또는 페이지 이동 로직
            console.log("글 등록 버튼 클릭");
          }}
        >
          <PlusIcon className="w-20 h-20" />글 쓰기
        </ButtonComponent>
      </div>
      <BaseBottomSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onSnapUp={() => setSheetOpen(true)}
        onSnapDown={() => setSheetOpen(false)}
        variant="snap"
        snapHeight={260}
      >
        <div className="space-y-4">
          <div className="flex justify-center mt-24">
            <PurchaseModeTabs value={tab} onChange={setTab} />
          </div>
          {sheetOpen && (
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
                  setSheetOpen(false);
                }}
              >
                SEARCH
                <SlidersHorizontal className="w-20 h-20" />
              </ButtonComponent>
            </div>
          )}

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
      </BaseBottomSheet>
    </div>
  );
}
