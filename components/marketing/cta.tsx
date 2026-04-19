import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function MarketingCta() {
  return (
    <section id="cta" className="shell pb-16 sm:pb-24">
      <Card className="overflow-hidden rounded-[2.4rem] border-primary/20 bg-gradient-to-br from-primary/18 via-[#0d1f36] to-[#091220] p-8 sm:p-12">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-blue-100/72">
            Launch faster
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ship a real NFC profile platform with auth, analytics, and admin
            tools.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-blue-50/76 sm:text-base">
            This project is structured for Vercel deployment and Supabase-backed
            production use, not just a demo.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/signup">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </section>
  );
}
