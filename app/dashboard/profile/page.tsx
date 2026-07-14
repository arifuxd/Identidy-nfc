import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ProfileEditor } from "@/components/dashboard/profile-editor";
import { requireUser } from "@/lib/auth/session";
import { getProfileBundleForUser } from "@/lib/db/profiles";

export default async function DashboardProfilePage() {
  const user = await requireUser();
  const data = await getProfileBundleForUser(user.id);

  if (!data) {
    return null;
  }

  return (
    <DashboardShell currentPath="/dashboard/profile" isAdmin={false}>
      <ProfileEditor
        userId={user.id}
        profile={data.profile}
        socialLinks={data.socialLinks}
        experiences={data.experiences}
      />
    </DashboardShell>
  );
}
