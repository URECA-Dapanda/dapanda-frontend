"use client";
import { PropsWithChildren, useMemo, Suspense } from "react";
import HeaderTimer from "./HeaderTimer";
import Image from "next/image";
import { cn } from "@lib/utils";
import BackButton from "./BackButton";
import HeaderTitle from "./HeaderTitle";
import { usePathname, useSearchParams } from "next/navigation";
import { useHeaderStore } from "@stores/useHeaderStore";
import { MoreVertical } from "lucide-react";
import { UserDropdownMenu } from "@/components/common/dropdown/UserDropdownMenu";
import { chatMenuOptions } from "@/components/common/dropdown/dropdownConfig";
import ReportModal from "@/components/common/modal/ReportModal";
import { useState } from "react";
import NotificationIcon from "@components/common/NotificationIcon";

interface AppHeaderProps {
  id?: string;
  variant?: string;
}

function AppHeaderContent({ id, children }: PropsWithChildren<AppHeaderProps>) {
  const path = usePathname();
  const isVisible = useHeaderStore((state) => state.isVisible);
  const searchParams = useSearchParams();
  const senderId = searchParams.get("senderId");
  const senderName = searchParams.get("senderName") || "상대방";
  const [isReportOpen, setIsReportOpen] = useState(false);
  const pathVariant = useMemo(() => {
    const pathLen = path.split("/").length;
    switch (path.split("/").at(1)) {
      case "data":
        return pathLen === 2 ? (!isVisible ? "base" : "normal") : "detail";
      case "map":
      case "mypage":
        return pathLen === 2 ? "normal" : "detail";
      case "chat":
        return pathLen === 2 ? "normal" : "chatDetail";
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
      case "chatDetail":
        return (
          <>
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <BackButton />
              <HeaderTitle />
            </div>
            <div className="flex items-center gap-2">
              <UserDropdownMenu
                options={chatMenuOptions(
                  () => setIsReportOpen(true),
                  senderId ? parseInt(senderId) : undefined
                )}
              >
                <button className="p-2">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </UserDropdownMenu>
            </div>
          </>
        );
    }
  }, [pathVariant]);
  return (
    <header
      id={id}
      className={cn(
        "fixed top-0 z-20 flex h-[54px] shrink-0 w-[100dvw] lg:w-[600px] border-none transition-opacity mx-auto flex-row justify-between px-16 items-center overflow-x-clip",
        pathVariant === "base" ? "bg-transparent" : "shadow-header bg-white"
      )}
    >
      {headerContent}
      {pathVariant === "chatDetail" && (
        <ReportModal isOpen={isReportOpen} setIsOpen={setIsReportOpen} targetName={senderName} />
      )}
    </header>
  );
}

export default function AppHeader(props: PropsWithChildren<AppHeaderProps>) {
  return (
    <Suspense
      fallback={
        <div className="fixed top-0 z-50 flex h-[54px] shrink-0 w-[100dvw] lg:w-[375px] border-none transition-opacity mx-auto flex-row justify-between px-16 items-center overflow-x-clip shadow-header bg-white" />
      }
    >
      <AppHeaderContent {...props} />
    </Suspense>
  );
}
