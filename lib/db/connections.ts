import { createClient } from "@/lib/supabase/server";

export async function getConnectionsForUser(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profile_connections")
    .select("*")
    .eq("profile_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getConnectionSummary(profileId: string) {
  const supabase = await createClient();
  const now = new Date();
  const from7Days = new Date(now);
  from7Days.setDate(now.getDate() - 7);
  const from30Days = new Date(now);
  from30Days.setDate(now.getDate() - 30);

  const [lifetime, last30Days, last7Days] = await Promise.all([
    supabase
      .from("profile_connections")
      .select("*", { count: "exact", head: true })
      .eq("profile_id", profileId),
    supabase
      .from("profile_connections")
      .select("*", { count: "exact", head: true })
      .eq("profile_id", profileId)
      .gte("created_at", from30Days.toISOString()),
    supabase
      .from("profile_connections")
      .select("*", { count: "exact", head: true })
      .eq("profile_id", profileId)
      .gte("created_at", from7Days.toISOString()),
  ]);

  return {
    lifetime: lifetime.count ?? 0,
    last30Days: last30Days.count ?? 0,
    last7Days: last7Days.count ?? 0,
  };
}
