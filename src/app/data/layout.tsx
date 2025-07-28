import { ReactNode } from "react";
import BottomNavigation from "@components/common/navigation/BottomNavigation";
import SharedHeader from "@components/common/header/SharedHeader";

export default function DataLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center w-[375px] h-[100dvh] box-border bg-primary2">
      <SharedHeader />
      <main className="relative antialiased flex-1 min-h-[calc(100dvh-112px)] w-full overflow-y-visible overflow-x-clip bg-white">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
}
