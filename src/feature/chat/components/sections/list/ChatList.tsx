"use client";

import { useEffect, useState } from "react";
import ChatItem from "@feature/chat/components/sections/list/ChatItem";
import { formatRelativeTime } from "@/lib/time";
import axiosInstance from "@/lib/axios";

export default function ChatList() {
  const [chatList, setChatList] = useState<any[]>([]);
  const [productInfoMap, setProductInfoMap] = useState<
    Record<number, { title: string; price: string }>
  >({});

  useEffect(() => {
    async function fetchChatRooms() {
      try {
        const response = await axiosInstance.get("/api/chat-room");
        if (response.data.code === 0) {
          const apiList = response.data.data.data;
          setChatList(apiList);

          // 상품 정보 비동기 병렬 조회
          const productIds = apiList.map((item: any) => item.productId);
          const productInfoResults = await Promise.all(
            productIds.map((id: number) =>
              axiosInstance
                .get(`/api/products/${id}`)
                .then((res) => ({
                  id,
                  title: res.data.data.title,
                  price: res.data.data.price,
                }))
                .catch(() => ({
                  id,
                  title: "",
                  price: "",
                }))
            )
          );
          const infoMap: Record<number, { title: string; price: string }> = {};
          productInfoResults.forEach((info) => {
            infoMap[info.id] = { title: info.title, price: info.price };
          });
          setProductInfoMap(infoMap);
        } else {
          alert(response.data.message || "채팅방 조회 실패");
        }
      } catch (e) {
        alert("채팅방 조회 중 오류가 발생했습니다.");
        console.error(e);
      }
    }
    fetchChatRooms();
  }, []);

  return (
    <div className="flex flex-col pt-30 space-y-24 px-24 py-2">
      {chatList.map((chat) => (
        <ChatItem
          key={chat.chatRoomId}
          chatRoomId={String(chat.chatRoomId)}
          name={chat.senderName}
          lastMessage={""} // lastMessage 내용이 없으므로 빈 값
          timeAgo={formatRelativeTime(chat.lastMessageAt)}
          avatarUrl={"/default-avatar.png"}
          post={{
            title: productInfoMap[chat.productId]?.title || "",
            price: productInfoMap[chat.productId]?.price || "",
          }}
        />
      ))}
    </div>
  );
}
