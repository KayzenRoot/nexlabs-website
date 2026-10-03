import { precisionBladesGeometry, precisionBladesTransform } from "../brand/precision-blades";
import { HeroSceneClient } from "./hero-scene-client";
import styles from "./static-hero.module.css";

/** Semantic, server-rendered Home hero with its immediate no-WebGL poster. */
export function StaticHero() {
  return (
    <section className={styles.hero} id="home" aria-labelledby="hero-title">
      <div
        className={styles.world}
        aria-hidden="true"
        data-testid="hero-static-poster"
      >
        <div className={styles.referencePoster} />
        <div className={styles.worldGlow} />
        <div className={styles.posterDisplayMask} />
        <div className={styles.posterRailMask} />
        <div className={styles.starField} />
        <div className={styles.energyArcs} />
        <div className={styles.hologramGlobe}>
          <span />
          <span />
        </div>
        <div className={styles.chamber}>
          <span className={styles.chamberTop} />
          <span className={styles.chamberBottom} />
          <span className={styles.chamberRail} />
          <span className={styles.chamberRail} />
          <span className={styles.chamberRail} />
        </div>
        <div className={styles.rightPanel}>
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className={styles.platform}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.scaleFigure}>
          <span className={styles.figureHead} />
          <span className={styles.figureBody} />
          <span className={styles.figureLeg} />
          <span className={styles.figureLeg} />
        </div>
        <svg className={styles.posterMark} viewBox="0 0 335 335" focusable="false">
          <defs>
            <linearGradient id="poster-chrome" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.2" stopColor="#8796aa" />
              <stop offset="0.43" stopColor="#f5fbff" />
              <stop offset="0.62" stopColor="#3d5069" />
              <stop offset="0.8" stopColor="#eef8ff" />
              <stop offset="1" stopColor="#6caeff" />
            </linearGradient>
          </defs>
          <path
            d={precisionBladesGeometry.silhouette}
            transform={precisionBladesTransform}
            fill="url(#poster-chrome)"
            stroke="#b9e8ff"
            strokeWidth="2"
          />
        </svg>
        <div className={styles.posterVignette} />
      </div>

      <HeroSceneClient />

      <div className={styles.copy}>
        <p className={styles.eyebrow}>
          <span className={styles.signal} />
          TECHNOLOGY · RESEARCH · ENGINEERING
        </p>
        <h1
          className={styles.title}
          id="hero-title"
          aria-label="Human Potential Multiplied"
        >
          <span>HUMAN</span>
          <span>POTENTIAL</span>
          <span>MULTIPLIED</span>
        </h1>
        <p className={styles.description}>
          A new digital home for technology, research and engineering, shaped
          around people and the real world.
        </p>

        <div className={styles.actions} role="group" aria-label="Next steps">
          <a className={styles.primaryAction} href="#project">
            Explore the project <span aria-hidden="true">→</span>
          </a>
          <a className={styles.secondaryAction} href="#contact">
            Contact Nex Labs
          </a>
        </div>
      </div>

      <div className={styles.signalRail} aria-hidden="true">
        <span>PRECISION</span>
        <span>INNOVATION</span>
        <span>INTELLIGENCE</span>
        <span>REAL-WORLD IMPACT</span>
      </div>
    </section>
  );
}
