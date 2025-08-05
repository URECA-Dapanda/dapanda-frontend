"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/mixpanel";

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent("Page View", {
      path: pathname,
    });
  }, [pathname]);

  return null;
}
