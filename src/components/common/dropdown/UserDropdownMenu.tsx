"use client";

import { ReactNode } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { dropdownVariants } from "@/components/common/dropdown/dropdownVariants";
import { DropdownOption } from "@/components/common/dropdown/dropdown.types";
import { DropdownItemContent } from "@/components/common/dropdown/DropdownItemContent";

import { cn } from "@/lib/utils";

interface DropdownProps {
  options: DropdownOption[];
  children: ReactNode;
  align?: "start" | "end" | "center";
  widthClass?: string;
  onSelectLabel?: (label: string) => void;
  selectedLabel?: string;
}

export function UserDropdownMenu({
  options,
  children,
  align = "end",
  widthClass = "w-[224px]",
  onSelectLabel,
}: DropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={8} align={align} className={cn(widthClass, "z-105 p-1")}>
        {options.map((opt, idx) => {
          const { action, label, icon, className, disabled, variant, inset } = opt;

          if (action.type === "separator") {
            return <DropdownMenuSeparator key={`separator-${idx}`} />;
          }

          if (action.type === "custom") {
            return <div key={`custom-${idx}`}>{action.element}</div>;
          }

          const content = <DropdownItemContent icon={icon} label={label} />;
          const itemClass = cn(dropdownVariants({ variant, inset }), className);

          if (action.type === "link") {
            return (
              <DropdownMenuItem
                asChild
                key={`link-${idx}`}
                variant={variant}
                inset={inset}
                disabled={disabled}
                className={itemClass}
              >
                <Link href={action.href} className="w-full h-full flex items-center">
                  {content}
                </Link>
              </DropdownMenuItem>
            );
          }

          return (
            <DropdownMenuItem
              key={`action-${idx}`}
              onClick={() => {
                action.onClick?.();
                if (onSelectLabel && label) onSelectLabel(label);
              }}
              disabled={disabled}
              variant={variant}
              inset={inset}
              className={itemClass}
            >
              {content}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
