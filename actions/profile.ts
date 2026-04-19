"use server";

import { revalidatePath } from "next/cache";

import { requireUser } from "@/lib/auth/session";
import { normalizeSlug, isReservedSlug } from "@/lib/slug";
import { createClient } from "@/lib/supabase/server";
import {
  profileSchema,
  type ProfileFormValues,
} from "@/lib/validations/profile";

export async function saveProfileAction(values: ProfileFormValues) {
  const user = await requireUser();
  const supabase = await createClient();
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("slug")
    .eq("id", user.id)
    .maybeSingle();

  const parsed = profileSchema.parse({
    ...values,
    slug: normalizeSlug(values.slug),
  });

  if (isReservedSlug(parsed.slug)) {
    return { error: "That slug is reserved." };
  }

  const { data: available, error: availabilityError } = await supabase.rpc(
    "slug_available",
    {
      desired_slug: parsed.slug,
      current_profile_id: user.id,
    },
  );

  if (availabilityError || !available) {
    return { error: "That slug is already taken." };
  }

  const { data: updatedProfile, error: profileError } = await supabase
    .from("profiles")
    .update({
      display_name: parsed.display_name,
      username: parsed.username,
      slug: parsed.slug,
      bio: parsed.bio ?? null,
      job_title: parsed.job_title ?? null,
      company_name: parsed.company_name ?? null,
      address: parsed.address ?? null,
      phone_public: parsed.phone_public ?? null,
      email_public: parsed.email_public ?? null,
      avatar_path: parsed.avatar_path ?? null,
      cover_path: parsed.cover_path ?? null,
      is_published: parsed.is_published,
    })
    .eq("id", user.id)
    .select("id")
    .maybeSingle();

  if (profileError) {
    return { error: profileError.message };
  }

  if (!updatedProfile) {
    return {
      error:
        "Profile row not found for this account. Please run the latest Supabase migration and try again.",
    };
  }

  const { error: deleteLinksError } = await supabase
    .from("social_links")
    .delete()
    .eq("profile_id", user.id);

  if (deleteLinksError) {
    return { error: deleteLinksError.message };
  }

  const { error: deleteExperiencesError } = await supabase
    .from("experiences")
    .delete()
    .eq("profile_id", user.id);

  if (deleteExperiencesError) {
    return { error: deleteExperiencesError.message };
  }

  if (parsed.social_links.length) {
    const { error } = await supabase.from("social_links").insert(
      parsed.social_links.map((item, index) => ({
        profile_id: user.id,
        platform: item.platform,
        label: item.label ?? null,
        url: item.url,
        sort_order: index,
      })),
    );

    if (error) {
      return { error: error.message };
    }
  }

  if (parsed.experiences.length) {
    const { error } = await supabase.from("experiences").insert(
      parsed.experiences.map((item, index) => ({
        profile_id: user.id,
        title: item.title,
        company: item.company ?? null,
        location: item.location ?? null,
        description: item.description ?? null,
        start_date: item.start_date ?? null,
        end_date: item.end_date ?? null,
        is_current: item.is_current,
        sort_order: index,
      })),
    );

    if (error) {
      return { error: error.message };
    }
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/profile");
  revalidatePath("/dashboard/analytics");
  if (existingProfile?.slug) {
    revalidatePath(`/p/${existingProfile.slug}`);
  }
  revalidatePath(`/p/${parsed.slug}`);

  return { success: "Profile updated successfully." };
}
