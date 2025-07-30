import AppHeader from "@components/common/header/AppHeader";
import BottomNavigation from "@components/common/navigation/BottomNavigation";
import { ReactNode, Suspense } from "react";

export default function FeatureLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center w-[100dvw] lg:w-[375px] h-[100vh] box-border">
      <AppHeader />
      <main className="relative antialiased flex-1 min-h-[calc(100vh-112px)] w-full overflow-y-scroll overflow-x-clip bg-white">
        <Suspense>{children}</Suspense>
      </main>
      <BottomNavigation />
    </div>
  );
}
