export const RESERVED_SLUGS = new Set([
  "admin",
  "api",
  "app",
  "dashboard",
  "help",
  "login",
  "pricing",
  "privacy",
  "settings",
  "signup",
  "support",
  "terms",
]);

export const SOCIAL_PLATFORM_OPTIONS = [
  "facebook",
  "twitter",
  "pinterest",
  "tiktok",
  "github",
  "youtube",
  "portfolio",
  "linkedin",
  "instagram",
  "custom",
] as const;

export const PROFILE_ACCENT_OPTIONS = [
  "#3b82f6", // Blue
  "#ef4444", // Red
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#8b5cf6", // Violet
  "#ec4899", // Pink
] as const;

export const SOCIAL_PLATFORM_LABELS: Record<
  (typeof SOCIAL_PLATFORM_OPTIONS)[number],
  string
> = {
  facebook: "Facebook",
  twitter: "Twitter / X",
  pinterest: "Pinterest",
  tiktok: "TikTok",
  github: "GitHub",
  youtube: "YouTube",
  portfolio: "Portfolio",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  custom: "Custom",
};

export const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1600&q=80";

export const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=512&q=80";
