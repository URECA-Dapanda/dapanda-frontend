import { useRef, useCallback } from "react";

export function useMultiRef<T>() {
  const refs = useRef<(T | null)[]>([]);
  const getRef = useCallback(
    (i: number) => (el: T | null) => {
      refs.current[i] = el;
    },
    []
  );
  return [refs, getRef] as const;
}
