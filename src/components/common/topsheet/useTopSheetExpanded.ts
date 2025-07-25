import { useState } from "react";

export function useTopSheetExpanded() {
  const [expanded, setExpanded] = useState(false);

  const handleDragEnd = (info: { offset: { y: number }; velocity: { y: number } }) => {
    if (info.offset.y > 56 || info.velocity.y > 500) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  };

  return { expanded, setExpanded, handleDragEnd };
}
