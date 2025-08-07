import { useState } from "react";
import type { Time } from "@type/Time";
import { parseHHMMToTime } from "@/lib/time";

export const useTimeState = (openTime: string, closeTime: string) => {
  const [startTime, setStartTime] = useState<Time>(() => parseHHMMToTime(openTime));
  const [endTime, setEndTime] = useState<Time>(() => parseHHMMToTime(closeTime));

  return { startTime, setStartTime, endTime, setEndTime };
};
