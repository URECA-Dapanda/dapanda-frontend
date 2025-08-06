import Link from "next/link";
import { formatTimeToAmPm } from "@/lib/time";
import type { ChatSocketMessage } from "@/feature/chat/types/chatType";
import AvatarIcon from "@/components/common/AvatarIcon";

import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: ChatSocketMessage;
  avatarUrl?: string;
  memberId?: number;
  currentMemberId?: number;
  productId?: number;
}

export default function ChatBubble({
  message,
  avatarUrl,
  memberId,
  currentMemberId,
  productId,
}: ChatBubbleProps) {
  const isMine =
    message.senderId !== undefined ? message.senderId === currentMemberId : message.isMine;

  const timeText = formatTimeToAmPm(message.createdAt);

  const baseClasses =
    "w-fit max-w-[80%] px-3 py-3 rounded-2xl whitespace-pre-line break-words ml-4 body-sm border border-primary-200 text-black";
  const bubbleClasses = isMine ? "bg-primary2 rounded-br-none" : "bg-white rounded-bl-none";

  const bubble = <div className={cn(baseClasses, bubbleClasses)}>{message.message}</div>;

  // 상대방 프로필 클릭 시 이동할 URL
  const getProfileUrl = () => {
    if (memberId) {
      return `/data/review?id=${memberId}&tab=review`;
    } else if (productId) {
      return `/data/${productId}`;
    } else {
      return "/data/review";
    }
  };

  return (
    <div className={cn("flex items-end gap-2", isMine ? "justify-end" : "justify-start")}>
      {!isMine && (
        <Link href={getProfileUrl()} className="cursor-pointer">
          <AvatarIcon avatar={avatarUrl} size="small" />
        </Link>
      )}

      {isMine ? (
        <div className="flex flex-row-reverse items-end gap-1">
          {bubble}
          <span className="body-xs text-gray-500 mt-1">{timeText}</span>
        </div>
      ) : (
        <div className="flex items-end gap-1 w-full">
          {bubble}
          <span className="body-xs text-gray-500">{timeText}</span>
        </div>
      )}
    </div>
  );
}
