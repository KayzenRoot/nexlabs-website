import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TechnologyPage, { metadata as technologyMetadata } from "./technology/page";
import SolutionsPage, { metadata as solutionsMetadata } from "./solutions/page";

describe("TechnologyPage", () => {
  it("renders the canonical platform, architecture and closing narrative", () => {
    const { container } = render(<TechnologyPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Systems designed to adapt." }),
    ).toBeInTheDocument();
    expect(container.querySelectorAll("h1")).toHaveLength(1);

    for (const [heading, description] of [
      [
        "AI Models & Analytics",
        "Reasoning, analysis and model capabilities selected to fit the problem rather than define it.",
      ],
      [
        "Data Infrastructure",
        "Data flows and storage boundaries designed for observability, quality and responsible use.",
      ],
      [
        "Secure & Scalable Systems",
        "System boundaries shaped around security, resilience and controlled growth.",
      ],
      [
        "Real-World Integration",
        "Interfaces and integration layers that connect software decisions to real operating environments.",
      ],
      [
        "Interoperable Architecture",
        "Components designed to communicate through clear contracts so systems can evolve without unnecessary coupling.",
      ],
    ]) {
      expect(screen.getByRole("heading", { level: 3, name: heading })).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    }

    for (const heading of [
      "A modular foundation.",
      "Architecture follows evidence.",
      "From research to operating systems.",
    ]) {
      expect(screen.getByRole("heading", { level: 2, name: heading })).toBeInTheDocument();
    }

    for (const [heading, description] of [
      [
        "Observable by default",
        "Important behavior should be measurable enough to understand and improve.",
      ],
      [
        "Secure boundaries",
        "Security and failure containment belong in the system design, not at the end.",
      ],
      [
        "Interoperable parts",
        "Clear contracts make it easier to replace, extend and connect components.",
      ],
      [
        "Human-operable systems",
        "People need to understand what a system is doing, especially when conditions change.",
      ],
    ]) {
      expect(screen.getByRole("heading", { level: 3, name: heading })).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    }

    expect(
      screen.getByText(
        "Nex Labs explores modular technology foundations that connect intelligence, data, interfaces and real-world integration without forcing every problem into the same architecture.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Useful intelligent systems need more than a model. They need clear data boundaries, observable behavior, secure interfaces and integration paths that can evolve as the problem becomes better understood.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "The system should become more specific as evidence improves, not more complicated by default.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "The technology layer exists to turn useful learning into systems that can be operated, inspected and adapted. The architecture stays modular so experiments can become dependable components without freezing the whole platform around one idea.",
      ),
    ).toBeInTheDocument();
    expect(container.querySelector("canvas")).toBeNull();
  });

  it("publishes the canonical unique route metadata", () => {
    expect(technologyMetadata).toEqual({
      title: "Technology | Nex Labs Technology",
      description:
        "Explore the modular technology foundations Nex Labs uses to connect intelligence, data, interfaces and real-world systems.",
    });
  });
});

describe("SolutionsPage", () => {
  it("renders the canonical capability areas, framing stages and integrity note", () => {
    const { container } = render(<SolutionsPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Intelligence applied with intent.",
      }),
    ).toBeInTheDocument();
    expect(container.querySelectorAll("h1")).toHaveLength(1);

    for (const [heading, description] of [
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
      [
        "Understand the constraints",
        "Start with the real operating environment, users, risks and limits.",
      ],
      [
        "Model the system",
        "Turn the problem into explicit data, workflow, interface and integration boundaries.",
      ],
      [
        "Prototype and measure",
        "Test important assumptions before increasing complexity.",
      ],
      [
        "Integrate and observe",
        "Connect the useful parts and retain enough visibility to learn from operation.",
      ],
    ]) {
      expect(screen.getByRole("heading", { level: 3, name: heading })).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    }

    for (const heading of [
      "Different problems need different shapes.",
      "From question to working system.",
      "Focus areas, not promises.",
    ]) {
      expect(screen.getByRole("heading", { level: 2, name: heading })).toBeInTheDocument();
    }

    expect(
      screen.getByText(
        "Nex Labs frames solutions around the problem, the operating environment and the people who need to use the system.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "These pages describe areas Nex Labs focuses on exploring and engineering. They do not imply guaranteed outcomes, a client record or a one-size-fits-all architecture.",
      ),
    ).toBeInTheDocument();
    expect(container.querySelector("canvas")).toBeNull();
  });

  it("publishes the canonical unique route metadata", () => {
    expect(solutionsMetadata).toEqual({
      title: "Solutions | Nex Labs Technology",
      description:
        "Explore the capability areas and engineering approach Nex Labs uses to frame intelligent systems around real constraints.",
    });
  });
});
