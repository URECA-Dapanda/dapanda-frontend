import AppHeader from "@components/common/header/AppHeader";
import BottomNavigation from "@components/common/navigation/BottomNavigation";
import { ReactNode, Suspense } from "react";

export default function FeatureLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-[100dvw] lg:w-[600px] overflow-hidden mx-auto bg-white flex flex-col">
      <AppHeader id="appHead" />
      <main className="h-main-safe overflow-y-visible antialiased w-full lg:w-[600px]">
        <Suspense>{children}</Suspense>
      </main>
      <BottomNavigation id="appFooter" />
    </div>
  );
}
