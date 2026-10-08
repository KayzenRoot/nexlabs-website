# Temporary Vercel Pre-Launch Deployment Specification

Status: CANONICAL WO-013 TEMPORARY PUBLIC DEPLOYMENT SOURCE

## Purpose

The owner needs a public, functional Nex Labs URL as soon as possible for external company/service registration while final visual-fidelity work continues.

This is **not final launch acceptance**.

The temporary public deployment is explicitly allowed only to:
- expose a functional company website over HTTPS;
- support Anthropic/company registration and similar verification needs;
- provide a stable public URL while WO-013 visual work continues.

## Vercel target

Existing linked project prepared by the owner workflow:
- team: `claytons-projects-5922d27c`;
- team ID: `team_OE3MNboVFDX58OGsMNGPLAnf`;
- project: `nexlabs-website`;
- project ID: `prj_HtZ5M9lpS0JZhkaHLbTCrWX38YHV`;
- Git repository: `KayzenRoot/nexlabs-website`;
- Vercel production branch remains `main`;
- no deployment existed when this spec was admitted.

The Codex deployment may use Vercel CLI from the exact reviewed PR #20 working tree to create a **production-target pre-launch deployment** without merging the branch.

## Mandatory visible notice

Every public route must show, above the normal navigation, a persistent compact notice:

`PRE-LAUNCH — This website is still in production and is not yet final.`

Requirements:
- visible on desktop and mobile;
- visually integrated with Nex Labs dark/cyan system;
- semantic text, not canvas;
- must not cover navigation/content;
- must respect responsive layout;
- cannot be dismissible for this temporary deployment;
- must remain until the owner explicitly removes it in a later admitted change.

## Search/indexing posture

The temporary deployment remains pre-launch:
- global `noindex, nofollow` stays enabled;
- `robots.txt` continues to disallow crawling;
- sitemap remains absent;
- no canonical production URL is introduced;
- no analytics/tracking is introduced.

A public Vercel URL does not change the current indexing policy.

## Deployment boundary

Authorized now:
- Vercel project linkage already prepared;
- build/deploy the exact PR #20 candidate to Vercel production target;
- use the Vercel-generated HTTPS URL;
- perform live smoke/security/accessibility checks;
- redeploy the same reviewed SHA if required by build infrastructure.

Not authorized:
- custom domain purchase/configuration;
- DNS changes;
- final SEO/index enablement;
- removal of pre-launch banner;
- analytics;
- Contact data collection;
- M07B final-launch acceptance;
- merge of PR #20 solely because deployment succeeded.

## Pre-deploy gates

Before `vercel --prod`:
1. exact Context Lock has 0 STALE;
2. branch is the existing PR #20 branch;
3. working tree is clean;
4. package manifests are unchanged;
5. CI Quality PASS;
6. Browser Smoke PASS;
7. Release Readiness PASS;
8. Sonar/Socket/CodeRabbit have no blocking unresolved finding;
9. local production build passes;
10. six routes pass locally;
11. pre-launch banner test passes on all six routes;
12. noindex/robots/sitemap-absence regression passes.

Visual score >=85 is **not** required for this temporary deployment because the banner explicitly identifies the site as unfinished. It remains required for final WO-013 approval/merge and final launch acceptance.

## Deployment procedure

Prefer the Vercel CLI authenticated to the owner account.

1. verify `vercel whoami`;
2. verify/link project `nexlabs-website` under team `claytons-projects-5922d27c`;
3. pull project settings without importing secrets into Git;
4. deploy exact working tree with `vercel --prod --yes`;
5. capture deployment ID, commit SHA, URL, target and build status;
6. wait until deployment is READY;
7. perform live route/status tests over the returned HTTPS URL.

If CLI login is missing, stop only for the minimum interactive Vercel login, then resume automatically.

## Live validation

Required over the Vercel URL:
- `/`, `/technology`, `/solutions`, `/research`, `/company`, `/contact` return HTTP 200;
- missing route returns branded 404;
- pre-launch banner appears on all six routes;
- main navigation and Contact work;
- no obvious console/runtime error;
- no horizontal overflow at representative mobile;
- robots metadata remains noindex/nofollow;
- `/robots.txt` disallows crawling;
- `/sitemap.xml` remains absent;
- security headers remain at least as strict as supported by the app/Vercel runtime;
- Contact remains zero-collection.

## Evidence

Create:
- `.engineering/evidence/NEXLABS-WO-013-VISUAL-FIDELITY-MASTER-ALIGNMENT/vercel-prelaunch/deployment.json`;
- live smoke report;
- live header/indexing report;
- desktop screenshot with banner;
- mobile screenshot with banner;
- Vercel build/deployment URL and status;
- rollback evidence or documented rollback command.

Do not record auth tokens/cookies.

## Rollback

If the deployment is broken:
- do not change DNS;
- restore the last known-good Vercel production deployment if one exists;
- otherwise remove/promote-away the broken deployment using Vercel controls;
- keep PR #20 open and fix in the same branch;
- never bypass failed functional/security gates merely to keep a public URL.

## Stop condition

Stop with:
- Vercel production-target pre-launch deployment READY;
- public HTTPS URL recorded;
- six live routes healthy;
- pre-launch banner visible;
- noindex posture intact;
- live evidence complete;
- PR #20 still OPEN;
- no checkpoint promotion;
- no M07B final-launch declaration.
