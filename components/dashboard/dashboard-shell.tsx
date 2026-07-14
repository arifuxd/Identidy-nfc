import Link from "next/link";
import {
  LayoutDashboard,
  Shield,
  UserRound,
  Settings,
  Handshake,
  LogOut,
  SwatchBook,
} from "lucide-react";

import { logoutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/profile", label: "Profile", icon: UserRound },
  { href: "/dashboard/styling", label: "Styling", icon: SwatchBook },
  { href: "/dashboard/connections", label: "Connections", icon: Handshake },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

interface DashboardShellProps {
  children: React.ReactNode;
  currentPath: string;
  isAdmin?: boolean;
}

export function DashboardShell({
  children,
  currentPath,
  isAdmin = false,
}: DashboardShellProps) {
  return (
    <div className="shell flex flex-1 flex-col gap-6 py-6 lg:flex-row lg:py-8">
      <aside className="rounded-2xl border border-border bg-secondary p-4 shadow-[var(--shadow-panel)] backdrop-blur-xl lg:w-72">
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-accent/80">
            Identidy
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="mt-2 text-sm text-muted">
            Manage your NFC profile, links, and profile traffic.
          </p>
        </div>

        <nav className="space-y-2">
          {items.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition",
                  isActive
                    ? "bg-primary shadow-sm"
                    : "text-muted hover:bg-foreground/5 hover:text-foreground",
                )}
                style={isActive ? { color: "var(--primary-foreground)" } : undefined}
              >
                <item.icon className="size-4" style={isActive ? { color: "var(--primary-foreground)" } : undefined} />
                <span style={isActive ? { color: "var(--primary-foreground)" } : undefined}>{item.label}</span>
              </Link>
            );
          })}

          {isAdmin ? (
            (() => {
              const isActive = currentPath.startsWith("/admin");
              return (
                <Link
                  href="/admin"
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition",
                    isActive
                      ? "bg-primary shadow-sm"
                      : "text-muted hover:bg-foreground/5 hover:text-foreground",
                  )}
                  style={isActive ? { color: "var(--primary-foreground)" } : undefined}
                >
                  <Shield className="size-4" style={isActive ? { color: "var(--primary-foreground)" } : undefined} />
                  <span style={isActive ? { color: "var(--primary-foreground)" } : undefined}>Admin</span>
                </Link>
              );
            })()
          ) : null}
        </nav>

        <form action={logoutAction} className="mt-6">
          <Button variant="secondary" className="w-full justify-center">
            <LogOut className="size-4" />
            Sign out
          </Button>
        </form>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
