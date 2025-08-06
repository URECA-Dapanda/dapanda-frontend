"use client";

import { memo } from "react";
import { useConfigStore } from "@/stores/useConfigStore";

function HeaderTitle() {
  const title = useConfigStore((state) => state.title);
  return <h1 className="text-lg font-bold text-gray-900">{title}</h1>;
}

export default memo(HeaderTitle);
