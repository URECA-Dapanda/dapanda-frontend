import { useRouter } from "next/navigation";
import { StarIcon } from "lucide-react";
import AvatarIcon from "@components/common/AvatarIcon";
import { ButtonComponent } from "@components/common/button";

interface MapProfileCardProps {
  productId: string;
  memberName: string;
  rating: number;
  reviewCount: number;
}

export default function MapProfileCard({
  productId,
  memberName,
  rating,
  reviewCount,
}: MapProfileCardProps) {
  const router = useRouter();

  const goToProfile = () => {
    router.push(`/profile?productId=${productId}`);
  };

  const goToChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/chat/${productId}`);
  };

  return (
    <div className="flex items-center justify-between w-full px-24 py-16" onClick={goToProfile}>
      <AvatarIcon size="medium" />

      <div className="flex flex-col gap-4 flex-1 px-16">
        <span className="title-sm text-black">{memberName}</span>
        <div className="flex items-center gap-4">
          <StarIcon className="w-16 h-16 text-primary fill-current" />
          <span className="body-sm text-black">{rating.toFixed(1)}</span>
          <span className="body-xs text-gray-500">({reviewCount}개의 리뷰)</span>
        </div>
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
