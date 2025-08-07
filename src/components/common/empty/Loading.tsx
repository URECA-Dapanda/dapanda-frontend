"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function LoadingPanda() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="h-main-safe pb-safe-bottom pt-safe-top flex justify-center items-center overflow-hidden">
      <Image src={"/loading-panda.gif"} priority width={426} height={240} alt="loading panda" />
    </div>
  );
}
