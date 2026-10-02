/**
 * Canonical, flat geometry for the owner-selected NEX-N-A-PRECISION-BLADES mark.
 * Keep the standalone SVG variants in public/brand and src/app/icon.svg aligned
 * with these paths; precision-blades.test.ts guards that contract.
 */
export const precisionBladesGeometry = {
  leftBlade: "M42 30H89L93 34V222H42L30 210V42Z",
  diagonalBridge: "M80 222L155 30H214L139 222Z",
  rightBlade: "M167 34L171 30H214L226 42V210L214 222H167V34Z",
} as const;

export const precisionBladesPathData = Object.values(precisionBladesGeometry);
