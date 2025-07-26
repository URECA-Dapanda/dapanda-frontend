"use client";

import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import ChatRoomContent from "@/feature/chat/components/sections/room/ChatRoomContent";
import { ChatRoomPreview, useChatStore } from "@feature/chat/stores/useChatStore";

interface ProductInfo {
  productId: number;
  itemId: number;
  title: string;
  pricePer10min: number;
}

export default function ChatRoomPage() {
  const params = useParams();
  const chatRoomId = params?.chatRoomId as string;
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const chatList = useChatStore((state) => state.chatList);
  const [chatRoom, setChatRoom] = useState<ChatRoomPreview | null>(null);

  useEffect(() => {
    if (!chatRoomId) return;

    // chatList에서 먼저 찾기
    const found = chatList.find((c) => String(c.chatRoomId) === String(chatRoomId));
    if (found) {
      setChatRoom(found);
    } else if (chatList.length > 0) {
      console.error(`채팅방을 찾을 수 없습니다.`);
      // 여기서 에러 처리 (404 페이지로 리다이렉트)
    }
  }, [chatRoomId, chatList]);

  useEffect(() => {
    if (productId) {
      axiosInstance.get(`/api/products/wifi/${productId}`).then((res) => {
        setProduct({
          productId: res.data.data.productId,
          itemId: res.data.data.itemId,
          title: res.data.data.title,
          pricePer10min: res.data.data.price,
        });
      });
    }
  }, [productId]);
  console.log("chatList:", chatList);
  console.log("chatRoomId:", chatRoomId);
  console.log("chatRoom:", chatRoom);
  console.log("productId:", productId);
  console.log("senderName:", chatRoom?.senderName ?? "상대방");

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">상품 정보를 불러오는 중...</div>
    );
  }

  return (
    <>
      <ChatRoomContent
        chatRoomId={Number(chatRoomId)}
        itemId={product.itemId}
        title={product.title}
        pricePer10min={product.pricePer10min}
        senderName={chatRoom?.senderName ?? "상대방"}
      />
    </>
  );
}
