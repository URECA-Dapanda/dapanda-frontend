import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "@feature/mypage/apis/mypageRequest";
import AvatarUploader from "@feature/mypage/components/sections/profile/AvatarUploader";
import { Rating, RatingButton } from "@components/common/rating/RatingScore";
import { UserType } from "@type/User";

export default function ProfileCard() {
  const { data } = useQuery<UserType>({
    queryKey: ["/api/members/info"],
    queryFn: () => getMyInfo(),
  });

  return (
    <div className="flex flex-row gap-24 w-full items-center justify-between p-16">
      <div className="flex-1 items-center justify-center h-full">
        <AvatarUploader avatarUrl={data?.profileImageUrl} />
      </div>

      <Link
        href={{ pathname: "/mypage/review", query: { isMine: true, tab: "review" } }}
        className="flex-4 h-full flex flex-col gap-2"
      >
        <p className="title-sm text-black">{data?.name ?? "-"}</p>
        <p className="body-sm text-gray-500">가입일: {data?.joinedAt ?? "-"}</p>
        <Rating
          defaultValue={Math.round((data?.averageRating || 0) * 10) / 10}
          readOnly
          value={Math.round((data?.averageRating || 0) * 10) / 10}
        >
          <RatingButton className="text-primary" />
        </Rating>
      </Link>
    </div>
  );
}
