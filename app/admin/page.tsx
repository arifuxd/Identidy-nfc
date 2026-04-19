import Link from "next/link";
import { UsersRound, Shield } from "lucide-react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth/session";
import { getAdminUsers } from "@/lib/db/profiles";

export default async function AdminPage() {
  await requireAdmin();
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
