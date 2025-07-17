import CardComponent from "@components/common/card/CardComponent";
import CurrentCashCard from "./sections/CurrentCashCard";
import { CardHeader } from "@ui/card";
import { ButtonComponent } from "@components/common/button";
import { formatPriceString } from "@lib/formatters";
import CardContentComponent from "@components/common/card/CardContentComponent";

export default function ChargeCashContent() {
  return (
    <div>
      <CurrentCashCard />
      <CardHeader title="충전하기" />
      <CardComponent variant="outlined" size="lg">
        <CardContentComponent size={"sm"}>
          <ButtonComponent variant={"outlineGray"} value={1000}>
            {formatPriceString("1000원")}
          </ButtonComponent>
          <ButtonComponent variant={"outlineGray"} value={2000}>
            {formatPriceString("2000원")}
          </ButtonComponent>
          <ButtonComponent variant={"outlineGray"} value={3000}>
            {formatPriceString("3000원")}
          </ButtonComponent>
          <ButtonComponent variant={"outlineGray"} value={4000}>
            {formatPriceString("4000원")}
          </ButtonComponent>
          <ButtonComponent variant={"outlineGray"} value={5000}>
            {formatPriceString("5000원")}
          </ButtonComponent>
          <ButtonComponent variant={"outlineGray"} value={10000}>
            {formatPriceString("10000원")}
          </ButtonComponent>
        </CardContentComponent>
      </CardComponent>
    </div>
  );
}
