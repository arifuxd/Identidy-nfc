import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { CardMockup } from "@/components/site/CardMockup";
import { TapReveal } from "@/components/site/TapReveal";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Identidy" },
      { name: "description", content: "White, Black and Black Metal — three tiers of the Identidy NFC card. Simple pricing, free design, bulk options for teams." },
      { property: "og:title", content: "Pricing — Identidy" },
      { property: "og:description", content: "Three NFC card tiers. Simple pricing. Free design service." },
    ],
  }),
  component: Pricing,
});

const TIERS = [
  {
    name: "White",
    tag: "The everyday",
    price: "৳2,490",
    variant: "white" as const,
    features: ["Matte print finish", "Custom color accents", "Live profile & analytics", "Free design assistance", "Lifetime updates"],
  },
  {
    name: "Black",
    tag: "The room",
    price: "৳3,490",
    variant: "black" as const,
    features: ["Deep matte black", "Laser-etched detail", "Live profile & analytics", "Free design assistance", "Lifetime updates", "Priority support"],
    featured: true,
  },
  {
    name: "Black Metal",
    tag: "The moment",
    price: "৳6,900",
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
        const r = ref.current!.getBoundingClientRect();
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
        <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-accent-ink">
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
            <CardMockup variant={tier.variant} name="Your Name" role="Your Role" />
          </div>
          <div
            className="absolute inset-0 rounded-2xl border border-hairline bg-background p-5"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", boxShadow: "var(--shadow-card)" }}
          >
            <p className="text-[10.5px] uppercase tracking-[0.22em] text-ink-soft">Included</p>
            <ul className="mt-3 grid grid-cols-1 gap-1.5 text-[13px]">
              {tier.features.slice(0, 5).map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check size={13} className="text-accent" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <ul className="mt-8 space-y-2.5 text-sm">
        {tier.features.map((f) => (
          <li key={f} className="flex items-center gap-3">
            <Check size={16} className="text-accent" /> {f}
          </li>
        ))}
      </ul>

      <Link
        to="/get-your-card"
        className={[
          "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-transform hover:scale-[1.01]",
          tier.featured ? "bg-accent text-accent-ink" : "bg-foreground text-background",
        ].join(" ")}
      >
        Order {tier.name} <ArrowUpRight size={15} />
      </Link>
    </div>
  );
}

function Pricing() {
  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 pt-16 pb-16 sm:px-8">
        <p className="tap-in text-[11px] uppercase tracking-[0.28em] text-ink-soft">Pricing</p>
        <h1 className="tap-in-delay-1 mt-6 max-w-[22ch] text-balance font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.94] tracking-[-0.035em]">
          Three cards. <span className="italic text-ink-soft">One tap each.</span>
        </h1>
        <p className="tap-in-delay-2 mt-6 max-w-[52ch] text-lg text-ink-soft">
          All prices include free design assistance, lifetime profile updates, and analytics. No subscription.
        </p>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {TIERS.map((t, i) => (
            <TapReveal key={t.name} delay={i * 80}>
              <TiltPricingCard tier={t} />
            </TapReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8">
        <div className="grid gap-6 rounded-3xl border border-hairline bg-surface p-8 sm:p-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">Bulk & enterprise</p>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,3.4vw,2.75rem)] tracking-[-0.02em]">
              Cards for your whole team. Priced per handshake.
            </h2>
            <p className="mt-3 max-w-[54ch] text-ink-soft">
              Custom finishes, brand-wide theming, admin dashboards, department analytics. Message us on WhatsApp for a same-day quote.
            </p>
          </div>
          <div className="lg:col-span-4">
            <a
              href="https://wa.me/8801000000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm font-medium text-background"
            >
              Chat on WhatsApp <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8">
        <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">Pricing FAQ</p>
        <h2 className="mt-5 font-display text-[clamp(1.9rem,3.6vw,3rem)] tracking-[-0.02em]">Common questions.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            ["Are updates really free?", "Yes. Update your profile as often as you like — every card you own reflects it instantly."],
            ["Is there a subscription?", "No subscription for individual cards. Enterprise plans include admin dashboards."],
            ["Do you deliver nationwide?", "Yes. Delivery across Bangladesh in 3–5 business days."],
            ["Can I change my theme later?", "Absolutely. Redesign your profile any time — no reprint required."],
          ].map(([q, a]) => (
            <div key={q} className="rounded-2xl border border-hairline p-6">
              <h3 className="font-medium">{q}</h3>
              <p className="mt-2 text-sm text-ink-soft">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
