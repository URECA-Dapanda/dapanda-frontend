"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent, isInitialized } from "@/lib/mixpanel";

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isInitialized) {
      const timer = setTimeout(() => {
        if (isInitialized) {
          trackEvent("Page View", { path: pathname });
        } else {
          console.warn("PageView skipped: Mixpanel still not initialized.");
        }
      }, 300);

      return () => clearTimeout(timer);
    } else {
      trackEvent("Page View", { path: pathname });
    }
  }, [pathname]);

  return null;
}
