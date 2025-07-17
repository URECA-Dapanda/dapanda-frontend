import SharedHeader from "@components/common/header/SharedHeader";
import { ReactNode } from "react";

export default function MapLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <SharedHeader />
      </header>
      <main className="pt-[56px]">{children}</main>
    </>
  );
}
