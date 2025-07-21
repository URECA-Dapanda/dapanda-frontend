"use client";

import { useState } from "react";
import ChatBubble from "@feature/chat/components/sections/room/ChatBubble";
import type { ChatMessage } from "@/feature/chat/types/message";
import ChatPostCard from "@feature/chat/components/sections/room/ChatPostCard";
import { groupMessagesByDate } from "@feature/chat/utils/groupMessagesByDate";
import { formatDateDivider } from "@lib/time";
import ChatInputBar from "@feature/chat/components/sections/room/ChatInputBar";
import { useChatStore } from "@feature/chat/stores/useChatStore";
interface ChatRoomContentProps {
  chatRoomId: number;
  title: string;
  price: string;
}
export default function ChatRoomContent({ chatRoomId, title, price }: ChatRoomContentProps) {
  const currentUserId = "123";

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const addMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: (messages.length + 1).toString(),
      senderId: currentUserId,
      text,
      createdAt: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);

    useChatStore.getState().addChatRoom({
      chatRoomId,
      title,
      price: parseFloat(price),
      name: currentUserId,
      lastMessage: text,
      updatedAt: newMessage.createdAt,
    });
  };

  return (
    <main className="px-24 space-y-6 pt-24">
      <div className="pb-48">
        <ChatPostCard title={title} price={price} />
      </div>

      {groupMessagesByDate(messages).map(({ date, messages }) => (
        <div key={date} className="space-y-6">
          <div className="text-center text-gray-500 body-xs py-6">{formatDateDivider(date)}</div>
          <div className="flex flex-col gap-24">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} currentUserId={currentUserId} />
            ))}
          </div>
        </div>
      ))}
      <ChatInputBar onSend={addMessage} />
    </main>
  );
}
