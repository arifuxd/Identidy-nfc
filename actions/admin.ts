"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth/session";
import { normalizeSlug, isReservedSlug } from "@/lib/slug";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

async function ensureUserProfile(
  userId: string,
  email: string | null | undefined,
  displayName: string,
) {
  const supabase = createServiceRoleClient();
  const fallbackName = displayName || email || "User";
  const baseSlug = normalizeSlug(fallbackName || email?.split("@")[0] || "user");
  const { data: slug } = await supabase.rpc("generate_unique_slug", {
    base_slug: baseSlug,
    user_id: userId,
  });

  await supabase.from("profiles").upsert({
    id: userId,
    display_name: fallbackName,
    username: slug ?? baseSlug,
    slug: slug ?? baseSlug,
    email_public: email ?? null,
    is_published: true,
  });
}

async function removeAdminProfile(userId: string) {
  const supabase = createServiceRoleClient();

  await supabase.from("profile_views").delete().eq("profile_id", userId);
  await supabase.from("social_links").delete().eq("profile_id", userId);
  await supabase.from("experiences").delete().eq("profile_id", userId);
  await supabase.from("profiles").delete().eq("id", userId);
}

export async function createUserAction(formData: FormData) {
  await requireAdmin();
  const supabase = createServiceRoleClient();

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "").trim();
  const displayName = String(formData.get("display_name") ?? "").trim();
  const role = String(formData.get("role") ?? "user") === "admin" ? "admin" : "user";

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      display_name: displayName,
      account_type: role,
    },
  });

  if (error || !data.user) {
    redirect(
      `/admin/users?error=${encodeURIComponent(
        error?.message ?? "Unable to create user.",
      )}`,
    );
  }

  await supabase.from("user_roles").upsert({
    user_id: data.user.id,
    role,
  });

  if (role === "admin") {
    await removeAdminProfile(data.user.id);
  } else {
    await ensureUserProfile(data.user.id, data.user.email, displayName || email);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/users");
  redirect("/admin/users?success=User%20created%20successfully.");
}

