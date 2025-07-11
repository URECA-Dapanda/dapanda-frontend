"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { badgeVariants } from "./badgeVariants";
import type { BadgeProps } from "./badge.types";

export function Badge({ className, variant = "wifi", ...props }: BadgeProps) {
  return <div data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}
