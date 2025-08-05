"use client";

import Image from "next/image";
import Link from "next/link";

interface ChatPostCardProps {
  title: string;
  pricePer10min?: number;
  productId?: number;
  imageUrls?: string[];
}

export default function ChatPostCard({
  title,
  pricePer10min,
  productId,
  imageUrls,
}: ChatPostCardProps) {
  const imageFile = imageUrls && imageUrls.length > 0 ? imageUrls[0] : "/dpd-main-logo.png";

  const cardContent = (
    <div className="flex border border-primary-200 rounded-20 h-64 px-16 py-8 bg-white cursor-pointer hover:bg-gray-50 transition-colors">
      <div className="relative w-40 h-40 mr-12 shrink-0">
        <Image
          src={imageFile}
          alt={`${title} 이미지`}
          fill
          className="object-contain"
          priority={false}
          placeholder="blur"
          blurDataURL={imageFile}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/dpd-main-logo.png";
          }}
        />
      </div>
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <div className="body-sm text-gray-800 truncate">{title}</div>
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
