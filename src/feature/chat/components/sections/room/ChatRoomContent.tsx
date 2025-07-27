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
import { getMapDetailById } from "@feature/map/api/getMapDetailById";
import { useProfileStore } from "@stores/useProfileStore";

interface ChatRoomContentProps {
  chatRoomId: number;
  productId: string | null;
}

interface ProductInfo {
  productId: number;
  itemId: number;
  title: string;
  pricePer10min: number;
  memberName: string;
  memberId: number;
}

export default function ChatRoomContent({ chatRoomId, productId }: ChatRoomContentProps) {
  const [messages, setMessages] = useState<ChatSocketMessage[]>([]);
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const clientRef = useRef<Client | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const myUserId = useProfileStore((state) => state.id);

  // 상품 정보 가져오기
  useEffect(() => {
    if (!productId) return;

    const fetchProductInfo = async () => {
      try {
        const productData = await getMapDetailById(productId);
        setProduct({
          productId: productData.productId,
          itemId: productData.itemId,
          title: productData.title,
          pricePer10min: productData.price,
          memberName: productData.memberName,
          memberId: productData.memberId,
        });
      } catch (error) {
        console.error("상품 정보 가져오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductInfo();
  }, [productId]);

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

  const groupedMessages = groupMessagesByDate(sortedMessages);

  if (loading || !product) {
    return (
      <div className="flex items-center justify-center h-screen">상품 정보를 불러오는 중...</div>
    );
  }

  // 상대방 이름 결정: 내가 판매자인지 구매자인지에 따라 다름
  const opponentName = product.memberId === myUserId ? "구매자" : product.memberName;

  return (
    <>
      <ChatRoomHeader senderName={opponentName} onReport={() => setIsReportOpen(true)} />
      <div className="flex flex-col h-screen bg-gray-50">
        <ChatPostCard title={product.title} pricePer10min={product.pricePer10min} />
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {groupedMessages.map((group) => (
            <div key={group.date}>
              <div className="text-center text-xs text-gray-500 my-2">
                {formatDateDivider(group.date)}
              </div>
              {group.messages.map((message) => (
                <ChatBubble key={message.chatMessageId} message={message} />
              ))}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <ChatInputBar onSend={addMessage} />
      </div>
      <ReportModal isOpen={isReportOpen} setIsOpen={setIsReportOpen} targetName={opponentName} />
    </>
  );
}
