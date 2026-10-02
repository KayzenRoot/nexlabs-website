import styles from "./static-hero.module.css";

export function StaticHero() {
  return (
    <section className={styles.hero} id="home" aria-labelledby="hero-title">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>
          <span className={styles.signal} aria-hidden="true" />
          TECHNOLOGY · RESEARCH · ENGINEERING
        </p>
        <h1 className={styles.title} id="hero-title">
          Technology for what comes next.
        </h1>
        <p className={styles.description}>
          Nex Labs Technology&apos;s digital home is taking shape. We&apos;re
          preparing the first chapter.
        </p>

        <div className={styles.actions} role="group" aria-label="Next steps">
          <a className={styles.primaryAction} href="#project">
            Explore the project <span aria-hidden="true">↗</span>
          </a>
          <a className={styles.secondaryAction} href="#contact">
            Contact Nex Labs
          </a>
        </div>

        <p className={styles.status}>
          <span className={styles.statusDot} aria-hidden="true" />
          A NEW SPACE IS TAKING SHAPE
        </p>
      </div>

      <div className={styles.visual} aria-hidden="true">
        <div className={styles.visualGrid} />
        <div className={styles.orbit}>
          <span className={styles.orbitAccent} />
        </div>
        <div className={styles.figure}>
          <div className={styles.head} />
          <div className={styles.neck} />
          <div className={styles.shoulders} />
          <div className={styles.torso} />
          <div className={styles.figureLight} />
        </div>
        <div className={styles.visualHorizon} />
      </div>
    </section>
  );
}
