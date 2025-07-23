"use client";

import AvatarIcon from "@/components/common/AvatarIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface ChatItemProps {
  chatRoomId: string;
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
  chatRoomId,
  name,
  lastMessage,
  timeAgo,
  unreadCount = 0,
  avatarUrl,
  post,
}: ChatItemProps) {
  const router = useRouter();

  return (
    <Link href={`/chat/${chatRoomId}`} className="block">
      <div className="cursor-pointer flex justify-between items-center gap-12">
        <div className="flex items-center gap-12">
          <AvatarIcon avatar={avatarUrl} size="medium" />
          <div className="flex flex-col gap-2">
            <span className="body-sm text-black">{name}</span>
            <span className="body-sm text-gray-800">{post.title}</span>
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
    </Link>
  );
}
