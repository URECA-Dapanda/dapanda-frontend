import { formatTimeToAmPm } from "@/lib/time";
import type { ChatMessage } from "@/feature/chat/types/chatType";
import AvatarIcon from "@/components/common/AvatarIcon";

import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: ChatMessage;
  currentUserId: string;
}

export default function ChatBubble({ message, currentUserId }: ChatBubbleProps) {
  const isMine = message.senderId === currentUserId;
  const timeText = formatTimeToAmPm(message.createdAt);

  const baseClasses =
    "w-fit max-w-[80%] px-3 py-3 rounded-2xl whitespace-pre-line break-words ml-4 body-sm border border-primary-200 text-black";
  const bubbleClasses = isMine ? "bg-primary2 rounded-br-none" : "bg-white rounded-bl-none";

  const bubble = <div className={cn(baseClasses, bubbleClasses)}>{message.text}</div>;

  return (
    <div className={cn("flex items-end gap-2", isMine ? "justify-end" : "justify-start")}>
      {!isMine && (
        <AvatarIcon avatar={message.senderAvatar ?? "/images/default-avatar.png"} size="small" />
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
