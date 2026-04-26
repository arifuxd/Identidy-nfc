import Link from "next/link";
import { ArrowUpRight, Eye, Link2, PencilLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireUser } from "@/lib/auth/session";
import { getAnalyticsSummary } from "@/lib/analytics/queries";
import { getProfileBundleForUser } from "@/lib/db/profiles";
import { formatCompactNumber } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardOverviewPage() {
  const user = await requireUser();
  const data = await getProfileBundleForUser(user.id);
  const analytics = await getAnalyticsSummary(user.id);
  const supabase = await createClient();
  const { data: role } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!data) {
    return null;
  }

  return (
    <DashboardShell currentPath="/dashboard" isAdmin={role?.role === "admin"}>
      <div className="space-y-6">
        <Card className="rounded-[2rem]">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-blue-200/72">
            Overview
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white">
            {data.profile.display_name}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            Your public profile is {data.profile.is_published ? "live" : "hidden"}.
            Keep it updated so every NFC tap leads to a clean, current mobile page.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/profile">
              <Button>
                <PencilLine className="size-4" />
                Edit profile
              </Button>
            </Link>
            <Link href={`/${data.profile.slug}`}>
              <Button variant="secondary">
                <ArrowUpRight className="size-4" />
                View public page
              </Button>
            </Link>
          </div>
        </Card>

        <div className="card-grid">
          <Card className="rounded-[2rem]">
            <div className="flex items-center gap-3 text-primary">
              <Eye className="size-4" />
              <span className="text-sm text-blue-100/72">Lifetime visits</span>
            </div>
            <p className="mt-5 text-3xl font-semibold text-white">
              {formatCompactNumber(analytics.lifetime)}
            </p>
          </Card>
          <Card className="rounded-[2rem]">
            <div className="flex items-center gap-3 text-primary">
              <Eye className="size-4" />
              <span className="text-sm text-blue-100/72">Last 30 days</span>
            </div>
            <p className="mt-5 text-3xl font-semibold text-white">
              {formatCompactNumber(analytics.last30Days)}
            </p>
          </Card>
          <Card className="rounded-[2rem]">
            <div className="flex items-center gap-3 text-primary">
              <Eye className="size-4" />
              <span className="text-sm text-blue-100/72">Last 7 days</span>
            </div>
            <p className="mt-5 text-3xl font-semibold text-white">
              {formatCompactNumber(analytics.last7Days)}
            </p>
          </Card>
          <Card className="rounded-[2rem]">
            <div className="flex items-center gap-3 text-primary">
              <Link2 className="size-4" />
              <span className="text-sm text-blue-100/72">Social links</span>
            </div>
            <p className="mt-5 text-3xl font-semibold text-white">
              {data.socialLinks.length}
            </p>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
