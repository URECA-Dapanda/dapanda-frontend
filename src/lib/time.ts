import { Time } from "@type/Time";

export function formatTimeToAmPm(iso: string): string {
  const date = new Date(iso);
  const hour = date.getHours();
  const minute = String(date.getMinutes()).padStart(2, "0");
  const period = hour < 12 ? "오전" : "오후";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${period} ${formattedHour}:${minute}`;
}

export function formatRelativeTime(iso: string, withSuffix = false): string {
  const now = new Date();
  const date = new Date(iso);
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 1000 / 60);

  let result: string;

  if (diffMinutes < 1) {
    result = "방금";
  } else if (diffMinutes < 60) {
    result = `${diffMinutes}분 전`;
  } else {
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
      result = `${diffHours}시간 전`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      result = `${diffDays}일 전`;
    }
  }

  return withSuffix && result !== "방금" ? `${result}` : result;
}

export const formatTime = (time: number) => {
  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export const parseTimeToMinutes = (hour: string, minute: string, period: "AM" | "PM") => {
  let h = parseInt(hour, 10);
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return h * 60 + parseInt(minute, 10);
};

export const getDurationMinutes = (start: Time, end: Time): number => {
  const startMins = parseTimeToMinutes(start.hour, start.minute, start.period);
  let endMins = parseTimeToMinutes(end.hour, end.minute, end.period);

  // 자정을 넘긴 경우 다음 날로 간주
  if (endMins <= startMins) {
    endMins += 24 * 60;
  }

  return endMins - startMins;
};

export const isValidTimeRange = (start: Time, end: Time): boolean => {
  const startMins = parseTimeToMinutes(start.hour, start.minute, start.period);
  const endMins = parseTimeToMinutes(end.hour, end.minute, end.period);

  // 0분짜리 → 잘못된 범위
  if (startMins === endMins) return false;

  // 1분 ~ 1439분 → 모두 허용 (24시간은 허용하지 않음)
  const duration = (endMins - startMins + 1440) % 1440;
  return duration > 0;
};

export const formatToIsoTime = (time: Time): string => {
  const minutes = parseTimeToMinutes(time.hour, time.minute, time.period);
  const now = new Date();
  now.setHours(Math.floor(minutes / 60));
  now.setMinutes(minutes % 60);
  now.setSeconds(0);
  return now.toISOString();
};

export function formatIsoToHHMM(isoString: string): string {
  const date = new Date(isoString);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function formatToIsoDate(time: Time): string {
  const now = new Date();
  let hour = parseInt(time.hour, 10);
  if (time.period === "PM" && hour !== 12) hour += 12;
  if (time.period === "AM" && hour === 12) hour = 0;

  now.setHours(hour);
  now.setMinutes(parseInt(time.minute, 10));
  now.setSeconds(0);
  now.setMilliseconds(0);
  return now.toLocaleString("sv-SE").replace(" ", "T");
}

// 1일 추가 -> 백엔드 처리 후 삭제
export function formatToIsoDatePlusOneDay(time: Time): string {
  const now = new Date();
  now.setDate(now.getDate() + 1);

  let hour = parseInt(time.hour, 10);
  if (time.period === "PM" && hour !== 12) hour += 12;
  if (time.period === "AM" && hour === 12) hour = 0;

  now.setHours(hour);
  now.setMinutes(parseInt(time.minute, 10));
  now.setSeconds(0);
  now.setMilliseconds(0);
  return now.toLocaleString("sv-SE").replace(" ", "T"); // 예: 2025-07-31T09:00:00
}

// 1년 추가 -> 백엔드 처리 후 삭제
export function formatToIsoDatePlusOneYear(time: string): string {
  const now = new Date();
  const [hour, minute] = time.split(":");

  now.setHours(Number(hour));
  now.setMinutes(Number(minute));
  now.setSeconds(0);
  now.setMilliseconds(0);

  now.setFullYear(now.getFullYear() + 1);

  return now.toLocaleString("sv-SE").replace(" ", "T"); // YYYY-MM-DDTHH:mm:ss
}

export const parseHHMMToTime = (hhmm: string): Time => {
  const [hourStr, minute] = hhmm.split(":");
  let hour = parseInt(hourStr, 10);
  const period = hour >= 12 ? "PM" : "AM";

  if (hour === 0) hour = 12;
  else if (hour > 12) hour = hour - 12;

  return {
    hour: hour.toString().padStart(2, "0"),
    minute,
    period,
  };
};

export const formatTimeToHHMM = (time: {
  hour: string | number;
  minute: string | number;
}): string => {
  const pad = (n: number) => n.toString().padStart(2, "0");
  const hour = typeof time.hour === "string" ? parseInt(time.hour, 10) : time.hour;
  const minute = typeof time.minute === "string" ? parseInt(time.minute, 10) : time.minute;
  return `${pad(hour)}:${pad(minute)}`;
};

export const compareTimes = (a: Time, b: Time): number => {
  const toMinutes = (t: Time) => {
    let hour = parseInt(t.hour, 10);
    if (t.period === "PM" && hour !== 12) hour += 12;
    if (t.period === "AM" && hour === 12) hour = 0;
    return hour * 60 + parseInt(t.minute, 10);
  };

  return toMinutes(a) - toMinutes(b);
};

export const compareTimesWithWraparound = (a: Time, b: Time, base: Time): number => {
  const toMinutes = (t: Time) => {
    let hour = parseInt(t.hour, 10);
    if (t.period === "PM" && hour !== 12) hour += 12;
    if (t.period === "AM" && hour === 12) hour = 0;
    return hour * 60 + parseInt(t.minute, 10);
  };

  const baseMins = toMinutes(base);
  let aMins = toMinutes(a);
  let bMins = toMinutes(b);

  if (aMins < baseMins) aMins += 1440;
  if (bMins < baseMins) bMins += 1440;

  return aMins - bMins;
};

export const isTimeInRange = (target: Time, min: Time, max: Time): boolean => {
  const minMins = parseTimeToMinutes(min.hour, min.minute, min.period);
  const maxMins = parseTimeToMinutes(max.hour, max.minute, max.period);
  let targetMins = parseTimeToMinutes(target.hour, target.minute, target.period);

  if (maxMins <= minMins) {
    // 자정을 넘기는 범위 (예: 18:00 ~ 00:00)
    if (targetMins < minMins) targetMins += 1440;
    return targetMins >= minMins && targetMins <= maxMins + 1440;
  }

  return targetMins >= minMins && targetMins <= maxMins;
};

// 기존 함수를 수정 (실제 날짜 데이터를 받도록)
export function formatDateDivider(date?: string | Date): string {
  const targetDate = date ? new Date(date) : new Date();
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();
  return `${year}년 ${month}월 ${day}일`;
}

export function formatChatDateDivider(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return `${year}년 ${month}월 ${day}일`;
}
