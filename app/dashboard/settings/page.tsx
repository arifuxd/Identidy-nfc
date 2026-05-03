import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ChangePasswordForm } from "@/components/dashboard/change-password-form";
import { Card } from "@/components/ui/card";
import { requireUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardSettingsPage() {
  const user = await requireUser();
  const supabase = await createClient();
  const [{ data: role }, { data: profile }] = await Promise.all([
    supabase.from("user_roles").select("role").eq("user_id", user.id).maybeSingle(),
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
  ]);

  return (
    <DashboardShell currentPath="/dashboard/settings" isAdmin={role?.role === "admin"}>
      <Card>
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-blue-200/72">
          Settings
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Account</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-white/8 bg-white/4 p-4">
            <p className="text-sm text-muted">Email</p>
            <p className="mt-2 text-base text-white">{user.email}</p>
          </div>
          <div className="rounded-xl border border-white/8 bg-white/4 p-4">
            <p className="text-sm text-muted">Public URL</p>
            <p className="mt-2 text-base text-white">
              /{profile?.slug ?? "your-slug"}
            </p>
          </div>
          <div className="rounded-xl border border-white/8 bg-white/4 p-4">
            <p className="text-sm text-muted">Role</p>
            <p className="mt-2 text-base capitalize text-white">
              {role?.role ?? "user"}
            </p>
          </div>
          <div className="rounded-xl border border-white/8 bg-white/4 p-4">
            <p className="text-sm text-muted">Publishing</p>
            <p className="mt-2 text-base text-white">
              {profile?.is_published ? "Visible to the public" : "Hidden"}
            </p>
          </div>
        </div>
        <div className="mt-6 rounded-xl border border-white/8 bg-white/4 p-4">
          <h2 className="text-lg font-semibold text-white">Change password</h2>
          <p className="mt-1 text-sm text-muted">Keep your account secure by updating your password.</p>
          <div className="mt-4">
            <ChangePasswordForm />
          </div>
        </div>
      </Card>
    </DashboardShell>
  );
}
