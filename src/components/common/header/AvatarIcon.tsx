"use client";
import { memo, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfileStore } from "@/stores/useProfileStore";

interface AvatarProps {
  size: "small" | "medium" | "large" | string;
}

/**
 *
 * @param size 아이콘 사이즈: small: w-4 h-4 // medium: w-8 h-8 // large: w-16 h-16
 * @returns 아바타 아이콘
 */
function AvatarIcon({ size = "medium" }: Partial<AvatarProps>) {
  const showAvatar = useProfileStore((state) => state.avatar);
  const iconSize = useMemo(() => {
    switch (size) {
      case "small":
        return "w-4 h-4";
      case "medium":
        return "w-8 h-8";
      case "large":
        return "w-16 h-16";
      default:
        return size;
    }
  }, [size]);

  return showAvatar ? (
    <Avatar className={iconSize}>
      <AvatarImage src="/placeholder.svg" />
      <AvatarFallback className="primary-gradient text-black">
        {showAvatar}
      </AvatarFallback>
    </Avatar>
  ) : null;
}

export default memo(AvatarIcon);
