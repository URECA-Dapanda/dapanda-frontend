import CardComponent from "./CardComponent";
import CardContentComponent from "./CardContentComponent";
import { MouseEventHandler, PropsWithChildren } from "react";

interface ItemCardProps {
  handleClick?: MouseEventHandler;
}

export default function ItemCard({ handleClick, children }: PropsWithChildren<ItemCardProps>) {
  return (
    <div onClick={handleClick} className={`${handleClick ? "hover:cursor-pointer" : ""}`}>
      <CardComponent variant="material" size="sm">
        <CardContentComponent size={"sm"}>{children}</CardContentComponent>
      </CardComponent>
    </div>
  );
}
