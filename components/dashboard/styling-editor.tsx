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
      avatar_shape: profile.avatar_shape === "rounded" ? "rounded" : "circle",
    },
  });

  const errors = form.formState.errors;
  const accentColor = form.watch("accent_color") ?? "#3b82f6";
  const avatarShape = form.watch("avatar_shape");
  const profileStyle = form.watch("profile_style");
  const selectedStyle = useMemo(
    () => PROFILE_STYLE_DEFINITIONS.find((item) => item.id === profileStyle),
    [profileStyle],
  );
  const isColorfulStyle = profileStyle === "style-5";
  const avatarShapeClass = avatarShape === "rounded" ? "rounded-3xl" : "rounded-full";
  const coverUrl = profile.cover_path || DEFAULT_COVER;
  const avatarUrl = profile.avatar_path || DEFAULT_AVATAR;

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
            <h2 className="mt-3 text-2xl font-semibold text-white">Live style preview</h2>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0c1729]">
            <div
              className="h-28 w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${coverUrl})`,
              }}
            />
            <div className="p-4">
              <div className="-mt-12 flex justify-center">
                <div
                  className={`size-24 border-4 border-[#0c1729] bg-cover bg-center ${avatarShapeClass}`}
                  style={{
                    backgroundImage: `url(${avatarUrl})`,
                  }}
                />
              </div>
              <div className="mt-4 text-center">
                {profile.job_title || profile.company_name ? (
                  <p className="text-sm text-blue-100/78">
                    {[profile.job_title, profile.company_name]
                      .filter(Boolean)
                      .join(" at ")}
                  </p>
                ) : null}
                {profile.bio ? (
                  <p className="mt-2 text-sm leading-7 text-muted">{profile.bio}</p>
                ) : null}
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="w-full rounded-full px-5 py-3 text-sm font-medium text-white"
                  style={{
                    backgroundColor: accentColor,
                    boxShadow: `0 16px 40px ${withAlpha(accentColor, "59")}`,
                  }}
                >
                  Save Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="rounded-[2rem]">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-blue-200/72">
              Style System
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Choose profile style</h2>
            <p className="mt-2 text-sm text-muted">
              Style 5 uses a fixed neobrutalist palette and shape styling by design.
            </p>
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
          {isColorfulStyle ? (
            <p className="text-xs text-amber-200/90">
              Style 5 keeps its own fixed colors and profile image treatment. Accent color and avatar shape do not affect this style.
            </p>
          ) : null}
          {errors.profile_style?.message ? (
            <p className="text-xs text-red-300">{errors.profile_style.message}</p>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-blue-50/85">Accent color</label>
              <div className="flex flex-wrap gap-3">
                {PROFILE_ACCENT_OPTIONS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    aria-label={`Select accent color ${color}`}
                    className={`h-10 w-14 rounded-md border-2 transition ${
                      accentColor === color
                        ? "border-white"
                        : "border-transparent hover:border-white/50"
                    }`}
                    style={{ backgroundColor: color }}
                    disabled={isColorfulStyle}
                    onClick={() => form.setValue("accent_color", color)}
                  />
                ))}
              </div>
              {errors.accent_color?.message ? (
                <p className="text-xs text-red-300">{errors.accent_color.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-blue-50/85">Profile picture shape</label>
              <select className="input-base" disabled={isColorfulStyle} {...form.register("avatar_shape")}>
                <option value="circle" className="bg-[#0b1728]">
                  Rounded circle
                </option>
                <option value="rounded" className="bg-[#0b1728]">
                  Rounded rectangle
                </option>
              </select>
              {errors.avatar_shape?.message ? (
                <p className="text-xs text-red-300">{errors.avatar_shape.message}</p>
              ) : null}
            </div>
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
