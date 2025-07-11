"use client";

import InfoCard from "@components/common/card/InfoCard";
import { ContentInfoType } from "@feature/chat/types/contentType";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface ContentsInfoCardProps {
  data: ContentInfoType;
}

export default function ContentInfoCard({ data: { id, price, title } }: ContentsInfoCardProps) {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/data/${id}`);
  }, [id]);

  return (
    <InfoCard handleClick={handleClick}>
      <div className="flex items-center mt-[-25]  gap-x-4">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
          {/* something */}
        </div>
        <div className="flex flex-col justify-center">
          <span className="body-sm text-black">{title}</span>
          <span className="title-sm text-color-secondary-600">{price}</span>
        </div>
      </div>
    </InfoCard>
  );
}
