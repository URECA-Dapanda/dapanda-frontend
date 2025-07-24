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
  price: string;
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
    } else {
      // 없으면 직접 fetch
      axiosInstance
        .get(`/api/chat-room/${chatRoomId}`)
        .then((res) => {
          setChatRoom({
            chatRoomId: res.data.data.id,
            productId: res.data.data.itemId,
            title: res.data.data.title,
            price: res.data.data.price,
            senderName: res.data.data.senderName,
            name: res.data.data.senderName,
            lastMessage: res.data.data.lastMessage ?? "",
            updatedAt: res.data.data.updatedAt ?? "",
            itemId: res.data.data.itemId,
          });
        })
        .catch((err) => {
          console.error("chat content info fetch error:", err);
        });
    }
  }, [chatRoomId, chatList]);

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
  console.log("senderName:", chatRoom?.senderName ?? "상대방");

  if (!product) return null;

  return (
    <>
      <ChatRoomContent
        chatRoomId={Number(chatRoomId)}
        itemId={product.itemId}
        title={product.title}
        price={product.price}
        senderName={chatRoom?.senderName ?? "상대방"}
      />
    </>
  );
}
