import ProfileWithHistoryCard from "../sections/profile/ProfileWithHistoryCard";
import ReviewCard from "../sections/review/ReviewCard";
import CardComponent from "@components/common/card/CardComponent";

export default function ReviewPageContent() {
  return (
    <div className="reviewPageContainer w-full h-full flex flex-col gap-24 pt-12">
      <div className="px-24">
        <CardComponent size="lg" variant="material">
          <div className="flex w-full h-full flex-col justify-center">
            <ProfileWithHistoryCard />
          </div>
        </CardComponent>
      </div>
      <ReviewCard />
    </div>
  );
}
