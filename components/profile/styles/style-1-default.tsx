import type { CSSProperties } from "react";
import Image from "next/image";
import { Download } from "lucide-react";

import { ExperienceList } from "@/components/profile/experience-list";
import { SocialLinksList } from "@/components/profile/social-links-list";
import { Button } from "@/components/ui/button";
import { DEFAULT_AVATAR, DEFAULT_COVER } from "@/lib/constants";

import type { ProfileStyleProps } from "./types";

function withAlpha(hexColor: string, alphaHex: string) {
  if (!/^#[0-9a-f]{6}$/i.test(hexColor)) {
    return hexColor;
  }

  return `${hexColor}${alphaHex}`;
}

export function Style1Default({ profile, socialLinks, experiences }: ProfileStyleProps) {
  const coverUrl = profile.cover_path || DEFAULT_COVER;
  const avatarUrl = profile.avatar_path || DEFAULT_AVATAR;
  const accentColor = profile.accent_color || "#3b82f6";
  const avatarShape = profile.avatar_shape === "rounded" ? "rounded-3xl" : "rounded-full";
  const profileStyle = {
    "--primary": accentColor,
    "--primary-strong": accentColor,
    "--ring": withAlpha(accentColor, "55"),
  } as CSSProperties;

  return (
    <div style={profileStyle}>
      <section className="glass-panel overflow-hidden rounded-[2rem]">
        <div className="relative z-0 h-40 sm:h-52">
          <Image
            src={coverUrl}
            alt={`${profile.display_name} cover image`}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, 640px"
            quality={100}
            priority
          />
        </div>
        <div className="px-5 pb-5">
          <div className="relative z-20 -mt-16 flex justify-center">
            <div className={`p-[3px] ring-3 ring-primary shadow-xl shadow-primary/20 ${avatarShape}`}>
              <div className={`relative size-28 overflow-hidden ${avatarShape}`}>
                <Image
                  src={avatarUrl}
                  alt={`${profile.display_name} profile photo`}
                  fill
                  className="object-cover object-center"
                  sizes="112px"
                  quality={100}
                  priority
                />
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <h1 className="text-3xl font-semibold text-white">{profile.display_name}</h1>
            {profile.job_title || profile.company_name ? (
              <p className="mt-2 text-sm text-blue-100/78">
                {[profile.job_title, profile.company_name].filter(Boolean).join(" at ")}
              </p>
            ) : null}
            {profile.bio ? <p className="mt-2 text-sm leading-7 text-muted">{profile.bio}</p> : null}
          </div>

          <div className="mt-5">
            <a href={`/api/public/vcf/${profile.slug}`} className="flex-1">
              <Button
                className="w-full"
                style={{
                  backgroundColor: accentColor,
                  boxShadow: `0 16px 40px ${withAlpha(accentColor, "59")}`,
                }}
              >
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
    </div>
  );
}
