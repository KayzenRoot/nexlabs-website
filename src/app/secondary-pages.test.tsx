import type { Metadata } from "next";
import { pageOpenGraph } from "../lib/site-seo";
import type { ComponentType } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CompanyPage, { metadata as companyMetadata } from "./company/page";
import ContactPage, { metadata as contactMetadata } from "./contact/page";
import ResearchPage, { metadata as researchMetadata } from "./research/page";
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
  links: readonly { name: string; href: string }[];
};

const pageCases: readonly SecondaryPageCase[] = [
  {
    name: "ContactPage",
    Page: ContactPage,
    metadata: contactMetadata,
    expectedMetadata: {
      openGraph: pageOpenGraph("/contact", "Contact | Nex Labs Technology", "Prepare the context for a future conversation with Nex Labs Technology and understand the information boundary of the current V1 contact experience."),
      alternates: { canonical: "/contact" },
      title: "Contact | Nex Labs Technology",
      description:
        "Prepare the context for a future conversation with Nex Labs Technology and understand the information boundary of the current V1 contact experience.",
    },
    h1: "Start with the right context.",
    h2s: [
      "Bring the signal, not the noise.",
      "Channels stay verified.",
      "Your information stays with you.",
    ],
    sectionCopy: `Problem & decision
What needs to change, and what decision depends on it?
Operating context
Users, workflows, systems, hardware or environments that shape the problem.
Constraints & risks
Security, privacy, reliability, timing, integration and resource boundaries.
Evidence & success signals
What is already known, what remains uncertain and what would count as useful progress.`,
    paragraphs: `Useful conversations begin with a clear problem, the constraints around it and the decision that needs to move. This V1 page helps structure that context without collecting or transmitting information.
A concise brief makes it easier to understand whether research, engineering or product work may be relevant. Keep confidential, regulated or credential material out of any future message unless a verified secure channel is explicitly provided.
The founder's public contact mailbox is listed below. This website has no contact form, upload field, submission endpoint or analytics tracker; messages are sent only when visitors choose to use their own email client.
Do not include passwords, API keys or confidential records in unsolicited email. You can use the same published address to independently verify the founder.
This page does not request or transmit personal information. Do not send sensitive information through unofficial channels that claim to represent Nex Labs.`,
    links: [
      { name: "Prepare the brief", href: "#brief" },
      { name: "Explore solutions", href: "/solutions" },
      { name: "Explore company principles", href: "/company" },
    ],
  },
  {
    name: "TechnologyPage",
    Page: TechnologyPage,
    metadata: technologyMetadata,
    expectedMetadata: {
      openGraph: pageOpenGraph("/technology", "Technology | Nex Labs Technology", "Explore the modular technology foundations Nex Labs uses to connect intelligence, data, interfaces and real-world systems."),
      alternates: { canonical: "/technology" },
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
    links: [
      { name: "Explore solutions", href: "/solutions" },
      { name: "Explore research", href: "/research" },
      { name: "See how we frame solutions", href: "/solutions" },
    ],
  },
  {
    name: "SolutionsPage",
    Page: SolutionsPage,
    metadata: solutionsMetadata,
    expectedMetadata: {
      openGraph: pageOpenGraph("/solutions", "Solutions | Nex Labs Technology", "Explore the capability areas and engineering approach Nex Labs uses to frame intelligent systems around real constraints."),
      alternates: { canonical: "/solutions" },
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
    links: [
      { name: "Explore technology", href: "/technology" },
      { name: "Explore research", href: "/research" },
      { name: "Explore the technology foundation", href: "/technology" },
    ],
  },
  {
    name: "ResearchPage",
    Page: ResearchPage,
    metadata: researchMetadata,
    expectedMetadata: {
      openGraph: pageOpenGraph("/research", "Research | Nex Labs Technology", "Explore how Nex Labs turns technical questions into experiments, evidence and systems that can inform future products and platforms."),
      alternates: { canonical: "/research" },
      title: "Research | Nex Labs Technology",
      description:
        "Explore how Nex Labs turns technical questions into experiments, evidence and systems that can inform future products and platforms.",
    },
    h1: "Questions become systems.",
    h2s: ["Learn before scaling.", "Where we explore.", "Evidence over spectacle."],
    sectionCopy: `Frame the question
Define the decision, unknowns, constraints and evidence that would change the direction.
Build a testable model
Create the smallest system or prototype that can challenge the important assumption.
Measure meaningful signals
Observe behavior, failure modes and tradeoffs instead of optimizing for a demo.
Decide what deserves to continue
Refine, integrate, archive or stop based on what the evidence supports.
Reasoning & Automation
How intelligent workflows can support useful decisions while keeping people able to inspect and intervene.
Human-System Interaction
How interfaces can make complex models, data and automation clearer to understand and operate.
Intelligent Infrastructure
How data, observability and system boundaries can support adaptable intelligent applications.
Applied Data Systems
How data quality, retrieval, context and analytics can improve system usefulness.
Real-World Integration
How software can connect with operating environments while respecting reliability and failure boundaries.`,
    paragraphs: `Research at Nex Labs is a disciplined path from uncertainty to evidence. We frame questions, build testable prototypes, measure what matters and carry forward only what earns its place.
The goal is not experimentation for its own sake. Research is useful when it reduces uncertainty, exposes constraints and produces knowledge that can shape a system responsibly.
The themes below describe technical directions, not published breakthroughs or guaranteed capabilities.
Research directions are not presented as patents, publications, deployed client systems or breakthroughs unless those facts are independently verifiable. What matters here is the method: test assumptions, retain evidence and let results shape the next system.`,
    links: [
      { name: "Explore technology", href: "/technology" },
      { name: "Explore solutions", href: "/solutions" },
      { name: "See the principles behind the work", href: "/company" },
    ],
  },
  {
    name: "CompanyPage",
    Page: CompanyPage,
    metadata: companyMetadata,
    expectedMetadata: {
      openGraph: pageOpenGraph("/company", "Company | Nex Labs Technology", "Learn the purpose, operating principles and engineering mindset that shape Nex Labs Technology."),
      alternates: { canonical: "/company" },
      title: "Company | Nex Labs Technology",
      description:
        "Learn the purpose, operating principles and engineering mindset that shape Nex Labs Technology.",
    },
    h1: "Technology with a reason to exist.",
    h2s: [
      "Build what earns its complexity.",
      "How direction becomes discipline.",
      "A loop, not a handoff.",
      "Proof should stay factual.",
    ],
    sectionCopy: `Human-centered
Technology should expand what people can understand, create and operate.
Research-led
Important decisions should be shaped by evidence, experiments and measurable feedback.
Secure by design
Security, privacy and failure containment belong in the architecture from the beginning.
Built for real-world systems
Ideas become valuable when they survive the constraints of actual users, hardware and operations.
Clarify before adding complexity
Define the problem, constraints and decision before selecting the machinery.
Make assumptions testable
Turn uncertainty into prototypes and measurable questions.
Keep architecture adaptable
Use clear boundaries so useful components can evolve without dragging the whole system.
Leave evidence behind
Tests, observability and documentation should make decisions reviewable after the work moves on.`,
    paragraphs: `Nex Labs Technology is shaped around a simple idea: advanced systems should expand what people can understand, create and operate while remaining clear enough to question, improve and trust.
We focus on the intersection of intelligence, software, data, interfaces and real-world constraints. The aim is not complexity for its own sake, but systems that make difficult work clearer, more usable and more adaptable.
Company milestones, partnerships, deployments, certifications and external recognition belong on this site only when they can be verified. Until then, Nex Labs is represented by its purpose, principles and the systems it is building.`,
    links: [
      { name: "Explore research", href: "/research" },
      { name: "Explore solutions", href: "/solutions" },
      { name: "Explore the research approach", href: "/research" },
    ],
  },
];

describe.each(pageCases)("$name", ({ Page, metadata, expectedMetadata, h1, h2s, sectionCopy, paragraphs, links }) => {
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
    for (const link of links) {
      expect(screen.getByRole("link", { name: link.name })).toHaveAttribute("href", link.href);
    }
    expect(container.querySelector("canvas")).toBeNull();
    expect(container.querySelector("[data-secondary-artwork-motion]")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("publishes the canonical unique route metadata", () => {
    expect(metadata).toEqual(expectedMetadata);
  });

});

describe("ContactPage privacy boundary", () => {
  it("stays read-only and free of collection or direct-contact controls", () => {
    const { container } = render(<ContactPage />);
    expect(container.querySelector("form, input, textarea, select, button, [type='file']")).toBeNull();
    expect(container.querySelectorAll("a[href^='mailto:']")).toHaveLength(1);
    expect(container.querySelector("a[href^='mailto:']")?.getAttribute("href")).toBe("mailto:founder@nexlabs.company");
    expect(container.querySelector("a[href^='tel:']")).toBeNull();
    expect(container.querySelectorAll("canvas")).toHaveLength(0);
  });
});
