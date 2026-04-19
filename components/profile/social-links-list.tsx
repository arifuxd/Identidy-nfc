import type { ComponentType, SVGProps } from "react";
import {
  ExternalLink,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";

import type { Database } from "@/types/database";

type SocialLink = Database["public"]["Tables"]["social_links"]["Row"];
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

type IconComponent = ComponentType<{ className?: string }>;

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.57 21v-8.2h2.75l.41-3.2h-3.16V7.56c0-.93.26-1.56 1.59-1.56h1.7V3.14c-.3-.04-1.3-.14-2.47-.14-2.45 0-4.12 1.5-4.12 4.25V9.6H7.5v3.2h2.77V21h3.3z" />
    </svg>
  );
}

function TwitterXIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.26l-4.9-6.4L6.45 22H3.33l7.25-8.3L1 2h6.42l4.43 5.85L18.9 2zm-1.1 18h1.73L6.47 3.9H4.61L17.8 20z" />
    </svg>
  );
}

function PinterestIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2a10 10 0 0 0-3.64 19.31l1.33-5.07c-.23-.46-.41-1.2-.41-1.92 0-1.8 1.05-3.14 2.35-3.14 1.1 0 1.63.83 1.63 1.82 0 1.11-.71 2.77-1.08 4.31-.31 1.29.66 2.34 1.95 2.34 2.34 0 3.92-3 3.92-6.55 0-2.7-1.82-4.72-5.13-4.72-3.75 0-6.08 2.8-6.08 5.92 0 1.08.32 1.84.83 2.43.23.28.26.4.18.73l-.27 1.1c-.09.34-.37.46-.68.33-1.9-.78-2.79-2.88-2.79-5.24C4.11 8.6 7.27 5 12.34 5c4.08 0 6.76 2.95 6.76 6.12 0 4.2-2.34 7.35-5.78 7.35-1.15 0-2.23-.62-2.59-1.33l-.71 2.7c-.26.97-.76 2.17-1.15 3A10 10 0 1 0 12 2z" />
    </svg>
  );
}

function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14.83 2h2.72c.13 1.24.6 2.31 1.4 3.2.79.87 1.8 1.45 3.05 1.7v2.78a8.04 8.04 0 0 1-4.45-1.4v6.52a6.8 6.8 0 1 1-5.67-6.7v2.9a3.95 3.95 0 1 0 2.95 3.8V2z" />
    </svg>
  );
}

function WhatsappIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06.01C5.51.01.17 5.35.17 11.9c0 2.1.55 4.15 1.6 5.95L0 24l6.34-1.66a11.83 11.83 0 0 0 5.72 1.46h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.17-1.24-6.14-3.44-8.43Zm-8.45 18.31h-.01a9.93 9.93 0 0 1-5.06-1.39l-.36-.22-3.76.98 1-3.66-.24-.38a9.92 9.92 0 0 1-1.52-5.24c0-5.48 4.46-9.94 9.94-9.94 2.65 0 5.14 1.03 7.01 2.91a9.85 9.85 0 0 1 2.91 7.02c0 5.48-4.46 9.94-9.92 9.94Zm5.45-7.43c-.3-.15-1.78-.88-2.05-.98-.27-.1-.47-.15-.66.15-.2.3-.77.98-.95 1.19-.17.2-.35.23-.65.08-.3-.15-1.25-.46-2.38-1.47a8.86 8.86 0 0 1-1.65-2.05c-.17-.3-.02-.47.13-.62.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.23-.24-.58-.49-.5-.66-.5h-.56c-.2 0-.5.08-.77.38-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.2 3.06c.15.2 2.08 3.17 5.05 4.45.7.3 1.25.48 1.68.62.7.22 1.34.19 1.84.12.56-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.08-.12-.27-.2-.56-.35Z" />
    </svg>
  );
}

const platformIcons: Record<string, IconComponent> = {
  facebook: FacebookIcon,
  twitter: TwitterXIcon,
  pinterest: PinterestIcon,
  tiktok: TikTokIcon,
  github: Github,
  youtube: Youtube,
  linkedin: Linkedin,
  instagram: Instagram,
  portfolio: Globe,
  custom: ExternalLink,
};

const platformLabels: Record<string, string> = {
  facebook: "Facebook",
  twitter: "Twitter / X",
  pinterest: "Pinterest",
  tiktok: "TikTok",
  github: "GitHub",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  portfolio: "Portfolio",
  custom: "Custom Link",
};

const platformAccentClasses: Record<string, string> = {
  facebook: "from-blue-500/16 to-blue-700/8 border-blue-300/20 text-blue-300",
  twitter: "from-cyan-500/16 to-sky-700/8 border-cyan-300/20 text-cyan-300",
  pinterest: "from-rose-500/16 to-red-700/8 border-rose-300/20 text-rose-300",
  tiktok: "from-fuchsia-500/16 to-violet-700/8 border-fuchsia-300/20 text-fuchsia-300",
  github: "from-slate-400/16 to-slate-700/8 border-slate-300/20 text-slate-200",
  youtube: "from-red-500/16 to-red-700/8 border-red-300/20 text-red-300",
  linkedin: "from-blue-500/16 to-indigo-700/8 border-blue-300/20 text-blue-300",
  instagram: "from-pink-500/16 to-purple-700/8 border-pink-300/20 text-pink-300",
  portfolio: "from-emerald-500/16 to-green-700/8 border-emerald-300/20 text-emerald-300",
  custom: "from-amber-500/16 to-orange-700/8 border-amber-300/20 text-amber-300",
};

