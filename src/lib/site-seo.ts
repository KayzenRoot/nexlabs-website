/** Immutable public origin. Preview builds must not be indexed. */
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
