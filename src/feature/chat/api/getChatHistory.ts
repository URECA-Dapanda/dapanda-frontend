import axios from "@/lib/axios";
import type { ChatSocketMessage } from "@/feature/chat/types/chatType";

export async function getChatHistory(
  chatRoomId: number,
  cursorId?: number,
  size: number = 10
): Promise<ChatSocketMessage[]> {
  const params: { size: number; cursorId?: number } = { size };
  if (cursorId !== undefined && !isNaN(cursorId)) {
    params.cursorId = cursorId;
  }

  const res = await axios.get(`/api/chat-room/${chatRoomId}/history`, {
    params,
  });
  if (res.data.code !== 0) throw new Error(res.data.message);
  return res.data.data.data;
}
