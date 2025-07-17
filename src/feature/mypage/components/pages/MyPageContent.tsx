"use client";

import Link from "next/link";
import Image from "next/image";
import CurrentCashCard from "../sections/CurrentCashCard";
import TransactionHistory from "../sections/TransactionHistory";
import { DataUsageDonut } from "../sections/CicularProgressBar";
import { ButtonComponent } from "@components/common/button";
import ProfileCard from "../sections/ProfileCard";

export default function MyPageContent() {
  return (
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
  );
}
