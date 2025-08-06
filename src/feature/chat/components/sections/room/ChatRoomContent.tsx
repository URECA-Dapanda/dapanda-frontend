"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { formatDateDivider } from "@/lib/time";
import { useWebSocketStore } from "@/stores/useWebSocketStore";
import { useConfigStore } from "@/stores/useConfigStore";
import ChatBubble from "@feature/chat/components/sections/room/ChatBubble";
import type { ChatSocketMessage } from "@/feature/chat/types/chatType";
import ChatPostCard from "@feature/chat/components/sections/room/ChatPostCard";
import { groupMessagesByDate } from "@feature/chat/utils/groupMessagesByDate";
import ChatInputBar from "@feature/chat/components/sections/room/ChatInputBar";
import { getChatHistory } from "@/feature/chat/api/getChatHistory";
import { getChatRoomList } from "@/feature/chat/api/chatRoomRequest";
import { formatMessageDate } from "@/feature/chat/utils/chatUtils";
import { useKeyboardDetection } from "@/feature/chat/utils/keyboardDetection";
import { useHeaderHeightDetection } from "@/feature/chat/utils/headerHeightDetection";
import { useMessageProcessing } from "@/feature/chat/utils/messageProcessing";
import { useProductCache } from "@/feature/chat/utils/productCache";
import { useReadStatusHandler } from "@/feature/chat/utils/readStatusHandler";

interface ChatRoomContentProps {
  chatRoomId: number;
  productId: string | null;
}

