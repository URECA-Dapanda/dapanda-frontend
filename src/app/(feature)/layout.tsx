import AppHeader from "@components/common/header/AppHeader";
import BottomNavigation from "@components/common/navigation/BottomNavigation";
import { ReactNode, Suspense } from "react";

export default function FeatureLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-[100dvw] lg:w-[600px] mx-auto bg-white flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-1 overflow-y-auto">
        <Suspense>{children}</Suspense>
      </main>
      <BottomNavigation />
    </div>
  );
}
