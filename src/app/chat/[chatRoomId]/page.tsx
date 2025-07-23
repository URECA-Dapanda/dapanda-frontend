"use client";

import { useEffect, useState } from "react";
import ChatRoomContent from "@/feature/chat/components/sections/room/ChatRoomContent";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { useChatStore } from "@feature/chat/stores/useChatStore";

interface ProductInfo {
  productId: number;
  itemId: number;
  title: string;
  price: string;
}

export default function ChatRoomPage() {
  const params = useParams();
  const chatRoomId = params?.chatRoomId as string;
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const chatList = useChatStore((state) => state.chatList);
  const chatRoom = chatList.find((c) => String(c.chatRoomId) === String(chatRoomId));
  const senderName = chatRoom?.senderName ?? "상대방";

  useEffect(() => {
    if (productId) {
      axiosInstance.get(`/api/products/wifi/${productId}`).then((res) => {
        setProduct({
          productId: res.data.data.productId,
          itemId: res.data.data.itemId,
          title: res.data.data.title,
          price: res.data.data.price,
        });
      });
    }
  }, [productId]);
  console.log("chatList:", chatList);
  console.log("chatRoomId:", chatRoomId);
  console.log("chatRoom:", chatRoom);
  console.log("productId:", productId);
  console.log("senderName:", senderName);

  // if (!productId) return <div className="p-20">잘못된 접근입니다. (productId 없음)</div>;
  if (!product) return <div>로딩중...</div>;
  if (!chatRoom) return <div>채팅방 정보를 불러오는 중...</div>;

  return (
    <>
      <ChatRoomContent
        chatRoomId={Number(chatRoomId)}
        itemId={product.itemId}
        title={product.title}
        price={product.price}
        senderName={senderName}
      />
    </>
  );
}
