import axios from "@/lib/axios";
import type { ChatMessage } from "../types/chatType";
import { useRef, useEffect } from "react";

export async function getChatHistory(
  chatRoomId: number,
  cursorId?: number,
  size: number = 20
): Promise<ChatMessage[]> {
  const res = await axios.get(`/api/chat-room/${chatRoomId}/history`, {
    params: { size, cursorId },
  });
  return res.data.data.data.map((msg: any) => ({
    id: String(msg.chatMessageId),
    senderId: String(msg.senderId),
    text: msg.message,
    createdAt: msg.createdAt,
  }));
}
