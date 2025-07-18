import SharedHeader from "@components/common/header/SharedHeader";
import BottomNavigation from "@components/common/navigation/BottomNavigation";
import { ReactNode } from "react";

export default function DataLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[100dvh] w-full">
      <SharedHeader />
      {children}
      <BottomNavigation />
    </div>
  );
}
