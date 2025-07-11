"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { badgeVariants } from "./badgeVariants";
import type { BadgeProps } from "./badge.types";
import { Badge } from "@ui/badge";

export function BadgeComponent({ className, variant, ...props }: BadgeProps) {
  return (
    <Badge data-slot="badge" className={cn(className, badgeVariants({ variant }))} {...props} />
  );
}
