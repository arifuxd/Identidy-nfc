import Link from "next/link";

import {
  createUserAction,
  deleteUserAction,
  updateUserRoleAction,
} from "@/actions/admin";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { requireAdmin } from "@/lib/auth/session";
import { getAdminUsers } from "@/lib/db/profiles";

type SearchParams = Promise<{ success?: string; error?: string }>;

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  await requireAdmin();
  const users = await getAdminUsers();
  const { success, error } = await searchParams;

  return (
    <DashboardShell currentPath="/admin/users" isAdmin>
      <div className="space-y-6">
        {success ? (
          <Card className="rounded-[2rem] border-success/30 bg-emerald-500/10">
            <p className="text-sm text-emerald-100">{success}</p>
          </Card>
        ) : null}
        {error ? (
          <Card className="rounded-[2rem] border-red-400/30 bg-red-500/10">
            <p className="text-sm text-red-100">{error}</p>
          </Card>
        ) : null}
        <Card className="rounded-[2rem]">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-blue-200/72">
            New user
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white">
            Create account
          </h1>
          <form action={createUserAction} className="mt-6 grid gap-4 md:grid-cols-2">
            <Input name="display_name" placeholder="Display name" required />
            <Input name="email" placeholder="Email" type="email" required />
            <Input name="password" placeholder="Temporary password" required />
            <select name="role" className="input-base">
              <option value="user" className="bg-[#0b1728]">
                User
              </option>
              <option value="admin" className="bg-[#0b1728]">
                Admin
              </option>
            </select>
            <div className="md:col-span-2">
              <Button>Create user</Button>
            </div>
          </form>
        </Card>

        <Card className="rounded-[2rem]">
          <h2 className="text-2xl font-semibold text-white">User directory</h2>
          <div className="mt-6 space-y-4">
            {users.map((user) => {
              const role = user.role;

              return (
                <div
                  key={user.id}
                  className="rounded-3xl border border-white/8 bg-white/4 p-4"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-white">
                        {user.display_name}
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        /p/{user.slug} · {role}
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <form action={updateUserRoleAction} className="flex gap-2">
                        <input type="hidden" name="user_id" value={user.id} />
                        <select
                          name="role"
                          defaultValue={role}
                          className="input-base min-w-36"
                        >
                          <option value="user" className="bg-[#0b1728]">
                            User
                          </option>
                          <option value="admin" className="bg-[#0b1728]">
                            Admin
                          </option>
                        </select>
                        <Button variant="secondary">Save role</Button>
                      </form>
                      <Link href={`/admin/users/${user.id}`}>
                        <Button variant="secondary">Details</Button>
                      </Link>
                      <form action={deleteUserAction}>
                        <input type="hidden" name="user_id" value={user.id} />
                        <Button variant="danger">Delete</Button>
                      </form>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}
