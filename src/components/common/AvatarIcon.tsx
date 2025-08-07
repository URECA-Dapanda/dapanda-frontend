"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AvatarProps {
  size: "small" | "medium" | "large" | string;
  avatar?: string;
}

/**
 *
 * @param size 아이콘 사이즈: small: w-4 h-4 // medium: w-8 h-8 // large: w-16 h-16
 * @returns 아바타 아이콘
 */
function AvatarIcon({ size = "small", avatar }: Partial<AvatarProps>) {
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
  const imageSize = useMemo(() => {
    switch (size) {
      case "small":
        return 32;
      case "medium":
        return 48;
      case "large":
        return 64;
      default:
        return 32;
    }
  }, [size]);

  return (
    <Avatar className={iconSize}>
      <AvatarFallback className="p-0 bg-transparent overflow-hidden">
        <Image
          src={avatar || "/avatar-default.png"}
          alt="avatar"
          className="aspect-square size-full"
          width={imageSize}
          height={imageSize}
          priority={size === "medium" || size === "large"}
          sizes="(max-width: 768px) 48px, 64px"
          onError={() => console.debug("Avatar image load failed:", avatar)}
          placeholder="blur"
          blurDataURL={avatar || "/avatar-default.png"}
        />
      </AvatarFallback>
    </Avatar>
  );
}

export default memo(AvatarIcon);
