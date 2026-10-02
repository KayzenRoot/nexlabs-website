import styles from "./site-header.module.css";

const navigation = [
  { href: "#home", label: "Home" },
  { href: "#project", label: "Project" },
  { href: "#contact", label: "Contact" },
];

/**
 * Renders the accessible global header and the temporary in-page navigation used
 * until governed secondary routes are implemented.
 */
export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.wordmark} href="#home" aria-label="Nex Labs Technology — home">
          <span className={styles.name}>NEX LABS</span>
          <span className={styles.descriptor}>TECHNOLOGY</span>
        </a>

        <nav className={styles.navigation} aria-label="Main navigation">
          {navigation.map((item) => (
            <a className={styles.link} href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
