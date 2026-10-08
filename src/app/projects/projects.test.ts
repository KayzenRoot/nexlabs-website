import { describe, expect, it } from "vitest";
import { getPublicProject, publicProjects } from "../../data/public-projects";

describe("pre-launch project records", () => {
  it("lists five distinct evidence-backed GitHub projects", () => {
    expect(publicProjects).toHaveLength(5);
    expect(new Set(publicProjects.map((project) => project.slug)).size).toBe(5);
    for (const project of publicProjects) {
      expect(project.repository).toMatch(/^https:\/\/github\.com\/KayzenRoot\/[a-z0-9-]+$/);
      expect(project.stage.length).toBeGreaterThan(10);
      expect(project.evidence.length).toBeGreaterThan(0);
      expect(getPublicProject(project.slug)).toEqual(project);
    }
  });

  it("does not expose an unknown project record", () => {
    expect(getPublicProject("unknown-project")).toBeUndefined();
  });
});
