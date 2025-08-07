import { MouseEventHandler } from "react";
import AvatarIcon from "@components/common/AvatarIcon";
import { ButtonComponent } from "@components/common/button";
import CardComponent from "@components/common/card/CardComponent";
import CardContentComponent from "@components/common/card/CardContentComponent";
import LayoutBox from "@components/common/container/LayoutBox";
import { Rating, RatingButton } from "@components/common/rating/RatingScore";
import { SkeletonCard } from "@components/common/skeleton";
import { ReviewType } from "@feature/mypage/types/reviewType";
import { cn } from "@lib/utils";

interface ReviewItemProps {
  data?: ReviewType;
  handleClick: MouseEventHandler;
  type?: "post" | "receive";
}

export default function ReviewItem({ data, handleClick, type }: ReviewItemProps) {
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
        <LayoutBox layout="flex" direction="row" width="full" height="full" gap={8}>
          <AvatarIcon size="medium" />
          <LayoutBox layout="flex" direction="column" gap={2} width="full">
            <div className="flex flex-row justify-between gap-12 w-full pr-8">
              <p className="title-sm truncate w-[200px]">
                {data.reviewerName ?? data.revieweeName}
              </p>
              <Rating
                defaultValue={Math.round((data.rating || 0) * 10) / 10}
                readOnly
                value={Math.round((data.rating || 0) * 10) / 10}
              >
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
          className={cn("absolute bottom-20 right-20 caption-md", type === "post" && "hidden")}
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
