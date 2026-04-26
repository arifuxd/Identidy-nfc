import { redirect } from "next/navigation";
import Link from "next/link";
import { UsersRound, Shield } from "lucide-react";

import { adminLoginAction } from "@/actions/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getCurrentUserRole, getOptionalUser } from "@/lib/auth/session";
import { getAdminUsers } from "@/lib/db/profiles";

type SearchParams = Promise<{ error?: string }>;

export default async function AdminPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const user = await getOptionalUser();
  const { error } = await searchParams;

  if (!user) {
    return (
      <AuthCard
        title="Admin portal"
        description="Sign in with an administrator account to manage users and workspace access."
        footerLabel="User account?"
        footerHref="/login"
        footerAction="Go to user login"
      >
        {error ? <p className="mb-4 text-sm text-red-300">{error}</p> : null}
        <form action={adminLoginAction} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-blue-50/86" htmlFor="email">
              Email
            </label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-blue-50/86" htmlFor="password">
              Password
            </label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button className="w-full">Sign in as admin</Button>
        </form>
      </AuthCard>
    );
  }

  const role = await getCurrentUserRole(user.id);

  if (role !== "admin") {
    redirect("/dashboard");
  }

  const users = await getAdminUsers();
  const admins = users.filter((user) => user.role === "admin").length;

  return (
    <DashboardShell currentPath="/admin" isAdmin>
      <div className="space-y-6">
        <Card className="rounded-[2rem]">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-blue-200/72">
            Admin
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white">
            Workspace management
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            Create users, adjust roles, and maintain the SaaS workspace from one
            place.
          </p>
          <div className="mt-6">
            <Link href="/admin/users">
              <Button>Manage users</Button>
            </Link>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="rounded-[2rem]">
            <div className="flex items-center gap-3 text-primary">
              <UsersRound className="size-4" />
              <span className="text-sm text-blue-100/72">Total users</span>
            </div>
            <p className="mt-4 text-3xl font-semibold text-white">
              {users.length}
            </p>
          </Card>
          <Card className="rounded-[2rem]">
            <div className="flex items-center gap-3 text-primary">
              <Shield className="size-4" />
              <span className="text-sm text-blue-100/72">Admins</span>
            </div>
            <p className="mt-4 text-3xl font-semibold text-white">{admins}</p>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
