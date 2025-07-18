import AvatarIcon from "@components/common/AvatarIcon";
import { ButtonComponent } from "@components/common/button";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import type { SellerProfile } from "@feature/map/types/sellerType";

interface MapProfileCardProps {
  seller: SellerProfile;
}

export default function MapProfileCard({ seller }: MapProfileCardProps) {
  const router = useRouter();

  const goToProfile = () => {
    router.push(`/profile/${seller.id}`);
  };

  return (
    <div className="flex items-center justify-between w-full px-24 py-16" onClick={goToProfile}>
      <AvatarIcon size="medium" />

      <div className="flex flex-col gap-4 flex-1 px-16">
        <span className="title-sm text-black">{seller.name}</span>
        <div className="flex items-center gap-4">
          <StarIcon className="w-16 h-16 text-primary fill-current" />
          <span className="body-sm text-black">{seller.rating.toFixed(1)}</span>
          <span className="body-xs text-gray-500">({seller.reviewCount}개의 리뷰)</span>
        </div>
      </div>

      <ButtonComponent
        variant="outlineGray"
        size="sm"
        className="px-16 py-8 body-xs whitespace-nowrap"
        onClick={(e) => {
          e.stopPropagation();
          router.push("/chat");
          // router.push(`/chat?sellerId=${seller.id}`);
        }}
      >
        채팅하기
      </ButtonComponent>
    </div>
  );
}
