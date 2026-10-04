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
          <a className={styles.primaryAction} href="#capabilities">
            Explore our capabilities <span aria-hidden="true">→</span>
          </a>
          <a className={styles.secondaryAction} href="#contact">
            Explore the next chapter
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
