# Master Scene Graph — WO-013 Reference Extraction

Status: BASELINE EXTRACTED — PHASE A, NO PRODUCT CODE CHANGED

Reference identity: locked master SHA-256 `d7a715dbee7c2174ed6e4a0bcdc02cba0b3a644af5d24845cae55d30f60ff647`, 1600×900. Coordinates below are normalized reference-space estimates; x and y range from 0 to 1. They define hierarchy, not pixel-locked implementation coordinates.

| Layer | Approximate region | Objects and relationships | Depth / rendering cues |
| --- | --- | --- | --- |
| 1. Global environment | full frame | Dark research laboratory spans every section and continues behind header, Hero, capabilities, lower worlds and footer. | Blue-black falloff; curved side structures; fine particles only as low-contrast depth cues. |
| 2. Header glass/rail | y 0.00–0.075 | Logo left; primary navigation across center; search affordance is present in the reference but product implementation must not invent a fake search; Contact CTA and compact brand descriptor right. | Smoked glass, upper/lower hairline rails, controlled blur, active route rail. |
| 3. Left editorial copy | x 0.05–0.35, y 0.10–0.49 | Eyebrow, three-line headline, short paragraph, primary/secondary actions and four compact proof points. Preserve canonical product copy; do not copy unapproved text/metrics from the image. | Left-aligned, high contrast; quiet readable pocket with dim architecture behind it. |
| 4. Central cylindrical N chamber | x 0.34–0.82, y 0.04–0.46 | Monumental Precision Blades N centered in a cylindrical enclosure. Curved upper rings, lower ring assembly, repeated vertical ribs and side braces surround it. | N occludes central supports; outer ribs partly occluded by foreground rails; bright axial vertical illumination. |
| 5. Floor/platform | x 0.34–0.88, y 0.35–0.485 | Nested circular metallic dais, concentric seams and radial approach rails anchor the N. | Dark graphite metal, thin blue-white inlays, reflections taper with distance; foreground rail crosses scene. |
| 6. Left lab/Earth displays | x 0.31–0.49, y 0.14–0.40 | Earth/network hologram and layered instrument screens bridge the editorial pocket and central chamber. | Small-scale screens recede behind the human/console layer; globe is larger/brighter than side displays. |
| 7. Right holographic panels | x 0.70–0.98, y 0.13–0.42 | One prominent angled glass panel plus a narrow right information rail; secondary technology traces echo left displays. | Glass thickness, edge-light, perspective, right-edge crop/occlusion to imply a larger room. |
| 8. Human scale cue | x 0.44–0.49, y 0.31–0.47 | A single dark standing silhouette in front of the dais, visually small relative to N and room. | Strong scale contrast; feet grounded on floor, silhouette partly overlaps lights/rails. |
| 9. Capability band | y 0.485–0.695 | Intro block at left, then five object bays spanning the remaining width. Objects rise above short title/description and small directional affordance. | Consistent horizon/rails, thin cool borders, per-object glow, compact typography. |
| 10. Lower Research world | x 0.00–0.57, y 0.695–0.935 | Copy left; large Earth/network, lab aperture, consoles, a small human cue and lower caption occupy center/right. | Same chamber rails and dark floor; Earth is dominant and partially framed by architecture. |
| 11. Lower Technology stack | x 0.57–1.00, y 0.695–0.935 | Copy and system list on left; large luminous layered stack/plinth on right. | Stack sits in perspective on a dark platform, multiple visible layers, axial light and continuing rails. |
| 12. Footer continuity | y 0.935–1.00 | Brand lockup, primary routes, Contact and existing approved social/icon destinations. Do not add links that are not verified in product authority. | Dark chrome band, thin top rail, shared typography and icon geometry. |

## Occlusion order

1. Atmosphere and chamber shell.
2. Distant vertical ribs and remote screens.
3. Earth and angled holographic panels.
4. N support frame and ring hardware.
5. N sculpture and central dais.
6. Near rails, floor reflections and human cue.
7. Foreground editorial copy and interface controls.

This ordering is a conceptual graph. Runtime materials remain separate from the master image; do not use the master as a texture, environment map or background.

## Cross-section continuity

- A narrow blue energy line exits the Hero lower ring and reappears as the capability horizon.
- Capability object light direction matches the Hero axial key and cool rim.
- Research inherits the left-side Earth/display grammar and human scale.
- Technology inherits the circular platform, layered chrome and stacked infrastructure vocabulary.
- Footer rails and separators finish the same world.

## Implementation boundaries

- Canonical Precision Blades path is immutable; extrusion, bevel and material may add depth without changing its silhouette.
- Only the existing Home R3F scene owns WebGL. Secondary pages remain CSS/SVG/HTML.
- Generated image studies are reference-only. Any selected production asset must be reviewed, optimized, fingerprinted and proven not to contain master pixels or invented text/branding.
