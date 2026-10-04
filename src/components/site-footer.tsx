import styles from "./site-footer.module.css";
import { BrandMark } from "./brand-mark";

/**
 * Renders the global footer with links to all admitted routes.
 */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <a className={styles.brandLink} href="/" aria-label="Nex Labs Technology — back to home">
        <span className={styles.markFrame}>
          <BrandMark />
        </span>
        <span className={styles.wordmark}>
          <span className={styles.name}>NEX LABS</span>
          <span className={styles.descriptor}>TECHNOLOGY</span>
        </span>
      </a>
      <nav className={styles.navigation} aria-label="Footer navigation">
        <a href="/solutions">Solutions</a>
        <a href="/technology">Technology</a>
        <a href="/research">Research</a>
        <a href="/company">Company</a>
        <a href="/contact">Contact Nex Labs</a>
      </nav>
      <p className={styles.note}>Technology, research and engineering with intent.</p>
    </footer>
  );
}
