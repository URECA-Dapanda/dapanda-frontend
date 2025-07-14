import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { type ReactNode } from "react";

type MenuAction = { type: "action"; onClick: () => void } | { type: "link"; href: string };

interface DropdownMenuOption {
  label: string;
  icon?: ReactNode;
  action: MenuAction;
}

interface UserDropdownMenuProps {
  options: DropdownMenuOption[];
  children: ReactNode;
}

export function UserDropdownMenu({ options, children }: UserDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent sideOffset={8} align="end" className="min-w-[160px] p-1">
        {options.map((option, idx) => {
          const content = (
            <>
              {option.icon}
              {option.label}
            </>
          );

          if (option.action.type === "link") {
            return (
              <Link href={option.action.href} key={idx}>
                <DropdownMenuItem
                  asChild
                  className="gap-3 text-sm text-color-text-black cursor-pointer"
                >
                  <span>{content}</span>
                </DropdownMenuItem>
              </Link>
            );
          }

          return (
            <DropdownMenuItem
              key={idx}
              onClick={option.action.onClick}
              className="gap-3 text-sm text-color-text-black"
            >
              {content}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
