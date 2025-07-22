import BottomNavigation from "@components/common/navigation/BottomNavigation";
import { Fragment, ReactNode } from "react";

export default function DataLayout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      {children}
      <BottomNavigation />
    </Fragment>
  );
}
