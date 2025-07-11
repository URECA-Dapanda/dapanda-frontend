"use client";

import { useRouter } from "next/navigation";
import InfoCard from "@components/common/card/InfoCard";
import SelectTypeContent from "./SelectTypeContent";
import { WifiIcon } from "lucide-react";
import { useCallback } from "react";

export default function SelectTypeCard() {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/map/regist/hotspot`);
  }, []);
  return (
    <InfoCard handleClick={handleClick}>
      <SelectTypeContent title="핫스팟 등록" description="개인 핫스팟을 공유하세요">
        <WifiIcon />
      </SelectTypeContent>
    </InfoCard>
  );
}
