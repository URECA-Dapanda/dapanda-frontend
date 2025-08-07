import FailedMessage from "@feature/mypage/components/sections/charge/FailedMessage";
import Image from "next/image";

export default function ChargeFailPageContent() {
  return (
    <div className="flex flex-col h-main-safe pb-safe-bottom pt-safe-top px-48 items-center justify-start gap-36">
      <p className="w-full lg:w-[600px] title-lg text-start text-error">결제 실패</p>
      <Image src={"/error-panda.png"} width={325} height={0} alt="결제 실패" />
      <p className="w-full lg:w-[600px] title-md text-center text-gray-500">
        결제 중 오류가 발생했습니다.
      </p>
      <FailedMessage />
    </div>
  );
}
