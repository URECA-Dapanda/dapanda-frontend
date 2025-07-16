import CurrentCashCard from "./sections/CurrentCashCard";
import Link from "next/link";
import Image from "next/image";
import TransactionHistory from "./sections/TransactionHistory";
import { DataUsageDonut } from "./sections/CicularProgressBar";
import { ButtonComponent } from "@components/common/button";

export default function MyPageContent() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-24 gap-[10px]">
      <DataUsageDonut current={5.6} total={10} unit="GB" />
      <ButtonComponent variant={"text"} size={"sm"}>
        요금제 추천 보러가기
      </ButtonComponent>
      <TransactionHistory />
      <CurrentCashCard isInterection={true} />
      <Link href={"/"}>
        <Image src={"/pandaDic.svg"} alt="PandaDic" width={327} height={170} />
      </Link>
    </div>
  );
}
