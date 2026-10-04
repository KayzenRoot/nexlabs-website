import type { ReactNode } from "react";
import { BrandMark } from "./brand-mark";
import styles from "./secondary-page.module.css";

type SecondaryAction = {
  readonly href: string;
  readonly label: string;
};

type SecondaryHeroProps = {
  readonly idPrefix: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly primaryAction: SecondaryAction;
  readonly secondaryAction: SecondaryAction;
  readonly visual: ReactNode;
};

/** Shared, semantic first-frame for the M06 secondary routes. */
export function SecondaryHero({
  idPrefix,
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  visual,
}: SecondaryHeroProps) {
  return (
    <section aria-labelledby={`${idPrefix}-title`} className={styles.hero}>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.heroTitle} id={`${idPrefix}-title`}>
          {title}
        </h1>
        <p className={styles.heroLead}>{description}</p>
        <nav aria-label={`${eyebrow.toLowerCase()} actions`} className={styles.actions}>
          <a className={styles.primaryAction} href={primaryAction.href}>
            {primaryAction.label}
            <span aria-hidden="true">→</span>
          </a>
          <a className={styles.secondaryAction} href={secondaryAction.href}>
            {secondaryAction.label}
          </a>
        </nav>
      </div>
      <div aria-hidden="true" className={styles.heroArtwork} data-secondary-artwork-motion="">
        {visual}
      </div>
    </section>
  );
}

type SectionHeadingProps = {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description?: string;
};

/** Keeps section labels and heading relationships consistent across M06. */
export function SecondarySectionHeading({
  id,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <header className={styles.sectionHeading}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {description ? <p className={styles.sectionLead}>{description}</p> : null}
    </header>
  );
}

