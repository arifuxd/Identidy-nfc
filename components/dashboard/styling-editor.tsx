"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { saveProfileStylingAction } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PROFILE_ACCENT_OPTIONS } from "@/lib/constants";
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

const ACCENT_LABELS: Record<string, string> = {
  "#3b82f6": "Blue",
  "#ef4444": "Red",
  "#10b981": "Emerald",
  "#f59e0b": "Amber",
  "#8b5cf6": "Violet",
  "#ec4899": "Pink",
};

const STYLE_PREVIEW_MAP: Record<ProfileStyleId, string> = {
  "style-1": "/style-previews/style-1.png",
  "style-2": "/style-previews/style-2.png",
  "style-3": "/style-previews/style-3.png",
  "style-4": "/style-previews/style-4.png",
  "style-5": "/style-previews/style-5.png",
  "style-6": "/style-previews/style-6.png",
  "style-7": "/style-previews/style-7.png",
  "style-8": "/style-previews/style-8.png",
};
const PREVIEW_SCROLL_MS = 3200;

function withAlpha(hexColor: string, alphaHex: string) {
  if (!/^#[0-9a-f]{6}$/i.test(hexColor)) return hexColor;
  return `${hexColor}${alphaHex}`;
}

export function StylingEditor({ profile }: StylingEditorProps) {
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [resultType, setResultType] = useState<"success" | "error" | null>(null);
  const [isPending, startTransition] = useTransition();
  const [activePreviewId, setActivePreviewId] = useState<ProfileStyleId | null>(null);
  const frameRefs = useRef<Partial<Record<ProfileStyleId, HTMLDivElement | null>>>({});
  const imageRefs = useRef<Partial<Record<ProfileStyleId, HTMLImageElement | null>>>({});
  const [scrollOffsets, setScrollOffsets] = useState<Partial<Record<ProfileStyleId, number>>>({});

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
  const isColorfulStyle =
    profileStyle === "style-5" || profileStyle === "style-7" || profileStyle === "style-8";

  useEffect(() => {
    const recalc = () => {
      const next: Partial<Record<ProfileStyleId, number>> = {};
      PROFILE_STYLE_DEFINITIONS.forEach((style) => {
        const frame = frameRefs.current[style.id];
        const image = imageRefs.current[style.id];
        if (!frame || !image) return;
        const frameHeight = frame.clientHeight;
        const imageHeight = image.clientHeight;
        next[style.id] = Math.max(0, imageHeight - frameHeight);
      });
      setScrollOffsets(next);
    };

    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

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
      <Card className="rounded-2xl">
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-blue-200/72">
              Select Design
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Choose profile style</h2>
            <p className="mt-1 text-sm text-muted">
              Hover on a design card to preview the full layout.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {PROFILE_STYLE_DEFINITIONS.map((style) => {
              const selected = profileStyle === style.id;
              const imageUrl = STYLE_PREVIEW_MAP[style.id];
              const previewActive = activePreviewId === style.id;

              return (
                <button
                  key={style.id}
                  type="button"
                  className={`group overflow-hidden rounded-xl border text-left transition ${
                    selected
                      ? "border-primary bg-primary/10"
                      : "border-white/10 bg-white/4 hover:border-white/30"
                  }`}
                  onMouseEnter={() => setActivePreviewId(style.id)}
                  onMouseLeave={() => setActivePreviewId(null)}
                  onClick={() => {
                    form.setValue("profile_style", style.id);
                    setActivePreviewId((curr) => (curr === style.id ? null : style.id));
                  }}
                >
                  <div className="p-2.5">
                    <div className="relative h-64 overflow-hidden rounded-lg border border-white/10 bg-[#0a1422] sm:h-72 xl:h-80">
                      <div ref={(node) => { frameRefs.current[style.id] = node; }} className="h-full w-full overflow-hidden">
                        <img
                          ref={(node) => { imageRefs.current[style.id] = node; }}
                          src={imageUrl}
                          alt={`${style.name} preview`}
                          className="block w-full max-w-none"
                          draggable={false}
                          onLoad={() => {
                            const frame = frameRefs.current[style.id];
                            const image = imageRefs.current[style.id];
                            if (!frame || !image) return;
                            const nextOffset = Math.max(0, image.clientHeight - frame.clientHeight);
                            setScrollOffsets((prev) => ({ ...prev, [style.id]: nextOffset }));
                          }}
                          style={{
                            transform: `translate3d(0, ${previewActive ? -(scrollOffsets[style.id] ?? 0) : 0}px, 0)`,
                            transition: previewActive
                              ? `transform ${PREVIEW_SCROLL_MS}ms linear`
                              : "none",
                            willChange: "transform",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-white/10 px-3 py-2.5">
                    <p className="text-sm font-semibold text-white">{style.name}</p>
                    <p className="mt-0.5 text-xs text-muted">{style.description}</p>
                  </div>
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
              {isColorfulStyle ? (
                <span className="rounded-full border border-amber-400/25 bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-medium text-amber-200/90">
                  Fixed color for this style
                </span>
              ) : null}
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
                      isSelected ? "ring-2 ring-white ring-offset-2 ring-offset-[#0b1728]" : ""
                    }`}
                    style={{
                      backgroundColor: color,
                      border: `2px solid ${withAlpha(color, "33")}`,
                    }}
                    disabled={isColorfulStyle}
                    onClick={() => form.setValue("accent_color", color)}
                  >
                    {isSelected ? (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg className="size-4 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    ) : null}
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

      <Card className="rounded-2xl">
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
