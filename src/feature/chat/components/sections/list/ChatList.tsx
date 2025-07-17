"use client";

import ChatItem, { ChatItemProps } from "./ChatItem";

interface ChatListProps {
  chats: ChatItemProps[];
}

export default function ChatList({ chats }: ChatListProps) {
  return (
    <div className="flex flex-col pt-30 space-y-24 px-24 py-2">
      {chats.map((chat) => (
        <ChatItem key={chat.chatId} {...chat} />
      ))}
    </div>
  );
}
