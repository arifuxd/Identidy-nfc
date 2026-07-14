import Link from "next/link";
import { ArrowUpRight, Eye, Handshake, Link2, PencilLine } from "lucide-react";

import { AnalyticsChart } from "@/components/dashboard/analytics-chart";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAnalyticsSummary } from "@/lib/analytics/queries";
import { requireUser } from "@/lib/auth/session";
import { getConnectionSummary } from "@/lib/db/connections";
import { getProfileBundleForUser } from "@/lib/db/profiles";
import { createClient } from "@/lib/supabase/server";
import { formatCompactNumber } from "@/lib/utils";

type RangeKey = "7d" | "30d" | "lifetime";

const RANGE_OPTIONS: { key: RangeKey; label: string }[] = [
  { key: "7d", label: "Last 7 days" },
  { key: "30d", label: "Last 30 days" },
  { key: "lifetime", label: "Lifetime" },
];

export default async function DashboardOverviewPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const selectedRange =
    typeof resolvedSearchParams.range === "string" &&
    ["7d", "30d", "lifetime"].includes(resolvedSearchParams.range)
      ? (resolvedSearchParams.range as RangeKey)
      : "30d";

  const user = await requireUser();
  const data = await getProfileBundleForUser(user.id);
  const [analytics, connectionStats, supabase] = await Promise.all([
    getAnalyticsSummary(user.id),
    getConnectionSummary(user.id),
    createClient(),
  ]);
  const { data: role } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!data) {
    return null;
  }

  const visitsValue =
    selectedRange === "7d"
      ? analytics.last7Days
      : selectedRange === "30d"
        ? analytics.last30Days
        : analytics.lifetime;
  const connectionValue =
    selectedRange === "7d"
      ? connectionStats.last7Days
      : selectedRange === "30d"
        ? connectionStats.last30Days
        : connectionStats.lifetime;

  return (
    <DashboardShell currentPath="/dashboard" isAdmin={role?.role === "admin"}>
      <div className="space-y-5">
        <Card>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent/80">
            Overview
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
            {data.profile.display_name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Your profile is {data.profile.is_published ? "live" : "hidden"}.
            Keep it updated so visitors can quickly connect with you.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link href="/dashboard/profile">
              <Button size="sm">
                <PencilLine className="size-4" />
                Edit profile
              </Button>
            </Link>
            <Link href={`/${data.profile.slug}`}>
              <Button variant="secondary" size="sm">
                <ArrowUpRight className="size-4" />
                View public page
              </Button>
            </Link>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-foreground">Traffic & connections</h2>
            <div className="flex flex-wrap gap-2">
              {RANGE_OPTIONS.map((option) => (
                <Link key={option.key} href={`/dashboard?range=${option.key}`}>
                  <Button
                    size="sm"
                    variant={selectedRange === option.key ? "primary" : "secondary"}
                  >
                    {option.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-foreground/5 p-3">
              <div className="flex items-center gap-2 text-muted">
                <Eye className="size-4" />
                <span className="text-xs">Profile visits</span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {formatCompactNumber(visitsValue)}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-foreground/5 p-3">
              <div className="flex items-center gap-2 text-muted">
                <Handshake className="size-4" />
                <span className="text-xs">Connection requests</span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {formatCompactNumber(connectionValue)}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-foreground/5 p-3">
              <div className="flex items-center gap-2 text-muted">
                <Link2 className="size-4" />
                <span className="text-xs">Social links</span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {data.socialLinks.length}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <AnalyticsChart
              data={analytics.daily.map((item: { day: string; views: number }) => ({
                day: item.day,
                views: item.views,
              }))}
            />
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}
