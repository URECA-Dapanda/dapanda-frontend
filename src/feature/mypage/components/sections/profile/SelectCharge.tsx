"use client";
import { ChangeEvent, MouseEvent } from "react";
import { ButtonComponent } from "@components/common/button";
import CardComponent from "@components/common/card/CardComponent";
import CardContentComponent from "@components/common/card/CardContentComponent";
import CardHeaderComponent from "@components/common/card/CardHeaderComponent";
import LayoutBox from "@components/common/container/LayoutBox";
import InputComponent from "@components/common/input/InputComponent";
import { formatPriceString } from "@lib/formatters";
import { useChargeStore } from "@feature/mypage/stores/useChargeStore";

export default function SelectCharge() {
  const selectValue = useChargeStore((state) => state.charge);
  const setSelectValue = useChargeStore((state) => state.setCharge);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSelectValue(e.currentTarget.value);
  };

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    setSelectValue(e.currentTarget.value);
  };
  return (
    <CardComponent variant="outlined" size="xxl">
      <CardHeaderComponent title="충전 금액 선택" />
      <CardContentComponent size={"sm"}>
        <LayoutBox layout="grid" columns={3} gap="16px">
          <ButtonComponent variant={"outlineGray"} value={1000} onClick={handleButtonClick}>
            {formatPriceString("1000원")}
          </ButtonComponent>
          <ButtonComponent variant={"outlineGray"} value={2000} onClick={handleButtonClick}>
            {formatPriceString("2000원")}
          </ButtonComponent>
          <ButtonComponent variant={"outlineGray"} value={3000} onClick={handleButtonClick}>
            {formatPriceString("3000원")}
          </ButtonComponent>
          <ButtonComponent variant={"outlineGray"} value={4000} onClick={handleButtonClick}>
            {formatPriceString("4000원")}
          </ButtonComponent>
          <ButtonComponent variant={"outlineGray"} value={5000} onClick={handleButtonClick}>
            {formatPriceString("5000원")}
          </ButtonComponent>
          <ButtonComponent variant={"outlineGray"} value={10000} onClick={handleButtonClick}>
            {formatPriceString("10000원")}
          </ButtonComponent>
        </LayoutBox>
        <p className="body-sm mb-8 mt-8">직접 입력</p>
        <LayoutBox layout="flex" direction="row" gap={"8px"}>
          <InputComponent
            placeholder="금액을 입력하세요"
            value={selectValue}
            onChange={handleChange}
          />{" "}
          원
        </LayoutBox>
      </CardContentComponent>
    </CardComponent>
  );
}
