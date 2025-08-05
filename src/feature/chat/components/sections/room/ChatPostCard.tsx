"use client";

import Image from "next/image";
import Link from "next/link";

interface ChatPostCardProps {
  title: string;
  pricePer10min?: number;
  productId?: number;
  imageUrls?: string[];
}

export default function ChatPostCard({ title, pricePer10min, productId, imageUrls }: ChatPostCardProps) {
  const imageFile = imageUrls && imageUrls.length > 0 ? imageUrls[0] : "/dpd-main-logo.png";

  const cardContent = (
    <div className="flex border border-primary-200 rounded-20 h-64 px-16 py-8 bg-white cursor-pointer hover:bg-gray-50 transition-colors">
      <Image
        src={imageFile}
        alt={`${title} 이미지`}
        width={40}
        height={40}
        className="object-contain mr-12 shrink-0"
      />
      <div className="flex flex-col justify-center">
        <div className="body-sm text-gray-800">{title}</div>
        <div className="title-sm text-secondary-600 mt-1">
          {pricePer10min ? `${pricePer10min}원/10분` : ""}
        </div>
      </div>
    </div>
  );

  if (productId) {
    return <Link href={`/map/${productId}`}>{cardContent}</Link>;
  }

  return cardContent;
}
