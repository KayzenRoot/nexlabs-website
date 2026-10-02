import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders draft-safe copy with one primary heading and two in-page actions", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /technology for what comes next/i,
      }),
    ).toBeInTheDocument();

    const actions = screen.getByRole("group", { name: /next steps/i });
    expect(
      within(actions).getByRole("link", { name: /explore the project/i }),
    ).toHaveAttribute("href", "#project");
    expect(
      within(actions).getByRole("link", { name: /contact nex labs/i }),
    ).toHaveAttribute("href", "#contact");
  });

  it("keeps every in-page destination present and the hero free of canvas", () => {
    const { container } = render(<HomePage />);
    const targetIds = new Set(
      Array.from(container.querySelectorAll<HTMLElement>("[id]"), (element) =>
        element.id,
      ),
    );

    for (const link of container.querySelectorAll<HTMLAnchorElement>(
      'a[href^="#"]',
    )) {
      expect(targetIds.has(link.hash.slice(1))).toBe(true);
    }

    expect(container.querySelector("canvas")).not.toBeInTheDocument();
    expect(container.querySelector("#capabilities")).toBeInTheDocument();
    expect(container.querySelector("#research")).toBeInTheDocument();
    expect(container.querySelector("#infrastructure")).toBeInTheDocument();
  });
});
