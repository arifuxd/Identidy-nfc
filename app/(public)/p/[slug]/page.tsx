import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Download } from "lucide-react";

import { ExperienceList } from "@/components/profile/experience-list";
import { PublicProfileViewTracker } from "@/components/profile/public-profile-view-tracker";
import { SocialLinksList } from "@/components/profile/social-links-list";
import { Button } from "@/components/ui/button";
import { DEFAULT_AVATAR, DEFAULT_COVER } from "@/lib/constants";
import { getProfileBundleBySlug } from "@/lib/db/profiles";
import { absoluteUrl } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProfileBundleBySlug(slug);

  if (!data) {
    return {
      title: "Profile Not Found",
    };
  }

  return {
    title: `${data.profile.display_name} | NFC Profile`,
    description:
      data.profile.bio ?? `Connect with ${data.profile.display_name} on Identidy.`,
  };
}

export default async function PublicProfilePage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const data = await getProfileBundleBySlug(slug);

  if (!data) {
    notFound();
  }

  const { profile, socialLinks, experiences } = data;
  const publicUrl = absoluteUrl(`/p/${profile.slug}`);

  return (
    <main className="mx-auto min-h-screen w-full max-w-xl px-4 py-4 sm:px-6 sm:py-8">
      <PublicProfileViewTracker slug={profile.slug} />

      <section className="glass-panel overflow-hidden rounded-[2rem]">
        <div
          className="h-40 bg-cover bg-center sm:h-52"
          style={{
            backgroundImage: `url(${profile.cover_path || DEFAULT_COVER})`,
          }}
        />
        <div className="px-5 pb-5">
          <div className="-mt-16 flex items-end gap-4">
            <div
              className="size-28 rounded-[2rem] border-4 border-background bg-cover bg-center shadow-xl"
              style={{
                backgroundImage: `url(${profile.avatar_path || DEFAULT_AVATAR})`,
              }}
            />
          </div>

          <div className="mt-4">
            <h1 className="text-3xl font-semibold text-white">
              {profile.display_name}
            </h1>
            {profile.job_title || profile.company_name ? (
              <p className="mt-2 text-sm text-blue-100/78">
                {[profile.job_title, profile.company_name]
                  .filter(Boolean)
                  .join(" at ")}
              </p>
            ) : null}
            {profile.bio ? (
              <p className="mt-4 text-sm leading-7 text-muted">{profile.bio}</p>
            ) : null}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a href={`/api/public/vcf/${profile.slug}`} className="flex-1">
              <Button className="w-full">
                <Download className="size-4" />
                Save Contact
              </Button>
            </a>
            <a href={publicUrl} className="flex-1">
              <Button variant="secondary" className="w-full">
                Share Profile
              </Button>
            </a>
          </div>
        </div>
      </section>

      <div className="mt-4 space-y-4">
        <SocialLinksList links={socialLinks} />
        <ExperienceList items={experiences} />
        {profile.address ? (
          <section className="glass-panel rounded-3xl p-4">
            <h2 className="text-sm font-medium uppercase tracking-[0.24em] text-blue-100/68">
              Address
            </h2>
            <p className="mt-4 flex items-start gap-3 text-sm leading-7 text-muted">
              <MapPin className="mt-1 size-4 text-primary" />
              <span>{profile.address}</span>
            </p>
          </section>
        ) : null}
      </div>
    </main>
  );
}
