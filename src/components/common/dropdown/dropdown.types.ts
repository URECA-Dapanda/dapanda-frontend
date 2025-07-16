import { ReactNode } from "react";

export type DropdownAction =
  | { type: "link"; href: string }
  | { type: "action"; onClick: () => void }
  | { type: "separator" }
  | { type: "custom"; element: ReactNode };

export interface DropdownOption {
  label?: string;
  icon?: React.ElementType;
  action: DropdownAction;
  disabled?: boolean;
  className?: string;
  variant?: "default" | "destructive";
  inset?: boolean;
}
