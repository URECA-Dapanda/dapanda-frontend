import FailedMessage from "@feature/mypage/components/sections/charge/FailedMessage";

export default function ChargeFailPageContent() {
  return (
    <div className="flex flex-col p-48 gap-48">
      <p className="w-full lg:w-[600px] title-lg text-start text-primary">결제 실패 ...</p>
      <p className="w-full lg:w-[600px] title-md text-start text-gray-500">
        결제 중 오류가 발생했습니다.
      </p>
      <FailedMessage />
    </div>
  );
}
