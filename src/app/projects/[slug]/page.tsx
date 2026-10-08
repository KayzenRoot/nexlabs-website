import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicProject, publicProjects } from "../../../data/public-projects";
import styles from "../projects.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publicProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getPublicProject(slug);
  if (!project) return { title: "Project not found | Nex Labs Technology" };
  return {
    title: project.name + " | Nex Labs Projects",
    description: project.summary,
  };
}

/** Renders a single verified project record without making availability claims. */
export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getPublicProject(slug);
  if (!project) notFound();

  return (
    <article className={styles.shell}>
      <nav aria-label="Project navigation" className={styles.breadcrumb}>
        <a href="/projects">← All projects</a>
        <span aria-hidden="true"> / </span>
        <span>{project.name}</span>
      </nav>
      <header className={styles.detailIntro}>
        <p className={styles.kicker}>PROJECT RECORD / {project.slug.toUpperCase()}</p>
        <p className={styles.stage}>{project.stage}</p>
        <h1>{project.name}</h1>
        <p className={styles.lead}>{project.tagline}</p>
        <p className={styles.detailSummary}>{project.summary}</p>
        <a className={styles.externalAction} href={project.repository} rel="noopener noreferrer" target="_blank">
          Inspect public GitHub repository <span aria-hidden="true">↗</span>
        </a>
      </header>
      <div className={styles.detailGrid}>
        <section aria-labelledby="focus-heading" className={styles.detailPanel}>
          <p className={styles.kicker}>TECHNICAL FOCUS</p>
          <h2 id="focus-heading">What this project explores</h2>
          <ul className={styles.points}>
            {project.focus.map(item => <li key={item}>{item}</li>)}
          </ul>
        </section>
        <section aria-labelledby="evidence-heading" className={styles.detailPanel}>
          <p className={styles.kicker}>VERIFIABLE STATUS</p>
          <h2 id="evidence-heading">Public evidence</h2>
          <ul className={styles.points}>
            {project.evidence.map(item => <li key={item}>{item}</li>)}
          </ul>
        </section>
      </div>
      <aside className={styles.disclosure}>
        <h2>Project disclosure</h2>
        <p>
          This page describes technical work by the NexLabs founder. The stated stage
          does not imply legal incorporation, commercial traction, customer contracts,
          external investment or live product availability. Please consult the repository
          for the current source and release status.
        </p>
      </aside>
      <a className={styles.returnLink} href="/projects">← Return to all projects</a>
    </article>
  );
}
