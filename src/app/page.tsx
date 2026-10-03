import { StaticHero } from "../components/static-hero";
import styles from "./page.module.css";

const plannedHomeAnchors = [
  "capabilities",
  "products",
  "credibility",
  "vision",
  "infrastructure",
  "research",
] as const;

/**
 * Renders the M04 semantic hero and keeps draft-safe anchors for later governed
 * Home-section increments.
 */
export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <StaticHero />

      <section
        className={styles.project}
        id="project"
        aria-labelledby="project-title"
      >
        <p className={styles.eyebrow}>THE FIRST CHAPTER</p>
        <h2 id="project-title">A new space is taking shape.</h2>
        <p className={styles.bodyCopy}>
          The Nex Labs Technology website is under construction. More information
          will be published here soon.
        </p>
      </section>

      <section
        className={styles.contact}
        id="contact"
        aria-labelledby="contact-title"
      >
        <p className={styles.eyebrow}>CONTACT</p>
        <h2 id="contact-title">More information is coming soon.</h2>
        <p className={styles.bodyCopy}>
          Official contact channels will be listed on this page.
        </p>
      </section>

      <div className={styles.plannedAnchors} aria-hidden="true">
        {plannedHomeAnchors.map((anchor) => (
          <span id={anchor} key={anchor} />
        ))}
      </div>
    </div>
  );
}
