"use client";
import { PropsWithChildren, useMemo } from "react";
import HeaderTimer from "./HeaderTimer";
import Image from "next/image";
import { cn } from "@lib/utils";
import BackButton from "@components/common/header/BackButton";
import HeaderTitle from "@components/common/header/HeaderTitle";
import { usePathname } from "next/navigation";
import { useHeaderStore } from "@stores/useHeaderStore";
import NotificationIcon from "@components/common/NotificationIcon";

interface AppHeaderProps {
  id?: string;
  variant?: string;
}

export default function AppHeader({ id, children }: PropsWithChildren<AppHeaderProps>) {
  const path = usePathname();
  const isVisible = useHeaderStore((state) => state.isVisible);
  const pathVariant = useMemo(() => {
    const pathLen = path.split("/").length;
    switch (path.split("/").at(1)) {
      case "data":
        return pathLen === 2 ? (!isVisible ? "base" : "normal") : "detail";
      case "map":
      case "mypage":
        return pathLen === 2 ? "normal" : "detail";
      case "chat":
        return pathLen === 2 ? "normal" : "hidden";
      default:
        return "normal";
    }
  }, [path, isVisible]);

  const defaultItems = useMemo(
    () => (
      <>
        <HeaderTimer />
        <NotificationIcon />
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
              src="/dpd-main-logo.svg"
              className="absolute top-0 right-0"
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
      case "hidden":
        return null;
    }
  }, [pathVariant]);
  return (
    <header
      id={id}
      className={cn(
        "fixed top-0 z-20 flex h-[54px] shrink-0 w-[100dvw] lg:w-[375px] border-none transition-opacity mx-auto flex-row justify-between px-16 items-center overflow-x-clip",
        pathVariant === "base" ? "bg-transparent" : "shadow-header bg-white"
      )}
    >
      {headerContent}
    </header>
  );
}
