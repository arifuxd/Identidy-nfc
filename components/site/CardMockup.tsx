"use client";

import React from "react";

/**
 * Stylized NFC card mockup used across the site.
 * variant: "black" | "white" | "metal"
 */
export function CardMockup({
  variant = "black",
  name = "Rafiq Hassan",
  role = "Founder & CEO",
  company = "Identidy",
  className = "",
  style,
}: {
  variant?: "black" | "white" | "metal";
  name?: string;
  role?: string;
  company?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const skin =
    variant === "white"
      ? {
          bg: "linear-gradient(135deg, #FAFAFA 0%, #ECECEC 100%)",
          fg: "#0A0A0A",
          soft: "rgba(10,10,10,0.55)",
          sheen: "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.9) 50%, transparent 60%)",
        }
      : variant === "metal"
        ? {
            bg: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 45%, #0d0d0d 100%)",
            fg: "#FAFAFA",
            soft: "rgba(250,250,250,0.6)",
            sheen: "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
          }
        : {
            bg: "linear-gradient(135deg, #0A0A0A 0%, #171717 100%)",
            fg: "#FAFAFA",
            soft: "rgba(250,250,250,0.55)",
            sheen: "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.09) 50%, transparent 60%)",
          };

  return (
    <div
      className={`group relative aspect-[1.586/1] w-full overflow-hidden rounded-2xl ${className}`}
      style={{
        background: skin.bg,
        color: skin.fg,
        boxShadow:
          variant === "white"
            ? "0 30px 60px -30px rgba(0,0,0,0.35), 0 2px 4px rgba(0,0,0,0.06)"
            : "0 30px 60px -30px rgba(0,0,0,0.65), 0 2px 4px rgba(0,0,0,0.4)",
        ...style,
      }}
    >
      {/* sheen */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60 transition-transform duration-700 group-hover:translate-x-[40%]"
        style={{ background: skin.sheen, transform: "translateX(-40%)" }}
      />

      <div className="relative flex h-full flex-col justify-between p-[6.5%]">
        <div className="flex items-start justify-between">
          <div>
            <p
              className="text-[9px] uppercase tracking-[0.28em]"
              style={{ color: skin.soft }}
            >
              {company}
            </p>
            <p
              className="mt-2 text-[clamp(0.95rem,1.4vw,1.15rem)] font-medium tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {name}
            </p>
            <p className="mt-0.5 text-[10.5px]" style={{ color: skin.soft }}>
              {role}
            </p>
          </div>

          {/* NFC mark */}
          <div className="relative">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ color: skin.soft }}>
              <path d="M2 12a10 10 0 0 1 20 0" strokeLinecap="round" />
              <path d="M5 12a7 7 0 0 1 14 0" strokeLinecap="round" />
              <path d="M8 12a4 4 0 0 1 8 0" strokeLinecap="round" />
              <circle cx="12" cy="12" r="1" fill="currentColor" />
            </svg>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="relative">
            {/* chip */}
            <div
              className="grid h-6 w-8 grid-cols-3 grid-rows-3 gap-[1.5px] rounded-[3px]"
              style={{
                background: variant === "white" ? "linear-gradient(135deg,#c9c9c9,#8a8a8a)" : "linear-gradient(135deg,#3a3a3a,#141414)",
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)",
              }}
            >
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="rounded-[1px]" style={{ background: "rgba(0,0,0,0.2)" }} />
              ))}
              <div className="pointer-events-none absolute -inset-1.5 rounded-full bg-accent/50 blur-md chip-glow" />
            </div>
          </div>
          <div className="text-right">
            <p className="text-[9px] uppercase tracking-[0.22em]" style={{ color: skin.soft }}>Tap → Connect</p>
          </div>
        </div>
      </div>
    </div>
  );
}