export async function updateUserRoleAction(formData: FormData) {
  await requireAdmin();
  const supabase = createServiceRoleClient();

  const userId = String(formData.get("user_id"));
  const role = String(formData.get("role")) === "admin" ? "admin" : "user";
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.admin.getUserById(userId);

  if (userError || !user) {
    redirect("/admin/users?error=Unable%20to%20load%20that%20account.");
  }

  const { error } = await supabase.from("user_roles").upsert({
    user_id: userId,
    role,
  });

  if (error) {
    redirect(`/admin/users?error=${encodeURIComponent(error.message)}`);
  }

  await supabase.auth.admin.updateUserById(userId, {
    user_metadata: {
      ...user.user_metadata,
      account_type: role,
    },
  });

  if (role === "admin") {
    await removeAdminProfile(userId);
  } else {
    const displayName =
      String(user.user_metadata?.display_name ?? "").trim() ||
      user.email ||
      "User";
    await ensureUserProfile(userId, user.email, displayName);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${userId}`);
  redirect("/admin/users?success=Role%20updated%20successfully.");
}

export async function deleteUserAction(formData: FormData) {
  await requireAdmin();
  const supabase = createServiceRoleClient();
  const userId = String(formData.get("user_id"));

  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    redirect(`/admin/users?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/users");
  redirect("/admin/users?success=User%20deleted%20successfully.");
}

export async function updateUserBasicInfoAction(formData: FormData) {
  await requireAdmin();
  const supabase = createServiceRoleClient();

  const userId = String(formData.get("user_id"));
  const displayName = String(formData.get("display_name") ?? "").trim();
  const username = String(formData.get("username") ?? "").trim().toLowerCase();
  const slug = normalizeSlug(String(formData.get("slug") ?? ""));
  const bio = String(formData.get("bio") ?? "").trim();

  if (displayName.length < 2) {
    redirect(`/admin/users/${userId}?error=Name must be at least 2 characters.`);
  }
  if (username.length < 3) {
    redirect(`/admin/users/${userId}?error=Username must be at least 3 characters.`);
  }
  if (slug.length < 3) {
    redirect(`/admin/users/${userId}?error=Slug must be at least 3 characters.`);
  }

  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(slug)) {
    redirect(`/admin/users/${userId}?error=Slug can only contain lowercase letters, numbers, and hyphens.`);
  }

  if (isReservedSlug(slug)) {
    redirect(`/admin/users/${userId}?error=That slug is reserved.`);
  }

  // Check if slug is taken by another profile
  const { data: existingProfileBySlug } = await supabase
    .from("profiles")
    .select("id")
    .eq("slug", slug)
    .neq("id", userId)
    .maybeSingle();

  if (existingProfileBySlug) {
    redirect(`/admin/users/${userId}?error=That slug is already taken by another profile.`);
  }

  // Check if slug is taken by a redirect
  const { data: existingRedirectBySlug } = await supabase
    .from("profile_redirects")
    .select("id, profile_id")
    .eq("slug", slug)
    .maybeSingle();

  if (existingRedirectBySlug) {
    redirect(`/admin/users/${userId}?error=That slug is already taken by a redirect alias.`);
  }

  // Check if username is taken by another profile
  const { data: existingProfileByUsername } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .neq("id", userId)
    .maybeSingle();

  if (existingProfileByUsername) {
    redirect(`/admin/users/${userId}?error=That username is already taken.`);
  }

  // Fetch the old profile to revalidate its old slug path
  const { data: oldProfile } = await supabase
    .from("profiles")
    .select("slug")
    .eq("id", userId)
    .maybeSingle();

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: displayName,
      username,
      slug,
      bio: bio || null,
    })
    .eq("id", userId);

  if (error) {
    redirect(`/admin/users/${userId}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/users");
  revalidatePath(`/admin/users/${userId}`);
  if (oldProfile?.slug) {
    revalidatePath(`/${oldProfile.slug}`);
  }
  revalidatePath(`/${slug}`);

  redirect(`/admin/users/${userId}?success=User profile updated successfully.`);
}

export async function addProfileRedirectAction(formData: FormData) {
  await requireAdmin();
  const supabase = createServiceRoleClient();

  const userId = String(formData.get("user_id"));
  const rawSlug = String(formData.get("redirect_slug") ?? "");
  const slug = normalizeSlug(rawSlug);

  if (slug.length < 3) {
    redirect(`/admin/users/${userId}?error=Redirect slug must be at least 3 characters.`);
  }

  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(slug)) {
    redirect(`/admin/users/${userId}?error=Redirect slug can only contain lowercase letters, numbers, and hyphens.`);
  }

  if (isReservedSlug(slug)) {
    redirect(`/admin/users/${userId}?error=That slug is reserved.`);
  }

  // Check if clashing with any profile slug
  const { data: clashingProfile } = await supabase
    .from("profiles")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (clashingProfile) {
    redirect(`/admin/users/${userId}?error=This slug is already in use by a profile.`);
  }

  // Check if clashing with any existing redirect
  const { data: clashingRedirect } = await supabase
    .from("profile_redirects")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (clashingRedirect) {
    redirect(`/admin/users/${userId}?error=This redirect slug is already taken.`);
  }

  const { error } = await supabase
    .from("profile_redirects")
    .insert({
      profile_id: userId,
      slug,
    });

  if (error) {
    redirect(`/admin/users/${userId}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath(`/admin/users/${userId}`);
  revalidatePath(`/${slug}`);

  redirect(`/admin/users/${userId}?success=Redirect URL added successfully.`);
}

export async function deleteProfileRedirectAction(formData: FormData) {
  await requireAdmin();
  const supabase = createServiceRoleClient();

  const userId = String(formData.get("user_id"));
  const redirectId = String(formData.get("redirect_id"));
  const slug = String(formData.get("slug"));

  const { error } = await supabase
    .from("profile_redirects")
    .delete()
    .eq("id", redirectId)
    .eq("profile_id", userId);

  if (error) {
    redirect(`/admin/users/${userId}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath(`/admin/users/${userId}`);
  if (slug) {
    revalidatePath(`/${slug}`);
  }

  redirect(`/admin/users/${userId}?success=Redirect URL deleted successfully.`);
}
