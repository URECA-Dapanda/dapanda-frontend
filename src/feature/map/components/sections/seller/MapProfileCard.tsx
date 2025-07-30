import { useRouter } from "next/navigation";
import AvatarIcon from "@components/common/AvatarIcon";
import { ButtonComponent } from "@components/common/button";
import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "@feature/mypage/apis/mypageRequest";
import { Rating, RatingButton } from "@components/common/rating/RatingScore";

interface MapProfileCardProps {
  sellerId: number;
  productId: string;
}

export default function MapProfileCard({ sellerId, productId }: MapProfileCardProps) {
  const router = useRouter();

  const { data } = useQuery({
    queryFn: () => getMyInfo(sellerId),
    queryKey: ["api/plans/info", sellerId],
  });

  const goToProfile = () => {
    router.push(`/map/review?id=${sellerId}&tab=review`);
  };

  const goToChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/chat/${productId}`);
  };

  return (
    <div
      className="flex items-center justify-between w-full px-24 py-16 cursor-pointer"
      onClick={goToProfile}
    >
      <AvatarIcon size="medium" avatar={data?.profileImageUrl ?? undefined} />

      <div className="flex flex-col gap-4 flex-1 px-16">
        <span className="title-sm text-black">{data?.name ?? "알 수 없음"}</span>
        <Rating readOnly value={data?.averageRating} defaultValue={data?.averageRating}>
          <RatingButton className="text-primary" />
        </Rating>
      </div>

      <ButtonComponent
        variant="outlineGray"
        size="sm"
        className="px-16 py-8 body-xs whitespace-nowrap"
        onClick={goToChat}
      >
        채팅하기
      </ButtonComponent>
    </div>
  );
}
