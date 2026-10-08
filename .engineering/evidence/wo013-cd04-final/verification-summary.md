# NEXLABS-WO-013 — Correction Delta 04 verification addendum

**Work Order:** `NEXLABS-WO-013-VISUAL-FIDELITY-MASTER-ALIGNMENT`
**Admission base:** `e14cfbe4660b076db85e7e529befffe17a098cd1`
**Audited starting HEAD:** `c9c2a332ea070646d52881756abe64d9ad6fb673`
**Code correction commit:** `146fef80905ea5ec31ba1219aeb9f9f69c9fd3e2`
**PR:** [#20](https://github.com/KayzenRoot/nexlabs-website/pull/20), OPEN; no merge.

## Sonar finding and correction

The latest completed Sonar analysis before this code commit still reported one new-code `pythonsecurity:S8707` vulnerability (`AaEaunfYCXFy810awQdb`, MAJOR), flowing from `argparse.parse_args()` to the optimizer's `Path.write_text()` sink. New-code Security measured C and Reliability A. The exact-head analysis for `146fef8` was still pending when this addendum was prepared; no prior rating is treated as a pass.

The optimizer now confines `--source` to an existing `.glb` resolved beneath the local `VisualPipeline/generated` directory, rejects a generated root inside the repository, and rejects traversal or links resolving outside the allowed tree. Its output name remains fixed below the user data directory. It stages the GLB and JSON in the system temporary directory, checks the output hierarchy for symlinks/junctions, and revalidates each fixed destination immediately before `os.replace`. Existing hard-linked destinations are rejected. No report field or path is controlled by `--source`.

Changed paths are `tools/visual-pipeline/optimize-runtime-glb.py`, its README, and `tools/visual-pipeline/tests/test_optimize_runtime_glb_paths.py`. The path suite passed 8/8, including output-directory junction substitution and hard-link publication races. `quality-tier.ts`, app behavior, package manifests, dependencies, thresholds, and test coverage were not changed in this correction.

## Local checks

| Check | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm test` | PASS — 5 files, 43 tests |
| `npm run build` | PASS — all six product routes generated |
| `npm audit --audit-level=moderate` | PASS — 0 vulnerabilities |
| Python optimizer path tests | PASS — 8/8 |
| Python syntax compilation | PASS |
| Full local E2E, `retries=0` | PASS — 31/31; port 3106; captured in the local evidence log |
| `git diff --check` on correction paths | PASS |
| Package manifest diff | Empty |
| Secret-pattern scan on changed source/docs/tests | No matches |

Node is `v24.19.0`; npm is `11.17.0`. No dependency was installed or changed by the correction.

## Three consecutive production-candidate suites

The qualifying runs used one unchanged production image and container, serially, with the complete Playwright suite, one worker, and `retries=0`. Both `NEXLABS_RELEASE_PORT` and `E2E_PORT` were set to `3102`.

- Image: `nexlabs-website-release-candidate:wo013-cd04-0dbb768`
- Image digest: `sha256:2f05c1193e6dbf92313dc1b9414ff360fa834508dea7f46b1f3d6f1b59b35a0c`
- Container: `c94582ac97bb8864fc9d5968a0eb5ce29467036d57af6ab9de43bced77cdb4d2`, healthy at `127.0.0.1:3102`
- Immutable website source represented by the image: `0dbb768554b818d8319395441a990a6f748ead74`. This correction changes local authoring tooling and evidence only; it does not change the website runtime image.

| Run | Complete suite | Home mobile LCP | Interaction proxy | CLS | Initial route JS gzip |
| --- | ---: | ---: | ---: | ---: | ---: |
| 1 | 31/31 PASS | 1900 ms | 88 ms | 0 | 151,360 bytes |
| 2 | 31/31 PASS | 1748 ms | 128 ms | 0 | 151,360 bytes |
| 3 | 31/31 PASS | 1748 ms | 152 ms | 0 | 151,360 bytes |

All three remain below the unchanged LCP 2500 ms, interaction 200 ms, CLS 0.1, and initial JS 225,280-byte limits. The test suite retains its existing frame samples and all budget assertions. On this headless SwiftShader host, FULL/BALANCED requests correctly remain STATIC; separate same-image RTX 5050 FULL/BALANCED evidence remains in the existing WO-013 bundle.

Each run's exact command, full suite log, `home-performance-report.json`, and phase-level `home-performance-diagnostics.jsonl` are retained under `verified-run-01` through `verified-run-03`. These receipts include image digest, measured results, and SHA-256 hashes in `candidate-performance-variance.json`.

One earlier non-qualifying attempt is also retained under `candidate-run-01`: it set the candidate port to `3102` but omitted `E2E_PORT`, so the measurement test navigated to its default port `3100` and failed with `ERR_CONNECTION_REFUSED` (30/31). It is explicitly excluded from the consecutive sequence; no retry, timeout, coverage, or budget was changed.

## Context, Docker, and current hosted-gate state

At `146fef8`, all 30 Context Lock critical Git blobs matched; stale count was 0. The approved visual master blob and SHA-256 remain unchanged. The worktree's generated `AGENTS.md` block remains local and unstaged. `npx gef status --json` cannot observe this linked worktree (`GIT_DIRECTORY_NOT_A_DIRECTORY`, `WORKING_TREE_NOT_OBSERVED`); this is recorded as a GEF observation limitation, not as GEF validation. The direct Context Lock blob comparison is the reported source of the 0-STALE result.

Development Docker `nexlabs-website-web-1` remains UP/healthy at `127.0.0.1:3000`; all six routes returned HTTP 200 from both development and the candidate at `127.0.0.1:3102`. No `docker compose down` was run.

After pushing `146fef8`, CI Quality, Browser Smoke, and Release Readiness were still in progress; Socket Project Report and Socket PR Alerts passed. Sonar exact-head reanalysis and CodeRabbit review state were not yet final at this addendum's capture. Final exact-head status must be recorded after the Evidence Bundle push. The pre-existing visual proposal remains 77/100 and below the independent >=85 gate; owner visual acceptance and independent audit are separate pending gates.

## Stop state

The code fix is pushed to the existing branch and PR #20 remains OPEN. This addendum and the Checkpoint Delta remain PROPOSED. No merge, deployment action, checkpoint promotion, force-push, rebase, or M07B work was performed.

## Superseding source/Sonar result — code head `1898db0`

Sonar's actual `pythonsecurity:S8707` flow from `parse_args()` to the fixed report `write_text()` sink remained because `args.ratio` was copied into the persisted JSON as `decimateRatio`. The output path was not CLI-controlled. Commit `1898db09f7334245285a722c1a793ee88bc63eec` removes the CLI-derived report field; the same validated ratio continues to control Blender. No app/runtime source, package manifest or lockfile, coverage, timing, retry setting, or performance budget changed.

The `AaEb6EvLXfIun6ARmluk` issue is FIXED/CLOSED; Sonar's filtered open S8707 count is 0. On `1898db0`, SonarCloud measures Security A (1.0) and Reliability A (1.0), Quality Gate PASS. CI Quality, Browser Smoke, Release Readiness, Socket Project Report, Socket PR Alerts and SonarCloud all PASS on this code head. CodeRabbit's status is PASS / review paused, not independent approval. Python optimizer path tests after the final edit are 8/8 PASS; `py_compile` passes. Log SHA-256: `fa378a69e60655885eab3b5c3840d19d57b7c1160766c8672486e11cd9a65`.

The complete production-candidate proof remains three consecutive full runs (31/31 each, retries=0) on the same unchanged application image/source `0dbb768` / `sha256:2f05c1193e6dbf92313dc1b9414ff360fa834508dea7f46b1f3d6f1b59b35a0c`; Home mobile LCP is 1900 / 1748 / 1748 ms. All original budgets are unchanged. Development Docker is UP/healthy at `127.0.0.1:3000`; all six routes are HTTP 200. The Context Lock direct Git-blob check at `1898db0` matched 30/30 critical sources, 0 STALE; GEF status remains an observation limitation for the linked worktree, not a passing validator.

The Evidence Bundle commit triggers a fresh exact-head set of hosted checks. Its final PR SHA and gate state are captured from GitHub metadata after that push to avoid a self-referential SHA.

The branch reconciliation preserved the audited starting commit `c9c2a332ea070646d52881756abe64d9ad6fb673` as an ancestor, along with the two local commits `fdc064501e3d347ddbf3d932f859c9626edc40c5` and `6adfaf8dd935b2f5e9204d0b82195ced1235a956`, joined by the existing non-rewriting merge `93e22eb`. The generated local `AGENTS.md` instruction block and the remaining uncommitted local evidence/screenshots are still present and are not staged by this Evidence Bundle commit. No reset, rebase, history rewrite or force-push was used.
