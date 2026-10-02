import styles from "./site-footer.module.css";

/**
 * Renders the minimal M02 global footer without introducing unverified business
 * claims or links that belong to later website increments.
 */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <p>Nex Labs Technology</p>
      <p>A new space is taking shape.</p>
    </footer>
  );
}
