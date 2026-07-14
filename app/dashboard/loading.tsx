export default function DashboardLoading() {
  return (
    <main className="marketing-theme market-loader-root fixed inset-0 z-[80] flex min-h-dvh items-center justify-center overflow-hidden bg-background px-4">
      <div className="market-loader-overlay pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,var(--accent-glow),transparent_35%),radial-gradient(circle_at_80%_10%,var(--accent),transparent_30%),radial-gradient(circle_at_50%_80%,var(--accent),transparent_35%)] opacity-30 dark:opacity-100" />
      <div className="relative z-10 flex items-center justify-center">
        <div className="relative h-24 w-24">
          <span className="market-loader-ring-outer absolute inset-0 rounded-full border border-foreground/10 dark:border-white/20" />
          <span className="market-loader-ring-mid absolute inset-2 rounded-full border border-accent/30 dark:border-blue-300/50" />
          <span className="market-loader-ring-spin absolute inset-0 animate-[spin_1.6s_linear_infinite] rounded-full border-t-2 border-r-2 border-accent dark:border-blue-400" />
          <span className="market-loader-core absolute inset-5 animate-pulse rounded-full bg-gradient-to-br from-accent to-accent-glow shadow-[0_0_30px_rgba(59,130,246,0.3)] dark:shadow-[0_0_30px_rgba(59,130,246,0.55)]" />
        </div>
      </div>
    </main>
  );
}
