import SharedHeader from "@components/common/header/SharedHeader";
import BottomNavigation from "@components/common/navigation/BottomNavigation";
import { ReactNode, Suspense } from "react";

export default function FeatureLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-[100dvw] lg:w-[375px] h-[100dvh] mx-auto bg-white overflow-hidden">
      <SharedHeader />
      <main className="pt-[60px] pb-[64px] h-full overflow-y-auto antialiased">
        <Suspense>{children}</Suspense>
      </main>
      <BottomNavigation />
    </div>
  );
}
