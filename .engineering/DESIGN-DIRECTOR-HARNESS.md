# Master Design Director Harness — WO-013

Status: CANONICAL CORRECTION HARNESS

## Purpose

This harness converts the approved Home Visual Master from a vague art-direction target into a repeatable, inspectable design-production system.

The method adapts the useful parts of the referenced motion-design studio workflow to an interactive website:
- reference first;
- explicit design grammar instead of vibe words;
- deterministic visual states;
- physically motivated motion;
- specialist passes;
- generate-then-trace asset production;
- contact-sheet critique loops;
- harsh scoring before implementation is called complete.

This is not a video-production requirement. Audio/beat-grid techniques from the reference workflow are intentionally omitted because they do not serve the Nex Labs website.

## 1. Reference extraction first

Before changing product code, extract the approved master into a written design grammar.

Required outputs:
- `.engineering/design-director/master-style-guide.md`;
- `.engineering/design-director/master-scene-graph.md`;
- `.engineering/design-director/master-state-list.md`;
- `.engineering/design-director/master-asset-manifest.md`;
- `.engineering/design-director/review-log.md`.

The style guide must describe:
- composition zones and approximate percentages;
- palette by role, not merely hex list;
- chrome/glass/energy material behavior;
- light direction and intensity hierarchy;
- spatial density;
- foreground/midground/background layering;
- edge treatment;
- type hierarchy and tracking;
- icon-object vocabulary;
- section transitions;
- banned generic-AI patterns.

The scene graph must decompose the master into:
1. global environment;
2. header glass/rail;
3. left editorial copy;
4. central cylindrical N chamber;
5. floor/platform;
6. left lab/Earth displays;
7. right holographic panels;
8. human scale cue;
9. capability band;
10. lower Research world;
11. lower Technology stack;
12. footer continuity.

## 2. Director brief

Codex must write a compact director brief before implementation using structured blocks:

`<role>`
Act as design director, 3D scene architect, material/lighting artist, motion director and visual critic.
`</role>`

`<purpose>`
Make the live site materially match the approved master's composition, density, material response and spatial hierarchy without copying master pixels.
`</purpose>`

`<visual_identity>`
Dark cinematic research lab; chrome/silver N; cold white/cyan electric energy; restrained violet accents; glass HUDs; deep reflective floor; architectural cylindrical enclosure; dense but controlled technical atmosphere.
`</visual_identity>`

`<banned>`
Generic gradient hero; empty black space; flat icon cards; neon glow used as a substitute for depth; oversized blank panels; random particles; gaming HUD overload; master screenshot/crops in runtime.
`</banned>`

`<review>`
Render deterministic states, compare to master, score, list the 3 biggest gaps, fix, repeat for at least 3 critique rounds.
`</review>`

## 3. One world, never disconnected sections

The Home should behave like one continuous spatial world.

Do not treat Hero, Capabilities, Research and Technology as unrelated card sections.

The same design grammar must carry through:
- perspective lines;
- floor/rail continuity;
- cyan energy circulation;
- atmospheric depth;
- glass/chrome framing;
- scale relationships;
- object lighting direction.

Section boundaries may change density and camera framing but should not feel like switching templates.

## 4. Generate-then-trace pipeline

Use ComfyUI and Blender as admitted local authoring tools.

### Generate

ComfyUI produces controlled still studies from the master:
- hero chamber composition;
- material/lighting studies;
- Earth/network integration;
- capability-object silhouettes;
- Research lower-world;
- Technology stack.

The master remains reference-only.

### Trace

Blender converts selected studies into ownable geometry/material/light studies:
- chamber shell/rings/rails;
- reflective platform/floor;
- Earth/network globe;
- panel frames;
- capability micro-sculptures;
- Technology stack.

### Translate

The web implementation uses:
- existing Three/R3F geometry/materials;
- optimized GLB only where justified;
- raster posters only as generated/derived site assets;
- CSS/SVG/HTML for secondary routes.

Never project the master screenshot as texture or background.

