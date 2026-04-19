"use server";

import { redirect } from "next/navigation";

import { authSchema } from "@/lib/validations/auth";
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

  redirect("/dashboard");
}

export async function signupAction(formData: FormData) {
  const values = authSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp(values);

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/dashboard");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
