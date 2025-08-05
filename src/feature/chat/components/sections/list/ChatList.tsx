"use client";

import { useEffect, useState, useCallback } from "react";
import { useChatStore } from "@feature/chat/stores/useChatStore";
import { useWebSocketStore } from "@/stores/useWebSocketStore";
import ChatItem from "@feature/chat/components/sections/list/ChatItem";
import { getChatRoomList } from "@feature/chat/api/chatRoomRequest";
import { getMapDetailById } from "@feature/map/api/getMapDetailById";
import { ApiChatRoom, ChatSocketMessage } from "@feature/chat/types/chatType";
import { ButtonComponent } from "@/components/common/button/ButtonComponent";
import { formatRelativeTime } from "@/lib/time";
import type { ChatRoomPreview } from "@feature/chat/stores/useChatStore";

const productCache = new Map<
  number,
  { title: string; price: number; memberId: number; memberName: string }
>();

export default function ChatList() {
  const chatList = useChatStore((state) => state.chatList);
  const setChatList = useChatStore((state) => state.setChatList);
  const setChatListUpdateCallback = useWebSocketStore((state) => state.setChatListUpdateCallback);
  const { subscribe, unsubscribe } = useWebSocketStore();
  const [selectedFilter, setSelectedFilter] = useState<"ALL" | "BUYER" | "SELLER">("ALL");

  const fetchChatRooms = useCallback(async () => {
    try {
      const apiList = await getChatRoomList(10, selectedFilter);

      // 메시지가 있는 채팅방만 필터링
      const filteredApiList = apiList.filter(
        (item: ApiChatRoom) => item.lastMessage && item.lastMessage.trim() !== ""
      );

      // 상품 정보 가져오기 (캐시 활용)
      const uniqueProductIds = [
        ...new Set(filteredApiList.map((item: ApiChatRoom) => item.productId)),
      ];

      const productDetailsMap: Record<
        number,
        { title: string; price: number; memberId: number; memberName: string }
      > = {};

      for (const productId of uniqueProductIds) {
        try {
          const productIdNum = productId as number;
          // 캐시에서 먼저 확인
          if (productCache.has(productIdNum)) {
            productDetailsMap[productIdNum] = productCache.get(productIdNum)!;
          } else {
            // 캐시에 없으면 API 호출
            const productData = await getMapDetailById(String(productIdNum));
            const productInfo = {
              title: productData.title,
              price: productData.price,
              memberId: productData.memberId,
              memberName: productData.memberName,
            };

            // 캐시에 저장
            productCache.set(productIdNum, productInfo);
            productDetailsMap[productIdNum] = productInfo;
          }
        } catch (error) {
          console.error(`상품 ${productId} 정보 가져오기 실패:`, error);
        }
      }

      const chatList = filteredApiList.map((item: ApiChatRoom) => {
        const productDetail = productDetailsMap[item.productId];
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

      setChatList(chatList);
    } catch (e) {
      console.error("채팅방 목록 가져오기 실패:", e);
    }
  }, [selectedFilter, setChatList]);

  // 채팅방 목록이 변경될 때마다 웹소켓 구독 관리
  useEffect(() => {
    // 기존 구독 해제
    chatList.forEach((chat: ChatRoomPreview) => {
      unsubscribe(chat.chatRoomId);
    });

    // 새로운 채팅방들 구독
    chatList.forEach((chat: ChatRoomPreview) => {
      subscribe(chat.chatRoomId, (message) => {
        setChatList((prevChatList: ChatRoomPreview[]) => {
          return prevChatList.map((prevChat: ChatRoomPreview) => {
            if (prevChat.chatRoomId === chat.chatRoomId) {
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
          fetchChatRooms();
        }
      });
    });

    // 컴포넌트 언마운트 시 모든 구독 해제
    return () => {
      chatList.forEach((chat: ChatRoomPreview) => {
        unsubscribe(chat.chatRoomId);
      });
    };
  }, [chatList, subscribe, unsubscribe, fetchChatRooms]);

  // 웹소켓 스토어에 채팅방 목록 업데이트 콜백 등록
  useEffect(() => {
    setChatListUpdateCallback(fetchChatRooms);
    return () => setChatListUpdateCallback(null);
  }, [selectedFilter, setChatListUpdateCallback, fetchChatRooms]);

  // 컴포넌트 마운트 시와 필터 변경 시 API 호출
  useEffect(() => {
    fetchChatRooms();
  }, [selectedFilter, fetchChatRooms]);

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

      <div className="overflow-y-auto overflow-x-hidden scrollbar-track-transparent h-sheet-safe">
        <div className="py-24 mb-56">
          {chatList.map((chat, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
