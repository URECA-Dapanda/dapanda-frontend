import { memo } from "react";
import ItemCard from "@components/common/card/ItemCard";
import { MonthlyCashTotalType } from "@feature/mypage/types/mypageTypes";
import { CashHistoryLine } from "@feature/mypage/components/sections/profile/CashHistoryDateBox";
import { Separator } from "@ui/separator";

interface MonthlyCashTotalBoxProps {
  data: MonthlyCashTotalType;
}

function MonthlyCashTotalBox({ data }: Partial<MonthlyCashTotalBoxProps>) {
  return (
    <div className="w-full flex justify-center p-24">
      <ItemCard size="fit">
        <CashHistoryLine
          size="lg"
          title="전체 내역"
          value={data?.total}
          type={data && data.total >= 0 ? "plus" : "minus"}
        />
        <Separator className="my-12" orientation="horizontal" />
        <CashHistoryLine size="md" title="판매" value={data?.totalSelling} type={"plus"} />
        <CashHistoryLine size="md" title="충전" value={data?.totalCharge} type={"plus"} />
        <CashHistoryLine size="md" title="출금" value={data?.totalRefund} type={"minus"} />
        <CashHistoryLine size="md" title="구매" value={data?.totalPurchase} type={"minus"} />
      </ItemCard>
    </div>
  );
}

export default memo(MonthlyCashTotalBox);
