"use client";

import Image from "next/image";

export default function LogoHeader() {
  return (
    <header className="bg-white shadow-header px-4 py-16 h-[54px] w-full flex items-center justify-between">
      <Image src="/logo.svg" alt="DaPanDa 로고" width={64} height={24} priority />
    </header>
  );
}
