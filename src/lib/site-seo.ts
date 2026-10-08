/** Immutable public origin. Preview builds must not be indexed. */
import type { Metadata } from "next";

export function pageOpenGraph(path: string, title: string, description: string): NonNullable<Metadata["openGraph"]> {
  return {
    type: "website",
    siteName: "NexLabs Technology",
    locale: "en_US",
    url: canonicalUrl(path),
    title,
    description,
    images: [{ url: "/hero/home-hero-poster.jpg", alt: "NexLabs Technology cinematic laboratory visual" }],
  };
}

export const CANONICAL_SITE_URL = "https://www.nexlabs.company";
export const PUBLIC_INDEXING_ENABLED = process.env.VERCEL_ENV === "production";

export const PUBLIC_SITE_PAGES = [
  "/", "/technology", "/solutions", "/research", "/company",
  "/company/verification", "/contact", "/projects",
] as const;

export function canonicalUrl(pathname: string): string {
  if (!pathname.startsWith("/") || pathname.startsWith("//")) {
    throw new Error("Expected an absolute site-relative path");
  }
  return new URL(pathname, CANONICAL_SITE_URL).toString();
}
