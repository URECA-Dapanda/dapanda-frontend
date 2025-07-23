import type { HTMLAttributes } from "react";
import { SearchX } from "lucide-react";

import { cn } from "@lib/utils";

interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
    message?: string;
    subMessage?: string;
}

export default function EmptyState({
    message = "아쉽지만, 원하는 조합을 찾지 못했어요.",
    subMessage = "조건을 다시 설정해 보시겠어요?",
    className,
    ...props
  }: EmptyStateProps) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center text-center mt-32",
          className
        )}
        {...props}
      >
        <SearchX className="w-64 h-64 mb-16" />
        <p className="body-md">{message}</p>
        <p className="body-sm text-gray-600 mt-12">{subMessage}</p>
      </div>
    );
  }