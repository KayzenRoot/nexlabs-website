import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import HomePage from "./page";

function renderHomeExperience() {
  return render(
    <>
      <SiteHeader />
      <HomePage />
      <SiteFooter />
    </>,
  );
}

describe("HomePage", () => {
  it("renders the approved hero and all six semantic M05 sections", () => {
    renderHomeExperience();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /human potential multiplied/i,
      }),
    ).toBeInTheDocument();

    for (const heading of [
      "Intelligence in action.",
      "Principles in practice.",
      "Technology with a reason to exist.",
      "Ideas that become reality.",
      "Built to transform.",
      "Building the next chapter of intelligent systems.",
    ]) {
      expect(
        screen.getByRole("heading", { level: 2, name: heading }),
      ).toBeInTheDocument();
    }
  });

  it("preserves canonical capability, principle, research, and technology copy", () => {
    renderHomeExperience();

    const capabilityCopy = [
      [
        "Artificial Intelligence",
        "AI-native systems designed around useful reasoning, automation and human-centered workflows.",
      ],
      [
        "Intelligent Infrastructure",
        "Software and data foundations designed to support reliable, observable and adaptable intelligent systems.",
      ],
      [
        "Advanced Interfaces",
        "Interfaces that make complex systems easier to understand, operate and collaborate with.",
      ],
      [
        "Sustainable Technologies",
        "Technology concepts shaped by efficiency, responsible resource use and long-term operational thinking.",
      ],
      [
        "Research Platforms",
        "Experimental environments for turning technical questions into testable systems and measurable learning.",
      ],
    ];

    for (const [name, description] of capabilityCopy) {
      expect(screen.getByRole("heading", { level: 3, name })).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    }

    const principles = [
      [
        "Human-centered",
        "Technology should expand what people can understand, create and operate.",
      ],
      [
        "Research-led",
        "Important decisions should be shaped by evidence, experiments and measurable feedback.",
      ],
      [
        "Secure by design",
        "Security, privacy and failure containment belong in the architecture from the beginning.",
      ],
      [
        "Built for real-world systems",
        "Ideas become valuable when they survive the constraints of actual users, hardware and operations.",
      ],
    ];

    for (const [principle, description] of principles) {
      expect(screen.getByRole("heading", { level: 3, name: principle })).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    }

    expect(
      screen.getByText(
        "Nex Labs explores intelligent systems that connect software, data and real-world environments through focused research and engineering.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Nex Labs Technology explores intelligent systems that connect software, data and real-world operations. Our direction combines research, engineering quality, human-centered design and responsible deployment.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Research at Nex Labs is a bridge between possibility and implementation. We explore emerging methods, prototype aggressively and use evidence to decide what deserves to become a product or platform.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Explore the systems, research and principles shaping Nex Labs, then use Contact to frame the context for a future conversation.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("AI Models & Analytics")).toBeInTheDocument();
    expect(screen.getByText("Data Infrastructure")).toBeInTheDocument();
    expect(screen.getByText("Secure & Scalable Systems")).toBeInTheDocument();
    expect(screen.getByText("Real-World Integration")).toBeInTheDocument();
    expect(screen.getByText("Interoperable Architecture")).toBeInTheDocument();

    expect(screen.queryByText("5+")).not.toBeInTheDocument();
    expect(screen.queryByText("50+")).not.toBeInTheDocument();
    expect(screen.queryByText("12+")).not.toBeInTheDocument();
    expect(screen.queryByText(/global partners/i)).not.toBeInTheDocument();
  });

  it("keeps every visible Home navigation and CTA target on a visible section", () => {
    const { container } = renderHomeExperience();
    const targetIds = Array.from(
      container.querySelectorAll<HTMLElement>("[id]"),
      (element) => element.id,
    );

    expect(new Set(targetIds).size).toBe(targetIds.length);

    for (const link of container.querySelectorAll<HTMLAnchorElement>(
      'a[href^="#"]',
    )) {
      const targetId = decodeURIComponent(link.hash.slice(1));
      const target =
        Array.from(container.querySelectorAll<HTMLElement>("[id]")).find(
          (element) => element.id === targetId,
        ) ?? null;

      expect(target, `${link.textContent?.trim()} must resolve to #${targetId}`).not.toBeNull();
      expect(target?.closest('[aria-hidden="true"]')).toBeNull();
      expect(target?.textContent?.trim()).not.toBe("");
    }

    expect(container.querySelector("#project")).not.toBeInTheDocument();
    expect(container.querySelector("#products")).not.toBeInTheDocument();
    expect(container.querySelector(".plannedAnchors")).not.toBeInTheDocument();

    const navigation = screen.getByRole("navigation", { name: "Main navigation" });
    expect(within(navigation).getAllByRole("link")).toHaveLength(4);
    expect(within(navigation).getByRole("link", { name: "Solutions" })).toHaveAttribute(
      "href",
      "/solutions",
    );
    expect(within(navigation).getByRole("link", { name: "Technology" })).toHaveAttribute(
      "href",
      "/technology",
    );
    expect(within(navigation).getByRole("link", { name: "Research" })).toHaveAttribute(
      "href",
      "/research",
    );
    expect(within(navigation).getByRole("link", { name: "Company" })).toHaveAttribute(
      "href",
      "/company",
    );

    const globalHeader = container.querySelector(":scope > header");
    expect(globalHeader).not.toBeNull();
    expect(
      within(globalHeader as HTMLElement).getByRole("link", {
        name: "Contact Nex Labs",
      }),
    ).toHaveAttribute("href", "/contact");
    expect(
      within(screen.getByRole("contentinfo")).getByRole("link", {
        name: "Contact Nex Labs",
      }),
    ).toHaveAttribute("href", "/contact");
    const contactLinks = screen.getAllByRole("link", { name: "Contact Nex Labs" });
    expect(contactLinks).toHaveLength(3);
    expect(contactLinks.every((link) => link.getAttribute("href") === "/contact")).toBe(true);
    expect(container.querySelector("#contact")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Explore capabilities" })).toHaveAttribute(
      "href",
      "#capabilities",
    );

    const footerNavigation = screen.getByRole("navigation", {
      name: "Footer navigation",
    });
    expect(within(footerNavigation).getAllByRole("link")).toHaveLength(5);
    expect(within(footerNavigation).getByRole("link", { name: "Contact Nex Labs" })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(within(footerNavigation).getByRole("link", { name: "Solutions" })).toHaveAttribute(
      "href",
      "/solutions",
    );
    expect(within(footerNavigation).getByRole("link", { name: "Technology" })).toHaveAttribute(
      "href",
      "/technology",
    );
    expect(within(footerNavigation).getByRole("link", { name: "Research" })).toHaveAttribute(
      "href",
      "/research",
    );
    expect(within(footerNavigation).getByRole("link", { name: "Company" })).toHaveAttribute(
      "href",
      "/company",
    );
    expect(screen.getByRole("link", { name: "Explore research" })).toHaveAttribute(
      "href",
      "/research",
    );
    expect(contactLinks[1]).toHaveAttribute("href", "/contact");
  });

  it("server-renders the static hero poster without mounting a WebGL canvas", () => {
    const { container } = renderHomeExperience();

    expect(container.querySelector("canvas")).not.toBeInTheDocument();
    expect(container.querySelector('[data-testid="hero-static-poster"]')).toBeInTheDocument();
    expect(
      container.querySelector('[data-identity-source="NEX-N-A-PRECISION-BLADES"]'),
    ).toBeInTheDocument();
  });
});
