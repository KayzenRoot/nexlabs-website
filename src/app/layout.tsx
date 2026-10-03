import type { Metadata } from "next";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nex Labs Technology — Human Potential Multiplied",
  description: "A new digital home for technology, research and engineering.",
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
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
