import AvatarIcon from "@components/common/AvatarIcon";
import { BadgeComponent } from "@components/common/badge";
import ItemCard from "@components/common/card/ItemCard";
import LayoutBox from "@components/common/container/LayoutBox";
import { SkeletonCard } from "@components/common/skeleton";
import { PurchaseHistoryType } from "@feature/mypage/types/mypageTypes";
import { formatDataSize } from "@lib/formatters";
import { formatDateDivider } from "@lib/time";

interface PurchaseHistoryCardProps {
  data?: PurchaseHistoryType;
}

const tradeMapper: { [key: string]: string } = {
  MOBILE_PURCHASE_SINGLE: "데이터",
  MOBILE_PURCHASE_COMPOSITE: "자투리 구매",
  WIFI: "와이파이",
};

export default function PurchaseHistoryCard({ data }: PurchaseHistoryCardProps) {
  if (!data)
    return (
      <ItemCard size="sm">
        <SkeletonCard />
      </ItemCard>
    );
  return (
    <ItemCard size="sm">
      {data.tradeType === "MOBILE_DATA_COMPOSITE " && (
        <BadgeComponent variant={"label"} className="absolute top-12 right-36">
          자투리 구매
        </BadgeComponent>
      )}
      <LayoutBox layout="flex" direction="row" gap={19} height="full">
        <AvatarIcon size="small" />
        <LayoutBox layout="flex" direction="column" gap={0}>
          <p className="title-sm">{tradeMapper[data.tradeType]}</p>
          <p className="body-sm">거래 일자: {formatDateDivider(data.createdAt)}</p>
          <p className="body-sm text-gray-600">거래 상품: {formatDataSize(data.dataAmount)}</p>
        </LayoutBox>
      </LayoutBox>
    </ItemCard>
  );
}
