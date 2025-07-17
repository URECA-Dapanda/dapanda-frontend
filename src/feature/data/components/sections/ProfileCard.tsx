"use client";

import AvatarIcon from "@/components/common/AvatarIcon";
import { Star } from "lucide-react";

interface ProfileCardProps {
  name: string;
  joinDate: string;
  //rating: number;
  reviewCount: number;
}

export default function ProfileCard({ name, joinDate, reviewCount }: ProfileCardProps) {
  return (
    <div className="flex items-center justify-between w-full p-16">
      <div className="w-48 h-48 rounded-full bg-gray-300 overflow-hidden">
        <AvatarIcon size="medium" />
      </div>

      <div className="flex flex-col gap-2 flex-1 pl-16">
        <p className="title-sm">{name}</p>
        <p className="body-sm text-gray-500">가입일: {joinDate}</p>
      </div>

      <div className="flex flex-col items-end justify-center">
        <Star className="w-20 h-20 text-primary" />
        <span className="text-gray-500 body-xs mt-2">({reviewCount}개의 리뷰)</span>
      </div>
    </div>
  );
}
