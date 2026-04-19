import { FeatureGrid } from "@/components/marketing/feature-grid";
import { FaqSection } from "@/components/marketing/faq";
import { MarketingCta } from "@/components/marketing/cta";
import { MarketingFooter } from "@/components/marketing/footer";
import { MarketingHero } from "@/components/marketing/hero";
import { MarketingNavbar } from "@/components/marketing/navbar";

export default function MarketingPage() {
  return (
    <>
      <MarketingNavbar />
      <main className="flex-1">
        <MarketingHero />
        <FeatureGrid />
        <FaqSection />
        <MarketingCta />
      </main>
      <MarketingFooter />
    </>
  );
}
