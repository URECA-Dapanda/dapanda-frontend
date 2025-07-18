import AvatarIcon from "@components/common/AvatarIcon";
import { ButtonComponent } from "@components/common/button";
import ItemCard from "@components/common/card/ItemCard";
import LayoutBox from "@components/common/container/LayoutBox";
import { SaleHistoryType } from "@feature/mypage/types/mypageTypes";

interface HistoryCardProps {
  data: SaleHistoryType;
  size?: "sm" | "lg";
}

export function HistoryCard({ data, size = "sm" }: HistoryCardProps) {
  return (
    <ItemCard size={size}>
      <LayoutBox layout="flex" direction="row" gap={19}>
        <AvatarIcon size="small" />
        <LayoutBox layout="flex" direction="column" gap={0}>
          <p className="title-sm">{data.type}</p>
          <p className="body-sm">등록 일자: {data.registDate}</p>
          {data.isSold && (
            <p className="body-sm">거래 일자: {data.soldDate ? data.soldDate : "--"}</p>
          )}
          <p className="body-sm text-gray-600">거래 상품: {data.title}</p>
        </LayoutBox>
      </LayoutBox>
      {data.isSold && (
        <ButtonComponent variant={"primary2"} size={"xxs"} className="absolute bottom-12 right-36">
          받은 후기 보기
        </ButtonComponent>
      )}
    </ItemCard>
  );
}
