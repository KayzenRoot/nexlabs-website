import type { Metadata } from "next";
import {
  SecondaryHero,
  SecondarySectionHeading,
  SolutionsOrbitArtwork,
} from "../../components/secondary-page";
import styles from "./solutions.module.css";

export const metadata: Metadata = {
  alternates: { canonical: "/solutions" },
  title: "Solutions | Nex Labs Technology",
  description:
    "Explore the capability areas and engineering approach Nex Labs uses to frame intelligent systems around real constraints.",
};

const capabilityAreas = [
  {
    title: "Artificial Intelligence",
    description:
      "AI-native systems designed around useful reasoning, automation and human-centered workflows.",
    motif: "network",
  },
  {
    title: "Intelligent Infrastructure",
    description:
      "Software and data foundations designed to support reliable, observable and adaptable intelligent systems.",
    motif: "layers",
  },
  {
    title: "Advanced Interfaces",
    description:
      "Interfaces that make complex systems easier to understand, operate and collaborate with.",
    motif: "interface",
  },
  {
    title: "Sustainable Technologies",
    description:
      "Technology concepts shaped by efficiency, responsible resource use and long-term operational thinking.",
    motif: "orbit",
  },
  {
    title: "Research Platforms",
    description:
      "Experimental environments for turning technical questions into testable systems and measurable learning.",
    motif: "crystal",
  },
] as const;

const solutionStages = [
  {
    title: "Understand the constraints",
    description: "Start with the real operating environment, users, risks and limits.",
  },
  {
    title: "Model the system",
    description:
      "Turn the problem into explicit data, workflow, interface and integration boundaries.",
  },
  {
    title: "Prototype and measure",
    description: "Test important assumptions before increasing complexity.",
  },
  {
    title: "Integrate and observe",
    description:
      "Connect the useful parts and retain enough visibility to learn from operation.",
  },
] as const;

/** Production Solutions page, using the canonical M06A source copy. */
export default function SolutionsPage() {
  return (
    <div className={styles.page} data-secondary-page="solutions">
      <div className={styles.container}>
        <SecondaryHero
          description="Nex Labs frames solutions around the problem, the operating environment and the people who need to use the system."
          eyebrow="SOLUTIONS"
          idPrefix="solutions"
          primaryAction={{ href: "/technology", label: "Explore technology" }}
          secondaryAction={{ href: "/research", label: "Explore research" }}
          title="Intelligence applied with intent."
          visual={<SolutionsOrbitArtwork />}
        />

        <section aria-labelledby="solutions-capabilities-title" className={styles.capabilities}>
          <SecondarySectionHeading
            eyebrow="CAPABILITY AREAS"
            id="solutions-capabilities-title"
            title="Different problems need different shapes."
          />
          <ul className={styles.capabilityGrid}>
            {capabilityAreas.map((capability, index) => (
              <li className={styles.capabilityCard} key={capability.title}>
                <div
                  aria-hidden="true"
                  className={`${styles.capabilityGlyph} ${styles[capability.motif]}`}
                >
                  <span />
                  <span />
                  <span />
                </div>
                <span aria-hidden="true" className={styles.capabilityIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="solutions-framing-title" className={styles.framing}>
          <SecondarySectionHeading
            eyebrow="HOW WE FRAME THE WORK"
            id="solutions-framing-title"
            title="From question to working system."
          />
          <ol className={styles.stageGrid}>
            {solutionStages.map((stage, index) => (
              <li className={styles.stageCard} key={stage.title}>
                <span aria-hidden="true" className={styles.stageIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="solutions-integrity-title" className={styles.integrity}>
          <div className={styles.integritySignal} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className={styles.integrityCopy}>
            <p className={styles.integrityEyebrow}>ENGINEERING WITH CONTEXT</p>
            <h2 id="solutions-integrity-title">Focus areas, not promises.</h2>
            <p>
              These pages describe areas Nex Labs focuses on exploring and engineering. They do
              not imply guaranteed outcomes, a client record or a one-size-fits-all architecture.
            </p>
            <a className={styles.integrityAction} href="/technology">
              Explore the technology foundation <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
