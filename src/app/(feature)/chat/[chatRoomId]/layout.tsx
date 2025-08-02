import { ReactNode } from "react";

export default function ChatDetailLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full overflow-x-hidden bg-white px-24 pt-safe-top pb-safe-bottom">
      {children}
    </div>
  );
}
