import records from "./public-projects.json";

/** Technical project records with sources maintained separately from view logic. */
export type PublicProject = {
  readonly slug: string;
  readonly name: string;
  readonly tagline: string;
  readonly stage: string;
  readonly summary: string;
  readonly focus: readonly string[];
  readonly evidence: readonly string[];
  readonly repository: string;
};

export const publicProjects: readonly PublicProject[] = records;

export function getPublicProject(slug: string): PublicProject | undefined {
  return publicProjects.find((project) => project.slug === slug);
}
