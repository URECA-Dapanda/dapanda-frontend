import AvatarIcon from "@components/common/AvatarIcon";
import { ButtonComponent } from "@components/common/button";
import CardComponent from "@components/common/card/CardComponent";
import CardContentComponent from "@components/common/card/CardContentComponent";
import LayoutBox from "@components/common/container/LayoutBox";
import { Rating, RatingButton } from "@components/common/rating/RatingScore";
import { SkeletonCard } from "@components/common/skeleton";
import { ReviewType } from "@feature/mypage/types/reviewType";
import { MouseEventHandler } from "react";

interface ReviewItemProps {
  data?: ReviewType;
  handleClick: MouseEventHandler;
}

export default function ReviewItem({ data, handleClick }: ReviewItemProps) {
  if (!data)
    return (
      <CardComponent variant="outlined" color={"border-gray-200"} size="sm">
        <CardContentComponent size={"sm"}>
          <SkeletonCard />
        </CardContentComponent>
      </CardComponent>
    );
  return (
    <CardComponent variant="outlined" color={"border-gray-200"} size="sm">
      <CardContentComponent size={"sm"}>
        <LayoutBox layout="flex" direction="row" width="fit" gap={8}>
          <AvatarIcon size="medium" />
          <LayoutBox layout="flex" direction="column" gap={2} width="fit">
            <div className="flex flex-row justify-between gap-12 w-[220px]">
              <p className="title-sm truncate">{data.reviewerName}</p>
              <Rating defaultValue={data.rating} readOnly value={data.rating}>
                <RatingButton className="text-primary" />
              </Rating>
            </div>
            <p className="body-sm text-gray-700 truncate w-[220px]">{data.comment}</p>
            <p className="body-sm text-gray-700 truncate w-[220px]">거래상품: {data.itemType}</p>
          </LayoutBox>
        </LayoutBox>
        <ButtonComponent
          variant={"primary2"}
          size={"xxs"}
          className="absolute bottom-12 right-20 caption-md"
          onClick={handleClick}
          value={data.reviewId}
          data-name={data.reviewerName}
        >
          리뷰 신고하기
        </ButtonComponent>
      </CardContentComponent>
    </CardComponent>
  );
}
