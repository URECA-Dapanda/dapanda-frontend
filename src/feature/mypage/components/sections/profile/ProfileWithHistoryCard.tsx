"use client";

import { useSearchParams } from "next/navigation";
import AvatarIcon from "@components/common/AvatarIcon";
import LayoutBox from "@components/common/container/LayoutBox";
import { Rating, RatingButton } from "@components/common/rating/RatingScore";
import { BadgeComponent } from "@components/common/badge";

export default function ProfileWithHistoryCard() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  console.log("id : ", id, " 프로필");

  return (
    <div className="p-24">
      <LayoutBox layout="flex" direction="row" gap={19}>
        <AvatarIcon size="medium" />
        <LayoutBox layout="flex" direction="column" gap={8}>
          <div className="flex flex-row justify-start gap-12">
            <p className="title-sm">김판다</p>
            <Rating defaultValue={4} readOnly value={4}>
              <RatingButton className="text-primary" />
            </Rating>
          </div>
          <div className="flex flex-row justify-start gap-12">
            <BadgeComponent className="body-sm bg-primary2">거래 {3}회</BadgeComponent>
            <p className="body-sm text-gray-600">({3}개의 리뷰)</p>
          </div>
        </LayoutBox>
      </LayoutBox>
    </div>
  );
}
