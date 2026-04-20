"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  PROFILE_STYLE_DEFINITIONS,
  resolveProfileStyleDefinition,
  type ProfileStyleId,
} from "@/lib/profile-styles";

export function DebugStyleFlyout({ activeStyle }: { activeStyle: ProfileStyleId }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const styleLabel = useMemo(
    () => resolveProfileStyleDefinition(activeStyle).name,
    [activeStyle],
  );

  function applyStyle(styleId: ProfileStyleId) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("style", styleId);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setOpen(false);
  }

  function resetToSaved() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("style");
    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
    setOpen(false);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        type="button"
        className="rounded-full border border-white/20 bg-[#0b1320]/90 px-3 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md"
        onClick={() => setOpen((current) => !current)}
      >
        Style Debug
      </button>

      {open ? (
        <div className="mt-2 w-64 rounded-xl border border-white/15 bg-[#0b1320]/95 p-2 shadow-2xl backdrop-blur-md">
          <p className="px-2 py-1 text-[11px] text-blue-100/80">Active: {styleLabel}</p>
          <div className="mt-1 grid gap-1">
            {PROFILE_STYLE_DEFINITIONS.map((style) => (
              <button
                key={style.id}
                type="button"
                className={`rounded-lg px-2 py-1.5 text-left text-xs transition ${
                  activeStyle === style.id
                    ? "bg-primary/25 text-white"
                    : "bg-white/5 text-blue-100/85 hover:bg-white/10"
                }`}
                onClick={() => applyStyle(style.id)}
              >
                {style.name}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="mt-2 w-full rounded-lg border border-white/15 px-2 py-1.5 text-xs text-blue-100/85 hover:bg-white/10"
            onClick={resetToSaved}
          >
            Use Saved Style
          </button>
        </div>
      ) : null}
    </div>
  );
}
