import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";

import { ExperienceList } from "@/components/profile/experience-list";
import { PublicProfileViewTracker } from "@/components/profile/public-profile-view-tracker";
import { SocialLinksList } from "@/components/profile/social-links-list";
import { Button } from "@/components/ui/button";
import { DEFAULT_AVATAR, DEFAULT_COVER } from "@/lib/constants";
import { getProfileBundleBySlug } from "@/lib/db/profiles";

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
          <div className="-mt-16 flex justify-center">
            <div className="rounded-full p-[3px] ring-3 ring-primary shadow-xl shadow-primary/20">
              <div
                className="size-28 rounded-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${profile.avatar_path || DEFAULT_AVATAR})`,
                }}
              />
            </div>
          </div>

          <div className="mt-4 text-center">
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
              <p className="mt-2 text-sm leading-7 text-muted">{profile.bio}</p>
            ) : null}
          </div>

          <div className="mt-5">
            <a href={`/api/public/vcf/${profile.slug}`} className="flex-1">
              <Button className="w-full">
                <Download className="size-4" />
                Save Contact
              </Button>
            </a>
          </div>
        </div>
      </section>

      <div className="mt-4 space-y-4">
        <SocialLinksList links={socialLinks} profile={profile} />
        <ExperienceList items={experiences} />
      </div>
    </main>
  );
}
