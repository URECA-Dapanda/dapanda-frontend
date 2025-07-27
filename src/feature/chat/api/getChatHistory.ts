import axiosInstance from "@/lib/axios";
import type { ChatSocketMessage } from "@/feature/chat/types/chatType";

interface ChatHistoryResponse {
  data: ChatSocketMessage[];
  pageInfo: {
    nextCursorId: number | null;
    hasNext: boolean;
    size: number;
  };
}

export async function getChatHistory(
  chatRoomId: number,
  cursorId?: number,
  size: number = 20
): Promise<ChatHistoryResponse> {
  try {
    const params: { size: number; cursorId?: number } = { size };
    if (cursorId !== undefined && !isNaN(cursorId)) {
      params.cursorId = cursorId;
    }

    const response = await axiosInstance.get(`/api/chat-room/${chatRoomId}/history`, {
      params,
    });

    if (response.data.code === 0) {
      return {
        data: response.data.data.data,
        pageInfo: response.data.data.pageInfo,
      };
    } else {
      throw new Error(response.data.message || "채팅 기록 조회 실패");
    }
  } catch (error) {
    console.error("채팅 기록 조회 실패:", error);
    throw error;
  }
}
