import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StylingEditor } from "@/components/dashboard/styling-editor";
import { requireUser } from "@/lib/auth/session";
import { getProfileBundleForUser } from "@/lib/db/profiles";

export default async function DashboardStylingPage() {
  const user = await requireUser();
  const data = await getProfileBundleForUser(user.id);

  if (!data) {
    return null;
  }

  return (
    <DashboardShell currentPath="/dashboard/styling" isAdmin={false}>
      <StylingEditor profile={data.profile} />
    </DashboardShell>
  );
}
