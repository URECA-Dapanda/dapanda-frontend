import { ButtonHTMLAttributes } from "react";
import type { ButtonVariantProps } from "@components/common/button/buttonVariants";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
  color?: string;
  isActive?: boolean;
}
