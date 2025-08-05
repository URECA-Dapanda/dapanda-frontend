"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useEffect } from "react";
import TimerContainer from "@/feature/map/components/sections/timer/TimeContainer";
import { useAuth } from "@/hooks/useAuth";
import { useSubscribeTimer } from "@hooks/useSubscribeTimer";
import { useInitializeTimerFromServer } from "@hooks/useInitializeTimerFormServer";
import { useSubscribeTimerOnce } from "@hooks/subscribeToTimerOnce";
import { useWebSocketConnection } from "@/hooks/useWebSocketConnection";
import { useChatStore } from "@feature/chat/stores/useChatStore";
import { getChatRoomList } from "@feature/chat/api/chatRoomRequest";
import { getMapDetailById } from "@feature/map/api/getMapDetailById";
import { ApiChatRoom } from "@feature/chat/types/chatType";

export default function ProviderWrapper({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();
  const { user, isLoading } = useAuth();
  const userId = user?.memberId;
  const setChatList = useChatStore((state) => state.setChatList);

  useWebSocketConnection();
  useSubscribeTimer(userId, isLoading);
  useSubscribeTimerOnce(userId);

  useInitializeTimerFromServer();

  useEffect(() => {
    if (!isLoading && user) {
      const timer = setTimeout(() => {
        const initializeChatData = async () => {
          try {
            const apiList = await getChatRoomList(10, "ALL");

            const filteredApiList = apiList.filter(
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
          } catch (error) {
            console.error("채팅 데이터 초기화 실패:", error);
          }
        };

        initializeChatData();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [user, isLoading, setChatList]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <TimerContainer />
    </QueryClientProvider>
  );
}
