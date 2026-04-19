import { LoaderCircle } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="shell flex min-h-[50vh] items-center justify-center py-12">
      <div className="glass-panel flex items-center gap-3 rounded-3xl px-6 py-4 text-sm text-blue-100/85">
        <LoaderCircle className="size-5 animate-spin" />
        Loading dashboard...
      </div>
    </div>
  );
}
