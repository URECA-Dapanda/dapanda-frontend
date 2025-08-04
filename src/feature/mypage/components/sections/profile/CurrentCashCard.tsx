"use client";

import Image from "next/image";
import { ButtonComponent } from "@components/common/button";
import FlatCard from "@components/common/card/FlatCard";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getUserCash } from "@feature/mypage/apis/mypageRequest";
import { formatPriceString } from "@lib/formatters";

interface CurrentCashCardProps {
  isInterection?: boolean;
}

export default function CurrentCashCard({ isInterection }: CurrentCashCardProps) {
  const { data } = useQuery({
    queryFn: getUserCash,
    queryKey: ["/api/members/cash"],
  });

  return (
    <FlatCard size={isInterection ? "md" : "xs"}>
      <div className="flex flex-col justify-center h-full gap-y-24">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="body-sm text-gray-500">보유 캐시</span>
            <div className="flex items-end gap-4">
              <span className="title-lg text-gray-900">
                {data ? formatPriceString(data.cash) : "-원"}
              </span>
            </div>
          </div>

          <Image src="/creditIcon.png" alt="₩" width={48} height={48} />
        </div>
        {isInterection && (
          <div className="flex gap-8">
            <Link href="/mypage/refund" className="flex-4">
              <ButtonComponent
                variant="outlinePrimary"
                className="w-full text-primary border border-primary"
              >
                현금 전환
              </ButtonComponent>
            </Link>
            <Link href="/mypage/charge" className="flex-4">
              <ButtonComponent variant="primary" className="w-full">
                충전하기
              </ButtonComponent>
            </Link>
          </div>
        )}
      </div>
    </FlatCard>
  );
}
