import AvatarIcon from "@components/common/AvatarIcon";
import LayoutBox from "@components/common/container/LayoutBox";
import { Rating, RatingButton } from "@components/common/rating/RatingScore";

export default function ProfileWithHistoryCard() {
  return (
    <LayoutBox layout="flex" direction="row" gap={19}>
      <AvatarIcon size="medium" />
      <LayoutBox layout="flex" direction="column" gap={2}>
        <p className="title-sm">김판다</p>
        <Rating defaultValue={4} readOnly total={3} value={4}>
          <RatingButton className="text-amber-300" />
        </Rating>
        <p className="body-sm text-gray-700">거래: {3}회</p>
      </LayoutBox>
    </LayoutBox>
  );
}
