"use client";
import { usePathname, useRouter } from "next/navigation";
import { memo, MouseEvent, PropsWithChildren, useCallback, useMemo } from "react";

interface NavigationButtonProps {
  target: string;
}

function NavigationButton({ target, children }: PropsWithChildren<NavigationButtonProps>) {
  const router = useRouter();
  const pathname = usePathname();

  const currentPath = useMemo(() => `/${pathname.split("/").at(1)}`, [pathname]);

  const handleButtonClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    router.push(`${e.currentTarget.value}`);
  }, []);

  return (
    <button
      className={`flex flex-col items-center hover:cursor-pointer py-6 ${
        target === currentPath ? "text-primary" : "text-gray-400"
      }`}
      value={target}
      onClick={handleButtonClick}
    >
      {children}
    </button>
  );
}

export default memo(NavigationButton);
