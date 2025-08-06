import { badgeVariants } from "@components/common/badge/badgeVariants";
import type { BadgeProps } from "@components/common/badge/badge.types";
import { Badge } from "@ui/badge";

import { cn } from "@/lib/utils";

export function BadgeComponent({ className, variant, size, ...props }: BadgeProps) {
  return <Badge className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}
