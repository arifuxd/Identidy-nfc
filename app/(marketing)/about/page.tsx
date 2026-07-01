"use client";

import Link from "next/link";
import { TapReveal } from "@/components/site/TapReveal";
import { ArrowUpRight } from "lucide-react";

const TIMELINE = [
  ["2023", "Prototype 01", "A single matte card, cut by hand in a Dhaka studio."],
  ["2024", "First 100", "First hundred cards shipped to founders and creators across Bangladesh."],
  ["2025", "Themes & analytics", "The design deck expands; the dashboard goes live."],
  ["2026", "This site.", "A product surface that tries to feel like the product itself."],
];

export default function About() {
  const cardMacro = "/card-macro.jpg";

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 pt-16 pb-24 sm:px-8">
        <p className="tap-in text-[11px] uppercase tracking-[0.28em] text-ink-soft">About</p>
        <h1 className="tap-in-delay-1 mt-6 max-w-[18ch] text-balance font-display text-[clamp(2.5rem,7vw,6.5rem)] font-medium leading-[0.94] tracking-[-0.035em]">
          A card that behaves like software. Software that <span className="italic text-ink-soft">respects</span> the card.
        </h1>
        <p className="tap-in-delay-2 mt-8 max-w-[58ch] text-lg leading-relaxed text-ink-soft">
          Identidy was born in Dhaka, from a working belief: the moment two people meet is worth more than a stack of paper — and worth more than another app to install.
        </p>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-24 sm:px-8 lg:grid-cols-12">
        <TapReveal className="lg:col-span-6">
          <img src={cardMacro} alt="Macro of an Identidy card" width={1400} height={1000} loading="lazy" className="w-full rounded-2xl object-cover" />
        </TapReveal>
        <TapReveal delay={80} className="lg:col-span-6">
          <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] tracking-[-0.02em]">Mission</h2>
          <p className="mt-4 text-lg text-ink-soft">
            Replace the paper business card with something worth keeping — a physical object with real intelligence behind it, made by people who care about both halves.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              ["Design-led hardware", "The finish, the weight, the chip placement. All deliberate."],
              ["Software-first", "Real profiles. Real analytics. Real integrations."],
              ["Privacy & control", "You choose what's visible. You own your data."],
            ].map(([h, p]) => (
              <div key={h}>
                <p className="text-[11px] uppercase tracking-[0.22em] text-accent">{h}</p>
                <p className="mt-3 text-sm text-ink-soft">{p}</p>
              </div>
            ))}
          </div>
        </TapReveal>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-28 sm:px-8">
        <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">Milestones</p>
        <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] tracking-[-0.02em]">
          A short path, walked slowly.
        </h2>

        <ol className="relative mt-16 space-y-14 before:absolute before:left-3 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-accent/40 before:via-hairline before:to-transparent">
          {TIMELINE.map(([y, h, p], i) => (
            <TapReveal key={y} delay={i * 70} as="li" className="relative grid grid-cols-[24px_1fr] gap-6">
              <span className="relative mt-1.5 grid h-6 w-6 place-items-center">
                <span className="h-2 w-2 bg-accent rounded-full" />
                <span className="absolute inset-0 rounded-full border border-accent/40 ripple-loop" />
              </span>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-ink-soft">{y}</p>
                <h3 className="mt-1 font-display text-2xl tracking-tight">{h}</h3>
                <p className="mt-2 max-w-[52ch] text-ink-soft">{p}</p>
              </div>
            </TapReveal>
          ))}
        </ol>

        <div className="mt-20">
          <Link
            href="/get-your-card"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background"
          >
            Get your card <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
