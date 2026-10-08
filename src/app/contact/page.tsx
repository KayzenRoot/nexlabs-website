import type { Metadata } from "next";
import { pageOpenGraph } from "../../lib/site-seo";
import {
  ContactGatewayArtwork,
  SecondaryHero,
  SecondarySectionHeading,
} from "../../components/secondary-page";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  openGraph: pageOpenGraph("/contact", "Contact | Nex Labs Technology", "Prepare the context for a future conversation with Nex Labs Technology and understand the information boundary of the current V1 contact experience."),
  alternates: { canonical: "/contact" },
  title: "Contact | Nex Labs Technology",
  description:
    "Prepare the context for a future conversation with Nex Labs Technology and understand the information boundary of the current V1 contact experience.",
};

const projectBrief = [
  {
    title: "Problem & decision",
    description: "What needs to change, and what decision depends on it?",
  },
  {
    title: "Operating context",
    description:
      "Users, workflows, systems, hardware or environments that shape the problem.",
  },
  {
    title: "Constraints & risks",
    description:
      "Security, privacy, reliability, timing, integration and resource boundaries.",
  },
  {
    title: "Evidence & success signals",
    description:
      "What is already known, what remains uncertain and what would count as useful progress.",
  },
] as const;

/** Contact remains a static, read-only destination with no collection behavior. */
export default function ContactPage() {
  return (
    <div className={styles.page} data-secondary-page="contact">
      <div className={styles.container}>
        <SecondaryHero
          description="Useful conversations begin with a clear problem, the constraints around it and the decision that needs to move. This V1 page helps structure that context without collecting or transmitting information."
          eyebrow="CONTACT"
          idPrefix="contact"
          primaryAction={{ href: "#brief", label: "Prepare the brief" }}
          secondaryAction={{ href: "/solutions", label: "Explore solutions" }}
          title="Start with the right context."
          visual={<ContactGatewayArtwork />}
        />

        <section aria-labelledby="contact-brief-title" className={styles.brief} id="brief">
          <SecondarySectionHeading
            description="A concise brief makes it easier to understand whether research, engineering or product work may be relevant. Keep confidential, regulated or credential material out of any future message unless a verified secure channel is explicitly provided."
            eyebrow="PROJECT BRIEF"
            id="contact-brief-title"
            title="Bring the signal, not the noise."
          />
          <ol aria-label="Project brief elements" className={styles.briefGrid}>
            {projectBrief.map((item, index) => (
              <li className={styles.briefCard} key={item.title}>
                <span aria-hidden="true" className={styles.briefIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="contact-availability-title" className={styles.availability}>
          <div className={styles.availabilityCopy}>
            <p className={styles.availabilityEyebrow}>CONTACT AVAILABILITY</p>
            <h2 id="contact-availability-title">Channels stay verified.</h2>
            <p>
              The founder's public contact mailbox is listed below. This website has no contact
              form, upload field, submission endpoint or analytics tracker; messages are sent
              only when visitors choose to use their own email client.
            </p>
            <p>
              Do not include passwords, API keys or confidential records in unsolicited email.
              You can use the same published address to independently verify the founder.
            </p>
            <a className={styles.emailLink} href="mailto:founder@nexlabs.company">
              founder@nexlabs.company
            </a>
            <a className={styles.availabilityAction} href="/company">
              Explore company principles <span aria-hidden="true">→</span>
            </a>
          </div>
          <div aria-hidden="true" className={styles.availabilitySignal}>
            <span />
            <span />
            <span />
          </div>
        </section>

        <section aria-labelledby="contact-boundary-title" className={styles.boundary}>
          <SecondarySectionHeading
            eyebrow="DATA BOUNDARY"
            id="contact-boundary-title"
            title="Your information stays with you."
          />
          <p>
            This page does not request or transmit personal information. Do not send sensitive
            information through unofficial channels that claim to represent Nex Labs.
          </p>
        </section>
      </div>
    </div>
  );
}
