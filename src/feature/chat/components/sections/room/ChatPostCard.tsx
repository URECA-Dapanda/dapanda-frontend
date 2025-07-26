"use client";

import Image from "next/image";

interface ChatPostCardProps {
  title: string;
  pricePer10min?: number;
}

export default function ChatPostCard({ title, pricePer10min }: ChatPostCardProps) {
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
        <div className="title-sm text-secondary-600 mt-1">
          {pricePer10min ? `${pricePer10min}원/10분` : ""}
        </div>
      </div>
    </div>
  );
}
