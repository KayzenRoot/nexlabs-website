import type { Metadata } from "next";
import { pageOpenGraph } from "../../lib/site-seo";
import {
  SecondaryHero,
  SecondarySectionHeading,
  TechnologyStackArtwork,
} from "../../components/secondary-page";
import styles from "./technology.module.css";

export const metadata: Metadata = {
  openGraph: pageOpenGraph("/technology", "Technology | Nex Labs Technology", "Explore the modular technology foundations Nex Labs uses to connect intelligence, data, interfaces and real-world systems."),
  alternates: { canonical: "/technology" },
  title: "Technology | Nex Labs Technology",
  description:
    "Explore the modular technology foundations Nex Labs uses to connect intelligence, data, interfaces and real-world systems.",
};

const architectureLayers = [
  {
    title: "AI Models & Analytics",
    description:
      "Reasoning, analysis and model capabilities selected to fit the problem rather than define it.",
  },
  {
    title: "Data Infrastructure",
    description:
      "Data flows and storage boundaries designed for observability, quality and responsible use.",
  },
  {
    title: "Secure & Scalable Systems",
    description: "System boundaries shaped around security, resilience and controlled growth.",
  },
  {
    title: "Real-World Integration",
    description:
      "Interfaces and integration layers that connect software decisions to real operating environments.",
  },
  {
    title: "Interoperable Architecture",
    description:
      "Components designed to communicate through clear contracts so systems can evolve without unnecessary coupling.",
  },
] as const;

const architecturePrinciples = [
  {
    title: "Observable by default",
    description: "Important behavior should be measurable enough to understand and improve.",
  },
  {
    title: "Secure boundaries",
    description: "Security and failure containment belong in the system design, not at the end.",
  },
  {
    title: "Interoperable parts",
    description: "Clear contracts make it easier to replace, extend and connect components.",
  },
  {
    title: "Human-operable systems",
    description:
      "People need to understand what a system is doing, especially when conditions change.",
  },
] as const;

/** Production Technology page, using the canonical M06A source copy. */
export default function TechnologyPage() {
  return (
    <div className={styles.page} data-secondary-page="technology">
      <div className={styles.container}>
        <SecondaryHero
          description="Nex Labs explores modular technology foundations that connect intelligence, data, interfaces and real-world integration without forcing every problem into the same architecture."
          eyebrow="TECHNOLOGY"
          idPrefix="technology"
          primaryAction={{ href: "/solutions", label: "Explore solutions" }}
          secondaryAction={{ href: "/research", label: "Explore research" }}
          title="Systems designed to adapt."
          visual={<TechnologyStackArtwork />}
        />

        <section aria-labelledby="technology-foundation-title" className={styles.foundation}>
          <SecondarySectionHeading
            description="Useful intelligent systems need more than a model. They need clear data boundaries, observable behavior, secure interfaces and integration paths that can evolve as the problem becomes better understood."
            eyebrow="PLATFORM FOUNDATION"
            id="technology-foundation-title"
            title="A modular foundation."
          />
          <ol aria-label="Architecture layers" className={styles.layerGrid}>
            {architectureLayers.map((layer, index) => (
              <li className={styles.layerCard} key={layer.title}>
                <span aria-hidden="true" className={styles.layerIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{layer.title}</h3>
                <p>{layer.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="technology-principles-title" className={styles.principles}>
          <SecondarySectionHeading
            description="The system should become more specific as evidence improves, not more complicated by default."
            eyebrow="DESIGN PRINCIPLES"
            id="technology-principles-title"
            title="Architecture follows evidence."
          />
          <ul className={styles.principleGrid}>
            {architecturePrinciples.map((principle) => (
              <li className={styles.principleCard} key={principle.title}>
                <span aria-hidden="true" className={styles.principleMarker} />
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="technology-closing-title" className={styles.closing}>
          <div className={styles.closingCopy}>
            <p className={styles.closingEyebrow}>NEX LABS TECHNOLOGY</p>
            <h2 id="technology-closing-title">From research to operating systems.</h2>
            <p>
              The technology layer exists to turn useful learning into systems that can be
              operated, inspected and adapted. The architecture stays modular so experiments can
              become dependable components without freezing the whole platform around one idea.
            </p>
            <a className={styles.closingAction} href="/solutions">
              See how we frame solutions <span aria-hidden="true">→</span>
            </a>
          </div>
          <div aria-hidden="true" className={styles.closingTrace}>
            <span />
            <span />
            <span />
          </div>
        </section>
      </div>
    </div>
  );
}
