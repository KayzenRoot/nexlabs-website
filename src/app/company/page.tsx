import type { Metadata } from "next";
import {
  CompanyAlignmentArtwork,
  SecondaryHero,
  SecondarySectionHeading,
} from "../../components/secondary-page";
import styles from "./company.module.css";

export const metadata: Metadata = {
  title: "Company | Nex Labs Technology",
  description:
    "Learn the purpose, operating principles and engineering mindset that shape Nex Labs Technology.",
};

const operatingPrinciples = [
  {
    title: "Human-centered",
    description: "Technology should expand what people can understand, create and operate.",
  },
  {
    title: "Research-led",
    description:
      "Important decisions should be shaped by evidence, experiments and measurable feedback.",
  },
  {
    title: "Secure by design",
    description:
      "Security, privacy and failure containment belong in the architecture from the beginning.",
  },
  {
    title: "Built for real-world systems",
    description:
      "Ideas become valuable when they survive the constraints of actual users, hardware and operations.",
  },
] as const;

const workingBehaviors = [
  {
    title: "Clarify before adding complexity",
    description: "Define the problem, constraints and decision before selecting the machinery.",
  },
  {
    title: "Make assumptions testable",
    description: "Turn uncertainty into prototypes and measurable questions.",
  },
  {
    title: "Keep architecture adaptable",
    description:
      "Use clear boundaries so useful components can evolve without dragging the whole system.",
  },
  {
    title: "Leave evidence behind",
    description:
      "Tests, observability and documentation should make decisions reviewable after the work moves on.",
  },
] as const;

/** Company content stays focused on admitted purpose, principles and working model. */
export default function CompanyPage() {
  return (
    <div className={styles.page} data-secondary-page="company">
      <div className={styles.container}>
        <SecondaryHero
          description="Nex Labs Technology is shaped around a simple idea: advanced systems should expand what people can understand, create and operate while remaining clear enough to question, improve and trust."
          eyebrow="COMPANY"
          idPrefix="company"
          primaryAction={{ href: "/research", label: "Explore research" }}
          secondaryAction={{ href: "/solutions", label: "Explore solutions" }}
          title="Technology with a reason to exist."
          visual={<CompanyAlignmentArtwork />}
        />

        <section aria-labelledby="company-purpose-title" className={styles.purpose}>
          <SecondarySectionHeading
            eyebrow="PURPOSE"
            id="company-purpose-title"
            title="Build what earns its complexity."
          />
          <p className={styles.purposeCopy}>
            We focus on the intersection of intelligence, software, data, interfaces and real-world
            constraints. The aim is not complexity for its own sake, but systems that make difficult
            work clearer, more usable and more adaptable.
          </p>
        </section>

        <section aria-labelledby="company-principles-title" className={styles.principles}>
          <SecondarySectionHeading
            eyebrow="OPERATING PRINCIPLES"
            id="company-principles-title"
            title="How direction becomes discipline."
          />
          <ul className={styles.principleGrid}>
            {operatingPrinciples.map((principle, index) => (
              <li className={styles.principleCard} key={principle.title}>
                <span aria-hidden="true" className={styles.principleIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className={styles.principleNode} />
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="company-working-model-title" className={styles.workingModel}>
          <SecondarySectionHeading
            eyebrow="HOW WE WORK"
            id="company-working-model-title"
            title="A loop, not a handoff."
          />
          <ol aria-label="Working model behaviors" className={styles.behaviorGrid}>
            {workingBehaviors.map((behavior, index) => (
              <li className={styles.behaviorCard} key={behavior.title}>
                <span aria-hidden="true" className={styles.behaviorIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{behavior.title}</h3>
                <p>{behavior.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="company-integrity-title" className={styles.integrity}>
          <div className={styles.integrityAxis} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className={styles.integrityCopy}>
            <p className={styles.integrityEyebrow}>COMPANY INTEGRITY</p>
            <h2 id="company-integrity-title">Proof should stay factual.</h2>
            <p>
              Company milestones, partnerships, deployments, certifications and external
              recognition belong on this site only when they can be verified. Until then, Nex Labs
              is represented by its purpose, principles and the systems it is building.
            </p>
            <a className={styles.integrityAction} href="/research">
              Explore the research approach <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
