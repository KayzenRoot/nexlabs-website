/**
 * Founder project evidence for the temporary NexLabs pre-launch portfolio.
 * Claims below are deliberately bounded to the linked repository READMEs
 * reviewed on 2026-10-08. No incorporation, customers or revenue is implied.
 */
export type PublicProject = {
  readonly slug: string;
  readonly name: string;
  readonly tagline: string;
  readonly stage: string;
  readonly summary: string;
  readonly focus: readonly string[];
  readonly evidence: readonly string[];
  readonly repository: string;
};

export const publicProjects: readonly PublicProject[] = [
  {
    slug: "hive",
    name: "HIVE",
    tagline: "Local-first engineering context and memory",
    stage: "Open-source · Stable v1.0.2",
    summary: "A local-first platform for project context, retrieval, memory and governed AI-assisted software workflows. A stable source release is published on GitHub; further improvements remain in development.",
    focus: ["Project memory", "Hybrid retrieval", "Context efficiency", "Governed execution"],
    evidence: [
      "The public repository identifies v1.0.2 as its latest stable release.",
      "The documented stack includes Docker Compose, Python, PostgreSQL and pgvector.",
      "The repository publishes source code, installation instructions and release history.",
    ],
    repository: "https://github.com/KayzenRoot/hive",
  },
  {
    slug: "nexlabs-company-os",
    name: "NexLabs Company OS",
    tagline: "Founder command center and engineering experiments",
    stage: "Local prototype · Not publicly hosted",
    summary: "An internal engineering and company-systems research effort. The repository includes a local, read-only Founder Command Center and offline evidence-producing engineering experiments; live operational integrations are not connected.",
    focus: ["Internal tools", "Engineering evidence", "Offline validation", "Governance"],
    evidence: [
      "The public repository documents a local read-only Founder Command Center.",
      "Offline engineering-cell tests and evidence are included.",
      "Live agents, external provider execution and production availability are explicitly not claimed.",
    ],
    repository: "https://github.com/KayzenRoot/nexlabs-company",
  },
  {
    slug: "nerva",
    name: "NERVA",
    tagline: "Non-custodial policy and execution-safety research",
    stage: "Development · Financial effects disabled",
    summary: "A Monad-native research and engineering project focused on explicit permissions, risk policies and verifiable safety boundaries. It is under development, and live financial execution is intentionally restricted.",
    focus: ["Policy verification", "Risk controls", "Audit evidence", "Non-custodial design"],
    evidence: [
      "The repository describes permission grants, session revocation and policy controls.",
      "Development is organized through incremental, evidence-based engineering milestones.",
      "The public documentation states that unproven live-write capabilities remain blocked.",
    ],
    repository: "https://github.com/KayzenRoot/nerva-project",
  },
  {
    slug: "ugas-v2",
    name: "UGAS V2",
    tagline: "Multimodal production-system architecture",
    stage: "Planning · Source-pack bootstrap",
    summary: "A planned local-first generative media production system spanning images, video, sound, animation, 3D and reproducible workflows. The current public repository contains architecture and planning, not a shipped V2 product.",
    focus: ["Generative media", "Local-first compute", "Production graphs", "Reproducible workflows"],
    evidence: [
      "The repository documents the planned multimodal Production Graph.",
      "The current phase is source-pack and architecture planning.",
      "The README explicitly states that product implementation is not yet authorized.",
    ],
    repository: "https://github.com/KayzenRoot/ugas-v2",
  },
  {
    slug: "coinblink",
    name: "CoinBlink",
    tagline: "International crypto news product concept",
    stage: "Planning · Not deployed",
    summary: "An international crypto news and research publication in planning. Its repository holds design specifications, localization decisions and an implementation roadmap. The portal is not yet built or publicly deployed.",
    focus: ["Information design", "Multilingual publishing", "Editorial workflows", "Verification-first research"],
    evidence: [
      "The repository records English as the canonical language with Portuguese and Spanish planned.",
      "Visual specifications and a roadmap are documented.",
      "The README explicitly labels the portal as not implemented or deployed.",
    ],
    repository: "https://github.com/KayzenRoot/coinblink",
  },
];

export function getPublicProject(slug: string): PublicProject | undefined {
  return publicProjects.find((project) => project.slug === slug);
}
