import CardComponent from "@components/common/card/CardComponent";
import CardContentComponent from "@components/common/card/CardContentComponent";
import LayoutBox from "@components/common/container/ContainerBox";
import { useChargeStore } from "@feature/mypage/stores/useChargeStore";
import { formatPriceString } from "@lib/formatters";

export default function ChargeInfoCard() {
  const chargeAmount = useChargeStore((state) => state.charge);

  return (
    <CardComponent variant="outlined" size="xxs">
      <CardContentComponent size={"sm"}>
        <LayoutBox layout="flex" direction="row">
          <p className="body-sm">결제금액</p>
          <p className="body-sm ml-auto">{chargeAmount ? formatPriceString(chargeAmount) : "--"}</p>
        </LayoutBox>
      </CardContentComponent>
    </CardComponent>
  );
}
