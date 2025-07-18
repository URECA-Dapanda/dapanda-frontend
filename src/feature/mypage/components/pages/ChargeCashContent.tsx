"use client";
import { ButtonComponent } from "@components/common/button";
import ChargeInfoCard from "../sections/profile/ChargeInfoCard";
import CurrentCashCard from "../sections/profile/CurrentCashCard";
import SelectCharge from "../sections/profile/SelectCharge";

export default function ChargeCashContent() {
  return (
    <div className="flex flex-col  gap-12 p-24 pt-8">
      <CurrentCashCard />
      <SelectCharge />
      <ChargeInfoCard />
      <ButtonComponent variant={"primary"} className="w-full">
        결제하기
      </ButtonComponent>
    </div>
  );
}
