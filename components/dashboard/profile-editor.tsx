"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, CheckCircle2, Plus, Sparkles, Trash2 } from "lucide-react";

import { saveProfileAction } from "@/actions/profile";
import { MediaUploader } from "@/components/dashboard/media-uploader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SOCIAL_PLATFORM_LABELS, SOCIAL_PLATFORM_OPTIONS } from "@/lib/constants";
import { normalizeSlug } from "@/lib/slug";
import {
  profileSchema,
  type ProfileFormInput,
  type ProfileFormValues,
} from "@/lib/validations/profile";
import type { Database } from "@/types/database";

interface ProfileEditorProps {
  userId: string;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
  socialLinks: Database["public"]["Tables"]["social_links"]["Row"][];
  experiences: Database["public"]["Tables"]["experiences"]["Row"][];
}

const STEPS = ["Profile", "Links", "Experience"] as const;
type SocialLinkInput = NonNullable<ProfileFormInput["social_links"]>[number];

function FieldErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-red-300">{message}</p>;
}

export function ProfileEditor({ userId, profile, socialLinks, experiences }: ProfileEditorProps) {
  const [step, setStep] = useState(0);
  const [slugStatus, setSlugStatus] = useState<{ state: "idle" | "checking" | "available" | "taken"; message?: string }>({ state: "idle" });
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [resultType, setResultType] = useState<"success" | "error" | null>(null);
  const [isPending, startTransition] = useTransition();

  const defaultValues = useMemo<ProfileFormInput>(
    () => ({
      display_name: profile.display_name,
      username: profile.username,
      slug: profile.slug,
      bio: profile.bio ?? "",
      job_title: profile.job_title ?? "",
      company_name: profile.company_name ?? "",
      address: profile.address ?? "",
      phone_home: profile.phone_home ?? profile.phone_public ?? "",
      phone_office: profile.phone_office ?? "",
      email_home: profile.email_home ?? profile.email_public ?? "",
      email_office: profile.email_office ?? "",
      avatar_path: profile.avatar_path ?? "",
      cover_path: profile.cover_path ?? "",
      is_published: profile.is_published,
      social_links: socialLinks.map((item, index) => ({
        id: item.id,
        platform: item.platform as SocialLinkInput["platform"],
        label: item.label ?? "",
        url: item.url,
        sort_order: index,
      })),
      experiences: experiences.map((item, index) => ({
        id: item.id,
        title: item.title,
        company: item.company ?? "",
        location: item.location ?? "",
        description: item.description ?? "",
        start_date: item.start_date ?? "",
        end_date: item.end_date ?? "",
        is_current: item.is_current,
        sort_order: index,
      })),
    }),
    [experiences, profile, socialLinks],
  );

  const form = useForm<ProfileFormInput, undefined, ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });
  const socialFieldArray = useFieldArray({ control: form.control, name: "social_links" });
  const experienceFieldArray = useFieldArray({ control: form.control, name: "experiences" });
  const errors = form.formState.errors;

  const slugValue = form.watch("slug");
  useEffect(() => {
    const normalized = normalizeSlug(slugValue ?? "");
    if (!normalized || normalized === profile.slug) {
      setSlugStatus({ state: "idle" });
      return;
    }
    const timer = setTimeout(async () => {
      setSlugStatus({ state: "checking", message: "Checking..." });
      const response = await fetch(`/api/slug/check?slug=${encodeURIComponent(normalized)}`);
      const payload = (await response.json()) as { available: boolean; normalized: string };
      setSlugStatus(
        payload.available
          ? { state: "available", message: `${payload.normalized} is available.` }
          : { state: "taken", message: `${payload.normalized} is already taken.` },
      );
    }, 350);
    return () => clearTimeout(timer);
  }, [profile.slug, slugValue]);

  return (
    <form
      className="space-y-5"
      onSubmit={form.handleSubmit(
        (values) => {
          setResultMessage(null);
          setResultType(null);
          startTransition(async () => {
            try {
              const result = await saveProfileAction(values);
              if (result.error) {
                setResultMessage(result.error);
                setResultType("error");
                return;
              }
              setResultMessage(result.success ?? null);
              setResultType("success");
            } catch {
              setResultMessage("Unable to save right now. Please try again.");
              setResultType("error");
            }
          });
        },
        () => {
          setResultType("error");
          setResultMessage("Please fix the form errors and try again.");
        },
      )}
    >
      <Card>
        <div className="relative flex items-center justify-between gap-2">
          <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-white/10 sm:block" />
          {STEPS.map((label, idx) => (
            <button key={label} type="button" className="relative flex items-center gap-2 bg-[#0d1a2f] pr-3" onClick={() => setStep(idx)}>
              <span className={`flex size-6 items-center justify-center rounded-full border text-[11px] ${
                idx <= step ? "border-primary bg-primary/20 text-white" : "border-white/20 text-blue-100/70"
              }`}>{idx + 1}</span>
              <span className={`text-xs ${idx <= step ? "text-white" : "text-blue-100/70"}`}>{label}</span>
            </button>
          ))}
        </div>
      </Card>

      {step === 0 ? (
        <Card>
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <h2 className="text-xl font-semibold text-white">Profile basics & media</h2>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm text-blue-50/85">Display name</label>
              <Input {...form.register("display_name")} />
              <FieldErrorText message={errors.display_name?.message} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-blue-50/85">Username</label>
              <Input {...form.register("username")} />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm text-blue-50/85">Slug</label>
              <Input {...form.register("slug")} onBlur={(e) => form.setValue("slug", normalizeSlug(e.target.value))} />
              {slugStatus.message ? (
                <p className={`text-xs ${slugStatus.state === "taken" ? "text-red-300" : "text-blue-100/72"}`}>{slugStatus.message}</p>
              ) : null}
              <FieldErrorText message={errors.slug?.message} />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm text-blue-50/85">Short bio</label>
              <Textarea className="min-h-20" {...form.register("bio")} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-blue-50/85">Job title</label>
              <Input {...form.register("job_title")} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-blue-50/85">Company</label>
              <Input {...form.register("company_name")} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-blue-50/85">Email (Home)</label>
              <Input type="email" {...form.register("email_home")} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-blue-50/85">Email (Office)</label>
              <Input type="email" {...form.register("email_office")} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-blue-50/85">Phone (Home)</label>
              <Input {...form.register("phone_home")} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-blue-50/85">Phone (Office)</label>
              <Input {...form.register("phone_office")} />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm text-blue-50/85">Address</label>
              <Textarea className="min-h-20" {...form.register("address")} />
            </div>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <MediaUploader
              bucket="avatars"
              label="Profile image"
              userId={userId}
              value={form.watch("avatar_path") as string | undefined}
              onChange={(url) => form.setValue("avatar_path", url)}
            />
            <MediaUploader
              bucket="covers"
              label="Cover image"
              userId={userId}
              value={form.watch("cover_path") as string | undefined}
              onChange={(url) => form.setValue("cover_path", url)}
            />
          </div>
        </Card>
      ) : null}

      {step === 1 ? (
        <Card>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-white">Links</h2>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => socialFieldArray.append({ platform: "custom", label: "", url: "", sort_order: socialFieldArray.fields.length })}
            >
              <Plus className="size-4" />
              Add link
            </Button>
          </div>
          <div className="mt-4 space-y-3">
            {socialFieldArray.fields.map((field, index) => (
              <div key={field.id} className="grid gap-3 rounded-xl border border-white/8 bg-white/4 p-3 md:grid-cols-[0.8fr_1fr_auto]">
                <select className="input-base" {...form.register(`social_links.${index}.platform`)}>
                  {SOCIAL_PLATFORM_OPTIONS.map((option) => (
                    <option key={option} value={option} className="bg-[#0b1728]">
                      {SOCIAL_PLATFORM_LABELS[option]}
                    </option>
                  ))}
                </select>
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
                  <Input placeholder="Label" {...form.register(`social_links.${index}.label`)} />
                  <Input placeholder="https://" {...form.register(`social_links.${index}.url`)} />
                </div>
                <Button type="button" variant="ghost" size="sm" onClick={() => socialFieldArray.remove(index)}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      {step === 2 ? (
        <Card>
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-white">Experience</h2>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() =>
                experienceFieldArray.append({
                  title: "",
                  company: "",
                  location: "",
                  description: "",
                  start_date: "",
                  end_date: "",
                  is_current: false,
                  sort_order: experienceFieldArray.fields.length,
                })
              }
            >
              <Plus className="size-4" />
              Add role
            </Button>
          </div>
          <div className="mt-4 space-y-3">
            {experienceFieldArray.fields.map((field, index) => (
              <div key={field.id} className="rounded-xl border border-white/8 bg-white/4 p-3">
                <div className="grid gap-3 md:grid-cols-2">
                  <Input placeholder="Title" {...form.register(`experiences.${index}.title`)} />
                  <Input placeholder="Company" {...form.register(`experiences.${index}.company`)} />
                  <Input placeholder="Location" {...form.register(`experiences.${index}.location`)} />
                  <label className="flex items-center gap-2 rounded-xl border border-white/8 px-3 py-2 text-sm text-white">
                    <input type="checkbox" {...form.register(`experiences.${index}.is_current`)} />
                    Current role
                  </label>
                  <Input type="date" {...form.register(`experiences.${index}.start_date`)} />
                  <Input type="date" {...form.register(`experiences.${index}.end_date`)} />
                  <div className="md:col-span-2">
                    <Textarea className="min-h-20" placeholder="What did you do?" {...form.register(`experiences.${index}.description`)} />
                  </div>
                </div>
                <Button type="button" variant="ghost" size="sm" className="mt-3" onClick={() => experienceFieldArray.remove(index)}>
                  <Trash2 className="size-4" />
                  Remove role
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="mb-2 flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-300" />
              <p className="text-sm font-medium text-white">Finish</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-2 text-sm text-white">
              <input type="checkbox" {...form.register("is_published")} />
              Profile is publicly visible
            </label>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save profile"}
            </Button>
          </div>
          </div>
          {resultMessage ? (
            <p className={`mt-3 text-sm ${resultType === "error" ? "text-red-300" : "text-emerald-300"}`}>
              {resultMessage}
            </p>
          ) : null}
        </Card>
      ) : null}

      <Card>
        <div className="flex items-center justify-between">
          <Button type="button" variant="ghost" size="sm" disabled={step === 0} onClick={() => setStep((curr) => Math.max(0, curr - 1))}>
            <ChevronLeft className="size-4" />
            Previous
          </Button>
          <p className="text-xs text-muted">
            Step {step + 1} of {STEPS.length}
          </p>
          <Button type="button" variant="secondary" size="sm" disabled={step === STEPS.length - 1} onClick={() => setStep((curr) => Math.min(STEPS.length - 1, curr + 1))}>
            Next
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </Card>
    </form>
  );
}
