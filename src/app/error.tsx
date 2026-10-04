"use client";

import Link from "next/link";
import styles from "./error.module.css";

type ErrorBoundaryProps = {
  readonly error: Error & { readonly digest?: string };
  readonly reset: () => void;
};

/** Recovers from a route failure using safe copy and no technical error details. */
export default function ErrorBoundary({ reset }: ErrorBoundaryProps) {
  return (
    <section aria-labelledby="error-title" className={styles.page} role="alert">
      <div aria-hidden="true" className={styles.signalField} />
      <div className={styles.panel}>
        <p className={styles.eyebrow}>NEX LABS TECHNOLOGY · RECOVERY</p>
        <h1 className={styles.title} id="error-title">
          We hit an unexpected interruption.
        </h1>
        <p className={styles.description}>
          The page could not be loaded right now. You can try again or return to the Home.
        </p>
        <div className={styles.actions}>
          <button className={styles.retry} onClick={reset} type="button">
            Try again
          </button>
          <Link className={styles.homeAction} href="/">
            Return to Home <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
