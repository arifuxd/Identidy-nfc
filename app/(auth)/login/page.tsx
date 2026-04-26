import { redirect } from "next/navigation";

import { loginAction } from "@/actions/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCurrentUserRole, getOptionalUser } from "@/lib/auth/session";

type SearchParams = Promise<{ error?: string }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const user = await getOptionalUser();
  const { error } = await searchParams;

  if (user) {
    const role = await getCurrentUserRole(user.id);
    redirect(role === "admin" ? "/admin" : "/dashboard");
  }

  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to manage your profile, update contact details, and review your analytics."
      footerLabel="Admin account?"
      footerHref="/admin"
      footerAction="Use the admin portal"
    >
      {error ? <p className="mb-4 text-sm text-red-300">{error}</p> : null}
      <form action={loginAction} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-blue-50/86" htmlFor="email">
            Email
          </label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-blue-50/86" htmlFor="password">
            Password
          </label>
          <Input id="password" name="password" type="password" required />
        </div>
        <Button className="w-full">Sign in</Button>
      </form>
    </AuthCard>
  );
}
