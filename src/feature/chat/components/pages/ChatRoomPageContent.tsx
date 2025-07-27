"use client";

import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import ChatRoomContent from "@/feature/chat/components/sections/room/ChatRoomContent";

export default function ChatRoomPage() {
  const params = useParams();
  const chatRoomId = params?.chatRoomId as string;
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  return <ChatRoomContent chatRoomId={Number(chatRoomId)} productId={productId} />;
}
