import type { HeroQualityTier } from "./quality-tier";

/** Shared, intentionally small motion contract for the Home visual organism. */
export const livingOrganismMotion = {
  pointerParallax: 0.045,
  scrollDepth: 0.12,
  cameraBreath: 0.025,
  globeRotation: 0.055,
  energyFlowPerSecond: 0.055,
  motionScale: {
    FULL: 1,
    BALANCED: 0.62,
    STATIC: 0,
  } satisfies Record<HeroQualityTier, number>,
  particles: {
    FULL: 88,
    BALANCED: 28,
    STATIC: 0,
  } satisfies Record<HeroQualityTier, number>,
} as const;

/** Returns the normalized environmental-motion amplitude for a quality tier. */
export function getMotionScale(tier: HeroQualityTier): number {
  return livingOrganismMotion.motionScale[tier];
}
