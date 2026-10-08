import type { Metadata } from "next";
import styles from "./verification.module.css";

export const metadata: Metadata = {
  title: "Founder & Project Verification | Nex Labs Technology",
  description: "Factual founder, operating location, legal-stage and open-source project evidence for NexLabs Technology.",
};

const evidence = [
  {
    title: "HIVE — flagship engineering work",
    note: "The HIVE repository contains source code, release history and a stable v1.0.2 release. It is the primary reference for independently reviewing existing engineering work.",
    href: "https://github.com/KayzenRoot/hive",
    action: "Inspect source and releases",
  },
  {
    title: "Selected engineering portfolio",
    note: "Five projects are described with explicit released, prototype, development or planning labels. The records do not represent paid customers, live services or formal partnerships.",
    href: "/projects",
    action: "Review project records",
  },
  {
    title: "Public GitHub profile",
    note: "The KayzenRoot account hosts the linked open-source repositories, project history and technical documentation. Github is the source for repository-specific claims.",
    href: "https://github.com/KayzenRoot",
    action: "View engineering profile",
  },
] as const;

/** Factual pre-incorporation identity record; do not present this as a corporate registry certificate. */
export default function FounderVerificationPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>NEX LABS / IDENTITY & PUBLIC EVIDENCE</p>
        <h1>Verify the people and the work.</h1>
        <p className={styles.lead}>
          NexLabs Technology is a founder-led software and research initiative
          based in Brazil. This record provides transparent facts and direct
          links to work that can be independently inspected.
        </p>
      </header>

      <section aria-labelledby="identity-title" className={styles.identity}>
        <div>
          <p className={styles.eyebrow}>01 / ORGANIZATION FACTS</p>
          <h2 id="identity-title">Identity and status</h2>
        </div>
        <dl className={styles.facts}>
          <div><dt>Brand and project identity</dt><dd>NexLabs Technology</dd></div>
          <div><dt>Founder</dt><dd>Clayton Nunes</dd></div>
          <div><dt>Operating location</dt><dd>Brazil</dd></div>
          <div><dt>Company stage</dt><dd>Founder-led, bootstrapped, pre-incorporation</dd></div>
          <div><dt>Outside investment</dt><dd>No outside funding claimed</dd></div>
          <div><dt>Company email</dt><dd>founder@nexlabs.company</dd></div>
          <div><dt>Public website</dt><dd>nexlabs.company</dd></div>
        </dl>
      </section>

      <section aria-labelledby="evidence-title" className={styles.evidence}>
        <p className={styles.eyebrow}>02 / INDEPENDENT EVIDENCE</p>
        <h2 id="evidence-title">Review the source, not promises.</h2>
        <div className={styles.grid}>
          {evidence.map((entry) => (
            <article className={styles.card} key={entry.title}>
              <h3>{entry.title}</h3>
              <p>{entry.note}</p>
              <a
                href={entry.href}
                rel={entry.href.startsWith("https://") ? "noopener noreferrer" : undefined}
                target={entry.href.startsWith("https://") ? "_blank" : undefined}
              >
                {entry.action} <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <aside className={styles.disclaimer} aria-label="Legal stage clarification">
        <p className={styles.eyebrow}>03 / IMPORTANT CLARIFICATION</p>
        <h2>Early-stage, with transparent boundaries.</h2>
        <p>
          NexLabs Technology is not currently presented as a legally incorporated
          entity in Brazil or any other country. Public project records describe
          software developed by its founder, not revenue, customer contracts,
          audited product deployments or corporate registration. Project dates
          are not legal incorporation dates.
        </p>
        <a href="/company">Explore our working principles →</a>
      </aside>
    </div>
  );
}
