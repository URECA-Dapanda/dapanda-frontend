import FlatCard from "@components/common/card/FlatCard";

interface CurrentCashCardProps {
  isInterection?: boolean;
}

export default function CurrentCashCard({ isInterection }: CurrentCashCardProps) {
  return (
    <FlatCard size={isInterection ? "md" : "xs"}>
      <div className="flex flex-col justify-center h-full gap-y-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">보유 캐시</span>
            <div className="flex items-end gap-1">
              <span className="text-xl font-bold text-gray-900">12,500원</span>
              <button
                className={`text-xs text-gray-500 hover:underline hover:cursor-pointer ${
                  isInterection ? "" : "hidden"
                }`}
              >
                내역 보기 &gt;
              </button>
            </div>
          </div>

          <img src="/creditIcon.png" alt="₩" className="w-12 h-12" />
        </div>

        {isInterection && (
          <div className="flex gap-2">
            <button className="flex-1 border border-pink-500 text-pink-500 text-sm rounded-md py-1">
              현금 전환
            </button>
            <button className="flex-1 bg-pink-500 text-white text-sm rounded-md py-1">
              충전하기
            </button>
          </div>
        )}
      </div>
    </FlatCard>
  );
}
