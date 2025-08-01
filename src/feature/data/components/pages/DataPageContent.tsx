"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import { ButtonComponent } from "@/components/common/button";
import BaseBottomSheet from "@/components/common/bottomsheet/BaseBottomSheet";
import DefaultTabBody from "@feature/data/components/pages/DefaultTabContent";
import ScrapTabBody from "@feature/data/components/sections/scrap/ScrapTabContent";
import { PurchaseModeTabs } from "@/components/common/tabs";
import { useHeaderStore } from "@stores/useHeaderStore";
import DefaultFilterCard from "@feature/data/components/sections/filter/DefaultFilterCard";
import DataRegistModal from "@feature/data/components/sections/modal/DataRegistModal";
import { useDataFilterStore } from "@feature/data/stores/useDataFilterStore";

export default function DataPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab") || "default";
  const [sheetOpen, setSheetOpen] = useState(tab === "scrap");
  const setIsVisible = useHeaderStore((state) => state.setIsVisible);
  const [registModalOpen, setRegistModalOpen] = useState(false);
  const clearDataAmount = useDataFilterStore((state) => state.clearDataAmount);

  useEffect(() => {
    setIsVisible(sheetOpen);
  }, [sheetOpen, setIsVisible]);

  const handleTabChange = (newTab: string) => {
    if (newTab === tab) return;

    if (!sheetOpen && newTab === "scrap") {
      setSheetOpen(true);
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", newTab);
    router.replace(`?${params.toString()}`);
  };

  const handleSnapDown = () => {
    setSheetOpen(false);

    if (tab === "scrap") {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", "default");
      router.replace(`?${params.toString()}`);
    }
    clearDataAmount();
  };

  const handleRegistButtonClick = useCallback(() => {
    setRegistModalOpen(false);
    router.refresh();
  }, []);

  return (
    <>
      <div className="w-full bg-primary2 datapagecontent h-[100dvh] bg-[url('/dpd-logo.svg')] bg-position-[-35_-37] bg-no-repeat bg-size-[237px]">
        {/* 상단 필터 영역 */}
        <div className="p-4 pt-[114px]">
          <DefaultFilterCard onSearch={() => setSheetOpen(true)} />
        </div>
        <div className="absolute bottom-[78px] right-24 z-35">
          <ButtonComponent
            variant="floatingPrimary"
            size="xl"
            onClick={() => {
              console.log("글 등록 버튼 클릭");
              setRegistModalOpen(true);
            }}
          >
            <PlusIcon className="w-20 h-20" />글 쓰기
          </ButtonComponent>
        </div>
        <BaseBottomSheet
          isOpen={registModalOpen}
          onClose={() => setRegistModalOpen(false)}
          variant="modal"
          zIndex={102}
        >
          <DataRegistModal onClose={handleRegistButtonClick} />
        </BaseBottomSheet>

        <BaseBottomSheet
          isOpen={sheetOpen}
          onClose={() => setSheetOpen(false)}
          onSnapUp={() => setSheetOpen(true)}
          onSnapDown={handleSnapDown}
          variant="snap"
          snapHeight={300}
        >
          <div className="flex justify-center mt-20">
            <PurchaseModeTabs value={tab} onChange={handleTabChange}>
              <DefaultTabBody isSheetOpen={sheetOpen} onSearchClick={handleSnapDown} />
              <ScrapTabBody />
            </PurchaseModeTabs>
          </div>

          {/* 탭에 따른 내용만 분기 */}
          {/* {tab === "scrap" ? <ScrapTabBody /> : <DefaultTabBody isSheetOpen={sheetOpen} />} */}
        </BaseBottomSheet>
      </div>
    </>
  );
}
