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

## Current boundary through M05

The shipped surface through M05 is a public content-led frontend with no authentication, customer data store, analytics tracker, CMS/CRM or contact-submission backend admitted. M06 planning must refine route-level threat assumptions, external-link handling and the Contact page boundary. Any form submission or data collection requires a separately explicit server-side security scope.
