import AvatarIcon from "@components/common/AvatarIcon";
import LayoutBox from "@components/common/container/LayoutBox";
import { DataType, ProductItemProps } from "@feature/data/types/dataType";

export default function DataItemContent({
  data: { date, price, pricePer, title, userName },
}: ProductItemProps<DataType>) {
  return (
    <LayoutBox layout="grid" autoFit gap={32} direction="row" height="full">
      <AvatarIcon size="large" />
      <div className="flex flex-col justify-center h-full">
        <span className="body-lg">{title}</span>
        <span className="body-sm text-gray-500">{userName}</span>
        <span className="body-md font-semibold mt-1">{price}</span>
      </div>
      <div className="flex flex-col items-end text-right self-start ">
        <span className="body-xs text-gray-500">{date}</span>
        <span className="body-xs">{pricePer}</span>
      </div>
    </LayoutBox>
  );
}
