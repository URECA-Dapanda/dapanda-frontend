import axios from "@/lib/axios";
import type { ChatMessage } from "../types/chatType";

export async function getChatHistory(
  chatRoomId: number,
  cursorId?: number,
  size: number = 20
): Promise<ChatMessage[]> {
  const res = await axios.get(`/chat-room/${chatRoomId}/history`, {
    params: { cursorId, size },
  });
  return res.data.data.content.map((msg: any) => ({
    id: String(msg.chatMessageId),
    senderId: String(msg.senderId),
    text: msg.message,
    createdAt: msg.createdAt,
  }));
}
