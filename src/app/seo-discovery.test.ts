import { describe, expect, it } from "vitest";
import robots from "./robots";
import sitemap from "./sitemap";
import { metadata as homeMetadata } from "./page";
import { metadata as rootMetadata } from "./layout";
import { canonicalUrl, PUBLIC_SITE_PAGES } from "../lib/site-seo";
import { publicProjects } from "../data/public-projects";

describe("public SEO discovery contract", () => {
  it("holds the canonical company origin and Home self-reference", () => {
    expect(rootMetadata.metadataBase?.toString()).toBe("https://www.nexlabs.company/");
    expect(homeMetadata.alternates?.canonical).toBe("/");
    expect(canonicalUrl("/company/verification")).toBe("https://www.nexlabs.company/company/verification");
    expect(() => canonicalUrl("//attacker.example")).toThrow();
  });
  it("publishes only known unique project and company routes in the sitemap", () => {
    const data = sitemap();
    const expected = [...PUBLIC_SITE_PAGES, ...publicProjects.map(p => "/projects/" + p.slug)];
    expect(data).toHaveLength(expected.length);
    expect(new Set(data.map(x => x.url)).size).toBe(data.length);
    expect(data.map(x => x.url).sort()).toEqual(expected.map(p => canonicalUrl(p)).sort());
    expect(data.every(x => x.url?.startsWith("https://www.nexlabs.company/"))).toBe(true);
  });
  it("disallows previews without disabling production logic", () => {
    expect(robots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });
    expect(rootMetadata.robots).toEqual({ index: false, follow: false });
  });
});
