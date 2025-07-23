"use client";

import { useEffect, useState } from "react";
import ChatRoomContent from "@/feature/chat/components/sections/room/ChatRoomContent";
import { useParams } from "next/navigation";
// import { useSearchParams } from "next/navigation";
// import axiosInstance from "@/lib/axios";

interface ProductInfo {
  productId: number;
  itemId: number;
  title: string;
  price: string;
}

export default function ChatRoomPage() {
  const params = useParams();
  const chatRoomId = params?.chatRoomId as string;
  // const searchParams = useSearchParams();
  // const productId = searchParams.get("productId");
  const [product, setProduct] = useState<ProductInfo | null>(null);

  // 임시로 productId가 13일 때 하드코딩
  useEffect(() => {
    setProduct({
      itemId: 3,
      productId: 13,
      title: "임시 상품명",
      price: "10000",
    });
  }, []);

  /*  useEffect(() => {
    if (productId) {
      axiosInstance.get(`/api/products/${productId}`).then((res) => {
        setProduct({
          itemId: res.data.data.itemId,
          title: res.data.data.title,
          price: res.data.data.price,
        });
      });
    }
  }, [productId]);
  */

  // if (!productId) return <div className="p-20">잘못된 접근입니다. (productId 없음)</div>;
  if (!product) return <div>로딩중...</div>;

  return (
    <>
      <ChatRoomContent
        chatRoomId={Number(chatRoomId)}
        itemId={product.itemId}
        title={product.title}
        price={product.price}
      />
    </>
  );
}
