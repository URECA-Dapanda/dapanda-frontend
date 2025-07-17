import BottomNavigation from "@components/common/navigation/BottomNavigation";
import { Fragment } from "react";

export default function NavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      {children}
      <BottomNavigation />
    </Fragment>
  );
}
