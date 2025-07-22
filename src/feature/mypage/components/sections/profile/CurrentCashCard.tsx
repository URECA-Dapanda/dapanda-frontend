import Image from "next/image";
import { ButtonComponent } from "@components/common/button";
import FlatCard from "@components/common/card/FlatCard";
import Link from "next/link";

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

          <Image src="/creditIcon.png" alt="₩" width={48} height={48} />
        </div>

        {isInterection && (
          <div className="flex gap-8">
            <Link href={"mypage/review"}>
              <button className="flex-4 border border-primary text-primary body-sm rounded-6 py-4">
                현금 전환
              </button>
            </Link>
            <Link href="/mypage/charge" className="flex-4">
              <ButtonComponent variant={"primary"} className="w-full">
                충전하기
              </ButtonComponent>
            </Link>
          </div>
        )}
      </div>
    </FlatCard>
  );
}
