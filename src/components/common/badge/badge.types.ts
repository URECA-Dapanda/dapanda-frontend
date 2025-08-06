import type { VariantProps } from "class-variance-authority";
import { badgeVariants } from "@components/common/badge/badgeVariants";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}
