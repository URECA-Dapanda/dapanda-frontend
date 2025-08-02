import { PropsWithChildren } from "react";
import CardComponent from "./CardComponent";
import CardContentComponent from "./CardContentComponent";

interface FlatCardProps {
  size: "xl" | "xxl" | "md" | "xs";
  color?: string;
}

export default function FlatCard({ color, size, children }: PropsWithChildren<FlatCardProps>) {
  return (
    <CardComponent
      variant="flat"
      size={size}
      color={`${
        color ??
        (size !== "xxl" && size !== "xl" && size !== "md"
          ? "bg-gradient-to-r from-primary-100 to-[#DCE6FF]"
          : "bg-primary2")
      }`}
    >
      <CardContentComponent size={"fit"}>{children}</CardContentComponent>
    </CardComponent>
  );
}
