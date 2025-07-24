"use client";

import { useState, useEffect, useRef } from "react";
import { formatDateDivider } from "@lib/time";
import { useProfileStore } from "@stores/useProfileStore";
import ChatBubble from "@feature/chat/components/sections/room/ChatBubble";
import type { ChatMessage } from "@/feature/chat/types/chatType";
import ChatPostCard from "@feature/chat/components/sections/room/ChatPostCard";
import { groupMessagesByDate } from "@feature/chat/utils/groupMessagesByDate";
import ChatInputBar from "@feature/chat/components/sections/room/ChatInputBar";
import { createStompClient, sendMessage } from "@feature/chat/utils/chatSocket";
import { getChatHistory } from "@feature/chat/api/getChatHistory";
import ChatRoomHeader from "@feature/chat/components/sections/room/ChatRoomHeader";
// import { useChatStore } from "@feature/chat/stores/useChatStore";

interface ChatRoomContentProps {
  chatRoomId: number;
  itemId: number;
  title: string;
  price: string;
  senderName: string;
}
export default function ChatRoomContent({
  chatRoomId,
  itemId,
  title,
  price,
  senderName,
}: ChatRoomContentProps) {
  const currentUserId = useProfileStore((state) => state.id);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const clientRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatRoomId) return;
    getChatHistory(chatRoomId)
      .then((messages) => {
        setMessages(messages); // 그냥 그대로!
      })
      .catch((err) => {
        console.error("채팅 기록 불러오기 실패:", err);
      });

    // 2. 웹소켓 연결
    clientRef.current = createStompClient(chatRoomId, (msg: any) => {
      const data = typeof msg === "string" ? JSON.parse(msg) : msg;
      const incomingMessage: ChatMessage = {
        id: String(data.chatMessageId),
        senderId: String(data.senderId),
        text: data.message,
        createdAt: data.createdAt,
        productId: data.productId,
      };
      setMessages((prev) => [...prev, incomingMessage]);
    });

    return () => {
      clientRef.current?.deactivate();
    };
  }, [chatRoomId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages.length]); // 메시지 개수가 바뀔 때마다

  const addMessage = (text: string) => {
    const tempId = `temp-${Date.now()}`;
    const optimisticMessage: ChatMessage = {
      id: tempId,
      senderId: currentUserId?.toString() ?? "unknown",
      text,
      createdAt: new Date().toISOString(),
      productId: itemId,
    };

    // 1. 서버로 메시지 전송
    sendMessage(
      clientRef.current,
      chatRoomId,
      JSON.stringify({
        message: text,
        clientTempId: tempId,
      })
    );

    // 2. 내 화면에 바로 메시지 추가
    const newMessage: ChatMessage = {
      id: tempId,
      senderId: currentUserId?.toString() ?? "unknown",
      text,
      createdAt: new Date().toISOString(),
      productId: itemId,
    };
    setMessages((prev) => {
      // 서버 메시지와 같은 텍스트, 같은 보낸 사람, 같은 시간(혹은 tempId)인 optimistic 메시지 제거
      const filtered = prev.filter(
        (m) =>
          !(
            m.id.startsWith("temp-") &&
            m.text === newMessage.text &&
            m.senderId === newMessage.senderId
          )
      );
      // 중복 방지
      if (filtered.some((m) => m.id === newMessage.id)) {
        return filtered;
      }
      return [...filtered, newMessage];
    });

    console.log("현재 유저 ID:", currentUserId);
    console.log("sendMessage 호출", clientRef.current, chatRoomId, text);
  };

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div className="flex flex-col h-screen mb-20">
      <div className="shrink-0">
        <ChatRoomHeader senderName={senderName} />
      </div>
      <div className="px-24 pt-24 pb-12">
        <ChatPostCard title={title} price={price} />
      </div>
      <div className="flex-1 overflow-y-auto px-24 space-y-6">
        {groupMessagesByDate(sortedMessages).map(({ date, messages }) => (
          <div key={date} className="space-y-6">
            <div className="text-center text-gray-500 body-xs py-6">{formatDateDivider(date)}</div>
            <div className="flex flex-col gap-24">
              {messages.map((msg) => (
                <ChatBubble
                  key={msg.id}
                  message={msg}
                  currentUserId={String(currentUserId ?? "")}
                />
              ))}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        <div className="pb-44" />
      </div>
      <ChatInputBar onSend={addMessage} />
    </div>
  );
}
