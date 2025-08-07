"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { updateMemberRole } from "@/apis/userProfile";
import { OnboardingLayout, onboardingPages } from "@/components/common/onboarding";

export default function OnboardingPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleNext = useCallback(() => {
    if (currentPage < onboardingPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  }, []);

  const handlePrevious = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }, []);

  const handleComplete = useCallback(async () => {
    try {
      setIsLoading(true);
      await updateMemberRole();
      router.push("/data");
    } catch (error) {
      console.debug("온보딩 완료 처리 실패:", error);
      router.push("/data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="relative w-[100dvw] lg:w-[600px] overflow-hidden mx-auto bg-white flex flex-col">
      <main className="h-main-safe overflow-y-visible antialiased w-full lg:w-[600px]">
        <OnboardingLayout
          pages={onboardingPages}
          currentPage={currentPage}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onComplete={handleComplete}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}
