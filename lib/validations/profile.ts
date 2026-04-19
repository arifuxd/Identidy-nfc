import { z } from "zod";

import { PROFILE_ACCENT_OPTIONS, SOCIAL_PLATFORM_OPTIONS } from "@/lib/constants";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const nullableString = (max: number) =>
  z.preprocess(
    (value) => {
      if (typeof value !== "string") {
        return value;
      }

      const trimmed = value.trim();
      return trimmed.length ? trimmed : null;
    },
    z.string().max(max).nullable().optional(),
  );

export const socialLinkSchema = z.object({
  id: z.string().uuid().optional(),
  platform: z.enum(SOCIAL_PLATFORM_OPTIONS),
  label: nullableString(50),
  url: z.url().max(280),
  sort_order: z.number().int().min(0).default(0),
});

export const experienceSchema = z
  .object({
    id: z.string().uuid().optional(),
    title: z.string().trim().min(1).max(120),
    company: nullableString(120),
    location: nullableString(120),
    description: nullableString(500),
    start_date: nullableString(20),
    end_date: nullableString(20),
    is_current: z.boolean().default(false),
    sort_order: z.number().int().min(0).default(0),
  })
  .refine(
    (value) => !(value.is_current && value.end_date),
    "Current roles should not have an end date.",
  );

export const profileSchema = z.object({
  display_name: z.string().trim().min(2).max(80),
  username: z.string().trim().min(3).max(30),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(50)
    .regex(slugRegex, "Use lowercase letters, numbers, and hyphens only."),
  bio: nullableString(240),
  job_title: nullableString(100),
  company_name: nullableString(100),
  address: nullableString(220),
  phone_home: nullableString(40),
  phone_office: nullableString(40),
  email_home: z.preprocess(
    (value) => {
      if (typeof value !== "string") {
        return value;
      }

      const trimmed = value.trim();
      return trimmed.length ? trimmed : null;
    },
    z.email().max(120).nullable().optional(),
  ),
  email_office: z.preprocess(
    (value) => {
      if (typeof value !== "string") {
        return value;
      }

      const trimmed = value.trim();
      return trimmed.length ? trimmed : null;
    },
    z.email().max(120).nullable().optional(),
  ),
  accent_color: z.enum(PROFILE_ACCENT_OPTIONS).default("#3b82f6"),
  avatar_shape: z.enum(["circle", "rounded"]).default("circle"),
  profile_alignment: z.enum(["center", "left"]).default("center"),
  avatar_path: nullableString(500),
  cover_path: nullableString(500),
  is_published: z.boolean().default(true),
  social_links: z.array(socialLinkSchema).default([]),
  experiences: z.array(experienceSchema).default([]),
});

export type ProfileFormInput = z.input<typeof profileSchema>;
export type ProfileFormValues = z.output<typeof profileSchema>;
