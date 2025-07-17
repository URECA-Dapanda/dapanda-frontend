"use client";
import { ButtonComponent } from "@components/common/button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useCallback } from "react";

interface HistoryButtonProps {
  target: string;
}

export default function HistoryButton({ target, children }: PropsWithChildren<HistoryButtonProps>) {
  const router = useRouter();
  const handleClick = useCallback(() => {
    router.push(`mypage/${target}`);
  }, [target]);

  return (
    <ButtonComponent
      variant={"outlineGray"}
      className="flex-4 justify-between w-full"
      onClick={handleClick}
    >
      <div className="flex flex-row items-center subtitle-md">{children}</div>
      <ChevronRight className="w-16 h-16 text-end" />
    </ButtonComponent>
  );
}
