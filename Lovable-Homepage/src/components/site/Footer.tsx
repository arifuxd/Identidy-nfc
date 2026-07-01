import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const COLS = [
  {
    title: "Product",
    links: [
      { label: "Pricing", to: "/pricing" as const },
      { label: "Themes", to: "/themes" as const },
      { label: "Demo Profile", to: "/demo" as const },
      { label: "Get Your Card", to: "/get-your-card" as const },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" as const },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Login", to: "/login" as const },
      { label: "FAQ", to: "/pricing" as const },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@identidy-bd" },
      { label: "Facebook", href: "https://www.facebook.com/identidybd" },
      { label: "Instagram", href: "https://www.instagram.com/identidybd" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative isolate mt-24 overflow-hidden bg-[#0A0A0A] text-[#FAFAFA] grain">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent/25 blur-[120px] aurora" />

      <div className="relative mx-auto max-w-[1440px] px-5 pt-24 pb-10 sm:px-8">
        <h2 className="max-w-[15ch] text-balance text-[clamp(2.75rem,8vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.035em]">
          Your Identidy <span className="italic text-white/60">lives</span> here.
        </h2>

        <div className="mt-16 grid gap-10 border-t border-white/10 pt-12 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo className="text-white" />
            <p className="mt-4 max-w-[28ch] text-sm text-white/60">
              A premium NFC business card platform, engineered in Bangladesh for a global standard of contact.
            </p>
            <Link
              to="/get-your-card"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-medium text-[#0A0A0A] transition-transform duration-200 hover:scale-[1.02]"
            >
              Get your card →
            </Link>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">{c.title}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l, i) => {
                  if ('href' in l && l.href) {
                    return (
                      <li key={i}>
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-white/80 transition-colors hover:text-white"
                        >
                          {l.label}
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li key={i}>
                      <Link to={l.to} className="text-sm text-white/80 transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-6 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Identidy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[10.5px] uppercase tracking-[0.18em] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-accent chip-glow" />
              Made in Bangladesh
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
