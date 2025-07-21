// 💡 src/feature/chat/api/chatContentRequest.ts
import { ContentInfoType } from "../types/contentType";

export const getChatContentInfo = async (chatRoomId: string): Promise<ContentInfoType> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Number(chatRoomId),
        title: `${chatRoomId}`,
        price: "2,000원",
      });
    }, 100);
  });
};
