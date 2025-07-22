import { Fragment, ReactNode } from "react";
import BottomNavigation from "@components/common/navigation/BottomNavigation";

export default function DataLayout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      {children}
      <BottomNavigation />
    </Fragment>
  );
}
