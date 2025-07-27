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
    result = `${diffMinutes}분`;
  } else {
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
      result = `${diffHours}시간`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      result = `${diffDays}일`;
    }
  }

  return withSuffix && result !== "방금" ? `${result} 전` : result;
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
  const endMins = parseTimeToMinutes(end.hour, end.minute, end.period);
  return Math.max(endMins - startMins, 0);
};

export const isValidTimeRange = (start: Time, end: Time): boolean => {
  return getDurationMinutes(start, end) > 0;
};

export const formatToIsoTime = (time: Time): string => {
  const minutes = parseTimeToMinutes(time.hour, time.minute, time.period);
  const now = new Date();
  now.setHours(Math.floor(minutes / 60));
  now.setMinutes(minutes % 60);
  now.setSeconds(0);
  return now.toISOString();
};

export function formatToIsoDate(time: string): string {
  const now = new Date();
  const [hour, minute] = time.split(":");
  now.setHours(Number(hour));
  now.setMinutes(Number(minute));
  now.setSeconds(0);
  now.setMilliseconds(0);
  return now.toLocaleString("sv-SE").replace(" ", "T");
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

export const isTimeInRange = (target: Time, min: Time, max: Time): boolean => {
  return compareTimes(target, min) >= 0 && compareTimes(target, max) <= 0;
};

export function formatDateDivider(isoOrDateString: string): string {
  const date = new Date(isoOrDateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
}
