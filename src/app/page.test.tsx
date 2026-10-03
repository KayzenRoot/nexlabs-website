import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the approved hero hierarchy with one heading and two in-page actions", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /human potential multiplied/i,
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

  it("server-renders the static poster and keeps the canvas decorative and client-only", () => {
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
    expect(container.querySelector('[data-testid="hero-static-poster"]')).toBeInTheDocument();
    expect(container.querySelector('[data-identity-source="NEX-N-A-PRECISION-BLADES"]')).toBeInTheDocument();
    expect(container.querySelector("#capabilities")).toBeInTheDocument();
    expect(container.querySelector("#research")).toBeInTheDocument();
    expect(container.querySelector("#infrastructure")).toBeInTheDocument();
  });
});
