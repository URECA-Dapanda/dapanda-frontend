"use client";

import { usePathname } from "next/navigation";
import AvatarIcon from "@/components/common/AvatarIcon";
import HeaderTitle from "@/components/common/header/HeaderTitle";
import HeaderCash from "@/components/common/header/HeaderCash";
import HeaderTimer from "@/components/common/header/HeaderTimer";
import TimerModal from "@/feature/map/components/sections/timer/TimerModal";
import EndOfUseModal from "@/feature/map/components/sections/timer/TimerEndModal";
import { useTimerStore } from "@/feature/map/stores/useTimerStore";
import { useHeaderStore } from "@/stores/useHeaderStore";
import { Wifi } from "lucide-react";
import clsx from "clsx";

export default function SharedHeader() {
  const pathname = usePathname();
  const isVisible = useHeaderStore((state) => state.isVisible);
  const { hasEnded, reset } = useTimerStore();
  const isDataPage = pathname.startsWith("/data");

  return (
    <div
      className={clsx(
        "bg-white border-none overflow-x-clip sticky top-0 z-50 transition-opacity duration-300",
        isDataPage && !isVisible && "opacity-0 pointer-events-none",
        "w-[375px] mx-auto"
      )}
    >
      <div className="shadow-header">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center primary-gradient">
              <Wifi className="w-4 h-4 text-black" />
            </div>
            <HeaderTitle />
          </div>
          <div
            className={`flex items-center gap-3 ${
              HeaderCash !== null || AvatarIcon !== null ? "" : "hidden"
            }`}
          >
            <HeaderTimer />
            <HeaderCash />
            <AvatarIcon />
          </div>
        </div>
      </div>
      {hasEnded ? <EndOfUseModal open={hasEnded} onClose={reset} /> : <TimerModal />}
    </div>
  );
}
