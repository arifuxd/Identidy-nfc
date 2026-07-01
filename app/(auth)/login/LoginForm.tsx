"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Eye, EyeOff } from "lucide-react";
import { loginAction } from "@/actions/auth";

export function LoginForm({ error }: { error?: string }) {
  const [show, setShow] = useState(false);

  return (
    <section className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* animated branded background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-background">
        <div className="absolute -top-40 left-1/3 h-[520px] w-[520px] rounded-full bg-accent/25 blur-[120px] aurora" />
        <div className="absolute bottom-0 right-1/4 h-[520px] w-[520px] rounded-full bg-accent/15 blur-[120px] aurora" style={{ animationDelay: "-6s" }} />
        <div className="absolute inset-0 grain opacity-40" />
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1440px] items-center justify-center px-5 py-16 sm:px-8">
        <div className="tap-in w-full max-w-md rounded-3xl border border-hairline bg-surface/85 p-8 backdrop-blur-xl sm:p-10" style={{ boxShadow: "var(--shadow-lift)" }}>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent chip-glow" />
            <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">Welcome back</p>
          </div>
          <h1 className="mt-6 font-display text-3xl leading-[1.05] tracking-[-0.02em] text-foreground">Sign in to your Identidy.</h1>
          <p className="mt-2 text-sm text-ink-soft">Manage your profile, review taps, and export leads.</p>

          {error && (
            <div className="mt-6 rounded-xl bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          <form action={loginAction} className="mt-8 space-y-4">
            <label className="block text-left">
              <span className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">Email or username</span>
              <input required name="email" type="email" placeholder="you@identidy.net" className="mt-2 w-full rounded-xl border border-hairline bg-background px-4 py-3 text-sm outline-none focus:border-accent text-foreground" />
            </label>
            <label className="block text-left">
              <span className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">Password</span>
              <div className="relative mt-2">
                <input required name="password" type={show ? "text" : "password"} placeholder="••••••••" className="w-full rounded-xl border border-hairline bg-background px-4 py-3 pr-11 text-sm outline-none focus:border-accent text-foreground" />
                <button type="button" onClick={() => setShow((s) => !s)} className="absolute inset-y-0 right-3 grid place-items-center text-ink-soft">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 text-ink-soft cursor-pointer">
                <input type="checkbox" className="accent-[color:var(--accent)]" /> Remember me
              </label>
              <Link href="/forgot-password" className="text-ink-soft hover:text-ink font-medium">Forgot password?</Link>
            </div>

            <button type="submit" className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-btn-primary py-3.5 text-sm font-medium text-btn-primary transition-transform hover:scale-[1.01] active:scale-95">
              Sign in <ArrowUpRight size={15} />
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-ink-soft">
            Need help? <a href="https://wa.me/8801000000000" className="text-ink underline underline-offset-4 font-medium">Chat with support</a>
          </p>
        </div>
      </div>

      {/* Bottom row — no signup */}
      <div className="pointer-events-none absolute bottom-6 left-0 right-0 mx-auto flex max-w-[1440px] justify-center px-5 text-[11px] uppercase tracking-[0.22em] text-ink-soft">
        <span className="pointer-events-auto">
          Don't have a card yet? <Link href="/get-your-card" className="text-ink underline underline-offset-4">Order Identidy →</Link>
        </span>
      </div>
    </section>
  );
}
