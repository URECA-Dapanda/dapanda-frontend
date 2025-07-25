import Link from "next/link";
import AvatarIcon from "@components/common/AvatarIcon";
import { Rating, RatingButton } from "@components/common/rating/RatingScore";
import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "@feature/mypage/apis/mypageRequest";
import { UserType } from "@type/User";

export default function ProfileCard() {
  const { data } = useQuery<UserType>({
    queryKey: ["/api/members/info"],
    queryFn: getMyInfo,
  });

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
          <p className="title-sm text-black">{data?.name ?? "-"}</p>
          <p className="body-sm text-gray-500">가입일: {data?.joinedAt ?? "-"}</p>
          <Rating defaultValue={data?.averageRating} readOnly value={data?.averageRating}>
            <RatingButton className="text-amber-300" />
          </Rating>
        </div>
      </div>
    </Link>
  );
}
