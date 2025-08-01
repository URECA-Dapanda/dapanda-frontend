import { ButtonHTMLAttributes } from "react";
import type { ButtonVariantProps } from "./buttonVariants";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
  color?: string;
  isActive?: boolean;
}
