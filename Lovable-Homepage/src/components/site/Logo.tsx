import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2 ${className}`} aria-label="Identidy home">
      <span className="relative grid h-7 w-7 place-items-center rounded-md bg-foreground text-background">
        <span className="text-[13px] font-semibold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>i</span>
        <span className="pointer-events-none absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-accent chip-glow" />
      </span>
      <span className="text-[15px] font-medium tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
        Identidy
      </span>
    </Link>
  );
}
