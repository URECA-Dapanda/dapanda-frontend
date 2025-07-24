import axios from "@/lib/axios";
import { ChatMessage, ChatSocketMessage } from "@/feature/chat/types/chatType";

export async function getChatHistory(
  chatRoomId: number,
  cursorId?: number,
  size = 20
): Promise<ChatMessage[]> {
  const res = await axios.get(`/api/chat-room/${chatRoomId}/history`, {
    params: { size, cursorId },
  });
  return res.data.data.content.map((msg: ChatSocketMessage) => ({
    id: String(msg.chatMessageId),
    senderId: String(msg.senderId),
    text: msg.message,
    createdAt: msg.createdAt,
  }));
}
