"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import AvatarIcon from "@/components/common/AvatarIcon";

export interface ChatItemProps {
  chatId: string;
  name: string;
  lastMessage: string;
  timeAgo: string;
  unreadCount?: number;
  avatarUrl?: string;
  post: {
    title: string;
    price: string;
  };
}

export default function ChatItem({
  chatId,
  name,
  lastMessage,
  timeAgo,
  unreadCount = 0,
  avatarUrl,
  post,
}: ChatItemProps) {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(
      `/chat/${chatId}?title=${encodeURIComponent(post.title)}&price=${encodeURIComponent(
        post.price
      )}&name=${encodeURIComponent(name)}`
    );
  }, [chatId, post.title, post.price, name]);

  return (
    <div onClick={handleClick} className="cursor-pointer flex justify-between items-center gap-12">
      <div className="flex items-center gap-12">
        <AvatarIcon avatar={avatarUrl} size="medium" />
        <div className="flex flex-col gap-2">
          <span className="body-sm text-black">{name}</span>
          <span className="body-xs text-gray-600 truncate max-w-[180px]">{lastMessage}</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="caption-lg text-gray-500">{timeAgo}</span>
        {unreadCount > 0 && (
          <div className="w-20 h-20 rounded-full bg-primary text-white caption-md flex items-center justify-center">
            {unreadCount}
          </div>
        )}
      </div>
    </div>
  );
}
