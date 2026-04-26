"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth/session";
import { normalizeSlug } from "@/lib/slug";
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
