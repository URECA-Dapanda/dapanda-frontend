import { formatTimeToAmPm } from "@/lib/time";
import type { ChatSocketMessage } from "@/feature/chat/types/chatType";
import AvatarIcon from "@/components/common/AvatarIcon";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: ChatSocketMessage;
  avatarUrl?: string;
  memberId?: number;
  currentMemberId?: number;
}

export default function ChatBubble({
  message,
  avatarUrl,
  memberId,
  currentMemberId,
}: ChatBubbleProps) {
  const isMine =
    message.senderId !== undefined ? message.senderId === currentMemberId : message.isMine;

  const timeText = formatTimeToAmPm(message.createdAt);

  const baseClasses =
    "w-fit max-w-[80%] px-3 py-3 rounded-2xl whitespace-pre-line break-words ml-4 body-sm border border-primary-200 text-black";
  const bubbleClasses = isMine ? "bg-primary2 rounded-br-none" : "bg-white rounded-bl-none";

  const bubble = <div className={cn(baseClasses, bubbleClasses)}>{message.message}</div>;

  return (
    <div className={cn("flex items-end gap-2", isMine ? "justify-end" : "justify-start")}>
      {!isMine && (
        <Link
          href={memberId ? `/data/review?id=${memberId}&tab=review` : "/data/review"}
          className="cursor-pointer"
        >
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
