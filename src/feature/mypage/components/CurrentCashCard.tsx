import Image from "next/image";
import FlatCard from "@components/common/card/FlatCard";

interface CurrentCashCardProps {
  isInterection?: boolean;
}

export default function CurrentCashCard({ isInterection }: CurrentCashCardProps) {
  return (
    <FlatCard size={isInterection ? "md" : "xs"}>
      <div className="flex flex-col justify-center h-full gap-y-24">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="body-sm text-gray-500">보유 캐시</span>
            <div className="flex items-end gap-4">
              <span className="title-lg text-gray-900">12,500원</span>
              <button
                className={`body-xs text-gray-500 hover:underline hover:cursor-pointer ${
                  isInterection ? "" : "hidden"
                }`}
              >
                내역 보기 &gt;
              </button>
            </div>
          </div>

          <Image src="/creditIcon.png" alt="₩" className="w-48 h-48" />
        </div>

        {isInterection && (
          <div className="flex gap-8">
            <button className="flex-4 border border-primary text-primary body-sm rounded-6 py-4">
              현금 전환
            </button>
            <button className="flex-4 bg-primary text-white body-sm rounded-6 py-4">
              충전하기
            </button>
          </div>
        )}
      </div>
    </FlatCard>
  );
}
