"use client";

import AvatarIcon from "@components/common/AvatarIcon";
import { ButtonComponent } from "@components/common/button";
import ItemCard from "@components/common/card/ItemCard";
import LayoutBox from "@components/common/container/LayoutBox";
import { SaleHistoryType } from "@feature/mypage/types/mypageTypes";
import { formatDataSize } from "@lib/formatters";
import { formatDateDivider } from "@lib/time";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface HistoryCardProps {
  data: SaleHistoryType;
  size?: "sm" | "lg";
}

const postTypeGuard: { [key: string]: string } = {
  MOBILE_DATA: "데이터",
  WIFI: "와이파이",
  HOTSPOT: "핫스팟",
};

export function HistoryCard({ data, size = "sm" }: HistoryCardProps) {
  const router = useRouter();
  const handleCardClick = useCallback(() => {
    router.push(`/${data.type !== "WIFI" ? "data" : "map"}/${data.productId}`, { scroll: true });
  }, [router]);

  return (
    <div className="px-24">
      <ItemCard size={size} handleClick={handleCardClick}>
        <LayoutBox layout="flex" direction="row" gap={19} height="full">
          <AvatarIcon size="small" />
          <LayoutBox layout="flex" direction="column" gap={0}>
            <p className="title-sm">{postTypeGuard[data.type]}</p>
            <p className="body-sm">등록 일자: {formatDateDivider(data.createdAt)}</p>
            {data.state !== "ACTIVE" && (
              <p className="body-sm">
                거래 일자: {data.updatedAt ? formatDateDivider(data.updatedAt) : "--"}
              </p>
            )}
            <p className="body-sm text-gray-600">
              거래 상품: {`${formatDataSize(data.dataAmount)} ${postTypeGuard[data.type]}`}
            </p>
          </LayoutBox>
        </LayoutBox>
        {data.state !== "ACTIVE" && (
          <ButtonComponent
            variant={"primary2"}
            size={"xxs"}
            className="absolute bottom-12 right-36"
          >
            받은 후기 보기
          </ButtonComponent>
        )}
      </ItemCard>
    </div>
  );
}
