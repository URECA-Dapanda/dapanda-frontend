import AvatarIcon from "@components/common/AvatarIcon";
import LayoutBox from "@components/common/container/LayoutBox";
import { DataType, ProductItemProps } from "@feature/data/types/dataType";
import { BadgeComponent } from "@components/common/badge";
import { formatRelativeTime } from "@lib/time";
import { SkeletonCard } from "@components/common/skeleton";
export default function DataItemContent({ data }: Partial<ProductItemProps<DataType>>) {
  if (!data) return <SkeletonCard />;
  const { date, price, pricePer100MB, title, memberName, splitType, profileImageUrl } = data ?? {};
  return (
    <LayoutBox layout="grid" autoFit gap={32} direction="row" height="full">
      <AvatarIcon size="large" avatar={profileImageUrl}/>
      <div className="flex flex-col justify-center h-full">
        <span className="body-lg">{title}</span>
        <span className="body-sm text-gray-500 line-clamp-5">{memberName}</span>
        <span className="body-md font-semibold mt-1">{price}</span>
      </div>
      <div className="flex flex-col items-end text-right self-start">
        {splitType && (
          <BadgeComponent variant="mapcategory" size="sm" className="bg-primary2 text-black">
            분할판매중
          </BadgeComponent>
        )}
        <span className="body-xs text-gray-500">{formatRelativeTime(date, true)}</span>
        <span className="body-xs">{pricePer100MB}</span>
      </div>
    </LayoutBox>
  );
}
