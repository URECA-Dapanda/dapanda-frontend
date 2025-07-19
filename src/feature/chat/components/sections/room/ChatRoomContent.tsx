"use client";

//import { useSearchParams } from "next/navigation";
import ChatBubble from "@feature/chat/components/sections/room/ChatBubble";
import type { ChatMessage } from "@/feature/chat/types/message";
import ChatPostCard from "./ChatPostCard";
import { groupMessagesByDate } from "@feature/chat/utils/groupMessagesByDate";
import { formatDateDivider } from "@lib/time";
//import { useChatStream } from "@/feature/chat/hooks/useChatStream";
//import { useProfileStore } from "@stores/useProfileStore";

interface ChatRoomContentProps {
  title: string;
  price: string;
}
export default function ChatRoomContent({ title, price }: ChatRoomContentProps) {
  const currentUserId = "123";
  //const searchParams = useSearchParams();
  //const chatId = searchParams.get("chatId") || "1"; // 예시
  //const currentUserAvatar = useProfileStore((state) => state.avatar);

  const messages: ChatMessage[] = [
    {
      id: "1",
      senderId: "456",
      senderAvatar: "/creditIcon.png",
      text: "궁금한게 있어요!",
      createdAt: "2024-02-19T09:56:00",
    },
    {
      id: "2",
      senderId: "123",
      text: "네 말씀하세요",
      createdAt: "2024-02-19T09:57:00",
    },
    {
      id: "3",
      senderId: "456",
      senderAvatar: "/creditIcon.png",
      text: "잠시만 기다려주세요",
      createdAt: "2024-02-19T13:56:00",
    },
    {
      id: "4",
      senderId: "456",
      senderAvatar: "/creditIcon.png",
      text: "그게 말이죠이이이이 제가 궁금한건 말이죠이이이이 그건 바로",
      createdAt: "2024-02-19T13:58:00",
    },
  ];

  return (
    <main className="px-24 space-y-6 pt-24">
      <div className="pb-48">
        <ChatPostCard title={title} price={price} />
      </div>

      {groupMessagesByDate(messages).map(({ date }) => (
        <div key={date} className="space-y-6">
          <div className="text-center text-gray-500 body-xs py-6">{formatDateDivider(date)}</div>
          <div className="flex flex-col gap-24">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} currentUserId={currentUserId} />
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