## 5. Specialist passes

Do not solve the entire design in one prompt.

Run these passes in order:

1. **Reference Extractor**
   - writes style guide + scene graph;
   - no product-code changes.

2. **Scene Architect**
   - fixes composition, chamber, floor, Earth, panels and scale;
   - no motion polish yet.

3. **Material & Lighting Director**
   - chrome/glass/reflection/highlight hierarchy;
   - fixes black-flat geometry and overglow.

4. **Capability Object Designer**
   - five 3D/holographic objects;
   - no generic icon treatment.

5. **Lower-World Director**
   - Research + Technology as continuation of same lab world.

6. **Motion Director**
   - physically motivated springs/circulation/parallax;
   - no motion without a clear visual job.

7. **Harsh Critic**
   - compares deterministic frames against master;
   - records scores and the three worst gaps;
   - no implementation authorship during scoring.

Each pass must read the outputs of prior passes.

## 6. Deterministic visual states

For evidence, the site must support repeatable captured states through the existing test harness.

Required visual state list:
- Hero STATIC 1600x900;
- Hero FULL settled 1600x900;
- Hero FULL pointer-left;
- Hero FULL pointer-right;
- Hero FULL lower-scroll transition;
- Capabilities settled;
- Research lower-world settled;
- Technology lower-world settled;
- mobile 390x844;
- reduced motion;
- context-loss fallback.

In deterministic evidence mode:
- seeded noise only;
- no Math.random-driven visual output;
- force stable camera/object state at capture time;
- all captured state inputs are recorded.

Runtime may remain interactive, but evidence states must be reproducible.

## 7. Motion grammar

Major motion should use spring/mass behavior rather than generic uniform easing when practical.

Classes:
- **Snappy:** nav indicator, buttons, small HUD responses.
- **Default:** cards, panels, section depth.
- **Heavy:** N, chamber, large 3D structures.
- **Ambient:** rail light, network pulse, slow environmental breathing.

Rules:
- tiny or zero overshoot for premium UI;
- no bounce for large type;
- no continuous N spin;
- entrances may take longer than exits;
- distance influences duration;
- multi-element reveals are staggered so the eye reads a sequence;
- reduced motion disables nonessential behavior.

Do not add GSAP/Framer solely for this. Implement with existing code/CSS/Three.

## 8. Contact-sheet critique loop

Minimum three critique rounds are mandatory before requesting independent review.

Each round must retain a contact sheet containing:
- master;
- Hero candidate;
- capability candidate;
- lower Home candidate;
- one internal-page candidate;
- mobile candidate.

Score each round from 1–10 on:
- composition match;
- depth;
- material/lighting;
- environment density;
- object distinctiveness;
- brand accuracy;
- readability;
- motion purpose;
- mobile composition.

Then:
1. list the three biggest visual problems;
2. fix those three;
3. regenerate only affected evidence;
4. score again.

No round may claim completion if any of:
- composition match <8;
- depth <8;
- material/lighting <8;
- environment density <8.

The official WO-013 independent 85/100 gate remains final and separate.

## 9. Anti-slop rules

Reject:
- centered object on empty gradient;
- generic full-width dark cards;
- everything fading in;
- random particle bursts;
- glow substituting for geometry/material;
- flat icon inside rounded rectangle when the master shows a spatial object;
- large empty black regions where the master has architecture;
- fake dashboards, metrics, search, social links or claims.

## 10. Evidence outputs

Create under:
`.engineering/evidence/NEXLABS-WO-013-VISUAL-FIDELITY-MASTER-ALIGNMENT/design-director/`

Required:
- `round-01-contact-sheet.png`;
- `round-01-review.md`;
- `round-02-contact-sheet.png`;
- `round-02-review.md`;
- `round-03-contact-sheet.png`;
- `round-03-review.md`;
- final deterministic state manifest;
- final style-guide/scene-graph hashes;
- before/after master comparison.

The executor must not self-approve. Independent audit still owns the final score.
