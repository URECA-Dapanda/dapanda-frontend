import CardComponent from "@components/common/card/CardComponent";
import CardContentComponent from "@components/common/card/CardContentComponent";
import LayoutBox from "@components/common/container/LayoutBox";
import { useChargeStore } from "@feature/mypage/stores/useChargeStore";
import { formatPriceString } from "@lib/formatters";

export default function ChargeInfoCard() {
  const chargeAmount = useChargeStore((state) => state.charge);

  return (
    <CardComponent variant="outlined" size="xs">
      <CardContentComponent size={"md"}>
        <LayoutBox layout="flex" direction="row">
          <p className="title-sm">결제금액</p>
          <p className="title-sm ml-auto">{chargeAmount ? formatPriceString(chargeAmount) : "--"}</p>
        </LayoutBox>
      </CardContentComponent>
    </CardComponent>
  );
}
