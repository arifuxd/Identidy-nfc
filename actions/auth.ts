"use server";

import { redirect } from "next/navigation";

import { authSchema } from "@/lib/validations/auth";
import { getCurrentUserRole } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";

export async function loginAction(formData: FormData) {
  const values = authSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(values);

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?error=Unable%20to%20load%20the%20user%20session.");
  }

  const role = await getCurrentUserRole(user.id);

  if (role === "admin") {
    await supabase.auth.signOut();
    redirect("/admin?error=Admin%20accounts%20must%20sign%20in%20from%20the%20admin%20portal.");
  }

  redirect("/dashboard");
}

export async function adminLoginAction(formData: FormData) {
  const values = authSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(values);

  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message)}`);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin?error=Unable%20to%20load%20the%20user%20session.");
  }

  const role = await getCurrentUserRole(user.id);

  if (role !== "admin") {
    await supabase.auth.signOut();
    redirect("/admin?error=This%20portal%20is%20for%20admin%20accounts%20only.");
  }

  redirect("/admin");
}

export async function signupAction() {
  redirect(
    "/login?error=Account%20registration%20is%20disabled.%20Please%20contact%20an%20administrator.",
  );
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
