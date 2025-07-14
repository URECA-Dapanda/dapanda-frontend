"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type MenuAction =
  | { type: "link"; href: string }
  | { type: "action"; onClick: () => void }
  | { type: "separator" }
  | { type: "custom"; element: ReactNode };

export interface DropdownMenuOption {
  label?: string;
  icon?: React.ElementType;
  action: MenuAction;
  disabled?: boolean;
  className?: string;
}

interface UserDropdownMenuProps {
  options: DropdownMenuOption[];
  children: ReactNode;
}

export function UserDropdownMenu({ options, children }: UserDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={8} align="end" className="w-[160px] p-1">
        {options.map((option, idx) => {
          const { action, label, icon: Icon, className, disabled } = option;

          if (action.type === "separator") {
            return <DropdownMenuSeparator key={idx} />;
          }

          if (action.type === "custom") {
            return <div key={idx}>{action.element}</div>;
          }

          const content = (
            <span className="flex items-center gap-3 body-sm text-color-text-black">
              {Icon && <Icon className={cn("w-16 h-16 ml-2")} />}
              {label}
            </span>
          );

          if (action.type === "link") {
            return (
              <Link href={action.href} key={idx}>
                <DropdownMenuItem asChild className={className}>
                  {content}
                </DropdownMenuItem>
              </Link>
            );
          }

          return (
            <DropdownMenuItem
              key={idx}
              onClick={action.onClick}
              disabled={disabled}
              className={className}
            >
              {content}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
