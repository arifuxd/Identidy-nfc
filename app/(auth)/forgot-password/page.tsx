"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError(false);
    setErrorMsg("");

    const supabase = createClient();
    const redirectTo = `${window.location.origin}/auth/callback?next=/dashboard/settings`;

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      { redirectTo }
    );

    setLoading(false);

    if (resetError) {
      setError(true);
      setErrorMsg(resetError.message);
    } else {
      setSent(true);
    }
  };

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
          {sent ? (
            <div className="text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent/15 text-accent mb-6">
                <CheckCircle2 size={24} />
              </div>
              <h1 className="font-display text-2xl leading-[1.05] tracking-[-0.02em] text-foreground">Reset link sent.</h1>
              <p className="mt-4 text-sm text-ink-soft leading-relaxed">
                Check your email. We've sent a password reset link to <strong className="text-foreground">{email}</strong>.
              </p>
              <Link href="/login" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3.5 text-sm font-medium text-background transition-transform hover:scale-[1.01] active:scale-95">
                Back to login
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent chip-glow" />
                <p className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">Password recovery</p>
              </div>
              <h1 className="mt-6 font-display text-3xl leading-[1.05] tracking-[-0.02em] text-foreground">Forgot your password?</h1>
              <p className="mt-2 text-sm text-ink-soft">Enter your email and we'll send you a password reset link.</p>

              {error && (
                <div className="mt-6 rounded-xl bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
                  {errorMsg || "Something went wrong. Please try again."}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <label className="block text-left">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">Email address</span>
                  <input
                    required
                    type="email"
                    placeholder="you@identidy.co"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-hairline bg-background px-4 py-3 text-sm outline-none focus:border-accent text-foreground"
                    disabled={loading}
                  />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3.5 text-sm font-medium text-background transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send link"} <ArrowUpRight size={15} />
                </button>
              </form>

              <div className="mt-8 text-center text-xs">
                <Link href="/login" className="text-ink-soft hover:text-ink font-medium underline underline-offset-4">
                  Back to login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
