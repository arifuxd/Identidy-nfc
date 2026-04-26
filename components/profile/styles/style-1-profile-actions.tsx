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
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-5">
      <path d="M13.57 21v-8.2h2.75l.41-3.2h-3.16V7.56c0-.93.26-1.56 1.59-1.56h1.7V3.14c-.3-.04-1.3-.14-2.47-.14-2.45 0-4.12 1.5-4.12 4.25V9.6H7.5v3.2h2.77V21h3.3z" />
    </svg>
  );
}

function TwitterXIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-5">
      <path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.26l-4.9-6.4L6.45 22H3.33l7.25-8.3L1 2h6.42l4.43 5.85L18.9 2zm-1.1 18h1.73L6.47 3.9H4.61L17.8 20z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-5">
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2 2 0 1 0 5.3 7a2 2 0 0 0-.05-4ZM20.44 13.06c0-3.4-1.81-4.98-4.23-4.98-1.95 0-2.82 1.07-3.31 1.82V8.5H9.53c.05.93 0 11.5 0 11.5h3.37v-6.42c0-.34.02-.68.13-.92.27-.67.88-1.37 1.9-1.37 1.34 0 1.88 1.03 1.88 2.53V20h3.37v-6.94Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-5">
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

export function Style1ProfileActions({
  profileUrl,
  profileName,
  accentColor,
  compact = false,
  connectOnly = false,
}: {
  profileUrl: string;
  profileName: string;
  accentColor: string;
  compact?: boolean;
  connectOnly?: boolean;
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
        icon: <MessageCircle className="size-5" />,
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
        icon: <Mail className="size-5" />,
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
    <div className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-[#020817]/62 px-4 py-6 backdrop-blur-[6px]">
      <div
        className="glass-panel relative w-full max-w-[22rem] overflow-hidden rounded-[1.75rem] border p-5"
        style={{ borderColor: accentBorder, boxShadow: `0 24px 64px ${withAlpha(accentColor, "30")}` }}
      >
        <button
          type="button"
          onClick={() => setIsQrOpen(false)}
          aria-label="Close QR modal"
          className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white transition hover:bg-white/10"
        >
          <X className="size-4" />
        </button>

        <p className="text-xs font-medium uppercase tracking-[0.28em] text-blue-200/72">
          Scan QR
        </p>
        <h2 className="mt-2.5 text-xl font-semibold text-white">QR Code</h2>
        <p className="mt-2 text-xs leading-5 text-muted">
          Scan to open this profile instantly.
        </p>

        <div
          className="mt-5 rounded-[1.5rem] border p-3.5"
          style={{ borderColor: accentBorder, backgroundColor: accentSurface }}
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

        <p className="mt-3.5 break-all text-center text-[11px] leading-5 text-blue-100/70">
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
    <div className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-[#020817]/62 px-4 py-6 backdrop-blur-[6px]">
      <div
        className="glass-panel relative w-full max-w-[24rem] overflow-hidden rounded-[1.75rem] border p-5"
        style={{ borderColor: accentBorder, boxShadow: `0 24px 64px ${withAlpha(accentColor, "30")}` }}
      >
        <button
          type="button"
          onClick={() => setIsShareOpen(false)}
          aria-label="Close share modal"
          className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white transition hover:bg-white/10"
        >
          <X className="size-4" />
        </button>

        <p className="text-xs font-medium uppercase tracking-[0.28em] text-blue-200/72">
          Share
        </p>
        <h2 className="mt-2.5 text-xl font-semibold text-white">Share Profile</h2>
        <p className="mt-2 text-xs leading-5 text-muted">
          Send this profile URL to your audience on social and email channels.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {shareOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => void option.onClick()}
              className="flex min-h-[84px] flex-col items-center justify-center gap-1.5 rounded-[1.15rem] border border-white/10 bg-white/6 px-2.5 py-3 text-center text-xs font-medium text-white transition hover:border-white/20 hover:bg-white/10"
            >
              <span
                className="flex size-9 items-center justify-center rounded-full"
                style={{ backgroundColor: accentSurface, color: accentColor }}
              >
                {option.icon}
              </span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>

        <div
          className="mt-4 rounded-[1.15rem] border px-3.5 py-3"
          style={{ borderColor: accentBorder, backgroundColor: accentSurface }}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="min-w-0 truncate text-xs text-white">{profileUrl}</p>
            <Button type="button" variant="secondary" size="sm" onClick={() => void copyProfileUrl()}>
              <Copy className="size-4" />
              Copy
            </Button>
          </div>
          {shareMessage ? (
            <p className="mt-2 text-[11px] leading-5 text-blue-100/72">{shareMessage}</p>
          ) : copied ? (
            <p className="mt-2 text-[11px] leading-5 text-blue-100/72">
              Profile URL copied to your clipboard.
            </p>
          ) : null}
        </div>

      </div>
    </div>
  ) : null;

  const connectModal = isConnectOpen ? (
    <div className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-[#020817]/62 px-4 py-6 backdrop-blur-[6px]">
      <div
        className="glass-panel relative w-full max-w-[24rem] overflow-hidden rounded-[1.75rem] border p-5"
        style={{ borderColor: accentBorder, boxShadow: `0 24px 64px ${withAlpha(accentColor, "30")}` }}
      >
        <button
          type="button"
          onClick={() => setIsConnectOpen(false)}
          aria-label="Close connect modal"
          className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white transition hover:bg-white/10"
        >
          <X className="size-4" />
        </button>

        <p className="text-xs font-medium uppercase tracking-[0.28em] text-blue-200/72">
          Connect
        </p>
        <h2 className="mt-2.5 text-xl font-semibold text-white">Share your contact</h2>
        <p className="mt-2 text-xs leading-5 text-muted">
          Send your details so the profile owner can follow up from their dashboard.
        </p>

        <form className="mt-5 space-y-3" onSubmit={(event) => void submitConnectRequest(event)}>
          <div className="space-y-2">
            <label className="text-xs text-blue-50/82" htmlFor="connect-name">
              Name
            </label>
            <input
              id="connect-name"
              value={connectName}
              onChange={(event) => setConnectName(event.target.value)}
              required
              className="input-base"
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-blue-50/82" htmlFor="connect-phone">
              Mobile number
            </label>
            <input
              id="connect-phone"
              value={connectPhone}
              onChange={(event) => setConnectPhone(event.target.value)}
              required
              className="input-base"
              placeholder="Mobile number"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-blue-50/82" htmlFor="connect-email">
              Email (Optional)
            </label>
            <input
              id="connect-email"
              value={connectEmail}
              onChange={(event) => setConnectEmail(event.target.value)}
              type="email"
              className="input-base"
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
          <Button
            type="button"
            variant="secondary"
            className="h-10 w-full whitespace-nowrap border-white/10 bg-white/6 px-3 text-[10px] sm:text-[11px]"
            onClick={() => {
              setConnectMessage(null);
              setIsConnectOpen(true);
            }}
          >
            <UserPlus className="size-[15px] shrink-0" />
            Connect
          </Button>
        ) : compact ? (
          <>
            <button
              type="button"
              onClick={() => setIsQrOpen(true)}
              aria-label="Open QR code"
              title="QR code"
              className="inline-flex size-10 items-center justify-center self-start rounded-full border border-white/14 bg-[#020817]/52 text-white backdrop-blur-[8px] transition hover:bg-[#020817]/66"
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
              className="justify-self-end inline-flex size-10 items-center justify-center self-start rounded-full text-white transition"
              style={{
                backgroundColor: withAlpha(accentColor, "d9"),
                boxShadow: `0 10px 24px ${withAlpha(accentColor, "45")}`,
              }}
            >
              <Share2 className="size-4" />
            </button>
          </>
        ) : (
          <>
            <Button
              type="button"
              variant="secondary"
              className="w-full border-white/10 bg-white/6"
              onClick={() => setIsQrOpen(true)}
            >
              <QrCode className="size-4" />
              QR
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="w-full border-white/10 bg-white/6"
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