function toPhoneDigits(value: string) {
  return value.replace(/[^\d+]/g, "").replace(/^(\+)?0+/, "$1");
}

const badgeToneClasses: Record<"pink" | "green" | "blue", string> = {
  pink: "bg-gradient-to-br from-red-500/16 to-red-700/8 border-red-300/20 text-white",
  green: "border-emerald-400/80 bg-emerald-500/20 text-emerald-100",
  blue: "bg-gradient-to-br from-emerald-500/16 to-green-700/8 border-emerald-300/20 text-white",
};

export function SocialLinksList({
  links,
  profile,
}: {
  links: SocialLink[];
  profile: Profile;
}) {
  const socialLinks = links.filter((link) => link.url);
  const phoneHome = profile.phone_home?.trim() || profile.phone_public?.trim() || "";
  const phoneOffice = profile.phone_office?.trim() || "";
  const emailHome = profile.email_home?.trim() || profile.email_public?.trim() || "";
  const emailOffice = profile.email_office?.trim() || "";
  const location = profile.address?.trim();
  const whatsappSource = phoneHome || phoneOffice;
  const whatsappDigits = whatsappSource ? toPhoneDigits(whatsappSource).replace(/^\+/, "") : "";

  const contactItems = [
    phoneHome
      ? {
          key: "phone-home",
          label: "Phone",
          value: phoneHome,
          href: `tel:${toPhoneDigits(phoneHome)}`,
          icon: Phone,
          badgeLabel: "Home",
          badgeTone: "pink",
        }
      : null,
    phoneOffice
      ? {
          key: "phone-office",
          label: "Phone",
          value: phoneOffice,
          href: `tel:${toPhoneDigits(phoneOffice)}`,
          icon: Phone,
          badgeLabel: "Office",
          badgeTone: "blue",
        }
      : null,
    emailHome
      ? {
          key: "email-home",
          label: "Email",
          value: emailHome,
          href: `mailto:${emailHome}`,
          icon: Mail,
          badgeLabel: "Home",
          badgeTone: "pink",
        }
      : null,
    emailOffice
      ? {
          key: "email-office",
          label: "Email",
          value: emailOffice,
          href: `mailto:${emailOffice}`,
          icon: Mail,
          badgeLabel: "Office",
          badgeTone: "blue",
        }
      : null,
    whatsappDigits
      ? {
          key: "whatsapp",
          label: "WhatsApp",
          value: whatsappSource,
          href: `https://wa.me/${whatsappDigits}`,
          icon: WhatsappIcon,
          external: true,
        }
      : null,
    location
      ? {
          key: "location",
          label: "Location",
          value: location,
          href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`,
          icon: MapPin,
          external: true,
        }
      : null,
  ].filter(Boolean) as Array<{
    key: string;
    label: string;
    value: string;
    href: string;
    icon: IconComponent;
    external?: boolean;
    badgeLabel?: string;
    badgeTone?: "pink" | "green" | "blue";
  }>;

  if (!socialLinks.length && !contactItems.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      {socialLinks.length ? (
        <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="inline-flex min-w-max gap-2 py-1">
            {socialLinks.map((link) => {
              const Icon = platformIcons[link.platform] ?? ExternalLink;
              const accent =
                platformAccentClasses[link.platform] ?? platformAccentClasses.custom;
              const title = link.label?.trim() || platformLabels[link.platform] || "Social Link";

              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  title={title}
                  aria-label={title}
                  className={`flex w-[96px] shrink-0 flex-col rounded-xl border bg-gradient-to-br p-2.5 transition hover:-translate-y-0.5 hover:border-white/25 ${accent}`}
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-current/20">
                    <Icon className="size-4 text-current" />
                  </span>
                  <p className="mt-2 truncate text-xs font-semibold text-white">{title}</p>
                </a>
              );
            })}
          </div>
        </div>
      ) : null}

      {contactItems.length ? (
        <section className="glass-panel rounded-3xl p-4">
          <h2 className="text-sm font-medium uppercase tracking-[0.24em] text-blue-100/68">
            Contact
          </h2>
          <div className="mt-4 grid gap-3">
            {contactItems.map((item) => {
              const Icon = item.icon;
              const badgeToneClass = item.badgeTone
                ? badgeToneClasses[item.badgeTone]
                : null;

              return (
                <a
                  key={item.key}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="relative flex w-full items-start justify-between gap-3 overflow-hidden rounded-2xl border border-white/8 bg-white/4 px-4 py-3 pr-20 transition hover:border-primary/40 hover:bg-white/7"
                >
                  <span className="flex min-w-0 flex-1 items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/14 text-primary">
                      <Icon className="size-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-white">{item.label}</span>
                      <span className="mt-0.5 block break-words whitespace-normal text-xs leading-5 text-muted">
                        {item.value}
                      </span>
                    </span>
                  </span>
                  <span className="absolute right-3 top-2 flex items-end gap-1.5">
                    {item.badgeLabel && badgeToneClass ? (
                      <span
                        className={`rounded-md border px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.03em] ${badgeToneClass}`}
                      >
                        {item.badgeLabel}
                      </span>
                    ) : null}
                    <ExternalLink className="mt-[1px] size-4 shrink-0 text-muted" />
                  </span>
                </a>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}
