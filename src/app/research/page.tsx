import type { Metadata } from "next";
import { pageOpenGraph } from "../../lib/site-seo";
import {
  ResearchSignalArtwork,
  SecondaryHero,
  SecondarySectionHeading,
} from "../../components/secondary-page";
import styles from "./research.module.css";

export const metadata: Metadata = {
  openGraph: pageOpenGraph("/research", "Research | Nex Labs Technology", "Explore how Nex Labs turns technical questions into experiments, evidence and systems that can inform future products and platforms."),
  alternates: { canonical: "/research" },
  title: "Research | Nex Labs Technology",
  description:
    "Explore how Nex Labs turns technical questions into experiments, evidence and systems that can inform future products and platforms.",
};

const researchStages = [
  {
    title: "Frame the question",
    description:
      "Define the decision, unknowns, constraints and evidence that would change the direction.",
  },
  {
    title: "Build a testable model",
    description:
      "Create the smallest system or prototype that can challenge the important assumption.",
  },
  {
    title: "Measure meaningful signals",
    description:
      "Observe behavior, failure modes and tradeoffs instead of optimizing for a demo.",
  },
  {
    title: "Decide what deserves to continue",
    description:
      "Refine, integrate, archive or stop based on what the evidence supports.",
  },
] as const;

const explorationAreas = [
  {
    title: "Reasoning & Automation",
    description:
      "How intelligent workflows can support useful decisions while keeping people able to inspect and intervene.",
  },
  {
    title: "Human-System Interaction",
    description:
      "How interfaces can make complex models, data and automation clearer to understand and operate.",
  },
  {
    title: "Intelligent Infrastructure",
    description:
      "How data, observability and system boundaries can support adaptable intelligent applications.",
  },
  {
    title: "Applied Data Systems",
    description:
      "How data quality, retrieval, context and analytics can improve system usefulness.",
  },
  {
    title: "Real-World Integration",
    description:
      "How software can connect with operating environments while respecting reliability and failure boundaries.",
  },
] as const;

/** Research content stays factual and server-rendered; its artwork is decorative SVG. */
export default function ResearchPage() {
  return (
    <div className={styles.page} data-secondary-page="research">
      <div className={styles.container}>
        <SecondaryHero
          description="Research at Nex Labs is a disciplined path from uncertainty to evidence. We frame questions, build testable prototypes, measure what matters and carry forward only what earns its place."
          eyebrow="RESEARCH"
          idPrefix="research"
          primaryAction={{ href: "/technology", label: "Explore technology" }}
          secondaryAction={{ href: "/solutions", label: "Explore solutions" }}
          title="Questions become systems."
          visual={<ResearchSignalArtwork />}
        />

        <section aria-labelledby="research-method-title" className={styles.method}>
          <SecondarySectionHeading
            description="The goal is not experimentation for its own sake. Research is useful when it reduces uncertainty, exposes constraints and produces knowledge that can shape a system responsibly."
            eyebrow="RESEARCH METHOD"
            id="research-method-title"
            title="Learn before scaling."
          />
          <ol aria-label="Research method stages" className={styles.methodGrid}>
            {researchStages.map((stage, index) => (
              <li className={styles.methodStep} key={stage.title}>
                <span aria-hidden="true" className={styles.stageIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="research-areas-title" className={styles.exploration}>
          <SecondarySectionHeading
            description="The themes below describe technical directions, not published breakthroughs or guaranteed capabilities."
            eyebrow="EXPLORATION AREAS"
            id="research-areas-title"
            title="Where we explore."
          />
          <ul className={styles.areaGrid}>
            {explorationAreas.map((area, index) => (
              <li className={styles.areaCard} key={area.title}>
                <span aria-hidden="true" className={styles.areaIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className={styles.areaNode} />
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="research-integrity-title" className={styles.integrity}>
          <div className={styles.integrityTrace} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className={styles.integrityCopy}>
            <p className={styles.integrityEyebrow}>RESEARCH INTEGRITY</p>
            <h2 id="research-integrity-title">Evidence over spectacle.</h2>
            <p>
              Research directions are not presented as patents, publications, deployed client
              systems or breakthroughs unless those facts are independently verifiable. What
              matters here is the method: test assumptions, retain evidence and let results shape
              the next system.
            </p>
            <a className={styles.integrityAction} href="/company">
              See the principles behind the work <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
