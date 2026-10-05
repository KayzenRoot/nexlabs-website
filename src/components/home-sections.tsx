import styles from "./home-sections.module.css";
import { ScrollReveal } from "./visual/scroll-reveal";

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
      <defs>
        <linearGradient id={`glyph-chrome-${motif}`} x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#effcff" stopOpacity="0.9" />
          <stop offset="0.42" stopColor="#45bdff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#173b70" stopOpacity="0.52" />
        </linearGradient>
        <radialGradient id={`glyph-core-${motif}`}>
          <stop stopColor="#c4fbff" stopOpacity="0.95" />
          <stop offset="0.38" stopColor="#44cfff" stopOpacity="0.48" />
          <stop offset="1" stopColor="#166bff" stopOpacity="0.04" />
        </radialGradient>
      </defs>
      {motif === "network" && (
        <>
          <path d="M32 12c-4-7-15-5-16 3-6 0-9 7-6 12-4 5-2 12 5 13 1 7 9 9 14 4V12Zm0 0c4-7 15-5 16 3 6 0 9 7 6 12 4 5 2 12-5 13-1 7-9 9-14 4V12Z" fill={`url(#glyph-chrome-${motif})`} fillOpacity="0.54" />
          <circle cx="32" cy="31" r="19" fill={`url(#glyph-core-${motif})`} fillOpacity="0.56" stroke="none" />
          <path d="M32 12c-4-7-15-5-16 3-6 0-9 7-6 12-4 5-2 12 5 13 1 7 9 9 14 4V12Zm0 0c4-7 15-5 16 3 6 0 9 7 6 12 4 5 2 12-5 13-1 7-9 9-14 4V12Z" transform="translate(1.2 2.2)" fill="#06152a" stroke="#257dd4" strokeOpacity="0.56" />
          <path d="M32 12c-4-7-15-5-16 3-6 0-9 7-6 12-4 5-2 12 5 13 1 7 9 9 14 4V12Zm0 0c4-7 15-5 16 3 6 0 9 7 6 12 4 5 2 12-5 13-1 7-9 9-14 4V12Z" />
          <path d="M32 14v34M18 22h10m8 0h10M14 34h13m10 0h13M21 43h8m6 0h8M17 27l7 5m23-5-7 5M23 39l7-5m11 5-7-5" />
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
          <path d="m32 10 22 11-22 11-22-11 22-11Z" fill={`url(#glyph-chrome-${motif})`} fillOpacity="0.72" />
          <path d="m10 30 22 11 22-11-22 11-22-11Zm0 9 22 11 22-11-22 11-22-11Z" fill={`url(#glyph-chrome-${motif})`} fillOpacity="0.46" />
          <path d="m32 10 22 11-22 11-22-11 22-11Z" />
          <path d="m10 30 22 11 22-11M10 39l22 11 22-11m-44 9 22 11 22-11" />
          <path d="M14 33 32 42l18-9v7L32 51l-18-9v-9Zm0 10 18 9 18-9v7L32 59l-18-9v-7Z" fill="#071d39" fillOpacity="0.95" stroke="#71d8ff" strokeOpacity="0.78" />
          <path d="M17 21 32 29l15-8M17 39v5m30-5v5M32 32v8" />
          <path d="M10 48 32 59l22-11" />
        </>
      )}
      {motif === "globe" && (
        <>
          <circle cx="32" cy="32" r="23" fill={`url(#glyph-core-${motif})`} fillOpacity="0.62" stroke="none" />
          <circle cx="32" cy="32" r="23" />
          <path d="M9 32h46M32 9c8 7 12 15 12 23s-4 16-12 23c-8-7-12-15-12-23S24 16 32 9Z" />
          <path d="M13 21c6 4 12 6 19 6s13-2 19-6M13 43c6-4 12-6 19-6s13 2 19 6" />
          <path d="M11 27c9-5 17-8 27-6m-22 23c11-2 20-1 31 4" strokeOpacity="0.58" />
          <path d="m16 23 8 9-4 10m4-20 8 10 8-10m-8 10 10 9m-18-9-8 6m24-16 7 3" stroke="#b4f4ff" strokeWidth="1.6" strokeOpacity="0.88" />
          <g fill="#c8f8ff" stroke="none"><circle cx="16" cy="23" r="1.8"/><circle cx="24" cy="32" r="2"/><circle cx="32" cy="22" r="1.8"/><circle cx="40" cy="22" r="1.8"/><circle cx="42" cy="41" r="1.8"/><circle cx="20" cy="42" r="1.8"/></g>
          <circle cx="32" cy="32" r="3" />
        </>
      )}
      {motif === "orbit" && (
        <>
          <circle cx="32" cy="32" r="11" fill={`url(#glyph-core-${motif})`} stroke="none" />
          <circle cx="32" cy="32" r="4" fill="#c8f8ff" />
          <ellipse cx="32" cy="32" rx="23" ry="9" fill="#0b315f" fillOpacity="0.72" stroke="#a2efff" strokeOpacity="0.8" strokeWidth="1.4" />
          <ellipse cx="32" cy="32" rx="23" ry="9" stroke="#071b37" strokeWidth="7" />
          <ellipse cx="32" cy="32" rx="23" ry="9" stroke="#83eaff" strokeOpacity="0.9" strokeWidth="2.2" />
          <ellipse cx="32" cy="32" rx="23" ry="9" transform="rotate(58 32 32) translate(1.5 2)" stroke="#06172f" strokeWidth="7" />
          <ellipse cx="32" cy="32" rx="23" ry="9" transform="rotate(58 32 32)" stroke="#0a2550" strokeWidth="6" />
          <ellipse cx="32" cy="32" rx="23" ry="9" transform="rotate(58 32 32)" stroke="#77cfff" strokeOpacity="0.82" strokeWidth="1.8" />
          <ellipse cx="32" cy="32" rx="23" ry="9" transform="rotate(-58 32 32)" stroke="#123b75" strokeWidth="5" />
          <ellipse cx="32" cy="32" rx="23" ry="9" transform="rotate(-58 32 32)" stroke="#d3f8ff" strokeOpacity="0.85" strokeWidth="1.6" />
          <circle cx="52" cy="25" r="2" />
          <circle cx="20" cy="12" r="1.5" />
        </>
      )}
      {motif === "crystal" && (
        <>
          <path d="m32 7 20 17-7 25-13 8-13-8-7-25L32 7Z" fill={`url(#glyph-chrome-${motif})`} fillOpacity="0.62" />
          <path d="m32 7 0 24-13-7 13-17Zm0 24 20-7-7 25-13-18Zm0 0-13 18 13 8V31Z" fill={`url(#glyph-core-${motif})`} fillOpacity="0.46" stroke="none" />
          <path d="m32 7 20 17-7 25-13 8-13-8-7-25L32 7Z" transform="translate(1.5 2.2)" fill="#06142b" stroke="#267cd2" strokeOpacity="0.72" />
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
      <defs>
        <radialGradient id="research-world-core" cx="35%" cy="28%">
          <stop stopColor="#c6f5ff" stopOpacity="0.7" />
          <stop offset="0.28" stopColor="#328eff" stopOpacity="0.43" />
          <stop offset="0.7" stopColor="#0d3a79" stopOpacity="0.25" />
          <stop offset="1" stopColor="#06152b" stopOpacity="0.02" />
        </radialGradient>
        <linearGradient id="research-platform" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#94f1ff" stopOpacity="0.92" />
          <stop offset="0.46" stopColor="#318dff" stopOpacity="0.47" />
          <stop offset="1" stopColor="#12366f" stopOpacity="0.13" />
        </linearGradient>
        <linearGradient id="research-glass" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#67dfff" stopOpacity="0.27" />
          <stop offset="1" stopColor="#082655" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <path d="M20 77h78v67H20zM31 88h56v2H31zm0 8h41v2H31zm0 8h49v2H31zm0 8h34v2H31z" fill="url(#research-glass)" stroke="#4aa9ff" strokeOpacity="0.46" />
      <path d="M321 62h71v84h-71zM330 74h52v1H330zm0 8h42v1H330zm0 8h48v1H330zm0 8h32v1H330z" fill="url(#research-glass)" stroke="#53baff" strokeOpacity="0.45" />
      <path d="M42 48v230m28-201v175M399 42v226m-28-195v165" stroke="#54aaff" strokeOpacity="0.28" />
      <path d="M109 61v172m226-162v170M126 80v121m191-114v127" stroke="#9beaff" strokeOpacity="0.17" />
        <ellipse cx="220" cy="159" rx="157" ry="149" fill="url(#research-world-core)" fillOpacity="0.34" stroke="#3f9df5" strokeOpacity="0.26" strokeWidth="1.1" />
        <ellipse cx="220" cy="159" rx="145" ry="139" fill="url(#research-world-core)" stroke="#9aeaff" strokeOpacity="0.74" strokeWidth="1.8" />
      <path d="M147 129 171 96l24 5 17 22-10 25-27 8-24-13Zm91-24 28-13 26 21 12 30-21 13-22-11-17-20Zm-79 88 23-21 30 6 14 25-22 20-31-8Zm86 9 26-19 31 16-8 23-28 11-24-14Z" fill="url(#research-platform)" fillOpacity="0.86" stroke="none" />
      <ellipse cx="220" cy="159" rx="145" ry="139" strokeWidth="1.25" />
      <ellipse cx="220" cy="159" rx="62" ry="139" stroke="#9feaff" strokeOpacity="0.6" strokeWidth="1.1" />
      <ellipse cx="220" cy="159" rx="111" ry="139" stroke="#68c9ff" strokeOpacity="0.48" strokeWidth="0.9" />
        <path d="M76 159h288M94 113c38 20 80 30 126 30s88-10 126-30M94 205c38-20 80-30 126-30s88 10 126 30M115 76c29 24 64 36 105 36s76-12 105-36M115 243c29-24 64-36 105-36s76 12 105 36M153 37c18 39 41 72 67 98 27 27 50 62 67 107M287 37c-18 39-41 72-67 98-27 27-50 62-67 107" stroke="#a5edff" strokeOpacity="0.54" strokeWidth="1" />
        <path d="m115 99 62 42 43 18 56 52m-153-99 69 6 43 51 59-70m-180 122 64-42 57-11 50-44m-98 116 40-77 43-33 48 56" stroke="#c6f6ff" strokeOpacity="0.38" strokeWidth="1.2" />
      <path d="M79 287h282M48 307c55-32 112-49 172-49s117 17 172 49M28 328c64-26 128-39 192-39s128 13 192 39M60 344h320" stroke="url(#research-platform)" strokeWidth="1.35" />
      <path d="M68 293h304m-276 20h248M101 335h216" stroke="#61bfff" strokeOpacity="0.27" />
      <path d="M220 18v40m0 242v47M58 159h32m260 0h32M106 45l27 31m174 165 27 31M334 45l-27 31M133 242l-27 31" stroke="#9feaff" strokeOpacity="0.48" strokeWidth="1" />
      <path d="M265 44 317 22m-33 40 71-30M128 269l-46 24m229-16 53 26" stroke="#54b7ff" strokeOpacity="0.68" />
        <circle cx="220" cy="159" r="12" fill="url(#research-platform)" stroke="none" />
        <circle cx="220" cy="159" r="4.5" fill="#f0fdff" stroke="none" />
      <circle cx="331" cy="112" r="4" fill="#c3f6ff" stroke="none" />
      <circle cx="122" cy="202" r="3.5" fill="#68dcff" stroke="none" />
      <circle cx="277" cy="47" r="3" fill="#d6faff" stroke="none" />
      <circle cx="162" cy="83" r="2.7" fill="#67dfff" stroke="none" />
      <circle cx="297" cy="224" r="3.2" fill="#b3efff" stroke="none" />
      <path d="M348 276v-27a6 6 0 0 1 12 0v27m-6-38v-8m-9 15h18m-17 31-5 20m20-20 5 20m-37 9h58" stroke="#bcefff" strokeWidth="2.6" />
      <path d="M342 273v-11m24 11v-11m-19-2h14" stroke="#318dff" strokeWidth="1.3" />
      <circle cx="354" cy="232" r="5.2" fill="#e4fbff" stroke="none" />
      <path d="M340 307h29" stroke="#6bdfff" strokeWidth="3" />
      <ellipse cx="220" cy="300" rx="92" ry="13" fill="#1764b2" fillOpacity="0.16" stroke="#59d8ff" strokeOpacity="0.62" />
    </svg>
  );
}

