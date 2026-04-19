"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";

import { saveProfileAction } from "@/actions/profile";
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
import { MediaUploader } from "@/components/dashboard/media-uploader";

interface ProfileEditorProps {
  userId: string;
  profile: Database["public"]["Tables"]["profiles"]["Row"];
  socialLinks: Database["public"]["Tables"]["social_links"]["Row"][];
  experiences: Database["public"]["Tables"]["experiences"]["Row"][];
}

type SocialLinkInput = NonNullable<ProfileFormInput["social_links"]>[number];
type ExperienceInput = NonNullable<ProfileFormInput["experiences"]>[number];

function FieldErrorText({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-xs text-red-300">{message}</p>;
}

export function ProfileEditor({
  userId,
  profile,
  socialLinks,
  experiences,
}: ProfileEditorProps) {
  const [slugStatus, setSlugStatus] = useState<{
    state: "idle" | "checking" | "available" | "taken";
    message?: string;
  }>({ state: "idle" });
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
      phone_public: profile.phone_public ?? "",
      email_public: profile.email_public ?? "",
      avatar_path: profile.avatar_path ?? "",
      cover_path: profile.cover_path ?? "",
      is_published: profile.is_published,
      social_links: socialLinks.map(
        (item, index): SocialLinkInput => ({
          id: item.id,
          platform: item.platform as SocialLinkInput["platform"],
          label: item.label ?? "",
          url: item.url,
          sort_order: index,
        }),
      ),
      experiences: experiences.map(
        (item, index): ExperienceInput => ({
          id: item.id,
          title: item.title,
          company: item.company ?? "",
          location: item.location ?? "",
          description: item.description ?? "",
          start_date: item.start_date ?? "",
          end_date: item.end_date ?? "",
          is_current: item.is_current,
          sort_order: index,
        }),
      ),
    }),
    [experiences, profile, socialLinks],
  );

  const form = useForm<ProfileFormInput, undefined, ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const socialFieldArray = useFieldArray({
    control: form.control,
    name: "social_links",
  });

  const experienceFieldArray = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  const slugValue = form.watch("slug");
  const errors = form.formState.errors;

  useEffect(() => {
    const normalized = normalizeSlug(slugValue ?? "");

    if (!normalized || normalized === profile.slug) {
      setSlugStatus({ state: "idle" });
      return;
    }

    const timer = setTimeout(async () => {
      setSlugStatus({ state: "checking", message: "Checking availability..." });

      const response = await fetch(
        `/api/slug/check?slug=${encodeURIComponent(normalized)}`,
      );
      const payload = (await response.json()) as {
        available: boolean;
        normalized: string;
      };

      if (payload.available) {
        setSlugStatus({
          state: "available",
          message: `${payload.normalized} is available.`,
        });
      } else {
        setSlugStatus({
          state: "taken",
          message: `${payload.normalized} is already taken.`,
        });
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [profile.slug, slugValue]);

  return (
    <form
      className="space-y-6"
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
              setResultMessage(
                "Unable to save profile right now. Please try again in a moment.",
              );
              setResultType("error");
            }
          });
        },
        () => {
          setResultType("error");
          setResultMessage("Please fix the form errors, then try saving again.");
        },
      )}
    >
      <Card className="rounded-[2rem]">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-blue-200/72">
              Profile Basics
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Public identity
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm text-blue-50/85">Display name</label>
              <Input {...form.register("display_name")} />
              <FieldErrorText message={errors.display_name?.message} />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-blue-50/85">Username</label>
              <Input {...form.register("username")} />
              <FieldErrorText message={errors.username?.message} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-blue-50/85">Slug</label>
              <Input
                {...form.register("slug")}
                onBlur={(event) =>
                  form.setValue("slug", normalizeSlug(event.target.value))
                }
              />
              {slugStatus.message ? (
                <p
                  className={`text-xs ${
                    slugStatus.state === "taken"
                      ? "text-red-300"
                      : "text-blue-100/72"
                  }`}
                >
                  {slugStatus.message}
                </p>
              ) : null}
              <FieldErrorText message={errors.slug?.message} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-blue-50/85">Short bio</label>
              <Textarea {...form.register("bio")} />
              <FieldErrorText message={errors.bio?.message} />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-blue-50/85">Job title</label>
              <Input {...form.register("job_title")} />
              <FieldErrorText message={errors.job_title?.message} />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-blue-50/85">Company</label>
              <Input {...form.register("company_name")} />
              <FieldErrorText message={errors.company_name?.message} />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-blue-50/85">Public email</label>
              <Input {...form.register("email_public")} type="email" />
              <FieldErrorText message={errors.email_public?.message} />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-blue-50/85">Public phone</label>
              <Input {...form.register("phone_public")} />
              <FieldErrorText message={errors.phone_public?.message} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-blue-50/85">Address</label>
              <Textarea {...form.register("address")} />
              <FieldErrorText message={errors.address?.message} />
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <MediaUploader
            bucket="avatars"
            label="Profile image"
            userId={userId}
            value={form.watch("avatar_path") as string | undefined}
            onChange={(url) => form.setValue("avatar_path", url)}
          />
          <FieldErrorText message={errors.avatar_path?.message} />
        </div>
        <div className="space-y-2">
          <MediaUploader
            bucket="covers"
            label="Cover image"
            userId={userId}
            value={form.watch("cover_path") as string | undefined}
            onChange={(url) => form.setValue("cover_path", url)}
          />
          <FieldErrorText message={errors.cover_path?.message} />
        </div>
      </div>

      <Card className="rounded-[2rem]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Social links</h2>
            <p className="mt-2 text-sm text-muted">
              Add the destinations you want people to tap next.
            </p>
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              socialFieldArray.append({
                platform: "custom",
                label: "",
                url: "",
                sort_order: socialFieldArray.fields.length,
              })
            }
          >
            <Plus className="size-4" />
            Add link
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          {socialFieldArray.fields.map((field, index) => {
            const socialError = errors.social_links?.[index];

            return (
              <div
                key={field.id}
                className="grid gap-4 rounded-3xl border border-white/8 bg-white/4 p-4 md:grid-cols-[0.8fr_1fr_auto]"
              >
                <div className="space-y-2">
                  <select
                    className="input-base"
                    {...form.register(`social_links.${index}.platform`)}
                  >
                    {SOCIAL_PLATFORM_OPTIONS.map((option) => (
                      <option key={option} value={option} className="bg-[#0b1728]">
                        {SOCIAL_PLATFORM_LABELS[option]}
                      </option>
                    ))}
                  </select>
                  <FieldErrorText message={socialError?.platform?.message} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
                  <div className="space-y-2">
                    <Input
                      placeholder="Label"
                      {...form.register(`social_links.${index}.label`)}
                    />
                    <FieldErrorText message={socialError?.label?.message} />
                  </div>
                  <div className="space-y-2">
                    <Input
                      placeholder="https://"
                      {...form.register(`social_links.${index}.url`)}
                    />
                    <FieldErrorText message={socialError?.url?.message} />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  className="justify-center"
                  onClick={() => socialFieldArray.remove(index)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="rounded-[2rem]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Experience</h2>
            <p className="mt-2 text-sm text-muted">
              Add timeline entries like a lightweight resume builder.
            </p>
          </div>
          <Button
            type="button"
            variant="secondary"
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

        <div className="mt-6 space-y-4">
          {experienceFieldArray.fields.map((field, index) => {
            const experienceError = errors.experiences?.[index];

            return (
              <div
                key={field.id}
                className="rounded-3xl border border-white/8 bg-white/4 p-4"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Input
                      placeholder="Title"
                      {...form.register(`experiences.${index}.title`)}
                    />
                    <FieldErrorText message={experienceError?.title?.message} />
                  </div>
                  <div className="space-y-2">
                    <Input
                      placeholder="Company"
                      {...form.register(`experiences.${index}.company`)}
                    />
                    <FieldErrorText message={experienceError?.company?.message} />
                  </div>
                  <div className="space-y-2">
                    <Input
                      placeholder="Location"
                      {...form.register(`experiences.${index}.location`)}
                    />
                    <FieldErrorText message={experienceError?.location?.message} />
                  </div>
                  <label className="flex items-center gap-3 rounded-2xl border border-white/8 px-4 py-3 text-sm text-white">
                    <input
                      type="checkbox"
                      {...form.register(`experiences.${index}.is_current`)}
                    />
                    Current role
                  </label>
                  <div className="space-y-2">
                    <Input
                      type="date"
                      {...form.register(`experiences.${index}.start_date`)}
                    />
                    <FieldErrorText message={experienceError?.start_date?.message} />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="date"
                      {...form.register(`experiences.${index}.end_date`)}
                    />
                    <FieldErrorText message={experienceError?.end_date?.message} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Textarea
                      placeholder="What did you do?"
                      {...form.register(`experiences.${index}.description`)}
                    />
                    <FieldErrorText message={experienceError?.description?.message} />
                    <FieldErrorText message={experienceError?.message} />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  className="mt-4"
                  onClick={() => experienceFieldArray.remove(index)}
                >
                  <Trash2 className="size-4" />
                  Remove role
                </Button>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="rounded-[2rem]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-center gap-3 text-sm text-white">
            <input type="checkbox" {...form.register("is_published")} />
            Profile is publicly visible
          </label>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save profile"}
          </Button>
        </div>
        {isPending ? (
          <p className="mt-4 text-sm text-blue-100/78">Saving changes...</p>
        ) : null}
        {resultMessage ? (
          <p
            className={`mt-4 text-sm ${
              resultType === "error" ? "text-red-300" : "text-emerald-300"
            }`}
          >
            {resultMessage}
          </p>
        ) : null}
      </Card>
    </form>
  );
}
