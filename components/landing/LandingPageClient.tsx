"use client";

import { useEffect } from "react";
import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Ticker from "@/components/landing/Ticker";
import Problem from "@/components/landing/Problem";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import ThemesShowcase from "@/components/landing/Themes";
import AnalyticsPreview from "@/components/landing/Analytics";
import LeadCapture from "@/components/landing/LeadCapture";
import Eco from "@/components/landing/Eco";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import CTABanner from "@/components/landing/CTABanner";
import Footer from "@/components/landing/Footer";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function LandingPageClient() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const observeAll = () => {
      document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    };

    observeAll();
    const mutationObserver = new MutationObserver(observeAll);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Problem />
        <HowItWorks />
        <Features />
        <ThemesShowcase />
        <AnalyticsPreview />
        <LeadCapture />
        <Eco />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
