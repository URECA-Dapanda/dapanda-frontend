import { PropsWithChildren } from "react";
import { CardHeader, CardTitle } from "@ui/card";

interface CardHeaderComponentProp {
  title?: string;
}

export default function CardHeaderComponent({
  title,
  children,
}: PropsWithChildren<CardHeaderComponentProp>) {
  return (
    <CardHeader className={`${!title ? "hidden" : ""}`}>
      <CardTitle>{title}</CardTitle>
      {children}
    </CardHeader>
  );
}
