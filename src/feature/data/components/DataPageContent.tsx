"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import { ButtonComponent } from "@/components/common/button";
import BaseBottomSheet from "@/components/common/bottomsheet/BaseBottomSheet";
import DefaultTabBody from "./sections/DefaultTabContent";
import ScrapTabBody from "./sections/ScrapTabContent";
import { PurchaseModeTabs } from "@/components/common/tabs";
import { useHeaderStore } from "@stores/useHeaderStore";
import FilterCard from "./sections/filter/FilterCard";

export default function DataPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab") || "default";
  const [sheetOpen, setSheetOpen] = useState(tab === "scrap");
  const setIsVisible = useHeaderStore((state) => state.setIsVisible);

  useEffect(() => {
    setIsVisible(sheetOpen);
  }, [sheetOpen]);

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
  };

  return (
    <div className="relative h-[100dvh] w-full bg-primary2 datapagecontent">
      <div className="absolute top-[-40] left-[-44] z-20">
        <Image src="/dpd-logo.svg" alt="logo" width={237} height={0} />
      </div>
      <div className="absolute top-0 right-0 z-20">
        <Image src="/dpd-main-logo.svg" alt="logo" width={96} height={0} />
      </div>
      <div className="sticky top-0 z-10 bg-primary2 p-4 pt-120">
        <FilterCard />
      </div>
      <div className="absolute bottom-76 right-24 z-50">
        <ButtonComponent
          variant="floatingPrimary"
          size="xl"
          onClick={() => {
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
        onSnapDown={handleSnapDown}
        variant="snap"
        snapHeight={280}
      >
        <div className="flex justify-center mt-24">
          <PurchaseModeTabs value={tab} onChange={handleTabChange}>
            <DefaultTabBody isSheetOpen={sheetOpen} />
            <ScrapTabBody />
          </PurchaseModeTabs>
        </div>

        {/* 탭에 따른 내용만 분기 */}
        {tab === "scrap" ? <ScrapTabBody /> : <DefaultTabBody isSheetOpen={sheetOpen} />}
      </BaseBottomSheet>
    </div>
  );
}
