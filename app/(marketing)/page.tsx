"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Check, Play, MinusCircle, CheckCircle2 } from "lucide-react";
import { HeroTap } from "@/components/site/HeroTap";
import { CardMockup } from "@/components/site/CardMockup";
import { TapReveal, CountUp } from "@/components/site/TapReveal";
import { useEffect, useRef, useState } from "react";

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
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
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

function VideoBlock({
  label,
  youtubeId,
  isReel = false,
  thumbnailUrl,
}: {
  label: string;
  youtubeId?: string;
  isReel?: boolean;
  thumbnailUrl?: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing && youtubeId) {
    return (
      <div className={`relative ${isReel ? "aspect-[9/16] max-w-[300px] mx-auto w-full" : "aspect-video w-full"} overflow-hidden rounded-2xl bg-[#0A0A0A]`}>
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=0&playsinline=1`}
            title={label}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute -top-[52px] h-[calc(100%+104px)] w-full scale-[1.01]"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`group relative ${isReel ? "aspect-[9/16] max-w-[300px] mx-auto w-full" : "aspect-video w-full"} overflow-hidden rounded-2xl bg-[#0A0A0A] grain`}>
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={label}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(20,71,175,0.35),transparent_60%)]" />
      )}
      <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/35" />
      <div className="absolute inset-0 grid place-items-center z-10">
        <button
          onClick={() => {
            if (youtubeId) setPlaying(true);
          }}
          aria-label={`Play ${label}`}
          className="relative grid h-20 w-20 place-items-center rounded-full border border-white/25 bg-white/5 backdrop-blur transition-transform duration-300 group-hover:scale-105"
        >
          <Play size={22} className="translate-x-0.5 text-white" fill="white" />
          <span className="pointer-events-none absolute inset-0 rounded-full border border-white/30 ripple-loop" />
        </button>
      </div>
    </div>
  );
}

