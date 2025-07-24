import { Fragment, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ImageIcon, Star } from "lucide-react";
import { ButtonComponent } from "@components/common/button";
import type { ProductItemProps } from "@/feature/data/types/dataType";
import type { MapType } from "@/feature/map/types/mapType";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";

export default function MapItemCardContent({
  data: { id, address, price, score, title, type, updatedAt, open },
  disableUseButton = false,
}: ProductItemProps<MapType> & { disableUseButton?: boolean }) {
  const router = useRouter();
  const isDisabled = disableUseButton || !open;
  const handleCreateChatRoom = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      try {
        const response = await axiosInstance.post(`/api/products/${id}/chat-room`);
        if (response.data.code === 0) {
          const chatRoomId = response.data.data.chatRoomId;
          router.push(`/chat/${chatRoomId}?productId=${id}`);
        } else {
          toast.error(response.data.message || "채팅방 생성에 실패했습니다.");
        }
      } catch (error) {
        toast.error("채팅방 생성 중 오류가 발생했습니다.");
        console.error(error);
      }
    },
    [id, router]
  );

  return (
    <Fragment>
      <div className="grid grid-cols-[auto_1fr_auto] gap-16 items-center">
        {/* 왼쪽 이미지 */}
        <div className="w-56 h-56 bg-gray-200 rounded-full flex items-center justify-center">
          <ImageIcon />
        </div>

        {/* 가운데 텍스트 */}
        <div className="flex flex-col justify-center">
          <div className="flex flex-col">
            <span className="body-md">{title}</span>
            <div className="flex items-center gap-8 mt-4">
              <div className="flex items-center text-yellow-400">
                <Star className="fill-current" />
                <span className="body-xs text-black ml-4">({score})</span>
              </div>
              <span className="caption-lg text-gray-500">{updatedAt}</span>
            </div>
          </div>
          <span className="body-xs text-gray-400">{address}</span>
        </div>

        {/* 오른쪽 요금 */}
        <div className="flex flex-col items-end">
          <span
            className={`${
              type === "와이파이" ? "bg-primary2 text-black" : "bg-secondary2 text-black"
            } body-xxs rounded-circle px-8 py-2 mb-4`}
          >
            {type}
          </span>
          <span className="text-primary body-md">{price}</span>
          <span className="body-xs text-gray-700">10분당</span>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-8 mt-8">
        <ButtonComponent
          size="sm"
          variant="primary"
          className="flex-6"
          disabled={isDisabled}
          onClick={() => {
            if (!isDisabled) {
              router.push(`/map/${id}`);
            }
          }}
        >
          이용하기
        </ButtonComponent>
        <ButtonComponent
          size="sm"
          variant="outlineGray"
          className="flex-2"
          onClick={handleCreateChatRoom}
        >
          채팅하기
        </ButtonComponent>
      </div>
    </Fragment>
  );
}
