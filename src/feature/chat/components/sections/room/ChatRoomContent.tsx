"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { formatDateDivider } from "@/lib/time";
import { useWebSocketStore } from "@/stores/useWebSocketStore";
import ReportModal from "@/components/common/modal/ReportModal";
import ChatBubble from "@feature/chat/components/sections/room/ChatBubble";
import type { ChatSocketMessage } from "@/feature/chat/types/chatType";
import ChatPostCard from "@feature/chat/components/sections/room/ChatPostCard";
import { groupMessagesByDate } from "@/feature/chat/utils/groupMessagesByDate";
import ChatInputBar from "@feature/chat/components/sections/room/ChatInputBar";
import { getChatHistory } from "@/feature/chat/api/getChatHistory";
import { markMessageAsRead } from "@/feature/chat/api/chatRoomRequest";
import ChatHeader from "@feature/chat/components/sections/room/ChatHeader";
import { getMapDetailById } from "@/feature/map/api/getMapDetailById";

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
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [oldestMessageId, setOldestMessageId] = useState<number | undefined>(undefined);
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const [currentMemberId, setCurrentMemberId] = useState<number | undefined>(undefined);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const { subscribe, unsubscribe, sendMessage, setActiveChatRoomId } = useWebSocketStore();

  useEffect(() => {
    if (!chatRoomId) return;

    getChatHistory(chatRoomId)
      .then((response) => {
        setMessages(response.data);
        setCurrentMemberId(response.memberId || undefined);
        if (response.data.length > 0) {
          const oldestMessage = response.data[response.data.length - 1];
          setOldestMessageId(Number(oldestMessage.chatMessageId));
        }
        setHasMore(response.pageInfo.hasNext);
      })
      .catch((err) => {
        console.error("채팅 기록 불러오기 실패:", err);
      });
  }, [chatRoomId]);

  // 제품 정보 가져오기
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
    if (chatRoomId) {
      setActiveChatRoomId(chatRoomId);
    }

    return () => {
      setActiveChatRoomId(null);
    };
  }, [chatRoomId, setActiveChatRoomId]);

  // 마지막으로 읽은 메시지 ID를 추적하는 상태
  const [lastReadMessageId, setLastReadMessageId] = useState<number | null>(null);

  // 마지막으로 읽은 메시지 ID를 업데이트하는 함수
  const updateLastReadMessage = async () => {
    if (messages.length === 0) return;

    const TEMP_ID_THRESHOLD = 1000000000000; // 임시 ID 임계값

    // 모든 메시지 중 가장 최신 메시지 찾기
    const realMessages = messages.filter((message) => {
      return typeof message.chatMessageId === "number" && message.chatMessageId < TEMP_ID_THRESHOLD;
    });

    // 가장 최신 메시지의 ID로 읽음 처리
    if (realMessages.length > 0) {
      const latestMessage = realMessages[0];
      const latestMessageId = Number(latestMessage.chatMessageId);

      // 이미 읽은 메시지라면 스킵
      if (lastReadMessageId && latestMessageId <= lastReadMessageId) {
        return;
      }

      try {
        await markMessageAsRead(latestMessageId);
        setLastReadMessageId(latestMessageId);

        // 읽음 처리 후 unread count 업데이트
        const { updateUnreadCount } = useWebSocketStore.getState();
        updateUnreadCount();
      } catch (error) {
        console.error("마지막 읽은 메시지 업데이트 실패:", error);
      }
    }
  };

  // 읽음 처리 (새 메시지 수신 시 + 채팅방 나갈 때)
  useEffect(() => {
    if (messages.length > 0 && currentMemberId) {
      updateLastReadMessage();
    }

    // 채팅방을 나갈 때도 읽음 처리
    return () => {
      if (messages.length > 0) {
        updateLastReadMessage();
      }
    };
  }, [messages, currentMemberId, chatRoomId]);

  const addMessage = async (text: string) => {
    const tempId = Date.now();
    const newMessage: ChatSocketMessage = {
      chatMessageId: tempId,
      isMine: true,
      message: text,
      createdAt: new Date().toISOString(),
      memberId: currentMemberId || undefined,
    };

    // 즉시 화면에 표시
    setMessages((prev) => {
      const newMessages = [...prev, newMessage];
      return newMessages;
    });

    // WebSocket으로 메시지 전송
    try {
      const messagePayload = JSON.stringify({
        message: text,
        clientTempId: tempId,
      });

      sendMessage(chatRoomId, messagePayload);
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }
  };

  // WebSocket 메시지 수신 핸들러 수정
  useEffect(() => {
    if (!chatRoomId) return;

    const handleMessage = (msg: ChatSocketMessage) => {
      const data = typeof msg === "string" ? JSON.parse(msg) : msg;

      const incomingMessage: ChatSocketMessage = {
        chatMessageId: data.chatMessageId,
        isMine: data.isMine,
        message: data.message,
        createdAt: data.createdAt,
        memberId: data.memberId,
      };

      // 중복 방지 로직
      setMessages((prev) => {
        // 내가 보낸 메시지이고 실제 ID가 있으면 기존 임시 메시지를 실제 ID로 업데이트
        if (data.isMine && data.clientTempId && data.chatMessageId !== data.clientTempId) {
          const updatedMessages = prev.map((msg) => {
            if (msg.chatMessageId === data.clientTempId && msg.message === data.message) {
              return {
                ...msg,
                chatMessageId: data.chatMessageId,
                memberId: data.memberId,
              };
            }
            return msg;
          });

          return updatedMessages;
        }

        // 일반적인 중복 방지
        if (prev.some((m) => m.chatMessageId === incomingMessage.chatMessageId)) {
          return prev;
        }

        return [...prev, incomingMessage];
      });
    };

    subscribe(chatRoomId, handleMessage);

    return () => {
      unsubscribe(chatRoomId);
    };
  }, [chatRoomId, subscribe, unsubscribe]);

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

        // memberId가 아직 설정되지 않았다면 설정
        if (!currentMemberId && response.memberId) {
          setCurrentMemberId(response.memberId || undefined);
        }
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

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const groupedMessages = groupMessagesByDate(sortedMessages);

  const urlSenderName = searchParams.get("senderName");
  const urlSenderId = searchParams.get("senderId");
  const senderName = urlSenderName || product?.memberName || "상대방";
  const senderId = urlSenderId ? parseInt(urlSenderId) : product?.memberId;

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader
        senderName={senderName}
        onReport={() => setIsReportOpen(true)}
        senderId={senderId}
      />

      {product && (
        <div
          className="fixed top-52 left-0 right-0 z-40 px-24 pt-24 pb-12
         bg-white w-[100dvw] lg:w-[375px] mx-auto"
        >
          <ChatPostCard
            title={product.title}
            pricePer10min={product.pricePer10min}
            productId={product.productId}
          />
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-24 pb-24 pt-180" onScroll={handleScroll}>
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
                <ChatBubble
                  key={message.chatMessageId}
                  message={message}
                  senderId={senderId}
                  currentMemberId={currentMemberId}
                />
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
