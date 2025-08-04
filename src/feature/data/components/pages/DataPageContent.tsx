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
import { OnboardingLayout, onboardingPages } from "@/components/common/onboarding";
import ModalPortal from "@/lib/ModalPortal";
import { updateMemberRole } from "@/apis/userProfile";

export default function DataPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab") || "default";
  const [sheetOpen, setSheetOpen] = useState(tab === "scrap");
  const setIsVisible = useHeaderStore((state) => state.setIsVisible);
  const [registModalOpen, setRegistModalOpen] = useState(false);
  const clearDataAmount = useDataFilterStore((state) => state.clearDataAmount);

  const [onboardingModalOpen, setOnboardingModalOpen] = useState(false);
  const [currentOnboardingPage, setCurrentOnboardingPage] = useState(0);
  const [isOnboardingLoading, setIsOnboardingLoading] = useState(false);

  useEffect(() => {
    const onboardingParam = searchParams.get("on-boarding");

    if (onboardingParam === "true") {
      setOnboardingModalOpen(true);
      const params = new URLSearchParams(searchParams.toString());
      params.delete("on-boarding");
      const newUrl = params.toString() ? `?${params.toString()}` : "/data";
      router.replace(newUrl);
    }
  }, [searchParams, router]);

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

  const handleOnboardingNext = () => {
    if (currentOnboardingPage < onboardingPages.length - 1) {
      setCurrentOnboardingPage(currentOnboardingPage + 1);
    }
  };

  const handleOnboardingPrevious = () => {
    if (currentOnboardingPage > 0) {
      setCurrentOnboardingPage(currentOnboardingPage - 1);
    }
  };

  const handleOnboardingComplete = async () => {
    try {
      setIsOnboardingLoading(true);
      await updateMemberRole();
    } catch (error) {
      console.error("온보딩 완료 - API 요청 실패:", error);
    } finally {
      setIsOnboardingLoading(false);
      setOnboardingModalOpen(false);
      setCurrentOnboardingPage(0);
    }
  };

  return (
    <>
      <div className="w-full bg-primary2 datapagecontent h-[100dvh] bg-[url('/dpd-logo.svg')] bg-position-[-35_-37] bg-no-repeat bg-size-[237px]">
        {/* 상단 필터 영역 */}
        <div className="p-4 pt-[114px]">
          <DefaultFilterCard onSearch={() => setSheetOpen(true)} />
        </div>
        <div className="fixed lg:absolute bottom-24 pb-safe-bottom right-24 z-35">
          <ButtonComponent
            variant="floatingPrimary"
            size="xl"
            onClick={() => {
              setRegistModalOpen(true);
            }}
            className={tab === "default" ? "" : "hidden"}
          >
            <PlusIcon className="w-20 h-20" />글 쓰기
          </ButtonComponent>
        </div>
        <BaseBottomSheet
          isOpen={registModalOpen}
          onClose={() => setRegistModalOpen(false)}
          variant="modal"
          zIndex={105}
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
        </BaseBottomSheet>
      </div>

      {onboardingModalOpen && (
        <ModalPortal>
          <div className="fixed inset-0 z-106 bg-white">
            <OnboardingLayout
              pages={onboardingPages}
              currentPage={currentOnboardingPage}
              onNext={handleOnboardingNext}
              onPrevious={handleOnboardingPrevious}
              onComplete={handleOnboardingComplete}
              isLoading={isOnboardingLoading}
            />
          </div>
        </ModalPortal>
      )}
    </>
  );
}
