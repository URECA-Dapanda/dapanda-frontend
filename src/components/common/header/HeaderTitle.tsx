"use client";
import { useConfigStore } from "@/stores/useConfigStore";
import { memo } from "react";

function HeaderTitle() {
  const title = useConfigStore((state) => state.title);
  return <h1 className="text-lg font-bold text-gray-900">{title}</h1>;
}

export default memo(HeaderTitle);
