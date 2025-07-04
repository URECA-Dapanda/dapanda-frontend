"use client";

import AvatarIcon from "@/components/common/header/AvatarIcon";
import { Card, CardContent } from "@/components/ui/card";
import { ChatProps } from "@/types/Chat";
import { useRouter } from "next/navigation";
import { memo, MouseEvent, useCallback } from "react";

function ChatItem({ chat }: { chat: ChatProps }) {
  const router = useRouter();

  const handleCardSelect = useCallback(() => {
    router.push(`/chat`);
  }, []);

  const handleUserClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      router.push(`/profile/${event.currentTarget.value}`);
    },
    []
  );

  return (
    <Card
      key={chat.id}
      className="cursor-pointer hover:bg-[#fefaef] border-[#ffe8c6]"
      onClick={handleCardSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <button value={chat.userId} onClick={handleUserClick}>
            <AvatarIcon avatar={chat.avatar} size="midium" />
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <button value={chat.userId} onClick={handleUserClick}>
                <span className="font-medium text-gray-900 hover:underline">
                  {chat.name}
                </span>
              </button>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{chat.time}</span>
                {chat.unread! > 0 && (
                  <div className="w-5 h-5 bg-[#119c72] rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">
                      {chat.unread}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">{chat.product}</p>
            <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(ChatItem);
