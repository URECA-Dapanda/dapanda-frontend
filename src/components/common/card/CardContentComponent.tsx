"use client";

import { PropsWithChildren, useMemo } from "react";
import { cn } from "@lib/utils";
import { CardContent } from "@ui/card";

type CardContentSize = "large" | "medium" | "small" | number;

interface CardContentProps {
  size: CardContentSize;
}

export default function CardContentComponent({
  size = "medium",
  children,
}: PropsWithChildren<Partial<CardContentProps>>) {
  const calculatedSize = useMemo(() => {
    switch (size) {
      case "large":
        return "p-8";
      case "medium":
        return "p-6";
      case "small":
        return "p-4";
      default:
        return `p-${size}`;
    }
  }, [size]);
  return <CardContent className={cn(calculatedSize)}>{children}</CardContent>;
}
