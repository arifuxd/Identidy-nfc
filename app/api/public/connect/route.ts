import { NextResponse } from "next/server";

import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { connectionRequestSchema } from "@/lib/validations/connection";

export async function POST(request: Request) {
  const payload = connectionRequestSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json(
      { error: "Please fill in the required contact details." },
      { status: 400 },
    );
  }

  const supabase = createServiceRoleClient();
  const { slug, name, phone, email } = payload.data;
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (!profile) {
    return NextResponse.json({ error: "Profile not found." }, { status: 404 });
  }

  const { error } = await supabase.from("profile_connections").insert({
    profile_id: profile.id,
    visitor_name: name,
    visitor_phone: phone,
    visitor_email: email ?? null,
  });

  if (error) {
    return NextResponse.json(
      { error: "Unable to send the connection request right now." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
