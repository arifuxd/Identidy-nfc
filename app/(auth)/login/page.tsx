import { redirect } from "next/navigation";

import { loginAction } from "@/actions/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getOptionalUser } from "@/lib/auth/session";

type SearchParams = Promise<{ error?: string }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const user = await getOptionalUser();
  const { error } = await searchParams;

  if (user) {
    redirect("/dashboard");
  }

  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to edit your NFC profile, manage links, and review your analytics."
      footerLabel="Need an account?"
      footerHref="/signup"
      footerAction="Create one"
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
