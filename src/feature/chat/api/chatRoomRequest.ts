import { useChatStore } from "@feature/chat/stores/useChatStore";

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
    });

    return mockId;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${productId}/chat-room`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("채팅방 생성 실패", res.status, text);
    throw new Error(`채팅방 생성 실패 (status ${res.status})`);
  }
  const result = await res.json();
  const chatRoomId = result.data.chatRoomId;

  return chatRoomId;
};
