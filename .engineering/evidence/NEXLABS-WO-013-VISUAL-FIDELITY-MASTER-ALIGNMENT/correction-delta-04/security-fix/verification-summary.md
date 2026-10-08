# Correction Delta 04 — Sonar/Performance Verification

- **Work Order:** `NEXLABS-WO-013-VISUAL-FIDELITY-MASTER-ALIGNMENT`
- **Branch:** `work/nexlabs-wo-013-visual-fidelity-master-alignment`
- **Latest local code-fix commit:** `ceab16f1808a163dd6c769bd1f53ec6832778961`
- **Admission base:** `e14cfbe4660b076db85e7e529befffe17a098cd1`
- **Previous pushed HEAD:** `24d3e43dca8e72ecd773247daf074b59b1488c8d`
- **Context Lock at previous code-fix HEAD:** 30/30 critical fingerprints match; **0 STALE**. Latest code commit changes only an admitted `tools/visual-pipeline/**` file; it is revalidated before push.
- **Master:** blob `52932511adfeb8d372717185fe9a18907625cc0c`; SHA-256 `d7a715dbee7c2174ed6e4a0bcdc02cba0b3a644af5d24845cae55d30f60ff647`.

## SonarCloud finding

At the prior analysis, SonarCloud had one open new-code `pythonsecurity:S8707` issue (`AaEaunfYCXFy810awQdb`) and reported Security `3.0` / C, Reliability `1.0` / A. `css:S4656` (`AaEauncOCXFy810awQda`) was CLOSED after the duplicate CSS declaration was removed. Removing only the absolute `source` report field in `90de8fe` did not clear the finding: analysis on `24d3e43dca8e72ecd773247daf074b59b1488c8d` remained Security C / Reliability A.

The S8707 flow was from CLI `--source` to the optimizer's JSON `write_text` call. The destination filename was already fixed and validated beneath the user-data directory, outside Git. Sonar still reported the flow after the absolute input path was removed because the report retained `sourceSha256` and `sourceBytes`. Commit `ceab16f1808a163dd6c769bd1f53ec6832778961` removes all source-derived fields from persisted JSON while keeping expected-SHA validation in process and retaining output SHA-256/size metadata. Repository search found no consumers of the removed report fields. The accepted external generated-GLB input path, output location, checks, and geometry processing remain unchanged. `quality-tier.ts`, npm manifests, gates, and suppressions were not changed in this delta.

The finding will be considered closed only if the exact final PR head re-analysis reports Security A and Reliability A. No issue status was manually changed.

## Local checks

