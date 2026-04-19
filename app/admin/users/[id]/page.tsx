import { notFound } from "next/navigation";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";

type Params = Promise<{ id: string }>;

export default async function AdminUserDetailPage({
  params,
}: {
  params: Params;
}) {
  await requireAdmin();
  const { id } = await params;
  const supabase = await createClient();
  const [{ data }, { data: roleRow }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", id).maybeSingle(),
    supabase.from("user_roles").select("role").eq("user_id", id).maybeSingle(),
  ]);

  if (!data) {
    notFound();
  }

  const role = roleRow?.role ?? "user";

  return (
    <DashboardShell currentPath="/admin/users" isAdmin>
      <Card className="rounded-[2rem]">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-blue-200/72">
          User detail
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">
          {data.display_name}
        </h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
            <p className="text-sm text-muted">Username</p>
            <p className="mt-2 text-white">{data.username}</p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
            <p className="text-sm text-muted">Slug</p>
            <p className="mt-2 text-white">{data.slug}</p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
            <p className="text-sm text-muted">Role</p>
            <p className="mt-2 capitalize text-white">{role}</p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-white/4 p-4">
            <p className="text-sm text-muted">Published</p>
            <p className="mt-2 text-white">
              {data.is_published ? "Yes" : "No"}
            </p>
          </div>
          {data.bio ? (
            <div className="rounded-3xl border border-white/8 bg-white/4 p-4 md:col-span-2">
              <p className="text-sm text-muted">Bio</p>
              <p className="mt-2 text-white">{data.bio}</p>
            </div>
          ) : null}
        </div>
      </Card>
    </DashboardShell>
  );
}
