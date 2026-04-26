import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function normalizeBaseUrl(value: string) {
  if (!value) {
    return value;
  }

  return value.startsWith("http://") || value.startsWith("https://")
    ? value
    : `https://${value}`;
}

export function absoluteUrl(
  path: string,
  options?: {
    headers?: Headers;
  },
) {
  const forwardedProto = options?.headers?.get("x-forwarded-proto");
  const forwardedHost =
    options?.headers?.get("x-forwarded-host") ?? options?.headers?.get("host");
  const requestBaseUrl =
    forwardedHost && forwardedProto
      ? `${forwardedProto}://${forwardedHost}`
      : forwardedHost
        ? `https://${forwardedHost}`
        : null;
  const envBaseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";
  const baseUrl = normalizeBaseUrl(requestBaseUrl ?? envBaseUrl);

  return new URL(path, baseUrl).toString();
}
