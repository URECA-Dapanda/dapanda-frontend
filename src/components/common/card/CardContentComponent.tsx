"use client";

import { cn } from "@lib/utils";
import { CardContent } from "@ui/card";
import { PropsWithChildren, useMemo } from "react";

// type CardContentVariant = "columns" | "rows";
type CardContentSize = "large" | "medium" | "small" | number;

interface CardContentProps {
  //   variant: CardContentVariant;
  size: CardContentSize;
}

export default function CardContentComponent({
  //   variant = "rows",
  size = "medium",
  children,
}: PropsWithChildren<Partial<CardContentProps>>) {
  const calculatedSize = useMemo(() => {
    let value;
    switch (size) {
      case "large":
        value = 8;
      case "medium":
        value = 6;
      case "small":
        value = 4;
      default:
        value = size;
    }
    return `p-${value}`;
  }, [size]);
  return <CardContent className={cn(calculatedSize)}>{children}</CardContent>;
}
