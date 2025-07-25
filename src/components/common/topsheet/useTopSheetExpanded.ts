import { useState } from "react";

export function useTopSheetExpanded() {
  const [expanded, setExpanded] = useState(false);

  const handleDragEnd = (info: {
    offset: { y: number; x: number };
    velocity: { y: number; x: number };
  }) => {
    const isVerticalSwipe = Math.abs(info.offset.y) > Math.abs(info.offset.x);

    if (isVerticalSwipe && (info.offset.y > 56 || info.velocity.y > 500)) {
      setExpanded(true);
    } else if (isVerticalSwipe) {
      setExpanded(false);
    }
    // 👆 좌우 swipe인 경우 아무것도 안 함
  };

  return { expanded, setExpanded, handleDragEnd };
}
