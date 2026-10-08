import { mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const evidence = resolve(root, ".engineering/evidence/NEXLABS-WO-013-VISUAL-FIDELITY-MASTER-ALIGNMENT");
const outputDirectory = resolve(evidence, "design-director");
const round = process.argv[2] ?? "01";
if (!/^(0[1-9]|[1-9]\d)$/.test(round)) throw new Error("Round must be 01 through 99.");
const sources = [
  ["APPROVED MASTER · complete frame", resolve(root, ".engineering/evidence/NEXLABS-WO-007-HOME-HERO-LIVING-ORGANISM/approved-home-visual-master.jpg")],
  ["CANDIDATE · live Home / Hero", resolve(evidence, "home-full-3d-1600x900.png")],
  ["CANDIDATE · five capability objects", resolve(evidence, "capabilities-five-objects.png")],
  ["CANDIDATE · lower Research", resolve(evidence, "home-lower-research.png")],
  ["CANDIDATE · lower Technology", resolve(evidence, "home-lower-technology.png")],
  ["CANDIDATE · internal route / Technology", resolve(evidence, "technology-1600x900.png")],
  ["CANDIDATE · Home mobile 390 × 844", resolve(evidence, "candidate-home-390x844.png")],
];
const tileWidth = 760;
const imageHeight = 418;
const labelHeight = 38;
const tileHeight = imageHeight + labelHeight;
const gap = 16;
const columns = 2;
const rows = Math.ceil(sources.length / columns);
const tiles = await Promise.all(sources.map(async ([label, path]) => {
  const input = readFileSync(path);
  const image = await sharp(input).rotate().resize(tileWidth - 20, imageHeight - 12, {
    fit: "contain",
    background: { r: 2, g: 8, b: 18, alpha: 1 },
  }).png().toBuffer();
  const caption = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${tileWidth}" height="${labelHeight}"><rect width="100%" height="100%" fill="#06172b"/><text x="14" y="25" fill="#b6eaff" font-family="Arial,sans-serif" font-size="14" letter-spacing="1.4">${label}</text></svg>`);
  return await sharp({ create: { width: tileWidth, height: tileHeight, channels: 4, background: "#020812" } })
    .composite([{ input: image, left: 10, top: labelHeight }, { input: caption, left: 0, top: 0 }])
    .png().toBuffer();
}));
const canvasWidth = columns * tileWidth + (columns + 1) * gap;
const canvasHeight = rows * tileHeight + (rows + 1) * gap;
const composites = tiles.map((input, index) => ({
  input,
  left: gap + (index % columns) * (tileWidth + gap),
  top: gap + Math.floor(index / columns) * (tileHeight + gap),
}));
const output = resolve(outputDirectory, `round-${round}-contact-sheet.png`);
mkdirSync(dirname(output), { recursive: true });
await sharp({ create: { width: canvasWidth, height: canvasHeight, channels: 4, background: "#020812" } })
  .composite(composites).png({ compressionLevel: 9, adaptiveFiltering: false, palette: false }).toFile(output);
console.log(JSON.stringify({ output, width: canvasWidth, height: canvasHeight, views: sources.map(([label]) => label) }, null, 2));
