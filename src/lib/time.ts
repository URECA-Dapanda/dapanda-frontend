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
