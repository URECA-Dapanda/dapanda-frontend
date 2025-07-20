import ItemCard from "@components/common/card/ItemCard";
import ProfileWithHistoryCard from "../sections/profile/ProfileWithHistoryCard";
import ReviewCard from "../sections/review/ReviewCard";

export default function ReviewPageContent() {
  return (
    <div className="reviewPageContainer w-full h-full px-24 flex flex-col gap-24 pt-12">
      <ItemCard size="lg">
        <div className="flex w-full h-full flex-col items-center justify-center">
          <ProfileWithHistoryCard />
        </div>
      </ItemCard>
      <ReviewCard />
    </div>
  );
}
