"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import type { MapType } from "@/feature/map/types/mapType";

// 상품 리스트 fetch
function useProductMap() {
  const [productMap, setProductMap] = useState<Record<number, { title: string; price: string }>>(
    {}
  );
  useEffect(() => {
    async function fetchProducts() {
      const res = await axiosInstance.get("/api/products/wifi", { params: { size: 100 } });
      const map = res.data.data.data.reduce((acc: any, item: MapType) => {
        acc[item.id] = { title: item.title, price: item.price };
        return acc;
      }, {});
      setProductMap(map);
    }
    fetchProducts();
  }, []);
  return productMap;
}

interface ChatPostCardProps {
  title: string;
  price: string;
}

export default function ChatPostCard({ title, price }: ChatPostCardProps) {
  const match = title.match(/(\d+)GB/);
  const imageFile = match ? `/${match[1]}.png` : "/dpd-main-logo.png";

  return (
    <div className="flex border border-primary-200 rounded-20 h-64 px-16 py-8 bg-white">
      <Image
        src={imageFile}
        alt={`${match?.[1]}GB 이미지`}
        width={40}
        height={40}
        className="object-contain mr-12 shrink-0"
      />
      <div className="flex flex-col justify-center">
        <div className="body-sm text-gray-800">{title}</div>
        <div className="title-sm text-secondary-600 mt-1">{price}</div>
      </div>
    </div>
  );
}
