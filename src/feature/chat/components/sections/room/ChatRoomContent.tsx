"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { formatDateDivider } from "@/lib/time";
import { useWebSocketStore } from "@/stores/useWebSocketStore";
import ReportModal from "@/components/common/modal/ReportModal";
import ChatBubble from "@feature/chat/components/sections/room/ChatBubble";
import type { ChatSocketMessage } from "@/feature/chat/types/chatType";
import ChatPostCard from "@feature/chat/components/sections/room/ChatPostCard";
import { groupMessagesByDate } from "@feature/chat/utils/groupMessagesByDate";
import ChatInputBar from "@feature/chat/components/sections/room/ChatInputBar";
import { getChatHistory } from "@/feature/chat/api/getChatHistory";
import { markMessageAsRead } from "@/feature/chat/api/chatRoomRequest";
import ChatHeader from "@feature/chat/components/sections/room/ChatHeader";
import { getMapDetailById } from "@/feature/map/api/getMapDetailById";
import { useChatStore } from "@feature/chat/stores/useChatStore";
import type { ChatRoomPreview } from "@feature/chat/stores/useChatStore";
import { isTemporaryMessage, formatMessageDate } from "@/feature/chat/utils/chatUtils";

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

  // 메시지 정렬 함수 (컴포넌트 내부로 이동)
  const sortMessages = useCallback((messages: ChatSocketMessage[]): ChatSocketMessage[] => {
    return messages.sort((a, b) => {
      const aIsTemp = isTemporaryMessage(a);
      const bIsTemp = isTemporaryMessage(b);

      // 둘 다 임시 메시지인 경우 createdAt으로 정렬
      if (aIsTemp && bIsTemp) {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }

      // 둘 다 실제 메시지인 경우 chatMessageId로 정렬
      if (!aIsTemp && !bIsTemp) {
        return Number(a.chatMessageId) - Number(b.chatMessageId);
      }

      // 임시 메시지는 실제 메시지보다 앞에 배치 (생성 시간순)
      if (aIsTemp && !bIsTemp) {
        return -1;
      }

      return 1;
    });
  }, []);

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

  // 채팅방을 나갈 때 unreadCount를 0으로 만드는 함수
  const resetUnreadCountOnExit = useCallback(() => {
    const { updateUnreadCount } = useWebSocketStore.getState();
    updateUnreadCount();

    // 해당 채팅방의 unreadCount를 로컬에서 즉시 0으로
    const { setChatList } = useChatStore.getState();
    setChatList((prevChatList: ChatRoomPreview[]) => {
      return prevChatList.map((chat: ChatRoomPreview) => {
        if (chat.chatRoomId === Number(chatRoomId)) {
          return {
            ...chat,
            unreadCount: 0,
          };
        }
        return chat;
      });
    });

    // 확실하게 read-status 요청 (실제로 마지막으로 읽은 메시지)
    if (messages.length > 0) {
      // 실제 메시지만 필터링 (임시 메시지 제외)
      const realMessages = messages.filter((message) => !isTemporaryMessage(message));

      if (realMessages.length > 0) {
        // 실제 메시지 중 가장 최신 메시지 찾기
        const latestMessage = realMessages[realMessages.length - 1];
        const latestMessageId = Number(latestMessage.chatMessageId);

        console.log("채팅방 나갈 때 마지막 메시지 ID:", latestMessageId);

        // 동기적으로 read-status 요청
        markMessageAsRead(latestMessageId)
          .then(() => {
            console.log("채팅방 나갈 때 read-status 성공:", latestMessageId);
          })
          .catch((error) => {
            console.error("채팅방 나갈 때 read-status 실패:", error);
          });
      }
    }
  }, [messages, chatRoomId]);

  // 읽음 처리 (채팅방 나갈 때만)
  useEffect(() => {
    // 채팅방을 나갈 때 unreadCount를 0으로 만들기
    return () => {
      resetUnreadCountOnExit();
    };
  }, [resetUnreadCountOnExit]);

  const addMessage = async (text: string) => {
    // WebSocket으로 메시지 전송 (임시 ID 없이)
    try {
      const messagePayload = JSON.stringify({
        message: text,
      });

      sendMessage(chatRoomId, messagePayload);
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }
  };

  // WebSocket 메시지 수신 핸들러 수정
  useEffect(() => {
    if (!chatRoomId) return;

    // WebSocket 연결 상태 확인
    const { isConnected, subscribe, unsubscribe } = useWebSocketStore.getState();

    if (!isConnected) {
      return;
    }

    const handleMessage = (msg: ChatSocketMessage) => {
      const data = typeof msg === "string" ? JSON.parse(msg) : msg;

      console.log("WebSocket message received:", {
        chatMessageId: data.chatMessageId,
        isMine: data.isMine,
        clientTempId: data.clientTempId,
        message: data.message,
        senderId: data.senderId,
      });

      const incomingMessage: ChatSocketMessage = {
        chatMessageId: data.chatMessageId,
        isMine: data.isMine,
        message: data.message,
        createdAt: data.createdAt,
        senderId: data.senderId,
      };

      // 중복 방지 로직
      setMessages((prev) => {
        // 일반적인 중복 방지 (동일한 chatMessageId)
        if (prev.some((m) => m.chatMessageId === incomingMessage.chatMessageId)) {
          return prev;
        }

        const newMessages = [...prev, incomingMessage];

        // 새 메시지가 추가된 후, 실제 메시지 중 가장 최신 메시지만 read-status 요청
        const realMessages = newMessages.filter((message) => !isTemporaryMessage(message));

        if (realMessages.length > 0) {
          // 실제 메시지 중 가장 최신 메시지만 read-status 요청
          const latestMessage = realMessages[realMessages.length - 1];
          const latestMessageId = Number(latestMessage.chatMessageId);

          markMessageAsRead(latestMessageId)
            .then(() => {
              const { updateUnreadCount } = useWebSocketStore.getState();
              updateUnreadCount();
            })
            .catch((error) => {
              console.error("메시지 읽음 처리 실패:", error);
            });
        }

        return newMessages;
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

  // 개선된 정렬 로직 적용
  const sortedMessages = sortMessages([...messages]);

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
              {group.messages.length > 0 && group.messages[0].createdAt
                ? formatMessageDate(group.messages[0].createdAt)
                : formatDateDivider()}
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
