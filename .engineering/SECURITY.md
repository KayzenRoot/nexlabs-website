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

## Current boundary through M06B

The shipped surface through M06A is a public content-led frontend with no authentication, customer data store, analytics tracker, CMS/CRM or contact-submission backend. M06B remains read-only public content and introduces no form, user input, external embed or data collection by design. Research/Company public-proof claims must stay source-verifiable. Contact submission remains blocked for M06C and requires separately explicit server-side validation, abuse controls, rate limiting and failure-safe logging.


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
