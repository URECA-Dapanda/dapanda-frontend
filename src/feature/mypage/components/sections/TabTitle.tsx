import { PropsWithChildren } from "react";
import { BadgeComponent } from "@components/common/badge";

interface TabTitleProps {
  listLength: number;
}
export default function TabTitle({ listLength, children }: PropsWithChildren<TabTitleProps>) {
  return (
    <div className="flex flex-row justify-between px-24 my-8 shrink-0">
      <p className="title-md">{children}</p>
      <BadgeComponent variant={"count"}>{listLength} 개</BadgeComponent>
    </div>
  );
}
