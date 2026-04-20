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

function toPhoneDigits(value: string) {
  return value.replace(/[^\d+]/g, "").replace(/^(\+)?0+/, "$1");
}

function formatDateLabel(value: string | null) {
  if (!value) return "";
  const monthPattern = /^\d{4}-\d{2}$/;
  const dayPattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!monthPattern.test(value) && !dayPattern.test(value)) return value;
  const padded = monthPattern.test(value) ? `${value}-01` : value;
  const parsed = new Date(`${padded}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(parsed);
}

function cleanUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
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
      ? { key: "phone-home", label: "phone", value: phoneHome, href: `tel:${toPhoneDigits(phoneHome)}`, icon: Phone }
      : null,
    phoneOffice
      ? { key: "phone-office", label: "phone_office", value: phoneOffice, href: `tel:${toPhoneDigits(phoneOffice)}`, icon: Phone }
      : null,
    emailHome
      ? { key: "email-home", label: "email", value: emailHome, href: `mailto:${emailHome}`, icon: Mail }
      : null,
    emailOffice
      ? { key: "email-office", label: "email_office", value: emailOffice, href: `mailto:${emailOffice}`, icon: Mail }
      : null,
    whatsappDigits
      ? { key: "whatsapp", label: "whatsapp", value: whatsappSource, href: `https://wa.me/${whatsappDigits}`, icon: WhatsappIcon, external: true }
      : null,
    location
      ? {
          key: "location",
          label: "location",
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

export function Style6Terminal({ profile, socialLinks, experiences }: ProfileStyleProps) {
  const coverUrl = profile.cover_path || DEFAULT_COVER;
  const avatarUrl = profile.avatar_path || DEFAULT_AVATAR;
  const roleText = profile.job_title?.trim() || "Professional";
  const bioText = profile.bio?.trim() || "Profile";
  const contacts = buildContacts(profile);
  const sortedLinks = [...socialLinks].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="overflow-hidden bg-[#0d0d0d] font-mono text-[#c9c9c4]">
      <div className="flex items-center gap-2.5 border-b border-white/10 bg-black/70 px-3.5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
        <span className="ml-1 text-[11px] tracking-[0.04em] text-emerald-400/80">
          <span className="text-emerald-300/55">~</span>/profile/{profile.slug}
        </span>
      </div>

      <section className="relative h-[180px] overflow-hidden">
        <Image
          src={coverUrl}
          alt={`${profile.display_name} cover image`}
          fill
          className="object-cover brightness-[0.62]"
          sizes="(max-width: 640px) 100vw, 640px"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1a12]/55 via-[#0d0f1a]/45 to-[#0d1410]/55" />
      </section>

      <section className="relative z-10 mb-1 flex items-end gap-3 px-4 pt-0">
        <div className="-mt-11 h-[90px] w-[90px] shrink-0 overflow-hidden rounded-md border-2 border-[#1a2e1f] bg-[#141414] shadow-[0_0_0_1px_rgba(74,222,128,0.15)]">
          <Image
            src={avatarUrl}
            alt={`${profile.display_name} profile photo`}
            width={90}
            height={90}
            className="h-full w-full object-cover"
            quality={100}
          />
        </div>
        <div className="pb-1.5">
          <p className="text-[15px] font-semibold tracking-[0.02em] text-[#e2e8e0]">{profile.display_name}</p>
          <p className="mt-0.5 text-[11px] tracking-[0.08em] text-emerald-400/70">@{profile.slug}</p>
        </div>
      </section>

      <div className="h-3" />

      <section className="mx-2.5 mb-1.5 overflow-hidden rounded-[4px] border border-white/10 bg-[#111211]">
        <div className="flex items-center gap-1.5 border-b border-white/5 px-3.5 py-1.5">
          <span className="text-xs font-medium text-emerald-400/90">$</span>
          <span className="text-xs text-[#c9c9c4]/65">user</span>
          <span className="text-xs text-[#555]">.</span>
          <span className="text-xs text-sky-300/80">init</span>
          <span className="text-xs text-[#c9c9c4]/65">()</span>
        </div>
        <div className="px-3.5 py-2.5 text-xs">
          <div className="grid grid-cols-[auto_1fr] gap-x-2 py-0.5">
            <span className="font-medium text-emerald-400/70">NAME</span>
            <span className="text-[#dcdcd8]">
              <span className="text-[#555]">= </span>
              <span className="text-amber-200">&quot;{profile.display_name}&quot;</span>
            </span>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-2 py-0.5">
            <span className="font-medium text-emerald-400/70">ROLE</span>
            <span className="text-[#dcdcd8]">
              <span className="text-[#555]">= </span>
              <span className="text-amber-200">&quot;{roleText}&quot;</span>
            </span>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-2 py-0.5">
            <span className="font-medium text-emerald-400/70">BIO</span>
            <span className="text-[#dcdcd8]">
              <span className="text-[#555]">= </span>
              <span className="text-[#c9c9c4]/85">&quot;{bioText}&quot;</span>
            </span>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-2 py-0.5">
            <span className="font-medium text-emerald-400/70">STATUS</span>
            <span className="text-[#dcdcd8]">
              <span className="text-[#555]">= </span>
              <span className="text-emerald-400">open_to_work</span>
              <span className="ml-0.5 inline-block h-3 w-[7px] bg-emerald-400/80 align-middle [animation:terminal-cursor-blink_1.1s_step-end_infinite]" />
            </span>
          </div>
        </div>
      </section>

      <section className="mx-2.5 mb-1.5 overflow-hidden rounded-[4px] border border-white/10 bg-[#111211]">
        <div className="flex items-center gap-1.5 border-b border-white/5 px-3.5 py-1.5">
          <span className="text-xs font-medium text-emerald-400/90">$</span>
          <span className="text-xs text-[#c9c9c4]/65">run</span>
          <span className="ml-1 text-xs text-emerald-400/75">actions</span>
        </div>
        <div className="flex flex-wrap gap-2 px-3.5 py-2.5 text-xs">
          <a
            href={`/api/public/vcf/${profile.slug}`}
            className="inline-flex items-center gap-1.5 rounded-[3px] border border-emerald-400/30 bg-[#0d1a12] px-2.5 py-1.5 text-emerald-400 transition hover:bg-[#122018]"
          >
            <span className="text-[11px] opacity-55">&gt;</span>
            <Download className="size-3.5" />
            download_vcard
          </a>
          {contacts.find((item) => item.label.includes("email")) ? (
            <a
              href={contacts.find((item) => item.label.includes("email"))?.href}
              className="inline-flex items-center gap-1.5 rounded-[3px] border border-white/15 bg-transparent px-2.5 py-1.5 text-[#9ca3af] transition hover:bg-[#1a1a1a]"
            >
              <span className="text-[11px] opacity-55">&gt;</span>
              <Mail className="size-3.5" />
              send_email
            </a>
          ) : null}
        </div>
      </section>

      {sortedLinks.length ? (
        <section className="mx-2.5 mb-1.5 overflow-hidden rounded-[4px] border border-white/10 bg-[#111211]">
          <div className="flex items-center gap-1.5 border-b border-white/5 px-3.5 py-1.5">
            <span className="text-xs font-medium text-emerald-400/90">$</span>
            <span className="text-xs text-[#c9c9c4]/65">list</span>
            <span className="ml-1 text-xs text-sky-300/75">--links</span>
          </div>
          <div className="px-3.5 py-2.5 text-xs">
            {sortedLinks.map((link, index) => {
              const Icon = platformIcons[link.platform] ?? ExternalLink;
              return (
                <div
                  key={link.id}
                  className={`flex items-center gap-2 py-1.5 ${index !== sortedLinks.length - 1 ? "border-b border-white/5" : ""}`}
                >
                  <Icon className="size-3.5 text-sky-300/80" />
                  <span className="min-w-[72px] text-sky-300/75">{link.platform}</span>
                  <span className="text-[#333]">→</span>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="min-w-0 flex-1 truncate text-[11px] text-[#c9c9c4]/60 hover:text-sky-300"
                  >
                    {cleanUrl(link.url)}
                  </a>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {contacts.length ? (
        <section className="mx-2.5 mb-1.5 overflow-hidden rounded-[4px] border border-white/10 bg-[#111211]">
          <div className="flex items-center gap-1.5 border-b border-white/5 px-3.5 py-1.5">
            <span className="text-xs font-medium text-emerald-400/90">$</span>
            <span className="text-xs text-[#c9c9c4]/65">cat</span>
            <span className="ml-1 text-xs text-amber-200/70">contact.info</span>
          </div>
          <div className="px-3.5 py-2.5 text-xs">
            {contacts.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.key}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className={`grid grid-cols-[auto_auto_1fr] items-center gap-x-2 gap-y-0.5 py-1.5 ${index !== contacts.length - 1 ? "border-b border-white/5" : ""}`}
                >
                  <Icon className="size-3.5 text-emerald-400/80" />
                  <span className="text-[11px] font-medium text-emerald-400/60">{item.label}</span>
                  <span className="truncate text-[#c9c9c4]/85 hover:text-white">{item.value}</span>
                </a>
              );
            })}
          </div>
        </section>
      ) : null}

      {experiences.length ? (
        <section className="mx-2.5 mb-2 overflow-hidden rounded-[4px] border border-white/10 bg-[#111211]">
          <div className="flex items-center gap-1.5 border-b border-white/5 px-3.5 py-1.5">
            <span className="text-xs font-medium text-emerald-400/90">$</span>
            <span className="text-xs text-[#c9c9c4]/65">cat</span>
            <span className="ml-1 text-xs text-amber-200/70">experience.log</span>
          </div>
          <div className="px-3.5 py-2.5 text-xs">
            {experiences.map((item, index) => {
              const start = formatDateLabel(item.start_date);
              const end = item.is_current ? "Present" : formatDateLabel(item.end_date);
              return (
                <div key={item.id} className={`${index !== experiences.length - 1 ? "border-b border-white/10 pb-3 mb-3" : ""}`}>
                  <div className="mb-1">
                    <span className="text-[11px] text-[#555]">[</span>
                    <span className="text-[11px] tracking-[0.03em] text-sky-300/80">{[start, end].filter(Boolean).join(" - ")}</span>
                    <span className="text-[11px] text-[#555]">]</span>
                    <span className="mx-1 text-[11px] text-[#555]">·</span>
                    <span className="text-[12px] font-medium text-[#e2e8e0]">{item.title}</span>
                    {item.company ? (
                      <>
                        <span className="mx-1 text-[11px] text-[#555]">@</span>
                        <span className="text-[12px] text-emerald-400/80">{item.company}</span>
                      </>
                    ) : null}
                  </div>
                  {item.description ? (
                    <div className="flex gap-1.5 py-0.5 text-[11px] leading-[1.55] text-[#9ca3af]">
                      <span className="text-[#333]">-</span>
                      <span>{item.description}</span>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}
