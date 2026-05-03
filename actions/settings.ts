"use server";

import { z } from "zod";

import { requireUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8).max(72),
    newPassword: z.string().min(8).max(72),
    confirmPassword: z.string().min(8).max(72),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match.",
    path: ["confirmPassword"],
  });

export async function changePasswordAction(values: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  const parsed = changePasswordSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check your input." };
  }

  const user = await requireUser();
  if (!user.email) {
    return { error: "Unable to validate your account email." };
  }

  const supabase = await createClient();
  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: parsed.data.currentPassword,
  });

  if (verifyError) {
    return { error: "Current password is incorrect." };
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: parsed.data.newPassword,
  });

  if (updateError) {
    return { error: updateError.message };
  }

  return { success: "Password changed successfully." };
}
