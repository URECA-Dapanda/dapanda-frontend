import type { ChatSocketMessage } from "@/feature/chat/types/chatType";
import { formatMessageDate } from "@/feature/chat/utils/chatUtils";

interface GroupedMessages {
  date: string;
  messages: ChatSocketMessage[];
}

//채팅 메시지를 날짜별로 그룹화 (메시지 ID 기준)
export function groupMessagesByDate(messages: ChatSocketMessage[]): GroupedMessages[] {
  const groups: { [date: string]: ChatSocketMessage[] } = {};

  messages.forEach((msg) => {
    // 모든 메시지에 대해 createdAt 사용 (임시/실제 구분 없이)
    const date = formatMessageDate(msg.createdAt);

    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(msg);
  });

  return Object.entries(groups)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([date, messages]) => ({
      date,
      messages: messages.sort((a, b) => Number(a.chatMessageId) - Number(b.chatMessageId)),
    }));
}
