import type { Metadata } from "next";
import { HomeSections } from "../components/home-sections";
import { StaticHero } from "../components/static-hero";
import styles from "./page.module.css";

export const metadata: Metadata = { alternates: { canonical: "/" } };

/** Renders the semantic M04 hero and the governed M05 Home content sections. */
export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <StaticHero />
      <HomeSections />
    </div>
  );
}
