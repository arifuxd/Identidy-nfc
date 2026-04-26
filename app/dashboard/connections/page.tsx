import { Mail, Phone, UserRound } from "lucide-react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card } from "@/components/ui/card";
import { requireUser } from "@/lib/auth/session";
import { getConnectionsForUser } from "@/lib/db/connections";
import { createClient } from "@/lib/supabase/server";

function formatSubmittedAt(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function DashboardConnectionsPage() {
  const user = await requireUser();
  const [connections, supabase] = await Promise.all([
    getConnectionsForUser(user.id),
    createClient(),
  ]);
  const { data: role } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  return (
    <DashboardShell currentPath="/dashboard/connections" isAdmin={role?.role === "admin"}>
      <div className="space-y-6">
        <Card className="rounded-[2rem]">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-blue-200/72">
            Connections
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Contact requests</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            People who tapped Connect from your public profile appear here so you can
            follow up and save their details.
          </p>
        </Card>

        {connections.length ? (
          <div className="space-y-4">
            {connections.map((connection) => (
              <Card key={connection.id} className="rounded-[2rem]">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-4">
                    <div>
                      <p className="text-lg font-semibold text-white">
                        {connection.visitor_name}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.22em] text-blue-100/62">
                        Submitted {formatSubmittedAt(connection.created_at)}
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <a
                        href={`tel:${connection.visitor_phone}`}
                        className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-3 transition hover:border-primary/35 hover:bg-white/7"
                      >
                        <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/14 text-primary">
                          <Phone className="size-4" />
                        </span>
                        <span>
                          <span className="block text-sm text-muted">Phone</span>
                          <span className="block text-sm font-medium text-white">
                            {connection.visitor_phone}
                          </span>
                        </span>
                      </a>

                      {connection.visitor_email ? (
                        <a
                          href={`mailto:${connection.visitor_email}`}
                          className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-3 transition hover:border-primary/35 hover:bg-white/7"
                        >
                          <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/14 text-primary">
                            <Mail className="size-4" />
                          </span>
                          <span>
                            <span className="block text-sm text-muted">Email</span>
                            <span className="block text-sm font-medium text-white">
                              {connection.visitor_email}
                            </span>
                          </span>
                        </a>
                      ) : (
                        <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-3">
                          <span className="flex size-10 items-center justify-center rounded-2xl bg-white/8 text-blue-100/72">
                            <Mail className="size-4" />
                          </span>
                          <span>
                            <span className="block text-sm text-muted">Email</span>
                            <span className="block text-sm font-medium text-white">
                              Not provided
                            </span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-muted">
                    <div className="flex items-center gap-2 text-white">
                      <UserRound className="size-4 text-primary" />
                      Lead captured
                    </div>
                    <p className="mt-2 max-w-xs leading-6">
                      Reach out directly or save these details into your own contact workflow.
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="rounded-[2rem]">
            <p className="text-sm text-muted">
              No connection requests yet. Once someone uses Connect on your profile, their
              details will appear here.
            </p>
          </Card>
        )}
      </div>
    </DashboardShell>
  );
}
