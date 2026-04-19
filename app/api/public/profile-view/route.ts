import { createHash } from "crypto";
import { startOfHour } from "date-fns";
import { NextResponse } from "next/server";

import { createServiceRoleClient } from "@/lib/supabase/service-role";

export async function POST(request: Request) {
  const { slug } = (await request.json()) as { slug?: string };

  if (!slug) {
    return NextResponse.json({ error: "Missing slug." }, { status: 400 });
  }

  const supabase = createServiceRoleClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (!profile) {
    return NextResponse.json({ ok: true });
  }

  const forwardedFor = request.headers.get("x-forwarded-for") ?? "unknown";
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  const referrer = request.headers.get("referer");
  const visitorHash = createHash("sha256")
    .update(`${forwardedFor}:${userAgent}`)
    .digest("hex");

  await supabase.from("profile_views").upsert(
    {
      profile_id: profile.id,
      visitor_hash: visitorHash,
      time_bucket: startOfHour(new Date()).toISOString(),
      user_agent: userAgent,
      referrer,
    },
    {
      onConflict: "profile_id,visitor_hash,time_bucket",
      ignoreDuplicates: true,
    },
  );

  return NextResponse.json({ ok: true });
}
