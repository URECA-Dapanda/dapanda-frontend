import { useLayoutEffect } from "react";

export const useLockBodyScroll = (locked: boolean) => {
  useLayoutEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalHeight = document.body.style.height;

    if (locked) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.height = "100%";
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.height = originalHeight;
    };
  }, [locked]);
};
