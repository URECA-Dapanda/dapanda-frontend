import { formatTimeToAmPm } from "@/lib/time";
import type { ChatMessage } from "@/feature/chat/types/message";

import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: ChatMessage;
  currentUserId: string;
}

export default function ChatBubble({ message, currentUserId }: ChatBubbleProps) {
  const isMine = message.senderId === currentUserId;
  const timeText = formatTimeToAmPm(message.createdAt);

  const baseClasses =
    "w-fit max-w-[244px] px-3 py-3 rounded-2xl whitespace-pre-wrap body-sm border border-color-primary-200 text-color-text-black";
  const bubbleClasses = isMine
    ? "bg-color-bg-primary2 rounded-br-none"
    : "bg-color-bg-white rounded-bl-none";

  const bubble = <div className={cn(baseClasses, bubbleClasses)}>{message.text}</div>;

  return (
    <div className={cn("flex items-end gap-2", isMine ? "justify-end" : "justify-start")}>
      {!isMine && (
        <img
          src={message.senderAvatar ?? "/images/default-avatar.png"}
          alt="상대방 아바타"
          className="w-8 h-8 rounded-full"
        />
      )}

      <div className="flex flex-col items-start">
        {isMine ? (
          <>
            {bubble}
            <span className="body-xs text-color-gray-500 mt-1">{timeText}</span>
          </>
        ) : (
          <div className="flex items-end gap-1">
            {bubble}
            <span className="body-xs text-color-gray-500">{timeText}</span>
          </div>
        )}
      </div>
    </div>
  );
}
