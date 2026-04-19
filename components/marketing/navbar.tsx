import Link from "next/link";
import { CreditCard, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";

export function MarketingNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/6 bg-background/70 backdrop-blur-xl">
      <div className="shell flex h-18 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/18 text-primary shadow-[0_12px_30px_rgba(37,99,235,0.28)]">
            <CreditCard className="size-5" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide text-white">
              Identidy
            </p>
            <p className="text-xs text-muted">NFC business card SaaS</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>
          <a href="#faq" className="transition hover:text-white">
            FAQ
          </a>
          <Link href="/login" className="transition hover:text-white">
            Sign in
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="hidden md:block">
            <Button variant="ghost">
              <LayoutDashboard className="size-4" />
              Dashboard
            </Button>
          </Link>
          <a href="#cta">
            <Button>Get Started</Button>
          </a>
        </div>
      </div>
    </header>
  );
}
