"use client";
import { usePathname, useRouter } from "next/navigation";
import { memo, MouseEvent, PropsWithChildren, useCallback } from "react";

interface NavigationButtonProps {
  target: string;
}

function NavigationButton({ target, children }: PropsWithChildren<NavigationButtonProps>) {
  const router = useRouter();
  const pathname = usePathname();

  const handleButtonClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    router.push(`${e.currentTarget.value}`);
  }, []);

  return (
    <button
      className={`flex flex-col items-center py-8 ${
        target === pathname ? "text-primary" : "text-gray-400"
      }`}
      value={target}
      onClick={handleButtonClick}
    >
      {children}
    </button>
  );
}

export default memo(NavigationButton);
