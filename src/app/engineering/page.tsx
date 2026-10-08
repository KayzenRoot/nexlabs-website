import type { Metadata } from "next";
import { pageOpenGraph } from "../../lib/site-seo";
import styles from "../company/verification/verification.module.css";

const title = "Engineering Evidence | HIVE | NexLabs Technology";
const description = "Inspectable source, published release and architecture of HIVE, a founder-led, local-first AI context and engineering platform."; 
export const metadata: Metadata = { title, description, alternates: { canonical: "/engineering" }, openGraph: pageOpenGraph("/engineering", title, description) };

/** Plain, server-rendered engineering evidence. All facts are bounded to the public HIVE README. */
export default function EngineeringEvidencePage() {
  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>NEXLABS / PUBLIC ENGINEERING RECORD</p>
        <h1>HIVE. Source before promises.</h1>
        <p className={styles.lead}>
          NexLabs Technology is a founder-led AI software initiative in Brazil.
          HIVE is a publicly inspectable local-first system for project memory, retrieval,
          context management and governed AI-assisted engineering workflows.
          The latest documented stable source release is v1.0.2.
        </p>
      </header>
      <section className={styles.identity} aria-labelledby="hive-state">
        <div><p className={styles.eyebrow}>01 / STATUS</p><h2 id="hive-state">What exists today?</h2></div>
        <dl className={styles.facts}>
          <div><dt>Software project</dt><dd>HIVE</dd></div>
          <div><dt>Latest stable source</dt><dd>v1.0.2</dd></div>
          <div><dt>License</dt><dd>Apache License 2.0</dd></div>
          <div><dt>Operating model</dt><dd>Local-first, Docker Compose</dd></div>
          <div><dt>Development</dt><dd>v1.0.3 patch is a release candidate, not stable</dd></div>
          <div><dt>Initiative stage</dt><dd>Founder-led, bootstrapped, pre-incorporation</dd></div>
        </dl>
      </section>
      <section className={styles.evidence} aria-labelledby="hive-evidence">
        <p className={styles.eyebrow}>02 / SOURCE EVIDENCE</p><h2 id="hive-evidence">Inspectable engineering</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Project context and retrieval</h3>
            <p>Git-aware incremental indexing, lexical and semantic retrieval, hybrid ranking, durable memory, PostgreSQL and pgvector are described in the public README.</p>
            <a href="https://github.com/KayzenRoot/hive" target="_blank" rel="noopener noreferrer">Inspect source and architecture →</a>
          </div>
          <div className={styles.card}>
            <h3>Local-first operation</h3>
            <p>Docker Compose, a local Control Center, checkpoints, token-aware context and gated local execution. Optional execution integrations are disabled unless configured.</p>
            <a href="https://github.com/KayzenRoot/hive/blob/main/README.md" target="_blank" rel="noopener noreferrer">Read architecture and limits →</a>
          </div>
          <div className={styles.card}>
            <h3>Published version history</h3>
            <p>Stable source version v1.0.2 is published on GitHub. The follow-up v1.0.3 patch remains a release candidate, not a commercial deployment.</p>
            <a href="https://github.com/KayzenRoot/hive/releases/tag/v1.0.2" target="_blank" rel="noopener noreferrer">Inspect stable release v1.0.2 →</a>
          </div>
        </div>
      </section>
      <section className={styles.disclaimer} aria-labelledby="hive-model-plan">
        <p className={styles.eyebrow}>03 / PROSPECTIVE MODEL INTEGRATION</p>
        <h2 id="hive-model-plan">Where Claude may fit</h2>
        <p>We plan to evaluate Claude for context-aware software development, safe tool use, architecture, code review and reproducible evaluations. A Claude-specific API integration is a future direction, not a claim that the published HIVE release already contains a working Claude API integration.</p>
        <p>Each provider adapter would require explicit cost limits, testing, evidence and permission controls. This page does not claim Anthropic partnership, customers, company incorporation or external investment.</p>
        <a href="/company/verification">Verify the founder and operating stage →</a>
      </section>
    </article>
  );
}
