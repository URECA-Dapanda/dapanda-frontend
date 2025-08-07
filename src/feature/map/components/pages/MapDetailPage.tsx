"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import TopSheet from "@/components/common/topsheet/TopSheet";
import { ButtonComponent } from "@components/common/button";
import TimeSelectorSection from "@/feature/map/components/sections/product/TimeSelectorSection";
import SellerSection from "@/feature/map/components/sections/seller/SellerSection";
import { useMapDetailData } from "@feature/map/hooks/query/useMapDetailData";
import { useTimeState } from "@/feature/map/hooks/useTimeState";
import DeletePostModal from "@/feature/data/components/sections/modal/DeletePostModal";
import { useWifiPriceRecommendation } from "@feature/map/hooks/query/useWifiPriceRecommendation";
import { usePaymentStore } from "@feature/payment/stores/paymentStore";
import { buildWifiPaymentInfo } from "@feature/payment/hooks/useWifiPurchaseBuilder";
import UsePaymentModals from "@feature/payment/hooks/usePaymentModals";
import { showErrorToast, showInfoToast } from "@lib/toast";
import { parseHHMMToTime, isWithinOperatingHours, getDurationMinutes } from "@/lib/time";
import clsx from "clsx";

export default function MapDetailPage() {
  const router = useRouter();
  const { postId } = useParams<{ postId: string }>();
  const setInfo = usePaymentStore((state) => state.setInfo);

  const { data, isLoading, isError } = useMapDetailData(postId);

  const { recentPrice, avgPrice } = useWifiPriceRecommendation();

  const isOwner = data?.myProduct;

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
    if (data?.startTime && data?.endTime) {
      setStartTime(parseHHMMToTime(data.startTime));
      setEndTime(parseHHMMToTime(data.endTime));
    }
  }, [data?.startTime, data?.endTime, setStartTime, setEndTime]);

  if (isLoading || !data) return <div className="text-center py-24">불러오는 중...</div>;
  if (isError)
    return <div className="text-center text-red-500">상품 정보를 불러오지 못했습니다.</div>;

  const minTime = parseHHMMToTime(data.startTime);
  const maxTime = parseHHMMToTime(data.endTime);

  const onBuy = () => {
    if (isOwner) {
      showInfoToast("내 게시글입니다");
      return;
    }

    if (!isWithinOperatingHours(startTime, endTime, minTime, maxTime)) {
      showErrorToast("선택한 시간이 매장의 운영시간 범위를 벗어납니다.");
      return;
    }

    const duration = getDurationMinutes(startTime, endTime);
    if (duration % 10 !== 0) {
      showErrorToast("이용 시간은 10분 단위로 선택해야 합니다.");
      return;
    }

    setInfo(buildWifiPaymentInfo(data, startTime, endTime));
  };

  return (
    <div className="w-full h-main-safe pt-safe-top pb-safe-bottom lg:w-[600px] mx-auto overflow-y-auto">
      {/* TopSheet는 고정 위치 */}
      <TopSheet
        type="wifi"
        data={{
          ...data,
          recentPrice,
          averagePrice: avgPrice,
          isOwner,
        }}
        onImageClick={() => {}}
      />

      {/* 전체 컨텐츠 영역 - TopSheet 높이만큼 패딩 */}
      <div
        className={clsx(
          "w-full transition-all duration-300 pt-12",
          // TopSheet 높이만큼 상단 패딩
          // 하단 safe area + 여유 공간
          "pb-[calc(env(safe-area-inset-bottom,0px)+72px)]"
        )}
      >
        <div className="px-24 pb-24">
          <div>
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
          </div>

          <SellerSection
            sellerId={data.memberId}
            productId={String(data.productId)}
            isOwner={isOwner}
            memberName={data.memberName}
          />

          <div className="px-6 mt-12">
            <ButtonComponent className="w-full" variant="primary" size="xl" onClick={onBuy}>
              구매하기
            </ButtonComponent>
          </div>
        </div>
      </div>

      <DeletePostModal isOpen={deleteModalOpen} setIsOpen={setDeleteModalOpen} />
      <UsePaymentModals />
    </div>
  );
}
