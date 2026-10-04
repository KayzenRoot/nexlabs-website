# Deployment

## Current state

Production deployment remains NOT_ADMITTED through M06B. No hosting provider, production URL, environment model, build/release pipeline or production credential has been selected.

## V1 deployment requirements

Before production launch, a later Work Order must:
- select the hosting/runtime provider with an ADR;
- define preview/staging/production environments;
- define build and release commands;
- define secrets/environment-variable ownership;
- define rollback or roll-forward procedure;
- verify security headers, SEO/canonical configuration and contact-route behavior;
- retain deployment evidence and post-deploy validation.

M02 may establish local build and CI foundations, but it must not publish a production website unless a later deployment Work Order explicitly authorizes it.
