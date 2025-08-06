"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import AvatarIcon from "@components/common/AvatarIcon";
import LayoutBox from "@components/common/container/LayoutBox";
import { Rating, RatingButton } from "@components/common/rating/RatingScore";
import { BadgeComponent } from "@components/common/badge";
import { getMyInfo } from "@feature/mypage/apis/mypageRequest";

export default function ProfileWithHistoryCard() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data } = useQuery({
    queryFn: () => getMyInfo(id !== null ? id : undefined),
    queryKey: ["api/plans/info", id],
  });

  return (
    <div className="p-24">
      <LayoutBox layout="flex" direction="row" gap={19}>
        <AvatarIcon size="medium" avatar={data?.profileImageUrl ?? undefined} />
        <LayoutBox layout="flex" direction="column" gap={8}>
          <div className="flex flex-row justify-start gap-12">
            <p className="title-sm">{data?.name ?? "알 수 없음"}</p>
            <Rating defaultValue={data?.averageRating} readOnly value={data?.averageRating}>
              <RatingButton className="text-primary" />
            </Rating>
          </div>
          <div className="flex flex-row justify-start gap-12">
            <BadgeComponent className="body-sm bg-primary2">
              거래 {data?.tradeCount ?? "0"}회
            </BadgeComponent>
            <p className="body-sm text-gray-600">({data?.reviewCount ?? 0}개의 리뷰)</p>
          </div>
        </LayoutBox>
      </LayoutBox>
    </div>
  );
}
