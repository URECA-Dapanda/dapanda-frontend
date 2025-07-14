"use client";

import { PropsWithChildren, useMemo } from "react";
import { CardContent } from "@ui/card";

import { cn } from "@lib/utils";

type CardContentSize = "lg" | "md" | "sm" | number;

interface CardContentProps {
  size: CardContentSize;
}

export default function CardContentComponent({
  size = "md",
  children,
}: PropsWithChildren<Partial<CardContentProps>>) {
  const calculatedSize = useMemo(() => {
    switch (size) {
      case "lg":
        return "p-8";
      case "md":
        return "p-6";
      case "sm":
        return "p-4";
      default:
        return `p-${size}`;
    }
  }, [size]);
  return <CardContent className={cn(calculatedSize, "h-full")}>{children}</CardContent>;
}
