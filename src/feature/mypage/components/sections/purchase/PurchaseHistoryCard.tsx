import AvatarIcon from "@components/common/AvatarIcon";
import ItemCard from "@components/common/card/ItemCard";
import LayoutBox from "@components/common/container/LayoutBox";
import { SkeletonCard } from "@components/common/skeleton";
import { PurchaseHistoryType } from "@feature/mypage/types/mypageTypes";
import WriteReview from "@feature/mypage/components/sections/purchase/WriteReview";
import { getTradeImageUrl, TradeType } from "@feature/mypage/utils/getTradeImageUrl";
import { formatDataSize } from "@lib/formatters";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import dayjs from "dayjs";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "%s 후",
    past: "%s 전",
    s: "몇 초",
    m: "1분",
    mm: "%d분",
    h: "한시간",
    hh: "%d시간",
    d: "하루",
    dd: "%d일",
    M: "한달",
    MM: "%d달",
    y: "1년",
    yy: "%d년",
  },
});

interface PurchaseHistoryCardProps {
  data?: PurchaseHistoryType;
}

const tradeMapper: { [key: string]: string } = {
  PURCHASE_MOBILE_SINGLE: "데이터",
  PURCHASE_MOBILE_COMPOSITE: "자투리 구매",
  PURCHASE_WIFI: "와이파이",
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
      <LayoutBox layout="flex" direction="row" gap={19} height="full">
        <AvatarIcon
          size="medium"
          avatar={getTradeImageUrl({
            type: data.tradeType as TradeType,
            productImageUrl: data.productImageUrl,
          })}
        />
        <LayoutBox layout="flex" direction="column" gap={0}>
          <div className="flex flex-row items-center justify-between gap-48">
            <p className="title-sm">{tradeMapper[data.tradeType]}</p>
            {data.tradeType === "PURCHASE_WIFI" && (
              <WriteReview tradeId={data.tradeId} disabled={data.reviewed} />
            )}
          </div>
          <p className="body-sm">거래 일자: {dayjs(data.createdAt).fromNow()}</p>
          <p className="body-sm text-gray-600">
            거래 상품:{" "}
            {data.title !== ""
              ? `${data.title}${data.timeAmount > 0 ? ` (${data.timeAmount}분)` : ""}`
              : `${formatDataSize(data.dataAmount)} 모바일 데이터`}
          </p>
        </LayoutBox>
      </LayoutBox>
    </ItemCard>
  );
}
