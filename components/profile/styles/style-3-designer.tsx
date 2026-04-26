import type { CSSProperties, ComponentType, SVGProps } from "react";
import Image from "next/image";
import { DM_Sans, Syne } from "next/font/google";
import {
  BriefcaseBusiness,
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
import { ProfileActionSuite } from "./style-1-profile-actions";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

type Experience = Database["public"]["Tables"]["experiences"]["Row"];
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

const platformTint: Record<string, string> = {
  facebook: "#3b82f6",
  twitter: "#38bdf8",
  pinterest: "#f43f5e",
  tiktok: "#d946ef",
  github: "#cbd5e1",
  youtube: "#ef4444",
  linkedin: "#2563eb",
  instagram: "#ec4899",
  portfolio: "#10b981",
  custom: "#f59e0b",
};

function withAlpha(hexColor: string, alphaHex: string) {
  if (!/^#[0-9a-f]{6}$/i.test(hexColor)) {
    return hexColor;
  }

  return `${hexColor}${alphaHex}`;
}

function hexToRgb(hexColor: string): [number, number, number] | null {
  const match = /^#([0-9a-f]{6})$/i.exec(hexColor);
  if (!match) {
    return null;
  }

  const raw = match[1];
  const r = Number.parseInt(raw.slice(0, 2), 16);
  const g = Number.parseInt(raw.slice(2, 4), 16);
  const b = Number.parseInt(raw.slice(4, 6), 16);

  return [r, g, b];
}

function mixHex(hexColor: string, mixWith: [number, number, number], amount: number) {
  const rgb = hexToRgb(hexColor);
  if (!rgb) {
    return hexColor;
  }

  const clampAmount = Math.max(0, Math.min(1, amount));
  const next = rgb.map((channel, index) =>
    Math.round(channel * (1 - clampAmount) + mixWith[index] * clampAmount),
  );

  return `#${next.map((value) => value.toString(16).padStart(2, "0")).join("")}`;
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

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(parsed);
}

function toPhoneDigits(value: string) {
  return value.replace(/[^\d+]/g, "").replace(/^(\+)?0+/, "$1");
}

function buildContactItems(profile: Profile) {
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
          label: "Phone",
          value: phoneHome,
          href: `tel:${toPhoneDigits(phoneHome)}`,
          icon: Phone,
          tag: "Home",
          tagTone: "home" as const,
        }
      : null,
    phoneOffice
      ? {
          key: "phone-office",
          label: "Phone",
          value: phoneOffice,
          href: `tel:${toPhoneDigits(phoneOffice)}`,
          icon: Phone,
          tag: "Office",
          tagTone: "office" as const,
        }
      : null,
    emailHome
      ? {
          key: "email-home",
          label: "Email",
          value: emailHome,
          href: `mailto:${emailHome}`,
          icon: Mail,
          tag: "Home",
          tagTone: "home" as const,
        }
      : null,
    emailOffice
      ? {
          key: "email-office",
          label: "Email",
          value: emailOffice,
          href: `mailto:${emailOffice}`,
          icon: Mail,
          tag: "Office",
          tagTone: "office" as const,
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
          tag: null,
          tagTone: null,
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
          tag: null,
          tagTone: null,
        }
      : null,
  ].filter(Boolean) as Array<{
    key: string;
    label: string;
    value: string;
    href: string;
    icon: IconComponent;
    external?: boolean;
    tag: "Home" | "Office" | null;
    tagTone: "home" | "office" | null;
  }>;
}

function sectionTitle(label: string) {
  return (
    <div className={`mb-3 flex items-center gap-2 px-5 ${syne.className}`}>
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text3)]">{label}</p>
      <div className="h-px flex-1 bg-gradient-to-r from-[var(--border)] to-transparent" />
    </div>
  );
}

