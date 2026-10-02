import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  precisionBladesGeometry,
  precisionBladesPathData,
  precisionBladesTransform,
} from "./precision-blades";
import { BrandMark } from "../components/brand-mark";

const geometryAssets = [
  "public/brand/nex-n-precision-blades-master.svg",
  "public/brand/nex-n-precision-blades-mono-light.svg",
  "public/brand/nex-n-precision-blades-mono-dark.svg",
  "public/brand/nex-n-precision-blades-chrome-blue.svg",
  "public/brand/nex-labs-horizontal-light.svg",
  "public/brand/nex-labs-horizontal-dark.svg",
  "public/brand/nex-labs-technology-extended-light.svg",
  "public/brand/nex-labs-technology-extended-dark.svg",
  "src/app/icon.svg",
];

/**
 * Reads the canonical master-path geometry embedded in a generated brand SVG
 * so tests can prove every exported asset remains aligned with the approved N.
 */
function readMasterGeometry(relativePath: string) {
  const source = readFileSync(resolve(process.cwd(), relativePath), "utf8");
  return Array.from(
    source.matchAll(
      /<path\b(?=[^>]*\bdata-master-path="")[^>]*\bd="([^"]+)"[^>]*\btransform="([^"]+)"/g,
    ),
    (match) => ({ d: match[1], transform: match[2] }),
  );
}

describe("Precision Blades identity", () => {
  it("preserves the traced owner-approved blade silhouette", () => {
    expect(precisionBladesGeometry).toEqual({
      silhouette:
        "M0,0 L4,1 L5,7 L5,272 L3,276 L-3,276 L-2,285 L-3,286 L-48,285 L-61,284 L-69,277 L-102,244 L-109,236 L-118,227 L-126,220 L-133,213 L-140,205 L-148,197 L-153,192 L-163,182 L-171,175 L-187,159 L-187,157 L-191,155 L-192,152 L-196,150 L-202,144 L-209,143 L-209,162 L-210,220 L-216,227 L-224,234 L-232,242 L-240,249 L-245,253 L-250,258 L-259,267 L-268,274 L-275,282 L-281,283 L-284,281 L-283,114 L-283,20 L-279,18 L-270,20 L-270,15 L-269,14 L-224,15 L-216,22 L-191,47 L-184,55 L-177,62 L-170,70 L-97,143 L-89,150 L-81,158 L-74,159 L-74,70 L-72,65 L-60,54 L-52,47 L-49,44 L-47,44 L-46,41 L-38,34 L-25,22 L-9,7 L-2,1 Z ",
    });
    expect(precisionBladesTransform).toBe("translate(311 14)");
  });

  it("keeps the standalone assets and app icon aligned with the flat master geometry", () => {
    for (const asset of geometryAssets) {
      expect(readMasterGeometry(asset), asset).toEqual(
        precisionBladesPathData.map((d) => ({ d, transform: precisionBladesTransform })),
      );
    }
  });

  it("renders a decorative server-friendly SVG without a redundant accessible name", () => {
    const { container } = render(<BrandMark />);
    const mark = container.querySelector("svg");

    expect(mark).toHaveAttribute("aria-hidden", "true");
    expect(mark).not.toHaveAttribute("role");
    expect(
      Array.from(mark?.querySelectorAll("[data-master-path]") ?? [], (path) => ({
        d: path.getAttribute("d"),
        transform: path.getAttribute("transform"),
      })),
    ).toEqual(
      precisionBladesPathData.map((d) => ({
        d,
        transform: precisionBladesTransform,
      })),
    );
    expect(mark?.querySelector("image")).toHaveAttribute(
      "href",
      "/brand/nex-n-precision-blades-chrome-material.png",
    );
  });

  it("disables all identity animation under reduced-motion preferences", () => {
    const css = readFileSync(
      resolve(process.cwd(), "src/components/brand-mark.module.css"),
      "utf8",
    );

    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain("animation: none !important");
    expect(css).toContain(".lightSweep");
  });
});
