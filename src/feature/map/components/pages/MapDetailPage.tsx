"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import TopSheet from "@/components/common/topsheet/TopSheet";
import { ButtonComponent } from "@components/common/button";
import TimeSelectorSection from "@/feature/map/components/sections/product/TimeSelectorSection";
import SellerSection from "@/feature/map/components/sections/seller/SellerSection";
import { usePurchaseTimer } from "@/feature/map/hooks/usePurchaseTimer";
import { useMapDetailData } from "@/feature/map/hooks/useMapDetailData";
import { useTimeState } from "@/feature/map/hooks/useTimeState";
import DeletePostModal from "@/feature/data/components/sections/modal/DeletePostModal";
import { isValidTimeRange, parseHHMMToTime, isTimeInRange } from "@/lib/time";
import { useProfileStore } from "@stores/useProfileStore";
import { useWifiPriceRecommendation } from "@/feature/map/hooks/useWifiPriceRecommendation";

import clsx from "clsx";

export default function MapDetailPage() {
  const router = useRouter();
  const { postId } = useParams<{ postId: string }>();

  const [topSheetExpanded, setTopSheetExpanded] = useState(false);
  const { handlePurchase } = usePurchaseTimer();
  const { data, isLoading, isError } = useMapDetailData(postId);
  const [error, setError] = useState<string | null>(null);

  const { recentPrice, avgPrice } = useWifiPriceRecommendation();

  const currentUserId = useProfileStore((state) => state.id);
  const isOwner = data && currentUserId === data.memberId;


  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const params = new URLSearchParams(
    data && {
      productId: String(data.productId),
      lat: String(data.latitude),
      lng: String(data.longitude),
    }
  );

  const { startTime, endTime, setStartTime, setEndTime } = useTimeState("09:00", "22:00");

  useEffect(() => {
    if (data?.openTime && data?.closeTime) {
      setStartTime(parseHHMMToTime(data.openTime));
      setEndTime(parseHHMMToTime(data.closeTime));
    }
  }, [data?.openTime, data?.closeTime, setStartTime, setEndTime]);

  if (isLoading || !data) return <div className="text-center py-24">불러오는 중...</div>;
  if (isError)
    return <div className="text-center text-red-500">상품 정보를 불러오지 못했습니다.</div>;

  const minTime = parseHHMMToTime(data.openTime);
  const maxTime = parseHHMMToTime(data.closeTime);

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
        data={{
          ...data,
          recentPrice,
          averagePrice: avgPrice,
        }}
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
          minTime={minTime}
          maxTime={maxTime}
          showEditButton={isOwner}
          onEditClick={() => router.push(`/map/regist/wifi?edit=true&${params.toString()}`)}
          onDeleteClick={() => setDeleteModalOpen(true)}
        />

        <SellerSection
          memberName={data.memberName}
          rating={data.averagePrice}
          reviewCount={data.reviewCount}
          productId={String(data.productId)}
        />

        <div className="px-6 mt-12">
          <ButtonComponent
            className="w-full"
            variant="primary"
            size="xl"
            onClick={onBuy}
            disabled={!data.open}
          >
            구매하기
          </ButtonComponent>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        </div>
      </div>
      <DeletePostModal isOpen={deleteModalOpen} setIsOpen={setDeleteModalOpen} />
    </div>
  );
}
