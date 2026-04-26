"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import QRCode from "qrcode";
import {
  Copy,
  Download,
  LoaderCircle,
  Mail,
  MessageCircle,
  QrCode,
  Share2,
  UserPlus,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function withAlpha(hexColor: string, alphaHex: string) {
  if (!/^#[0-9a-f]{6}$/i.test(hexColor)) {
    return hexColor;
  }

  return `${hexColor}${alphaHex}`;
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-[17px]">
      <path d="M13.57 21v-8.2h2.75l.41-3.2h-3.16V7.56c0-.93.26-1.56 1.59-1.56h1.7V3.14c-.3-.04-1.3-.14-2.47-.14-2.45 0-4.12 1.5-4.12 4.25V9.6H7.5v3.2h2.77V21h3.3z" />
    </svg>
  );
}

function TwitterXIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-[17px]">
      <path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.26l-4.9-6.4L6.45 22H3.33l7.25-8.3L1 2h6.42l4.43 5.85L18.9 2zm-1.1 18h1.73L6.47 3.9H4.61L17.8 20z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-[17px]">
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2 2 0 1 0 5.3 7a2 2 0 0 0-.05-4ZM20.44 13.06c0-3.4-1.81-4.98-4.23-4.98-1.95 0-2.82 1.07-3.31 1.82V8.5H9.53c.05.93 0 11.5 0 11.5h3.37v-6.42c0-.34.02-.68.13-.92.27-.67.88-1.37 1.9-1.37 1.34 0 1.88 1.03 1.88 2.53V20h3.37v-6.94Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-[17px]">
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 6.86A5.14 5.14 0 1 1 6.86 12 5.15 5.15 0 0 1 12 6.86Zm0 1.8A3.34 3.34 0 1 0 15.34 12 3.34 3.34 0 0 0 12 8.66Z" />
    </svg>
  );
}

type ShareOption = {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => Promise<void> | void;
};

type ThemeName =
  | "style-1"
  | "style-2"
  | "style-3"
  | "style-4"
  | "style-5"
  | "style-6"
  | "style-7"
  | "style-8";

