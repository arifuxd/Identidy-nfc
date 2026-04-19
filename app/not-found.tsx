import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="shell flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.28em] text-blue-200/72">
        404
      </p>
      <h1 className="mt-4 text-4xl font-semibold text-white">
        We couldn&apos;t find that page.
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
        The profile may be unpublished, the link may be wrong, or the page no
        longer exists.
      </p>
      <Link href="/" className="mt-8">
        <Button>Back to home</Button>
      </Link>
    </main>
  );
}
