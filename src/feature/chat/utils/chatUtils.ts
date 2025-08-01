import type { ChatSocketMessage } from "@/feature/chat/types/chatType";
import { formatDateDivider } from "@/lib/time";

export const isTemporaryMessage = (message: ChatSocketMessage): boolean => {
  if (typeof message.chatMessageId === "number") {
    return message.chatMessageId >= 1000000000000;
  }
  return false;
};

export const formatMessageDate = (createdAt: string): string => {
  try {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  } catch (error) {
    console.error("날짜 파싱 오류:", error);
    return formatDateDivider();
  }
};
