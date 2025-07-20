import SharedHeader from "@components/common/header/SharedHeader";
import BottomNavigation from "@components/common/navigation/BottomNavigation";
import { ReactNode } from "react";

export default function DataLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden overflow-y-auto">
      <SharedHeader />
      {children}
      <BottomNavigation />
    </div>
  );
}
