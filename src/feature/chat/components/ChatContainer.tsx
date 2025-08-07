"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useChatStore } from "@feature/chat/stores/useChatStore";
import { getChatRoomList } from "@feature/chat/api/chatRoomRequest";
import { getMapDetailById } from "@feature/map/api/getMapDetailById";
import { ApiChatRoom } from "@feature/chat/types/chatType";
import { useQuery } from "@tanstack/react-query";
import { useWebSocketStore } from "@stores/useWebSocketStore";

export default function ChatContainer() {
  const { user, isLoading, isLogin } = useAuth();
  const setChatList = useChatStore((state) => state.setChatList);
  const setChatListUpdateCallback = useWebSocketStore((state) => state.setChatListUpdateCallback);
  const { subscribe, unsubscribe } = useWebSocketStore();
  const { data } = useQuery({
    queryFn: () => getChatRoomList(10, "ALL"),
    queryKey: ["/api/chat-room"],
    enabled: !!isLogin,
  });

  // 채팅 목록 초기화 함수
  const initializeChatData = async () => {
    if (data) {
      try {
        const filteredApiList = data.filter(
          (item: ApiChatRoom) => item.lastMessage && item.lastMessage.trim() !== ""
        );

        const productCache = new Map<
          number,
          { title: string; price: number; memberId: number; memberName: string }
        >();

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
            if (productCache.has(productIdNum)) {
              productDetailsMap[productIdNum] = productCache.get(productIdNum)!;
            } else {
              const productData = await getMapDetailById(String(productIdNum));
              const productInfo = {
                title: productData.title,
                price: productData.price,
                memberId: productData.memberId,
                memberName: productData.memberName,
              };

              productCache.set(productIdNum, productInfo);
              productDetailsMap[productIdNum] = productInfo;
            }
          } catch (error) {
            console.debug(`상품 ${productId} 정보 가져오기 실패:`, error);
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
      } catch (error) {
        console.debug("채팅 데이터 초기화 실패:", error);
      }
    }
  };

  // 웹소켓 콜백 함수 - 특정 채팅방 unreadCount +1 또는 전체 업데이트
  const handleChatUpdate = (chatRoomId?: number) => {
    if (chatRoomId) {
      // 특정 채팅방의 unreadCount만 +1
      console.debug(`채팅방 ${chatRoomId}의 unreadCount +1`);
      setChatList((prevChatList) => {
        const updatedList = prevChatList.map((chat) => {
          if (chat.chatRoomId === chatRoomId) {
            const newUnreadCount = (chat.unreadCount || 0) + 1;
            return {
              ...chat,
              unreadCount: newUnreadCount,
            };
          }
          return chat;
        });
        return updatedList;
      });
    } else {
      // 전체 채팅 목록 업데이트
      initializeChatData();
    }
  };

  // 모든 채팅방 구독
  useEffect(() => {
    if (!data || !isLogin) return;
    const chatRoomIds = data.map((item: ApiChatRoom) => item.chatRoomId);

    // 기존 구독 해제
    chatRoomIds.forEach((chatRoomId: number) => {
      unsubscribe(chatRoomId);
    });

    // 모든 채팅방 구독
    chatRoomIds.forEach((chatRoomId: number) => {
      subscribe(chatRoomId, (message) => {
        // 메시지가 오면 해당 채팅방의 unreadCount +1
        handleChatUpdate(chatRoomId);
      });
    });

    return () => {
      chatRoomIds.forEach((chatRoomId: number) => {
        unsubscribe(chatRoomId);
      });
    };
  }, [data, isLogin, subscribe, unsubscribe]);

  useEffect(() => {
    if (!isLoading && user) {
      const timer = setTimeout(() => {
        initializeChatData();
        setChatListUpdateCallback(handleChatUpdate);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [user, isLoading, isLogin, setChatList, data, setChatListUpdateCallback]);

  return null;
}
