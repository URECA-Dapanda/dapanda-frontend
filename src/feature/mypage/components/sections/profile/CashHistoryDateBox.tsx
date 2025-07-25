import LayoutBox from "@components/common/container/LayoutBox";
import { CashHistoryType } from "@feature/mypage/types/mypageTypes";
import { formatPriceString } from "@lib/formatters";
import { cn } from "@lib/utils";
import { CircleMinus, CirclePlus } from "lucide-react";
import { memo, useMemo } from "react";

interface HistoryLinkComponentProps {
  data: CashHistoryType;
}

interface CashHistoryLineProps {
  size: "lg" | "md" | "sm";
  title: string;
  value?: string | number;
  type?: "plus" | "minus";
}

interface CashHistoryDateBoxProps {
  date: string;
  dataList: CashHistoryType[];
}

const historyTypeMapper: { [key: string]: string } = {
  SALE_MOBILE_DATA: "데이터 판매",
  SALE_WIFI: "와이파이 판매",
  REFUND: "출금",
  CHARGE: "충전",
  PURCHASE_MOBILE_SINGLE: "데이터 구매",
  PURCHASE_WIFI: "와이파이 구매",
  PURCHASE_MOBILE_COMPOSITE: "데이터 구매 (자투리 구매)",
};

function CashHistoryDateBox({ date, dataList }: CashHistoryDateBoxProps) {
  return (
    <div className="flex flex-col w-full gap-16  mb-[50px]">
      <div className="text-start text-gray-600 body-sm">{date}</div>
      <div className="flex flex-col gap-8">
        {dataList.map((data) => (
          <HistoryCard key={data.tradeId} data={data} />
        ))}
      </div>
    </div>
  );
}

function HistoryCard({
  data: { tradeType, description, price, classification },
}: HistoryLinkComponentProps) {
  const icon = useMemo(() => {
    if (tradeType.includes("SALE")) return <CirclePlus className={"text-success"} size={30} />;
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
        <HistoryLine
          size="md"
          title={historyTypeMapper[tradeType]}
          value={formatPriceString(price)}
          type={type}
        />
        <HistoryLine size="sm" title={description} value={classification} />
      </LayoutBox>
    </LayoutBox>
  );
}

function HistoryLine({ size, title, value, type }: CashHistoryLineProps) {
  const textSize = useMemo(() => {
    switch (size) {
      case "lg":
        return "title-md text-gray-700";
      case "md":
        return "body-sm text-gray-700";
      case "sm":
        return "body-xxs text-gray-600";
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
    <div className={cn("w-full flex flex-row justify-between items-center", textSize)}>
      <p>{title}</p>
      <p className={cn("text-end", textColor)}>{type ? formatPriceString(value) : value}</p>
    </div>
  );
}

export const CashHistoryLine = memo(HistoryLine);
export const CashHistoryCard = memo(HistoryCard);
export default memo(CashHistoryDateBox);
