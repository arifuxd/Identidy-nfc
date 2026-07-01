"use client";

import "../landing.css";
import { ThemeProvider } from "@/lib/theme";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CustomCursor } from "@/components/site/CustomCursor";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="marketing-theme min-h-screen bg-background text-foreground transition-colors duration-300">
        <CustomCursor />
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
