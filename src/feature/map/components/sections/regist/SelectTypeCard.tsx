"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { WifiIcon, RouterIcon } from "lucide-react";
import InfoCard from "@components/common/card/InfoCard";
import SelectTypeContent from "@/feature/map/components/sections/regist/SelectTypeContent";

export default function SelectTypeCard() {
  const router = useRouter();

  const goToHotspot = useCallback(() => {
    router.push(`/map/regist/hotspot`);
  }, []);

  const goToWifi = useCallback(() => {
    router.push(`/map/regist/wifi`);
  }, []);

  return (
    <div className="flex flex-col gap-16">
      {/* 핫스팟 등록 카드 */}
      <InfoCard handleClick={goToHotspot}>
        <SelectTypeContent title="핫스팟 등록" description="개인 핫스팟을 공유하세요">
          <RouterIcon />
        </SelectTypeContent>
      </InfoCard>

      {/* 와이파이 등록 카드 */}
      <InfoCard handleClick={goToWifi}>
        <SelectTypeContent title="와이파이 등록" description="공공 와이파이를 등록하세요">
          <WifiIcon />
        </SelectTypeContent>
      </InfoCard>
    </div>
  );
}
