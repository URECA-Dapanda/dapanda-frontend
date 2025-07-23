import type { ComponentProps } from 'react';
import { Badge } from '@ui/badge';
import { Button } from '@ui/button';

import { cn } from '@lib/utils';

export type PillProps = ComponentProps<typeof Badge> & {
  themed?: boolean;
};

export const Pill = ({
  variant = 'grayline',
  themed = false,
  className,
  ...props
}: PillProps) => (
  <Badge
    className={cn('gap-2 rounded-50 body-sm', className)}
    variant={variant}
    {...props}
  />
);

export type PillButtonProps = ComponentProps<typeof Button>;

export const PillButton = ({ className, ...props }: PillButtonProps) => (
  <Button
    className={cn(
      '-my-2 -mr-2 size-6 rounded-full p-0.5 hover:bg-foreground/5',
      className
    )}
    size="icon"
    variant="ghost"
    {...props}
  />
);

