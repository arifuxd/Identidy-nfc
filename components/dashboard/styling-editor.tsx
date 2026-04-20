"use client";

import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { saveProfileStylingAction } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DEFAULT_AVATAR, DEFAULT_COVER, PROFILE_ACCENT_OPTIONS } from "@/lib/constants";
import {
  PROFILE_STYLE_DEFINITIONS,
  PROFILE_STYLE_OPTIONS,
  type ProfileStyleId,
} from "@/lib/profile-styles";
import {
  profileStylingSchema,
  type ProfileStylingInput,
  type ProfileStylingValues,
} from "@/lib/validations/profile";
import type { Database } from "@/types/database";

interface StylingEditorProps {
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}

function withAlpha(hexColor: string, alphaHex: string) {
  if (!/^#[0-9a-f]{6}$/i.test(hexColor)) {
    return hexColor;
  }

  return `${hexColor}${alphaHex}`;
}

const ACCENT_LABELS: Record<string, string> = {
  "#3b82f6": "Blue",
  "#ef4444": "Red",
  "#10b981": "Emerald",
  "#f59e0b": "Amber",
  "#8b5cf6": "Violet",
  "#ec4899": "Pink",
};

/* ------------------------------------------------------------------ */
/*  Style-specific mini preview renderers                             */
/* ------------------------------------------------------------------ */

function PreviewStyle1({ coverUrl, avatarUrl, accentColor, profile }: {
  coverUrl: string; avatarUrl: string; accentColor: string;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0c1729]">
      <div className="h-28 w-full bg-cover bg-center" style={{ backgroundImage: `url(${coverUrl})` }} />
      <div className="p-4">
        <div className="-mt-12 flex justify-center">
          <div className="size-24 rounded-full border-4 border-[#0c1729] bg-cover bg-center" style={{ backgroundImage: `url(${avatarUrl})` }} />
        </div>
        <div className="mt-4 text-center">
          {(profile.job_title || profile.company_name) && (
            <p className="text-sm text-blue-100/78">{[profile.job_title, profile.company_name].filter(Boolean).join(" at ")}</p>
          )}
          {profile.bio && <p className="mt-2 text-sm leading-7 text-muted">{profile.bio}</p>}
        </div>
        <div className="mt-4">
          <button type="button" className="w-full rounded-full px-5 py-3 text-sm font-medium text-white" style={{ backgroundColor: accentColor, boxShadow: `0 16px 40px ${withAlpha(accentColor, "59")}` }}>
            Save Contact
          </button>
        </div>
      </div>
    </div>
  );
}