/** Lightweight isometric stack that carries the Technology page layer motif. */
export function TechnologyStackArtwork() {
  return (
    <svg
      className={styles.stackArtwork}
      focusable="false"
      viewBox="0 0 620 520"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="technology-layer-top" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f2fbff" stopOpacity="0.68" />
          <stop offset="0.38" stopColor="#7dcfff" stopOpacity="0.26" />
          <stop offset="1" stopColor="#17283e" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="technology-layer-side" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#55d8ff" stopOpacity="0.42" />
          <stop offset="1" stopColor="#1b2940" stopOpacity="0.12" />
        </linearGradient>
        <radialGradient id="technology-stack-halo">
          <stop stopColor="#48aaff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#48aaff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="310" cy="286" fill="url(#technology-stack-halo)" rx="278" ry="219" />
      <circle className={styles.outerOrbit} cx="310" cy="270" r="224" />
      <circle className={styles.innerOrbit} cx="310" cy="270" r="179" />
      <path className={styles.energyRail} d="M34 270h104m344 0h104M310 34v66m0 340v48" />
      <path
        className={styles.stackBase}
        d="m82 343 228-120 228 120v42L310 506 82 385z"
      />
      <path className={styles.stackSide} d="m82 343 228 120v43L82 385z" />
      <path className={styles.stackSide} d="m310 463 228-120v42L310 506z" />
      <path className={styles.stackLayer} d="m99 309 211-111 211 111-211 111z" />
      <path className={styles.stackLayerSide} d="m99 309 211 111v19L99 328z" />
      <path className={styles.stackLayerSide} d="m310 420 211-111v19L310 439z" />
      <path className={styles.stackLayer} d="m99 268 211-111 211 111-211 111z" />
      <path className={styles.stackLayerSide} d="m99 268 211 111v19L99 287z" />
      <path className={styles.stackLayerSide} d="m310 379 211-111v19L310 398z" />
      <path className={styles.stackLayer} d="m99 227 211-111 211 111-211 111z" />
      <path className={styles.stackLayerSide} d="m99 227 211 111v19L99 246z" />
      <path className={styles.stackLayerSide} d="m310 338 211-111v19L310 357z" />
      <path className={styles.stackLayer} d="m99 186 211-111 211 111-211 111z" />
      <path className={styles.stackLayerSide} d="m99 186 211 111v19L99 205z" />
      <path className={styles.stackLayerSide} d="m310 297 211-111v19L310 316z" />
      <path className={styles.stackTop} d="m99 145 211-111 211 111-211 111z" />
      <path className={styles.stackFacet} d="m310 34 211 111-211 111z" />
      <path className={styles.energyRail} d="M310 34v222M99 145l211 111 211-111" />
      <circle className={styles.node} cx="99" cy="145" r="4" />
      <circle className={styles.node} cx="521" cy="145" r="4" />
      <circle className={styles.node} cx="310" cy="256" r="5" />
    </svg>
  );
}

/** Decorative capability network made from SVG rather than another scene runtime. */
export function SolutionsOrbitArtwork() {
  return (
    <svg
      className={styles.orbitArtwork}
      focusable="false"
      viewBox="0 0 620 520"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="solutions-orbit-halo">
          <stop stopColor="#58cfff" stopOpacity="0.3" />
          <stop offset="1" stopColor="#58cfff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="solutions-core" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#effaff" stopOpacity="0.88" />
          <stop offset="0.5" stopColor="#73caff" stopOpacity="0.48" />
          <stop offset="1" stopColor="#17283e" stopOpacity="0.38" />
        </linearGradient>
      </defs>
      <ellipse cx="310" cy="260" fill="url(#solutions-orbit-halo)" rx="278" ry="220" />
      <ellipse className={styles.orbitPath} cx="310" cy="260" rx="234" ry="136" />
      <ellipse className={styles.orbitPathFine} cx="310" cy="260" rx="174" ry="218" />
      <path className={styles.energyRail} d="m124 166 132 54m232-54-132 54m-230 135 133-70m233 70-133-70M310 72v135m0 105v137" />
      <path
        className={styles.coreShell}
        d="m310 191 70 39v80l-70 40-70-40v-80z"
        fill="url(#solutions-core)"
      />
      <path className={styles.coreLine} d="m240 230 70 40 70-40m-70 40v80" />
      <circle className={styles.capabilityNode} cx="310" cy="76" r="23" />
      <circle className={styles.capabilityNode} cx="487" cy="158" r="20" />
      <circle className={styles.capabilityNode} cx="446" cy="346" r="22" />
      <circle className={styles.capabilityNode} cx="174" cy="346" r="19" />
      <circle className={styles.capabilityNode} cx="132" cy="158" r="21" />
      <circle className={styles.node} cx="310" cy="76" r="4" />
      <circle className={styles.node} cx="487" cy="158" r="4" />
      <circle className={styles.node} cx="446" cy="346" r="4" />
      <circle className={styles.node} cx="174" cy="346" r="4" />
      <circle className={styles.node} cx="132" cy="158" r="4" />
      <circle className={styles.coreLight} cx="310" cy="270" r="10" />
    </svg>
  );
}

/** Branching signal field that converges on an evidence core without a scene runtime. */
export function ResearchSignalArtwork() {
  return (
    <svg
      className={styles.researchArtwork}
      focusable="false"
      viewBox="0 0 620 520"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="research-field-halo">
          <stop stopColor="#55cfff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#2478d8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="research-evidence-core">
          <stop stopColor="#e8fbff" stopOpacity="0.94" />
          <stop offset="0.24" stopColor="#8deaff" stopOpacity="0.72" />
          <stop offset="1" stopColor="#1765a4" stopOpacity="0.16" />
        </radialGradient>
      </defs>
      <ellipse cx="310" cy="260" fill="url(#research-field-halo)" rx="286" ry="226" />
      <path className={styles.researchRail} d="M42 92h105l74 44m-179 292h105l74-44m357-292H473l-74 44m179 292H473l-74-44M310 32v112m0 232v112" />
      <path className={styles.researchRailFine} d="m62 172 127 26 88 43m281-69-127 26-88 43M62 348l127-26 88-43m281 69-127-26-88-43" />
      <path className={styles.signalTrail} d="M42 92h105l74 44 89 88m-268 204h105l74-44 89-88m248-204H473l-74 44-89 88m268 204H473l-74-44-89-88M310 32v112m0 232v112" />
      <circle className={styles.researchNode} cx="42" cy="92" r="5" />
      <circle className={styles.researchNode} cx="42" cy="428" r="5" />
      <circle className={styles.researchNode} cx="578" cy="92" r="5" />
      <circle className={styles.researchNode} cx="578" cy="428" r="5" />
      <circle className={styles.researchNode} cx="310" cy="32" r="5" />
      <circle className={styles.researchNode} cx="310" cy="488" r="5" />
      <circle className={styles.evidenceHalo} cx="310" cy="260" r="89" />
      <circle className={styles.evidenceCore} cx="310" cy="260" r="48" />
      <path className={styles.evidenceSignal} d="M286 260h48m-24-24v48m-17-7 34-34" />
      <circle className={styles.evidenceNode} cx="211" cy="136" r="4" />
      <circle className={styles.evidenceNode} cx="211" cy="384" r="4" />
      <circle className={styles.evidenceNode} cx="409" cy="136" r="4" />
      <circle className={styles.evidenceNode} cx="409" cy="384" r="4" />
    </svg>
  );
}

/** Measured principle field with the approved brand mark as a restrained center echo. */
export function CompanyAlignmentArtwork() {
  return (
    <div className={styles.companyArtwork}>
      <svg
        className={styles.companyFrame}
        focusable="false"
        viewBox="0 0 620 520"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="company-alignment-halo">
            <stop stopColor="#4ecbff" stopOpacity="0.26" />
            <stop offset="1" stopColor="#2369c7" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="310" cy="260" fill="url(#company-alignment-halo)" rx="274" ry="216" />
        <path className={styles.alignmentFrame} d="M100 86h420v348H100zM138 124h344v272H138z" />
        <path className={styles.alignmentRail} d="M310 44v125m0 182v125M58 260h142m220 0h142M190 140l80 80m80 80 80 80m0-240-80 80m-80 80-80 80" />
        <path className={styles.alignmentRailFine} d="M190 140h240v240H190zM310 86v88m0 172v88M100 260h90m240 0h90" />
        <circle className={styles.principleNode} cx="190" cy="140" r="18" />
        <circle className={styles.principleNode} cx="430" cy="140" r="18" />
        <circle className={styles.principleNode} cx="190" cy="380" r="18" />
        <circle className={styles.principleNode} cx="430" cy="380" r="18" />
        <circle className={styles.principlePoint} cx="190" cy="140" r="3" />
        <circle className={styles.principlePoint} cx="430" cy="140" r="3" />
        <circle className={styles.principlePoint} cx="190" cy="380" r="3" />
        <circle className={styles.principlePoint} cx="430" cy="380" r="3" />
        <circle className={styles.alignmentCore} cx="310" cy="260" r="76" />
        <path className={styles.alignmentAxis} d="M310 169v182M219 260h182" />
      </svg>
      <span className={styles.companyMark}>
        <BrandMark className={styles.brandEcho} />
      </span>
    </div>
  );
}
