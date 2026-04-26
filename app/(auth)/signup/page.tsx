import { redirect } from "next/navigation";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await searchParams;
  redirect(
    "/login?error=Account%20registration%20is%20disabled.%20Please%20contact%20an%20administrator.",
  );
}
