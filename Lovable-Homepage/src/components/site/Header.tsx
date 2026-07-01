import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/pricing", label: "Pricing" },
  { to: "/themes", label: "Themes" },
  { to: "/demo", label: "Demo Profile" },
] as const;

export function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y > last && y > 120) setHidden(true);
      else setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-transform duration-300 will-change-transform",
        hidden ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      <div
        className={[
          "mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 sm:px-8",
          scrolled ? "backdrop-blur-xl" : "",
        ].join(" ")}
        style={{
          background: scrolled ? "color-mix(in oklab, var(--background) 78%, transparent)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--hairline)" : "1px solid transparent",
        }}
      >
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="group relative text-[13px] tracking-tight text-ink-soft transition-colors hover:text-ink"
              activeProps={{ className: "text-ink" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
              <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/login"
            className="hidden rounded-full px-4 py-2 text-[13px] text-ink-soft transition-colors hover:text-ink md:inline-flex"
          >
            Login
          </Link>
          <Link
            to="/get-your-card"
            className="group relative hidden overflow-hidden rounded-full bg-foreground px-4 py-2 text-[13px] font-medium text-background transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] md:inline-flex"
          >
            <span className="relative z-10">Get your card</span>
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-accent transition-transform duration-500 group-hover:translate-x-0" />
            <span className="relative z-10 ml-1.5 opacity-70 transition-opacity group-hover:opacity-100">→</span>
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-full hairline md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="tap-in border-b border-hairline bg-background md:hidden">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-1 px-5 py-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-ink"
              >
                {n.label}
              </Link>
            ))}
            <Link to="/login" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm text-ink-soft">
              Login
            </Link>
            <Link
              to="/get-your-card"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-foreground px-4 py-3 text-center text-sm font-medium text-background"
            >
              Get your card →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
