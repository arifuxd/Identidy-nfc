import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Play, MinusCircle, CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
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

const TIERS = [
  {
    name: "White",
    tag: "The everyday",
    price: "৳499",
    variant: "white" as const,
    features: ["Matte print finish", "Custom color accents", "Live profile & analytics", "Free design assistance", "Lifetime updates"],
  },
  {
    name: "Black",
    tag: "The room",
    price: "৳599",
    variant: "black" as const,
    features: ["Deep matte black", "Laser-etched detail", "Live profile & analytics", "Free design assistance", "Lifetime updates", "Priority support"],
    featured: true,
  },
  {
    name: "Black Metal",
    tag: "The moment",
    price: "৳1,699",
    variant: "metal" as const,
    features: ["Brushed metal body", "Custom engraving", "Weighted premium feel", "Live profile & analytics", "Free design assistance", "Lifetime updates", "Concierge onboarding"],
  },
];

function TiltPricingCard({ tier }: { tier: (typeof TIERS)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState<React.CSSProperties>({});
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        setT({ transform: `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)` });
      }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => { setT({ transform: "perspective(1000px) rotateY(0) rotateX(0)" }); setFlipped(false); }}
      className={[
        "group relative rounded-3xl border p-6 sm:p-8 transition-shadow duration-500",
        tier.featured ? "border-accent/40" : "border-hairline",
      ].join(" ")}
      style={{
        ...t,
        transformStyle: "preserve-3d",
        boxShadow: tier.featured ? "var(--shadow-lift)" : "var(--shadow-card)",
        background: "var(--surface)",
      }}
    >
      {tier.featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Most tapped
        </span>
      )}
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-2xl tracking-tight">{tier.name}</h3>
        <span className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">{tier.tag}</span>
      </div>
      <p className="mt-6 font-display text-5xl tracking-[-0.03em]">
        {tier.price}
        <span className="ml-2 text-sm font-normal text-ink-soft">/ card</span>
      </p>

      <div className="mt-8" style={{ perspective: 1200 }}>
        <div
          className="relative aspect-[1.586/1] w-full transition-transform duration-700"
          style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0)" }}
        >
          <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
            <CardMockup variant={tier.variant} name="Your Name" role="Your Role" largeLogo />
          </div>
          <div
            className={[
              "absolute inset-0 rounded-2xl p-5",
              tier.variant === "white"
                ? "border border-hairline bg-background text-foreground"
                : "border border-white/10 bg-[#0A0A0A] text-white",
            ].join(" ")}
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", boxShadow: "var(--shadow-card)" }}
          >
            <p
              className={[
                "text-[10.5px] uppercase tracking-[0.22em]",
                tier.variant === "white" ? "text-ink-soft" : "text-white/60",
              ].join(" ")}
            >
              Included
            </p>
            <ul className="mt-3 grid grid-cols-1 gap-1.5 text-[13px]">
              {tier.features.slice(0, 5).map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check size={13} className="text-accent shrink-0" />
                  <span className={tier.variant === "white" ? "text-ink" : "text-white/90"}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Link
        to="/get-your-card"
        style={tier.featured ? { color: "#ffffff" } : undefined}
        className={[
          "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-transform hover:scale-[1.01]",
          tier.featured ? "bg-accent !text-white" : "bg-foreground text-background",
        ].join(" ")}
      >
        Order {tier.name} <ArrowUpRight size={15} />
      </Link>
    </div>
  );
}

const TESTIMONIALS = [
  { img: t1, q: "I stopped reprinting cards. Titles change, my Identidy doesn't.", n: "Rafiq H.", c: "Founder — Dhaka" },
  { img: t2, q: "Clients remember the tap. That's an unfair advantage.", n: "Sadia K.", c: "Creative Dir. — Chattogram" },
  { img: t3, q: "I close faster because they open my profile at the meeting, not after.", n: "Imran S.", c: "Real Estate — Sylhet" },
];

function TestimonialsSlider() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleManualScroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = 340;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mt-14 group/slider max-w-[1440px] mx-auto">
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 md:grid md:grid-cols-3 md:overflow-x-visible md:pb-0"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className="w-[290px] sm:w-[320px] md:w-full shrink-0 snap-start"
          >
            <figure className="flex flex-col justify-between h-full rounded-2xl border border-hairline bg-surface p-6 sm:p-8 min-h-[220px]">
              <blockquote className="font-display text-[15.5px] sm:text-[16.5px] leading-relaxed text-ink tracking-tight">
                "{t.q}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={t.img}
                  alt={t.n}
                  loading="lazy"
                  className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover border border-hairline bg-surface-soft"
                />
                <div>
                  <p className="font-semibold text-xs sm:text-sm text-ink leading-none">{t.n}</p>
                  <p className="mt-1 text-[11px] text-ink-soft leading-none">{t.c}</p>
                </div>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 -left-4 -right-4 flex justify-between pointer-events-none z-20 md:hidden">
        <button
          onClick={() => handleManualScroll("left")}
          aria-label="Scroll left"
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface text-ink shadow-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ArrowLeft size={16} />
        </button>
        <button
          onClick={() => handleManualScroll("right")}
          aria-label="Scroll right"
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface text-ink shadow-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ArrowRight size={16} />
        </button>
      </div>
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
      <Section className="pb-8 pt-8 sm:pt-14">
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

            <div className="tap-in-delay-4 mt-2 flex flex-wrap items-center gap-3">
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
      <section className="mt-2 overflow-hidden border-y border-hairline py-5">
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
        <TestimonialsSlider />
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

      {/* ================== PRICING ================== */}
      <Section className="py-16">
        <div className="mb-14 text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">Pricing</p>
          <h2 className="mt-4 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.02] tracking-[-0.025em]">
            Three cards. <span className="italic text-ink-soft">One tap each.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-[15px] text-ink-soft">
            All prices include free design assistance, lifetime profile updates, and analytics. No subscription.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TIERS.map((tier) => (
            <TiltPricingCard key={tier.name} tier={tier} />
          ))}
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
