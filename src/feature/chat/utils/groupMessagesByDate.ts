import type { ChatMessage } from "@/feature/chat/types/message";

//채팅 메시지를 날짜별로 그룹화
export function groupMessagesByDate(messages: ChatMessage[]) {
  const groups: { [date: string]: ChatMessage[] } = {};

  messages.forEach((msg) => {
    const date = msg.createdAt.split("T")[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(msg);
  });

  // 날짜 순 정렬해서 반환
  return Object.entries(groups)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([date, messages]) => ({ date, messages }));
}
