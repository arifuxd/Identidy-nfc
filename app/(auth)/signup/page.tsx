import { redirect } from "next/navigation";

import { signupAction } from "@/actions/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getOptionalUser } from "@/lib/auth/session";

type SearchParams = Promise<{ error?: string }>;

export default async function SignupPage({
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
      title="Create your account"
      description="Get a dashboard for your NFC business card profile, contact sharing, and visit insights."
      footerLabel="Already have an account?"
      footerHref="/login"
      footerAction="Sign in"
    >
      {error ? <p className="mb-4 text-sm text-red-300">{error}</p> : null}
      <form action={signupAction} className="space-y-4">
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
        <Button className="w-full">Create account</Button>
      </form>
    </AuthCard>
  );
}
