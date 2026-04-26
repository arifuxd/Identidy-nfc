import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import { Orbitron, Exo_2 } from "next/font/google";
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
import type { ProfileStyleProps } from "./types";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-orbitron",
});

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-exo2",
});

type IconComponent = ComponentType<{ className?: string; style?: React.CSSProperties; fill?: string; stroke?: string; strokeWidth?: string | number }>;

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

function getSocialBrand(platform: string, url: string) {
  const isTwitter = platform === "twitter" || /(x\.com|twitter\.com)/i.test(url);
  if (isTwitter) return { color: "#e7e9ea", bg: "rgba(255,255,255,0.05)" };

  switch (platform) {
    case "linkedin": return { color: "#0a66c2", bg: "rgba(10,102,194,0.15)" };
    case "github": return { color: "#ffffff", bg: "rgba(255,255,255,0.15)" };
    case "youtube": return { color: "#ff0000", bg: "rgba(255,0,0,0.15)" };
    case "facebook": return { color: "#1877f2", bg: "rgba(24,119,242,0.15)" };
    case "tiktok": return { color: "#ffffff", bg: "rgba(255,255,255,0.15)" };
    case "pinterest": return { color: "#e60023", bg: "rgba(230,0,35,0.15)" };
    case "instagram": return { color: "#e4405f", stroke: "url(#ig)", bg: "rgba(228,64,95,0.1)" };
    default: return { color: "var(--cyan)", bg: "rgba(0,212,255,0.08)" };
  }
}

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

