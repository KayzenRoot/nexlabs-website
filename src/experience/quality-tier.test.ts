import { describe, expect, it } from "vitest";
import {
  resolveHeroQualityTier,
  type HeroCapabilities,
} from "./quality-tier";

const capableDesktop: HeroCapabilities = {
  webglAvailable: true,
  reducedMotion: false,
  saveData: false,
  deviceMemory: 16,
  hardwareConcurrency: 16,
  coarsePointer: false,
  viewportWidth: 1600,
};

describe("resolveHeroQualityTier", () => {
  it("selects FULL for a capable desktop", () => {
    expect(resolveHeroQualityTier(capableDesktop)).toBe("FULL");
  });

  it("keeps the composition in BALANCED mode on mid-range and tablet profiles", () => {
    expect(
      resolveHeroQualityTier({
        ...capableDesktop,
        deviceMemory: 4,
        hardwareConcurrency: 8,
      }),
    ).toBe("BALANCED");
    expect(
      resolveHeroQualityTier({ ...capableDesktop, viewportWidth: 900 }),
    ).toBe("BALANCED");
    expect(
      resolveHeroQualityTier({ ...capableDesktop, coarsePointer: true }),
    ).toBe("BALANCED");
  });

  it.each([
    ["reduced motion", { reducedMotion: true }],
    ["WebGL unavailable", { webglAvailable: false }],
    ["save-data", { saveData: true }],
    ["mobile width", { viewportWidth: 390 }],
    ["low memory", { deviceMemory: 2 }],
    ["low CPU", { hardwareConcurrency: 4 }],
  ])("selects STATIC for %s", (_reason, overrides) => {
    expect(
      resolveHeroQualityTier({ ...capableDesktop, ...overrides }),
    ).toBe("STATIC");
  });

  it("keeps unknown hardware in BALANCED rather than blocking the scene", () => {
    expect(
      resolveHeroQualityTier({
        ...capableDesktop,
        deviceMemory: null,
        hardwareConcurrency: null,
      }),
    ).toBe("BALANCED");
  });
});
