import { NextResponse } from "next/server";

import { isReservedSlug, normalizeSlug } from "@/lib/slug";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = normalizeSlug(searchParams.get("slug") ?? "");

  if (!slug || isReservedSlug(slug)) {
    return NextResponse.json({
      available: false,
      normalized: slug,
    });
  }

  const supabase = await createClient();
  const { data } = await supabase.rpc("slug_available", {
    desired_slug: slug,
  });

  return NextResponse.json({
    available: Boolean(data),
    normalized: slug,
  });
}
