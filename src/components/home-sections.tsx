import styles from "./home-sections.module.css";

const capabilities = [
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
    motif: "globe",
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

const principles = [
  {
    title: "Human-centered",
    description: "Technology should expand what people can understand, create and operate.",
  },
  {
    title: "Research-led",
    description: "Important decisions should be shaped by evidence, experiments and measurable feedback.",
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

const technologyPillars = [
  "AI Models & Analytics",
  "Data Infrastructure",
  "Secure & Scalable Systems",
  "Real-World Integration",
  "Interoperable Architecture",
] as const;

type CapabilityMotif = (typeof capabilities)[number]["motif"];

function CapabilityGlyph({ motif }: { motif: CapabilityMotif }) {
  return (
    <svg
      aria-hidden="true"
      className={styles.capabilityGlyph}
      focusable="false"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.45"
    >
      {motif === "network" && (
        <>
          <path d="M32 12c-4-7-15-5-16 3-6 0-9 7-6 12-4 5-2 12 5 13 1 7 9 9 14 4V12Zm0 0c4-7 15-5 16 3 6 0 9 7 6 12 4 5 2 12-5 13-1 7-9 9-14 4V12Z" />
          <path d="M32 14v34M18 22h10m8 0h10M14 34h13m10 0h13M21 43h8m6 0h8" />
          <circle cx="21" cy="22" r="1.7" />
          <circle cx="43" cy="22" r="1.7" />
          <circle cx="20" cy="34" r="1.7" />
          <circle cx="44" cy="34" r="1.7" />
          <circle cx="25" cy="43" r="1.7" />
          <circle cx="39" cy="43" r="1.7" />
        </>
      )}
      {motif === "layers" && (
        <>
          <path d="m32 10 22 11-22 11-22-11 22-11Z" />
          <path d="m10 30 22 11 22-11M10 39l22 11 22-11" />
          <path d="M17 21 32 29l15-8M17 39v5m30-5v5M32 32v8" />
          <path d="M10 48 32 59l22-11" />
        </>
      )}
      {motif === "globe" && (
        <>
          <circle cx="32" cy="32" r="23" />
          <path d="M9 32h46M32 9c8 7 12 15 12 23s-4 16-12 23c-8-7-12-15-12-23S24 16 32 9Z" />
          <path d="M13 21c6 4 12 6 19 6s13-2 19-6M13 43c6-4 12-6 19-6s13 2 19 6" />
          <circle cx="32" cy="32" r="3" />
        </>
      )}
      {motif === "orbit" && (
        <>
          <circle cx="32" cy="32" r="4" />
          <ellipse cx="32" cy="32" rx="23" ry="9" />
          <ellipse cx="32" cy="32" rx="23" ry="9" transform="rotate(58 32 32)" />
          <ellipse cx="32" cy="32" rx="23" ry="9" transform="rotate(-58 32 32)" />
          <circle cx="52" cy="25" r="2" />
          <circle cx="20" cy="12" r="1.5" />
        </>
      )}
      {motif === "crystal" && (
        <>
          <path d="m32 7 20 17-7 25-13 8-13-8-7-25L32 7Z" />
          <path d="m12 24 20 7 20-7M19 49l13-18 13 18M32 7v24m0 0v27" />
          <path d="m20 16 12 15 12-15" />
          <circle cx="32" cy="31" r="2" />
        </>
      )}
    </svg>
  );
}

function ResearchHorizon() {
  return (
    <svg
      aria-hidden="true"
      className={styles.researchGlyph}
      focusable="false"
      viewBox="0 0 440 360"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="224" cy="169" r="112" strokeWidth="1.2" />
      <ellipse cx="224" cy="169" rx="47" ry="112" strokeWidth="1" />
      <ellipse cx="224" cy="169" rx="88" ry="112" strokeWidth="0.8" />
      <path d="M112 169h224M134 123c29 17 58 25 90 25s61-8 90-25M134 215c29-17 58-25 90-25s61 8 90 25" strokeWidth="0.9" />
      <path d="M24 298h392M72 274c49-31 99-46 152-46s103 15 152 46M48 314c54-19 112-28 176-28s122 9 176 28" strokeWidth="1.2" />
      <path d="M224 38v40m0 183v42M80 169h40m208 0h40M125 70l28 28m142 142 28 28M323 70l-28 28M153 240l-28 28" strokeWidth="0.9" />
      <circle cx="224" cy="169" r="4" fill="currentColor" stroke="none" />
      <circle cx="323" cy="123" r="3" fill="currentColor" stroke="none" />
      <circle cx="153" cy="215" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="281" cy="72" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TechnologyCube() {
  return (
    <svg
      aria-hidden="true"
      className={styles.technologyGlyph}
      focusable="false"
      viewBox="0 0 380 280"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
    >
      <path d="m190 20 126 71-126 73L64 91l126-71Z" strokeWidth="1.5" />
      <path d="M64 91v105l126 72V164L64 91Zm252 0v105l-126 72V164l126-73Z" strokeWidth="1.5" />
      <path d="m190 55 65 37-65 37-65-37 65-37Z" strokeWidth="1" />
      <path d="M91 107v72l81 46v-72l-81-46Zm198 0v72l-81 46v-72l81-46Z" strokeWidth="1" />
      <path d="m190 156 126-65M190 164l-126-73M190 164v104" strokeWidth="2.5" />
      <path d="m38 82 152-88 152 88M38 205l152 87 152-87" strokeDasharray="2 8" strokeWidth="0.8" />
      <circle cx="190" cy="20" r="3" fill="currentColor" stroke="none" />
      <circle cx="316" cy="91" r="3" fill="currentColor" stroke="none" />
      <circle cx="64" cy="91" r="3" fill="currentColor" stroke="none" />
      <circle cx="190" cy="268" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function HomeSections() {
  return (
    <div className={styles.sections}>
      <section
        aria-labelledby="capabilities-title"
        className={styles.capabilities}
        id="capabilities"
      >
        <div className={styles.sectionRule} aria-hidden="true">
          <span />
        </div>
        <div className={styles.capabilitiesInner}>
          <header className={styles.capabilitiesIntro}>
            <p className={styles.eyebrow}>OUR CORE CAPABILITIES</p>
            <h2 className={styles.sectionTitle} id="capabilities-title">
              Intelligence in action.
            </h2>
            <p className={styles.introCopy}>
              Nex Labs explores intelligent systems that connect software, data
              and real-world environments through focused research and
              engineering.
            </p>
            <a className={styles.textLink} href="#infrastructure">
              Explore the system <span aria-hidden="true">→</span>
            </a>
          </header>

          <div className={styles.capabilityGrid}>
            {capabilities.map((capability) => (
              <article className={styles.capabilityCard} key={capability.title}>
                <div className={styles.cardVisual}>
                  <span className={styles.cardHalo} aria-hidden="true" />
                  <CapabilityGlyph motif={capability.motif} />
                </div>
                <div className={styles.cardCopy}>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </div>
                <a
                  aria-label={`Explore ${capability.title} in the technology preview`}
                  className={styles.cardLink}
                  href="#infrastructure"
                >
                  <span aria-hidden="true">→</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="principles-title"
        className={styles.principles}
        id="principles"
      >
        <header className={styles.principlesIntro}>
          <p className={styles.eyebrow}>HOW WE BUILD</p>
          <h2 className={styles.sectionTitle} id="principles-title">
            Principles in practice.
          </h2>
        </header>
        <ul className={styles.principleRail}>
          {principles.map((principle) => (
            <li className={styles.principle} key={principle.title}>
              <span className={styles.principleNode} aria-hidden="true" />
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="vision-title" className={styles.vision} id="vision">
        <p className={styles.eyebrow}>OUR DIRECTION</p>
        <div className={styles.visionGrid}>
          <h2 className={styles.sectionTitle} id="vision-title">
            Technology with a reason to exist.
          </h2>
          <div className={styles.visionCopy}>
            <p>
              Nex Labs Technology explores intelligent systems that connect
              software, data and real-world operations. Our direction combines
              research, engineering quality, human-centered design and
              responsible deployment.
            </p>
            <p>
              The goal is not complexity for its own sake. It is to build
              systems that make difficult problems clearer, more usable and
              more adaptable.
            </p>
          </div>
        </div>
        <div className={styles.visionOrbit} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>

      <div className={styles.narrativeBand}>
        <section aria-labelledby="research-title" className={styles.research} id="research">
          <div className={styles.narrativeCopy}>
            <p className={styles.eyebrow}>RESEARCH &amp; BREAKTHROUGHS</p>
            <h2 className={styles.sectionTitle} id="research-title">
              Ideas that become reality.
            </h2>
            <div className={styles.researchDetails} id="research-details">
              <p>
                Research at Nex Labs is a bridge between possibility and
                implementation. We explore emerging methods, prototype
                aggressively and use evidence to decide what deserves to become
                a product or platform.
              </p>
              <p className={styles.microcopy}>
                Bolder questions. Deeper engineering. Real-world learning.
              </p>
            </div>
            <a className={styles.textLink} href="#research-details">
              Explore research <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className={styles.researchVisual}>
            <div className={styles.visualGlow} aria-hidden="true" />
            <ResearchHorizon />
            <span className={styles.visualCaption} aria-hidden="true">
              POSSIBILITY / IMPLEMENTATION
            </span>
          </div>
        </section>

        <section
          aria-labelledby="technology-title"
          className={styles.technology}
          id="infrastructure"
        >
          <p className={styles.eyebrow}>OUR TECHNOLOGY PLATFORM</p>
          <h2 className={styles.sectionTitle} id="technology-title">
            Built to transform.
          </h2>
          <p className={styles.technologyIntro}>
            A modular technology foundation can combine intelligence, data,
            interfaces and integration layers without forcing every problem
            into the same architecture.
          </p>
          <div className={styles.technologyDetails} id="technology-preview">
            <div className={styles.cubeVisual}>
              <span className={styles.cubeGlow} aria-hidden="true" />
              <TechnologyCube />
            </div>
            <ul className={styles.technologyPillars}>
              {technologyPillars.map((pillar) => (
                <li key={pillar}>
                  <span className={styles.pillarNode} aria-hidden="true" />
                  {pillar}
                </li>
              ))}
            </ul>
          </div>
          <a className={styles.textLink} href="#technology-preview">
            Explore the architecture <span aria-hidden="true">→</span>
          </a>
        </section>
      </div>

      <section aria-labelledby="contact-title" className={styles.finalCta} id="contact">
        <div className={styles.ctaEnergy} aria-hidden="true">
          <span />
          <span />
        </div>
        <div className={styles.ctaCopy}>
          <p className={styles.eyebrow}>NEX LABS TECHNOLOGY</p>
          <h2 className={styles.sectionTitle} id="contact-title">
            Building the next chapter of intelligent systems.
          </h2>
          <p className={styles.ctaDescription}>
            The Home experience is the first layer of the Nex Labs platform
            story. Technology, Solutions, Research, Company and Contact become
            dedicated destinations in the next website increment.
          </p>
          <div className={styles.ctaActions}>
            <a className={styles.primaryAction} href="#capabilities">
              Explore capabilities <span aria-hidden="true">→</span>
            </a>
            <a className={styles.secondaryAction} href="#research">
              View research
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
