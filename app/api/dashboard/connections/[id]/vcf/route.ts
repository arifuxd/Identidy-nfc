import { NextResponse } from "next/server";

import { requireUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import { buildVCard } from "@/lib/vcf";

type Params = Promise<{ id: string }>;

export async function GET(_: Request, { params }: { params: Params }) {
  const { id } = await params;
  const user = await requireUser();
  const supabase = await createClient();

  const { data: connection, error } = await supabase
    .from("profile_connections")
    .select("*")
    .eq("id", id)
    .eq("profile_id", user.id)
    .maybeSingle();

  if (error || !connection) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const vcard = buildVCard({
    name: connection.visitor_name,
    emails: connection.visitor_email
      ? [{ value: connection.visitor_email, type: "home" as const }]
      : [],
    phones: [{ value: connection.visitor_phone, type: "home" as const }],
  });

  const safeName = connection.visitor_name.replace(/[^\w.-]/g, "_");
  return new NextResponse(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${safeName}.vcf"`,
    },
  });
}
