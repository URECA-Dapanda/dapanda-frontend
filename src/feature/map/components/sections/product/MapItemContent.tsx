import { ProductItemProps } from "@feature/data/types/dataType";
import { MapType } from "@feature/map/types/mapType";
import { ImageIcon, Star } from "lucide-react";
import { Fragment } from "react";

export default function MapItemCardContent({
  data: { address, price, score, title, type },
}: ProductItemProps<MapType>) {
  return (
    <Fragment>
      <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-center mt-[-20]">
        {/* 왼쪽 이미지 */}
        <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
          <ImageIcon />
        </div>

        {/* 가운데 텍스트 */}
        <div className="flex flex-col justify-center">
          <span className="body-md">{title}</span>
          <div className="flex items-center text-yellow-400">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} />
            ))}{" "}
            <span className="body-xs text-black ml-1">({score})</span>
          </div>
          <span className="body-xs text-gray-400">{address}</span>
        </div>

        {/* 오른쪽 요금 */}
        <div className="flex flex-col items-end">
          <span
            className={`${
              type === "와이파이"
                ? "bg-color-bg-primary2 text-color-text-black"
                : "bg-color-bg-secondary2 text-color-text-black"
            } body-xxs rounded-full px-2 py-0.5 mb-1`}
          >
            {type}
          </span>
          <span className="text-pink-600 font-bold body-md">{price}</span>
          <span className="body-xs text-gray-700">10분당</span>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-2 mt-2">
        <button className="bg-pink-600 text-white body-xs rounded-lg px-4 py-2 flex-1">
          이용하기
        </button>
        <button className="border border-gray-300 text-gray-700 body-xs rounded-lg px-4 py-2 flex-1">
          채팅하기
        </button>
      </div>
    </Fragment>
  );
}
