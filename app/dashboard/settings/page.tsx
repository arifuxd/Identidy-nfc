import { DashboardShell } from "@/components/dashboard/dashboard-shell";
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
      <Card className="rounded-[2rem]">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-blue-200/72">
          Settings
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Account</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
            <p className="text-sm text-muted">Email</p>
            <p className="mt-2 text-base text-white">{user.email}</p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
            <p className="text-sm text-muted">Public URL</p>
            <p className="mt-2 text-base text-white">
              /{profile?.slug ?? "your-slug"}
            </p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
            <p className="text-sm text-muted">Role</p>
            <p className="mt-2 text-base capitalize text-white">
              {role?.role ?? "user"}
            </p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
            <p className="text-sm text-muted">Publishing</p>
            <p className="mt-2 text-base text-white">
              {profile?.is_published ? "Visible to the public" : "Hidden"}
            </p>
          </div>
        </div>
      </Card>
    </DashboardShell>
  );
}
