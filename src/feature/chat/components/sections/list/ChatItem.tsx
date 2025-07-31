"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AvatarIcon from "@/components/common/AvatarIcon";

export interface ChatItemProps {
  chatRoomId: string;
  name: string;
  updatedAt: string;
  unreadCount?: number;
  avatarUrl?: string;
  productId: number;
  place?: string;
  pricePer10min?: number;
  memberId?: number;
  lastMessage?: string;
}

export default function ChatItem({
  chatRoomId,
  name,
  updatedAt,
  unreadCount = 0,
  avatarUrl,
  productId,
  place,
  memberId,
  lastMessage,
}: ChatItemProps) {
  const router = useRouter();

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (memberId) {
      router.push(`/data/review?id=${memberId}&tab=review`);
    } else {
      router.push("/data/review");
    }
  };
  return (
    <div className="flex justify-between items-start gap-12 py-12 rounded-8 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-12 flex-1">
        <button onClick={handleAvatarClick} className="cursor-pointer">
          <AvatarIcon avatar={avatarUrl} size="medium" />
        </button>
        <Link
          href={`/chat/${chatRoomId}?productId=${productId}&memberName=${encodeURIComponent(
            name
          )}&memberId=${memberId || ""}`}
          className="flex-1"
        >
          <div className="flex flex-col gap-2 cursor-pointer">
            <span className="body-sm text-black">{name}</span>
            <div className="flex flex-col gap-2">
              <span className="body-sm text-gray-800">{place}</span>
              <span className="body-sm text-gray-600">{lastMessage}</span>
            </div>
          </div>
        </Link>
      </div>
      <Link href={`/chat/${chatRoomId}?productId=${productId}`}>
        <div className="flex flex-row items-center gap-2 cursor-pointer">
          <span className="caption-lg text-gray-500">{updatedAt}</span>
          {unreadCount > 0 && (
            <div className="w-20 h-20 rounded-full bg-primary text-white caption-md flex items-center justify-center">
              {unreadCount}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