| Check | Result |
| --- | --- |
| `npm ci` | PASS — 243 packages installed; 254 audited; 0 vulnerabilities |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm test` | PASS — 5 files, 43 tests |
| `npm run build` | PASS — all 6 product routes generated |
| `npm audit --audit-level=moderate` | PASS — 0 vulnerabilities |
| Full local E2E, `retries=0` | PASS — 31/31; port 3105; [log](full-e2e-retries-0.log) |
| Optimizer after latest report change | PASS — Python AST assertion and `py_compile`; report no longer contains `source`, `sourceSha256`, or `sourceBytes` |
| Candidate route smoke, port 3102 | PASS — `/`, `/technology`, `/solutions`, `/research`, `/company`, `/contact` all HTTP 200 |

## Production-candidate qualification

Three consecutive complete browser suites ran serially with `retries=0`, one worker, the same already-running production image/container, and the unchanged performance budgets. Both candidate base-URL variables were set to port 3102. The host renderer was software SwiftShader, so the existing STATIC fallback was exercised; same-image RTX 5050 FULL/BALANCED frame proof remains separately recorded in the main Correction Delta report.

| Run | Suite | Home mobile LCP | Interaction proxy | CLS | Initial JS gzip |
| --- | ---: | ---: | ---: | ---: | ---: |
| 1 | 31/31 PASS | 1856 ms | 88 ms | 0 | 151,360 bytes |
| 2 | 31/31 PASS | 1832 ms | 152 ms | 0 | 151,360 bytes |
| 3 | 31/31 PASS | 1760 ms | 112 ms | 0 | 151,360 bytes |

Budgets unchanged: LCP 2500 ms, interaction proxy 200 ms, CLS 0.1, initial JS gzip 225,280 bytes, lazy 3D gzip 716,800 bytes. The exact image/container identity and per-run report/log hashes are recorded in `../../candidate-performance-variance.json`. Suite logs are in `performance-final/run-01` through `run-03`; the Home reports and phase diagnostics are mirrored into `../candidate-reruns/run-01` through `run-03` so Git can retain them within Windows path-length limits.

Candidate image: `nexlabs-website-release-candidate:wo013-cd04-0dbb768`, image ID `sha256:2f05c1193e6dbf92313dc1b9414ff360fa834508dea7f46b1f3d6f1b59b35a0c`. Container ID `c94582ac97bb8864fc9d5968a0eb5ce29467036d57af6ab9de43bced77cdb4d2`, healthy at `127.0.0.1:3102`. Development Docker `nexlabs-website-web-1` remains healthy at `127.0.0.1:3000`.

One earlier, non-qualifying 30/31 attempt omitted `E2E_PORT=3102`; the measurement test's internal navigation used its default port 3100 and received `ERR_CONNECTION_REFUSED`. It is explicitly listed as excluded in `candidate-performance-variance.json`. The three-run qualification sequence began fresh after correcting only the command environment; no test, retry, timeout, budget, or coverage change was made.

## Hosted gates / stop state

### Superseding follow-up — source confinement, junction checks, and final run set

The metadata-only code head above did not clear Sonar Security C. The exact `pythonsecurity:S8707` flow was from CLI `--source` to the optimizer report write. Correction commit `146fef80905ea5ec31ba1219aeb9f9f69c9fd3e2` constrains that source to a regular `.glb` under the resolved local `VisualPipeline/generated` root outside Git, stages output in system temp, rejects output reparse points and hard links, and revalidates each fixed destination immediately before atomic publication. Python path regressions pass 8/8. No suppression or Sonar gate change was made.

Three new serial full production-candidate suites on the same image/container pass 31/31 each with retries=0 and unchanged budgets. Mobile LCP is 1900 / 1748 / 1748 ms; interaction proxy 88 / 128 / 152 ms; CLS 0 / 0 / 0; JS gzip 151,360 bytes each. Exact reports, phase diagnostics, suite logs and hashes are stored in `.engineering/evidence/wo013-cd04-final/verified-run-01` through `verified-run-03`, indexed by the current `candidate-performance-variance.json`.

The last completed Sonar analysis at this capture still showed Security C / Reliability A on an older head; exact-head reanalysis remained pending. Do not treat those ratings as the result for `146fef8`. The new implementation and gate state are summarized in `.engineering/evidence/wo013-cd04-final/verification-summary.md`.

### Superseding Sonar and exact-head update — `1898db0`

The exact `pythonsecurity:S8707` flow on `146fef8` was caused by copying the bounded but user-supplied `--ratio` CLI value into the persisted report (`decimateRatio`). The report destination was fixed; no CLI argument selected it. Commit `1898db09f7334245285a722c1a793ee88bc63eec` removes that report field while retaining the value for the Blender operation. The actual issue `AaEb6EvLXfIun6ARmluk` now has resolution FIXED/status CLOSED, filtered open S8707 count is 0, Security is A (1.0), Reliability is A (1.0), and SonarCloud Code Analysis is PASS on code head `1898db0`. No rule, threshold, exclusion, suppression or gate configuration changed.

The full hosted checks on `1898db0` are CI Quality PASS, Browser Smoke PASS, Release Readiness PASS, SonarCloud PASS, Socket Project Report PASS, and Socket PR Alerts PASS. CodeRabbit reports PASS with review paused; this is not an independent review approval. The post-edit Python path tests are 8/8 PASS and syntax compilation passes; see `.engineering/evidence/wo013-cd04-final/python-optimizer-tests.txt` (SHA-256 `fa378a69e60655885eab3b5c3840d19d57b7c1160766c8672486e11cd9a65`). The exact production-candidate run set remains the same 3 consecutive 31/31 suites, retries=0, same application image and unchanged budgets. Final exact-head results must be checked again after the evidence-only push; PR #20 remains OPEN and the checkpoint stays PROPOSED.

The final code and evidence commits must be pushed before reading hosted checks. CI Quality, Browser Smoke, Release Readiness, SonarCloud, Socket, and CodeRabbit are not claimed PASS by these local results. Read the exact final HEAD and results from live PR #20 metadata after the push. PR #20 remains OPEN for independent review; visual score 77/100 remains below the required 85/100 and owner visual acceptance remains pending. No merge, checkpoint promotion, deployment action, or M07B work is authorized by this delta.
