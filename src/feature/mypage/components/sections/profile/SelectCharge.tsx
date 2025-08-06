"use client";

import { ChangeEvent, MouseEvent } from "react";
import { ButtonComponent } from "@components/common/button";
import CardComponent from "@components/common/card/CardComponent";
import CardContentComponent from "@components/common/card/CardContentComponent";
import CardHeaderComponent from "@components/common/card/CardHeaderComponent";
import LayoutBox from "@components/common/container/LayoutBox";
import InputComponent from "@components/common/input/InputComponent";
import { useChargeStore } from "@feature/mypage/stores/useChargeStore";
import { formatPriceString } from "@lib/formatters";

interface SelectChargeProps {
  title?: string;
}

export default function SelectCharge({ title = "충전 금액 선택" }: SelectChargeProps) {
  const selectValue = useChargeStore((state) => state.charge);
  const setSelectValue = useChargeStore((state) => state.setCharge);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const rawValue = e.currentTarget.value;

    const numericValue = rawValue.replace(/[^0-9]/g, "");

    if (numericValue === "") {
      setSelectValue("");
      return;
    }

    const num = Number(numericValue);

    if (num >= 0 && num <= 10000000) {
      setSelectValue(numericValue);
    }
  };

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    setSelectValue(e.currentTarget.value);
  };
  return (
    <CardComponent variant="outlined" size="fit">
      <CardHeaderComponent title={title} />
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
        <p className="body-sm mb-12 mt-20">직접 입력</p>
        <LayoutBox layout="flex" direction="row" height="fit" gap={"8px"}>
          <InputComponent
            placeholder="금액을 입력하세요"
            value={selectValue}
            onChange={handleChange}
            size="md"
          />{" "}
          원
        </LayoutBox>
      </CardContentComponent>
    </CardComponent>
  );
}
