# Brand System — M03 Planning Source

Status: ACTIVE PLANNING SOURCE

## Brand objective

Nex Labs Technology should present as a premium advanced-technology company: intelligent, precise, cinematic, research-oriented and human-centered. The identity must feel original and durable rather than resembling a generic AI startup, gaming clan or crypto token.

## N monogram brief

The symbol must be an original capital-N abstraction formed from two or three interlocking planes, blades or ribbons.

Required qualities:
- immediately readable as an N at small sizes;
- distinctive silhouette before material/lighting effects;
- clean monochrome SVG form;
- balanced in square and horizontal lockups;
- technically elegant, not aggressive;
- compatible with the chrome/glass visual language of the selected Home;
- avoids direct resemblance to common tech, gaming, automotive or crypto marks;
- avoids excessive detail, thin internal gaps or fragile strokes;
- works at favicon scale without depending on gradients.

Preferred geometry:
- forward/upward directional energy;
- asymmetry is allowed if the silhouette remains stable;
- one diagonal bridge should feel intentional and proprietary;
- corners may combine precision cuts with subtle optical rounding;
- negative space may help form the N but cannot destroy recognition.

## Enhanced material version

The enhanced presentation may use:
- chrome/silver reflections;
- cold blue/cyan internal light;
- restrained violet edge accents;
- glass or translucent depth;
- one controlled light sweep.

The flat SVG remains the master identity. Material effects are presentation layers, not the logo's identity.

## Motion

Allowed states:
- intro: 2–3 planes assemble into the N;
- light pass: one restrained luminous sweep;
- hover: a few degrees of depth/parallax, then spring/damp back;
- idle: nearly imperceptible reflection drift;
- reduced motion: static mark.

Do not:
- spin continuously;
- pulse like a gaming logo;
- use noisy glitch;
- require WebGL for the header logo;
- delay navigation while the logo animates.

## Lockups

Required implementation variants:
1. Symbol only.
2. Horizontal: symbol + NEX LABS.
3. Horizontal extended: symbol + NEX LABS / TECHNOLOGY.
4. Monochrome light.
5. Monochrome dark.
6. Enhanced chrome presentation.

### Clear space and minimum-size rules

Use the canonical symbol width as unit `N`.

- Minimum clear space around symbol-only usage: `0.25N` on every side.
- Minimum clear space around horizontal lockups: `0.25N` above/below and at the outer edges.
- Symbol-to-wordmark gap: target `0.20N`–`0.28N`, finalized optically with the selected type treatment.
- Standard digital symbol minimum: 24 CSS px.
- Simplified favicon mark: permitted at 16 px only after the selected geometry passes a dedicated legibility check.
- Horizontal lockup minimum rendered height: 24 CSS px.
- Extended NEX LABS / TECHNOLOGY lockup minimum rendered height: 28 CSS px.
- Below these sizes, use the simplified symbol-only variant rather than compressing the full lockup.
- Clear-space exceptions are not allowed for decorative chrome effects; glow/reflection may visually extend outside the protected area but the underlying vector geometry may not.

### Favicon and app-icon simplification rules

The small-mark variant is a governed simplification of the selected N, not a different logo.

At 16–20 px:
- use symbol only; never include NEX LABS or TECHNOLOGY text;
- preserve the outer silhouette and the defining diagonal bridge;
- remove secondary internal cuts/gaps that collapse below one device pixel;
- reduce material treatment to flat monochrome or at most two solid tones;
- do not rely on gradients, glow, transparency, bevels or chrome reflections for recognition;
- optical corrections may thicken narrow planes or enlarge negative-space openings, but may not change the identifying direction of the mark.

For favicon exports:
- validate at 16x16 and 32x32 raster previews in addition to the SVG/vector master;
- prefer a transparent field when contrast remains sufficient; otherwise use the approved near-black field;
- center the mark optically, not mechanically, while keeping at least 1 px visual breathing room at 16x16.

For app/icon-square usage:
- use symbol only inside a square artboard;
- keep core vector geometry inside a 75% central safe area, leaving approximately 12.5% per side before presentation effects;
- chrome/glass effects may exist only in enhanced large-size exports; the base app icon must remain identifiable in flat monochrome;
- rounded container corners belong to the platform/app icon container, not to the core N geometry.

## Typography direction

- Wordmark: custom-spaced geometric grotesk treatment.
- Headings: elegant geometric/grotesk family with thin-to-medium weights.
- Body: neutral highly legible grotesk.
- Micro labels: compact uppercase with deliberate tracking.

Final font families must have production-appropriate licensing and good Latin coverage. Brand proportions and optical spacing are more important than chasing a trendy font name.

## Color/material roles

- near-black / graphite: primary field;
- cold white: primary text;
- blue-gray: secondary text;
- ice cyan: primary energy accent;
- electric blue: secondary accent;
- restrained violet: tertiary highlight;
- silver/chrome: enhanced logo/3D material only.

## Concept-generation protocol

Implementation should generate at least 12 distinct N monogram directions, grouped across:
- precision blades;
- ribbon/flow;
- crystalline/glass;
- monolithic/architectural.

From those, shortlist 3 candidates that best satisfy the objective criteria. The owner selects the final direction before vector master implementation.

Reject candidates that:
- lose the N at 16–24 px;
- resemble a known/common mark too closely;
- rely on glow to be identifiable;
- look gaming/esports;
- use excessive internal detail;
- feel disconnected from the chrome-intelligence Home direction.

## Final implementation evidence

Before approval, retain:
- concept board;
- 3-candidate shortlist;
- owner-selected direction;
- SVG master;
- favicon-size render checks;
- monochrome/inverse checks;
- horizontal lockups;
- header integration screenshots;
- reduced-motion and animation behavior;
- exact-head lint/typecheck/build/browser evidence.
