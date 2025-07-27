"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { formatRelativeTime } from "@/lib/time";
import { useChatStore } from "@feature/chat/stores/useChatStore";
import ChatItem from "@feature/chat/components/sections/list/ChatItem";
import { getChatRoomList } from "@feature/chat/api/chatRoomRequest";
import { getMapDetailById } from "@feature/map/api/getMapDetailById";
import { ApiChatRoom } from "@feature/chat/types/chatType";

export default function ChatList() {
  const chatList = useChatStore((state) => state.chatList);
  const setChatList = useChatStore((state) => state.setChatList);
  const [productDetails, setProductDetails] = useState<
    Record<number, { place: string; pricePer10min: number; memberName: string }>
  >({});

  const params = useParams();
  const chatRoomId = params?.chatRoomId as string;
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  console.log("chatRoomId:", chatRoomId, "productId:", productId);

  useEffect(() => {
    async function fetchChatRooms() {
      try {
        const apiList = await getChatRoomList(10, "ALL");
        console.log("API response raw data:", apiList);

        const uniqueProductIds = [...new Set(apiList.map((item: ApiChatRoom) => item.productId))];
        const productDetailsMap: Record<
          number,
          { place: string; pricePer10min: number; memberName: string }
        > = {};

        // 상품 정보를 먼저 가져오기
        for (const productId of uniqueProductIds) {
          try {
            const productData = await getMapDetailById(String(productId));
            productDetailsMap[productId as number] = {
              place: productData.title,
              pricePer10min: productData.price,
              memberName: productData.memberName,
            };
          } catch (error) {
            console.error(`상품 ${productId} 정보 가져오기 실패:`, error);
            productDetailsMap[productId as number] = {
              place: "상품",
              pricePer10min: 0,
              memberName: "판매자",
            };
          }
        }

        setProductDetails(productDetailsMap);
        console.log("Product details:", productDetailsMap);

        // 상품 정보를 사용해서 채팅방 목록 생성
        const chatList = apiList.map((item: ApiChatRoom) => {
          const productDetail = productDetailsMap[item.productId];
          return {
            chatRoomId: item.chatRoomId,
            name: productDetail?.memberName || item.senderName, // 판매자 이름 우선, 없으면 senderName
            lastMessage: "",
            updatedAt: item.createdAt,
            productId: item.productId,
          };
        });

        setChatList(chatList);
        console.log("chatList:", chatList);
      } catch (e) {
        toast.error("채팅방 조회 중 오류가 발생했습니다.");
        console.error(e);
      }
    }
    fetchChatRooms();
  }, [setChatList]);

  return (
    <div className="flex flex-col pt-30 space-y-24 px-24 py-2">
      {chatList.map((chat) => (
        <ChatItem
          key={chat.chatRoomId}
          chatRoomId={String(chat.chatRoomId)}
          name={chat.name}
          timeAgo={formatRelativeTime(chat.updatedAt)}
          productId={chat.productId}
          place={productDetails[chat.productId]?.place}
          pricePer10min={productDetails[chat.productId]?.pricePer10min}
          lastMessage={chat.lastMessage}
          avatarUrl={chat.avatarUrl}
        />
      ))}
    </div>
  );
}
