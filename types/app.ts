export type SocialPlatform =
  | "facebook"
  | "twitter"
  | "github"
  | "youtube"
  | "portfolio"
  | "linkedin"
  | "instagram"
  | "custom";

export interface SocialLinkItem {
  id?: string;
  profile_id?: string;
  platform: SocialPlatform;
  label?: string | null;
  url: string;
  sort_order: number;
}

export interface ExperienceItem {
  id?: string;
  profile_id?: string;
  title: string;
  company?: string | null;
  location?: string | null;
  description?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  is_current: boolean;
  sort_order: number;
}
