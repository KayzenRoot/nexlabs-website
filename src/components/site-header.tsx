import styles from "./site-header.module.css";
import { BrandMark } from "./brand-mark";

const navigation = [
  { href: "#capabilities", label: "Solutions" },
  { href: "#infrastructure", label: "Technology" },
  { href: "#products", label: "Products" },
  { href: "#research", label: "Research" },
  { href: "#vision", label: "Company" },
];

/**
 * Renders the selected identity and the in-page navigation shell. The destination
 * anchors remain placeholders until their separately governed content increment.
 */
export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a className={styles.brandLink} href="#home" aria-label="Nex Labs Technology — home">
          <span className={styles.markFrame}>
            <BrandMark />
          </span>
          <span className={styles.wordmark}>
            <span className={styles.name}>NEX LABS</span>
            <span className={styles.descriptor}>TECHNOLOGY</span>
          </span>
        </a>

        <nav className={styles.navigation} aria-label="Main navigation">
          {navigation.map((item) => (
            <a className={styles.link} href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className={styles.contactAction} href="#contact">
          Contact <span aria-hidden="true">→</span>
        </a>

        <p className={styles.headerNote} aria-label="Innovation, intelligence, real-world impact">
          <span>INNOVATION</span>
          <span>INTELLIGENCE</span>
          <span>REAL-WORLD IMPACT</span>
        </p>
      </div>
    </header>
  );
}
