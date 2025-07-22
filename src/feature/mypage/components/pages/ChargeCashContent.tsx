"use client";
import { useChargeStore } from "@feature/mypage/stores/useChargeStore";
import { useTossModalStore } from "@feature/mypage/stores/useTossModalStore";
import { ButtonComponent } from "@components/common/button";
import CurrentCashCard from "@feature/mypage/components/sections/profile/CurrentCashCard";
import SelectCharge from "@feature/mypage/components/sections/profile/SelectCharge";
import ChargeInfoCard from "@feature/mypage/components/sections/profile/ChargeInfoCard";
import TossPaymentModal from "@feature/mypage/components/sections/toss/TossPaymentModal";

export default function ChargeCashContent() {
  const chargeAmount = useChargeStore((state) => state.charge);
  const open = useTossModalStore((state) => state.open);

  const handleClick = () => {
    if (!chargeAmount) {
      alert("충전 금액을 입력해주세요.");
      return;
    }
    open();
  };

  return (
    <>
      <div className="flex flex-col gap-12 p-24 pt-8">
        <CurrentCashCard />
        <SelectCharge />
        <ChargeInfoCard />
        <ButtonComponent variant={"primary"} className="w-full" onClick={handleClick}>
          결제하기
        </ButtonComponent>
      </div>

      <TossPaymentModal />
    </>
  );
}
