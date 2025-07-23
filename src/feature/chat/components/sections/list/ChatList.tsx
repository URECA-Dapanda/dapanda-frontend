"use client";

import { useEffect } from "react";
import ChatItem from "@feature/chat/components/sections/list/ChatItem";
import { useChatStore } from "@feature/chat/stores/useChatStore";
import { formatRelativeTime } from "@/lib/time";
import axiosInstance from "@/lib/axios";
import { ApiChatRoom } from "@feature/chat/types/chatType";
import { toast } from "react-toastify";
import { useProfileStore } from "@stores/useProfileStore";

export default function ChatList() {
  const chatList = useChatStore((state) => state.chatList);
  const setChatList = useChatStore((state) => state.setChatList);
  const myUserId = useProfileStore((state) => state.id);

  useEffect(() => {
    async function fetchChatRooms() {
      try {
        const response = await axiosInstance.get("/api/chat-room");
        if (response.data.code === 0) {
          const apiList = response.data.data.data;
          const chatList = apiList.map((item: ApiChatRoom) => {
            // senderId가 내 userId와 다르면 senderName이 상대방 이름
            // 같으면 "알 수 없음" 또는 빈 문자열 (receiverName이 있으면 receiverName 사용)
            const isMine = item.senderId === myUserId;
            return {
              chatRoomId: item.chatRoomId,
              name: isMine ? "알 수 없음" : item.senderName, // 또는 receiverName
              title: item.itemType,
              price: 0,
              lastMessage: "",
              updatedAt: item.createdAt,
              productId: item.productId,
            };
          });
          setChatList(chatList);
          console.log("chatList:", chatList);
        } else {
          toast.error(response.data.message || "채팅방 조회 실패");
        }
      } catch (e) {
        toast.error("채팅방 조회 중 오류가 발생했습니다.");
        console.error(e);
      }
    }
    fetchChatRooms();
  }, [setChatList, myUserId]);

  return (
    <div className="flex flex-col pt-30 space-y-24 px-24 py-2">
      {chatList.map((chat) => (
        <ChatItem
          key={chat.chatRoomId}
          chatRoomId={String(chat.chatRoomId)}
          name={chat.name}
          lastMessage={chat.lastMessage}
          timeAgo={formatRelativeTime(chat.updatedAt)}
          productId={chat.productId}
          post={{
            title: chat.title,
            price: (chat.price ?? 0).toLocaleString(),
          }}
        />
      ))}
    </div>
  );
}
