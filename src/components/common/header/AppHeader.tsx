"use client";
import { PropsWithChildren, useMemo } from "react";
import HeaderTimer from "./HeaderTimer";
import Image from "next/image";
import { cn } from "@lib/utils";
import BackButton from "./BackButton";
import HeaderTitle from "./HeaderTitle";
import { usePathname } from "next/navigation";
import { useHeaderStore } from "@stores/useHeaderStore";

interface AppHeaderProps {
  variant?: string;
}

export default function AppHeader({ children }: PropsWithChildren<AppHeaderProps>) {
  const path = usePathname();
  const isVisible = useHeaderStore((state) => state.isVisible);
  const pathVariant = useMemo(() => {
    const pathLen = path.split("/").length;
    switch (path.split("/").at(1)) {
      case "data":
        return pathLen === 2 ? (!isVisible ? "base" : "normal") : "detail";
      case "map":
      case "mypage":
      case "chat":
        return pathLen === 2 ? "normal" : "detail";
      default:
        return "normal";
    }
  }, [path, isVisible]);

  const defaultItems = useMemo(
    () => (
      <>
        <HeaderTimer />
      </>
    ),
    []
  );
  const headerContent = useMemo(() => {
    switch (pathVariant) {
      case "base":
        return (
          <>
            <Image
              src="/dpd-logo.svg"
              className="absolute top-[-35] left-[-35] z-20"
              alt="logo"
              width={237}
              height={0}
            />
            <Image
              src="/dpd-main-logo.svg"
              className="absolute top-0 right-0 z-20"
              alt="logo"
              width={96}
              height={0}
            />
          </>
        );
      case "detail":
        return (
          <>
            <div className="flex flex-row gap-8 items-center justify-center">
              <BackButton />
              <HeaderTitle />
            </div>

            {defaultItems}
            {children}
          </>
        );
      case "normal":
        return (
          <>
            <Image src={"/dpd-main-logo.svg"} alt="DPD Logo" width={86} height={40} />
            {defaultItems}
            {children}
          </>
        );
    }
  }, [pathVariant]);
  return (
    <header
      className={cn(
        "absolute top-0 flex h-[54px] shrink-0 w-[100dvw] lg:w-[375px] border-none transition-opacity mx-auto flex-row justify-between px-16 items-center overflow-x-clip",
        pathVariant === "base" ? "overflow-y-visible bg-primary2" : "shadow-header bg-white"
      )}
    >
      {headerContent}
    </header>
  );
}
