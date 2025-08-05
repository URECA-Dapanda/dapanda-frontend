import ProfileWithHistoryCard from "@feature/mypage/components/sections/profile/ProfileWithHistoryCard";
import ReviewCard from "@feature/mypage/components/sections/review/ReviewCard";
import CardComponent from "@components/common/card/CardComponent";

export default function ReviewPageContent() {
  return (
    <div
      className={`
        reviewPageContainer w-full h-full flex flex-col gap-24
        pt-[calc(54px+env(safe-area-inset-top,0px))]
        pb-[calc(55px+env(safe-area-inset-bottom,0px))]
      `}
    >
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
