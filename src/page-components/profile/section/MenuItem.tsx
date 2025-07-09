"use client";
import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";

interface MenuItemProp {
  title: string;
  target: string;
}

function MenuItem({ title, target }: MenuItemProp) {
  const router = useRouter();

  const handleButtonClick = useCallback(() => {
    router.push(target);
  }, []);

  return (
    <button
      onClick={handleButtonClick}
      className="w-full p-4 text-left hover:bg-[#fefaef] flex items-center justify-between"
    >
      <span className="font-medium">{title}</span>
      <span className="text-gray-400">›</span>
    </button>
  );
}

export default memo(MenuItem);
