import type { Metadata } from "next";
import type { ComponentType } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TechnologyPage, { metadata as technologyMetadata } from "./technology/page";
import SolutionsPage, { metadata as solutionsMetadata } from "./solutions/page";

type SecondaryPageCase = {
  name: string;
  Page: ComponentType;
  metadata: Metadata;
  expectedMetadata: Metadata;
  h1: string;
  h2s: readonly string[];
  sectionCopy: string;
  paragraphs: string;
};

const pageCases: readonly SecondaryPageCase[] = [
  {
    name: "TechnologyPage",
    Page: TechnologyPage,
    metadata: technologyMetadata,
    expectedMetadata: {
      title: "Technology | Nex Labs Technology",
      description:
        "Explore the modular technology foundations Nex Labs uses to connect intelligence, data, interfaces and real-world systems.",
    },
    h1: "Systems designed to adapt.",
    h2s: [
      "A modular foundation.",
      "Architecture follows evidence.",
      "From research to operating systems.",
    ],
    sectionCopy: `AI Models & Analytics
Reasoning, analysis and model capabilities selected to fit the problem rather than define it.
Data Infrastructure
Data flows and storage boundaries designed for observability, quality and responsible use.
Secure & Scalable Systems
System boundaries shaped around security, resilience and controlled growth.
Real-World Integration
Interfaces and integration layers that connect software decisions to real operating environments.
Interoperable Architecture
Components designed to communicate through clear contracts so systems can evolve without unnecessary coupling.
Observable by default
Important behavior should be measurable enough to understand and improve.
Secure boundaries
Security and failure containment belong in the system design, not at the end.
Interoperable parts
Clear contracts make it easier to replace, extend and connect components.
Human-operable systems
People need to understand what a system is doing, especially when conditions change.`,
    paragraphs: `Nex Labs explores modular technology foundations that connect intelligence, data, interfaces and real-world integration without forcing every problem into the same architecture.
Useful intelligent systems need more than a model. They need clear data boundaries, observable behavior, secure interfaces and integration paths that can evolve as the problem becomes better understood.
The system should become more specific as evidence improves, not more complicated by default.
The technology layer exists to turn useful learning into systems that can be operated, inspected and adapted. The architecture stays modular so experiments can become dependable components without freezing the whole platform around one idea.`,
  },
  {
    name: "SolutionsPage",
    Page: SolutionsPage,
    metadata: solutionsMetadata,
    expectedMetadata: {
      title: "Solutions | Nex Labs Technology",
      description:
        "Explore the capability areas and engineering approach Nex Labs uses to frame intelligent systems around real constraints.",
    },
    h1: "Intelligence applied with intent.",
    h2s: [
      "Different problems need different shapes.",
      "From question to working system.",
      "Focus areas, not promises.",
    ],
    sectionCopy: `Artificial Intelligence
AI-native systems designed around useful reasoning, automation and human-centered workflows.
Intelligent Infrastructure
Software and data foundations designed to support reliable, observable and adaptable intelligent systems.
Advanced Interfaces
Interfaces that make complex systems easier to understand, operate and collaborate with.
Sustainable Technologies
Technology concepts shaped by efficiency, responsible resource use and long-term operational thinking.
Research Platforms
Experimental environments for turning technical questions into testable systems and measurable learning.
Understand the constraints
Start with the real operating environment, users, risks and limits.
Model the system
Turn the problem into explicit data, workflow, interface and integration boundaries.
Prototype and measure
Test important assumptions before increasing complexity.
Integrate and observe
Connect the useful parts and retain enough visibility to learn from operation.`,
    paragraphs: `Nex Labs frames solutions around the problem, the operating environment and the people who need to use the system.
These pages describe areas Nex Labs focuses on exploring and engineering. They do not imply guaranteed outcomes, a client record or a one-size-fits-all architecture.`,
  },
];

describe.each(pageCases)("$name", ({ Page, metadata, expectedMetadata, h1, h2s, sectionCopy, paragraphs }) => {
  it("renders the canonical page content with one semantic H1 and no canvas", () => {
    const { container } = render(<Page />);
    const sectionLines = sectionCopy.split("\n");

    expect(screen.getByRole("heading", { level: 1, name: h1 })).toBeInTheDocument();
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    for (const heading of h2s) {
      expect(screen.getByRole("heading", { level: 2, name: heading })).toBeInTheDocument();
    }
    for (let index = 0; index < sectionLines.length; index += 2) {
      const heading = sectionLines[index];
      const description = sectionLines[index + 1];
      expect(screen.getByRole("heading", { level: 3, name: heading })).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    }
    for (const paragraph of paragraphs.split("\n")) {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    }
    expect(container.querySelector("canvas")).toBeNull();
  });

  it("publishes the canonical unique route metadata", () => {
    expect(metadata).toEqual(expectedMetadata);
  });
});
