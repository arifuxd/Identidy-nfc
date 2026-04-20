"use client";

import type { CSSProperties, ComponentType, SVGProps } from "react";
import Image from "next/image";
import {
  Download,
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

import { DEFAULT_AVATAR, DEFAULT_COVER } from "@/lib/constants";
import type { Database } from "@/types/database";

import type { ProfileStyleProps } from "./types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type IconComponent = ComponentType<{ className?: string; style?: CSSProperties }>;

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
  portfolio: "Website",
  custom: "Link",
};

function withAlpha(hexColor: string, alphaHex: string) {
  if (!/^#[0-9a-f]{6}$/i.test(hexColor)) {
    return hexColor;
  }

  return `${hexColor}${alphaHex}`;
}

function toPhoneDigits(value: string) {
  return value.replace(/[^\d+]/g, "").replace(/^(\+)?0+/, "$1");
}

function formatDateLabel(value: string | null) {
  if (!value) {
    return "";
  }

  const monthPattern = /^\d{4}-\d{2}$/;
  const dayPattern = /^\d{4}-\d{2}-\d{2}$/;

  if (!monthPattern.test(value) && !dayPattern.test(value)) {
    return value;
  }

  const padded = monthPattern.test(value) ? `${value}-01` : value;
  const parsed = new Date(`${padded}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(parsed);
}

function buildContacts(profile: Profile) {
  const phoneHome = profile.phone_home?.trim() || profile.phone_public?.trim() || "";
  const phoneOffice = profile.phone_office?.trim() || "";
  const emailHome = profile.email_home?.trim() || profile.email_public?.trim() || "";
  const emailOffice = profile.email_office?.trim() || "";
  const location = profile.address?.trim() || "";
  const whatsappSource = phoneHome || phoneOffice;
  const whatsappDigits = whatsappSource ? toPhoneDigits(whatsappSource).replace(/^\+/, "") : "";

  return [
    emailHome
      ? {
          key: "email-home",
          label: "email",
          value: emailHome,
          href: `mailto:${emailHome}`,
          icon: Mail,
          tag: "Home",
        }
      : null,
    emailOffice
      ? {
          key: "email-office",
          label: "email",
          value: emailOffice,
          href: `mailto:${emailOffice}`,
          icon: Mail,
          tag: "Office",
        }
      : null,
    phoneHome
      ? {
          key: "phone-home",
          label: "phone",
          value: phoneHome,
          href: `tel:${toPhoneDigits(phoneHome)}`,
          icon: Phone,
          tag: "Home",
        }
      : null,
    phoneOffice
      ? {
          key: "phone-office",
          label: "phone",
          value: phoneOffice,
          href: `tel:${toPhoneDigits(phoneOffice)}`,
          icon: Phone,
          tag: "Office",
        }
      : null,
    whatsappDigits
      ? {
          key: "whatsapp",
          label: "whatsapp",
          value: whatsappSource,
          href: `https://wa.me/${whatsappDigits}`,
          icon: WhatsappIcon,
          external: true,
          tag: null,
        }
      : null,
    location
      ? {
          key: "location",
          label: "location",
          value: location,
          href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`,
          icon: MapPin,
          external: true,
          tag: null,
        }
      : null,
  ].filter(Boolean) as Array<{
    key: string;
    label: string;
    value: string;
    href: string;
    icon: IconComponent;
    external?: boolean;
    tag: string | null;
  }>;
}

export function Style2Corporate({ profile, socialLinks, experiences }: ProfileStyleProps) {
  const coverUrl = profile.cover_path || DEFAULT_COVER;
  const avatarUrl = profile.avatar_path || DEFAULT_AVATAR;
  const accent = profile.accent_color || "#3b82f6";
  const avatarShape = profile.avatar_shape === "rounded" ? "rounded-lg" : "rounded-full";
  const roleText = [profile.job_title, profile.company_name].filter(Boolean).join(" · ");
  const sortedLinks = [...socialLinks].sort((a, b) => a.sort_order - b.sort_order);
  const contacts = buildContacts(profile);
  const profileStyle = {
    "--developer-accent": accent,
    "--developer-accent-soft": withAlpha(accent, "24"),
    "--developer-border": withAlpha(accent, "3b"),
    "--developer-grid": withAlpha(accent, "26"),
  } as CSSProperties;

  return (
    <div
      style={profileStyle}
      className="overflow-hidden rounded-[1rem] border border-[#1a1a22] bg-[#0d0d0f] text-[#e2e8f0]"
    >
      <section className="relative h-[148px] overflow-hidden bg-[#0a0a10]">
        <Image
          src={coverUrl}
          alt={`${profile.display_name} cover image`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 640px"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0d0f]/25 to-[#0d0d0f]/80" />
      </section>

      <section className="px-[18px]">
        <div className="-mt-8 mb-3.5 flex items-end gap-3">
          <div
            className={`flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden border-2 border-[#0d0d0f] bg-[#13131a] shadow-[0_0_0_1.5px_#2a2a35] ${avatarShape}`}
          >
            <div className={`relative h-full w-full ${avatarShape}`}>
              <Image
                src={avatarUrl}
                alt={`${profile.display_name} profile photo`}
                fill
                className="object-cover"
                sizes="72px"
                quality={100}
                priority
              />
            </div>
          </div>
        </div>

        <div className="mb-[18px]">
          <p className="mb-1 text-[20px] font-medium tracking-[-0.02em] text-slate-100">
            <span style={{ color: accent }}>&lt;</span>
            {profile.display_name}
            <span style={{ color: accent }}> /&gt;</span>
          </p>
          {roleText ? (
            <p className="mb-2.5 text-xs text-[#64748b]">
              {roleText}
              <span className="developer-cursor ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px]" />
            </p>
          ) : null}
          {profile.bio ? (
            <p className="max-w-[320px] text-[13px] leading-[1.65] text-[#94a3b8]">{profile.bio}</p>
          ) : null}
        </div>

        <div className="mb-[22px]">
          <a
            href={`/api/public/vcf/${profile.slug}`}
            className="block w-full rounded-[5px] px-3 py-3 text-center text-[13px] font-medium tracking-[0.04em] text-white transition hover:brightness-110"
            style={{ backgroundColor: accent }}
          >
            <span className="inline-flex items-center">
              <Download className="mr-1.5 size-[13px]" />
              $ save_contact --format vcf
            </span>
          </a>
        </div>

        {sortedLinks.length ? (
          <section className="mb-[22px]">
            <p className="mb-3.5 text-[10px] tracking-[0.12em]" style={{ color: accent }}>
              {`// social_links[]`}
            </p>
            <div className="flex flex-wrap gap-2">
              {sortedLinks.map((link) => {
                const Icon = platformIcons[link.platform] ?? ExternalLink;
                const title = link.label?.trim() || platformLabels[link.platform] || "Link";

                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-[5px] border border-[#2a2a35] bg-[#13131a] px-3 py-[7px] text-[11px] text-[#94a3b8] transition hover:text-[#e2e8f0]"
                  >
                    <Icon className="size-[15px]" />
                    {title}
                  </a>
                );
              })}
            </div>
          </section>
        ) : null}

        {contacts.length ? (
          <section className="mb-[22px]">
            <p className="mb-3.5 text-[10px] tracking-[0.12em]" style={{ color: accent }}>
              {`// contact_info{}`}
            </p>
            <div className="rounded-[6px] border border-[#1e1e2a] bg-[#0a0a10] px-3.5">
              {contacts.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    className={`flex items-center gap-3 py-[11px] ${index !== contacts.length - 1 ? "border-b border-[#1e1e2a]" : ""}`}
                  >
                    <Icon className="size-[15px] shrink-0" style={{ color: accent }} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] text-[#475569]">{item.label}</span>
                      <span className="block truncate text-xs text-[#cbd5e1]">{item.value}</span>
                    </span>
                    {item.tag ? (
                      <span className="rounded-[3px] border border-[#2a2a35] bg-[#1e1e24] px-1.5 py-0.5 text-[10px] text-[#64748b]">
                        {item.tag}
                      </span>
                    ) : null}
                  </a>
                );
              })}
            </div>
          </section>
        ) : null}

        {experiences.length ? (
          <section className="mb-7">
            <p className="mb-3.5 text-[10px] tracking-[0.12em]" style={{ color: accent }}>
              {`// experience.map(job => {...})`}
            </p>
            <div>
              {experiences.map((item, index) => {
                const start = formatDateLabel(item.start_date);
                const end = item.is_current ? "now" : formatDateLabel(item.end_date);
                const companyLine = [item.company, item.location].filter(Boolean).join(" · ");

                return (
                  <article
                    key={item.id}
                    className={`py-3.5 ${index !== experiences.length - 1 ? "border-b border-[#1a1a22]" : ""}`}
                  >
                    <div className="mb-1 flex items-start justify-between gap-2">
                      <p className="text-[13px] font-medium text-[#e2e8f0]">{item.title}</p>
                      {(start || end) && (
                        <p className="ml-2 whitespace-nowrap text-[10px] text-[#475569]">{`${start} -> ${end}`}</p>
                      )}
                    </div>
                    {companyLine ? (
                      <p className="mb-1.5 text-[11px]" style={{ color: accent }}>
                        {companyLine}
                      </p>
                    ) : null}
                    {item.description ? (
                      <p className="text-xs leading-[1.6] text-[#64748b]">{item.description}</p>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        <footer className="mb-2 border-t border-[#1a1a22] py-3.5 text-center">
          <p className="text-[10px] tracking-[0.08em] text-[#1e3a5f]">{`// EOF · shared via NFC · ${profile.slug}`}</p>
        </footer>
      </section>

      <style jsx>{`
        @keyframes developerBlink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .developer-cursor {
          background: var(--developer-accent);
          animation: developerBlink 1s step-end infinite;
        }
      `}</style>
    </div>
  );
}
