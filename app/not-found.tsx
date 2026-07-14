"use client";

import Link from "next/link";
import "@/app/landing.css";
import { ThemeProvider } from "@/lib/theme";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CustomCursor } from "@/components/site/CustomCursor";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <ThemeProvider>
      <div className="marketing-theme min-h-screen bg-background text-foreground transition-colors duration-300">
        <CustomCursor />
        <Header />
        <main className="shell flex min-h-[70vh] flex-col items-center justify-center pt-32 pb-16 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-accent">
            404
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-foreground">
            We couldn&apos;t find that page.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
            The profile may be unpublished, the link may be wrong, or the page no
            longer exists.
          </p>
          <Link href="/" className="mt-8">
            <Button>Back to home</Button>
          </Link>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
