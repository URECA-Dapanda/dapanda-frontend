import { useLayoutEffect, useState } from "react";
import { useMultiRef } from "@/components/common/tabs/useMultiRef";

export function useSlidingHighlight<T extends HTMLElement>(
  tabValues: readonly { value: string }[],
  activeValue: string
) {
  const [refs, getRef] = useMultiRef<T>();
  const [highlightStyle, setHighlightStyle] = useState<{ left: number | string; width: number }>({
    left: 0,
    width: 0,
  });

  useLayoutEffect(() => {
    const index = tabValues.findIndex((t) => t.value === activeValue);
    const hasOwn = tabValues.length === 1;
    const el = refs.current[index];
    if (el) {
      setHighlightStyle({
        left: hasOwn ? "auto" : el.offsetLeft,
        width: hasOwn ? el.offsetWidth * 2 : el.offsetWidth,
      });
    }
  }, [tabValues, activeValue, refs]);

  return {
    setTriggerRef: getRef,
    highlightStyle,
  };
}