export default function ChatRoomContent({ chatRoomId, productId }: ChatRoomContentProps) {
  const [messages, setMessages] = useState<ChatSocketMessage[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [oldestMessageId, setOldestMessageId] = useState<number | undefined>(undefined);
  const [currentMemberId, setCurrentMemberId] = useState<number | undefined>(undefined);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const abortRef = useRef<AbortController | null>(null);

  const isKeyboardVisible = useKeyboardDetection();
  const { product, setProduct, isLoadingProduct, fetchProductWithCache, clearCache } =
    useProductCache();
  const headerHeight = useHeaderHeightDetection(
    headerRef as React.RefObject<HTMLDivElement>,
    product
  );
  const { addSenderIdToMessages, sortMessages } = useMessageProcessing(product);
  const { handleRealTimeReadStatus, resetExitFlag } = useReadStatusHandler(messages);

  const { subscribe, unsubscribe, sendMessage, setActiveChatRoomId } = useWebSocketStore();
  const { setTitle } = useConfigStore();

  useEffect(() => {
    if (!chatRoomId) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setMessages([]);
    setLoadingMore(false);
    setHasMore(true);
    setOldestMessageId(undefined);
    setCurrentMemberId(undefined);
    clearCache();
    resetExitFlag();

    getChatHistory(chatRoomId)
      .then((response) => {
        if (abortRef.current?.signal.aborted) return;

        const messagesWithSenderId = addSenderIdToMessages(response.data, response.memberId);
        setMessages(messagesWithSenderId);
        setCurrentMemberId(response.memberId || undefined);

        if (response.data.length > 0) {
          const oldestMessage = response.data[response.data.length - 1];
          setOldestMessageId(Number(oldestMessage.chatMessageId));
        }
        setHasMore(response.pageInfo.hasNext);

        // 채팅방 진입 시 마지막 메시지에 대해 read-status 요청
        if (response.data.length > 0) {
          const latestMessage = response.data[0];
          const latestMessageId = Number(latestMessage.chatMessageId);
          handleRealTimeReadStatus(latestMessageId);
        }
      })
      .catch((err) => {
        console.error("채팅 기록 불러오기 실패:", err);
      });

    return () => {
      abortRef.current?.abort();
    };
  }, [chatRoomId]);

  useEffect(() => {
    if (!productId) {
      const fetchChatRoomInfo = async () => {
        try {
          const chatRoomInfo = await getChatRoomList(chatRoomId);
          if (chatRoomInfo.productId) {
            const productIdStr = chatRoomInfo.productId.toString();
            await fetchProductWithCache(productIdStr);
          }
        } catch (error) {
          console.error("채팅방 정보에서 상품 정보 가져오기 실패:", error);
          setProduct(null);
        }
      };

      fetchChatRoomInfo();
      return;
    }

    const abortController = new AbortController();
    fetchProductWithCache(productId, abortController);

    return () => {
      abortController.abort();
    };
  }, [productId, fetchProductWithCache]);

  useEffect(() => {
    if (chatRoomId) {
      setActiveChatRoomId(chatRoomId);
    }

    return () => {
      setActiveChatRoomId(null);
    };
  }, [chatRoomId, setActiveChatRoomId]);

  const addMessage = async (text: string) => {
    try {
      const trimmedText = text.trim();
      if (!trimmedText) {
        return;
      }

      const messagePayload = JSON.stringify({
        message: trimmedText,
      });

      sendMessage(chatRoomId, messagePayload);
    } catch (error) {
      console.error("메시지 전송 실패:", error);
    }
  };

  // WebSocket 메시지 수신 핸들러
  const handleMessage = useCallback(
    (msg: ChatSocketMessage) => {
      const data = typeof msg === "string" ? JSON.parse(msg) : msg;

      const incomingMessage: ChatSocketMessage = {
        chatMessageId: data.chatMessageId,
        isMine: data.senderId === currentMemberId,
        message: data.message,
        createdAt: data.createdAt,
        senderId: data.senderId,
      };

      // 중복 방지 로직
      setMessages((prev) => {
        if (prev.some((m) => m.chatMessageId === incomingMessage.chatMessageId)) {
          return prev;
        }

        const newMessages = [...prev, incomingMessage];

        const { updateUnreadCount } = useWebSocketStore.getState();
        updateUnreadCount();

        if (!incomingMessage.isMine) {
          const messageId = Number(incomingMessage.chatMessageId);
          handleRealTimeReadStatus(messageId);
        }

        return newMessages;
      });
    },
    [currentMemberId]
  );

  useEffect(() => {
    if (!chatRoomId) return;

    const { isConnected } = useWebSocketStore.getState();

    if (!isConnected) {
      return;
    }

    subscribe(chatRoomId, handleMessage);

    return () => {
      unsubscribe(chatRoomId);
    };
  }, [chatRoomId, subscribe, unsubscribe, handleMessage]);

  const loadMoreMessages = useCallback(async () => {
    if (loadingMore || !hasMore || !oldestMessageId) return;

    setLoadingMore(true);
    try {
      const response = await getChatHistory(chatRoomId, oldestMessageId, 20);

      if (response.data.length > 0) {
        const messagesWithSenderId = addSenderIdToMessages(response.data, response.memberId);
        setMessages((prev) => [...prev, ...messagesWithSenderId]);

        const newOldestMessage = response.data[response.data.length - 1];
        setOldestMessageId(Number(newOldestMessage.chatMessageId));

        setHasMore(response.pageInfo.hasNext);

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
  }, [loadingMore, hasMore, oldestMessageId, chatRoomId, currentMemberId, addSenderIdToMessages]);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop } = e.currentTarget;

      if (scrollTop < 100 && hasMore && !loadingMore) {
        loadMoreMessages();
      }
    },
    [hasMore, loadingMore, loadMoreMessages, oldestMessageId]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages.length]);

  const sortedMessages = useMemo(() => sortMessages([...messages]), [messages, sortMessages]);
  const groupedMessages = useMemo(() => groupMessagesByDate(sortedMessages), [sortedMessages]);

  const urlMemberName = searchParams.get("memberName");
  const urlAvatarUrl = searchParams.get("avatarUrl");

  const senderName = urlMemberName || product?.memberName || "상대방";

  useEffect(() => {
    setTitle(senderName);
    return () => setTitle("DaPanDa");
  }, [senderName, setTitle]);

  return (
    <div className={`flex flex-col h-screen ${isKeyboardVisible ? "chat-keyboard-active" : ""}`}>
      {product && (
        <div
          ref={headerRef}
          className="fixed left-0 right-0 z-40 px-24 pt-12 pb-8 chat-header
         bg-white w-[100dvw] lg:w-[600px] mx-auto"
          style={{
            top: "calc(env(safe-area-inset-top) + 54px)",
            transform: "translateY(0)",
            transition: "transform 0.3s ease",
          }}
        >
          <ChatPostCard
            title={product.title}
            pricePer10min={product.pricePer10min}
            productId={product.productId}
          />
        </div>
      )}
      {!product && productId && isLoadingProduct && (
        <div
          className="fixed left-0 right-0 z-40 px-24 pt-12 pb-8 chat-header bg-white w-[100dvw] lg:w-[600px] mx-auto"
          style={{ top: "calc(env(safe-area-inset-top) + 54px)" }}
        >
          <div className="flex border border-primary-200 rounded-20 h-64 px-16 py-8 bg-white">
            <div className="animate-pulse bg-gray-200 w-40 h-40 rounded-full mr-12"></div>
            <div className="flex flex-col justify-center flex-1">
              <div className="animate-pulse bg-gray-200 h-4 rounded mb-2"></div>
              <div className="animate-pulse bg-gray-200 h-3 rounded w-20"></div>
            </div>
          </div>
        </div>
      )}

      <div
        className="flex-1 overflow-y-auto px-4 chat-messages"
        onScroll={handleScroll}
        style={{
          paddingTop: isKeyboardVisible ? `${headerHeight + 20}px` : "144px",
          paddingBottom: isKeyboardVisible ? "120px" : "12px",
          height: isKeyboardVisible
            ? `calc(100vh - ${headerHeight + 140}px)`
            : "calc(100vh - 84px - 120px)",
        }}
      >
        {loadingMore && (
          <div className="text-center text-sm text-gray-500 py-4">이전 내역을 불러오는 중...</div>
        )}

        <div className="flex flex-col justify-end min-h-full pt-36">
          {groupedMessages.map((group) => (
            <div key={group.date}>
              <div className="text-center text-xs text-gray-500 my-24">
                {group.messages.length > 0 && group.messages[0].createdAt
                  ? formatMessageDate(group.messages[0].createdAt)
                  : formatDateDivider()}
              </div>
              <div className="space-y-24 pt-8 pb-12">
                {group.messages.map((message) => (
                  <ChatBubble
                    key={message.chatMessageId}
                    message={message}
                    avatarUrl={urlAvatarUrl || undefined}
                    memberId={message.senderId}
                    currentMemberId={currentMemberId}
                    productId={product?.productId}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      <ChatInputBar onSend={addMessage} />
    </div>
  );
}
