import LayoutBox from "@components/common/container/LayoutBox";
import { CashHistoryType } from "@feature/mypage/types/mypageTypes";
import { formatPriceString } from "@lib/formatters";
import { cn } from "@lib/utils";
import { CircleMinus, CirclePlus } from "lucide-react";
import { useMemo } from "react";

interface HistoryLinkComponentProps {
  data: CashHistoryType;
}

interface CashHistoryLineProps {
  size: "lg" | "md" | "sm";
  title: string;
  value: string;
  type?: "plus" | "minus";
}

interface CashHistoryDateBoxProps {
  date: string;
  dataList: CashHistoryType[];
}

export default function CashHistoryDateBox({ date, dataList }: CashHistoryDateBoxProps) {
  return (
    <div className="flex flex-col w-full gap-16  mb-[50px]">
      <div className="text-start text-gray-600 body-sm">{date}</div>
      <div className="flex flex-col gap-8">
        {dataList.map((data) => (
          <CashHistoryCard key={data.tradeId} data={data} />
        ))}
      </div>
    </div>
  );
}

export function CashHistoryCard({
  data: { tradeType, description, price, classification },
}: HistoryLinkComponentProps) {
  const icon = useMemo(() => {
    if (tradeType === "SALE") return <CirclePlus className={"text-success"} size={30} />;
    if (tradeType === "CHARGE") return <CirclePlus className={"text-secondary-700"} size={30} />;
    return <CircleMinus className="text-black" size={30} />;
  }, [tradeType]);

  const type = useMemo(() => {
    switch (classification) {
      case "충전":
      case "판매":
        return "plus";
      case "구매":
      case "출금":
        return "minus";
      default:
        return undefined;
    }
  }, [classification]);

  return (
    <LayoutBox layout="flex" direction="row" gap={12} width="full">
      {icon}
      <LayoutBox layout="flex" direction="column">
        <CashHistoryLine size="md" title={tradeType} value={formatPriceString(price)} type={type} />
        <CashHistoryLine size="sm" title={description} value={classification} />
      </LayoutBox>
    </LayoutBox>
  );
}

export function CashHistoryLine({ size, title, value, type }: CashHistoryLineProps) {
  const textSize = useMemo(() => {
    switch (size) {
      case "lg":
        return "title-md text-gray-700";
      case "md":
        return "body-sm text-gray-700";
      case "sm":
        return "body-xxs text-gray 600";
      default:
        return "body-sm text-gray-700";
    }
  }, [size]);

  const textColor = useMemo(() => {
    switch (type) {
      case "plus":
        return "text-success";
      case "minus":
        return "text-error";
      default:
        return "text-gray-600";
    }
  }, [type]);

  return (
    <div className={cn("flex flex-row justify-between items-center", textSize)}>
      <p>{title}</p>
      <p className={cn("text-end", textColor)}>{value}</p>
    </div>
  );
}
