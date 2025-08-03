import { useRouter } from "next/navigation";
import AvatarIcon from "@components/common/AvatarIcon";
import { ButtonComponent } from "@components/common/button";
import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "@feature/mypage/apis/mypageRequest";
import { Rating, RatingButton } from "@components/common/rating/RatingScore";
import { toast } from "react-toastify";
import { useCallback } from "react";
import axiosInstance from "@/lib/axios";

interface MapProfileCardProps {
  sellerId: number;
  productId: string;
  isOwner?: boolean;
}

export default function MapProfileCard({ sellerId, productId, isOwner }: MapProfileCardProps) {
  const router = useRouter();

  const { data } = useQuery({
    queryFn: () => getMyInfo(sellerId),
    queryKey: ["api/plans/info", sellerId],
  });

  const goToProfile = () => {
    router.push(`/map/review?id=${sellerId}&tab=review`);
  };

  const goToChat = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isOwner) {
        toast.info("내 게시글입니다");
        return;
      }

      try {
        const response = await axiosInstance.post(`/api/products/${productId}/chat-room`);
        if (response.data.code === 0) {
          const chatRoomId = response.data.data.chatRoomId;
          const memberName = data?.name || "알 수 없음";
          const params = new URLSearchParams({
            productId: productId.toString(),
            memberName: memberName,
            senderId: sellerId.toString(),
          });
          const url = `/chat/${chatRoomId}?${params.toString()}`;
          router.push(url);
        } else {
          toast.error(response.data.message || "채팅방 생성에 실패했습니다.");
        }
      } catch (error) {
        toast.error("채팅방 생성 중 오류가 발생했습니다.");
        console.error(error);
      }
    },
    [productId, router, isOwner]
  );

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
