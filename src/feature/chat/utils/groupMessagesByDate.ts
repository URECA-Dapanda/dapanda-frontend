import type { ChatMessage } from "@/feature/chat/types/chatType";

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

  // 날짜 순 정렬 + 각 그룹 내 messages도 시간순 정렬
  return Object.entries(groups)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([date, messages]) => ({
      date,
      messages: messages.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ),
    }));
}
