import AppHeader from "@components/common/header/AppHeader";
import BottomNavigation from "@components/common/navigation/BottomNavigation";
import { ReactNode, Suspense } from "react";

export default function FeatureLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-[100dvw] lg:w-[600px] mx-auto bg-white flex flex-col min-h-screen">
      <AppHeader />
      <main className="h-main-safe overflow-y-visible antialiased w-full lg:w-[600px]">
        <Suspense>{children}</Suspense>
      </main>
      <BottomNavigation />
    </div>
  );
}
