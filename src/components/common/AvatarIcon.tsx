"use client";
import { memo, useMemo } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  return (
    <Avatar className={iconSize}>
      <AvatarImage
        src={avatar || "/avatar-default.png"}
        alt="avatar"
        onError={() => console.log("Avatar image load failed:", avatar)}

      />

      <AvatarFallback className="p-0 bg-transparent relative overflow-hidden">
        <Image
          src="/avatar-default.png"
          alt="default avatar"
          fill
          className="object-cover rounded-full"
          sizes="(max-width: 64px) 100vw, 64px"
          priority
        />
      </AvatarFallback>
    </Avatar>
  );
}

export default memo(AvatarIcon);