export default function MarketingPage() {
  const router = useRouter();
  const invertRef = useRef<HTMLDivElement>(null);
  const [inverted, setInverted] = useState(false);
  const [claimUsername, setClaimUsername] = useState("");
  const [checkingStatus, setCheckingStatus] = useState<"idle" | "checking" | "available" | "unavailable">("idle");

  useEffect(() => {
    const el = invertRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) setInverted(e.isIntersecting);
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const trimmed = claimUsername.trim();
    if (!trimmed) {
      setCheckingStatus("idle");
      return;
    }

    setCheckingStatus("checking");

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/slug/check?slug=${encodeURIComponent(trimmed)}`);
        const data = await res.json();
        if (data.available) {
          setCheckingStatus("available");
        } else {
          setCheckingStatus("unavailable");
        }
      } catch (err) {
        setCheckingStatus("unavailable");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [claimUsername]);

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (claimUsername.trim() && checkingStatus === "available") {
      router.push(`/get-your-card?username=${encodeURIComponent(claimUsername.trim())}`);
    }
  };

  return (
    <>
      {/* ================== HERO ================== */}
      <Section className="pb-16 pt-8 sm:pt-14">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="tap-in text-[11px] uppercase tracking-[0.28em] text-ink-soft">
              Made in Bangladesh
            </p>
            <h1 className="tap-in-delay-1 mt-6 text-balance font-display text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.035em]">
              Tap your card. <br />
              Share your <span className="italic text-ink-soft">profile.</span>
            </h1>
            <p className="tap-in-delay-2 mt-8 max-w-[58ch] text-[15px] leading-relaxed text-ink-soft">
              Share your contact details, portfolio, LinkedIn, website, social media, and more with a premium NFC business card. Identidy helps professionals across Bangladesh replace paper business cards with a smarter digital business card.
            </p>

            {/* username claim */}
            <div className="tap-in-delay-3 mt-9 max-w-[520px]">
              <form
                onSubmit={handleClaim}
                className="flex items-center gap-2 rounded-full border border-black dark:border-white bg-surface p-1.5 pl-4"
              >
                <span className="text-sm text-ink-soft">identidy.net/</span>
                <input
                  aria-label="Claim your username"
                  placeholder="yourname"
                  value={claimUsername}
                  onChange={(e) => setClaimUsername(e.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-ink-soft/60"
                />
                <button
                  type="submit"
                  disabled={checkingStatus !== "available"}
                  className="rounded-full bg-btn-primary px-4 py-2 text-[13px] font-medium text-btn-primary transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Claim
                </button>
              </form>

              <div className="h-5 mt-2.5 pl-4 text-xs flex items-center gap-2">
                {checkingStatus === "checking" && (
                  <>
                    <span className="h-3 w-3 animate-spin rounded-full border-[1.5px] border-ink-soft border-t-transparent" />
                    <span className="text-ink-soft">Checking username availability...</span>
                  </>
                )}
                {checkingStatus === "available" && (
                  <span className="text-success font-medium">
                    Excellent! That username is available
                  </span>
                )}
                {checkingStatus === "unavailable" && (
                  <span className="text-danger font-medium">
                    That username is not available
                  </span>
                )}
              </div>
            </div>

            <div className="tap-in-delay-4 mt-2 flex flex-wrap items-center gap-3">
              <Link href="/get-your-card" className="group inline-flex items-center gap-2 rounded-full bg-btn-primary px-5 py-3 text-sm font-medium text-btn-primary transition-transform hover:scale-[1.02]">
                Get your card
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link href="/demo" className="inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 text-sm">
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



      {/* ================== WATCH & HOW IT WORKS ================== */}
      <Section className="py-16">
        {/* Section title on top */}
        <div className="mb-16 text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">Process</p>
          <h2 className="mt-4 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.02] tracking-[-0.025em]">
            How it <span className="italic text-ink-soft">works.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[48ch] text-[15px] text-ink-soft">
            A premium physical card powered by a lightning-fast digital profile. Tap to share, save, and capture leads instantly.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Features 1-3 */}
          <TapReveal className="lg:col-span-4 space-y-12 flex flex-col items-start lg:items-end">
            {[
              ["01", "One-Tap Share", "Share your contact details, social links, website, and portfolio with a single deliberate tap."],
              ["02", "No App Required", "Your digital business card profile opens natively in their mobile browser—no store downloads needed."],
              ["03", "Instant Contact Save", "Prospects can save your contact details (.vcf) directly into their phonebook in one tap."],
            ].map(([n, h, p]) => (
              <div key={n} className="flex flex-col items-start gap-2.5 lg:items-end lg:text-right max-w-[27ch]">
                <div className="grid h-7 w-7 place-items-center rounded-full border border-hairline bg-surface text-[10.5px] font-medium text-accent">
                  {n}
                </div>
                <div>
                  <h4 className="font-display text-[15.5px] font-semibold text-ink">{h}</h4>
                  <p className="mt-1.5 text-xs text-ink-soft leading-relaxed">{p}</p>
                </div>
              </div>
            ))}
          </TapReveal>

          {/* Middle Column: Reel Video player */}
          <TapReveal delay={100} className="lg:col-span-4 flex justify-center w-full">
            <VideoBlock label="Product film" youtubeId="C1n0X8m1OXI" isReel thumbnailUrl="/thumbnail-video-1.png" />
          </TapReveal>

          {/* Right Column: Features 4-6 */}
          <TapReveal delay={200} className="lg:col-span-4 space-y-12">
            {[
              ["04", "Real-Time Updates", "Change your links, contact details, or profile theme anytime. Your card updates instantly."],
              ["05", "Tap Analytics", "Track tap frequency, profile views, and link clicks mapped to dates and cities directly in your dashboard."],
              ["06", "Two-Way Exchange", "Capture details back from prospects immediately via the lead form on your public profile."],
            ].map(([n, h, p]) => (
              <div key={n} className="flex flex-col items-start gap-2.5">
                <div className="grid h-7 w-7 place-items-center rounded-full border border-hairline bg-surface text-[10.5px] font-medium text-accent">
                  {n}
                </div>
                <div>
                  <h4 className="font-display text-[15.5px] font-semibold text-ink">{h}</h4>
                  <p className="mt-1.5 text-xs text-ink-soft leading-relaxed max-w-[34ch]">{p}</p>
                </div>
              </div>
            ))}
          </TapReveal>
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
      <Section className="py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <TapReveal className="lg:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">Themes</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] tracking-[-0.025em]">
              A deck for every kind of hand.
            </h2>
            <p className="mt-5 max-w-[44ch] text-ink-soft">
              Creator, Minimal, Designer, Developer, Gamer, Corporate, Football Fan, Cinematographer — and a free custom design if none of them are quite you.
            </p>
            <Link href="/themes" className="mt-8 inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 text-sm">
              Browse the deck <ArrowUpRight size={15} />
            </Link>
          </TapReveal>
          <TapReveal delay={100} className="lg:col-span-7">
            <div className="relative">
              <img
                src="/cards-deck.jpg"
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
      <Section className="py-12">
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

      {/* ================== PAPER VS DIGITAL (color-invert wipe) ================== */}
      <div ref={invertRef} className="relative">
        <div
          className="transition-colors duration-700"
          style={{
            background: inverted ? "#0A0A0A" : "transparent",
            color: inverted ? "#FAFAFA" : "inherit",
          }}
        >
          <Section className="py-16">
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
      <Section className="py-16">
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
      <Section className="py-14">
        <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">Voices</p>
        <h2 className="mt-5 max-w-[20ch] font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] tracking-[-0.025em]">
          What people say after the first tap.
        </h2>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {[
            { img: "/testimonial-1.jpg", q: "I stopped reprinting cards. Titles change, my Identidy doesn't.", n: "Rafiq H.", c: "Founder — Dhaka" },
            { img: "/testimonial-2.jpg", q: "Clients remember the tap. That's an unfair advantage.", n: "Sadia K.", c: "Creative Dir. — Chattogram" },
            { img: "/testimonial-3.jpg", q: "I close faster because they open my profile at the meeting, not after.", n: "Imran S.", c: "Real Estate — Sylhet" },
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
      <Section className="py-12">
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
      <Section className="py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <TapReveal className="lg:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">Pricing</p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] tracking-[-0.025em]">
              Three cards.<br /><span className="italic text-ink-soft">One tap each.</span>
            </h2>
            <p className="mt-5 max-w-[42ch] text-ink-soft">
              White for the everyday. Black for the room. Black Metal for the moment they don't forget.
            </p>
            <Link href="/pricing" className="mt-8 inline-flex items-center gap-2 rounded-full bg-btn-primary px-5 py-3 text-sm text-btn-primary">
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
      <Section className="py-14">
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
              <details key={q} className="group border-t border-hairline py-5 animate-none" data-cursor="expand">
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
              src="/card-macro.jpg"
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
              href="/get-your-card"
              className="relative mt-10 inline-flex items-center gap-2 rounded-full bg-btn-dark px-6 py-3.5 text-sm font-medium text-btn-dark transition-transform hover:scale-[1.02]"
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
