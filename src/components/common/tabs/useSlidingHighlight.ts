import { useLayoutEffect, useState } from "react";
import { useMultiRef } from "@/components/common/tabs/useMultiRef";

export function useSlidingHighlight<T extends HTMLElement>(
  tabValues: readonly { value: string }[],
  activeValue: string
) {
  const [refs, getRef] = useMultiRef<T>();
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const index = tabValues.findIndex((t) => t.value === activeValue);
    const el = refs.current[index];
    if (el) {
      setHighlightStyle({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [tabValues, activeValue, refs]);

  return {
    setTriggerRef: getRef,
    highlightStyle,
  };
}
