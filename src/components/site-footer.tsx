import styles from "./site-footer.module.css";
import { BrandMark } from "./brand-mark";

/**
 * Renders the minimal M02 global footer without introducing unverified business
 * claims or links that belong to later website increments.
 */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <a className={styles.brandLink} href="#home" aria-label="Nex Labs Technology — back to home">
        <span className={styles.markFrame}>
          <BrandMark />
        </span>
        <span className={styles.wordmark}>
          <span className={styles.name}>NEX LABS</span>
          <span className={styles.descriptor}>TECHNOLOGY</span>
        </span>
      </a>
      <p className={styles.note}>A new space is taking shape.</p>
    </footer>
  );
}
