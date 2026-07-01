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
  hideTapConnect = false,
  largeLogo = false,
}: {
  variant?: "black" | "white" | "metal";
  name?: string;
  role?: string;
  company?: string;
  className?: string;
  style?: React.CSSProperties;
  hideTapConnect?: boolean;
  largeLogo?: boolean;
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
              className="text-[clamp(0.95rem,1.4vw,1.15rem)] font-medium tracking-tight"
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
            {variant === "white" ? (
              <img src="/identidy-logo.svg" alt="Logo" className={`${largeLogo ? "h-[22px] sm:h-[28px]" : "h-[18px] sm:h-[22px]"} w-auto animate-none`} />
            ) : (
              <img src="/identidy-logo-white.svg" alt="Logo" className={`${largeLogo ? "h-[22px] sm:h-[28px]" : "h-[18px] sm:h-[22px]"} w-auto animate-none`} />
            )}
          </div>
          <div className="text-right">
            {!hideTapConnect && (
              <p className="text-[9px] uppercase tracking-[0.22em]" style={{ color: skin.soft }}>Tap → Connect</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
