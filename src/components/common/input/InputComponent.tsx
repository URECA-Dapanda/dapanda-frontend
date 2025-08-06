"use client";

import React, { useMemo, forwardRef, Ref } from "react";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

type InputRadius = "lg" | "md" | "sm" | number;
type InputSize = "sm" | "md" | "lg";

interface BaseProps {
  as?: "input" | "textarea";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  color?: string;
  radius?: InputRadius;
  size?: InputSize;
  disabled?: boolean;
  required?: boolean;
  step?: number;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}

// input 전용 props
interface InputProps extends BaseProps {
  type?: "text" | "number" | "email" | "password";
  rows?: never;
  ref?: Ref<HTMLInputElement>;
}

// textarea 전용 props
interface TextareaProps extends BaseProps {
  type?: never;
  rows?: number;
  ref?: Ref<HTMLTextAreaElement>;
}

type InputComponentProps = InputProps | TextareaProps;

const InputComponent = forwardRef<HTMLTextAreaElement | HTMLInputElement, InputComponentProps>(
  function InputComponent(
    {
      as = "input",
      placeholder = "",
      value = "",
      onChange,
      onKeyDown,
      className = "",
      color = "",
      radius = "md",
      size = "md",
      disabled = false,
      required = false,
      type = "text",
      rows = 3,
      step = 100,
      maxLength,
      inputMode,
    },
    ref
  ) {
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
        "flex w-full min-w-0 px-3 py-3 rounded-6 border outline-none bg-transparent resize-none",
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
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={textareaClass}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
          required={required}
          rows={rows}
          maxLength={maxLength}
          autoComplete="off"
          spellCheck="false"
        />
      );
    }

    return (
      <Input
        ref={ref as React.Ref<HTMLInputElement>}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
        onKeyDown={onKeyDown as React.KeyboardEventHandler<HTMLInputElement>}
        disabled={disabled}
        required={required}
        step={type === "number" ? step : undefined}
        className={cn(inputRadius, inputSize, color, className)}
        maxLength={maxLength}
        inputMode={inputMode}
        autoComplete="off"
        spellCheck="false"
      />
    );
  }
);

export default InputComponent;
