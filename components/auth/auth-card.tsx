import Link from "next/link";

import { Card } from "@/components/ui/card";

interface AuthCardProps {
  title: string;
  description: string;
  footerLabel: string;
  footerHref: string;
  footerAction: string;
  children: React.ReactNode;
}

export function AuthCard({
  title,
  description,
  footerLabel,
  footerHref,
  footerAction,
  children,
}: AuthCardProps) {
  return (
    <div className="shell flex min-h-[calc(100vh-5rem)] items-center justify-center py-12">
      <Card className="w-full max-w-lg rounded-[2rem] border-white/10 p-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-blue-200/72">
            Identidy
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-white">{title}</h1>
          <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
        </div>
        <div className="mt-8">{children}</div>
        <p className="mt-6 text-sm text-muted">
          {footerLabel}{" "}
          <Link href={footerHref} className="font-medium text-white underline">
            {footerAction}
          </Link>
        </p>
      </Card>
    </div>
  );
}