function PreviewStyle2({ coverUrl, avatarUrl, accentColor, profile }: {
  coverUrl: string; avatarUrl: string; accentColor: string;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0f] text-[#e2e8f0]">
      <div className="h-24 w-full bg-cover bg-center" style={{ backgroundImage: `url(${coverUrl})` }} />
      <div className="px-4">
        <div className="-mt-8 mb-2 flex items-end gap-2.5">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-[#0d0d0f] bg-cover bg-center" style={{ backgroundImage: `url(${avatarUrl})` }} />
        </div>
        <p className="text-sm font-medium text-slate-100">
          <span style={{ color: accentColor }}>&lt;</span>{profile.display_name}<span style={{ color: accentColor }}> /&gt;</span>
        </p>
        {profile.bio && <p className="mt-1 text-xs text-[#94a3b8]">{profile.bio}</p>}
        <div className="mt-3 mb-4">
          <button type="button" className="w-full rounded-md px-3 py-2.5 text-center text-xs font-medium text-white" style={{ backgroundColor: accentColor }}>
            $ save_contact --format vcf
          </button>
        </div>
      </div>
    </div>
  );
}

function PreviewStyle3({ coverUrl, avatarUrl, accentColor, profile }: {
  coverUrl: string; avatarUrl: string; accentColor: string;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#090910] text-[#f0eeff]">
      <div className="relative h-24 bg-cover bg-center brightness-[0.6]" style={{ backgroundImage: `url(${coverUrl})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#090910]" />
      </div>
      <div className="-mt-8 flex justify-center">
        <div className="size-16 overflow-hidden rounded-full border-[3px] border-[#090910] bg-cover bg-center shadow-[0_0_24px_rgba(59,130,246,0.3)]" style={{ backgroundImage: `url(${avatarUrl})`, boxShadow: `0 0 24px ${withAlpha(accentColor, "55")}` }} />
      </div>
      <div className="px-4 pb-4 pt-2 text-center">
        <p className="text-sm font-bold" style={{ backgroundImage: `linear-gradient(135deg, #fff 22%, ${accentColor})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {profile.display_name}
        </p>
        <div className="mt-3">
          <button type="button" className="w-full rounded-full px-5 py-2.5 text-xs font-bold text-white" style={{ backgroundImage: `linear-gradient(135deg, ${accentColor}, ${withAlpha(accentColor, "cc")})`, boxShadow: `0 8px 20px ${withAlpha(accentColor, "55")}` }}>
            Save Contact
          </button>
        </div>
      </div>
    </div>
  );
}

function PreviewStyle4({ coverUrl, avatarUrl, accentColor, profile }: {
  coverUrl: string; avatarUrl: string; accentColor: string;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#f7f9fc] text-[#0f1d34]">
      <div className="h-24 w-full bg-cover bg-center" style={{ backgroundImage: `url(${coverUrl})` }} />
      <div className="px-4 pb-4">
        <div className="-mt-8 flex justify-center">
          <div className="size-16 overflow-hidden rounded-full border-[3px] border-[#f7f9fc] bg-cover bg-center" style={{ backgroundImage: `url(${avatarUrl})` }} />
        </div>
        <div className="mt-2 text-center">
          <p className="text-sm font-semibold text-[#0e203e]">{profile.display_name}</p>
        </div>
        <div className="mt-3">
          <button type="button" className="w-full rounded-lg border px-4 py-2.5 text-center text-xs font-medium transition" style={{ color: accentColor, borderColor: accentColor }}>
            Save Contact
          </button>
        </div>
      </div>
    </div>
  );
}

function PreviewStyle5({ coverUrl, avatarUrl, profile }: {
  coverUrl: string; avatarUrl: string;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}) {
  return (
    <div className="overflow-hidden rounded-3xl border-[3px] border-black bg-[#f5f0e8] text-black shadow-[4px_4px_0_#000]">
      <div className="relative h-24 border-b-[3px] border-black bg-cover bg-center" style={{ backgroundImage: `url(${coverUrl})` }}>
        <div className="absolute -bottom-6 left-3 z-10 h-12 w-12 -rotate-2 border-[3px] border-black bg-[#FF3B3B] bg-cover bg-center shadow-[3px_3px_0_#000]" style={{ backgroundImage: `url(${avatarUrl})` }} />
      </div>
      <div className="px-4 pb-4 pt-8">
        <p className="text-sm font-bold">{profile.display_name}<span className="text-[#FF3B3B]">.</span></p>
        <div className="mt-3">
          <button type="button" className="w-full border-[3px] border-black bg-[#FFE000] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.1em] shadow-[3px_3px_0_#000]">
            Save Contact
          </button>
        </div>
      </div>
    </div>
  );
}

function PreviewStyle6({ coverUrl, avatarUrl, profile }: {
  coverUrl: string; avatarUrl: string;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d] font-mono text-[#c9c9c4]">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-black/70 px-3 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]/80" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]/80" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]/80" />
        <span className="ml-1 text-[9px] text-emerald-400/80">~/profile/{profile.slug}</span>
      </div>
      <div className="relative h-20 bg-cover bg-center brightness-[0.6]" style={{ backgroundImage: `url(${coverUrl})` }} />
      <div className="flex items-end gap-2 px-3 pb-2">
        <div className="-mt-5 h-10 w-10 shrink-0 overflow-hidden rounded-md border border-[#1a2e1f] bg-cover bg-center" style={{ backgroundImage: `url(${avatarUrl})` }} />
        <div className="pb-0.5">
          <p className="text-[11px] font-semibold text-[#e2e8e0]">{profile.display_name}</p>
          <p className="text-[9px] text-emerald-400/70">@{profile.slug}</p>
        </div>
      </div>
      <div className="px-3 pb-3 pt-1">
        <button type="button" className="inline-flex items-center gap-1 rounded-sm border border-emerald-400/30 bg-[#0d1a12] px-2 py-1 text-[9px] text-emerald-400">
          &gt; download_vcard
        </button>
      </div>
    </div>
  );
}

export function StylingEditor({ profile }: StylingEditorProps) {
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [resultType, setResultType] = useState<"success" | "error" | null>(null);
  const [isPending, startTransition] = useTransition();

  const defaultStyle = PROFILE_STYLE_OPTIONS.includes(profile.profile_style as ProfileStyleId)
    ? (profile.profile_style as ProfileStyleId)
    : "style-1";
  const defaultAccent = PROFILE_ACCENT_OPTIONS.includes(
    profile.accent_color as (typeof PROFILE_ACCENT_OPTIONS)[number],
  )
    ? (profile.accent_color as (typeof PROFILE_ACCENT_OPTIONS)[number])
    : "#3b82f6";

  const form = useForm<ProfileStylingInput, undefined, ProfileStylingValues>({
    resolver: zodResolver(profileStylingSchema),
    defaultValues: {
      profile_style: defaultStyle,
      accent_color: defaultAccent,
    },
  });

  const errors = form.formState.errors;
  const accentColor = form.watch("accent_color") ?? "#3b82f6";
  const profileStyle = form.watch("profile_style");
  const selectedStyle = useMemo(
    () => PROFILE_STYLE_DEFINITIONS.find((item) => item.id === profileStyle),
    [profileStyle],
  );
  const isColorfulStyle = profileStyle === "style-5";
  const coverUrl = profile.cover_path || DEFAULT_COVER;
  const avatarUrl = profile.avatar_path || DEFAULT_AVATAR;

  function renderPreview() {
    const commonProps = { coverUrl, avatarUrl, accentColor, profile };
    switch (profileStyle) {
      case "style-2":
        return <PreviewStyle2 {...commonProps} />;
      case "style-3":
        return <PreviewStyle3 {...commonProps} />;
      case "style-4":
        return <PreviewStyle4 {...commonProps} />;
      case "style-5":
        return <PreviewStyle5 coverUrl={coverUrl} avatarUrl={avatarUrl} profile={profile} />;
      case "style-6":
        return <PreviewStyle6 coverUrl={coverUrl} avatarUrl={avatarUrl} profile={profile} />;
      default:
        return <PreviewStyle1 {...commonProps} />;
    }
  }

  return (
    <form
      className="space-y-6"
      onSubmit={form.handleSubmit((values) => {
        setResultMessage(null);
        setResultType(null);

        startTransition(async () => {
          const result = await saveProfileStylingAction(values);
          if (result.error) {
            setResultType("error");
            setResultMessage(result.error);
            return;
          }

          setResultType("success");
          setResultMessage(result.success ?? "Styling updated.");
        });
      })}
    >
      <Card className="rounded-[2rem]">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-blue-200/72">
              Styling Preview
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Live Style Preview</h2>
          </div>

          {renderPreview()}
        </div>
      </Card>

      <Card className="rounded-[2rem]">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-blue-200/72">
              Style System
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Choose profile style</h2>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {PROFILE_STYLE_DEFINITIONS.map((style) => {
              const selected = profileStyle === style.id;

              return (
                <button
                  key={style.id}
                  type="button"
                  className={`rounded-2xl border p-4 text-left transition ${
                    selected
                      ? "border-primary bg-primary/12"
                      : "border-white/10 bg-white/4 hover:border-white/30"
                  }`}
                  onClick={() => form.setValue("profile_style", style.id)}
                >
                  <p className="text-sm font-semibold text-white">{style.name}</p>
                  <p className="mt-1 text-xs text-muted">{style.description}</p>
                </button>
              );
            })}
          </div>
          {selectedStyle ? (
            <p className="text-xs text-blue-100/72">Selected: {selectedStyle.name}</p>
          ) : null}
          {errors.profile_style?.message ? (
            <p className="text-xs text-red-300">{errors.profile_style.message}</p>
          ) : null}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-blue-50/85">Theme Color</label>
              {isColorfulStyle && (
                <span className="rounded-full bg-amber-500/15 border border-amber-400/25 px-2.5 py-0.5 text-[10px] font-medium text-amber-200/90">
                  Style 5 keeps its own fixed colors
                </span>
              )}
            </div>
            <div className={`flex flex-wrap gap-3 ${isColorfulStyle ? "pointer-events-none opacity-35" : ""}`}>
              {PROFILE_ACCENT_OPTIONS.map((color) => {
                const isSelected = accentColor === color;
                return (
                  <button
                    key={color}
                    type="button"
                    aria-label={`Select ${ACCENT_LABELS[color] ?? color} as theme color`}
                    className={`relative size-10 rounded-full transition-all duration-200 ${
                      isSelected
                        ? "ring-2 ring-white ring-offset-2 ring-offset-[#0b1728]"
                        : ""
                    }`}
                    style={{
                      backgroundColor: color,
                      border: `2px solid ${withAlpha(color, "33")}`,
                    }}
                    disabled={isColorfulStyle}
                    onClick={() => form.setValue("accent_color", color)}
                  >
                    {isSelected && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg className="size-4 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {errors.accent_color?.message ? (
              <p className="text-xs text-red-300">{errors.accent_color.message}</p>
            ) : null}
          </div>
        </div>
      </Card>

      <Card className="rounded-[2rem]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">Save and apply these style settings to your public profile.</p>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save styling"}
          </Button>
        </div>
        {resultMessage ? (
          <p className={`mt-4 text-sm ${resultType === "error" ? "text-red-300" : "text-emerald-300"}`}>
            {resultMessage}
          </p>
        ) : null}
      </Card>
    </form>
  );
}
