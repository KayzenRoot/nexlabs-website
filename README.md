# Nex Labs Technology Website

Official website repository for **Nex Labs Technology**.

## Current phase

M02 — Runtime & Repository Foundation is in progress in PR #4. This increment
establishes the Next.js/TypeScript shell, design tokens, a static Home fallback,
tests, CI and repository guardrails. It does not include production 3D, final
brand artwork, secondary pages, backend integrations or deployment.

The repository uses the exact `@gef-bootstrap/cli@1.1.2` pin and remains private
as an npm package. Implementation proceeds under the admitted Work Order and
Context Lock; merging and Checkpoint promotion belong to the independent audit.

## Website language

English is the website's default language. Portuguese and Spanish are planned
localizations; this runtime foundation does not add a language switcher or
localization infrastructure.

## Requirements

- Node.js 22 or newer
- npm and Git

## Local development

```sh
npm ci
npm run dev
```

## Validation

```sh
npm run lint
npm run typecheck
npm run test
npm run build
npx playwright install chromium
npm run test:e2e
```

The browser smoke command runs against the production build. It retains Home
screenshots at 390×844 and 1440×900 under
`.engineering/evidence/NEXLABS-WO-003-RUNTIME-FOUNDATION/screenshots/`.
