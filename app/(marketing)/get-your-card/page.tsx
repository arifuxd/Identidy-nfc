"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Info } from "lucide-react";
import { CardMockup } from "@/components/site/CardMockup";
import { TapReveal } from "@/components/site/TapReveal";

const TIERS = [
  { id: "white", label: "White", variant: "white" as const, price: "৳499" },
  { id: "black", label: "Black", variant: "black" as const, price: "৳599" },
  { id: "metal", label: "Black Metal", variant: "metal" as const, price: "৳1,699" },
];

const THEMES = ["Creator", "Minimal", "Designer", "Developer", "Gamer", "Corporate", "Football Fan", "Cinematographer"];

const DIVISIONS = ["Dhaka", "Chattogram", "Sylhet", "Khulna", "Rajshahi", "Barishal", "Rangpur", "Mymensingh"];

function GetYourCardContent() {
  const searchParams = useSearchParams();
  const usernameParam = searchParams.get("username") || "";

  const [tier, setTier] = useState("black");
  const [theme, setTheme] = useState("Minimal");
  const [placed, setPlaced] = useState(false);
  const [username, setUsername] = useState(usernameParam);

  React.useEffect(() => {
    if (usernameParam) {
      setUsername(usernameParam);
    }
  }, [usernameParam]);

  const selected = TIERS.find((t) => t.id === tier)!;

  if (placed) {
    return (
      <section className="mx-auto max-w-[900px] px-5 py-24 sm:px-8">
        <div className="tap-in rounded-3xl border border-hairline bg-surface p-10 text-center sm:p-16">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-accent">
            <CheckCircle2 size={28} />
          </div>
          <h1 className="mt-8 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1] tracking-[-0.03em]">
            Order placed.
          </h1>
          <p className="mt-4 text-lg text-ink-soft">
            We'll message you on WhatsApp within 24 hours to confirm your card design and delivery.
          </p>
          <ul className="mx-auto mt-10 grid max-w-md gap-3 text-left text-sm">
            {[
              "You'll receive a design proof within 24–48 hours.",
              "Approve the design — we print & ship in 3–5 days.",
              "Pay on delivery. No charge until you have the card.",
            ].map((s) => (
              <li key={s} className="flex items-start gap-3 rounded-xl border border-hairline p-4 text-foreground">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-accent chip-glow" /> {s}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 pt-16 sm:px-8">
        <p className="tap-in text-[11px] uppercase tracking-[0.28em] text-ink-soft">Order</p>
        <h1 className="tap-in-delay-1 mt-6 max-w-[22ch] text-balance font-display text-[clamp(2.25rem,5.5vw,5rem)] leading-[0.96] tracking-[-0.03em] text-foreground">
          Get your card. <span className="italic text-ink-soft">No payment now.</span>
        </h1>
        <div className="tap-in-delay-2 mt-6 inline-flex items-start gap-3 rounded-2xl border border-hairline bg-surface p-4 text-sm text-foreground">
          <Info size={16} className="mt-0.5 text-accent flex-shrink-0" />
          <p className="max-w-[62ch] text-ink-soft">
            No payment needed now — we'll contact you within 24 hours to confirm your order and card design. Pay on delivery.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12">
        <TapReveal className="lg:col-span-8">
          <form
            onSubmit={(e) => { e.preventDefault(); setPlaced(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="space-y-10 rounded-3xl border border-hairline bg-surface p-6 sm:p-10"
          >
            {/* Tier */}
            <fieldset>
              <legend className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">Card tier</legend>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {TIERS.map((t) => (
                  <label
                    key={t.id}
                    className={[
                      "cursor-pointer rounded-2xl border p-4 transition-transform hover:-translate-y-0.5 text-foreground block",
                      tier === t.id ? "border-accent" : "border-hairline",
                    ].join(" ")}
                  >
                    <input type="radio" name="tier" value={t.id} checked={tier === t.id} onChange={() => setTier(t.id)} className="sr-only" />
                    <CardMockup variant={t.variant} name="Your Name" role="Your Role" />
                    <div className="mt-4 flex items-baseline justify-between">
                      <p className="font-medium">{t.label}</p>
                      <p className="font-display text-lg">{t.price}</p>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Username claim context */}
            <fieldset>
              <legend className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">Profile URL</legend>
              <div className="mt-4">
                <Field label="Desired username" required>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-ink-soft">identidy.net/</span>
                    <input
                      required
                      className="i flex-1 min-w-0"
                      placeholder="yourname"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </Field>
              </div>
            </fieldset>

            {/* Contact */}
            <fieldset>
              <legend className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">Your details</legend>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Field label="Full name" required><input required className="i text-foreground" placeholder="Ayaan Rahman" /></Field>
                <Field label="Email" required><input required type="email" className="i text-foreground" placeholder="you@company.com" /></Field>
                <Field label="Phone / WhatsApp" required><input required className="i text-foreground" placeholder="+880 1XXX ..." /></Field>
                <Field label="Company (optional)"><input className="i text-foreground" placeholder="Studio Kagoj" /></Field>
              </div>
            </fieldset>

            {/* Delivery */}
            <fieldset>
              <legend className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">Delivery</legend>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Field label="Division" required>
                  <select required className="i text-foreground">
                    {DIVISIONS.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </Field>
                <Field label="District" required><input required className="i text-foreground" placeholder="Dhaka" /></Field>
                <div className="sm:col-span-2">
                  <Field label="Full address" required><textarea required rows={3} className="i resize-none text-foreground" placeholder="House, road, area, postcode" /></Field>
                </div>
              </div>
            </fieldset>

            {/* Design */}
            <fieldset>
              <legend className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">Design preference</legend>
              <div className="mt-4 space-y-4">
                <Field label="Preferred theme">
                  <select className="i text-foreground" value={theme} onChange={(e) => setTheme(e.target.value)}>
                    {THEMES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Notes for the designer (optional)">
                  <textarea rows={3} className="i resize-none text-foreground" placeholder="Colors, tone, links to include, anything we should know." />
                </Field>
              </div>
            </fieldset>

            <button className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-btn-primary py-4 text-sm font-medium text-btn-primary transition-transform hover:scale-[1.005] active:scale-[0.99]">
              Place order — we'll confirm within 24 hours
            </button>
            <p className="text-center text-[11px] uppercase tracking-[0.22em] text-ink-soft">No payment required now</p>
          </form>
        </TapReveal>

        {/* Summary */}
        <TapReveal delay={80} className="lg:col-span-4">
          <div className="sticky top-24 rounded-3xl border border-hairline bg-background p-6" style={{ boxShadow: "var(--shadow-card)" }}>
            <p className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">Order summary</p>
            <div className="mt-5">
              <CardMockup variant={selected.variant} name="Your Name" role="Your Role" hideTapConnect />
            </div>
            <dl className="mt-6 space-y-3 border-t border-hairline pt-5 text-sm">
              <Row k="Card" v={selected.label} />
              <Row k="Theme" v={theme} />
              <Row k="Desired URL" v={username ? `identidy.net/${username}` : "Not claimed"} />
              <Row k="Design revisions" v="Unlimited" />
              <Row k="Analytics" v="Included" />
              <Row k="Delivery" v="3–5 days" />
            </dl>
            <div className="mt-6 flex items-baseline justify-between border-t border-hairline pt-5">
              <span className="text-sm text-ink-soft">Estimated total</span>
              <span className="font-display text-2xl tracking-tight text-foreground">{selected.price}</span>
            </div>
            <p className="mt-3 text-xs text-ink-soft">Cash on delivery. Nothing charged until the card is in your hand.</p>
          </div>
        </TapReveal>
      </section>
    </>
  );
}

export default function GetYourCard() {
  return (
    <Suspense fallback={<div className="text-center py-24 text-ink-soft">Loading order form...</div>}>
      <GetYourCardContent />
    </Suspense>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">
        {label}{required && <span className="text-accent"> *</span>}
      </span>
      <div className="mt-2 [&_.i]:w-full [&_.i]:rounded-xl [&_.i]:border [&_.i]:border-hairline [&_.i]:bg-background [&_.i]:px-4 [&_.i]:py-3 [&_.i]:text-sm [&_.i]:outline-none focus-within:[&_.i]:border-accent">
        {children}
      </div>
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between text-foreground">
      <dt className="text-ink-soft">{k}</dt>
      <dd className="text-ink font-medium">{v}</dd>
    </div>
  );
}
