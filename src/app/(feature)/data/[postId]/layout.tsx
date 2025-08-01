import { ReactNode } from "react";

export default function DataLayout({ children }: { children: ReactNode }) {
  return <div className="relative h-[100vh] w-full overflow-x-hidden bg-white">{children}</div>;
}
