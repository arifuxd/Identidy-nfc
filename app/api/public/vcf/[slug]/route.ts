import { NextResponse } from "next/server";

import { getProfileBundleBySlug } from "@/lib/db/profiles";
import { absoluteUrl } from "@/lib/utils";
import { buildVCard } from "@/lib/vcf";

type Params = Promise<{ slug: string }>;

export async function GET(
  request: Request,
  { params }: { params: Params },
) {
  const { slug } = await params;
  const data = await getProfileBundleBySlug(slug);

  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { profile, socialLinks } = data;
  const emails = [
    profile.email_home
      ? { value: profile.email_home, type: "home" as const }
      : null,
    profile.email_office
      ? { value: profile.email_office, type: "office" as const }
      : null,
  ].filter(Boolean) as Array<{ value: string; type: "home" | "office" }>;

  const phones = [
    profile.phone_home
      ? { value: profile.phone_home, type: "home" as const }
      : null,
    profile.phone_office
      ? { value: profile.phone_office, type: "office" as const }
      : null,
  ].filter(Boolean) as Array<{ value: string; type: "home" | "office" }>;

  const links = socialLinks
    .map((item) => item.url?.trim())
    .filter((item): item is string => Boolean(item));

  const avatarUrl = profile.avatar_path?.trim();
  let photoBase64: string | null = null;
  let photoType: string | null = null;

  if (avatarUrl) {
    try {
      const avatarResponse = await fetch(avatarUrl, { cache: "no-store" });

      if (avatarResponse.ok) {
        const bytes = await avatarResponse.arrayBuffer();
        photoBase64 = Buffer.from(bytes).toString("base64");
        photoType = avatarResponse.headers.get("content-type");
      }
    } catch {
      // Skip avatar embedding when remote fetch fails.
    }
  }

  const vcard = buildVCard({
    name: profile.display_name,
    emails,
    phones,
    title: profile.job_title,
    company: profile.company_name,
    address: profile.address,
    profileUrl: absoluteUrl(`/${profile.slug}`, { headers: request.headers }),
    links,
    photoBase64,
    photoType,
  });

  return new NextResponse(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${profile.slug}.vcf"`,
    },
  });
}
