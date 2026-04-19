import Link from "next/link";
import { LayoutDashboard, Shield, UserRound, BarChart3, Settings, LogOut } from "lucide-react";

import { logoutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/profile", label: "Profile", icon: UserRound },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
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
      <aside className="glass-panel rounded-[2rem] border-white/8 p-4 lg:w-72 lg:p-5">
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-blue-200/72">
            Identidy
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-white">Dashboard</h1>
          <p className="mt-2 text-sm text-muted">
            Manage your NFC profile, links, and profile traffic.
          </p>
        </div>

        <nav className="space-y-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition",
                currentPath === item.href
                  ? "bg-primary text-white shadow-[0_16px_36px_rgba(37,99,235,0.28)]"
                  : "text-muted hover:bg-white/5 hover:text-white",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}

          {isAdmin ? (
            <Link
              href="/admin"
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition",
                currentPath.startsWith("/admin")
                  ? "bg-primary text-white shadow-[0_16px_36px_rgba(37,99,235,0.28)]"
                  : "text-muted hover:bg-white/5 hover:text-white",
              )}
            >
              <Shield className="size-4" />
              Admin
            </Link>
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
