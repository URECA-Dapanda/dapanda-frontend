import { Fragment } from "react";
import { useRouter } from "next/navigation";
import { ImageIcon, Star } from "lucide-react";
import type { ProductItemProps } from "@/feature/data/types/dataType";
import type { MapType } from "@/feature/map/types/mapType";

export default function MapItemCardContent({
  data: { id, address, price, score, title, type, updatedAt },
}: ProductItemProps<MapType>) {
  const router = useRouter();
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
            <span className="caption-md text-gray-500">{updatedAt}</span>
          </div>
          <div className="flex items-center text-yellow-400">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} />
            ))}{" "}
            <span className="body-xs text-black ml-4">({score})</span>
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
        <button className="bg-primary text-white body-xs rounded-6 px-16 py-8 flex-6">
          이용하기
        </button>
        <button
          className="border border-gray-300 text-gray-700 body-xs rounded-6 px-16 py-8 flex-2"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/chat/${id}`);
          }}
        >
          채팅하기
        </button>
      </div>
    </Fragment>
  );
}
