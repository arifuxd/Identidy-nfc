import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Download, Instagram, Linkedin, Globe, Mail, Phone, MapPin } from "lucide-react";
import { TapReveal } from "@/components/site/TapReveal";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Demo Profile — Identidy" },
      { name: "description", content: "A live Identidy profile — see how a real card looks in the hand and on the phone." },
      { property: "og:title", content: "Demo Profile — Identidy" },
      { property: "og:description", content: "Live Identidy profile with working Save Contact and lead form." },
    ],
  }),
  component: Demo,
});

function Demo() {
  const [saved, setSaved] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 pt-16 sm:px-8">
        <p className="tap-in text-[11px] uppercase tracking-[0.28em] text-ink-soft">Live demo profile</p>
        <h1 className="tap-in-delay-1 mt-6 max-w-[20ch] font-display text-[clamp(2.25rem,5.5vw,5rem)] leading-[0.96] tracking-[-0.03em]">
          This is what opens when the card taps a phone.
        </h1>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-8 px-5 py-16 sm:px-8 lg:grid-cols-12">
        <TapReveal className="lg:col-span-5">
          <div className="mx-auto max-w-sm">
            {/* Phone frame */}
            <div className="relative rounded-[46px] border border-hairline bg-[#0A0A0A] p-3 shadow-2xl">
              <div className="absolute left-1/2 top-3 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
              <div className="relative overflow-hidden rounded-[38px] bg-background">
                <div className="relative h-32 bg-gradient-to-br from-[#0A0A0A] via-accent to-[#1447AF]">
                  <div className="pointer-events-none absolute inset-0 grain" />
                </div>
                <div className="-mt-12 px-5 pb-6">
                  <div className="mx-auto h-24 w-24 rounded-full border-4 border-background bg-surface" style={{
                    background: "conic-gradient(from 220deg, #1447AF, #0A0A0A, #1447AF)",
                  }} />
                  <div className="mt-4 text-center">
                    <h2 className="font-display text-2xl tracking-tight">Ayaan Rahman</h2>
                    <p className="mt-1 text-sm text-ink-soft">Product Designer · Identidy</p>
                    <p className="mt-1 text-xs text-ink-soft">Dhaka, Bangladesh</p>
                  </div>

                  <button
                    onClick={() => setSaved(true)}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3 text-sm font-medium text-background transition-transform active:scale-95"
                  >
                    <Download size={16} /> {saved ? "Contact saved" : "Save contact"}
                  </button>

                  <div className="mt-5 grid grid-cols-4 gap-2">
                    {[Instagram, Linkedin, Globe, Mail].map((I, i) => (
                      <a key={i} href="#" className="grid aspect-square place-items-center rounded-xl border border-hairline transition-transform hover:scale-105">
                        <I size={16} />
                      </a>
                    ))}
                  </div>

                  <div className="mt-5 space-y-2">
                    {[
                      [Phone, "+880 1XXX 000000"],
                      [Mail, "ayaan@identidy.co"],
                      [MapPin, "Gulshan, Dhaka"],
                    ].map(([I, v], i) => {
                      const Icon = I as typeof Phone;
                      return (
                        <div key={i} className="flex items-center gap-3 rounded-xl border border-hairline p-3 text-sm">
                          <Icon size={15} className="text-ink-soft" /> {v as string}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6">
                    <p className="text-[10.5px] uppercase tracking-[0.22em] text-ink-soft">Leave your info</p>
                    <form
                      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                      className="mt-3 space-y-2"
                    >
                      <input required placeholder="Your name" className="w-full rounded-xl border border-hairline bg-background px-3 py-2.5 text-sm outline-none focus:border-accent" />
                      <input required type="email" placeholder="Email" className="w-full rounded-xl border border-hairline bg-background px-3 py-2.5 text-sm outline-none focus:border-accent" />
                      <button className="w-full rounded-full bg-accent py-2.5 text-sm font-medium text-accent-ink">
                        {sent ? "Sent ✓" : "Send"}
                      </button>
                    </form>
                  </div>

                  <p className="mt-5 text-center text-[10.5px] uppercase tracking-[0.22em] text-ink-soft">
                    Powered by Identidy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TapReveal>

        <TapReveal delay={100} className="lg:col-span-7">
          <div className="rounded-3xl border border-hairline bg-surface p-8 sm:p-12">
            <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">What you're looking at</p>
            <h2 className="mt-5 font-display text-[clamp(1.75rem,3.4vw,2.75rem)] tracking-[-0.02em]">
              A real profile. Real Save Contact. Real lead form.
            </h2>
            <p className="mt-5 text-ink-soft">
              This is the exact page that opens on a phone after a tap. Nothing to install. Nothing to sign up for. Fully yours to design and update.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["Instant open", "No app dialog, no store redirect."],
                ["Native contact save", "Downloads a vCard the phone recognizes."],
                ["Lead capture", "Every submission lands in your dashboard."],
                ["Analytics", "Timestamped taps, mapped by city."],
              ].map(([h, p]) => (
                <li key={h} className="rounded-2xl border border-hairline p-5">
                  <h3 className="font-medium">{h}</h3>
                  <p className="mt-1.5 text-sm text-ink-soft">{p}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/get-your-card" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background">
                Get your own <ArrowUpRight size={15} />
              </Link>
              <Link to="/themes" className="inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 text-sm">
                Browse themes
              </Link>
            </div>
          </div>
        </TapReveal>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#0A0A0A] p-10 text-[#FAFAFA] sm:p-16 grain">
          <div className="pointer-events-none absolute -top-24 right-0 h-[360px] w-[360px] rounded-full bg-accent/40 blur-[100px] aurora" />
          <div className="relative flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-[18ch] font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.02] tracking-[-0.025em]">
              This could be your page in 3 days.
            </h2>
            <Link
              to="/get-your-card"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-[#0A0A0A]"
            >
              Get your card <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
