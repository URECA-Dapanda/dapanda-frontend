"use client";

import { useEffect } from "react";
import ChatItem from "@feature/chat/components/sections/list/ChatItem";
import { useChatStore } from "@feature/chat/stores/useChatStore";
import { formatRelativeTime } from "@/lib/time";
import axiosInstance from "@/lib/axios";
import { ApiChatRoom } from "@feature/chat/types/chatType";

export default function ChatList() {
  const chatList = useChatStore((state) => state.chatList);
  const setChatList = useChatStore((state) => state.setChatList);

  useEffect(() => {
    async function fetchChatRooms() {
      try {
        const response = await axiosInstance.get("/api/chat-room");
        if (response.data.code === 0) {
          const apiList = response.data.data.data;
          const chatList = apiList.map((item: ApiChatRoom) => ({
            chatRoomId: item.chatRoomId,
            name: item.senderName,
            title: item.itemType,
            price: 0,
            lastMessage: "",
            updatedAt: item.createdAt,
          }));
          setChatList(chatList);
          console.log("chatList:", chatList);
        } else {
          alert(response.data.message || "채팅방 조회 실패");
        }
      } catch (e) {
        alert("채팅방 조회 중 오류가 발생했습니다.");
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
          chatId={String(chat.chatRoomId)}
          name={chat.name}
          lastMessage={chat.lastMessage}
          timeAgo={formatRelativeTime(chat.updatedAt)}
          post={{ title: chat.title, price: (chat.price ?? 0).toLocaleString() }}
        />
      ))}
    </div>
  );
}
