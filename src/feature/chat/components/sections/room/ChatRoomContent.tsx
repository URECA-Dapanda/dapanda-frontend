"use client";

import { useState, useEffect, useRef } from "react";
import ChatBubble from "@feature/chat/components/sections/room/ChatBubble";
import type { ChatMessage } from "@/feature/chat/types/chatType";
import ChatPostCard from "@feature/chat/components/sections/room/ChatPostCard";
import { groupMessagesByDate } from "@feature/chat/utils/groupMessagesByDate";
import { formatDateDivider } from "@lib/time";
import ChatInputBar from "@feature/chat/components/sections/room/ChatInputBar";
import { useChatStore } from "@feature/chat/stores/useChatStore";
import { createStompClient, sendMessage } from "@feature/chat/utils/chatSocket";
import { useProfileStore } from "@stores/useProfileStore";
import { getMapDetailById } from "@/feature/map/api/getMapDetailById";
import { getChatHistory } from "@feature/chat/api/getChatHistory";
import { useSearchParams } from "next/navigation";

interface ChatRoomContentProps {
  chatRoomId: number;
  itemId: number;
  title: string;
  price: string;
}
export default function ChatRoomContent({
  chatRoomId,
  itemId,
  title,
  price,
}: ChatRoomContentProps) {
  const currentUserId = useProfileStore((state) => state.id);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const clientRef = useRef<any>(null);

  useEffect(() => {
    // 1. 과거 메시지 불러오기
    getChatHistory(chatRoomId).then((history) => {
      setMessages(history);
    });

    // 2. 웹소켓 연결
    clientRef.current = createStompClient(chatRoomId, (msg: any) => {
      const data = typeof msg === "string" ? JSON.parse(msg) : msg;

      const incomingMessage: ChatMessage = {
        id: String(data.chatMessageId),
        senderId: String(data.senderId),
        text: data.message,
        createdAt: data.createdAt,
      };
      setMessages((prev) => {
        const isMine = incomingMessage.senderId === currentUserId?.toString();

        // 내가 방금 보낸 optimistic 메시지 필터링
        const withoutTemp = isMine
          ? prev.filter(
              (m) =>
                !(
                  m.id.startsWith("temp-") &&
                  m.senderId === incomingMessage.senderId &&
                  m.text === incomingMessage.text
                )
            )
          : prev;

        // 서버 메시지가 이미 있다면 중복 추가하지 않음
        if (withoutTemp.some((m) => m.id === incomingMessage.id)) return withoutTemp;

        return [...withoutTemp, incomingMessage];
      });
    });

    return () => {
      clientRef.current?.deactivate();
    };
  }, [chatRoomId, currentUserId]);

  const addMessage = (text: string) => {
    const tempId = `temp-${Date.now()}`;
    const optimisticMessage: ChatMessage = {
      id: tempId,
      senderId: currentUserId?.toString() ?? "unknown",
      text,
      createdAt: new Date().toISOString(),
    };

    // 1. 서버로 메시지 전송
    sendMessage(
      clientRef.current,
      chatRoomId,
      JSON.stringify({
        message: text,
      })
    );

    // 2. 내 화면에 바로 메시지 추가
    const newMessage: ChatMessage = {
      id: tempId,
      senderId: currentUserId?.toString() ?? "unknown",
      text,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => {
      // 새 메시지의 id가 이미 prev에 있으면 추가하지 않음
      if (prev.some((msg) => msg.id === newMessage.id)) return prev;
      return [...prev, newMessage];
    });

    useChatStore.getState().addChatRoom({
      chatRoomId,
      name: currentUserId?.toString() ?? "unknown",
      title,
      price: Number(price),
      itemId: Number(itemId),
      lastMessage: text,
      updatedAt: newMessage.createdAt,
    });
    console.log("현재 유저 ID:", currentUserId);
    console.log("sendMessage 호출", clientRef.current, chatRoomId, text);
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
              <ChatBubble key={msg.id} message={msg} currentUserId={String(currentUserId ?? "")} />
            ))}
          </div>
        </div>
      ))}
      <ChatInputBar onSend={addMessage} />
    </main>
  );
}
