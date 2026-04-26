import { cache } from "react";

import { createClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

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
  const supabase = createServiceRoleClient();

  const [
    {
      data: { users },
      error: usersError,
    },
    { data: profiles, error: profilesError },
    { data: roles, error: rolesError },
  ] = await Promise.all([
    supabase.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    }),
    supabase.from("profiles").select("*"),
    supabase.from("user_roles").select("*"),
  ]);

  if (usersError) {
    throw usersError;
  }

  if (profilesError) {
    throw profilesError;
  }

  if (rolesError) {
    throw rolesError;
  }

  const profileMap = new Map((profiles ?? []).map((profile) => [profile.id, profile]));
  const roleMap = new Map((roles ?? []).map((item) => [item.user_id, item.role]));

  return users
    .map((user) => {
      const profile = profileMap.get(user.id);
      const fallbackSlug = user.email?.split("@")[0] ?? user.id.slice(0, 8);

      return {
        id: user.id,
        email: user.email ?? null,
        created_at: user.created_at,
        role: roleMap.get(user.id) ?? "user",
        hasProfile: Boolean(profile),
        display_name:
          profile?.display_name ??
          String(user.user_metadata?.display_name ?? user.email ?? "Unnamed account"),
        username: profile?.username ?? null,
        slug: profile?.slug ?? fallbackSlug,
        is_published: profile?.is_published ?? false,
        bio: profile?.bio ?? null,
      };
    })
    .sort((left, right) => right.created_at.localeCompare(left.created_at));
}

export async function getAdminUserById(userId: string) {
  const supabase = createServiceRoleClient();

  const [
    { data: profile, error: profileError },
    { data: roleRow, error: roleError },
    { data: userData, error: userError },
  ] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
    supabase.from("user_roles").select("role").eq("user_id", userId).maybeSingle(),
    supabase.auth.admin.getUserById(userId),
  ]);

  if (profileError) {
    throw profileError;
  }

  if (roleError) {
    throw roleError;
  }

  if (userError) {
    throw userError;
  }

  if (!userData.user) {
    return null;
  }

  return {
    user: userData.user,
    profile,
    role: roleRow?.role ?? "user",
  };
}
