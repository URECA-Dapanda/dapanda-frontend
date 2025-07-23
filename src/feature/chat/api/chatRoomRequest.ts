import { useChatStore } from "@feature/chat/stores/useChatStore";
import axiosInstance from "@/lib/axios";

export const createOrGetChatRoom = async (
  productId: number,
  title: string,
  price: number
): Promise<number> => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    const mockId = 999;
    console.warn("현재는 테스트(mock 모드)로 채팅방 ID 반환 중");

    useChatStore.getState().addChatRoom({
      chatRoomId: mockId,
      title,
      price,
      name: "상대방 이름",
      lastMessage: "",
      updatedAt: new Date().toISOString(),
      itemId: 0,
    });

    return 999;
  }

  try {
    const response = await axiosInstance.post(`/api/products/${productId}/chat-room`);
    const chatRoomId = response.data.data.chatRoomId;
    return chatRoomId;
  } catch (error) {
    console.error("채팅방 생성 실패 (알 수 없는 에러)", error);
    throw new Error("알 수 없는 오류로 채팅방 생성에 실패했습니다.");
  }
};
