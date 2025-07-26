"use client";

import { useState, useEffect, useRef } from "react";
import { formatDateDivider } from "@lib/time";
import { Client } from "@stomp/stompjs";
import ChatBubble from "@feature/chat/components/sections/room/ChatBubble";
import type { ChatSocketMessage } from "@/feature/chat/types/chatType";
import ChatPostCard from "@feature/chat/components/sections/room/ChatPostCard";
import { groupMessagesByDate } from "@feature/chat/utils/groupMessagesByDate";
import ChatInputBar from "@feature/chat/components/sections/room/ChatInputBar";
import { createStompClient, sendMessage } from "@feature/chat/utils/chatSocket";
import { getChatHistory } from "@feature/chat/api/getChatHistory";
import ChatRoomHeader from "@feature/chat/components/sections/room/ChatRoomHeader";
import ReportModal from "@/components/common/modal/ReportModal";

interface ChatRoomContentProps {
  chatRoomId: number;
  itemId: number;
  title: string;
  pricePer10min?: number;
  senderName: string;
}
export default function ChatRoomContent({
  chatRoomId,
  title,
  pricePer10min,
  senderName,
}: ChatRoomContentProps) {
  const [messages, setMessages] = useState<ChatSocketMessage[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const clientRef = useRef<Client | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fetchMoreMessages = async () => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    const oldestId = Number(messages[0]?.chatMessageId);
    const more = await getChatHistory(chatRoomId, oldestId, 10);
    setMessages((prev) => [...more, ...prev]);
    setHasMore(more.length === 10);
    setLoadingMore(false);
  };
  useEffect(() => {
    if (!chatRoomId) return;
    console.log("fetching history for", chatRoomId);
    getChatHistory(chatRoomId)
      .then((messages) => {
        console.log("history result:", messages);
        setMessages(messages);
      })
      .catch((err) => {
        console.error("채팅 기록 불러오기 실패:", err);
      });

    // 웹소켓 연결
    clientRef.current = createStompClient(chatRoomId, (msg: ChatSocketMessage) => {
      const data = typeof msg === "string" ? JSON.parse(msg) : msg;
      console.log("서버에서 받은 메시지:", data); // 디버깅용 로그
      const incomingMessage: ChatSocketMessage = {
        chatMessageId: data.chatMessageId,
        isMine: data.isMine,
        message: data.message,
        createdAt: data.createdAt,
      };
      console.log("변환된 메시지:", incomingMessage); // 디버깅용 로그
      // 중복 방지 로직
      setMessages((prev) => {
        if (prev.some((m) => m.chatMessageId === incomingMessage.chatMessageId)) {
          return prev;
        }
        return [...prev, incomingMessage];
      });
    });

    return () => {
      clientRef.current?.deactivate();
    };
  }, [chatRoomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages.length]);

  const addMessage = (text: string) => {
    const tempId = Date.now();
    const newMessage: ChatSocketMessage = {
      chatMessageId: tempId,
      isMine: true,
      message: text,
      createdAt: new Date().toISOString(),
    };

    // 1. 내 화면에 바로 optimistic 메시지 추가
    setMessages((prev) => [...prev, newMessage]);

    // 2. 서버로 메시지 전송
    sendMessage(
      clientRef.current as Client,
      chatRoomId,
      JSON.stringify({
        message: text,
        clientTempId: tempId,
      })
    );
  };

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen mb-20">
      <div className="fixed top-0 left-0 w-full z-20 bg-white">
        <div className="w-[375px] mx-auto">
          <ChatRoomHeader senderName={senderName} onReport={() => setIsReportOpen(true)} />
          <div className="bg-white px-24 pt-24 pb-12">
            <ChatPostCard title={title} pricePer10min={pricePer10min} />
          </div>
        </div>
      </div>
      <div
        className="flex-1 overflow-y-auto px-24 space-y-6 pt-180"
        onScroll={(e) => {
          if (e.currentTarget.scrollTop < 100 && hasMore && !loadingMore) {
            fetchMoreMessages();
          }
        }}
      >
        {loadingMore && (
          <div className="text-center py-2 text-gray-400">이전 메시지 불러오는 중...</div>
        )}
        {groupMessagesByDate(sortedMessages).map(({ date, messages }) => (
          <div key={date} className="space-y-6">
            <div className="text-center text-gray-500 body-xs py-6">{formatDateDivider(date)}</div>
            <div className="flex flex-col gap-24">
              {messages.map((msg) => (
                <ChatBubble key={msg.chatMessageId} message={msg} />
              ))}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        <div className="pb-44" />
      </div>
      {!isReportOpen && <ChatInputBar onSend={addMessage} />}
      <ReportModal isOpen={isReportOpen} setIsOpen={setIsReportOpen} targetName={senderName} />
    </div>
  );
}
