"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { WifiIcon, RouterIcon } from "lucide-react";
import InfoCard from "@components/common/card/InfoCard";
import SelectTypeContent from "@/feature/map/components/sections/regist/SelectTypeContent";
import { cn } from "@/lib/utils";

export default function SelectTypeCard() {
  const router = useRouter();

  // const goToHotspot = useCallback(() => {
  //   router.push(`/map/regist/hotspot`);
  // }, []);

  const goToWifi = useCallback(() => {
    router.push(`/map/regist/wifi`);
  }, []);

  return (
    <div className="flex flex-col gap-16">
      {/* 핫스팟 등록 카드 (비활성화 상태) */}
      <div className={cn("transition-opacity", "opacity-50 pointer-events-none")}>
        <InfoCard handleClick={() => {}}>
          <SelectTypeContent title="핫스팟 등록" description="준비 중입니다.">
            <RouterIcon />
          </SelectTypeContent>
        </InfoCard>
      </div>

      {/* 와이파이 등록 카드 */}
      <InfoCard handleClick={goToWifi}>
        <SelectTypeContent title="와이파이 등록" description="공공 와이파이를 등록하세요">
          <WifiIcon />
        </SelectTypeContent>
      </InfoCard>
    </div>
  );
}
