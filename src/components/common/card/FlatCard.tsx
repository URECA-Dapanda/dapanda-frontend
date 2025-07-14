import { PropsWithChildren } from "react";
import CardComponent from "./CardComponent";
import CardContentComponent from "./CardContentComponent";

interface FlatCardProps {
  size: "xl" | "md" | "xs";
}

export default function FlatCard({ size, children }: PropsWithChildren<FlatCardProps>) {
  return (
    <CardComponent
      variant="flat"
      size={size}
      color={`${
        size !== "xl" ? "bg-gradient-to-r from-primary-100 to-[#DCE6FF]" : "bg-primary-50"
      }`}
    >
      <CardContentComponent size={"sm"}>{children}</CardContentComponent>
    </CardComponent>
  );
}
