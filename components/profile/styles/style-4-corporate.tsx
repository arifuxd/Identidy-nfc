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
  twitter: "X / Twitter",
  pinterest: "Pinterest",
  tiktok: "TikTok",
  github: "GitHub",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  portfolio: "Portfolio",
  custom: "Custom",
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

function buildHandle(url: string) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    const path = parsed.pathname.replace(/^\/+/, "");

    if (path) {
      return `${host}/${path}`.replace(/\/$/, "");
    }

    return host;
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "");
  }
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
    phoneHome
      ? {
          key: "phone-home",
          label: "Phone (Home)",
          value: phoneHome,
          href: `tel:${toPhoneDigits(phoneHome)}`,
          icon: Phone,
        }
      : null,
    phoneOffice
      ? {
          key: "phone-office",
          label: "Phone (Office)",
          value: phoneOffice,
          href: `tel:${toPhoneDigits(phoneOffice)}`,
          icon: Phone,
        }
      : null,
    emailHome
      ? {
          key: "email-home",
          label: "Email (Home)",
          value: emailHome,
          href: `mailto:${emailHome}`,
          icon: Mail,
        }
      : null,
    emailOffice
      ? {
          key: "email-office",
          label: "Email (Office)",
          value: emailOffice,
          href: `mailto:${emailOffice}`,
          icon: Mail,
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
  }>;
}

export function Style4Corporate({ profile, socialLinks, experiences }: ProfileStyleProps) {
  const coverUrl = profile.cover_path || DEFAULT_COVER;
  const avatarUrl = profile.avatar_path || DEFAULT_AVATAR;
  const accent = profile.accent_color || "#3b82f6";
  const avatarShape = profile.avatar_shape === "rounded" ? "rounded-2xl" : "rounded-full";
  const softBg = withAlpha(accent, "1a");
  const lineColor = withAlpha(accent, "55");
  const borderColor = withAlpha(accent, "33");

  const sortedLinks = [...socialLinks].sort((a, b) => a.sort_order - b.sort_order);
  const contacts = buildContacts(profile);
  const styleVars = {
    "--corporate-accent": accent,
    "--corporate-soft": softBg,
    "--corporate-line": lineColor,
    "--corporate-border": borderColor,
  } as CSSProperties;

  return (
    <div
      style={styleVars}
      className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#f7f9fc] text-[#0f1d34] shadow-[0_16px_40px_rgba(4,10,20,0.2)]"
    >
      <section className="relative h-[180px] overflow-hidden">
        <Image
          src={coverUrl}
          alt={`${profile.display_name} cover image`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 640px"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a142e]/20 to-[#0a142e]/55" />
      </section>

      <section className="relative px-6 pb-1">
        <div className="-mt-11 flex justify-center">
          <div className={`relative h-[88px] w-[88px] overflow-hidden border-[3px] border-[#f7f9fc] bg-[#e7eef8] ${avatarShape}`}>
            <Image
              src={avatarUrl}
              alt={`${profile.display_name} profile photo`}
              fill
              className="object-cover"
              sizes="88px"
              quality={100}
              priority
            />
          </div>
        </div>
        <div className="pt-3 text-center">
          <h1 className="text-xl font-semibold tracking-[-0.01em] text-[#0e203e]">{profile.display_name}</h1>
          {(profile.job_title || profile.company_name) && (
            <p className="mt-1 text-[13px] font-normal text-[#516381]">
              {[profile.job_title, profile.company_name].filter(Boolean).join(" · ")}
            </p>
          )}
          {profile.bio ? (
            <p className="mt-2 text-[13px] leading-6 text-[#5f7090]">{profile.bio}</p>
          ) : null}
        </div>
      </section>

      <section className="px-6 pt-4">
        <a
          href={`/api/public/vcf/${profile.slug}`}
          className="block w-full rounded-[8px] border px-4 py-[11px] text-center text-sm font-medium transition hover:bg-[var(--corporate-soft)]"
          style={{
            color: accent,
            borderColor: accent,
          }}
        >
          <span className="inline-flex items-center gap-2">
            <Download className="size-4" />
            Save Contact
          </span>
        </a>
      </section>

      {sortedLinks.length ? (
        <section className="px-6 pt-5">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-[#7a889f]">Connect</p>
          <div className="grid grid-cols-2 gap-2">
            {sortedLinks.map((link) => {
              const Icon = platformIcons[link.platform] ?? ExternalLink;
              const name = link.label?.trim() || platformLabels[link.platform] || "Link";
              const handle = buildHandle(link.url);

              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 rounded-[8px] border border-[#d7dfec] bg-white px-3 py-2.5"
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px]"
                    style={{ backgroundColor: softBg, color: accent }}
                  >
                    <Icon className="size-3.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-medium text-[#10213f]">{name}</span>
                    <span className="block truncate text-[11px] text-[#7a889f]">{handle}</span>
                  </span>
                </a>
              );
            })}
          </div>
        </section>
      ) : null}

      {contacts.length ? (
        <section className="px-6 pt-5">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[#7a889f]">Contact</p>
          <div>
            {contacts.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.key}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className={`flex items-center gap-3.5 py-3 ${index !== contacts.length - 1 ? "border-b" : ""}`}
                  style={index !== contacts.length - 1 ? { borderColor: "var(--corporate-border)" } : undefined}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#eef3f9]">
                    <Icon className="size-[15px]" style={{ color: accent }} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] text-[#7a889f]">{item.label}</span>
                    <span className="block truncate text-[13px] text-[#0f1f3a]">{item.value}</span>
                  </span>
                </a>
              );
            })}
          </div>
        </section>
      ) : null}

      {experiences.length ? (
        <section className="px-6 pb-6 pt-5">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[#7a889f]">Experience</p>
          <div>
            {experiences.map((item, index) => {
              const start = formatDateLabel(item.start_date);
              const end = item.is_current ? "Present" : formatDateLabel(item.end_date);
              const dateText = [start, end].filter(Boolean).join(" - ");

              return (
                <article
                  key={item.id}
                  className={`relative pl-4 pt-3 ${index !== experiences.length - 1 ? "border-b pb-3" : "pb-1"}`}
                  style={index !== experiences.length - 1 ? { borderColor: "var(--corporate-border)" } : undefined}
                >
                  <span
                    className="absolute left-0 top-[18px] h-[calc(100%-18px)] w-[3px] rounded-[2px]"
                    style={{
                      backgroundColor: index !== experiences.length - 1 ? "var(--corporate-line)" : "transparent",
                    }}
                  />
                  <span
                    className="absolute left-[-4px] top-4 h-[10px] w-[10px] rounded-full border-2 border-[#f7f9fc]"
                    style={{ backgroundColor: accent }}
                  />
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-medium text-[#0f1f3a]">{item.title}</h3>
                    {dateText ? <p className="pt-0.5 text-[11px] whitespace-nowrap text-[#7a889f]">{dateText}</p> : null}
                  </div>
                  {(item.company || item.location) && (
                    <p className="mt-1 text-xs" style={{ color: accent }}>
                      {[item.company, item.location].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  {item.description ? (
                    <p className="mt-1.5 text-xs leading-[1.55] text-[#5f7090]">{item.description}</p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}
