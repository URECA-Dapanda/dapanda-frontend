"use client";

import { Wifi } from "lucide-react";
import HeaderTitle from "./HeaderTitle";
import HeaderCash from "./HeaderCash";
import AvatarIcon from "../AvatarIcon";
import { usePathname } from "next/navigation";
import { useHeaderStore } from "@/stores/useHeaderStore";
import clsx from "clsx";

export default function SharedHeader() {
  const pathname = usePathname();
  const isVisible = useHeaderStore((state) => state.isVisible);

  const isDataPage = pathname.startsWith("/data");

  return (
    <div
      className={clsx(
        "bg-white border-none overflow-x-clip sticky top-0 z-50 transition-opacity duration-300",
        isDataPage && !isVisible && "opacity-0 pointer-events-none"
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
            <HeaderCash />
            <AvatarIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