export function Style7Scifi({ profile, socialLinks, experiences }: ProfileStyleProps) {
  const coverUrl = profile.cover_path || DEFAULT_COVER;
  const avatarUrl = profile.avatar_path || DEFAULT_AVATAR;
  const sortedLinks = [...socialLinks].sort((a, b) => a.sort_order - b.sort_order);

  const phoneHome = profile.phone_home?.trim() || profile.phone_public?.trim() || "";
  const phoneOffice = profile.phone_office?.trim() || "";
  const emailHome = profile.email_home?.trim() || profile.email_public?.trim() || "";
  const emailOffice = profile.email_office?.trim() || "";
  const location = profile.address?.trim() || "";

  const contacts = [
    phoneHome
      ? {
        key: "phone-home",
        label: "Voice Line",
        value: phoneHome,
        href: `tel:${toPhoneDigits(phoneHome)}`,
        iconColor: "var(--cyan)",
        wrapBg: "rgba(0,212,255,0.07)",
        wrapBorder: "rgba(0,212,255,0.2)",
      }
      : null,
    phoneOffice
      ? {
        key: "phone-office",
        label: "Office Line",
        value: phoneOffice,
        href: `tel:${toPhoneDigits(phoneOffice)}`,
        iconColor: "var(--cyan)",
        wrapBg: "rgba(0,212,255,0.07)",
        wrapBorder: "rgba(0,212,255,0.2)",
      }
      : null,
    emailHome
      ? {
        key: "email-home",
        label: "Encrypted Mail",
        value: emailHome,
        href: `mailto:${emailHome}`,
        iconColor: "var(--purple)",
        wrapBg: "rgba(139,92,246,0.07)",
        wrapBorder: "rgba(139,92,246,0.2)",
      }
      : null,
    emailOffice
      ? {
        key: "email-office",
        label: "Office Mail",
        value: emailOffice,
        href: `mailto:${emailOffice}`,
        iconColor: "var(--purple)",
        wrapBg: "rgba(139,92,246,0.07)",
        wrapBorder: "rgba(139,92,246,0.2)",
      }
      : null,
    location
      ? {
        key: "location",
        label: "Base Location",
        value: location,
        href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`,
        iconColor: "var(--blue)",
        wrapBg: "rgba(59,130,246,0.07)",
        wrapBorder: "rgba(59,130,246,0.2)",
        external: true,
      }
      : null,
  ].filter(Boolean) as Array<any>;

  return (
    <div className={`scifi-wrapper ${orbitron.variable} ${exo2.variable}`}>
      <style>{`
        .scifi-wrapper {
          --navy: #030712;
          --navy2: #060d1f;
          --navy3: #0a1628;
          --panel: rgba(8,20,48,0.55);
          --panel2: rgba(6,14,36,0.7);
          --cyan: #00d4ff;
          --blue: #3b82f6;
          --purple: #8b5cf6;
          --cyan2: #67e8f9;
          --glow-c: rgba(0,212,255,0.18);
          --glow-b: rgba(59,130,246,0.2);
          --glow-p: rgba(139,92,246,0.18);
          --text1: #e8f4ff;
          --text2: #7ba8cc;
          --text3: #3d6080;
          --border: rgba(0,212,255,0.12);
          --border2: rgba(59,130,246,0.15);
          
          background: var(--navy);
          color: var(--text1);
          font-family: var(--font-exo2), sans-serif;
          font-size: 15px;
          line-height: 1.6;
          min-height: 100vh;
          width: 100%;
          margin: 0 auto;
          overflow-x: hidden;
          position: relative;
          background-image:
            radial-gradient(1px 1px at 20% 30%, rgba(0,212,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 70% 15%, rgba(139,92,246,0.35) 0%, transparent 100%),
            radial-gradient(1px 1px at 45% 70%, rgba(0,212,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 85% 55%, rgba(255,255,255,0.25) 0%, transparent 100%),
            radial-gradient(1px 1px at 10% 85%, rgba(139,92,246,0.3) 0%, transparent 100%),
            radial-gradient(2px 2px at 60% 88%, rgba(0,212,255,0.2) 0%, transparent 100%),
            linear-gradient(180deg, #030712 0%, #060d1f 40%, #030a18 100%);
        }

        .scifi-wrapper::before {
          content: '';
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,212,255,0.012) 2px,
            rgba(0,212,255,0.012) 4px
          );
          pointer-events: none; z-index: 0;
        }

        .hud-corner { position: absolute; z-index: 2; pointer-events: none; width: 20px; height: 20px; }
        .hud-corner::before, .hud-corner::after { content: ''; position: absolute; background: var(--cyan); opacity: 0.4; }
        .hud-corner::before { width: 2px; height: 12px; }
        .hud-corner::after { width: 12px; height: 2px; }
        .hud-tl { top: 10px; left: 10px; } .hud-tl::before, .hud-tl::after { top: 0; left: 0; }
        .hud-tr { top: 10px; right: 10px; transform: scaleX(-1); } .hud-tr::before, .hud-tr::after { top: 0; left: 0; }
        .hud-bl { bottom: 10px; left: 10px; transform: scaleY(-1); } .hud-bl::before, .hud-bl::after { top: 0; left: 0; }
        .hud-br { bottom: 10px; right: 10px; transform: scale(-1); } .hud-br::before, .hud-br::after { top: 0; left: 0; }

        .scifi-cover { position: relative; height: 208px; overflow: visible; }
        .scifi-cover-img-wrap { position: absolute; inset: 0; overflow: hidden; }
        .scifi-cover-img { width: 100%; height: 100%; object-fit: cover; object-position: center 20%; display: block; filter: brightness(0.4) saturate(0.8) hue-rotate(10deg); }
        .scifi-cover-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(3,7,18,0.2) 0%, rgba(3,7,18,0.3) 35%, rgba(3,7,18,0.85) 75%, var(--navy) 100%); }
        .scifi-cover-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(0,212,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.06) 1px, transparent 1px); background-size: 40px 40px; mask-image: linear-gradient(180deg,rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.15) 60%,transparent 100%); WebkitMaskImage: linear-gradient(180deg,rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.15) 60%,transparent 100%); }
        .scifi-cover-scan { position: absolute; inset: 0; overflow: hidden; }
        .scifi-cover-scan::after { content: ''; position: absolute; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent 0%, var(--cyan) 40%, var(--cyan2) 60%, transparent 100%); opacity: 0.5; animation: scan 4s ease-in-out infinite; top: -2px; }
        
        @keyframes scan {
          0% { top: -2px; opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.3; }
          100% { top: 100%; opacity: 0; }
        }

        .scifi-cover-tags { position: absolute; top: 18px; left: 18px; right: 18px; display: flex; justify-content: space-between; align-items: flex-start; z-index: 4; opacity: 0; animation: fadeD 0.5s ease 0.6s forwards; }
        .scifi-cover-tag { font-family: var(--font-orbitron), sans-serif; font-size: 8px; font-weight: 500; letter-spacing: 1.5px; color: var(--cyan2); opacity: 0.7; text-transform: uppercase; padding: 4px 8px; border: 1px solid rgba(0,212,255,0.2); border-radius: 3px; background: rgba(0,0,0,0.3); backdrop-filter: blur(4px); }

        .scifi-avatar-wrap { position: absolute; bottom: -56px; left: 50%; transform: translateX(-50%); z-index: 10; }
        .scifi-avatar-outer { width: 116px; height: 116px; border-radius: 50%; position: relative; display: flex; align-items: center; justify-content: center; }
        .scifi-avatar-outer::before { content: ''; position: absolute; inset: -5px; border-radius: 50%; border: 1px dashed rgba(0,212,255,0.35); animation: orbit 12s linear infinite; }
        .scifi-avatar-outer::after { content: ''; position: absolute; inset: -2px; border-radius: 50%; border: 1px solid transparent; background: linear-gradient(var(--navy),var(--navy)) padding-box, conic-gradient(from 0deg, var(--cyan), var(--blue), var(--purple), var(--cyan)) border-box; animation: orbit 6s linear infinite reverse; }
        
        @keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .scifi-avatar-inner { width: 108px; height: 108px; border-radius: 50%; overflow: hidden; border: 2px solid var(--navy); position: relative; z-index: 1; box-shadow: 0 0 20px rgba(0,212,255,0.25), 0 0 60px rgba(59,130,246,0.12), inset 0 0 20px rgba(0,212,255,0.06); }
        .scifi-avatar-inner img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; }
        .scifi-avatar-inner::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0,212,255,0.08) 0%, transparent 40%, rgba(139,92,246,0.06) 70%, transparent 100%); border-radius: 50%; }
        .scifi-status-pip { position: absolute; bottom: 6px; right: 6px; z-index: 2; width: 14px; height: 14px; border-radius: 50%; background: #00ff9d; border: 2px solid var(--navy); box-shadow: 0 0 8px rgba(0,255,157,0.8); animation: pip-pulse 2.5s ease-in-out infinite; }
        
        @keyframes pip-pulse {
          0%, 100% { box-shadow: 0 0 6px rgba(0,255,157,0.7); }
          50% { box-shadow: 0 0 14px rgba(0,255,157,1); }
        }

        .scifi-identity { text-align: center; padding: 68px 24px 18px; position: relative; z-index: 1; }
        .scifi-id-uid { font-family: var(--font-orbitron), sans-serif; font-size: 9px; font-weight: 400; letter-spacing: 3px; color: var(--text3); text-transform: uppercase; margin-bottom: 10px; opacity: 0; animation: fadeD 0.5s ease 0.3s forwards; }
        .scifi-name { font-family: var(--font-orbitron), sans-serif; font-size: 26px; font-weight: 700; letter-spacing: -0.5px; line-height: 1.1; color: var(--text1); text-shadow: 0 0 30px rgba(0,212,255,0.3), 0 0 60px rgba(59,130,246,0.15); opacity: 0; animation: fadeD 0.5s ease 0.4s forwards; }
        .scifi-title-row { margin-top: 8px; display: flex; align-items: center; justify-content: center; gap: 10px; opacity: 0; animation: fadeD 0.5s ease 0.5s forwards; }
        .scifi-title-line { width: 28px; height: 1px; background: linear-gradient(90deg,transparent,var(--cyan)); }
        .scifi-title-line.r { background: linear-gradient(90deg,var(--cyan),transparent); }
        .scifi-title-text { font-family: var(--font-exo2), sans-serif; font-size: 12px; font-weight: 300; letter-spacing: 1.8px; color: var(--cyan2); text-transform: uppercase; text-shadow: 0 0 12px rgba(0,212,255,0.4); }
        .scifi-bio { margin: 16px auto 0; max-width: 290px; font-size: 13.5px; font-weight: 300; color: var(--text2); line-height: 1.7; font-style: italic; opacity: 0; animation: fadeD 0.5s ease 0.6s forwards; }
        .scifi-glow-div { margin: 20px auto 0; width: 120px; height: 1px; background: linear-gradient(90deg,transparent,var(--cyan),var(--blue),var(--purple),transparent); opacity: 0; animation: fadeD 0.5s ease 0.65s forwards; }

        .scifi-cta-wrap { padding: 22px 24px 26px; display: flex; justify-content: center; position: relative; z-index: 1; opacity: 0; animation: fadeD 0.5s ease 0.7s forwards; }
        .scifi-save-btn { display: inline-flex; align-items: center; gap: 10px; width: 100%; max-width: 320px; justify-content: center; padding: 15px 32px; font-family: var(--font-orbitron), sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: var(--text1); text-decoration: none; position: relative; overflow: hidden; border-radius: 4px; border: 1px solid rgba(0,212,255,0.35); background: linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(59,130,246,0.1) 50%, rgba(139,92,246,0.08) 100%); backdrop-filter: blur(12px); box-shadow: 0 0 20px rgba(0,212,255,0.1), inset 0 1px 0 rgba(255,255,255,0.05); transition: all 0.25s ease; }
        .scifi-save-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.06) 50%, transparent 100%); transform: translateX(-100%); animation: btn-sweep 3s ease-in-out 2s infinite; }
        
        @keyframes btn-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        .scifi-save-btn:active { box-shadow: 0 0 30px rgba(0,212,255,0.25), inset 0 0 20px rgba(0,212,255,0.05); border-color: rgba(0,212,255,0.6); }
        .scifi-btn-icon { width: 16px; height: 16px; flex-shrink: 0; }

        .scifi-sec { margin-bottom: 28px; position: relative; z-index: 1; opacity: 0; }
        .scifi-sec.v1 { animation: fadeD 0.5s ease 0.75s forwards; }
        .scifi-sec.v2 { animation: fadeD 0.5s ease 0.85s forwards; }
        .scifi-sec.v3 { animation: fadeD 0.5s ease 0.95s forwards; }
        .scifi-sec.v4 { animation: fadeD 0.5s ease 1.05s forwards; }

        .scifi-sec-head { display: flex; align-items: center; gap: 10px; padding: 0 20px; margin-bottom: 12px; }
        .scifi-sec-head-line { width: 3px; height: 14px; border-radius: 2px; background: linear-gradient(180deg,var(--cyan),var(--blue)); box-shadow: 0 0 8px var(--cyan); flex-shrink: 0; }
        .scifi-sec-title { font-family: var(--font-orbitron), sans-serif; font-size: 9px; font-weight: 500; letter-spacing: 3px; text-transform: uppercase; color: var(--text3); }
        .scifi-sec-title-line { flex: 1; height: 1px; background: linear-gradient(90deg,rgba(0,212,255,0.15),transparent); }

        .scifi-social-scroll { display: flex; gap: 10px; padding: 0 20px; overflow-x: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
        .scifi-social-scroll::-webkit-scrollbar { display: none; }
        .scifi-social-card { flex-shrink: 0; display: flex; flex-direction: column; align-items: center; gap: 7px; padding: 14px 16px; background: var(--panel); border: 1px solid var(--border); border-radius: 8px; backdrop-filter: blur(12px); text-decoration: none; color: inherit; min-width: 68px; transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s; position: relative; overflow: hidden; }
        .scifi-social-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg,transparent,rgba(0,212,255,0.3),transparent); }
        .scifi-social-card:active { transform: scale(0.94); border-color: rgba(0,212,255,0.4); box-shadow: 0 0 16px rgba(0,212,255,0.12); }
        .scifi-social-icon { width: 30px; height: 30px; border-radius: 6px; display: flex; align-items: center; justify-content: center; }
        .scifi-social-label { font-family: var(--font-orbitron), sans-serif; font-size: 8px; font-weight: 400; letter-spacing: 0.8px; color: var(--text3); text-transform: uppercase; white-space: nowrap; }

        .scifi-contact-panel { margin: 0 20px; background: var(--panel); border: 1px solid var(--border); border-radius: 10px; backdrop-filter: blur(14px); overflow: hidden; position: relative; }
        .scifi-contact-panel::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg,transparent,var(--cyan),var(--blue),transparent); opacity: 0.3; }
        .scifi-contact-row { display: flex; align-items: center; gap: 14px; padding: 14px 16px; text-decoration: none; color: inherit; position: relative; transition: background 0.2s; }
        .scifi-contact-row + .scifi-contact-row { border-top: 1px solid rgba(0,212,255,0.06); }
        .scifi-contact-row:active { background: rgba(0,212,255,0.04); }
        .scifi-ci-wrap { width: 36px; height: 36px; border-radius: 8px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border: 1px solid; }
        .scifi-ci-info { flex: 1; min-width: 0; }
        .scifi-ci-label { font-family: var(--font-orbitron), sans-serif; font-size: 8px; font-weight: 400; letter-spacing: 1.2px; color: var(--text3); text-transform: uppercase; margin-bottom: 2px; }
        .scifi-ci-val { font-size: 13px; font-weight: 300; color: var(--text1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .scifi-ci-tag { font-family: var(--font-orbitron), sans-serif; font-size: 8px; font-weight: 500; letter-spacing: 0.5px; padding: 3px 7px; border-radius: 3px; flex-shrink: 0; }

        .scifi-exp-list { display: flex; flex-direction: column; padding: 0 20px; gap: 0; }
        .scifi-exp-item { display: flex; gap: 14px; padding-bottom: 20px; }
        .scifi-exp-item:last-child { padding-bottom: 0; }
        .scifi-exp-tl { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; width: 12px; padding-top: 4px; }
        .scifi-exp-node { width: 10px; height: 10px; border-radius: 50%; background: var(--navy3); border: 1.5px solid var(--cyan); box-shadow: 0 0 8px rgba(0,212,255,0.5); flex-shrink: 0; z-index: 1; }
        .scifi-exp-item:first-child .scifi-exp-node { background: var(--cyan); box-shadow: 0 0 12px rgba(0,212,255,0.8); }
        .scifi-exp-tl-line { flex: 1; width: 1px; margin-top: 4px; background: linear-gradient(180deg,rgba(0,212,255,0.3),transparent); }
        .scifi-exp-item:last-child .scifi-exp-tl-line { display: none; }
        .scifi-exp-card { flex: 1; background: var(--panel); border: 1px solid var(--border); border-radius: 8px; padding: 14px 15px; backdrop-filter: blur(12px); position: relative; overflow: hidden; }
        .scifi-exp-item:first-child .scifi-exp-card { border-color: rgba(0,212,255,0.2); }
        .scifi-exp-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg,var(--cyan),var(--blue),transparent); opacity: 0; transition: opacity 0.3s; }
        .scifi-exp-item:first-child .scifi-exp-card::before { opacity: 0.4; }
        .scifi-exp-notch { position: absolute; top: 10px; left: -5px; width: 9px; height: 9px; background: var(--panel); border-left: 1px solid var(--border); border-bottom: 1px solid var(--border); transform: rotate(45deg); }
        .scifi-exp-item:first-child .scifi-exp-notch { border-color: rgba(0,212,255,0.2); }
        .scifi-exp-now { position: absolute; top: 11px; right: 11px; font-family: var(--font-orbitron), sans-serif; font-size: 7.5px; font-weight: 500; letter-spacing: 1px; color: #00ff9d; padding: 2px 7px; border-radius: 2px; background: rgba(0,255,157,0.1); border: 1px solid rgba(0,255,157,0.25); }
        .scifi-exp-role { font-family: var(--font-orbitron), sans-serif; font-size: 13px; font-weight: 700; color: var(--text1); margin-bottom: 3px; line-height: 1.2; }
        .scifi-exp-company { font-size: 12px; font-weight: 300; color: var(--cyan2); letter-spacing: 0.3px; }
        .scifi-exp-meta { display: flex; gap: 10px; margin-top: 8px; flex-wrap: wrap; }
        .scifi-exp-meta-item { display: flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 300; color: var(--text3); font-family: var(--font-orbitron), sans-serif; letter-spacing: 0.3px; }
        .scifi-exp-desc { margin-top: 10px; font-size: 12.5px; font-weight: 300; color: var(--text2); line-height: 1.65; }

        .scifi-footer { text-align: center; padding: 20px 24px 40px; border-top: 1px solid rgba(0,212,255,0.07); position: relative; z-index: 1; opacity: 0; animation: fadeD 0.5s ease 1.1s forwards; }
        .scifi-footer-inner { font-family: var(--font-orbitron), sans-serif; font-size: 8px; font-weight: 400; letter-spacing: 2.5px; color: var(--text3); text-transform: uppercase; }
        .scifi-footer-inner span { color: var(--cyan); opacity: 0.6; }

        @keyframes fadeD {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* HUD corners */}
      <div className="hud-corner hud-tl"></div>
      <div className="hud-corner hud-tr"></div>
      <div className="hud-corner hud-bl"></div>
      <div className="hud-corner hud-br"></div>

      {/* ── COVER ── */}
      <section className="scifi-cover">
        <div className="scifi-cover-img-wrap">
          <Image
            className="scifi-cover-img"
            src={coverUrl}
            alt="Cover"
            fill
            sizes="(max-width: 640px) 100vw, 640px"
            quality={100}
            priority
          />
          <div className="scifi-cover-overlay"></div>
          <div className="scifi-cover-grid"></div>
          <div className="scifi-cover-scan"></div>
        </div>
        {/* HUD data readouts */}
        <div className="scifi-cover-tags">
          <div className="scifi-cover-tag">SYS // ONLINE</div>
          <div className="scifi-cover-tag">NFC // v2.4</div>
        </div>
        {/* Avatar */}
        <div className="scifi-avatar-wrap">
          <div className="scifi-avatar-outer">
            <div className="scifi-avatar-inner">
              <Image
                src={avatarUrl}
                alt={profile.display_name}
                fill
                sizes="108px"
                quality={100}
                priority
              />
            </div>
            <div className="scifi-status-pip"></div>
          </div>
        </div>
      </section>

      {/* ── IDENTITY ── */}
      <section className="scifi-identity">
        <div className="scifi-id-uid">ID // {profile.id.substring(0, 8).toUpperCase()} &nbsp;·&nbsp; VERIFIED</div>
        <h1 className="scifi-name">{profile.display_name}</h1>
        <div className="scifi-title-row">
          <div className="scifi-title-line"></div>
          <div className="scifi-title-text">
            {[profile.job_title, profile.company_name].filter(Boolean).join(" · ") || "Professional"}
          </div>
          <div className="scifi-title-line r"></div>
        </div>
        {profile.bio && <p className="scifi-bio">{profile.bio}</p>}
        <div className="scifi-glow-div"></div>
      </section>

      {/* ── CTA ── */}
      <div className="scifi-cta-wrap">
        <a className="scifi-save-btn"
          href={`/api/public/vcf/${profile.slug}`}
        >
          <Download className="scifi-btn-icon" />
          SAVE CONTACT
        </a>
      </div>

      {/* ── SOCIAL ── */}
      {sortedLinks.length > 0 && (
        <section className="scifi-sec v1">
          <div className="scifi-sec-head">
            <div className="scifi-sec-head-line"></div>
            <div className="scifi-sec-title">Social Nodes</div>
            <div className="scifi-sec-title-line"></div>
          </div>
          <div className="scifi-social-scroll">
            {sortedLinks.map((link) => {
              const Icon = platformIcons[link.platform] ?? ExternalLink;
              const title = link.label?.trim() || platformLabels[link.platform] || "Social";
              const brand = getSocialBrand(link.platform, link.url);

              return (
                <a key={link.id} className="scifi-social-card" href={link.url} target="_blank" rel="noreferrer">
                  <div className="scifi-social-icon" style={{ background: brand.bg }}>
                    {link.platform === 'instagram' ? (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={brand.stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <defs><linearGradient id="ig" x1="0" y1="24" x2="24" y2="0"><stop offset="0%" stopColor="#f09433" /><stop offset="60%" stopColor="#dc2743" /><stop offset="100%" stopColor="#cc2366" /></linearGradient></defs>
                        <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="#dc2743" stroke="none" />
                      </svg>
                    ) : (
                      <Icon className="w-[17px] h-[17px]" style={{ color: brand.color }} />
                    )}
                  </div>
                  <div className="scifi-social-label">{title}</div>
                </a>
              );
            })}
          </div>
        </section>
      )}

      {/* ── CONTACT ── */}
      {contacts.length > 0 && (
        <section className="scifi-sec v2">
          <div className="scifi-sec-head">
            <div className="scifi-sec-head-line"></div>
            <div className="scifi-sec-title">Contact Matrix</div>
            <div className="scifi-sec-title-line"></div>
          </div>
          <div className="scifi-contact-panel">
            {contacts.map((item) => {
              const Icon = item.key === 'location' ? MapPin : (item.key.includes('phone') ? Phone : Mail);
              return (
                <a key={item.key} className="scifi-contact-row" href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined}>
                  <div className="scifi-ci-wrap" style={{ background: item.wrapBg, borderColor: item.wrapBorder }}>
                    <Icon className="w-4 h-4" style={{ color: item.iconColor }} strokeWidth={1.8} />
                  </div>
                  <div className="scifi-ci-info">
                    <div className="scifi-ci-label">{item.label}</div>
                    <div className="scifi-ci-val">{item.value}</div>
                  </div>

                </a>
              );
            })}
          </div>
        </section>
      )}

      {/* ── EXPERIENCE ── */}
      {experiences.length > 0 && (
        <section className="scifi-sec v3" style={{ marginBottom: "32px" }}>
          <div className="scifi-sec-head">
            <div className="scifi-sec-head-line"></div>
            <div className="scifi-sec-title">Career Log</div>
            <div className="scifi-sec-title-line"></div>
          </div>
          <div className="scifi-exp-list">
            {experiences.map((item, index) => {
              const start = formatDateLabel(item.start_date);
              const end = item.is_current ? "Present" : formatDateLabel(item.end_date);

              return (
                <div key={item.id} className="scifi-exp-item">
                  <div className="scifi-exp-tl">
                    <div className="scifi-exp-node"></div>
                    <div className="scifi-exp-tl-line"></div>
                  </div>
                  <div className="scifi-exp-card">
                    <div className="scifi-exp-notch"></div>
                    {item.is_current && <div className="scifi-exp-now">ACTIVE</div>}
                    <div className="scifi-exp-role">{item.title}</div>
                    <div className="scifi-exp-company">{item.company}</div>
                    <div className="scifi-exp-meta">
                      {(start || end) && (
                        <span className="scifi-exp-meta-item">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                          {[start, end].filter(Boolean).join(" — ")}
                        </span>
                      )}
                      {item.location && (
                        <span className="scifi-exp-meta-item">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                          {item.location}
                        </span>
                      )}
                    </div>
                    {item.description && <p className="scifi-exp-desc">{item.description}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer className="scifi-footer">
        <div className="scifi-footer-inner">
          <span>NFC</span> // NOVA IDENTITY SYSTEM &nbsp;·&nbsp; <span>SECURE CHANNEL</span>
        </div>
      </footer>
    </div>
  );
}