function getThemePreset(theme: ThemeName, accentColor: string) {
  const shared = {
    overlay: "bg-black/55 backdrop-blur-[4px]",
    eyebrow: "text-blue-200/72",
    iconSurface: { backgroundColor: withAlpha(accentColor, "18"), color: accentColor },
    modalClass:
      "glass-panel w-full max-w-[24rem] overflow-hidden rounded-[1.75rem] border p-5 text-white shadow-[0_24px_64px_rgba(15,23,42,0.28)]",
    titleClass: "text-xl font-semibold text-white",
    bodyClass: "text-xs leading-5 text-muted",
    closeClass: "border border-white/10 bg-white/6 text-white hover:bg-white/10",
    surfaceClass: "border border-white/10 bg-white/6",
    surfaceText: "text-blue-100/72",
    surfaceTextStyle: undefined as React.CSSProperties | undefined,
    secondaryButtonClass: "border-white/10 bg-white/6 text-white hover:bg-white/10",
    tileClass:
      "border border-white/10 bg-white/6 text-white hover:border-white/20 hover:bg-white/10",
    compactGhost:
      "border border-white/14 bg-[#020817]/52 text-white hover:bg-[#020817]/66",
    compactAccentClass:
      "text-white",
    compactAccentStyle: {
      backgroundColor: withAlpha(accentColor, "d9"),
      boxShadow: `0 10px 24px ${withAlpha(accentColor, "45")}`,
    },
    connectButtonClass:
      "inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/6 px-3.5 text-[10px] font-medium text-white transition hover:bg-white/10 sm:text-[11px]",
    modalStyle: undefined as React.CSSProperties | undefined,
    eyebrowStyle: undefined as React.CSSProperties | undefined,
    closeStyle: undefined as React.CSSProperties | undefined,
    surfaceStyle: undefined as React.CSSProperties | undefined,
    secondaryButtonStyle: undefined as React.CSSProperties | undefined,
    tileStyle: undefined as React.CSSProperties | undefined,
    compactGhostStyle: undefined as React.CSSProperties | undefined,
    connectButtonStyle: undefined as React.CSSProperties | undefined,
  };

  if (theme === "style-2") {
    return {
      ...shared,
      modalClass:
        "w-full max-w-[24rem] overflow-hidden rounded-[0.5rem] border bg-[#101319] p-5 font-mono text-[#d7e2d6] shadow-[0_24px_64px_rgba(0,0,0,0.45)]",
      modalStyle: {
        borderColor: withAlpha(accentColor, "45"),
      },
      eyebrow: "text-white/75",
      eyebrowStyle: { color: accentColor },
      titleClass: "text-xl font-semibold text-white",
      bodyClass: "text-xs leading-5 text-slate-300/70",
      closeClass: "border bg-[#0e1117] transition hover:bg-[#151b24]",
      closeStyle: {
        borderColor: withAlpha(accentColor, "45"),
        color: accentColor,
      },
      surfaceClass: "border bg-[#0e1117]",
      surfaceStyle: {
        borderColor: withAlpha(accentColor, "3b"),
      },
      surfaceText: "text-white/75",
      surfaceTextStyle: {
        color: withAlpha(accentColor, "d0"),
      },
      secondaryButtonClass: "border bg-[#0e1117] transition hover:bg-[#151b24]",
      secondaryButtonStyle: {
        borderColor: withAlpha(accentColor, "45"),
        color: accentColor,
      },
      tileClass: "border bg-[#0e1117] text-[#d7e2d6] transition hover:bg-[#151b24]",
      tileStyle: {
        borderColor: withAlpha(accentColor, "30"),
      },
      compactGhost: "border bg-[#0e1117]/88 transition hover:bg-[#151b24]",
      compactGhostStyle: {
        borderColor: withAlpha(accentColor, "45"),
        color: accentColor,
      },
      compactAccentClass: "text-white",
      compactAccentStyle: {
        backgroundColor: "#0e1117",
        boxShadow: `0 10px 24px ${withAlpha(accentColor, "35")}`,
        border: `1px solid ${withAlpha(accentColor, "40")}`,
      },
      connectButtonClass:
        "inline-flex h-[46px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-[5px] border bg-[#0e1117] px-3 text-[12px] font-medium tracking-[0.04em] transition hover:bg-[#151b24]",
      connectButtonStyle: {
        borderColor: withAlpha(accentColor, "45"),
        color: accentColor,
      },
    };
  }

  if (theme === "style-3") {
    return {
      ...shared,
      modalClass:
        "w-full max-w-[24rem] overflow-hidden rounded-[1.75rem] border border-[rgba(139,92,246,0.22)] bg-[#14141f]/96 p-5 text-[#f0eeff] shadow-[0_24px_64px_rgba(7,7,18,0.55)]",
      eyebrow: "text-[var(--accent2,#c4b5fd)]",
      titleClass: "text-xl font-semibold text-[#f6f0ff]",
      bodyClass: "text-xs leading-5 text-[#b2a8d8]",
      closeClass: "border border-white/10 bg-white/5 text-white hover:bg-white/10",
      surfaceClass: "border border-[rgba(139,92,246,0.22)] bg-[#1b1b28]",
      surfaceText: "text-[#d3caef]",
      secondaryButtonClass: "border-white/10 bg-white/6 text-white hover:bg-white/10",
      tileClass:
        "border border-white/10 bg-white/6 text-white hover:border-white/20 hover:bg-white/10",
      compactGhost:
        "border border-white/10 bg-[#14141f]/82 text-white hover:bg-[#1b1b28]",
      compactAccentClass: "text-white",
      compactAccentStyle: {
        backgroundImage: `linear-gradient(135deg, ${accentColor} 0%, ${withAlpha(accentColor, "cc")} 100%)`,
        boxShadow: `0 10px 24px ${withAlpha(accentColor, "35")}`,
      },
      connectButtonClass:
        "inline-flex h-[52px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[rgba(139,92,246,0.2)] bg-[#1b1b28] px-5 text-[12px] font-semibold text-[#f6f0ff] transition hover:bg-[#232336]",
    };
  }

  if (theme === "style-4") {
    return {
      ...shared,
      overlay: "bg-[#0f1d34]/38 backdrop-blur-[2px]",
      modalClass:
        "w-full max-w-[24rem] overflow-hidden rounded-[1.1rem] border border-[#d7dfec] bg-white p-5 text-[#0f1d34] shadow-[0_24px_64px_rgba(15,29,52,0.18)]",
      eyebrow: "text-[#7a889f]",
      titleClass: "text-xl font-semibold text-[#0f1f3a]",
      bodyClass: "text-xs leading-5 text-[#5f7090]",
      closeClass:
        "border border-[#d7dfec] bg-[#f7f9fc] text-[#0f1f3a] hover:bg-[#eef3f9]",
      surfaceClass: "border border-[#d7dfec] bg-[#f7f9fc]",
      surfaceText: "text-[#42526b]",
      secondaryButtonClass:
        "border-[#d7dfec] bg-[#f7f9fc] text-[#0f1f3a] hover:bg-[#eef3f9]",
      tileClass:
        "border border-[#d7dfec] bg-white text-[#0f1f3a] hover:border-[#c4cfdf] hover:bg-[#f7f9fc]",
      compactGhost:
        "border border-white/45 bg-white/88 text-[#0f1f3a] hover:bg-white",
      compactAccentClass: "text-[#0f1f3a]",
      compactAccentStyle: {
        backgroundColor: "white",
        color: accentColor,
        border: `1px solid ${accentColor}`,
        boxShadow: `0 10px 24px ${withAlpha(accentColor, "18")}`,
      },
      connectButtonClass:
        "inline-flex h-[46px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-[8px] border border-[#d7dfec] bg-white px-4 text-sm font-medium text-[#0f1f3a] transition hover:bg-[#f7f9fc]",
    };
  }

  if (theme === "style-5") {
    return {
      ...shared,
      overlay: "bg-black/45 backdrop-blur-[1px]",
      modalClass:
        "w-full max-w-[24rem] overflow-hidden rounded-none border-[3px] border-black bg-[#f5f0e8] p-5 text-black shadow-[6px_6px_0_#000]",
      eyebrow: "text-black/60",
      titleClass: "text-xl font-bold text-black",
      bodyClass: "text-xs leading-5 text-black/70",
      closeClass:
        "border-[2px] border-black bg-white text-black hover:bg-[#ffe000]",
      surfaceClass: "border-[3px] border-black bg-white",
      surfaceText: "text-black/70",
      secondaryButtonClass:
        "border-[3px] border-black bg-white text-black hover:bg-[#ffe000]",
      tileClass:
        "border-[3px] border-black bg-white text-black hover:bg-[#ffe000]",
      compactGhost:
        "border-[2px] border-black bg-white text-black hover:bg-[#ffe000]",
      compactAccentClass: "text-white",
      compactAccentStyle: {
        backgroundColor: "#ff3b3b",
        color: "white",
        border: "2px solid black",
        boxShadow: "3px 3px 0 #000",
      },
      connectButtonClass:
        "inline-flex h-[62px] w-full items-center justify-center gap-2 whitespace-nowrap border-[3px] border-black bg-[#1B66FF] px-4 text-[13px] font-bold uppercase tracking-[0.12em] text-white shadow-[3px_3px_0_#000] transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_#000]",
    };
  }

  if (theme === "style-6") {
    return {
      ...shared,
      modalClass:
        "w-full max-w-[24rem] overflow-hidden rounded-[0.35rem] border border-emerald-400/25 bg-[#111211] p-5 font-mono text-[#d7e2d6] shadow-[0_24px_64px_rgba(0,0,0,0.45)]",
      eyebrow: "text-emerald-400/75",
      titleClass: "text-xl font-semibold text-[#e8f4e8]",
      bodyClass: "text-xs leading-5 text-[#8ea38d]",
      closeClass:
        "border border-emerald-400/20 bg-[#0d1a12] text-emerald-300 hover:bg-[#122018]",
      surfaceClass: "border border-emerald-400/20 bg-[#0d1a12]",
      surfaceText: "text-emerald-200/80",
      secondaryButtonClass:
        "border-emerald-400/25 bg-[#0d1a12] text-emerald-300 hover:bg-[#122018]",
      tileClass:
        "border border-emerald-400/16 bg-[#0d1a12] text-[#d7e2d6] hover:border-emerald-400/28 hover:bg-[#122018]",
      compactGhost:
        "border border-emerald-400/25 bg-[#0d1a12]/85 text-emerald-300 hover:bg-[#122018]",
      compactAccentClass: "text-emerald-300",
      compactAccentStyle: {
        backgroundColor: "#0d1a12",
        boxShadow: `0 10px 24px ${withAlpha(accentColor, "35")}`,
        border: `1px solid ${withAlpha(accentColor, "40")}`,
      },
      connectButtonClass:
        "inline-flex h-[36px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-[3px] border border-emerald-400/30 bg-[#0d1a12] px-3 text-[11px] tracking-[0.03em] text-emerald-300 transition hover:bg-[#122018]",
    };
  }

  if (theme === "style-7") {
    return {
      ...shared,
      modalClass:
        "w-full max-w-[24rem] overflow-hidden rounded-[1rem] border border-cyan-400/20 bg-[#07111f]/96 p-5 text-[#e8f4ff] shadow-[0_24px_64px_rgba(0,0,0,0.45)]",
      eyebrow: "text-cyan-300/75",
      titleClass: "text-xl font-semibold text-[#e8f4ff]",
      bodyClass: "text-xs leading-5 text-[#7ba8cc]",
      closeClass:
        "border border-cyan-400/18 bg-[#0a1628] text-cyan-200 hover:bg-[#10213a]",
      surfaceClass: "border border-cyan-400/16 bg-[#0a1628]",
      surfaceText: "text-cyan-100/80",
      secondaryButtonClass:
        "border-cyan-400/16 bg-[#0a1628] text-cyan-100 hover:bg-[#10213a]",
      tileClass:
        "border border-cyan-400/16 bg-[#0a1628] text-cyan-100 hover:border-cyan-300/28 hover:bg-[#10213a]",
      compactGhost:
        "border border-cyan-400/18 bg-[#07111f]/88 text-cyan-100 hover:bg-[#10213a]",
      compactAccentClass: "text-cyan-100",
      compactAccentStyle: {
        backgroundImage: `linear-gradient(135deg, ${withAlpha(accentColor, "dd")} 0%, #0a1628 100%)`,
        boxShadow: `0 10px 24px ${withAlpha(accentColor, "35")}`,
        border: `1px solid ${withAlpha(accentColor, "40")}`,
      },
      connectButtonClass:
        "inline-flex h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-[4px] border border-cyan-400/25 bg-[#0a1628] px-4 text-[12px] font-medium tracking-[0.16em] text-cyan-100 transition hover:bg-[#10213a]",
    };
  }

  if (theme === "style-8") {
    return {
      ...shared,
      modalClass:
        "w-full max-w-[24rem] overflow-hidden border border-[#8A6F30] bg-[#080808]/97 p-5 text-[#F0EDE6] shadow-[0_24px_64px_rgba(0,0,0,0.45)]",
      eyebrow: "text-[#C9A84C]/78",
      titleClass: "text-xl font-semibold text-[#F0EDE6]",
      bodyClass: "text-xs leading-5 text-[#9A958E]",
      closeClass:
        "border border-[#8A6F30] bg-[#101010] text-[#C9A84C] hover:bg-[#161616]",
      surfaceClass: "border border-[#8A6F30] bg-[#101010]",
      surfaceText: "text-[#d6d0c7]",
      secondaryButtonClass:
        "border-[#8A6F30] bg-[#101010] text-[#C9A84C] hover:bg-[#161616]",
      tileClass:
        "border border-[#8A6F30] bg-[#101010] text-[#F0EDE6] hover:border-[#C9A84C] hover:bg-[#161616]",
      compactGhost:
        "border border-[#8A6F30] bg-black/78 text-[#F0EDE6] hover:bg-[#161616]",
      compactAccentClass: "text-[#C9A84C]",
      compactAccentStyle: {
        backgroundColor: "#101010",
        color: "#C9A84C",
        border: "1px solid #8A6F30",
        boxShadow: "0 10px 24px rgba(201,168,76,0.18)",
      },
      connectButtonClass:
        "inline-flex h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap border border-[#8A6F30] bg-[#101010] px-4 text-[10.5px] uppercase tracking-[0.24em] text-[#C9A84C] transition hover:bg-[#161616]",
    };
  }

  return shared;
}

