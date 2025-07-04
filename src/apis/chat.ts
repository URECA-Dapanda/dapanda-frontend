import { ChatProps } from "@/types/Chat";

/**
 * 실제 API 연동시 삭제해주세요.
 */
const mockChat = () =>
  new Promise<ChatProps[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "김데이터",
          lastMessage: "2GB 데이터 구매하고 싶어요",
          time: "2분 전",
          unread: 2,
          avatar: "김",
          product: "2GB 데이터 판매",
          userId: "user1",
        },
        {
          id: 2,
          name: "박핫스팟",
          lastMessage: "위치가 정확히 어디인가요?",
          time: "1시간 전",
          unread: 0,
          avatar: "박",
          product: "강남역 핫스팟",
          userId: "user2",
        },
        {
          id: 3,
          name: "이매장",
          lastMessage: "네, 감사합니다!",
          time: "어제",
          unread: 0,
          avatar: "이",
          product: "스타벅스 와이파이",
          userId: "user3",
        },
      ]);
    }, 100);
  });

export const getChatHistory = async () => {
  const response = await mockChat();

  return response;
};
