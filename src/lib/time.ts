export function formatTimeToAmPm(iso: string): string {
  const date = new Date(iso);
  const hour = date.getHours();
  const minute = String(date.getMinutes()).padStart(2, "0");
  const period = hour < 12 ? "오전" : "오후";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${period} ${formattedHour}:${minute}`;
}
