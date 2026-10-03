export type HeroQualityTier = "FULL" | "BALANCED" | "STATIC";

export interface HeroCapabilities {
  webglAvailable: boolean;
  reducedMotion: boolean;
  saveData: boolean;
  deviceMemory: number | null;
  hardwareConcurrency: number | null;
  coarsePointer: boolean;
  viewportWidth: number;
}

/**
 * Resolves quality without user-agent sniffing. Unknown hardware remains usable
 * in BALANCED mode; reduced motion, save-data, constrained devices and missing
 * WebGL always select the no-canvas path.
 */
export function resolveHeroQualityTier(
  capabilities: HeroCapabilities,
): HeroQualityTier {
  const constrainedMemory =
    capabilities.deviceMemory !== null && capabilities.deviceMemory <= 2;
  const constrainedCpu =
    capabilities.hardwareConcurrency !== null &&
    capabilities.hardwareConcurrency <= 4;

  if (
    !capabilities.webglAvailable ||
    capabilities.reducedMotion ||
    capabilities.saveData ||
    capabilities.viewportWidth < 640 ||
    constrainedMemory ||
    constrainedCpu
  ) {
    return "STATIC";
  }

  const balancedMemory =
    capabilities.deviceMemory !== null && capabilities.deviceMemory <= 6;
  const balancedCpu =
    capabilities.hardwareConcurrency !== null &&
    capabilities.hardwareConcurrency <= 8;

  if (
    capabilities.coarsePointer ||
    capabilities.viewportWidth < 1280 ||
    capabilities.deviceMemory === null ||
    capabilities.hardwareConcurrency === null ||
    balancedMemory ||
    balancedCpu
  ) {
    return "BALANCED";
  }

  return "FULL";
}

/**
 * Performs a conservative WebGL2 capability probe and releases the temporary
 * context immediately so the probe does not compete with the production canvas.
 */
export function probeWebGL2(): boolean {
  if (typeof document === "undefined") return false;
  if (typeof WebGL2RenderingContext === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2", {
      failIfMajorPerformanceCaveat: true,
      powerPreference: "high-performance",
    });

    if (!context) return false;

    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/** Reads only deterministic browser/device signals used by the quality selector. */
export function readHeroCapabilities(): HeroCapabilities {
  const browser = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };

  const reducedMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const saveData = browser.connection?.saveData === true;
  const viewportWidth = window.innerWidth;
  const deviceMemory = browser.deviceMemory ?? null;
  const hardwareConcurrency = navigator.hardwareConcurrency || null;
  const obviouslyStatic =
    reducedMotion ||
    saveData ||
    viewportWidth < 640 ||
    (deviceMemory !== null && deviceMemory <= 2) ||
    (hardwareConcurrency !== null && hardwareConcurrency <= 4);

  return {
    webglAvailable: !obviouslyStatic && probeWebGL2(),
    reducedMotion,
    saveData,
    deviceMemory,
    hardwareConcurrency,
    coarsePointer: window.matchMedia?.("(pointer: coarse)").matches ?? false,
    viewportWidth,
  };
}
