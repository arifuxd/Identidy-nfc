import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Play, MinusCircle, CheckCircle2 } from "lucide-react";
import { HeroTap } from "@/components/site/HeroTap";
import { CardMockup } from "@/components/site/CardMockup";
import { TapReveal, CountUp } from "@/components/site/TapReveal";
import cardMacro from "@/assets/card-macro.jpg";
import cardsDeck from "@/assets/cards-deck.jpg";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Identidy — One Tap. Your Entire Identity." },
      {
        name: "description",
        content:
          "A premium NFC business card platform. Share your profile, contact and links with a single, deliberate tap.",
      },
      { property: "og:title", content: "Identidy — One Tap. Your Entire Identity." },
      { property: "og:description", content: "Premium NFC business cards. Instantly beautiful, deliberately physical." },
    ],
  }),
  component: Home,
});

const MARQUEE = [
  "12,400+ taps this week",
  "Trusted in Dhaka · Chattogram · Sylhet",
  "88% of paper cards discarded within a week",
  "Free lifetime profile updates",
  "iOS + Android · no app required",
  "Delivery across Bangladesh in 3–5 days",
];

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`relative mx-auto max-w-[1440px] px-5 sm:px-8 ${className}`}>
      {children}
    </section>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        setStyle({ transform: `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(0)` });
      }}
      onMouseLeave={() => setStyle({ transform: "perspective(900px) rotateY(0) rotateX(0)" })}
      className="tilt-card"
      style={style}
    >
      {children}
    </div>
  );
}

function VideoBlock({ label }: { label: string }) {
  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-[#0A0A0A] grain">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(20,71,175,0.35),transparent_60%)]" />
      <div className="absolute inset-0 grid place-items-center">
        <button
          aria-label={`Play ${label}`}
          className="relative grid h-20 w-20 place-items-center rounded-full border border-white/25 bg-white/5 backdrop-blur transition-transform duration-300 group-hover:scale-105"
        >
          <Play size={22} className="translate-x-0.5 text-white" fill="white" />
          <span className="pointer-events-none absolute inset-0 rounded-full border border-white/30 ripple-loop" />
        </button>
      </div>
      <div className="absolute left-5 top-5 text-[10.5px] uppercase tracking-[0.24em] text-white/60">{label}</div>
      <div className="absolute right-5 bottom-5 text-[10.5px] uppercase tracking-[0.24em] text-white/60">01:24</div>
    </div>
  );
}

