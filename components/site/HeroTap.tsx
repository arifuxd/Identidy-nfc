"use client";

import React from "react";

/**
 * Hero centerpiece — phone silhouette with the card "tapping" it.
 * Uses CSS-only tap loop + ripple. Falls back to hero photo layered.
 */
export function HeroTap() {
  const heroImg = "/hero-card-tap.jpg";

  return (
    <div className="relative aspect-[4/4] w-full overflow-hidden rounded-3xl bg-[#0A0A0A] grain">
      <img
        src={heroImg}
        alt="Identidy NFC card tapping a phone"
        className="absolute inset-0 h-full w-full scale-[1.03] object-cover opacity-95"
        width={1600}
        height={1200}
      />
      {/* accent ripple */}
      <div className="pointer-events-none absolute left-[62%] top-[55%] h-40 w-40 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 rounded-full border border-accent/60 ripple-loop" />
        <div className="absolute inset-0 rounded-full border border-accent/40 ripple-loop" style={{ animationDelay: "0.4s" }} />
        <div className="absolute inset-0 rounded-full border border-accent/25 ripple-loop" style={{ animationDelay: "0.8s" }} />
      </div>
      {/* gradient wash */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
      {/* corner meta */}
      <div className="absolute left-5 top-5 flex items-center gap-2 text-[10.5px] uppercase tracking-[0.24em] text-white/70">
        <span className="h-1.5 w-1.5 rounded-full bg-accent chip-glow" />
        Live tap · 0.4s
      </div>
      <div className="absolute right-5 top-5 text-[10.5px] uppercase tracking-[0.24em] text-white/70">
        NFC · iOS + Android
      </div>
      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
        <div>
          <p className="text-[10.5px] uppercase tracking-[0.24em] text-white/60">Handshake</p>
          <p className="mt-1 font-display text-lg tracking-tight text-white">Instant. Deliberate. Yours.</p>
        </div>
        <div className="hidden rounded-full border border-white/25 px-3 py-1 text-[10.5px] uppercase tracking-[0.18em] text-white/80 sm:block">
          One tap
        </div>
      </div>
    </div>
  );
}
