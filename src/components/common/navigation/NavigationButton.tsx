"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, PropsWithChildren, useMemo } from "react";

interface NavigationButtonProps {
  target: string;
}

function NavigationButton({ target, children }: PropsWithChildren<NavigationButtonProps>) {
  const pathname = usePathname();

  const currentPath = useMemo(() => `/${pathname.split("/").at(1)}`, [pathname]);

  return (
    <Link href={target} prefetch className="flex items-center justify-center">
      <button
        className={`flex flex-col items-center hover:cursor-pointer py-6 ${
          target === currentPath ? "text-primary" : "text-gray-400"
        }`}
        value={target}
      >
        {children}
      </button>
    </Link>
  );
}

export default memo(NavigationButton);
