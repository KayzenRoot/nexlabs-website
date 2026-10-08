import type { Metadata } from "next";
import { CANONICAL_SITE_URL, PUBLIC_INDEXING_ENABLED } from "../lib/site-seo";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nex Labs Technology — Human Potential Multiplied",
  description: "NexLabs Technology is a Brazil-based, founder-led AI software initiative building local-first engineering infrastructure and open-source technology including HIVE.",
  metadataBase: new URL(CANONICAL_SITE_URL),
  robots: { index: PUBLIC_INDEXING_ENABLED, follow: PUBLIC_INDEXING_ENABLED },
  openGraph: {
    type: "website",
    siteName: "NexLabs Technology",
    locale: "en_US",
    title: "NexLabs Technology | AI Engineering & Open-Source Research",
    description: "Evidence-backed, founder-led engineering: HIVE and selected AI software research projects.",
    images: [{ url: "/hero/home-hero-poster.jpg", alt: "NexLabs Technology cinematic laboratory visual" }],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [
      {
        url: "/brand/nex-n-precision-blades-mono-dark.svg",
        type: "image/svg+xml",
      },
    ],
  },
};

/**
 * Defines the shared document shell, accessibility skip link, header, main content,
 * and footer for every route in the Nex Labs Technology website.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skipLink" href="#main">
          Skip to content
        </a>
        <script
          id="nexlabs-public-identity"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": CANONICAL_SITE_URL + "/#website",
                  name: "NexLabs Technology",
                  url: CANONICAL_SITE_URL,
                  inLanguage: "en",
                  description: "Founder-led AI software initiative based in Brazil",
                },
                {
                  "@type": "Person",
                  "@id": CANONICAL_SITE_URL + "/company/verification#founder",
                  name: "Clayton Nunes",
                  url: CANONICAL_SITE_URL + "/company/verification",
                  sameAs: ["https://github.com/KayzenRoot"],
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
