"use client";

import { memo } from "react";

function HeaderCash() {
  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-full secondary-gradient bg-[rgba(63,200,151,1)]">
      <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
        <span className="text-xs text-white font-bold">₩</span>
      </div>
      <span className="text-sm font-medium text-white">{"12, 345"}</span>
    </div>
  );
}

export default memo(HeaderCash);
