import { ReactNode } from "react";

export default function MypageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full lg:w-[600px] h-main-safe pt-safe-top pb-safe-bottom overflow-y-auto">
      {children}
    </div>
  );
}
