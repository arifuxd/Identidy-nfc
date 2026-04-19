"use client";

import { useEffect } from "react";

export function PublicProfileViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    fetch("/api/public/profile-view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug }),
      keepalive: true,
    }).catch(() => undefined);
  }, [slug]);

  return null;
}
