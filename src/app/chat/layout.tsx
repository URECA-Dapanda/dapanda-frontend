import LogoHeader from "@components/common/header/LogoHeader";
import BottomNavigation from "@components/common/navigation/BottomNavigation";
import { ReactNode } from "react";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center w-[375px] h-[100dvh] box-border">
      <LogoHeader />
      <main className="relative antialiased flex-1 min-h-[calc(100dvh-112px)] w-full overflow-y-visible overflow-x-clip bg-white">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
}
