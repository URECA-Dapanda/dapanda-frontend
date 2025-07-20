import ItemCard from "@components/common/card/ItemCard";
import ProfileWithHistoryCard from "../sections/profile/ProfileWithHistoryCard";
import TabTitle from "../sections/TabTitle";
import ReviewList from "../sections/review/ReviewList";

export default function ReviewPageContent() {
  return (
    <div className="w-full h-full px-24 flex flex-col gap-24 pt-12">
      <ItemCard size="lg">
        <div className="flex w-full h-full flex-col items-center justify-center">
          <ProfileWithHistoryCard />
        </div>
      </ItemCard>
      <ItemCard size="fit">
        <TabTitle listLength={13}>받은 리뷰</TabTitle>
        <ReviewList />
      </ItemCard>
    </div>
  );
}
