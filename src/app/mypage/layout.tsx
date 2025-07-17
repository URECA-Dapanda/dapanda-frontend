import SharedHeader from "@components/common/header/SharedHeader";
import BottomNavigation from "@components/common/navigation/BottomNavigation";
import { ReactNode } from "react";

export default function MyPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[100dvh] w-full">
      <SharedHeader />
      <div className=" flex-1 w-full max-w-4xl p-6">{children}</div>
      <BottomNavigation />
    </div>
  );
}
