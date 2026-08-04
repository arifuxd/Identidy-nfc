import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2, Plus, Globe } from "lucide-react";

import {
  updateUserBasicInfoAction,
  addProfileRedirectAction,
  deleteProfileRedirectAction,
} from "@/actions/admin";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requireAdmin } from "@/lib/auth/session";
import { getAdminUserById, getAdminUserRedirects } from "@/lib/db/profiles";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ success?: string; error?: string }>;

export default async function AdminUserDetailPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  await requireAdmin();
  const { id } = await params;
  const { success, error } = await searchParams;
  const data = await getAdminUserById(id);

  if (!data) {
    notFound();
  }

  const { profile, role, user } = data;
  const redirects = profile ? await getAdminUserRedirects(id) : [];

  return (
    <DashboardShell currentPath="/admin/users" isAdmin>
      <div className="space-y-6">
        {/* Navigation & Title */}
        <div className="flex items-center justify-between">
          <Link href="/admin/users" className="flex items-center gap-2 text-sm text-muted hover:text-white transition">
            <ArrowLeft className="size-4" />
            Back to user directory
          </Link>
        </div>

        {/* Success/Error Alerts */}
        {success ? (
          <Card className="rounded-[2rem] border-emerald-500/30 bg-emerald-500/10 p-4">
            <p className="text-sm text-emerald-100">{success}</p>
          </Card>
        ) : null}
        {error ? (
          <Card className="rounded-[2rem] border-red-500/30 bg-red-500/10 p-4">
            <p className="text-sm text-red-100">{error}</p>
          </Card>
        ) : null}

        {/* Grid layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main edit column */}
          <div className="lg:col-span-2 space-y-6">
            {profile ? (
              <Card className="rounded-[2rem] space-y-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-blue-200/72">
                    Profile Edit
                  </p>
                  <h1 className="mt-3 text-3xl font-semibold text-white">
                    Edit basic information
                  </h1>
                </div>

                <form action={updateUserBasicInfoAction} className="space-y-4">
                  <input type="hidden" name="user_id" value={id} />

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted uppercase tracking-[0.1em]">Name</label>
                    <Input
                      name="display_name"
                      defaultValue={profile.display_name}
                      placeholder="Display Name"
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted uppercase tracking-[0.1em]">Username</label>
                      <Input
                        name="username"
                        defaultValue={profile.username}
                        placeholder="username"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted uppercase tracking-[0.1em]">Profile Slug</label>
                      <Input
                        name="slug"
                        defaultValue={profile.slug}
                        placeholder="slug"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted uppercase tracking-[0.1em]">Bio</label>
                    <textarea
                      name="bio"
                      defaultValue={profile.bio ?? ""}
                      placeholder="User biography..."
                      className="input-base w-full min-h-[100px] py-3 text-white placeholder-white/30"
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </Card>
            ) : (
              <Card className="rounded-[2rem]">
                <p className="text-sm text-muted">
                  This user has a role of <strong>{role}</strong> and does not have a public profile. Public profiles are only managed for regular user accounts.
                </p>
              </Card>
            )}

            {/* Redirects Section (only for user with profiles) */}
            {profile && (
              <Card className="rounded-[2rem] space-y-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-blue-200/72">
                    Routing & Aliases
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">
                    Manage URL Redirects
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    Add alternative URLs that will automatically redirect to the user's default URL (<code>/{profile.slug}</code>).
                  </p>
                </div>

                {/* Add new redirect form */}
                <form action={addProfileRedirectAction} className="flex gap-2">
                  <input type="hidden" name="user_id" value={id} />
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">
                      /
                    </span>
                    <Input
                      name="redirect_slug"
                      placeholder="alternative-url-slug"
                      className="pl-6"
                      required
                    />
                  </div>
                  <Button type="submit" variant="secondary" className="flex items-center gap-1">
                    <Plus className="size-3.5" /> Add URL
                  </Button>
                </form>

                {/* Redirects List */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold text-muted uppercase tracking-[0.1em]">
                    Active Redirects
                  </p>
                  {redirects.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/8 p-6 text-center">
                      <p className="text-sm text-muted">No active redirects configured for this user.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-white/8 rounded-2xl border border-white/8 bg-white/2 overflow-hidden">
                      {redirects.map((redir) => (
                        <div key={redir.id} className="flex items-center justify-between p-4 hover:bg-white/2 transition">
                          <div className="flex items-center gap-2">
                            <Globe className="size-4 text-blue-400" />
                            <div>
                              <span className="text-sm font-medium text-white">/{redir.slug}</span>
                              <span className="mx-2 text-xs text-muted">→</span>
                              <span className="text-xs text-muted">/{profile.slug}</span>
                            </div>
                          </div>
                          <form action={deleteProfileRedirectAction}>
                            <input type="hidden" name="user_id" value={id} />
                            <input type="hidden" name="redirect_id" value={redir.id} />
                            <input type="hidden" name="slug" value={redir.slug} />
                            <Button type="submit" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2">
                              <Trash2 className="size-4" />
                            </Button>
                          </form>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>

          {/* System details column */}
          <div className="space-y-6">
            <Card className="rounded-[2rem] space-y-4">
              <h3 className="text-lg font-semibold text-white">System details</h3>
              
              <div className="space-y-3 divide-y divide-white/8 text-sm">
                <div className="py-2">
                  <span className="block text-xs text-muted">Email address</span>
                  <span className="text-white font-medium">{user.email ?? "No email"}</span>
                </div>
                <div className="py-2 pt-3">
                  <span className="block text-xs text-muted">Role</span>
                  <span className="capitalize text-white font-medium">{role}</span>
                </div>
                <div className="py-2 pt-3">
                  <span className="block text-xs text-muted">Public status</span>
                  <span className="text-white font-medium">
                    {profile?.is_published ? "Published" : "Hidden / Not Published"}
                  </span>
                </div>
                <div className="py-2 pt-3">
                  <span className="block text-xs text-muted">Created at</span>
                  <span className="text-white font-medium">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : "Unknown"}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
