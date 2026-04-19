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

function toPhoneDigits(value: string) {
  return value.replace(/[^\d+]/g, "").replace(/^(\+)?0+/, "$1");
}

export function SocialLinksList({
  links,
  profile,
}: {
  links: SocialLink[];
  profile: Profile;
}) {
  const socialLinks = links.filter((link) => link.url);
  const phone = profile.phone_public?.trim();
  const email = profile.email_public?.trim();
  const location = profile.address?.trim();
  const whatsappDigits = phone ? toPhoneDigits(phone).replace(/^\+/, "") : "";

  const contactItems = [
    phone
      ? {
          key: "phone",
          label: "Phone",
          value: phone,
          href: `tel:${toPhoneDigits(phone)}`,
          icon: Phone,
        }
      : null,
    email
      ? {
          key: "email",
          label: "Email",
          value: email,
          href: `mailto:${email}`,
          icon: Mail,
        }
      : null,
    whatsappDigits
      ? {
          key: "whatsapp",
          label: "WhatsApp",
          value: phone ?? "",
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
  }>;

  if (!socialLinks.length && !contactItems.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      {socialLinks.length ? (
        <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="inline-flex min-w-max gap-3 py-1">
            {socialLinks.map((link) => {
              const Icon = platformIcons[link.platform] ?? ExternalLink;

              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  title={link.label || link.platform}
                  aria-label={link.label || link.platform}
                  className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-primary transition hover:border-primary/50 hover:bg-white/10 hover:text-white"
                >
                  <Icon className="size-5" />
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
              return (
                <a
                  key={item.key}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="flex w-full items-start justify-between gap-3 overflow-hidden rounded-2xl border border-white/8 bg-white/4 px-4 py-3 transition hover:border-primary/40 hover:bg-white/7"
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
                  <ExternalLink className="mt-1 size-4 shrink-0 text-muted" />
                </a>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}
