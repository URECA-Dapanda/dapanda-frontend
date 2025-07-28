"use client";

import Link from "next/link";
import AvatarIcon from "@/components/common/AvatarIcon";

export interface ChatItemProps {
  chatRoomId: string;
  name: string;
  timeAgo: string;
  unreadCount?: number;
  avatarUrl?: string;
  productId: number;
  place?: string;
  pricePer10min?: number;
}

export default function ChatItem({
  chatRoomId,
  name,
  timeAgo,
  unreadCount = 0,
  avatarUrl,
  productId,
  place,
  pricePer10min,
}: ChatItemProps) {
  return (
    <Link href={`/chat/${chatRoomId}?productId=${productId}`} className="block">
      <div className="cursor-pointer flex justify-between items-center gap-12">
        <div className="flex items-center gap-12">
          <AvatarIcon avatar={avatarUrl} size="medium" />
          <div className="flex flex-col gap-2">
            <span className="body-sm text-black">{name}</span>
            <span className="body-sm text-gray-800">{place}</span>
            <span className="body-sm text-gray-800">
              {pricePer10min ? `${pricePer10min}원/10분` : ""}
            </span>
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
