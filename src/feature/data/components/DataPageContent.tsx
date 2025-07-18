"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PlusIcon, ChevronDown, SlidersHorizontal } from "lucide-react";

import { useHeaderStore } from "@stores/useHeaderStore";
import { useVirtualizedInfiniteQuery } from "@hooks/useVirtualizedInfiniteQuery";
import { getDataList } from "@/feature/data/api/dataRequest";
import { DataType } from "@/feature/data/types/dataType";
import FilterCard from "@/feature/data/components/sections/filter/FilterCard";
import BaseBottomSheet from "@/components/common/bottomsheet/BaseBottomSheet";
import { PurchaseModeTabs } from "@/components/common/tabs";
import { ButtonComponent } from "@/components/common/button";
import { UserDropdownMenu } from "@components/common/dropdown/UserDropdownMenu";
import { dataSortOptions } from "@components/common/dropdown/dropdownConfig";
import VirtualizedInfiniteList from "@components/common/list/VirtualizedInfiniteList";
import DataItemCard from "@/feature/data/components/sections/product/DataItemCard";

export default function DataPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortLabel, setSortLabel] = useState("최신순");

  const tab = searchParams.get("tab") || "default";
  const [sheetOpen, setSheetOpen] = useState(tab === "scrap");

  const setIsVisible = useHeaderStore((state) => state.setIsVisible);

  useEffect(() => {
    setIsVisible(sheetOpen);
  }, [sheetOpen]);

  const handleTabChange = (newTab: string) => {
    if (newTab === tab) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", newTab);
    router.replace(`?${params.toString()}`);
    if (newTab === "scrap") setSheetOpen(true);
  };

  const handleSnapDown = () => {
    setSheetOpen(false);
    if (tab === "scrap") {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", "default");
      router.replace(`?${params.toString()}`);
    }
  };

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
    <div className="relative h-[100dvh] w-full">
      <div className="absolute top-[-80px] left-[-44px] z-20">
        <Image src="/dpd-logo.svg" alt="logo" width={237} height={0} />
      </div>

      <div className="sticky top-0 z-10 bg-primary2 p-4 pt-80">
        <FilterCard />
      </div>

      <div className="absolute bottom-[76px] right-24 z-50">
        <ButtonComponent
          variant="floatingPrimary"
          size="xl"
          onClick={() => console.log("글 등록 버튼 클릭")}
        >
          <PlusIcon className="w-20 h-20" />글 쓰기
        </ButtonComponent>
      </div>

      <BaseBottomSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onSnapUp={() => setSheetOpen(true)}
        onSnapDown={handleSnapDown}
        variant="snap"
        snapHeight={260}
      >
        <div className="space-y-4">
          <div className="flex justify-center mt-24">
            <PurchaseModeTabs value={tab} onChange={handleTabChange} />
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
                onClick={() => setSheetOpen(false)}
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
            renderItem={(item: DataType) => <DataItemCard data={item} type={"default"} />}
          />
        </div>
      </BaseBottomSheet>
    </div>
  );
}
