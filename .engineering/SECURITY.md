# Security Policy

## Repository baseline

- Keep the npm package private.
- Keep @gef-bootstrap/cli pinned exactly and retain package-lock.
- Never commit credentials, tokens, local transaction journals or personal secrets.
- Keep .gef-private excluded from version control.
- Dependency/security tooling gaps must remain explicit and must not be converted into PASS without evidence.

## Website V1 product security

- Public content must not expose private repository, account or operational secrets.
- Contact handling, when implemented, requires server-side schema validation, rate limiting, abuse controls and failure-safe logging.
- No authentication, privileged admin surface or customer data store is admitted in V1 without a separate elevated-risk Work Order.
- Do not add third-party trackers, pixels or cookies by default.
- Any analytics/marketing integration requires an explicit privacy review and data-flow update.
- External links and embeds must be deliberately allowlisted where practical.
- Security headers/CSP strategy must be addressed before production release.
- Public claims, partner names, metrics and testimonials require factual source verification.

## Current public boundary through M06

The shipped V1 surface is public read-only content. There is no authentication, customer datastore, analytics tracker, CMS/CRM or contact submission backend. Contact remains zero-collection. M07A hardens production response policy and release artifacts without changing this data boundary.


## M06C zero-collection Contact boundary
M06C adds a dedicated Contact route but deliberately introduces zero data collection.

Required:
- no form/input/textarea/file upload/submit control;
- no contact API/server action;
- no email provider, CRM, newsletter or database;
- no mailto/tel or unverified contact channel;
- no analytics/tracker addition;
- no persistence or contact-specific data logging;
- public copy states that the page does not request or transmit personal information.

Any future communication/submission path requires verified channel provenance, server-side validation, abuse/rate controls, privacy/retention rules, secure failure handling and explicit evidence.


## M07A release security obligations

- Production-only CSP/header policy must be implemented and evidenced.
- HSTS is forbidden until an HTTPS production origin/TLS termination is explicitly admitted.
- Pre-launch builds remain noindex/nofollow.
- Production candidate runs non-root with reduced Linux privileges.
- Final runtime image must exclude repository/internal docs/tests/secrets.
- Release Readiness workflow must not receive production credentials or deploy.
- Dependency and secret checks remain required.
- Contact zero-collection remains unchanged.


## WO-013 local AI/3D tooling security

- ComfyUI must listen on `127.0.0.1` only.
- Do not use `--listen 0.0.0.0` or LAN exposure.
- Model/provider tokens stay in user environment or credential storage and must never enter Git/evidence.
- Model weights require provenance/license/checksum recording.
- Third-party ComfyUI custom nodes are denied by default; each exception requires source review and a pinned commit.
- Blender background Python scripts are repository-reviewed local code.
- Blender automatic Python execution remains disabled unless a reviewed script explicitly needs it.
- Official Blender MCP is disabled by default due its upstream warning about unguarded execution of LLM-generated Blender code.
- If MCP is ever authorized, use a sanitized isolated environment with no secrets/wallets/browser credentials/unrelated repositories.
- Raw generated media is treated as untrusted until optimized and selected.
