"use client";

import { useCallback } from "react";
import { useTimerStore } from "@/feature/map/stores/useTimerStore";
import TimeSelector from "@/feature/map/components/sections/product/TimeSelector";
import { isValidTimeRange, getDurationMinutes, formatToIsoTime } from "@/lib/time";
import type { Time } from "@type/Time";
import { ButtonComponent } from "@components/common/button";
import { Pencil, Trash2 } from "lucide-react";

export const usePurchaseTimer = () => {
  const { startTimer } = useTimerStore();

  const handlePurchase = useCallback(
    (
      start: Time,
      end: Time,
      onSuccess?: (payload: { duration: number; startTimeIso: string; endTimeIso: string }) => void
    ) => {
      if (!isValidTimeRange(start, end)) {
        alert("종료 시간이 시작 시간보다 빠르거나 같습니다.");
        return;
      }

      const duration = getDurationMinutes(start, end);
      const startTimeIso = formatToIsoTime(start);
      const endTimeIso = formatToIsoTime(end);

      startTimer(duration * 60);
      onSuccess?.({ duration, startTimeIso, endTimeIso });
    },
    [startTimer]
  );

  return { handlePurchase };
};

interface Props {
  startTime: Time;
  setStartTime: (t: Time) => void;
  endTime: Time;
  setEndTime: (t: Time) => void;
  minTime: Time;
  maxTime: Time;
  showEditButton?: boolean;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

export default function TimeSelectorSection({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  minTime,
  maxTime,
  showEditButton,
  onEditClick,
  onDeleteClick,
}: Props & { showEditButton?: boolean; onEditClick?: () => void }) {
  return (
    <div className="px-6 py-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="title-md">이용할 시간</h3>
        {showEditButton && (
          <div className="flex gap-6">
            <ButtonComponent variant="outlineGray" size="sm" onClick={onDeleteClick}>
              <Trash2 className="w-12 h-12 mr-2" />글 삭제하기
            </ButtonComponent>
            <ButtonComponent variant="outlineGray" size="sm" onClick={onEditClick}>
              <Pencil className="w-12 h-12 mr-2" />글 수정하기
            </ButtonComponent>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center gap-8 mt-12 rounded-12 shadow-material px-24 py-20">
        <TimeSelector
          label="Start"
          time={startTime}
          onChange={setStartTime}
          type="start"
          minTime={minTime}
          maxTime={maxTime}
        />
        <div className="text-2xl text-gray-400 mt-6">→</div>
        <TimeSelector
          label="End"
          time={endTime}
          onChange={setEndTime}
          type="end"
          minTime={minTime}
          maxTime={maxTime}
        />
      </div>
    </div>
  );
}
