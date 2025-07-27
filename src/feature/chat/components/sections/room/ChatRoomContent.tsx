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
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [oldestMessageId, setOldestMessageId] = useState<number | undefined>(undefined);
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
      }
    };

    fetchProductInfo();
  }, [productId]);

  useEffect(() => {
    if (!chatRoomId) return;

    getChatHistory(chatRoomId)
      .then((response) => {
        setMessages(response.data);
        // 가장 오래된 메시지 ID 저장 (다음 페이지 조회용)
        if (response.data.length > 0) {
          const oldestMessage = response.data[response.data.length - 1];
          setOldestMessageId(Number(oldestMessage.chatMessageId));
        }
        setHasMore(response.pageInfo.hasNext);
      })
      .catch((err) => {
        console.error("채팅 기록 불러오기 실패:", err);
      });

    // 웹소켓 연결
    clientRef.current = createStompClient(chatRoomId, (msg: ChatSocketMessage) => {
      const data = typeof msg === "string" ? JSON.parse(msg) : msg;
      console.log("서버에서 받은 메시지:", data);
      const incomingMessage: ChatSocketMessage = {
        chatMessageId: data.chatMessageId,
        isMine: data.isMine,
        message: data.message,
        createdAt: data.createdAt,
      };
      console.log("변환된 메시지:", incomingMessage);
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

  // 이전 메시지 불러오기
  const loadMoreMessages = async () => {
    if (loadingMore || !hasMore || !oldestMessageId) return;

    setLoadingMore(true);
    try {
      const response = await getChatHistory(chatRoomId, oldestMessageId, 20);

      if (response.data.length > 0) {
        setMessages((prev) => [...prev, ...response.data]);

        const newOldestMessage = response.data[response.data.length - 1];
        setOldestMessageId(Number(newOldestMessage.chatMessageId));

        setHasMore(response.pageInfo.hasNext);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("이전 메시지 불러오기 실패:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;

    if (scrollTop < 100 && hasMore && !loadingMore) {
      loadMoreMessages();
    }
  };

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

  // 백엔드에서 senderName이 상대방 이름으로 수정될 예정
  // 현재는 임시로 product 정보를 사용
  const senderName = product?.memberId === myUserId ? "구매자" : product?.memberName || "상대방";

  return (
    <div className="flex flex-col h-screen">
      <ChatRoomHeader senderName={senderName} onReport={() => setIsReportOpen(true)} />

      {product && (
        <div className="px-24 mt-24">
          <ChatPostCard title={product.title} pricePer10min={product.pricePer10min} />
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-24 mt-8 mb-84 py-2" onScroll={handleScroll}>
        {loadingMore && (
          <div className="text-center text-sm text-gray-500 py-4">이전 내역을 불러오는 중...</div>
        )}

        {groupedMessages.map((group) => (
          <div key={group.date}>
            <div className="text-center text-xs text-gray-500 my-24">
              {formatDateDivider(group.date)}
            </div>
            <div className="space-y-24">
              {group.messages.map((message) => (
                <ChatBubble key={message.chatMessageId} message={message} />
              ))}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ChatInputBar onSend={addMessage} />

      <ReportModal isOpen={isReportOpen} setIsOpen={setIsReportOpen} targetName={senderName} />
    </div>
  );
}
