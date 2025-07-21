"use client";

import ChatList from "@feature/chat/components/sections/list/ChatList";

export default function ChatListPage() {
  const dummyChats = [
    {
      chatId: "1",
      name: "콩민",
      lastMessage: "2GB 구매하고 싶어요",
      timeAgo: "2분 전",
      unreadCount: 2,
      avatarUrl: "/images/default-avatar.png",
      post: {
        title: "2GB",
        price: "2,000원",
      },
    },
    {
      chatId: "2",
      name: "콩민2",
      lastMessage: "6GB 구매하고 싶어요",
      timeAgo: "3분 전",
      unreadCount: 0,
      avatarUrl: "/images/default-avatar.png",
      post: {
        title: "6GB",
        price: "3,000원",
      },
    },
  ];

  return <ChatList chats={dummyChats} />;
}
