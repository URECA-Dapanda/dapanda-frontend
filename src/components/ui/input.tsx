import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex w-full min-w-0 h-9 px-3 py-1 rounded-6 border outline-none bg-transparent",
        "font-pretendard body-md text-black placeholder:text-gray-400",
        "border-gray-400 shadow-xs transition-colors",
        "focus-visible:border-gray-500 focus-visible:ring-[3px] focus-visible:ring-gray-200",
        "aria-invalid:border-error aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "selection:bg-primary-700 selection:text-white",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      {...props}
    />
  );
}

export { Input };
