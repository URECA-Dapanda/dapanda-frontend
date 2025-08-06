"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import CurrentCashCard from "@feature/mypage/components/sections/profile/CurrentCashCard";
import TransactionHistory from "@feature/mypage/components/sections/TransactionHistory";
import LogOutButton from "@feature/mypage/components/sections/LogOutButton";
import ProfileCard from "@feature/mypage/components/sections/profile/ProfileCard";
import { useCashSuccessModalStore } from "@feature/mypage/stores/useCashSuccessModalStore";
import CashSuccessModal from "@feature/mypage/components/sections/toss/CashSuccessModal";
import DataStateComponent from "@feature/mypage/components/sections/profile/DataStateComponent";

export default function MyPageContent() {
  const searchParams = useSearchParams();
  const isOpen = useCashSuccessModalStore((s) => s.isOpen);
  const open = useCashSuccessModalStore((s) => s.open);
  const close = useCashSuccessModalStore((s) => s.close);

  useEffect(() => {
    if (searchParams.get("payment") === "success") {
      open("charge");
    }
  }, [searchParams, open]);

  return (
    <>
      <CashSuccessModal isOpen={isOpen} onClose={close} mode="charge" />
      <div className="flex flex-col items-center justify-center w-[100%] p-24 gap-28">
        <ProfileCard />
        <DataStateComponent />
        <CurrentCashCard isInterection={true} />
        <TransactionHistory />
        <LogOutButton />
      </div>
    </>
  );
}