function Home() {
  // scroll invert for paper vs digital section handled via IntersectionObserver
  const invertRef = useRef<HTMLDivElement>(null);
  const [inverted, setInverted] = useState(false);
  useEffect(() => {
    const el = invertRef.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) setInverted(e.isIntersecting);
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* ================== HERO ================== */}
      <Section className="pb-16 pt-8 sm:pt-14">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="tap-in flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-accent chip-glow" />
              Made in Bangladesh
            </p>
            <h1 className="tap-in-delay-1 mt-6 text-balance font-display text-[clamp(2.75rem,7.5vw,7rem)] font-medium leading-[0.92] tracking-[-0.035em]">
              One tap. <br />
              Your entire <span className="italic text-ink-soft">identity</span>,
              <br />
              shared.
            </h1>
            <p className="tap-in-delay-2 mt-8 max-w-[46ch] text-[15px] leading-relaxed text-ink-soft">
              Identidy is a premium NFC business card and profile platform. A single deliberate motion replaces the stack in your pocket — and the app store on their phone.
            </p>

            {/* username claim */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="tap-in-delay-3 mt-9 flex max-w-[520px] items-center gap-2 rounded-full border border-black dark:border-white bg-surface p-1.5 pl-4"
            >
              <span className="text-sm text-ink-soft">identidy.co/</span>
              <input
                aria-label="Claim your username"
                placeholder="yourname"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-ink-soft/60"
              />
              <button
                type="submit"
                className="rounded-full bg-foreground px-4 py-2 text-[13px] font-medium text-background transition-transform hover:scale-[1.02] active:scale-95"
              >
                Claim
              </button>
            </form>

            <div className="tap-in-delay-4 mt-8 flex flex-wrap items-center gap-3">
              <Link to="/get-your-card" className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]">
                Get your card
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link to="/demo" className="inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 text-sm">
                View a live profile
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-ink-soft">
              <span className="inline-flex items-center gap-1.5"><Check size={14} className="text-accent" /> No app required</span>
              <span className="inline-flex items-center gap-1.5"><Check size={14} className="text-accent" /> Works on iOS & Android</span>
              <span className="inline-flex items-center gap-1.5"><Check size={14} className="text-accent" /> Free lifetime updates</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <HeroTap />
          </div>
        </div>
      </Section>

      {/* ================== MARQUEE ================== */}
      <section className="mt-6 overflow-hidden border-y border-hairline py-5">
        <div className="marquee flex min-w-max items-center gap-14 whitespace-nowrap">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="inline-flex items-center gap-14 text-[13px] uppercase tracking-[0.22em] text-ink-soft">
              {m}
              <span className="h-1 w-1 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </section>

      {/* ================== PROBLEM ================== */}
      <Section className="py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <TapReveal className="lg:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">The problem</p>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.03em]">
              <span className="italic text-ink-soft">88%</span> of paper cards
              <br /> are in the bin
              <br /> within a week.
            </h2>
          </TapReveal>
          <TapReveal delay={80} className="lg:col-span-6 lg:col-start-7">
            <ul className="space-y-6 text-[15px] leading-relaxed">
              {[
                ["Print, reprint, reprint.", "Titles change. Numbers change. Paper doesn't."],
                ["No memory.", "You never know who kept the card, or when they tapped."],
                ["No signal.", "Paper can't route to your best link this quarter, or your latest work."],
                ["No sense of you.", "A logo and a font can't carry the way you show up in a room."],
              ].map(([h, p]) => (
                <li key={h} className="grid grid-cols-[auto_1fr] gap-4 border-b border-hairline pb-6">
                  <MinusCircle className="mt-1 text-accent" size={18} />
                  <div>
                    <p className="font-medium text-ink">{h}</p>
                    <p className="mt-1 text-ink-soft">{p}</p>
                  </div>
                </li>
              ))}
            </ul>
          </TapReveal>
        </div>
      </Section>

      {/* ================== VIDEO 1 ================== */}
      <Section className="py-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <TapReveal className="lg:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">Watch · 01</p>
            <h3 className="mt-5 font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.02] tracking-[-0.02em]">
              See the tap in a real handshake.
            </h3>
            <p className="mt-5 max-w-[42ch] text-ink-soft">
              A 90-second look at how Identidy replaces the paper stack — from meeting to follow-up — without an app on either side.
            </p>
          </TapReveal>
          <TapReveal delay={100} className="lg:col-span-7">
            <VideoBlock label="Product film" />
          </TapReveal>
        </div>
      </Section>

      {/* ================== HOW IT WORKS ================== */}
      <Section className="py-28">
        <div className="mb-16 flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">How it works</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] tracking-[-0.025em]">
              Three moves. <span className="italic text-ink-soft">One motion.</span>
            </h2>
          </div>
          <div className="hidden text-xs text-ink-soft md:block">Under 30 seconds. Every time.</div>
        </div>

        <div className="relative grid gap-10 md:grid-cols-3">
          {/* connective line */}
          <div className="pointer-events-none absolute left-6 right-6 top-8 hidden h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent md:block" />
          {[
            ["01", "Design", "Pick a theme, add your links, upload your photo. Free custom design available."],
            ["02", "Tap", "Hold the card to any modern phone. Your profile opens instantly — no app required."],
            ["03", "Follow up", "They save your contact, drop their info, and you get analytics on every tap."],
          ].map(([n, h, p], i) => (
            <TapReveal key={n} delay={i * 80}>
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-full border border-hairline bg-surface text-xs font-medium">
                  {n}
                </div>
                <h3 className="mt-6 font-display text-2xl tracking-tight">{h}</h3>
                <p className="mt-3 text-ink-soft">{p}</p>
              </div>
            </TapReveal>
          ))}
        </div>
      </Section>

      {/* ================== FEATURES ================== */}
      <Section className="py-8">
        <div className="grid gap-4 md:grid-cols-6">
          {[
            { t: "One tap, no app", d: "iOS 14+ and Android 8+ open your profile the instant they meet the card.", s: "md:col-span-3" },
            { t: "Live analytics", d: "Every tap, view, save and click — mapped to time, city and source.", s: "md:col-span-3" },
            { t: "Lead capture", d: "Optional inline form saves contacts directly to your dashboard and inbox.", s: "md:col-span-2" },
            { t: "Free design service", d: "A designer refines your profile — no template lock-in.", s: "md:col-span-2" },
            { t: "Local support, real people", d: "WhatsApp support based in Dhaka. Actual humans, actual replies.", s: "md:col-span-2" },
          ].map((f) => (
            <TapReveal key={f.t} className={f.s}>
              <div
                data-cursor="expand"
                className="group relative h-full overflow-hidden rounded-2xl border border-hairline bg-surface p-8"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-display text-xl tracking-tight">{f.t}</h3>
                  <ArrowUpRight size={18} className="text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <p className="mt-4 max-w-[42ch] text-sm text-ink-soft">{f.d}</p>
                <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-accent/0 blur-3xl transition-colors duration-500 group-hover:bg-accent/25" />
              </div>
            </TapReveal>
          ))}
        </div>
      </Section>

      {/* ================== THEMES TEASER ================== */}
      <Section className="py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <TapReveal className="lg:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">Themes</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] tracking-[-0.025em]">
              A deck for every kind of hand.
            </h2>
            <p className="mt-5 max-w-[44ch] text-ink-soft">
              Creator, Minimal, Designer, Developer, Gamer, Corporate, Football Fan, Cinematographer — and a free custom design if none of them are quite you.
            </p>
            <Link to="/themes" className="mt-8 inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 text-sm">
              Browse the deck <ArrowUpRight size={15} />
            </Link>
          </TapReveal>
          <TapReveal delay={100} className="lg:col-span-7">
            <div className="relative">
              <img
                src={cardsDeck}
                alt="A fanned deck of premium NFC business cards"
                width={1600}
                height={1104}
                loading="lazy"
                className="w-full rounded-2xl object-cover"
                style={{ boxShadow: "var(--shadow-lift)" }}
              />
            </div>
          </TapReveal>
        </div>
      </Section>

      {/* ================== ANALYTICS ================== */}
      <Section className="py-16">
        <div className="rounded-3xl border border-hairline bg-surface p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">Analytics</p>
              <h2 className="mt-5 font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.02] tracking-[-0.02em]">
                Paper can't do this.
              </h2>
              <p className="mt-4 text-ink-soft">Every tap, mapped. Every save, counted. Every follow-up, sourced.</p>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { n: 12480, s: "", l: "Taps this month" },
                  { n: 3120, s: "", l: "Contacts saved" },
                  { n: 42, s: "%", l: "Follow-up rate" },
                  { n: 27, s: "s", l: "Avg. handoff time" },
                ].map((k) => (
                  <div key={k.l} className="rounded-2xl border border-hairline p-5">
                    <p className="font-display text-3xl tracking-tight">
                      <CountUp to={k.n} suffix={k.s} />
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ink-soft">{k.l}</p>
                  </div>
                ))}
              </div>
              {/* fake chart */}
              <div className="mt-6 h-32 w-full overflow-hidden rounded-2xl border border-hairline p-4">
                <svg viewBox="0 0 400 100" className="h-full w-full">
                  <defs>
                    <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#1447AF" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#1447AF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,70 C40,60 60,40 90,50 C130,65 160,20 200,25 C240,30 260,55 300,45 C340,35 370,15 400,25 L400,100 L0,100 Z"
                    fill="url(#g)"
                  />
                  <path
                    d="M0,70 C40,60 60,40 90,50 C130,65 160,20 200,25 C240,30 260,55 300,45 C340,35 370,15 400,25"
                    fill="none" stroke="#1447AF" strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ================== VIDEO 2 (mirrored) ================== */}
      <Section className="py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <TapReveal className="order-2 lg:order-1 lg:col-span-7">
            <VideoBlock label="Founder note" />
          </TapReveal>
          <TapReveal delay={100} className="order-1 lg:order-2 lg:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">Watch · 02</p>
            <h3 className="mt-5 font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.02] tracking-[-0.02em]">
              Why we obsess over the material.
            </h3>
            <p className="mt-5 max-w-[42ch] text-ink-soft">
              The chip, the finish, the weight. A minute with our founder on why the physical card still matters — even in a software world.
            </p>
          </TapReveal>
        </div>
      </Section>

      {/* ================== LEAD CAPTURE ================== */}
      <Section className="py-24">
        <div className="grid gap-12 rounded-3xl border border-hairline bg-surface p-8 lg:grid-cols-12 lg:p-14">
          <TapReveal className="lg:col-span-6">
            <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">Lead capture</p>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,3.8vw,3.2rem)] leading-[1.02] tracking-[-0.02em]">
              Every tap becomes a lead — before the handshake ends.
            </h2>
            <ul className="mt-8 space-y-4 text-[15px]">
              {[
                "Auto-save to your phone contacts",
                "Inline lead form on your public profile",
                "CSV export & WhatsApp handoff",
                "Owner-only analytics dashboard",
              ].map((c) => (
                <li key={c} className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-accent" /> {c}
                </li>
              ))}
            </ul>
          </TapReveal>
          <TapReveal delay={100} className="lg:col-span-6">
            <div className="rounded-2xl border border-hairline bg-background p-6" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center justify-between text-xs text-ink-soft">
                <span>New lead · 2m ago</span>
                <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-accent chip-glow" /> live</span>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  ["Name", "Nusrat Jahan"],
                  ["Email", "nusrat@studio.bd"],
                  ["Company", "Studio Kagoj"],
                  ["Tapped at", "Radisson, Dhaka · 6:42 PM"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between border-b border-hairline py-2 text-sm">
                    <span className="text-ink-soft">{k}</span>
                    <span className="text-ink">{v}</span>
                  </div>
                ))}
              </div>
              <button className="mt-5 w-full rounded-full bg-foreground py-2.5 text-sm text-background">Save to CRM</button>
            </div>
          </TapReveal>
        </div>
      </Section>

      {/* ================== PAPER VS DIGITAL (color-invert wipe) ================== */}
      <div ref={invertRef} className="relative">
        <div
          className="transition-colors duration-700"
          style={{
            background: inverted ? "#0A0A0A" : "transparent",
            color: inverted ? "#FAFAFA" : "inherit",
          }}
        >
          <Section className="py-28">
            <p className="text-[11px] uppercase tracking-[0.28em] opacity-60">Compare</p>
            <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] tracking-[-0.025em]">
              Paper vs. <span className="italic opacity-70">digital.</span>
            </h2>

            <div className="mt-14 overflow-hidden rounded-2xl border" style={{ borderColor: inverted ? "rgba(255,255,255,0.12)" : "var(--hairline)" }}>
              <table className="w-full text-left text-sm">
                <thead className="text-[11px] uppercase tracking-[0.2em] opacity-60">
                  <tr>
                    <th className="p-5 font-normal">Attribute</th>
                    <th className="p-5 font-normal">Paper card</th>
                    <th className="p-5 font-normal">Identidy</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Update your info", "Reprint", "Instant, forever"],
                    ["Delivery of the profile", "Handoff", "One tap"],
                    ["Analytics", "None", "Live dashboard"],
                    ["Lifespan", "~ 1 week in a pocket", "Yours indefinitely"],
                    ["Design updates", "New print run", "Free, anytime"],
                  ].map((r) => (
                    <tr key={r[0]} className="border-t" style={{ borderColor: inverted ? "rgba(255,255,255,0.08)" : "var(--hairline)" }}>
                      <td className="p-5 opacity-70">{r[0]}</td>
                      <td className="p-5 opacity-60 line-through">{r[1]}</td>
                      <td className="p-5 font-medium">{r[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </div>
      </div>

      {/* ================== WHY IDENTIDY ================== */}
      <Section className="py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <TapReveal className="lg:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">Why Identidy</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] tracking-[-0.025em]">
              Built like a product,<br /> not a novelty.
            </h2>
          </TapReveal>
          <TapReveal delay={80} className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {[
              ["Premium build", "Metal, matte and print options finished to a spec you can feel."],
              ["Real analytics", "Not a QR count. Full funnel from tap to save to reply."],
              ["Free custom design", "A designer helps you land the right theme, on the house."],
              ["Local support", "Real people in Dhaka, over WhatsApp, in your timezone."],
            ].map(([h, p]) => (
              <div key={h} className="rounded-2xl border border-hairline p-6" style={{ boxShadow: "var(--shadow-card)" }}>
                <h3 className="font-display text-lg">{h}</h3>
                <p className="mt-2 text-sm text-ink-soft">{p}</p>
              </div>
            ))}
          </TapReveal>
        </div>
      </Section>

      {/* ================== TESTIMONIALS ================== */}
      <Section className="py-24">
        <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">Voices</p>
        <h2 className="mt-5 max-w-[20ch] font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] tracking-[-0.025em]">
          What people say after the first tap.
        </h2>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {[
            { img: t1, q: "I stopped reprinting cards. Titles change, my Identidy doesn't.", n: "Rafiq H.", c: "Founder — Dhaka" },
            { img: t2, q: "Clients remember the tap. That's an unfair advantage.", n: "Sadia K.", c: "Creative Dir. — Chattogram" },
            { img: t3, q: "I close faster because they open my profile at the meeting, not after.", n: "Imran S.", c: "Real Estate — Sylhet" },
          ].map((t, i) => (
            <TapReveal key={t.n} delay={i * 80}>
              <figure className="overflow-hidden rounded-2xl border border-hairline bg-surface">
                <img src={t.img} alt={t.n} width={800} height={1000} loading="lazy" className="h-72 w-full object-cover" />
                <figcaption className="p-6">
                  <blockquote className="font-display text-lg leading-snug tracking-tight">"{t.q}"</blockquote>
                  <p className="mt-4 text-xs uppercase tracking-[0.18em] text-ink-soft">
                    {t.n} · {t.c}
                  </p>
                </figcaption>
              </figure>
            </TapReveal>
          ))}
        </div>
      </Section>

      {/* ================== USE CASES ================== */}
      <Section className="py-16">
        <div className="rounded-3xl border border-hairline bg-surface p-8 sm:p-12">
          <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">Use cases</p>
          <h2 className="mt-4 font-display text-[clamp(1.75rem,3.4vw,2.75rem)] tracking-[-0.02em]">
            Built for handshakes that matter.
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {[
              ["Events", "🎟"],
              ["Sales", "📈"],
              ["Real estate", "🏙"],
              ["Creators", "✦"],
              ["Corporate", "◼"],
            ].map(([l, ic]) => (
              <div key={l} className="group relative overflow-hidden rounded-2xl border border-hairline p-6">
                <div className="text-3xl">{ic}</div>
                <p className="mt-6 font-display text-lg tracking-tight">{l}</p>
                <ArrowUpRight size={16} className="absolute right-4 top-4 text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ================== PRICING TEASER ================== */}
      <Section className="py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <TapReveal className="lg:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">Pricing</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] tracking-[-0.025em]">
              Three cards.<br /><span className="italic text-ink-soft">One tap each.</span>
            </h2>
            <p className="mt-5 max-w-[42ch] text-ink-soft">
              White for the everyday. Black for the room. Black Metal for the moment they don't forget.
            </p>
            <Link to="/pricing" className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm text-background">
              See pricing <ArrowUpRight size={16} />
            </Link>
          </TapReveal>
          <TapReveal delay={100} className="grid gap-5 sm:grid-cols-3 lg:col-span-7">
            {(["white", "black", "metal"] as const).map((v, i) => (
              <TiltCard key={v}>
                <CardMockup
                  variant={v}
                  name={["Ayaan Rahman", "Nadia Chowdhury", "Zaman Ahmed"][i]}
                  role={["Product Designer", "CEO, Studio Kagoj", "Director, Metal & Co."][i]}
                />
              </TiltCard>
            ))}
          </TapReveal>
        </div>
      </Section>

      {/* ================== FAQ ================== */}
      <Section className="py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">FAQ</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] tracking-[-0.025em]">
              Answers, in one tap.
            </h2>
          </div>
          <div className="lg:col-span-8">
            {[
              ["Does it need an app?", "No. Modern iOS and Android open your profile natively when the card is tapped."],
              ["What if I change roles or numbers?", "Update your profile once — every card you own reflects the change immediately."],
              ["Is my data private?", "Yes. You control what's visible, who fills a lead form, and what analytics you keep."],
              ["Do you deliver outside Bangladesh?", "Currently we serve Bangladesh with rapid delivery. International shipping is rolling out."],
              ["What if I don't like a theme?", "Every order includes a free design pass with our team — no template lock-in."],
            ].map(([q, a]) => (
              <details key={q} className="group border-t border-hairline py-5" data-cursor="expand">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[15px] font-medium">
                  {q}
                  <span className="text-ink-soft transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-[62ch] text-[15px] text-ink-soft">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* ================== CLOSING CTA ================== */}
      <Section className="pb-32">
        <TapReveal>
          <div className="relative overflow-hidden rounded-3xl bg-[#0A0A0A] px-8 py-20 text-[#FAFAFA] sm:px-14 sm:py-28 grain">
            <div className="pointer-events-none absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-accent/40 blur-[120px] aurora" />
            <img
              src={cardMacro}
              alt=""
              aria-hidden
              width={1400}
              height={1000}
              loading="lazy"
              className="pointer-events-none absolute -right-32 -top-20 hidden w-[720px] max-w-none opacity-40 md:block"
            />
            <p className="relative text-[11px] uppercase tracking-[0.28em] text-white/60">Ready?</p>
            <h2 className="relative mt-6 max-w-[16ch] text-balance font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.94] tracking-[-0.035em]">
              Make the next handshake unforgettable.
            </h2>
            <Link
              to="/get-your-card"
              className="relative mt-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-[#0A0A0A] transition-transform hover:scale-[1.02]"
            >
              Get your card
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </TapReveal>
      </Section>
    </>
  );
}
