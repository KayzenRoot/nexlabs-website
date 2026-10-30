import { describe, expect, it } from "vitest";
import {
  isSoftwareWebGLRenderer,
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

describe("isSoftwareWebGLRenderer", () => {
  it.each([
    "Google SwiftShader",
    "ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero)))",
    "llvmpipe (LLVM 17.0.6, 256 bits)",
    "softpipe",
    "Software Rasterizer",
    "Microsoft Basic Render Driver",
  ])("classifies %s as a static-render fallback", (renderer) => {
    expect(isSoftwareWebGLRenderer(renderer)).toBe(true);
  });

  it.each([
    null,
    "ANGLE (NVIDIA, NVIDIA GeForce RTX 5050 Direct3D11)",
    "Apple M4",
  ])("does not classify %s as a software renderer", (renderer) => {
    expect(isSoftwareWebGLRenderer(renderer)).toBe(false);
  });
});
