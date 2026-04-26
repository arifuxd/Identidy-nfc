import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

type UserRole = "user" | "admin";

async function requireAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function getCurrentUserRole(userId: string): Promise<UserRole> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .maybeSingle();

  return data?.role === "admin" ? "admin" : "user";
}

export async function getOptionalUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function requireUser() {
  const user = await requireAuthenticatedUser();
  const role = await getCurrentUserRole(user.id);

  if (role !== "user") {
    redirect("/admin");
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireAuthenticatedUser();
  const role = await getCurrentUserRole(user.id);

  if (role !== "admin") {
    redirect("/dashboard");
  }

  return user;
}
