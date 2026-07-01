import Link from "next/link";

export function Logo({ className = "", variant = "default" }: { className?: string; variant?: "default" | "white" }) {
  if (variant === "white") {
    return (
      <Link href="/" className={`group inline-flex items-center ${className}`} aria-label="Identidy home">
        <img src="/identidy-logo-white.svg" alt="Identidy Logo" className="h-7 w-auto" />
      </Link>
    );
  }

  return (
    <Link href="/" className={`group inline-flex items-center ${className}`} aria-label="Identidy home">
      <img src="/identidy-logo.svg" alt="Identidy Logo" className="h-7 w-auto dark:hidden" />
      <img src="/identidy-logo-white.svg" alt="Identidy Logo" className="hidden h-7 w-auto dark:block" />
    </Link>
  );
}
