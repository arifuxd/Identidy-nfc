"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { TapReveal } from "@/components/site/TapReveal";

type Theme = {
  name: string;
  category: string;
  colors: [string, string, string];
  vibe: string;
};

const THEMES: Theme[] = [
  { name: "Creator", category: "Content", colors: ["#0A0A0A", "#FF3366", "#FAFAFA"], vibe: "Bold moments for makers who publish daily." },
  { name: "Minimal", category: "Editorial", colors: ["#FAFAFA", "#0A0A0A", "#B8B8B8"], vibe: "One color, one type, one point of view." },
  { name: "Designer", category: "Studio", colors: ["#F5F0E8", "#0A0A0A", "#1447AF"], vibe: "Typographic breathing room for design leads." },
  { name: "Developer", category: "Technical", colors: ["#0D1117", "#58A6FF", "#7EE787"], vibe: "Monospace, dark canvas, real repos." },
  { name: "Gamer", category: "Play", colors: ["#0A0018", "#B026FF", "#00FFC6"], vibe: "Neon rig energy, no compromise." },
  { name: "Corporate", category: "Enterprise", colors: ["#0A2540", "#FAFAFA", "#C9A24C"], vibe: "For the room where deals close." },
  { name: "Football Fan", category: "Sport", colors: ["#006A4E", "#F42A41", "#FAFAFA"], vibe: "Colors of your team, worn on your card." },
  { name: "Cinematographer", category: "Film", colors: ["#141414", "#E36B3B", "#F0D78C"], vibe: "Golden hour, in a business card." },
];

export default function Themes() {
  const [active, setActive] = useState(3);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 pt-16 sm:px-8">
        <p className="tap-in text-[11px] uppercase tracking-[0.28em] text-ink-soft">Themes</p>
        <h1 className="tap-in-delay-1 mt-6 max-w-[20ch] text-balance font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.94] tracking-[-0.035em]">
          A deck for <span className="italic text-ink-soft">every</span> kind of hand.
        </h1>
        <p className="tap-in-delay-2 mt-6 max-w-[52ch] text-lg text-ink-soft">
          Drag through the deck. Tap a theme to preview it. Every theme is customizable — colors, type, and layout — free with your card.
        </p>
      </section>

      {/* Fanned deck showcase */}
      <section className="mx-auto max-w-[1440px] px-5 pt-16 sm:px-8">
        <div className="relative mx-auto flex h-[520px] w-full items-start justify-center overflow-hidden rounded-3xl border border-hairline bg-gradient-to-b from-surface to-background">
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-40 w-40 -translate-y-1/2 rounded-full bg-accent/25 blur-[80px] aurora"
          />
          <div className="relative mt-16 h-[380px] w-full max-w-[900px]">
            {THEMES.slice(0, 7).map((t, i) => {
              const offset = i - 3;
              return (
                <button
                  key={t.name}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  data-cursor="expand"
                  className="absolute left-1/2 top-0 origin-bottom transition-transform duration-500"
                  style={{
                    transform: `translateX(calc(-50% + ${offset * 60}px)) rotate(${offset * 7}deg) translateY(${active === i ? -30 : 0}px) scale(${active === i ? 1.05 : 1})`,
                    zIndex: active === i ? 30 : 20 - Math.abs(offset),
                  }}
                >
                  <div
                    className="w-[260px] rounded-2xl p-5 text-left"
                    style={{
                      background: t.colors[0],
                      color: t.colors[1],
                      boxShadow: "0 40px 80px -40px rgba(0,0,0,0.6), 0 10px 30px rgba(0,0,0,0.2)",
                      aspectRatio: "1.586 / 1",
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-[9px] uppercase tracking-[0.24em] opacity-60">{t.category}</p>
                      <span className="h-2 w-2 rounded-full chip-glow" style={{ background: t.colors[2] }} />
                    </div>
                    <p className="mt-8 font-display text-xl tracking-tight">{t.name}</p>
                    <div className="mt-3 flex gap-1.5">
                      {t.colors.map((c) => (
                        <span key={c} className="h-3 w-3 rounded-full border border-black/10" style={{ background: c }} />
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-ink-soft">
          <p><span className="text-ink">{THEMES[active].name}</span> — {THEMES[active].vibe}</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setActive((a) => Math.max(0, a - 1))} className="grid h-9 w-9 place-items-center rounded-full border border-hairline"><ChevronLeft size={16} /></button>
            <button onClick={() => setActive((a) => Math.min(6, a + 1))} className="grid h-9 w-9 place-items-center rounded-full border border-hairline"><ChevronRight size={16} /></button>
          </div>
        </div>
      </section>

      {/* Full gallery */}
      <section className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">All themes</p>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,3.6vw,3rem)] tracking-[-0.02em]">The full deck.</h2>
          </div>
          <p className="hidden max-w-[30ch] text-sm text-ink-soft md:block">
            Every theme is a starting point — a designer will fine-tune it to you, free.
          </p>
        </div>

        <div ref={scrollRef} className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {THEMES.map((t, i) => (
            <TapReveal key={t.name} delay={i * 40}>
              <div
                data-cursor="expand"
                className="group cursor-pointer overflow-hidden rounded-2xl border border-hairline transition-transform duration-300 hover:-translate-y-1"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div
                  className="relative flex aspect-[1.2/1] flex-col justify-between p-5"
                  style={{ background: t.colors[0], color: t.colors[1] }}
                >
                  <div className="flex items-start justify-between">
                    <p className="text-[9px] uppercase tracking-[0.24em] opacity-60">{t.category}</p>
                    <span className="h-2 w-2 rounded-full" style={{ background: t.colors[2] }} />
                  </div>
                  <div>
                    <p className="font-display text-2xl tracking-tight">{t.name}</p>
                    <div className="mt-3 flex gap-1.5">
                      {t.colors.map((c) => (
                        <span key={c} className="h-3 w-3 rounded-full border border-black/10" style={{ background: c }} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-surface p-4 text-left">
                  <p className="text-sm text-ink-soft">{t.vibe}</p>
                </div>
              </div>
            </TapReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-hairline bg-surface p-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">Fully customizable</p>
            <h3 className="mt-3 font-display text-2xl tracking-tight">Nothing in the deck? We'll design you one.</h3>
          </div>
          <div className="flex gap-2">
            <Link href="/demo" className="rounded-full border border-hairline px-5 py-3 text-sm">Try demo profile</Link>
            <Link href="/get-your-card" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm text-background">
              Get your card <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
