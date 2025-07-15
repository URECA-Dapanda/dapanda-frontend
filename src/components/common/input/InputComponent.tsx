"use client";

import { useMemo } from "react";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

type InputRadius = "lg" | "md" | "sm" | number;
type InputSize = "sm" | "md" | "lg";

interface BaseProps {
  as?: "input" | "textarea";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  color?: string;
  radius?: InputRadius;
  size?: InputSize;
  disabled?: boolean;
  required?: boolean;
}

// input 전용 props
interface InputProps extends BaseProps {
  type?: "text" | "number" | "email" | "password";
  rows?: never;
}

// textarea 전용 props
interface TextareaProps extends BaseProps {
  type?: never;
  rows?: number;
}

type InputComponentProps = InputProps | TextareaProps;

export default function InputComponent({
  as = "input",
  placeholder = "",
  value = "",
  onChange,
  className = "",
  color = "",
  radius = "md",
  size = "md",
  disabled = false,
  required = false,
  type = "text",
  rows = 3,
}: InputComponentProps) {
  const inputRadius = useMemo(() => {
    switch (radius) {
      case "lg":
        return "rounded-12";
      case "md":
        return "rounded-10";
      case "sm":
        return "rounded-8";
      default:
        return `rounded-[${radius}px]`;
    }
  }, [radius]);

  const inputSize = useMemo(() => {
    switch (size) {
      case "sm":
        return "h-16";
      case "md":
        return "h-48";
      case "lg":
        return "h-96";
      default:
        return "";
    }
  }, [size]);

  if (as === "textarea") {
    const textareaClass = cn(
      "flex w-full min-w-0 px-3 py-1 rounded-6 border outline-none bg-transparent resize-none",
      "font-pretendard body-md text-black placeholder:text-gray-400",
      "border-gray-400 shadow-xs transition-colors",
      "focus-visible:border-gray-500 focus-visible:ring-[3px] focus-visible:ring-gray-200",
      "aria-invalid:border-error aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40",
      "selection:bg-primary-700 selection:text-white",
      "disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none",
      inputRadius,
      color,
      className
    );

    return (
      <textarea
        className={textareaClass}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        rows={rows}
      />
    );
  }

  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
      disabled={disabled}
      required={required}
      className={cn(inputRadius, inputSize, color, className)}
    />
  );
}

