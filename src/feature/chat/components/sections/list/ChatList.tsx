"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatRelativeTime } from "@/lib/time";
import { useChatStore } from "@feature/chat/stores/useChatStore";
import ChatItem from "@feature/chat/components/sections/list/ChatItem";
import { getChatRoomList } from "@feature/chat/api/chatRoomRequest";
import { getMapDetailById } from "@feature/map/api/getMapDetailById";
import { ApiChatRoom } from "@feature/chat/types/chatType";
import { ButtonComponent } from "@/components/common/button/ButtonComponent";
import { useProfileStore } from "@/stores/useProfileStore";

export default function ChatList() {
  const chatList = useChatStore((state) => state.chatList);
  const setChatList = useChatStore((state) => state.setChatList);
  const myUserId = useProfileStore((state) => state.id);
  const [productDetails, setProductDetails] = useState<
    Record<number, { title: string; price: number; memberId: number; memberName: string }>
  >({});
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
            const productData = await getMapDetailById(String(productId));
            productDetailsMap[productId as number] = {
              title: productData.title,
              price: productData.price,
              memberId: productData.memberId,
              memberName: productData.memberName,
            };
          } catch (error) {
            console.error(`상품 ${productId} 정보 가져오기 실패:`, error);
          }
        }

        setProductDetails(productDetailsMap);

        const chatList = apiList.map((item: ApiChatRoom) => {
          const productDetail = productDetailsMap[item.productId];

          const senderName =
            productDetail?.memberId === myUserId ? "구매자" : productDetail?.memberName || "상대방";

          return {
            chatRoomId: item.chatRoomId,
            name: senderName,
            updatedAt: item.createdAt,
            productId: item.productId,
          };
        });

        setChatList(chatList);
      } catch (e) {
        toast.error("채팅방 조회 중 오류가 발생했습니다.");
        console.error(e);
      }
    }
    fetchChatRooms();
  }, [setChatList, selectedFilter]);

  return (
    <div className="flex flex-col px-24 pt-20">
      <div className="flex gap-12">
        <ButtonComponent
          variant={selectedFilter === "ALL" ? "primary" : "outlinePrimary"}
          size="sm"
          onClick={() => setSelectedFilter("ALL")}
        >
          전체
        </ButtonComponent>
        <ButtonComponent
          variant={selectedFilter === "BUYER" ? "primary" : "outlinePrimary"}
          size="sm"
          onClick={() => setSelectedFilter("BUYER")}
        >
          구매
        </ButtonComponent>
        <ButtonComponent
          variant={selectedFilter === "SELLER" ? "primary" : "outlinePrimary"}
          size="sm"
          onClick={() => setSelectedFilter("SELLER")}
        >
          판매
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
              timeAgo={formatRelativeTime(chat.updatedAt)}
              productId={chat.productId}
              place={productDetails[chat.productId]?.title}
              pricePer10min={productDetails[chat.productId]?.price}
              avatarUrl={chat.avatarUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
