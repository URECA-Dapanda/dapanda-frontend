"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import CurrentCashCard from "@feature/mypage/components/sections/profile/CurrentCashCard";
import TransactionHistory from "@feature/mypage/components/sections/TransactionHistory";
import { DataUsageDonut } from "@feature/mypage/components/sections/profile/CicularProgressBar";
import { ButtonComponent } from "@components/common/button";
import LogOutButton from "../sections/LogOutButton";
import ProfileCard from "@feature/mypage/components/sections/profile/ProfileCard";
import { useTossSuccessModalStore } from "@feature/mypage/stores/useTossSuccessModalStore";
import TossSuccessModal from "@feature/mypage/components/sections/toss/TossSuccessModal";

export default function MyPageContent() {
  const searchParams = useSearchParams();
  const openSuccessModal = useTossSuccessModalStore((state) => state.open);

  useEffect(() => {
    if (searchParams.get("payment") === "success") {
      openSuccessModal();
    }
  }, [searchParams, openSuccessModal]);

  return (
    <>
      <TossSuccessModal />
      <div className="flex flex-col items-center justify-center w-full h-full p-24 pt-8 gap-28">
        <ProfileCard />
        <DataUsageDonut current={7} unit="GB" />
        <CurrentCashCard isInterection={true} />
        <TransactionHistory />
        <LogOutButton />
      </div>
    </>
  );
}