export function ProfileActionSuite({
  profileUrl,
  profileName,
  accentColor,
  compact = false,
  connectOnly = false,
  theme = "style-1",
  connectClassName,
}: {
  profileUrl: string;
  profileName: string;
  accentColor: string;
  compact?: boolean;
  connectOnly?: boolean;
  theme?: ThemeName;
  connectClassName?: string;
}) {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [connectName, setConnectName] = useState("");
  const [connectPhone, setConnectPhone] = useState("");
  const [connectEmail, setConnectEmail] = useState("");
  const [isSubmittingConnect, setIsSubmittingConnect] = useState(false);
  const [connectMessage, setConnectMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function generateQrCode() {
      const dataUrl = await QRCode.toDataURL(profileUrl, {
        errorCorrectionLevel: "H",
        margin: 1,
        width: 720,
        color: {
          dark: "#0b1728",
          light: "#ffffff",
        },
      });

      if (!cancelled) {
        setQrDataUrl(dataUrl);
      }
    }

    void generateQrCode();

    return () => {
      cancelled = true;
    };
  }, [profileUrl]);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const shareText = `Connect with ${profileName} on Identidy`;

  const shareOptions = useMemo<ShareOption[]>(
    () => [
      {
        id: "whatsapp",
        label: "WhatsApp",
        icon: <MessageCircle className="size-[17px]" />,
        onClick: () => {
          window.open(
            `https://wa.me/?text=${encodeURIComponent(`${shareText} ${profileUrl}`)}`,
            "_blank",
            "noopener,noreferrer",
          );
        },
      },
      {
        id: "facebook",
        label: "Facebook",
        icon: <FacebookIcon />,
        onClick: () => {
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`,
            "_blank",
            "noopener,noreferrer",
          );
        },
      },
      {
        id: "twitter",
        label: "Twitter / X",
        icon: <TwitterXIcon />,
        onClick: () => {
          window.open(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(profileUrl)}&text=${encodeURIComponent(shareText)}`,
            "_blank",
            "noopener,noreferrer",
          );
        },
      },
      {
        id: "instagram",
        label: "Instagram",
        icon: <InstagramIcon />,
        onClick: async () => {
          await navigator.clipboard.writeText(profileUrl);
          setCopied(true);
          setShareMessage(
            "Instagram does not support direct web sharing, so the profile URL was copied for you.",
          );
          window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        icon: <LinkedinIcon />,
        onClick: () => {
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`,
            "_blank",
            "noopener,noreferrer",
          );
        },
      },
      {
        id: "gmail",
        label: "Gmail",
        icon: <Mail className="size-[17px]" />,
        onClick: () => {
          window.open(
            `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(shareText)}&body=${encodeURIComponent(profileUrl)}`,
            "_blank",
            "noopener,noreferrer",
          );
        },
      },
    ],
    [profileUrl, shareText],
  );

  async function copyProfileUrl() {
    await navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setShareMessage("Profile URL copied to your clipboard.");
  }

  function downloadQrCode() {
    if (!qrDataUrl) {
      return;
    }

    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `${profileName.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "profile"}-qr.png`;
    link.click();
  }

  const actionShadow = `0 16px 40px ${withAlpha(accentColor, "59")}`;
  const accentBorder = withAlpha(accentColor, "45");
  const accentSurface = withAlpha(accentColor, "18");
  const themePreset = getThemePreset(theme, accentColor);

  async function submitConnectRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setConnectMessage(null);
    setIsSubmittingConnect(true);

    try {
      const response = await fetch("/api/public/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: new URL(profileUrl).pathname.replace(/^\/+/, ""),
          name: connectName,
          phone: connectPhone,
          email: connectEmail,
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setConnectMessage({
          type: "error",
          text: payload.error ?? "Unable to send the connection request.",
        });
        return;
      }

      setConnectMessage({
        type: "success",
        text: "Connection request sent successfully.",
      });
      setConnectName("");
      setConnectPhone("");
      setConnectEmail("");
    } catch {
      setConnectMessage({
        type: "error",
        text: "Unable to send the connection request right now.",
      });
    } finally {
      setIsSubmittingConnect(false);
    }
  }

  const qrModal = isQrOpen ? (
    <div className={cn("fixed inset-0 z-[100] flex min-h-screen items-center justify-center px-4 py-6", themePreset.overlay)}>
      <div
        className={cn("relative", themePreset.modalClass, "max-w-[22rem]")}
        style={themePreset.modalStyle}
      >
        <button
          type="button"
          onClick={() => setIsQrOpen(false)}
          aria-label="Close QR modal"
          className={cn("absolute right-4 top-4 flex size-10 items-center justify-center rounded-full transition", themePreset.closeClass)}
          style={themePreset.closeStyle}
        >
          <X className="size-4" />
        </button>

        <p
          className={cn("text-xs font-medium uppercase tracking-[0.28em]", themePreset.eyebrow)}
          style={themePreset.eyebrowStyle}
        >
          Scan QR
        </p>
        <h2 className={cn("mt-2.5", themePreset.titleClass)}>QR Code</h2>
        <p className={cn("mt-2", themePreset.bodyClass)}>
          Scan to open this profile instantly.
        </p>

        <div
          className={cn("mt-5 rounded-[1.5rem] p-3.5", themePreset.surfaceClass)}
          style={themePreset.surfaceStyle}
        >
          <div className="mx-auto w-fit rounded-[1.2rem] bg-white p-3 shadow-[0_20px_50px_rgba(15,23,42,0.28)]">
            {qrDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrDataUrl}
                alt={`${profileName} QR code`}
                className="block aspect-square size-[196px] rounded-xl"
              />
            ) : (
              <div className="flex size-[196px] items-center justify-center rounded-xl bg-slate-100 text-xs text-slate-500">
                Generating QR...
              </div>
            )}
          </div>
        </div>

        <p
          className={cn("mt-3.5 break-all text-center text-[11px] leading-5", themePreset.surfaceText)}
          style={themePreset.surfaceTextStyle}
        >
          {profileUrl}
        </p>

        <div className="mt-6">
          <Button
            type="button"
            className="w-full"
            style={{
              backgroundColor: accentColor,
              boxShadow: actionShadow,
            }}
            onClick={downloadQrCode}
          >
            <Download className="size-4" />
            Download QR
          </Button>
        </div>
      </div>
    </div>
  ) : null;

  const shareModal = isShareOpen ? (
    <div className={cn("fixed inset-0 z-[100] flex min-h-screen items-center justify-center px-4 py-6", themePreset.overlay)}>
      <div
        className={cn("relative", themePreset.modalClass)}
        style={themePreset.modalStyle}
      >
        <button
          type="button"
          onClick={() => setIsShareOpen(false)}
          aria-label="Close share modal"
          className={cn("absolute right-4 top-4 flex size-10 items-center justify-center rounded-full transition", themePreset.closeClass)}
          style={themePreset.closeStyle}
        >
          <X className="size-4" />
        </button>

        <p
          className={cn("text-xs font-medium uppercase tracking-[0.28em]", themePreset.eyebrow)}
          style={themePreset.eyebrowStyle}
        >
          Share
        </p>
        <h2 className={cn("mt-2.5", themePreset.titleClass)}>Share Profile</h2>
        <p className={cn("mt-2", themePreset.bodyClass)}>
          Send this profile URL to your audience on social and email channels.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {shareOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => void option.onClick()}
              className={cn("flex min-h-[84px] flex-col items-center justify-center gap-1.5 rounded-[1.15rem] px-2.5 py-3 text-center text-[9px] font-medium transition", themePreset.tileClass)}
              style={themePreset.tileStyle}
            >
              <span
                className="flex size-[33px] items-center justify-center rounded-full"
                style={themePreset.iconSurface}
              >
                {option.icon}
              </span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>

        <div
          className={cn("mt-4 rounded-[1.15rem] px-3.5 py-3", themePreset.surfaceClass)}
          style={themePreset.surfaceStyle}
        >
          <div className="flex items-center justify-between gap-3">
            <p className={cn("min-w-0 truncate text-xs", themePreset.surfaceText)} style={themePreset.surfaceTextStyle}>
              {profileUrl}
            </p>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className={themePreset.secondaryButtonClass}
              style={themePreset.secondaryButtonStyle}
              onClick={() => void copyProfileUrl()}
            >
              <Copy className="size-4" />
              Copy
            </Button>
          </div>
          {shareMessage ? (
            <p className={cn("mt-2 text-[11px] leading-5", themePreset.surfaceText)} style={themePreset.surfaceTextStyle}>
              {shareMessage}
            </p>
          ) : copied ? (
            <p className={cn("mt-2 text-[11px] leading-5", themePreset.surfaceText)} style={themePreset.surfaceTextStyle}>
              Profile URL copied to your clipboard.
            </p>
          ) : null}
        </div>

      </div>
    </div>
  ) : null;

  const connectModal = isConnectOpen ? (
    <div className={cn("fixed inset-0 z-[100] flex min-h-screen items-center justify-center px-4 py-6", themePreset.overlay)}>
      <div
        className={cn("relative", themePreset.modalClass)}
        style={themePreset.modalStyle}
      >
        <button
          type="button"
          onClick={() => setIsConnectOpen(false)}
          aria-label="Close connect modal"
          className={cn("absolute right-4 top-4 flex size-10 items-center justify-center rounded-full transition", themePreset.closeClass)}
          style={themePreset.closeStyle}
        >
          <X className="size-4" />
        </button>

        <p
          className={cn("text-xs font-medium uppercase tracking-[0.28em]", themePreset.eyebrow)}
          style={themePreset.eyebrowStyle}
        >
          Connect
        </p>
        <h2 className={cn("mt-2.5", themePreset.titleClass)}>Share your contact</h2>
        <p className={cn("mt-2", themePreset.bodyClass)}>
          Send your details so the profile owner can follow up from their dashboard.
        </p>

        <form className="mt-5 space-y-3" onSubmit={(event) => void submitConnectRequest(event)}>
          <div className="space-y-2">
            <label
              className={cn(
                "text-xs",
                theme === "style-4" || theme === "style-5" ? "text-slate-700" : "text-blue-50/82",
              )}
              htmlFor="connect-name"
            >
              Name
            </label>
            <input
              id="connect-name"
              value={connectName}
              onChange={(event) => setConnectName(event.target.value)}
              required
              className={cn(
                "input-base",
                theme === "style-4" || theme === "style-5"
                  ? "bg-white !text-slate-900 !placeholder:text-slate-500"
                  : "",
              )}
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <label
              className={cn(
                "text-xs",
                theme === "style-4" || theme === "style-5" ? "text-slate-700" : "text-blue-50/82",
              )}
              htmlFor="connect-phone"
            >
              Mobile number
            </label>
            <input
              id="connect-phone"
              value={connectPhone}
              onChange={(event) => setConnectPhone(event.target.value)}
              required
              className={cn(
                "input-base",
                theme === "style-4" || theme === "style-5"
                  ? "bg-white !text-slate-900 !placeholder:text-slate-500"
                  : "",
              )}
              placeholder="Mobile number"
            />
          </div>
          <div className="space-y-2">
            <label
              className={cn(
                "text-xs",
                theme === "style-4" || theme === "style-5" ? "text-slate-700" : "text-blue-50/82",
              )}
              htmlFor="connect-email"
            >
              Email (Optional)
            </label>
            <input
              id="connect-email"
              value={connectEmail}
              onChange={(event) => setConnectEmail(event.target.value)}
              type="email"
              className={cn(
                "input-base",
                theme === "style-4" || theme === "style-5"
                  ? "bg-white !text-slate-900 !placeholder:text-slate-500"
                  : "",
              )}
              placeholder="Email address"
            />
          </div>

          {connectMessage ? (
            <p
              className={`text-xs leading-5 ${
                connectMessage.type === "error" ? "text-red-300" : "text-emerald-300"
              }`}
            >
              {connectMessage.text}
            </p>
          ) : null}

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmittingConnect}
            style={{
              backgroundColor: accentColor,
              boxShadow: actionShadow,
            }}
          >
            {isSubmittingConnect ? (
              <>
                <LoaderCircle className="size-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <UserPlus className="size-4" />
                Send connect request
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div
        className={cn(
          "gap-3",
          connectOnly
            ? "grid grid-cols-1"
            : compact
              ? "grid w-full grid-cols-2"
              : "mt-4 grid grid-cols-3",
        )}
      >
        {connectOnly ? (
          <button
            type="button"
            className={cn(themePreset.connectButtonClass, connectClassName)}
            style={themePreset.connectButtonStyle}
            onClick={() => {
              setConnectMessage(null);
              setIsConnectOpen(true);
            }}
          >
            <UserPlus className="size-[15px] shrink-0" />
            Connect
          </button>
        ) : compact ? (
          <>
            <button
              type="button"
              onClick={() => setIsQrOpen(true)}
              aria-label="Open QR code"
              title="QR code"
              className={cn("inline-flex size-10 items-center justify-center self-start rounded-full backdrop-blur-[8px] transition", themePreset.compactGhost)}
              style={themePreset.compactGhostStyle}
            >
              <QrCode className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setShareMessage("");
                setIsShareOpen(true);
              }}
              aria-label="Open share options"
              title="Share profile"
              className={cn(
                "justify-self-end inline-flex size-10 items-center justify-center self-start rounded-full transition",
                themePreset.compactAccentClass,
              )}
              style={themePreset.compactAccentStyle}
            >
              <Share2 className="size-4" />
            </button>
          </>
        ) : (
          <>
            <Button
              type="button"
              variant="secondary"
              className={cn("w-full", themePreset.secondaryButtonClass)}
              onClick={() => setIsQrOpen(true)}
            >
              <QrCode className="size-4" />
              QR
            </Button>
            <Button
              type="button"
              variant="secondary"
              className={cn("w-full", themePreset.secondaryButtonClass)}
              onClick={() => {
                setConnectMessage(null);
                setIsConnectOpen(true);
              }}
            >
              <UserPlus className="size-4" />
              Connect
            </Button>
            <Button
              type="button"
              className="w-full"
              style={{
                backgroundColor: accentColor,
                boxShadow: actionShadow,
              }}
              onClick={() => {
                setShareMessage("");
                setIsShareOpen(true);
              }}
            >
              <Share2 className="size-4" />
              Share
            </Button>
          </>
        )}
      </div>

      {isMounted ? createPortal(qrModal, document.body) : null}
      {isMounted ? createPortal(connectModal, document.body) : null}
      {isMounted ? createPortal(shareModal, document.body) : null}
    </>
  );
}

export const Style1ProfileActions = ProfileActionSuite;
