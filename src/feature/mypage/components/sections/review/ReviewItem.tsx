import AvatarIcon from "@components/common/AvatarIcon";
import { ButtonComponent } from "@components/common/button";
import CardComponent from "@components/common/card/CardComponent";
import CardContentComponent from "@components/common/card/CardContentComponent";
import LayoutBox from "@components/common/container/LayoutBox";
import { Rating, RatingButton } from "@components/common/rating/RatingScore";
import { ReviewType } from "@feature/mypage/types/reviewType";

interface ReviewItemProps {
  data: ReviewType;
}

export default function ReviewItem({ data }: ReviewItemProps) {
  return (
    <CardComponent variant="flat" size="sm">
      <CardContentComponent size={"sm"}>
        <LayoutBox layout="flex" direction="row" gap={19}>
          <AvatarIcon size="medium" />
          <LayoutBox layout="flex" direction="column" gap={2}>
            <div className="flex flex-row justify-between">
              <p className="title-sm">{data.reviewerName}</p>
              <Rating defaultValue={data.rating} readOnly value={data.rating}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <RatingButton key={index} className="text-amber-300" />
                ))}
              </Rating>
            </div>
            <p className="body-sm text-gray-700">{data.comment}</p>
            <p className="body-sm text-gray-700">거래상품: {data.itemType}</p>
          </LayoutBox>
        </LayoutBox>
        <ButtonComponent variant={"primary2"} size={"xxs"} className="absolute bottom-12 right-36">
          리뷰 신고하기
        </ButtonComponent>
      </CardContentComponent>
    </CardComponent>
  );
}
