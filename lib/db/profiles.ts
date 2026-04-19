import { cache } from "react";

import { createClient } from "@/lib/supabase/server";

export const getProfileBundleBySlug = cache(async (slug: string) => {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (!profile) {
    return null;
  }

  const [{ data: socialLinks }, { data: experiences }] = await Promise.all([
    supabase
      .from("social_links")
      .select("*")
      .eq("profile_id", profile.id)
      .order("sort_order", { ascending: true }),
    supabase
      .from("experiences")
      .select("*")
      .eq("profile_id", profile.id)
      .order("sort_order", { ascending: true }),
  ]);

  return {
    profile,
    socialLinks: socialLinks ?? [],
    experiences: experiences ?? [],
  };
});

export async function getProfileBundleForUser(userId: string) {
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!profile) {
    return null;
  }

  const [{ data: socialLinks }, { data: experiences }] = await Promise.all([
    supabase
      .from("social_links")
      .select("*")
      .eq("profile_id", userId)
      .order("sort_order", { ascending: true }),
    supabase
      .from("experiences")
      .select("*")
      .eq("profile_id", userId)
      .order("sort_order", { ascending: true }),
  ]);

  return {
    profile,
    socialLinks: socialLinks ?? [],
    experiences: experiences ?? [],
  };
}

export async function getAdminUsers() {
  const supabase = await createClient();

  const [{ data: profiles, error: profilesError }, { data: roles, error: rolesError }] =
    await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("*"),
    ]);

  if (profilesError) {
    throw profilesError;
  }

  if (rolesError) {
    throw rolesError;
  }

  const roleMap = new Map((roles ?? []).map((item) => [item.user_id, item.role]));

  return (profiles ?? []).map((profile) => ({
    ...profile,
    role: roleMap.get(profile.id) ?? "user",
  }));
}
