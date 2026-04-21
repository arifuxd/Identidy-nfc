import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import { Bebas_Neue, DM_Sans, DM_Mono } from "next/font/google";
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

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-dm-mono",
});

type IconComponent = ComponentType<{ className?: string; style?: React.CSSProperties }>;

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

function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.3-.47.33-.87.8-.99 1.35-.12.54-.1 1.1.04 1.63.14.53.44 1.01.83 1.39.59.59 1.46.91 2.3.89 1.3-.01 2.5-.83 2.97-2.01.12-.33.15-.68.15-1.03V.02z" />
    </svg>
  );
}

const platformIcons: Record<string, IconComponent> = {
  facebook: FacebookIcon,
  twitter: TwitterXIcon,
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

export function Style8Cinema({ profile, socialLinks, experiences }: ProfileStyleProps) {
  const coverUrl = profile.cover_path || DEFAULT_COVER;
  const avatarUrl = profile.avatar_path || DEFAULT_AVATAR;
  const sortedLinks = [...socialLinks].sort((a, b) => a.sort_order - b.sort_order);

  const phoneHome = profile.phone_home?.trim() || profile.phone_public?.trim() || "";
  const phoneOffice = profile.phone_office?.trim() || "";
  const emailHome = profile.email_home?.trim() || profile.email_public?.trim() || "";
  const emailOffice = profile.email_office?.trim() || "";
  const location = profile.address?.trim() || "";

  const contacts = [
    phoneHome ? { key: "phone-home", label: "Phone", value: phoneHome, href: `tel:${toPhoneDigits(phoneHome)}`, icon: Phone } : null,
    phoneOffice ? { key: "phone-office", label: "Office", value: phoneOffice, href: `tel:${toPhoneDigits(phoneOffice)}`, icon: Phone } : null,
    emailHome ? { key: "email-home", label: "Email", value: emailHome, href: `mailto:${emailHome}`, icon: Mail } : null,
    emailOffice ? { key: "email-office", label: "Office Mail", value: emailOffice, href: `mailto:${emailOffice}`, icon: Mail } : null,
    location ? { key: "location", label: "Location", value: location, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, icon: MapPin } : null,
  ].filter(Boolean) as Array<any>;

  const initials = profile.display_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const stripText = `${profile.display_name} · ${profile.job_title || "PRO"} · ${profile.company_name || "STUDIOS"}`.toUpperCase();

  return (
    <div className={`cinema-wrapper ${bebasNeue.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <style>{`
        .cinema-wrapper {
          --gold: #C9A84C;
          --gold-dim: #8A6F30;
          --gold-faint: rgba(201,168,76,0.12);
          --teal: #2ABFB0;
          --bg: #080808;
          --s1: #101010;
          --s2: #161616;
          --border: rgba(255,255,255,0.07);
          --border2: rgba(255,255,255,0.12);
          --text: #F0EDE6;
          --muted: #6A6560;
          --muted2: #9A958E;
          
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-dm-sans), sans-serif;
          -webkit-font-smoothing: antialiased;
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          overflow-x: hidden;
          min-height: 100vh;
          padding-bottom: 40px;
        }

        .filmstrip {
          width: 100%;
          height: 36px;
          background: #0c0c0c;
          display: flex;
          align-items: center;
          overflow: hidden;
          border-bottom: 1px solid #1a1a1a;
          position: relative;
        }

        .filmstrip-track {
          display: flex;
          align-items: center;
          gap: 0;
          animation: stripScroll 15s linear infinite;
        }

        .film-hole {
          width: 18px;
          height: 24px;
          border-radius: 2px;
          border: 1.5px solid #2a2a2a;
          background: #050505;
          flex-shrink: 0;
          margin: 0 5px;
        }

        .strip-content {
          display: flex;
          align-items: center;
          padding: 0 12px;
          gap: 8px;
          flex-shrink: 0;
        }

        .strip-text {
          font-family: var(--font-dm-mono), monospace;
          font-size: 8px;
          letter-spacing: 0.22em;
          color: #3e3e3e;
          text-transform: uppercase;
          white-space: nowrap;
        }

        @keyframes stripScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .hero {
          position: relative;
          width: 100%;
          height: 208px; /* Standard cover height requested */
          overflow: hidden;
          background: #0c0c0c;
        }

        .hero-bg {
          width: 100%;
          height: 100%;
          background: linear-gradient(160deg, #1a1208 0%, #0c1a18 40%, #080808 100%);
          position: relative;
        }

        .hero-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 1;
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .hero-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(8,8,8,0.7) 75%, rgba(8,8,8,1) 98%, var(--bg) 100%);
          pointer-events: none;
        }

        .hero-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.7) 100%);
          pointer-events: none;
        }

        .hero-reel-deco {
          position: absolute;
          top: -30px;
          right: -30px;
          opacity: 0.08;
        }

        .hero-topbar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 10;
        }

        .hero-badge {
          font-family: var(--font-dm-mono), monospace;
          font-size: 8.5px;
          letter-spacing: 0.22em;
          color: var(--gold);
          text-transform: uppercase;
          border: 0.5px solid var(--gold-dim);
          padding: 4px 9px;
          background: rgba(0,0,0,0.5);
        }

        .clapper-badge {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .clapper-mini {
          width: 28px;
          height: 20px;
          position: relative;
        }

        .clapper-body-mini {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 14px;
          background: rgba(0,0,0,0.6);
          border: 1px solid #333;
          border-radius: 1px;
        }

        .clapper-top-mini {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 8px;
          background: transparent;
          border: 1px solid #333;
          overflow: hidden;
          border-radius: 1px 1px 0 0;
        }

        .clapper-stripe-mini {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
        }

        .clapper-s {
          height: 100%;
          flex: 1;
          background: #222;
        }

        .clapper-s:nth-child(even) {
          background: #C9A84C;
          opacity: 0.7;
        }

        .clapper-arm-mini {
          position: absolute;
          top: -3px;
          left: 2px;
          width: 22px;
          height: 4px;
          background: #2a2a2a;
          border: 0.5px solid #444;
          transform-origin: left center;
          transform: rotate(-18deg);
        }

        .hero-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 0 20px 18px;
          z-index: 10;
        }

        .cast-card {
          display: flex;
          align-items: flex-end;
          gap: 14px;
        }

        .profile-wrap {
          flex-shrink: 0;
          width: 70px;
          height: 88px;
          border: 1.5px solid var(--gold-dim);
          overflow: hidden;
          position: relative;
          background: #141414;
        }

        .profile-notch {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: repeating-linear-gradient(90deg, #C9A84C 0, #C9A84C 6px, #141414 6px, #141414 12px);
          z-index: 2;
        }

        .profile-initials {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-bebas), sans-serif;
          font-size: 28px;
          color: var(--gold-dim);
          letter-spacing: 0.05em;
          margin-top: 6px;
          z-index: 1;
        }

        .profile-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 2;
          filter: grayscale(0.2) contrast(1.1);
        }

        .profile-corner {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 14px;
          height: 14px;
          border-top: 1.5px solid var(--gold-dim);
          border-left: 1.5px solid var(--gold-dim);
          z-index: 3;
        }

        .hero-nameblock {
          flex: 1;
          padding-bottom: 2px;
        }

        .hero-eyebrow {
          font-family: var(--font-dm-mono), monospace;
          font-size: 8.5px;
          letter-spacing: 0.22em;
          color: var(--gold);
          text-transform: uppercase;
          margin-bottom: 5px;
          opacity: 0.85;
        }

        .hero-name {
          font-family: var(--font-bebas), sans-serif;
          font-size: 38px;
          line-height: 0.9;
          letter-spacing: 0.03em;
          color: var(--text);
        }

        .hero-tagline {
          font-family: var(--font-dm-mono), monospace;
          font-size: 8.5px;
          letter-spacing: 0.15em;
          color: var(--muted2);
          margin-top: 6px;
          text-transform: uppercase;
        }

        .holes-row {
          display: flex;
          align-items: center;
          padding: 16px 0 0;
          gap: 0;
          overflow: hidden;
          background: transparent;
        }

        .h-spacer { flex: 1; height: 1px; background: var(--border); }
        .h-hole { width: 12px; height: 16px; border-radius: 2px; border: 1px solid #252525; background: #050505; margin: 0 3px; flex-shrink: 0; }

        .identity { padding: 20px 20px 0; }
        .titlecard { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .titlecard-bar { width: 24px; height: 1.5px; background: var(--gold); }
        .titlecard-text { font-family: var(--font-dm-mono), monospace; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); }
        .bio { font-size: 13.5px; line-height: 1.8; color: rgba(240,237,230,0.65); font-weight: 300; padding-left: 13px; border-left: 1.5px solid rgba(201,168,76,0.2); }

        .clapper-header { margin: 28px 20px 0; display: flex; align-items: stretch; gap: 12px; }
        .clapper-full { width: 52px; flex-shrink: 0; position: relative; }
        .clapper-board { width: 52px; height: 38px; background: #111; border: 1px solid #2a2a2a; border-radius: 2px; position: relative; overflow: hidden; }
        .clapper-board-top { height: 14px; display: flex; overflow: hidden; border-bottom: 1px solid #2a2a2a; }
        .clapper-board-stripe { height: 100%; flex: 1; background: #1a1a1a; }
        .clapper-board-stripe:nth-child(even) { background: var(--gold); opacity: 0.5; }
        .clapper-stick { position: absolute; top: -8px; left: 0; right: 0; height: 10px; background: #1a1a1a; border: 1px solid #333; transform-origin: left top; transform: rotate(-12deg); z-index: 2; }
        .clapper-text-area { padding: 4px 6px; display: flex; flex-direction: column; gap: 2px; }
        .clapper-line { height: 2px; background: #252525; border-radius: 1px; }
        .clapper-label-wrap { flex: 1; display: flex; flex-direction: column; justify-content: center; }
        .clapper-section-label { font-family: var(--font-dm-mono), monospace; font-size: 8.5px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); margin-bottom: 2px; }
        .clapper-section-title { font-family: var(--font-bebas), sans-serif; font-size: 20px; letter-spacing: 0.06em; color: var(--text); }

        .cta-section { padding: 18px 20px 0; }
        .save-btn { width: 100%; padding: 16px; background: transparent; border: 1px solid var(--gold-dim); color: var(--gold); font-family: var(--font-dm-mono), monospace; font-size: 10.5px; letter-spacing: 0.25em; text-transform: uppercase; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.2s; text-decoration: none; }
        .save-btn:active { transform: scale(0.98); background: var(--gold-faint); }

        .social-section { padding: 24px 20px 0; }
        .sec-label { font-family: var(--font-dm-mono), monospace; font-size: 8.5px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); margin-bottom: 13px; }
        .social-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 7px; }
        .social-btn { aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; background: var(--s1); border: 0.5px solid var(--border2); text-decoration: none; color: var(--muted2); transition: all 0.2s; padding: 8px 4px; }
        .social-btn:active { border-color: var(--gold-dim); color: var(--gold); background: var(--gold-faint); }
        .s-icon { display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; }
        .s-lbl { font-family: var(--font-dm-mono), monospace; font-size: 7.5px; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.65; }

        .contact-section { padding: 24px 20px 0; }
        .contact-list { display: flex; flex-direction: column; gap: 1px; }
        .contact-item { display: flex; align-items: center; gap: 13px; padding: 14px 0; border-bottom: 0.5px solid var(--border); text-decoration: none; color: inherit; transition: padding-left 0.2s; }
        .contact-item:active { padding-left: 4px; background: rgba(255,255,255,0.02); }
        .c-icon-box { width: 36px; height: 36px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--s1); border: 0.5px solid var(--border2); }
        .c-type { font-family: var(--font-dm-mono), monospace; font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); margin-bottom: 2px; }
        .c-val { font-size: 13px; color: var(--text); }
        .c-arr { color: var(--muted); font-size: 12px; opacity: 0.45; margin-left: auto; }

        .reel-divider { padding: 32px 20px 0; display: flex; align-items: center; gap: 14px; }
        .reel-div-line { flex: 1; height: 0.5px; background: linear-gradient(90deg, transparent, var(--border) 50%, transparent); }

        .exp-section { padding: 8px 20px 40px; }
        .exp-list { display: flex; flex-direction: column; }
        .exp-item { padding: 20px 0 20px 16px; border-bottom: 0.5px solid var(--border); position: relative; }
        .exp-item:last-child { border-bottom: none; }
        .exp-dot { position: absolute; left: 0; top: 26px; width: 4px; height: 4px; background: var(--gold); border-radius: 50%; }
        .exp-meta { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 4px; }
        .exp-role { font-family: var(--font-bebas), sans-serif; font-size: 18px; letter-spacing: 0.06em; color: var(--text); line-height: 1; }
        .exp-date { font-family: var(--font-dm-mono), monospace; font-size: 8.5px; letter-spacing: 0.1em; color: var(--muted); white-space: nowrap; margin-left: 8px; }
        .exp-co { font-size: 11.5px; color: var(--gold-dim); letter-spacing: 0.05em; margin-bottom: 6px; }
        .exp-loc { font-family: var(--font-dm-mono), monospace; font-size: 8.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
        .exp-desc { font-size: 12.5px; line-height: 1.75; color: rgba(240,237,230,0.45); font-weight: 300; }

        .filmstrip-footer { width: 100%; height: 42px; background: #0c0c0c; display: flex; align-items: center; overflow: hidden; border-top: 1px solid #1a1a1a; position: relative; }
        .footer-brand { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); font-family: var(--font-dm-mono), monospace; font-size: 8px; letter-spacing: 0.22em; color: #4a4a4a; text-transform: uppercase; white-space: nowrap; pointer-events: none; z-index: 5; background: #0c0c0c; padding: 0 10px; }
      `}</style>

      {/* FILMSTRIP TOP */}
      <div className="filmstrip">
        <div className="filmstrip-track">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="strip-content">
              <div className="film-hole"></div><div className="film-hole"></div>
              <span className="strip-text">{stripText}</span>
              <div className="film-hole"></div><div className="film-hole"></div>
            </div>
          ))}
        </div>
      </div>

      {/* HERO */}
      <div className="hero">
        <div className="hero-bg">
          <Image src={coverUrl} alt="Cover" fill className="hero-img" priority />
        </div>
        <div className="hero-grid"></div>

        <div className="hero-reel-deco">
          <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
            <circle cx="110" cy="110" r="105" stroke="#C9A84C" strokeWidth="2" />
            <circle cx="110" cy="110" r="85" stroke="#C9A84C" strokeWidth="1" />
            <circle cx="110" cy="110" r="28" stroke="#C9A84C" strokeWidth="2" />
            <circle cx="110" cy="110" r="10" fill="#C9A84C" />
            <g stroke="#C9A84C" strokeWidth="1.5">
              <circle cx="110" cy="55" r="12" /><circle cx="155" cy="83" r="12" /><circle cx="155" cy="137" r="12" />
              <circle cx="110" cy="165" r="12" /><circle cx="65" cy="137" r="12" /><circle cx="65" cy="83" r="12" />
            </g>
          </svg>
        </div>

        <div className="hero-vignette"></div>
        <div className="hero-fade"></div>

        <div className="hero-topbar">
          <div className="hero-badge">ID // {profile.id.substring(0, 8).toUpperCase()}</div>
          <div className="clapper-badge">
            <div className="clapper-mini">
              <div className="clapper-arm-mini"></div>
              <div className="clapper-body-mini">
                <div className="clapper-top-mini">
                  <div className="clapper-stripe-mini">
                    <div className="clapper-s"></div><div className="clapper-s"></div><div className="clapper-s"></div><div className="clapper-s"></div><div className="clapper-s"></div>
                  </div>
                </div>
              </div>
            </div>
            <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "8px", letterSpacing: "0.18em", color: "var(--muted)" }}>TAKE 01</span>
          </div>
        </div>

        <div className="hero-bottom">
          <div className="cast-card">
            <div className="profile-wrap">
              <div className="profile-notch"></div>
              <div className="profile-initials">{initials}</div>
              <Image src={avatarUrl} alt={profile.display_name} fill className="profile-img" />
              <div className="profile-corner"></div>
            </div>
            <div className="hero-nameblock">
              <div className="hero-eyebrow">{profile.job_title || "Cast Member"}</div>
              <div className="hero-name">{profile.display_name.toUpperCase()}</div>
              <div className="hero-tagline">{profile.company_name?.toUpperCase() || "INDEPENDENT"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* FILM HOLES DIVIDER */}
      <div className="holes-row">
        <div className="h-spacer"></div>
        <div className="h-hole"></div><div className="h-hole"></div><div className="h-hole"></div>
        <div className="h-hole"></div><div className="h-hole"></div><div className="h-hole"></div>
        <div className="h-spacer"></div>
      </div>

      {/* IDENTITY */}
      <div className="identity">
        <div className="titlecard">
          <div className="titlecard-bar"></div>
          <div className="titlecard-text">Synopsis / Brief</div>
        </div>
        <p className="bio">{profile.bio || "No synopsis provided for this production."}</p>
      </div>

      {/* CTA */}
      <div className="clapper-header">
        <div className="clapper-full">
          <div className="clapper-board">
            <div className="clapper-stick"></div>
            <div className="clapper-board-top">
              <div className="clapper-board-stripe"></div><div className="clapper-board-stripe"></div>
              <div className="clapper-board-stripe"></div><div className="clapper-board-stripe"></div>
              <div className="clapper-board-stripe"></div><div className="clapper-board-stripe"></div>
            </div>
            <div className="clapper-text-area">
              <div className="clapper-line"></div>
              <div className="clapper-line" style={{ marginTop: "2px", width: "60%" }}></div>
              <div className="clapper-line" style={{ marginTop: "2px", width: "80%" }}></div>
            </div>
          </div>
        </div>
        <div className="clapper-label-wrap">
          <div className="clapper-section-label">// Action</div>
          <div className="clapper-section-title">Save Contact</div>
        </div>
      </div>

      <div className="cta-section">
        <a href={`/api/public/vcf/${profile.slug}`} className="save-btn">
          <Download size={14} />
          Download .vcf Card
        </a>
      </div>

      {/* SOCIAL */}
      {sortedLinks.length > 0 && (
        <div className="social-section">
          <div className="sec-label">// Connect / Distribution</div>
          <div className="social-grid">
            {sortedLinks.map((link) => {
              const Icon = platformIcons[link.platform] || ExternalLink;
              return (
                <a key={link.id} href={link.url} className="social-btn" target="_blank" rel="noreferrer">
                  <div className="s-icon"><Icon className="w-4 h-4" /></div>
                  <span className="s-lbl">{link.platform}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* CONTACT */}
      {contacts.length > 0 && (
        <div className="contact-section">
          <div className="sec-label">// Production Details</div>
          <div className="contact-list">
            {contacts.map((item) => {
              const Icon = item.icon;
              return (
                <a key={item.key} href={item.href} className="contact-item">
                  <div className="c-icon-box">
                    <Icon className="w-[15px] h-[15px]" style={{ color: "var(--gold)" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="c-type">{item.label}</div>
                    <div className="c-val">{item.value}</div>
                  </div>
                  <div className="c-arr">›</div>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* EXPERIENCE */}
      {experiences.length > 0 && (
        <div className="exp-section">
          <div className="sec-label">// Credits</div>
          <div className="exp-list">
            {experiences.map((exp) => (
              <div key={exp.id} className="exp-item">
                <div className="exp-dot"></div>
                <div className="exp-meta">
                  <div className="exp-role">{exp.title.toUpperCase()}</div>
                  <div className="exp-date">
                    {exp.start_date?.split("-")[0] || "20XX"} — {exp.is_current ? "PRESENT" : exp.end_date?.split("-")[0] || "20XX"}
                  </div>
                </div>
                <div className="exp-co">{exp.company}</div>
                {exp.location && <div className="exp-loc">{exp.location}</div>}
                {exp.description && <p className="exp-desc">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div style={{ position: "relative", marginTop: "32px" }}>
        <div className="filmstrip-footer">
          <div className="filmstrip-track" style={{ animationDirection: "reverse" }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="strip-content">
                <div className="film-hole"></div><div className="film-hole"></div>
                <span className="strip-text">{stripText}</span>
                <div className="film-hole"></div><div className="film-hole"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-brand">{profile.slug}.nfc</div>
      </div>
    </div>
  );
}
