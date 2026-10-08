import type { Metadata } from "next";
import { pageOpenGraph } from "../../lib/site-seo";
import { publicProjects } from "../../data/public-projects";
import styles from "./projects.module.css";

export const metadata: Metadata = {
  openGraph: pageOpenGraph("/projects", "Projects & Evidence | Nex Labs Technology", "Selected founder-built software and research projects with verified repositories, transparent development stages and public technical evidence."),
  alternates: { canonical: "/projects" },
  title: "Projects & Evidence | Nex Labs Technology",
  description: "Selected founder-built software and research projects with verified repositories, transparent development stages and public technical evidence.",
};

/** Displays evidence-backed founder projects without implying commercial availability. */
export default function ProjectsPage() {
  return (
    <div className={styles.shell}>
      <header className={styles.intro}>
        <p className={styles.kicker}>NEX LABS / PUBLIC PROJECT RECORD</p>
        <h1>Built in the open.<br /><span>Measured by evidence.</span></h1>
        <p className={styles.lead}>
          Selected engineering and research projects developed by the founder.
          Each entry links to its public repository and distinguishes released
          software from prototypes and work still in planning.
        </p>
        <a className={styles.externalAction} href="/company/verification">
          Founder and project verification <span aria-hidden="true">↗</span>
        </a>
      </header>
      <section aria-labelledby="portfolio-heading" className={styles.catalogue}>
        <div className={styles.sectionHeading}>
          <p className={styles.kicker}>SELECTED WORK</p>
          <h2 id="portfolio-heading">Projects and engineering evidence</h2>
        </div>
        <div className={styles.grid}>
          {publicProjects.map((project, index) => (
            <article className={styles.card} key={project.slug}>
              <p className={styles.cardIndex}>PROJECT / {String(index + 1).padStart(2, "0")}</p>
              <p className={styles.stage}>{project.stage}</p>
              <h3>{project.name}</h3>
              <p className={styles.tagline}>{project.tagline}</p>
              <p className={styles.description}>{project.summary}</p>
              <a className={styles.cardAction} href={"/projects/" + project.slug}>
                View project record <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>
      <aside className={styles.disclosure}>
        <h2>Evidence before claims</h2>
        <p>
          These entries describe founder-led projects and their documented engineering
          state. They are not a customer list, a statement of legal incorporation,
          or a claim of product revenue, live availability or outside funding.
          Technical status should be independently checked against each linked repository.
        </p>
      </aside>
    </div>
  );
}
