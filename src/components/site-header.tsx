import styles from "./site-header.module.css";
import { BrandMark } from "./brand-mark";
import { SiteNavigation } from "./site-navigation";

/**
 * Renders the selected identity and route-aware global navigation.
 */
export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brandLink} href="/" aria-label="Nex Labs Technology — home">
          <span className={styles.markFrame}>
            <BrandMark />
          </span>
          <span className={styles.wordmark}>
            <span className={styles.name}>NEX LABS</span>
            <span className={styles.descriptor}>TECHNOLOGY</span>
          </span>
        </a>

        <SiteNavigation />

        <a aria-label="Contact Nex Labs" className={styles.contactAction} href="/contact">
          <span className={styles.contactDesktopLabel}>Contact Nex Labs</span>
          <span className={styles.contactMobileLabel}>Contact</span>
          <span aria-hidden="true">→</span>
        </a>

        <p className={styles.headerNote}>
          <span>INNOVATION</span>
          <span>INTELLIGENCE</span>
          <span>REAL-WORLD IMPACT</span>
        </p>
      </div>
    </header>
  );
}
