import AvatarIcon from "@components/common/AvatarIcon";
import { BadgeComponent } from "@components/common/badge";
import ItemCard from "@components/common/card/ItemCard";
import LayoutBox from "@components/common/container/LayoutBox";
import { PurchaseHistoryType } from "@feature/mypage/types/mypageTypes";

interface PurchaseHistoryCardProps {
  data: PurchaseHistoryType;
}

export default function PurchaseHistoryCard({ data }: PurchaseHistoryCardProps) {
  return (
    <ItemCard size="sm">
      {data.isSold && (
        <BadgeComponent variant={"label"} className="absolute top-12 right-36">
          자투리 구매
        </BadgeComponent>
      )}
      <LayoutBox layout="flex" direction="row" gap={19} height="full">
        <AvatarIcon size="small" />
        <LayoutBox layout="flex" direction="column" gap={0}>
          <p className="title-sm">{data.type}</p>
          <p className="body-sm">거래 일자: {data.registDate}</p>
          <p className="body-sm text-gray-600">거래 상품: {data.title}</p>
        </LayoutBox>
      </LayoutBox>
    </ItemCard>
  );
}
