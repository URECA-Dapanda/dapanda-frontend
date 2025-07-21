"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TopSheet from "@/components/common/topsheet/TopSheet";
import { ButtonComponent } from "@components/common/button";
import TimeSelectorSection from "@/feature/map/components/sections/product/TimeSelectorSection";
import SellerSection from "@/feature/map/components/sections/seller/SellerSection";
import { usePurchaseTimer } from "@/feature/map/hooks/usePurchaseTimer";
import { useMapDetailData } from "@/feature/map/hooks/useMapDetailData";
import { useTimeState } from "@/feature/map/hooks/useTimeState";
import { isValidTimeRange, parseHHMMToTime, isTimeInRange } from "@/lib/time";
import clsx from "clsx";

export default function MapDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "1";

  const [topSheetExpanded, setTopSheetExpanded] = useState(false);

  const { handlePurchase } = usePurchaseTimer();
  const { data, seller } = useMapDetailData(id);
  const [error, setError] = useState<string | null>(null);

  const minTime = parseHHMMToTime(data.openTime);
  const maxTime = parseHHMMToTime(data.closeTime);

  const { startTime, endTime, setStartTime, setEndTime } = useTimeState(
    data.openTime,
    data.closeTime
  );
  const onBuy = () => {
    if (!isValidTimeRange(startTime, endTime)) {
      setError("종료 시간은 시작 시간보다 늦어야 합니다.");
      return;
    }

    if (!isTimeInRange(startTime, minTime, maxTime)) {
      setError("시작 시간이 매장의 이용 가능 시간보다 이릅니다.");
      return;
    }
    if (!isTimeInRange(endTime, minTime, maxTime)) {
      setError("종료 시간이 매장의 이용 가능 시간보다 늦습니다.");
      return;
    }

    setError(null);
    handlePurchase(startTime, endTime, () => {
      router.push("/data");
    });
  };

  return (
    <div className="w-[375px] mx-auto relative">
      <TopSheet
        type="wifi"
        data={data}
        onImageClick={() => {}}
        onExpandChange={setTopSheetExpanded}
      />

      <div
        className={clsx(
          "transition-all duration-300 px-24 py-24",
          topSheetExpanded ? "pt-[500px]" : "pt-[280px]"
        )}
      >
        <TimeSelectorSection
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          minTime={parseHHMMToTime(data.openTime)}
          maxTime={parseHHMMToTime(data.closeTime)}
        />

        <SellerSection seller={seller} />

        <div className="px-6 mt-12">
          <ButtonComponent className="w-full" variant="primary" size="xl" onClick={onBuy}>
            구매하기
          </ButtonComponent>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}{" "}
        </div>
      </div>
    </div>
  );
}
