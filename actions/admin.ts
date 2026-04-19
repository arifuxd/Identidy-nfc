"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth/session";
import { normalizeSlug } from "@/lib/slug";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

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
    },
  });

  if (error || !data.user) {
    redirect(
      `/admin/users?error=${encodeURIComponent(
        error?.message ?? "Unable to create user.",
      )}`,
    );
  }

  const baseSlug = normalizeSlug(displayName || email.split("@")[0]);
  const { data: slug } = await supabase.rpc("generate_unique_slug", {
    base_slug: baseSlug,
    user_id: data.user.id,
  });

  await supabase
    .from("profiles")
    .update({
      display_name: displayName || email,
      slug: slug ?? baseSlug,
      username: slug ?? baseSlug,
    })
    .eq("id", data.user.id);

  await supabase.from("user_roles").upsert({
    user_id: data.user.id,
    role,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/users");
  redirect("/admin/users?success=User%20created%20successfully.");
}

export async function updateUserRoleAction(formData: FormData) {
  await requireAdmin();
  const supabase = createServiceRoleClient();

  const userId = String(formData.get("user_id"));
  const role = String(formData.get("role")) === "admin" ? "admin" : "user";

  const { error } = await supabase.from("user_roles").upsert({
    user_id: userId,
    role,
  });

  if (error) {
    redirect(`/admin/users?error=${encodeURIComponent(error.message)}`);
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
