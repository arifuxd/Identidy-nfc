import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StylingEditor } from "@/components/dashboard/styling-editor";
import { requireUser } from "@/lib/auth/session";
import { getProfileBundleForUser } from "@/lib/db/profiles";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardStylingPage() {
  const user = await requireUser();
  const data = await getProfileBundleForUser(user.id);
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
    <DashboardShell currentPath="/dashboard/styling" isAdmin={role?.role === "admin"}>
      <StylingEditor profile={data.profile} />
    </DashboardShell>
  );
}
