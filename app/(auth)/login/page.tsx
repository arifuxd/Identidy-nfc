import { redirect } from "next/navigation";
import { getCurrentUserRole, getOptionalUser } from "@/lib/auth/session";
import { LoginForm } from "./LoginForm";

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

  return <LoginForm error={error} />;
}
