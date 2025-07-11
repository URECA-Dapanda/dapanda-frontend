"use client";

import * as React from "react";
import { badgeVariants } from "./badgeVariants";
import type { BadgeProps } from "./badge.types";
import { Badge } from "@ui/badge";

import { cn } from "@/lib/utils";

export function BadgeComponent({ className, variant, ...props }: BadgeProps) {
  return (
    <Badge data-slot="badge" className={cn(className, badgeVariants({ variant }))} {...props} />
  );
}
