import { subDays, subHours } from "date-fns";

import { createClient } from "@/lib/supabase/server";

function toIso(date: Date) {
  return date.toISOString();
}

export async function getAnalyticsSummary(profileId: string) {
  const supabase = await createClient();
  const now = new Date();

  const [lifetime, last30Days, last7Days, last24Hours, daily] =
    await Promise.all([
      supabase
        .from("profile_views")
        .select("*", { count: "exact", head: true })
        .eq("profile_id", profileId),
      supabase
        .from("profile_views")
        .select("*", { count: "exact", head: true })
        .eq("profile_id", profileId)
        .gte("viewed_at", toIso(subDays(now, 30))),
      supabase
        .from("profile_views")
        .select("*", { count: "exact", head: true })
        .eq("profile_id", profileId)
        .gte("viewed_at", toIso(subDays(now, 7))),
      supabase
        .from("profile_views")
        .select("*", { count: "exact", head: true })
        .eq("profile_id", profileId)
        .gte("viewed_at", toIso(subHours(now, 24))),
      supabase.rpc("profile_views_daily", {
        target_profile_id: profileId,
        from_date: toIso(subDays(now, 30)),
      }),
    ]);

  return {
    lifetime: lifetime.count ?? 0,
    last30Days: last30Days.count ?? 0,
    last7Days: last7Days.count ?? 0,
    last24Hours: last24Hours.count ?? 0,
    daily: daily.data ?? [],
  };
}
