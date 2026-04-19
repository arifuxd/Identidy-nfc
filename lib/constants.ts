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
  "github",
  "youtube",
  "portfolio",
  "linkedin",
  "instagram",
  "custom",
] as const;

export const SOCIAL_PLATFORM_LABELS: Record<
  (typeof SOCIAL_PLATFORM_OPTIONS)[number],
  string
> = {
  facebook: "Facebook",
  twitter: "Twitter / X",
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
