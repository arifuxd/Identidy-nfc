import { RESERVED_SLUGS } from "@/lib/constants";

export function normalizeSlug(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function isReservedSlug(slug: string) {
  return RESERVED_SLUGS.has(slug);
}
