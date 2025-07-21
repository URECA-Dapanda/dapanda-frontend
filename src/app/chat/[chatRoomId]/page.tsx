"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChatRoomHeader from "@/feature/chat/components/sections/room/ChatRoomHeader";
import ChatRoomContent from "@/feature/chat/components/sections/room/ChatRoomContent";
import type { ContentInfoType } from "@/feature/chat/types/contentType";
import { getChatContentInfo } from "@feature/chat/api/chatContentRequest";

export default function ChatRoomPage() {
  const { chatRoomId } = useParams();
  const [content, setContent] = useState<ContentInfoType | null>(null);

  console.log("chatId:", chatRoomId);

  useEffect(() => {
    if (!chatRoomId) return;

    getChatContentInfo(chatRoomId as string).then((res) => {
      console.log("chat content info:", res);
      setContent(res);
    });
  }, [chatRoomId]);

  if (!content) return <div className="p-20">로딩 중...</div>;
  return (
    <>
      <ChatRoomHeader title={content.title} />
      <div className="pb-36">
        <ChatRoomContent
          chatRoomId={parseInt(chatRoomId as string)}
          title={content.title}
          price={content.price}
        />
      </div>
    </>
  );
}
