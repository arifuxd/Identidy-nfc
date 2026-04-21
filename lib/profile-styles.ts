export const PROFILE_STYLE_OPTIONS = [
  "style-1",
  "style-2",
  "style-3",
  "style-4",
  "style-5",
  "style-6",
  "style-7",
  "style-8",
] as const;

export type ProfileStyleId = (typeof PROFILE_STYLE_OPTIONS)[number];

export interface ProfileStyleDefinition {
  id: ProfileStyleId;
  name: string;
  description: string;
}

export const PROFILE_STYLE_DEFINITIONS: ProfileStyleDefinition[] = [
  {
    id: "style-1",
    name: "Style 1 (Default)",
    description: "Current profile layout, clean and universal.",
  },
  {
    id: "style-2",
    name: "Style 2 (Developer)",
    description: "Terminal-inspired developer layout with static blinking cursor.",
  },
  {
    id: "style-3",
    name: "Style 3 (Designer)",
    description: "Designer portfolio style with adaptive accent gradients.",
  },
  {
    id: "style-4",
    name: "Style 4 (Corporate)",
    description: "Business-focused corporate layout with adaptive accent and roundness.",
  },
  {
    id: "style-5",
    name: "Style 5 (Colorful)",
    description: "Fixed neobrutalist palette and shape treatment.",
  },
  {
    id: "style-6",
    name: "Style 6 (Terminal)",
    description: "Terminal shell inspired profile with command-style sections.",
  },
  {
    id: "style-7",
    name: "Style 7 (Sci-Fi)",
    description: "Futuristic sci-fi terminal layout with HUD elements.",
  },
  {
    id: "style-8",
    name: "Style 8 (Cinema)",
    description: "Minimalist black-and-white cinematic design.",
  },
];

export function resolveProfileStyleDefinition(styleId: string | null | undefined) {
  const fallback = PROFILE_STYLE_DEFINITIONS[0];
  return (
    PROFILE_STYLE_DEFINITIONS.find((style) => style.id === styleId) ?? fallback
  );
}
