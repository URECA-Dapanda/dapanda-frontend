import Link from "next/link";
import AvatarIcon from "@components/common/AvatarIcon";
import { Rating, RatingButton } from "@components/common/rating/RatingScore";
import { useQuery } from "@tanstack/react-query";
import { getMyData } from "@feature/mypage/apis/mypageRequest";

export default function ProfileCard() {
  return (
    <Link
      href={{ pathname: "/mypage/review", query: { id: 13, isMine: true, tab: "review" } }}
      className="p-0 w-full"
    >
      <div className="flex flex-row gap-24 w-full items-center justify-between p-16">
        <div className="flex-1 items-center justify-center h-full">
          <AvatarIcon size="medium" />
        </div>
        <div className="flex-4 h-full flex flex-col gap-2">
          <p className="title-sm">김판다</p>
          <p className="body-sm">가입일: 2024.01.15</p>
          <Rating defaultValue={4} readOnly value={4}>
            {Array.from({ length: 5 }).map((_, index) => (
              <RatingButton key={index} className="text-amber-300" />
            ))}
          </Rating>
        </div>
      </div>
    </Link>
  );
}
