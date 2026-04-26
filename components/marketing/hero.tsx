import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Link2, Smartphone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function MarketingHero() {
  return (
    <section className="shell relative overflow-hidden py-16 sm:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Badge>Modern NFC identity for teams and founders</Badge>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Turn every tap into a polished business card experience.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Identidy gives every NFC card a fast, mobile-first profile page with
            social links, contact saving, and visit analytics built in.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/login">
              <Button size="lg">
                User Login
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="secondary" size="lg">
                Admin Login
              </Button>
            </Link>
            <a href="#features">
              <Button variant="ghost" size="lg">
                See How It Works
              </Button>
            </a>
          </div>
          <div className="mt-10 grid gap-4 text-sm text-muted sm:grid-cols-3">
            <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
              <Smartphone className="mb-3 size-5 text-primary" />
              Built for one-hand mobile browsing
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
              <Link2 className="mb-3 size-5 text-primary" />
              Dynamic links and contact card download
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
              <BarChart3 className="mb-3 size-5 text-primary" />
              See who taps and when they visit
            </div>
          </div>
        </div>

        <Card className="relative overflow-hidden border-white/10 p-0">
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-primary/30 via-sky-400/24 to-transparent" />
          <div className="relative p-5">
            <div className="mx-auto max-w-sm rounded-[2rem] border border-white/10 bg-[#08111d] p-3 shadow-2xl">
              <div className="rounded-[1.6rem] border border-white/8 bg-gradient-to-b from-[#173254] to-[#0a1729] p-4">
                <div className="relative h-28 overflow-hidden rounded-[1.4rem]">
                  <Image
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                    alt="Profile cover preview"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 90vw, 360px"
                    quality={100}
                  />
                </div>
                <div className="-mt-9 flex items-end gap-4 px-2">
                  <div className="relative size-20 overflow-hidden rounded-3xl border-4 border-[#0a1729]">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
                      alt="Profile avatar preview"
                      fill
                      className="object-cover object-center"
                      sizes="80px"
                      quality={100}
                    />
                  </div>
                  <div className="pb-2">
                    <p className="text-lg font-semibold text-white">
                      Sarah Khan
                    </p>
                    <p className="text-sm text-blue-100/75">
                      Product Designer at Northline
                    </p>
                  </div>
                </div>
                <div className="mt-5 rounded-3xl border border-white/8 bg-white/5 p-4">
                  <p className="text-sm leading-7 text-blue-50/88">
                    I design polished onboarding experiences for SaaS teams and
                    startups shipping fast.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {["GitHub", "Portfolio", "YouTube", "LinkedIn"].map(
                      (item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-white/8 bg-white/5 px-3 py-2 text-center text-xs text-white"
                        >
                          {item}
                        </div>
                      ),
                    )}
                  </div>
                  <div className="mt-4 rounded-2xl bg-primary px-4 py-3 text-center text-sm font-medium text-white">
                    Save Contact
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
