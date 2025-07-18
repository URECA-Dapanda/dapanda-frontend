"use client";
import { memo, useCallback, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfileStore } from "@/stores/useProfileStore";
import { useRouter } from "next/navigation";

interface AvatarProps {
  size: "small" | "medium" | "large" | string;
  avatar?: string;
}

/**
 *
 * @param size 아이콘 사이즈: small: w-4 h-4 // medium: w-8 h-8 // large: w-16 h-16
 * @returns 아바타 아이콘
 */
function AvatarIcon({ size = "small", avatar = "c" }: Partial<AvatarProps>) {
  const router = useRouter();
  const showAvatar = useProfileStore((state) => state.avatar);
  const avatarImage = avatar ? avatar : showAvatar;
  const iconSize = useMemo(() => {
    switch (size) {
      case "small":
        return "w-32 h-32";
      case "medium":
        return "w-48 h-48";
      case "large":
        return "w-64 h-64";
      default:
        return size;
    }
  }, [size]);

  return avatarImage ? (
    <Avatar className={iconSize}>
      <AvatarImage />
      <AvatarFallback className="bg-gray-500 text-white">{avatarImage}</AvatarFallback>
    </Avatar>
  ) : null;
}

export default memo(AvatarIcon);
