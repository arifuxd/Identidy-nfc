import { NextResponse } from "next/server";

import { getProfileBundleBySlug } from "@/lib/db/profiles";
import { absoluteUrl } from "@/lib/utils";
import { buildVCard } from "@/lib/vcf";

type Params = Promise<{ slug: string }>;

export async function GET(
  _request: Request,
  { params }: { params: Params },
) {
  const { slug } = await params;
  const data = await getProfileBundleBySlug(slug);

  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { profile } = data;
  const vcard = buildVCard({
    name: profile.display_name,
    email: profile.email_public,
    phone: profile.phone_public,
    title: profile.job_title,
    company: profile.company_name,
    address: profile.address,
    url: absoluteUrl(`/p/${profile.slug}`),
  });

  return new NextResponse(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${profile.slug}.vcf"`,
    },
  });
}
