import { MouseEventHandler, PropsWithChildren } from "react";
import CardComponent from "@components/common/card/CardComponent";
import CardContentComponent from "@components/common/card/CardContentComponent";

interface ItemCardProps {
  handleClick?: MouseEventHandler;
}

export default function InfoCard({ handleClick, children }: PropsWithChildren<ItemCardProps>) {
  return (
    <div onClick={handleClick} className={`${handleClick ? "hover:cursor-pointer" : ""}`}>
      <CardComponent variant="outlined" size="xs" color={"border-primary"}>
        <CardContentComponent size={"sm"}>{children}</CardContentComponent>
      </CardComponent>
    </div>
  );
}
