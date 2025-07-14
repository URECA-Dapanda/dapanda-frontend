"use client";
import { usePathname, useRouter } from "next/navigation";
import { memo, MouseEvent, PropsWithChildren, useCallback } from "react";

interface NavigationButtonProps {
  target: string;
}

function NavigationButton({ target, children }: PropsWithChildren<NavigationButtonProps>) {
  const router = useRouter();
  const pathname = usePathname();
  /**
   * @constant userId 추후에 실제 id 읽어오기
   */
  const userId = 12;

  const handleButtonClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    router.push(
      `${e.currentTarget.value}${e.currentTarget.value === "/mypage" ? `/${userId}` : ""}`
    );
  }, []);

  return (
    <button
      className={`flex flex-col items-center py-2 ${
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
