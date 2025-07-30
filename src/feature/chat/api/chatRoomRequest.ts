import axiosInstance from "@/lib/axios";

export const createOrGetChatRoom = async (productId: number): Promise<number> => {
  try {
    const response = await axiosInstance.post(`/api/products/${productId}/chat-room`);
    const chatRoomId = response.data.data.chatRoomId;
    return chatRoomId;
  } catch (error) {
    console.error("채팅방 생성 실패 (알 수 없는 에러)", error);
    throw new Error("알 수 없는 오류로 채팅방 생성에 실패했습니다.");
  }
};

export const getChatRoomList = async (size: number = 10, chatRoomReadOption: string = "ALL") => {
  try {
    const response = await axiosInstance.get("/api/chat-room", {
      params: {
        size,
        chatRoomReadOption,
      },
    });

    if (response.data.code === 0) {
      return response.data.data.data;
    } else {
      throw new Error(response.data.message || "채팅방 조회 실패");
    }
  } catch (error) {
    console.error("채팅방 목록 조회 실패:", error);
    throw error;
  }
};

export const markMessageAsRead = async (chatMessageId: number | string) => {
  try {
    const response = await axiosInstance.post(`/api/chat-messages/${chatMessageId}/read-status`);

    if (response.data.code === 0) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "메시지 읽음 처리 실패");
    }
  } catch (error) {
    console.error("메시지 읽음 처리 실패:", error);
    throw error;
  }
};
