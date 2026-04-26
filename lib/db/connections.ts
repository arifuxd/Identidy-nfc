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
