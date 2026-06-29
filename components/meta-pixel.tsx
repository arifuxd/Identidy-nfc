"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function MetaPixelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams]);

  return null;
}

export function MetaPixelEvents() {
  return (
    <Suspense fallback={null}>
      <MetaPixelTracker />
    </Suspense>
  );
}
