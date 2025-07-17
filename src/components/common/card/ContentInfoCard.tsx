"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import InfoCard from "@components/common/card/InfoCard";
import { ContentInfoType } from "@feature/chat/types/contentType";

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
      <div className="flex items-center gap-x-16">
        <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center"></div>
        <div className="flex flex-col justify-center">
          <span className="body-sm text-black">{title}</span>
          <span className="title-sm text-secondary-600">{price}</span>
        </div>
      </div>
    </InfoCard>
  );
}
