import axios from "@/lib/axios";
import type { ChatMessage } from "@/feature/chat/types/chatType";

export async function getChatHistory(
  chatRoomId: number,
  cursorId?: number,
  size: number = 10
): Promise<ChatMessage[]> {
  const res = await axios.get(`/api/chat-room/${chatRoomId}/history`, {
    params: { size, cursorId },
  });
  if (res.data.code !== 0) throw new Error(res.data.message);
  return res.data.data.data.map((msg: any) => ({
    id: String(msg.chatMessageId),
    senderId: String(msg.senderId),
    text: msg.message,
    createdAt: msg.createdAt,
  }));
}
