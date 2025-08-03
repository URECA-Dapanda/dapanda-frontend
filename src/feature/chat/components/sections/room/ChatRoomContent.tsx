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
import { getChatRoomList, markMessageAsRead } from "@/feature/chat/api/chatRoomRequest";
import { getMapDetailById } from "@/feature/map/api/getMapDetailById";
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
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [oldestMessageId, setOldestMessageId] = useState<number | undefined>(undefined);
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [currentMemberId, setCurrentMemberId] = useState<number | undefined>(undefined);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  // 중복 요청 방지를 위한 ref들
  const lastReadMessageId = useRef<number | null>(null);
  const isExiting = useRef(false);
  const abortRef = useRef<AbortController | null>(null);
  const productCache = useRef<Map<string, ProductInfo>>(new Map());
  const isFetchingProduct = useRef(false);

  const { subscribe, unsubscribe, sendMessage, setActiveChatRoomId } = useWebSocketStore();
  const { setTitle } = useConfigStore();

  const createProductInfo = useCallback(
    (productData: {
      productId: number;
      itemId: number;
      title: string;
      price: number;
      memberName: string;
      memberId: number;
    }): ProductInfo => ({
      productId: productData.productId,
      itemId: productData.itemId,
      title: productData.title,
      pricePer10min: productData.price,
      memberName: productData.memberName,
      memberId: productData.memberId,
    }),
    []
  );

  const fetchProductWithCache = useCallback(
    async (productIdStr: string, abortController?: AbortController) => {
      if (productCache.current.has(productIdStr)) {
        const cachedProduct = productCache.current.get(productIdStr)!;
        setProduct(cachedProduct);
        setIsLoadingProduct(false);
        return;
      }

      if (isFetchingProduct.current) {
        return;
      }

      isFetchingProduct.current = true;
      setIsLoadingProduct(true);

      try {
        const productData = await getMapDetailById(productIdStr);

        if (abortController?.signal.aborted) return;

        const productInfo = createProductInfo(productData);

        productCache.current.set(productIdStr, productInfo);
        setProduct(productInfo);
      } catch (error) {
        if (!abortController?.signal.aborted) {
          console.error("상품 정보 가져오기 실패:", error);
        }
      } finally {
        setIsLoadingProduct(false);
        isFetchingProduct.current = false;
      }
    },
    [createProductInfo]
  );

  // 키보드 감지
  useEffect(() => {
    let initialHeight = window.innerHeight;

    const handleResize = () => {
      const currentHeight = window.innerHeight;
      const threshold = window.innerWidth <= 768 ? 0.7 : 0.8;
      const isKeyboard = currentHeight < initialHeight * threshold;
      setIsKeyboardVisible(isKeyboard);
    };

    // 초기 높이 설정
    initialHeight = window.innerHeight;

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 헤더 높이 측정
  useEffect(() => {
    const measureHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        setHeaderHeight(height);
      }
    };

    measureHeaderHeight();

    window.addEventListener("resize", measureHeaderHeight);

    return () => {
      window.removeEventListener("resize", measureHeaderHeight);
    };
  }, [product]);

  const addSenderIdToMessages = useCallback(
    (messages: ChatSocketMessage[], memberId: number) => {
      return messages.map((message) => {
        let senderId: number | undefined;

        if (message.isMine) {
          senderId = memberId;
        } else {
          const urlSenderId = searchParams.get("senderId");
          senderId = urlSenderId ? parseInt(urlSenderId, 10) : product?.memberId;
        }

        return {
          ...message,
          senderId: message.senderId || senderId,
        };
      });
    },
    [product?.memberId, searchParams]
  );

  const sortMessages = useCallback((messages: ChatSocketMessage[]): ChatSocketMessage[] => {
    return messages.sort((a, b) => {
      const aIsTemp = isTemporaryMessage(a);
      const bIsTemp = isTemporaryMessage(b);
      if (aIsTemp && bIsTemp) {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (!aIsTemp && !bIsTemp) {
        return Number(a.chatMessageId) - Number(b.chatMessageId);
      }
      if (aIsTemp && !bIsTemp) {
        return -1;
      }
      return 1;
    });
  }, []);

  useEffect(() => {
    if (!chatRoomId) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setMessages([]);
    setLoadingMore(false);
    setHasMore(true);
    setOldestMessageId(undefined);
    setCurrentMemberId(undefined);
    lastReadMessageId.current = null;
    isExiting.current = false;

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
          if (lastReadMessageId.current !== latestMessageId) {
            markMessageAsRead(latestMessageId)
              .then(() => {
                lastReadMessageId.current = latestMessageId;
              })
              .catch(() => {});
          }
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

  const resetUnreadCountOnExit = useCallback(async () => {
    if (isExiting.current) {
      return;
    }
    isExiting.current = true;

    // 현재 메시지 목록에서 최신 메시지 ID 가져오기
    const realMessages = messages.filter(
      (message: ChatSocketMessage) => !isTemporaryMessage(message)
    );
    let latestMessageId: number | null = null;

    if (realMessages.length > 0) {
      // 최신 메시지 (마지막 메시지)
      const latestMessage = realMessages[realMessages.length - 1];
      latestMessageId = Number(latestMessage.chatMessageId);
    }

    // 채팅방을 나갈 때만 최신 메시지 ID로 읽음 처리
    if (latestMessageId && lastReadMessageId.current !== latestMessageId) {
      try {
        await markMessageAsRead(latestMessageId);
        lastReadMessageId.current = latestMessageId;
      } catch (error) {
        console.error("읽음 처리 실패:", latestMessageId, error);
      }
    }
  }, [messages]);

  useEffect(() => {
    let hasExecuted = false;

    const handleBeforeUnload = async () => {
      if (!hasExecuted) {
        hasExecuted = true;
        await resetUnreadCountOnExit();
      }
    };

    const handlePopState = async () => {
      if (!hasExecuted) {
        hasExecuted = true;
        await resetUnreadCountOnExit();
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      if (!hasExecuted) {
        hasExecuted = true;
        resetUnreadCountOnExit();
      }

      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [resetUnreadCountOnExit]);

  const addMessage = async (text: string) => {
    try {
      const messagePayload = JSON.stringify({
        message: text,
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

        // 새 메시지가 추가됨
        const { updateUnreadCount } = useWebSocketStore.getState();
        updateUnreadCount();

        // 실시간 읽음 처리 (내가 받은 메시지인 경우)
        if (!incomingMessage.isMine) {
          const messageId = Number(incomingMessage.chatMessageId);
          if (lastReadMessageId.current !== messageId) {
            markMessageAsRead(messageId)
              .then(() => {
                lastReadMessageId.current = messageId;
              })
              .catch((error) => {
                console.error("실시간 읽음 처리 실패:", messageId, error);
              });
          }
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

  // 이전 메시지 불러오기
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

  // URL 파라미터에서 상대방 정보 가져오기
  const urlMemberName = searchParams.get("memberName");
  const urlAvatarUrl = searchParams.get("avatarUrl");

  const senderName = urlMemberName || product?.memberName || "상대방";

  // 헤더 제목 설정
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
