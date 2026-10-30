# Project Checkpoint

Status: WO_013_CD05_CD06_RE_ADMITTED_TOOL_PREFLIGHT_PENDING

- GEF Bootstrap v1.1.2 and M01 through M06: APPROVED/MERGED.
- M07A Release Hardening & Production Readiness: APPROVED/MERGED and checkpoint-promoted.
- Admission base main SHA: `e14cfbe4660b076db85e7e529befffe17a098cd1`.
- Production identity: `NEX-N-A-PRECISION-BLADES`.
- Owner visual acceptance: PENDING_MASTER_ALIGNMENT.
- Active increment: WO-013 Visual Fidelity Restoration / Master Alignment.
- Active Work Order: `NEXLABS-WO-013-VISUAL-FIDELITY-MASTER-ALIGNMENT`.
- Active branch: `work/nexlabs-wo-013-visual-fidelity-master-alignment`.
- Active Context Lock: `.engineering/context-locks/NEXLABS-WO-013-VISUAL-FIDELITY-MASTER-ALIGNMENT.json`.
- Risk: ELEVATED.
- Primary master: `approved-home-visual-master.jpg`, SHA-256 `d7a715dbee7c2174ed6e4a0bcdc02cba0b3a644af5d24845cae55d30f60ff647`, Git blob `52932511adfeb8d372717185fe9a18907625cc0c`.
- Previous independent visual audit at HEAD `487556d65d62c5581ee9fdcf6f77cf881c569f81` returned CORRECTION REQUIRED with auditor score 68/100.
- Current exact-head candidate `25d85e692b7a57d7c416dce9bd954184a2e88f57` remains visually unapproved; executor proposal is 77/100 and current independent review still finds material master-fidelity gaps.
- D-0031 governs new CD-05 assets: Codex image generation followed by isolated official Blender Lab MCP; ComfyUI/Blender CLI remain historical defaults and are not substitutes.
- Previous Context Lock v4 is superseded; Context Lock v5 pins the D-0034 re-admission and its exact critical-source fingerprints.
- Implementation is re-admitted under Context Lock v5; CD-05 assets remain gated on tool/rights/MCP proof, CD-06 package remediation is authorized, and merge/deployment are not.
- Public copy/content facts are regression-protected.
- M07A security/runtime/readiness behavior is regression-protected.
- M07B final Deployment + Production Launch remains BLOCKED.
- Temporary Vercel pre-launch is OWNER-AUTHORIZED for Anthropic/company registration.
- Temporary target: Vercel project `nexlabs-website` / `prj_HtZ5M9lpS0JZhkaHLbTCrWX38YHV`, team `claytons-projects-5922d27c`.
- PRE-LAUNCH banner is mandatory on all six routes.
- noindex/nofollow + robots disallow remain mandatory.
- Development Docker continuity remains mandatory.

Next legal stage: execute CD-05 image-tool and official Blender Lab MCP preflight under Context Lock v5, and execute admitted CD-06 dependency remediation from the replacement baseline. If an image-generation rights/capability check or isolated MCP cannot be proven, document only that CD-05 asset stage as BLOCKED and continue independent authorized work. Preserve the independent >=85/100 visual gate, existing tests/security requirements, and owner acceptance; no merge, checkpoint promotion, production deploy or M07B.

The machine-readable view is CHECKPOINT.json.

- CD-05 owner direction D-0031: use Codex image generation for new static component masters, then isolated official Blender Lab MCP for derived motion; tool and rights proof remain pending and legacy ComfyUI/CLI evidence does not satisfy this gate.
- No change to accepted completed M07A, owner visual acceptance, previous 77/100 executor proposal or independent >=85/100 criterion.
- Vercel last observed production snapshot SHA: `4aa20ef0b53918b7d482983bd53bdafecd155198` from PR #25; visual PR pushes create separate Preview. Keep current publicly deployed portfolio/SEO/verification/HIVE evidence intact.
- Owner decision D-0034 replaces the unrecoverable local commit requirement with a new baseline pinned to PR #20 HEAD `379c12a950dae03b512a2543672cb54f339cc124`; existing local checkouts remain untouched.
