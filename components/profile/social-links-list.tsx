import { ExternalLink, Github, Globe, Instagram, Linkedin, Youtube } from "lucide-react";

import type { Database } from "@/types/database";

type SocialLink = Database["public"]["Tables"]["social_links"]["Row"];

const platformIcons = {
  github: Github,
  youtube: Youtube,
  linkedin: Linkedin,
  instagram: Instagram,
  portfolio: Globe,
  custom: ExternalLink,
  facebook: Globe,
  twitter: Globe,
};

export function SocialLinksList({ links }: { links: SocialLink[] }) {
  if (!links.length) {
    return null;
  }

  return (
    <section className="glass-panel rounded-3xl p-4">
      <h2 className="text-sm font-medium uppercase tracking-[0.24em] text-blue-100/68">
        Social Links
      </h2>
      <div className="mt-4 grid gap-3">
        {links.map((link) => {
          const Icon =
            platformIcons[link.platform as keyof typeof platformIcons] ??
            ExternalLink;

          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/4 px-4 py-3 transition hover:border-primary/40 hover:bg-white/7"
            >
              <span className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/14 text-primary">
                  <Icon className="size-4" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-white">
                    {link.label || link.platform}
                  </span>
                  <span className="block text-xs text-muted">{link.url}</span>
                </span>
              </span>
              <ExternalLink className="size-4 text-muted" />
            </a>
          );
        })}
      </div>
    </section>
  );
}
