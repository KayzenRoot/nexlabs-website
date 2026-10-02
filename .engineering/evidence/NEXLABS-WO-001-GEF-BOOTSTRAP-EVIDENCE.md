# Evidence Bundle — NEXLABS-WO-001-GEF-BOOTSTRAP

Evidence state: command outputs below are retained in the adjacent evidence directory. The final immutable PR head SHA and final doctor/status summary are recorded in the PR description after push; this file does not attempt to embed its own resulting commit SHA.

## Repository identity and Git state

- Repository: KayzenRoot/nexlabs-website
- origin: https://github.com/KayzenRoot/nexlabs-website.git
- Base branch: main
- Base SHA: 51c9a3c5170dbeffcb8f856c38b62cce624d294b
- Branch: gef/bootstrap-v1.1.2
- Final head SHA: see the exact PR head in the PR description.
- Initial working tree: clean on main before branch creation and edits.
- Synchronization: git fetch origin main; git pull --ff-only origin main; already up to date.

## Toolchain and package

- Node.js: v24.19.0 (requirement >=22: PASS)
- npm: 11.17.0 (functional)
- Git: 2.55.0.windows.3 (functional)
- GitHub CLI: 2.101.0; authenticated account KayzenRoot; repository permission ADMIN.
- Direct GEF dependency: @gef-bootstrap/cli@1.1.2, exact in package.json and package-lock.json.
- npm ls --depth=0: PASS; one direct dependency, @gef-bootstrap/cli@1.1.2.
- npm audit --audit-level=high: PASS; zero vulnerabilities.
- Package integrity: unretained author observation — lockfile SRI matches the npm registry and the official GEF v1.1.2 release record.

## Required GEF commands

| Command | Result | Evidence |
| --- | --- | --- |
| npx gef --version | PASS; version 1.1.2, Node v24.19.0, win32 | gef-version.json |
| npx gef --help | PASS; admitted commands rendered | gef-help.json |
| npx gef init --json | PASS; read-only preview, effect NONE; run before apply | gef-init-preview-initial.json |
| npx gef init --apply | PASS; initial transaction APPLIED; state at .gef/init-state.json | gef-init-apply-initial.json |
| npx gef doctor | PASS; toolchain invariants healthy. Before checkpoint existed it correctly reported governance absent; after documents were created it validated .engineering/CHECKPOINT.json. | gef-doctor-initial.json; gef-doctor-after-governance.json; gef-doctor-precommit.json |
| npx gef status | PASS command; checkpoint is valid and product progress is 0%. Final status reports stale=true and drift=UNEXPECTED because canonical sources were added after the first init baseline. | gef-status-initial.json; gef-status-before-baseline-refresh.json; gef-status-precommit.json |

The initial preview plan digest was e7c55bed5c91ff1899d369a55dd112386a9f0598844054a8240c7830ced86649. The initial apply completed with transaction outcome APPLIED and wrote a GEF receipt. The preview preceded its apply.

A second read-only init preview recognized .engineering/CHECKPOINT.json as canonical READY and produced plan digest 5e936c0b9d0a1a93c1bcda57db45711f6551233ce3d191118af2230876531f80. Its follow-up init apply was safely blocked with dry_run_stale and effectStatus NONE. The distributed CLI implementation uses create-only transaction semantics for .gef/init-state.json; that target already exists from the successful first apply. No state was overwritten. Reapplying init cannot refresh the baseline.

## Source Pack and canonical structure

The Source Pack index maps all 14 GEF required semantic classes to canonical project documents. Work Order, Context Lock, checkpoint, scope, requirements, architecture, definition of done, security, validation plan, deployment status, backlog, decisions/ADRs, technology and innovation ledgers are present. Product progress remains 0%, and no website code or frontend dependency was added.

GEF CLI 1.1.2 does not expose a Source Pack generation or Source Pack conformance command. The index is therefore a human-curated bootstrap candidate, not an engine-issued integrity/conformance receipt; this capability gap is explicit in SOURCE-PACK-INDEX.md and remains a review item. Its documents were created after the successful first init, so GEF status correctly reports drift against the original baseline. The CLI has no greenfield-safe baseline refresh path after the create-only init state exists; the initial receipt/state are preserved and the stale state is disclosed.

## GitHub configuration and capability gaps

- gh verified the repository identity, main default branch, authenticated KayzenRoot account, and ADMIN permission.
- Main branch protection lookup returned HTTP 404 (branch not protected); repository rulesets were empty.
- GitHub Actions are enabled and allow all actions. The repository had no workflow or required-check configuration at the starting SHA.
- The GEF doctor reports GitHub security as REVIEW with writePermission=false because the CLI has no GitHub provider evidence, despite the independent gh permission observation above.
- GEF status reports stale=true and drift=UNEXPECTED because the governance documents were added after the immutable create-only init-state baseline. A second init apply was refused with effect NONE; no state was deleted or overwritten.
- npm audit signatures exits 1 with registry 404 for bundled internal packages such as @gef-bootstrap/config@0.0.0. The CLI package tarball is self-contained; the official v1.1.2 release record reports npm signature and SLSA verification as VERIFIED, and its dist.integrity matches the installed lockfile. Generic npm signature audit could not complete for the bundled 0.0.0 modules.
- No GitHub protection or security gate was changed.

## Files and outputs

- Root: AGENTS.md, .gitignore, package.json, package-lock.json.
- GEF-managed: .gef/init-state.json and .gef/receipts/run-1-5fb3f415978c.json. .gef-private is excluded from Git.
- Canonical project governance: .engineering/README.md, PROJECT-OVERVIEW.md, CONSTITUTION-LOCK.md, SOURCE-HIERARCHY.md, SOURCE-PACK-INDEX.md, CHECKPOINT.json, CHECKPOINT.md, SCOPE.md, REQUIREMENTS.md, ARCHITECTURE.md, DEFINITION-OF-DONE.md, SECURITY.md, TEST-BENCHMARK-PLAN.md, DEPLOYMENT.md, BACKLOG.md, DECISIONS-LEDGER.md, INNOVATION-LEDGER.md, TECHNOLOGY-LEDGER.md.
- Work Order and closure: .engineering/work-orders/NEXLABS-WO-001-GEF-BOOTSTRAP.md, .engineering/context-locks/NEXLABS-WO-001-GEF-BOOTSTRAP.json, .engineering/checkpoint-deltas/NEXLABS-WO-001-GEF-BOOTSTRAP-PROPOSED.md, and two ADRs under .engineering/decisions/.
- Raw command/check outputs: .engineering/evidence/NEXLABS-WO-001-GEF-BOOTSTRAP/.

## Checks, risks, and checkpoint delta

- JSON package, lockfile, checkpoint, and Context Lock bindings: PASS.
- npm dependency audit: PASS with zero vulnerabilities.
- npm signature audit: capability gap described above; not reported as a pass.
- No application test/build exists or was added because no product code exists. GEF CLI, package-tree, audit, JSON/binding, and Git diff checks are the applicable bootstrap checks.
- Known HIGH/CRITICAL findings: none observed.
- Proposed checkpoint delta: .engineering/checkpoint-deltas/NEXLABS-WO-001-GEF-BOOTSTRAP-PROPOSED.md; NOT_PROMOTED.
- Stop condition: PR OPEN and UNMERGED. Final Git cleanliness and exact head are stated in the PR description after push; the GEF stale/drift state remains an explicit capability gap.
