import { BadgeComponent } from "@/components/common/badge";
import { PostData } from "./topSheet.types";
import { Siren } from "lucide-react";

export function PostTopSheetContent({ data, expanded }: { data: PostData; expanded: boolean }) {
  return (
    <>
      {data.hasReported && (
        <div className="absolute top-4 right-4 z-20 rounded-full bg-white shadow-default w-30 h-30 flex items-center justify-center">
          <Siren className="text-red-500 w-12 h-12" />
        </div>
      )}
      <div className="flex flex-col gap-8">
        {data.splitType && (
          <BadgeComponent variant="mapcategory" size="sm" className="bg-primary2 text-black">
            분할판매중
          </BadgeComponent>
        )}
        <BadgeComponent variant="meta" size="md" className="bg-gray-400 w-[58px] inline-flex">
          {data.uploadTime} 전
        </BadgeComponent>
        <h2 className="h1">{data.title}</h2>
      </div>
      <div className="flex flex-col gap-8">
        <p className="title-md">{data.price}원</p>
        {expanded && <p className="body-xs">{data.unitPrice}원/100MB</p>}

        {data.recentPrice && data.averagePrice && (
          <div className="flex gap-12 pt-20 flex-wrap">
            <BadgeComponent variant="meta" size="md" className="bg-white">
              최근거래가: {data.recentPrice}원
            </BadgeComponent>
            <BadgeComponent variant="meta" size="md" className="bg-white">
              평균거래가: {data.averagePrice}원
            </BadgeComponent>
          </div>
        )}
      </div>
    </>
  );
}
