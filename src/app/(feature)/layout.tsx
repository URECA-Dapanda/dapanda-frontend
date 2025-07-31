import AppHeader from "@components/common/header/AppHeader";
import BottomNavigation from "@components/common/navigation/BottomNavigation";
import { ReactNode, Suspense } from "react";

export default function FeatureLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-[100dvw] lg:w-[375px] mx-auto bg-white overflow-hidden flex flex-col">
      <AppHeader id="appHead" />
      <main className="h-main-safe overflow-y-auto antialiased">
        <Suspense>{children}</Suspense>
      </main>
      <BottomNavigation id="appFooter" />
    </div>
  );
}
