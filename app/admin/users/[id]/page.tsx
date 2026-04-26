import { notFound } from "next/navigation";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/session";
import { getAdminUserById } from "@/lib/db/profiles";

type Params = Promise<{ id: string }>;

export default async function AdminUserDetailPage({
  params,
}: {
  params: Params;
}) {
  await requireAdmin();
  const { id } = await params;
  const data = await getAdminUserById(id);

  if (!data) {
    notFound();
  }

  const { profile, role, user } = data;

  return (
    <DashboardShell currentPath="/admin/users" isAdmin>
      <Card className="rounded-[2rem]">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-blue-200/72">
          User detail
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">
          {profile?.display_name ?? user.user_metadata?.display_name ?? user.email}
        </h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
            <p className="text-sm text-muted">Email</p>
            <p className="mt-2 text-white">{user.email ?? "No email"}</p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
            <p className="text-sm text-muted">Role</p>
            <p className="mt-2 capitalize text-white">{role}</p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
            <p className="text-sm text-muted">Profile account</p>
            <p className="mt-2 text-white">
              {profile ? "Has public profile access" : "Admin-only account"}
            </p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
            <p className="text-sm text-muted">Published</p>
            <p className="mt-2 text-white">
              {profile?.is_published ? "Yes" : "No"}
            </p>
          </div>
          {profile ? (
            <>
              <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
                <p className="text-sm text-muted">Username</p>
                <p className="mt-2 text-white">{profile.username}</p>
              </div>
              <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
                <p className="text-sm text-muted">Public URL</p>
                <p className="mt-2 text-white">/{profile.slug}</p>
              </div>
            </>
          ) : null}
          {profile?.bio ? (
            <div className="rounded-3xl border border-white/8 bg-white/4 p-4 md:col-span-2">
              <p className="text-sm text-muted">Bio</p>
              <p className="mt-2 text-white">{profile.bio}</p>
            </div>
          ) : null}
        </div>
      </Card>
    </DashboardShell>
  );
}
