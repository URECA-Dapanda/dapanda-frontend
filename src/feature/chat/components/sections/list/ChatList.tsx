"use client";

import ChatItem from "@feature/chat/components/sections/list/ChatItem";
import { useChatStore } from "@feature/chat/stores/useChatStore";
import { formatRelativeTime } from "@/lib/time";

export default function ChatList() {
  const chatList = useChatStore((state) => state.chatList);
  return (
    <div className="flex flex-col pt-30 space-y-24 px-24 py-2">
      {chatList.map((chat) => (
        <ChatItem
          key={chat.chatRoomId}
          chatId={String(chat.chatRoomId)}
          name={chat.name}
          lastMessage={chat.lastMessage}
          timeAgo={formatRelativeTime(chat.updatedAt)}
          post={{ title: chat.title, price: chat.price.toLocaleString() }}
        />
      ))}
    </div>
  );
}
