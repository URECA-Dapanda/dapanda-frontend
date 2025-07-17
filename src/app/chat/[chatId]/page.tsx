"use client";

import { useSearchParams } from "next/navigation";
import ChatRoomContent from "@/feature/chat/components/sections/room/ChatRoomContent";
import ChatRoomHeader from "@/feature/chat/components/sections/room/ChatRoomHeader";

export default function ChatRoomPage() {
  const searchParams = useSearchParams();

  const title = searchParams.get("title") || "";
  const price = searchParams.get("price") || "";
  const name = searchParams.get("name") || "이름 없음";

  return (
    <>
      <ChatRoomHeader title={name} />
      <ChatRoomContent title={title} price={price} />
    </>
  );
}
