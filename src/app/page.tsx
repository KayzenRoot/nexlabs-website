import { HomeSections } from "../components/home-sections";
import { StaticHero } from "../components/static-hero";
import styles from "./page.module.css";

/** Renders the semantic M04 hero and the governed M05 Home content sections. */
export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <StaticHero />
      <HomeSections />
    </div>
  );
}
