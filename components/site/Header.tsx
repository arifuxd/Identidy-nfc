"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { createClient } from "@/lib/supabase/client";

import type { User } from "@supabase/supabase-js";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/themes", label: "Themes" },
  { href: "/demo", label: "Demo Profile" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50",
        scrolled ? "backdrop-blur-xl" : "",
      ].join(" ")}
      style={{
        background: scrolled ? "color-mix(in oklab, var(--background) 78%, transparent)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--accent)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`group relative text-[13px] tracking-tight transition-colors ${
                  active ? "text-ink font-medium" : "text-ink-soft hover:text-ink"
                }`}
              >
                {n.label}
                <span className={`pointer-events-none absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                  active ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <Link
              href="/dashboard"
              className="hidden rounded-full px-4 py-2 text-[13px] text-ink-soft transition-colors hover:text-ink md:inline-flex"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden rounded-full px-4 py-2 text-[13px] text-ink-soft transition-colors hover:text-ink md:inline-flex"
            >
              Login
            </Link>
          )}
          {user ? (
            <Link
              href="/dashboard/profile"
              className="group relative hidden overflow-hidden rounded-full bg-btn-primary px-4 py-2 text-[13px] font-medium text-btn-primary transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] md:inline-flex"
            >
              <span className="relative z-10">My Profile</span>
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-accent transition-transform duration-500 group-hover:translate-x-0" />
              <span className="relative z-10 ml-1.5 opacity-70 transition-opacity group-hover:opacity-100">→</span>
            </Link>
          ) : (
            <Link
              href="/get-your-card"
              className="group relative hidden overflow-hidden rounded-full bg-btn-primary px-4 py-2 text-[13px] font-medium text-btn-primary transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] md:inline-flex"
            >
              <span className="relative z-10">Get your card</span>
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-accent transition-transform duration-500 group-hover:translate-x-0" />
              <span className="relative z-10 ml-1.5 opacity-70 transition-opacity group-hover:opacity-100">→</span>
            </Link>
          )}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-full hairline md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="tap-in border-b border-hairline bg-background md:hidden">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-1 px-5 py-4">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-ink"
              >
                {n.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm text-ink-soft">
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-full bg-btn-primary px-4 py-3 text-center text-sm font-medium text-btn-primary"
                >
                  My Profile →
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm text-ink-soft">
                  Login
                </Link>
                <Link
                  href="/get-your-card"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-full bg-btn-primary px-4 py-3 text-center text-sm font-medium text-btn-primary"
                >
                  Get your card →
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
