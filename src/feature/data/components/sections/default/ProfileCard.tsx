"use client";

import AvatarIcon from "@/components/common/AvatarIcon";
import { Star } from "lucide-react";

interface ProfileCardProps {
  name: string;
  rating: number;
  reviewCount: number;
}

export default function SellerProfileCard({ name, rating, reviewCount }: ProfileCardProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="w-48 h-48 rounded-full bg-gray-300 overflow-hidden">
        <AvatarIcon size="medium" />
      </div>

      <div className="flex flex-col gap-2 flex-1 pl-16">
        <p className="title-sm">{name}</p>
      </div>

      <div className="flex flex-col items-end justify-center gap-2">
        <div className="flex items-center gap-4">
          <Star className="w-20 h-20 fill-primary text-primary" />
          <span className="title-sm text-black">{rating.toFixed(1)}</span>
        </div>
        <span className="text-gray-500 body-xs">({reviewCount}개의 리뷰)</span>
      </div>
    </div>
  );
}
