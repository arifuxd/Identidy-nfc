import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { AnalyticsChart } from "@/components/dashboard/analytics-chart";
import { Card } from "@/components/ui/card";
import { getAnalyticsSummary } from "@/lib/analytics/queries";
import { requireUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardAnalyticsPage() {
  const user = await requireUser();
  const analytics = await getAnalyticsSummary(user.id);
  const supabase = await createClient();
  const { data: role } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  return (
    <DashboardShell currentPath="/dashboard/analytics" isAdmin={role?.role === "admin"}>
      <div className="space-y-6">
        <Card className="rounded-[2rem]">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-blue-200/72">
            Analytics
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white">
            Visit activity
          </h1>
          <p className="mt-3 text-sm leading-7 text-muted">
            Recent profile traffic over the last 30 days.
          </p>
          <div className="mt-8">
            <AnalyticsChart
              data={analytics.daily.map((item: { day: string; views: number }) => ({
                day: item.day,
                views: item.views,
              }))}
            />
          </div>
        </Card>

        <div className="card-grid">
          <Card className="rounded-[2rem]">
            <p className="text-sm text-muted">Lifetime</p>
            <p className="mt-3 text-3xl font-semibold text-white">
              {analytics.lifetime}
            </p>
          </Card>
          <Card className="rounded-[2rem]">
            <p className="text-sm text-muted">Last 30 days</p>
            <p className="mt-3 text-3xl font-semibold text-white">
              {analytics.last30Days}
            </p>
          </Card>
          <Card className="rounded-[2rem]">
            <p className="text-sm text-muted">Last 7 days</p>
            <p className="mt-3 text-3xl font-semibold text-white">
              {analytics.last7Days}
            </p>
          </Card>
          <Card className="rounded-[2rem]">
            <p className="text-sm text-muted">Last 24 hours</p>
            <p className="mt-3 text-3xl font-semibold text-white">
              {analytics.last24Hours}
            </p>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
