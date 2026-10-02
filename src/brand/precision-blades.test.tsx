import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { precisionBladesPathData } from "./precision-blades";
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

function readPathData(relativePath: string) {
  const source = readFileSync(resolve(process.cwd(), relativePath), "utf8");
  return Array.from(source.matchAll(/<path\b[^>]*\bd="([^"]+)"/g), (match) => match[1]);
}

describe("Precision Blades identity", () => {
  it("keeps the standalone assets and app icon aligned with the flat master geometry", () => {
    for (const asset of geometryAssets) {
      expect(readPathData(asset), asset).toEqual(precisionBladesPathData);
    }
  });

  it("renders a decorative server-friendly SVG without a redundant accessible name", () => {
    const { container } = render(<BrandMark />);
    const mark = container.querySelector("svg");

    expect(mark).toHaveAttribute("aria-hidden", "true");
    expect(mark).not.toHaveAttribute("role");
    expect(
      Array.from(
        mark?.querySelectorAll("g > g > path") ?? [],
        (path) => path.getAttribute("d"),
      ),
    ).toEqual(precisionBladesPathData);
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