function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  if (!experiences.length) {
    return null;
  }

  return (
    <section className="pb-6">
      {sectionTitle("Experience")}
      <div className="space-y-5 px-5">
        {experiences.map((item, index) => {
          const start = formatDateLabel(item.start_date);
          const end = item.is_current ? "Present" : formatDateLabel(item.end_date);
          const hasMeta = Boolean(start || end || item.location);

          return (
            <article key={item.id} className="flex gap-3">
              <div className="flex w-3 shrink-0 flex-col items-center pt-1">
                <div
                  className={`size-3 rounded-full border-2 ${
                    index === 0 ? "bg-[var(--accent)] shadow-[0_0_12px_var(--glow)]" : "bg-[var(--c1)]"
                  }`}
                  style={{
                    borderColor: "var(--accent)",
                  }}
                />
                {index !== experiences.length - 1 ? (
                  <div className="mt-1 h-full w-px bg-gradient-to-b from-[var(--border)] to-transparent" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1 rounded-2xl border border-[var(--border)] bg-[var(--c3)] p-4">
                {item.is_current ? (
                  <span className="float-right rounded-full border border-emerald-300/30 bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-emerald-300">
                    Current
                  </span>
                ) : null}
                <p className={`text-[15px] font-bold text-[var(--text1)] ${syne.className}`}>{item.title}</p>
                {item.company ? <p className="text-sm text-[var(--accent2)]">{item.company}</p> : null}
                {hasMeta ? (
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[var(--text3)]">
                    {start || end ? (
                      <span className="flex items-center gap-1">
                        <BriefcaseBusiness className="size-3.5" />
                        {[start, end].filter(Boolean).join(" - ")}
                      </span>
                    ) : null}
                    {item.location ? (
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3.5" />
                        {item.location}
                      </span>
                    ) : null}
                  </div>
                ) : null}
                {item.description ? (
                  <p className="mt-2 break-words text-sm leading-6 text-[var(--text2)]">{item.description}</p>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function Style3Designer({
  profile,
  socialLinks,
  experiences,
  profileUrl,
}: ProfileStyleProps & { profileUrl?: string }) {
  const coverUrl = profile.cover_path || DEFAULT_COVER;
  const avatarUrl = profile.avatar_path || DEFAULT_AVATAR;
  const accent = profile.accent_color || "#3b82f6";
  const accentSoft = mixHex(accent, [255, 255, 255], 0.28);
  const accentDeep = mixHex(accent, [0, 0, 0], 0.35);
  const accentCyan = mixHex(accent, [56, 189, 248], 0.3);
  const sortedLinks = [...socialLinks].sort((a, b) => a.sort_order - b.sort_order);
  const contacts = buildContactItems(profile);
  const showJobOrCompany = profile.job_title || profile.company_name;

  const profileVars = {
    "--c1": "#090910",
    "--c3": "#14141f",
    "--c4": "#1b1b28",
    "--text1": "#f0eeff",
    "--text2": "#a89fd4",
    "--text3": "#5e587a",
    "--accent": accent,
    "--accent2": accentSoft,
    "--accent3": accentCyan,
    "--border": withAlpha(accent, "2a"),
    "--glow": withAlpha(accent, "55"),
  } as CSSProperties;

  return (
    <div
      style={profileVars}
      className={`${dmSans.className} overflow-hidden bg-[var(--c1)] text-[var(--text1)]`}
    >
      <section className="relative h-40 overflow-visible sm:h-52">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={coverUrl}
            alt={`${profile.display_name} cover image`}
            fill
            className="object-cover object-center brightness-[0.58] saturate-[1.2]"
            sizes="(max-width: 640px) 100vw, 640px"
            quality={100}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(9,9,16,0.08) 0%, rgba(9,9,16,0.25) 45%, rgba(9,9,16,0.82) 77%, var(--c1) 100%)",
            }}
          />
        </div>
        <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between px-3 py-3 sm:px-4 sm:py-4">
          <ProfileActionSuite
            profileUrl={profileUrl ?? `/${profile.slug}`}
            profileName={profile.display_name}
            accentColor={accent}
            compact
            theme="style-3"
          />
        </div>

        <div className="absolute -bottom-14 left-1/2 z-10 -translate-x-1/2">
          <div
            className={`size-[112px] p-[3px] shadow-[0_0_34px_var(--glow)] rounded-full`}
            style={{
              background: `conic-gradient(from 180deg, ${accent}, ${accentSoft}, ${accentCyan}, ${accent})`,
            }}
          >
            <div className={`relative size-full overflow-hidden border-[4px] border-[var(--c1)] rounded-full`}>
              <Image
                src={avatarUrl}
                alt={`${profile.display_name} profile photo`}
                fill
                className="object-cover object-center"
                sizes="112px"
                quality={100}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-5 pt-16 text-center">
        <h1
          className={`${syne.className} text-[30px] font-extrabold leading-none tracking-[-0.02em]`}
          style={{
            backgroundImage: `linear-gradient(135deg, #ffffff 22%, ${accentSoft} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {profile.display_name}
        </h1>

        {showJobOrCompany ? (
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--c4)] px-3 py-1 text-xs font-medium text-[var(--accent2)]">
            <span className="size-1.5 rounded-full bg-[var(--accent)]" />
            {[profile.job_title, profile.company_name].filter(Boolean).join(" at ")}
          </p>
        ) : null}

        {profile.bio ? (
          <p className="mx-auto mt-3 max-w-[320px] text-sm leading-7 text-[var(--text2)]">{profile.bio}</p>
        ) : null}

        <div className="mt-5 grid gap-2.5 sm:grid-cols-[1.35fr_0.95fr]">
          <a href={`/api/public/vcf/${profile.slug}`} className="min-w-0">
            <span
              className={`relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3.5 text-sm font-bold text-white ${syne.className}`}
              style={{
                backgroundImage: `linear-gradient(135deg, ${accent} 0%, ${accentSoft} 100%)`,
                boxShadow: `0 10px 30px ${withAlpha(accentDeep, "88")}`,
              }}
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/15 to-transparent" />
              <Download className="relative size-4" />
              <span className="relative">Save Contact</span>
            </span>
          </a>
          <ProfileActionSuite
            profileUrl={profileUrl ?? `/${profile.slug}`}
            profileName={profile.display_name}
            accentColor={accent}
            connectOnly
            theme="style-3"
            connectClassName={`${syne.className} text-sm font-bold`}
          />
        </div>
      </section>

      {sortedLinks.length ? (
        <section className="pb-6">
          {sectionTitle("Social")}
          <div className="overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="inline-flex min-w-max gap-2">
              {sortedLinks.map((link) => {
                const Icon = platformIcons[link.platform] ?? ExternalLink;
                const label = link.label?.trim() || platformLabels[link.platform] || "Social";
                const tint = platformTint[link.platform] || platformTint.custom;

                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-w-[88px] shrink-0 flex-col items-center gap-1 rounded-2xl border border-[var(--border)] bg-[var(--c3)] px-3 py-3 text-center transition active:scale-95"
                  >
                    <span
                      className="flex size-8 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: withAlpha(tint, "2a"),
                        color: tint,
                      }}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className="max-w-[76px] truncate text-[11px] text-[var(--text2)]">{label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {contacts.length ? (
        <section className="pb-6">
          {sectionTitle("Contact")}
          <div className="space-y-2.5 px-5">
            {contacts.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.key}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--c3)] p-3.5 transition active:scale-[0.99]"
                >
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl text-[var(--accent)]"
                    style={{ backgroundColor: withAlpha(accent, "33") }}
                  >
                    <Icon className="size-[18px]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-medium uppercase tracking-[0.06em] text-[var(--text3)]">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block break-words text-sm text-[var(--text1)]">{item.value}</span>
                  </span>
                  {item.tag ? (
                    <span
                      className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${
                        item.tagTone === "home"
                          ? "border-red-300/20 bg-gradient-to-br from-red-500/16 to-red-700/8 text-white"
                          : "border-emerald-300/20 bg-gradient-to-br from-emerald-500/16 to-green-700/8 text-white"
                      }`}
                    >
                      {item.tag}
                    </span>
                  ) : null}
                </a>
              );
            })}
          </div>
        </section>
      ) : null}

      <ExperienceSection experiences={experiences} />
    </div>
  );
}
