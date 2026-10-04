import Link from "next/link";
import { BrandMark } from "../components/brand-mark";
import styles from "./not-found.module.css";

/** Provides a branded, recoverable 404 without exposing routing internals. */
export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className={styles.page}>
      <div aria-hidden="true" className={styles.signalField} />
      <div className={styles.panel}>
        <BrandMark className={styles.mark} decorative={false} />
        <p className={styles.eyebrow}>NEX LABS TECHNOLOGY · SIGNAL ROUTING</p>
        <h1 className={styles.title} id="not-found-title">
          This page is outside our signal.
        </h1>
        <p className={styles.description}>
          The page you requested is not available in this version of the Nex Labs site.
        </p>
        <Link className={styles.action} href="/">
          Return to Home <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
