import type { MetadataRoute } from "next";
import { CANONICAL_SITE_URL, PUBLIC_INDEXING_ENABLED } from "../lib/site-seo";

/** Production allows discovery. Preview and development remain blocked. */
export default function robots(): MetadataRoute.Robots {
  if (!PUBLIC_INDEXING_ENABLED) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: CANONICAL_SITE_URL + "/sitemap.xml",
  };
}
