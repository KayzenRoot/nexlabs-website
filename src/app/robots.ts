import type { MetadataRoute } from "next";

/** Keeps every crawler out until a verified production origin is admitted. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