function TechnologyCube() {
  return (
    <svg
      aria-hidden="true"
      className={styles.technologyGlyph}
      focusable="false"
      viewBox="32 10 316 270"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id="home-platform-top" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#ecfbff" stopOpacity="0.8" />
          <stop offset="0.42" stopColor="#4fcaff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#123c78" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id="home-platform-side" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#49dbff" stopOpacity="0.38" />
          <stop offset="1" stopColor="#103068" stopOpacity="0.11" />
        </linearGradient>
      </defs>
      <path d="m190 20 126 71-126 73L64 91l126-71Z" fill="url(#home-platform-top)" fillOpacity="0.48" stroke="none" />
      <path d="M64 91v105l126 72V164L64 91Zm252 0v105l-126 72V164l126-73Z" fill="url(#home-platform-side)" fillOpacity="0.36" stroke="none" />
      <path d="m72 132 118 68 118-68v13l-118 68-118-68v-13Z" fill="#103a70" fillOpacity="0.92" stroke="#5bdcff" strokeOpacity="0.78" />
      <path d="m72 157 118 68 118-68v12l-118 68-118-68v-12Z" fill="#0a2855" fillOpacity="0.95" stroke="#348dff" strokeOpacity="0.7" />
      <path d="m72 182 118 68 118-68v12l-118 68-118-68v-12Z" fill="#071b3b" fillOpacity="0.96" stroke="#49caff" strokeOpacity="0.82" />
      <path d="M77 136 190 201l113-65m-113 78 113-65M77 185l113 65 113-65" stroke="#c1f5ff" strokeOpacity="0.62" strokeWidth="1.4" />
      <path d="m190 20 126 71-126 73L64 91l126-71Z" strokeWidth="1.5" />
      <path d="M64 91v105l126 72V164L64 91Zm252 0v105l-126 72V164l126-73Z" strokeWidth="1.5" />
      <path d="m190 55 65 37-65 37-65-37 65-37Z" strokeWidth="1" />
      <path d="M91 107v72l81 46v-72l-81-46Zm198 0v72l-81 46v-72l81-46Z" strokeWidth="1" />
      <path d="m190 156 126-65M190 164l-126-73M190 164v104" strokeWidth="2.5" />
      <path d="m190 95 95 54m-95-54-95 54m95-54v103m-69-58 69 39 69-39m-69 62 53-31m-53 31-53-31" stroke="#d9f8ff" strokeOpacity="0.45" strokeWidth="1.1" />
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
      <ScrollReveal />
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

          <div className={styles.capabilityGrid} data-world-reveal="capabilities">
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
        <ul className={styles.principleRail} data-world-reveal="principles">
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

      <div className={styles.narrativeBand} data-world-reveal="narrative">
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
            <a className={styles.textLink} href="/research">
              Explore research <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className={styles.researchVisual} data-world-reveal="research">
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
            <div className={styles.cubeVisual} data-world-reveal="technology">
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
            Explore the systems, research and principles shaping Nex Labs, then use Contact to frame the context for a future conversation.
          </p>
          <div className={styles.ctaActions}>
            <a className={styles.primaryAction} href="#capabilities">
              Explore capabilities <span aria-hidden="true">→</span>
            </a>
            <a className={styles.secondaryAction} href="/contact">
              Contact Nex Labs
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
