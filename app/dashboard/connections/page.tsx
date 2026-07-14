import { Download, Mail, Phone, UserRound } from "lucide-react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { requireUser } from "@/lib/auth/session";
import { getConnectionsForUser } from "@/lib/db/connections";

function formatSubmittedAt(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function DashboardConnectionsPage() {
  const user = await requireUser();
  const connections = await getConnectionsForUser(user.id);

  return (
    <DashboardShell currentPath="/dashboard/connections" isAdmin={false}>
      <div className="space-y-5">
        <Card>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent/80">
            Connections
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
            Contact requests
          </h1>
        </Card>

        {connections.length ? (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {connections.map((connection) => (
              <Card key={connection.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{connection.visitor_name}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">
                      {formatSubmittedAt(connection.created_at)}
                    </p>
                  </div>
                  <span className="rounded-lg bg-primary/15 p-1.5 text-primary">
                    <UserRound className="size-3.5" />
                  </span>
                </div>
                <div className="mt-3 space-y-2 text-xs">
                  <a href={`tel:${connection.visitor_phone}`} className="flex items-center gap-2 text-foreground hover:text-primary">
                    <Phone className="size-3.5 text-muted" />
                    {connection.visitor_phone}
                  </a>
                  <div className="flex items-center gap-2 text-foreground">
                    <Mail className="size-3.5 text-muted" />
                    {connection.visitor_email ? (
                      <a href={`mailto:${connection.visitor_email}`} className="hover:text-primary">
                        {connection.visitor_email}
                      </a>
                    ) : (
                      <span className="text-muted">Not provided</span>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <a href={`/api/dashboard/connections/${connection.id}/vcf`}>
                    <Button variant="secondary" size="sm" className="w-full justify-center">
                      <Download />
                      Save contact
                    </Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <p className="text-sm text-muted">
              No contact requests yet. When someone connects from your profile, they will appear here.
            </p>
          </Card>
        )}
      </div>
    </DashboardShell>
  );
}
