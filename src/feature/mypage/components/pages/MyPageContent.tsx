"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import CurrentCashCard from "@feature/mypage/components/sections/profile/CurrentCashCard";
import TransactionHistory from "@feature/mypage/components/sections/TransactionHistory";
import { DataUsageDonut } from "@feature/mypage/components/sections/profile/CicularProgressBar";
import { ButtonComponent } from "@components/common/button";
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
      <div className="flex flex-col items-center justify-center w-full h-full p-24 pt-8 gap-12">
        <ProfileCard />
        <DataUsageDonut current={5.6} total={10} unit="GB" />
        <ButtonComponent variant={"text"} size={"sm"}>
          요금제 추천 보러가기
        </ButtonComponent>
        <TransactionHistory />
        <CurrentCashCard isInterection={true} />
        <Link href={"/"}>
          <Image src={"/pandaDic.svg"} alt="PandaDic" width={327} height={170} />
        </Link>
        <ButtonComponent variant={"outlinePrimary"} className="w-full">
          로그아웃
        </ButtonComponent>
      </div>
    </>
  );

}
