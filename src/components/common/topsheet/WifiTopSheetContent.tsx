import { BadgeComponent } from "@/components/common/badge";
import { WifiData } from "./topSheet.types";

export function WifiTopSheetContent({ data, expanded }: { data: WifiData; expanded: boolean }) {
  return (
    <>
      <div className="space-y-8">
        <BadgeComponent variant="meta" size="md" className="bg-primary2 text-black">
          {data.open ? "운영 중" : "운영 예정"}
        </BadgeComponent>

        <h2 className="title-sm">{data.place}</h2>
        <p className="caption-md text-gray-500 max-w-[142px] break-words">{data.address}</p>
      </div>

      <div className="flex flex-col gap-8 pt-12">
        <p className="body-xs">
          {data.startTime} ~ {data.endTime}
        </p>
        <p className="body-xs">{data.pricePer10min}원/10분</p>
        {expanded && <p className="body-sm">{data.description}</p>}
        {data.recentPrice !== undefined && data.averagePrice !== undefined && (
          <div className="flex gap-6 pt-4 flex-wrap">
            <BadgeComponent variant="outlined" size="sm" className="body-xxs">
              최근 거래가: {data.recentPrice}원
            </BadgeComponent>
            <BadgeComponent variant="outlined" size="sm" className="body-xxs">
              평균 거래가: {data.averagePrice}원
            </BadgeComponent>
          </div>
        )}
      </div>
    </>
  );
}
