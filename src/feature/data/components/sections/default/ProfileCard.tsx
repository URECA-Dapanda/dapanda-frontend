"use client";

import AvatarIcon from "@/components/common/AvatarIcon";
import { Rating, RatingButton } from "@components/common/rating/RatingScore";
import { getMyInfo } from "@feature/mypage/apis/mypageRequest";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface SellerProfileCardProps {
  sellerId: number;
}

export default function SellerProfileCard({ sellerId }: SellerProfileCardProps) {
  const { data } = useQuery({
    queryFn: () => getMyInfo(sellerId),
    queryKey: ["api/plans/info", sellerId],
  });
  return (
    <Link
      href={`/data/review?id=${sellerId}&tab=review`}
      className="flex items-center justify-between mx-24"
    >
      <div className="w-48 h-48 rounded-full bg-gray-300 overflow-hidden">
        <AvatarIcon size="medium" avatar={data?.profileImageUrl ?? undefined} />
      </div>

      <div className="flex flex-col gap-2 flex-1 pl-16">
        <p className="title-sm">{data?.name ?? "알 수 없음"}</p>
      </div>

      <div className="flex flex-col items-end justify-center gap-2">
        <Rating readOnly value={data?.averageRating}>
          <RatingButton className="text-primary" />
        </Rating>
        <span className="text-gray-500 body-xs">({data?.reviewCount ?? 0}개의 리뷰)</span>
      </div>
    </Link>
  );
}
