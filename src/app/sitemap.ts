import type { MetadataRoute } from "next";
import { publicProjects } from "../data/public-projects";
import { canonicalUrl, PUBLIC_SITE_PAGES } from "../lib/site-seo";

/** Only known, public, canonical paths are submitted to discovery engines. */
export default function sitemap(): MetadataRoute.Sitemap {
  const projectPaths = publicProjects.map((p) => "/projects/" + p.slug);
  return [...PUBLIC_SITE_PAGES, ...projectPaths].map((path) => ({
    url: canonicalUrl(path),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : path === "/projects" ? 0.9 : 0.7,
  }));
}
