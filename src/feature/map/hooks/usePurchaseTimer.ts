import { useCallback } from "react";
import { useTimerStore } from "@/feature/map/stores/useTimerStore";
import { isValidTimeRange, getDurationMinutes, formatToIsoTime } from "@/lib/time";
import type { Time } from "@type/Time";

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
