# Master State List — WO-013 Deterministic Review States

Status: BASELINE EXTRACTED — PHASE A, NO PRODUCT CODE CHANGED

## Capture contract

- Capture at the listed viewport and state only after fonts, poster and scene have settled. Record exact route, viewport, color scheme, motion preference, quality tier, elapsed settle time, pointer position and source HEAD in the state manifest.
- Use fixed scene seeds and explicit state controls; no `Math.random`-driven evidence. Screenshot replay must reproduce the same state independent of capture order.
- Capture candidate and master side by side without cropping the master. Comparison sheets may resize both to fit but must preserve the complete source composition and label scale.
- Do not let reference-only master pixels enter the application or production output.

## Required states

| ID | Route/state | Viewport | Inputs to fix | Purpose |
| --- | --- | --- | --- | --- |
| DD-01 | Home Hero STATIC | 1600×900 | `quality=static`, `prefers-reduced-motion=reduce`, pointer center, settled poster | Poster-first hierarchy and no-WebGL fallback. |
| DD-02 | Home Hero FULL settled | 1600×900 | `quality=full`, motion allowed, pointer center, scene-ready, fixed seed | Primary master comparison for chamber, N, floor and environment. |
| DD-03 | Home Hero FULL pointer-left | 1600×900 | FULL, pointer (0.18, 0.50), fixed seed | Bounded parallax range and readable copy. |
| DD-04 | Home Hero FULL pointer-right | 1600×900 | FULL, pointer (0.82, 0.50), fixed seed | Symmetry/bounds and panel/chamber response. |
| DD-05 | Home Hero FULL lower-scroll | 1600×900 | FULL, page scroll at capability/lower transition, fixed seed | One-world continuity and scroll-linked depth. |
| DD-06 | Capabilities settled | 1600×900 | settled section, fixed seed | Distinctness and volume of all five objects. |
| DD-07 | Research lower-world settled | 1600×900 | Research section at canonical anchor, fixed seed | Earth scale, lab depth, human cue and rails. |
| DD-08 | Technology lower-world settled | 1600×900 | Technology section at canonical anchor, fixed seed | Stack scale, layer depth and integration with systems list. |
| DD-09 | Home mobile | 390×844 | STATIC/reduced motion and closed menu; capture menu open separately | Responsive hierarchy and readable hero. |
| DD-10 | Home mobile menu open | 320×844 | Menu open, keyboard focus on first item, reduced motion | Accessible navigation and focus/scroll behavior at narrow width. |
| DD-11 | Home reduced motion | 1440×900 | `prefers-reduced-motion=reduce`, FULL requested | Motion suppression with stable composition. |
| DD-12 | Home context loss | 1600×900 | Force WebGL context loss after poster render | Poster/fallback remains visible without broken controls. |
| DD-13 | Secondary route | 1600×900 | Capture Technology, Solutions, Research, Company and Contact individually | Consistent CSS/SVG depth without extra WebGL. |

## Critique sheet contents

Every round sheet includes: full master; full candidate Hero; five-object capability view; lower Research and Technology; one internal page; and mobile Home. Each item is labeled with its state ID and unaltered source aspect ratio. The nine scores are composition match, depth, material/lighting, environment density, object distinctiveness, brand accuracy, readability, motion purpose and mobile composition.

## Motion input rules

- Use fixed timestamps and fixed pointer/scroll input. Never infer an animation frame from wall-clock time for the evidence harness.
- Capture settled motion at the same declared timestamp after deterministic state selection.
- The reduced-motion state must suppress nonessential movement, not hide required objects or reduce contrast.
- Context-loss evidence must show the visible fallback after loss, not only a console event.
