import { PropsWithChildren } from "react";
import { CardHeader, CardTitle } from "@ui/card";
import { PartialTitleProps } from "@type/CommonComponent";


export default function CardHeaderComponent({
  title,
  children,
}: PropsWithChildren<PartialTitleProps>) {
  return (
    <CardHeader className={`${!title ? "hidden" : ""}`}>
      <CardTitle>{title}</CardTitle>
      {children}
    </CardHeader>
  );
}
