"use client";

import { useEffect, useState } from "react";
import { useChatStore } from "@feature/chat/stores/useChatStore";
import ChatItem from "@feature/chat/components/sections/list/ChatItem";
import { getChatRoomList } from "@feature/chat/api/chatRoomRequest";
import { getMapDetailById } from "@feature/map/api/getMapDetailById";
import { ApiChatRoom } from "@feature/chat/types/chatType";
import { ButtonComponent } from "@/components/common/button/ButtonComponent";
import { formatRelativeTime } from "@/lib/time";

export default function ChatList() {
  const chatList = useChatStore((state) => state.chatList);
  const setChatList = useChatStore((state) => state.setChatList);
  const [selectedFilter, setSelectedFilter] = useState<"ALL" | "BUYER" | "SELLER">("ALL");

  useEffect(() => {
    async function fetchChatRooms() {
      try {
        const apiList = await getChatRoomList(10, selectedFilter);

        // 상품 정보 가져오기
        const uniqueProductIds = [...new Set(apiList.map((item: ApiChatRoom) => item.productId))];
        const productDetailsMap: Record<
          number,
          { title: string; price: number; memberId: number; memberName: string }
        > = {};

        for (const productId of uniqueProductIds) {
          try {
            if (!productDetailsMap[productId as number]) {
              const productData = await getMapDetailById(String(productId));
              productDetailsMap[productId as number] = {
                title: productData.title,
                price: productData.price,
                memberId: productData.memberId,
                memberName: productData.memberName,
              };
            }
          } catch (error) {
            console.error(`상품 ${productId} 정보 가져오기 실패:`, error);
          }
        }

        const chatList = apiList.map((item: ApiChatRoom) => {
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
            avatarUrl: item.senderProfileImageUrl || "c",
            senderId: item.senderId,
          };
        });

        console.log("최종 chatList 상태:", chatList);
        setChatList(chatList);
      } catch (e) {
        console.error(e);
      }
    }
    fetchChatRooms();
  }, [setChatList, selectedFilter]);

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

      <div
        className="overflow-y-auto overflow-x-hidden scrollbar-track-transparent"
        style={{ height: "calc(-108px + 100vh)" }}
      >
        <div className="space-y-24 py-24 mb-56">
          {chatList.map((chat) => (
            <ChatItem
              key={chat.chatRoomId}
              chatRoomId={String(chat.chatRoomId)}
              name={chat.name}
              updatedAt={formatRelativeTime(chat.updatedAt)}
              productId={chat.productId}
              place={chat.title}
              pricePer10min={chat.price}
              avatarUrl={chat.avatarUrl}
              senderId={chat.senderId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
