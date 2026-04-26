import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { DebugStyleFlyout } from "@/components/profile/debug-style-flyout";
import { PublicProfileViewTracker } from "@/components/profile/public-profile-view-tracker";
import { Style1Default } from "@/components/profile/styles/style-1-default";
import { Style2Corporate } from "@/components/profile/styles/style-2-corporate";
import { Style3Designer } from "@/components/profile/styles/style-3-designer";
import { Style4Corporate } from "@/components/profile/styles/style-4-corporate";
import { Style5Colorful } from "@/components/profile/styles/style-5-colorful";
import { Style6Terminal } from "@/components/profile/styles/style-6-terminal";
import { Style7Scifi } from "@/components/profile/styles/style-7-scifi";
import { Style8Cinema } from "@/components/profile/styles/style-8-cinema";
import { getProfileBundleBySlug } from "@/lib/db/profiles";
import { resolveProfileStyleDefinition } from "@/lib/profile-styles";
import { absoluteUrl } from "@/lib/utils";

type Params = Promise<{ username: string }>;
type SearchParams = Promise<{ style?: string | string[] }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { username } = await params;
  const data = await getProfileBundleBySlug(username);

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
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { username } = await params;
  const query = await searchParams;
  const data = await getProfileBundleBySlug(username);

  if (!data) {
    notFound();
  }

  const { profile, socialLinks, experiences } = data;
  const requestHeaders = await headers();
  const profileUrl = absoluteUrl(`/${profile.slug}`, { headers: requestHeaders });
  const forcedStyle =
    typeof query.style === "string"
      ? query.style
      : Array.isArray(query.style)
        ? query.style[0]
        : undefined;
  const styleId = resolveProfileStyleDefinition(forcedStyle ?? profile.profile_style).id;

  const isFullWidth = styleId !== "style-1";

  return (
    <main
      className={
        isFullWidth
          ? "mx-auto min-h-screen w-full max-w-xl"
          : "mx-auto min-h-screen w-full max-w-xl px-4 py-4 sm:px-6 sm:py-8"
      }
    >
      <PublicProfileViewTracker slug={profile.slug} />
      <DebugStyleFlyout activeStyle={styleId} />
      {styleId === "style-2" ? (
        <Style2Corporate
          profile={profile}
          socialLinks={socialLinks}
          experiences={experiences}
        />
      ) : styleId === "style-3" ? (
        <Style3Designer
          profile={profile}
          socialLinks={socialLinks}
          experiences={experiences}
        />
      ) : styleId === "style-4" ? (
        <Style4Corporate
          profile={profile}
          socialLinks={socialLinks}
          experiences={experiences}
        />
      ) : styleId === "style-5" ? (
        <Style5Colorful
          profile={profile}
          socialLinks={socialLinks}
          experiences={experiences}
        />
      ) : styleId === "style-6" ? (
        <Style6Terminal
          profile={profile}
          socialLinks={socialLinks}
          experiences={experiences}
        />
      ) : styleId === "style-7" ? (
        <Style7Scifi
          profile={profile}
          socialLinks={socialLinks}
          experiences={experiences}
        />
      ) : styleId === "style-8" ? (
        <Style8Cinema
          profile={profile}
          socialLinks={socialLinks}
          experiences={experiences}
        />
      ) : (
        <Style1Default
          profile={profile}
          socialLinks={socialLinks}
          experiences={experiences}
          profileUrl={profileUrl}
        />
      )}
    </main>
  );
}
