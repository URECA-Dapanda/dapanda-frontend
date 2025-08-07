"use client";

import { useEffect, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useChatStore } from "@feature/chat/stores/useChatStore";
import ChatItem from "@feature/chat/components/sections/list/ChatItem";
import { getChatRoomList } from "@feature/chat/api/chatRoomRequest";
import { getMapDetailById } from "@feature/map/api/getMapDetailById";
import type { ChatRoomPreview } from "@feature/chat/stores/useChatStore";
import { ApiChatRoom, ChatSocketMessage } from "@feature/chat/types/chatType";
import { ButtonComponent } from "@/components/common/button/ButtonComponent";
import EmptyState from "@/components/common/empty/EmptyState";
import { useWebSocketStore } from "@/stores/useWebSocketStore";
import { formatRelativeTime } from "@/lib/time";
import { useAuth } from "@hooks/useAuth";
import Image from "next/image";

export default function ChatList() {
  const { isLogin } = useAuth();
  const chatList = useChatStore((state) => state.chatList);
  const setChatList = useChatStore((state) => state.setChatList);
  const setChatListUpdateCallback = useWebSocketStore((state) => state.setChatListUpdateCallback);
  const subscribe = useWebSocketStore((store) => store.subscribe);
  const unsubscribe = useWebSocketStore((store) => store.unsubscribe);
  const [selectedFilter, setSelectedFilter] = useState<"ALL" | "BUYER" | "SELLER">("ALL");

  // 채팅방 목록 가져오기
  const {
    data: apiList,
    refetch: refetchChatRooms,
    isPending,
  } = useQuery({
    queryKey: ["chatRooms", selectedFilter],
    queryFn: () => getChatRoomList(10, selectedFilter),
    staleTime: 30 * 1000, // 30초간 캐시 유지
    gcTime: 5 * 60 * 1000, // 5분간 메모리에 유지
    enabled: !!isLogin,
  });

  // 메시지가 있는 채팅방만 필터링
  const filteredApiList = useMemo(() => {
    if (!apiList) return [];
    return apiList.filter(
      (item: ApiChatRoom) => item.lastMessage && item.lastMessage.trim() !== ""
    );
  }, [apiList]);

  // 고유한 상품 ID 목록
  const uniqueProductIds = useMemo(() => {
    return [...new Set(filteredApiList.map((item: ApiChatRoom) => item.productId))] as number[];
  }, [filteredApiList]);

  // 모든 상품 정보를 한 번에 가져오기
  const { data: allProductData } = useQuery({
    queryKey: ["products", uniqueProductIds],
    queryFn: async () => {
      const productPromises = uniqueProductIds.map(async (productId) => {
        try {
          const data = await getMapDetailById(productId.toString());
          return { productId, data };
        } catch (error) {
          console.error(`상품 ${productId} 정보 가져오기 실패:`, error);
          return { productId, data: null };
        }
      });

      const results = await Promise.all(productPromises);
      const productMap = new Map();

      results.forEach(({ productId, data }) => {
        if (data) {
          productMap.set(productId, {
            title: data.title,
            price: data.price,
            memberId: data.memberId,
            memberName: data.memberName,
            imageUrls: data.imageUrls,
          });
        }
      });

      return productMap;
    },
    enabled: uniqueProductIds.length > 0,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    gcTime: 10 * 60 * 1000, // 10분간 메모리에 유지
  });

  // 채팅 목록 생성
  const processedChatList = useMemo(() => {
    if (!allProductData) return [];

    return filteredApiList.map((item: ApiChatRoom) => {
      const productDetail = allProductData.get(item.productId);
      return {
        chatRoomId: item.chatRoomId,
        itemId: item.itemId,
        name: item.senderName,
        title: productDetail?.title || "",
        price: productDetail?.price || 0,
        updatedAt: item.lastMessageAt,
        productId: item.productId,
        senderName: item.senderName,
        avatarUrl: item.senderProfileImageUrl,
        senderId: item.senderId,
        lastMessage: item.lastMessage || "",
        unreadCount: item.unreadCount || 0,
      };
    });
  }, [filteredApiList, allProductData]);

  // 채팅 목록 업데이트
  useEffect(() => {
    if (processedChatList.length > 0) setChatList(processedChatList);
  }, [processedChatList, setChatList]);

  // 웹소켓 구독 관리 최적화
  const chatRoomIds = useMemo(() => chatList.map((chat) => chat.chatRoomId), [chatList]);

  useEffect(() => {
    // 기존 구독 해제
    chatRoomIds.forEach((chatRoomId) => {
      unsubscribe(chatRoomId);
    });

    // 새로운 채팅방들 구독
    chatRoomIds.forEach((chatRoomId) => {
      subscribe(chatRoomId, (message) => {
        setChatList((prevChatList: ChatRoomPreview[]) => {
          return prevChatList.map((prevChat: ChatRoomPreview) => {
            if (prevChat.chatRoomId === chatRoomId) {
              const extendedMessage = message as ChatSocketMessage & { unreadCount?: number };

              return {
                ...prevChat,
                lastMessage: message.message,
                updatedAt: message.createdAt,
                unreadCount: extendedMessage.unreadCount ?? prevChat.unreadCount,
              };
            }
            return prevChat;
          });
        });

        if (!(message as ChatSocketMessage & { unreadCount?: number }).unreadCount) {
          refetchChatRooms();
        }
      });
    });

    // 컴포넌트 언마운트 시 모든 구독 해제
    return () => {
      chatRoomIds.forEach((chatRoomId) => {
        unsubscribe(chatRoomId);
      });
    };
  }, [chatRoomIds, subscribe, unsubscribe, refetchChatRooms, setChatList]);

  // 웹소켓 스토어에 채팅방 목록 업데이트 콜백 등록
  useEffect(() => {
    const currentCallback = useWebSocketStore.getState().chatListUpdateCallback;

    // 기존 콜백이 있으면 유지하면서 refetchChatRooms도 호출
    const combinedCallback = (chatRoomId?: number) => {
      currentCallback?.(chatRoomId);
      if (!chatRoomId) {
        // 전체 업데이트인 경우에만 refetchChatRooms 호출
        refetchChatRooms();
      }
    };

    setChatListUpdateCallback(combinedCallback);
    return () => setChatListUpdateCallback(currentCallback);
  }, [selectedFilter, setChatListUpdateCallback, refetchChatRooms]);

  // 컴포넌트 마운트 시와 필터 변경 시 API 호출
  useEffect(() => {
    refetchChatRooms();
  }, [selectedFilter, refetchChatRooms]);
  console.log("ee", chatList);

  return (
    <div className="flex flex-col px-24 pt-20">
      <div className="flex gap-8">
        <ButtonComponent
          variant={selectedFilter === "ALL" ? "floatingPrimary" : "floatingOutline"}
          size="sm"
          className="w-[50px]"
          onClick={() => setSelectedFilter("ALL")}
        >
          전체
        </ButtonComponent>
        <ButtonComponent
          variant={selectedFilter === "SELLER" ? "floatingPrimary" : "floatingOutline"}
          size="sm"
          className="w-[50px]"
          onClick={() => setSelectedFilter("SELLER")}
        >
          판매
        </ButtonComponent>
        <ButtonComponent
          variant={selectedFilter === "BUYER" ? "floatingPrimary" : "floatingOutline"}
          size="sm"
          className="w-[50px]"
          onClick={() => setSelectedFilter("BUYER")}
        >
          구매
        </ButtonComponent>
      </div>

      <div className="overflow-y-auto overflow-x-hidden scrollbar-track-transparent h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-107px-60px)]">
        <div className="py-24 mb-56">
          {isPending ? (
            <div className="flex justify-center items-center overflow-hidden my-auto mt-[60px] pt-safe-top">
              <Image
                src={"/loading-panda.gif"}
                priority
                width={426}
                height={240}
                alt="loading panda"
              />
            </div>
          ) : chatList.length === 0 ? (
            <EmptyState
              message="참여중인 채팅방이 없어요"
              subMessage="새로운 거래를 시작해보세요"
            />
          ) : (
            chatList.map((chat, index) => (
              <div key={chat.chatRoomId}>
                <ChatItem
                  chatRoomId={String(chat.chatRoomId)}
                  name={chat.name}
                  updatedAt={formatRelativeTime(chat.updatedAt)}
                  productId={chat.productId}
                  place={chat.title}
                  pricePer10min={chat.price}
                  avatarUrl={chat.avatarUrl}
                  senderId={chat.senderId}
                  lastMessage={chat.lastMessage}
                  unreadCount={chat.unreadCount}
                />
                {index < chatList.length - 1 && (
                  <div className="border-b border-gray-200 mx-24"></div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
