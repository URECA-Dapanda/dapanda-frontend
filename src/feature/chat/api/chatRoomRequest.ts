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
