import {
  Activity,
  FileDown,
  Layers3,
  PenSquare,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

const features = [
  {
    title: "Public NFC profile pages",
    description:
      "Every card points to a fast, clean mobile profile with only the sections that matter.",
    icon: UserRound,
  },
  {
    title: "Save contact instantly",
    description:
      "Generate downloadable vCard files so contacts land directly in the user's address book.",
    icon: FileDown,
  },
  {
    title: "Resume-style editing",
    description:
      "Profile details, social links, and work experience are all managed from one dashboard.",
    icon: PenSquare,
  },
  {
    title: "Simple analytics",
    description:
      "Track lifetime traffic and recent tap activity with a lightweight chart made for mobile and desktop.",
    icon: Activity,
  },
  {
    title: "Admin controls",
    description:
      "Create, edit, and remove users from a dedicated SaaS-style admin control panel.",
    icon: Layers3,
  },
  {
    title: "Secure by default",
    description:
      "RLS-backed Supabase tables, protected server actions, and storage rules keep data scoped correctly.",
    icon: ShieldCheck,
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="shell py-16 sm:py-24">
      <SectionHeading
        eyebrow="Features"
        title="Built for high-intent first impressions"
        copy="Everything is optimized around the moment someone taps an NFC card: instant clarity, easy contact saving, and a profile that feels trustworthy on mobile."
        align="center"
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="rounded-[2rem] border-white/8">
            <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <feature.icon className="size-5" />
            </div>
            <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
