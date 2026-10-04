import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ErrorBoundary from "./error";
import { metadata as rootMetadata } from "./layout";
import NotFound from "./not-found";
import robots from "./robots";

describe("M07A release-readiness boundaries", () => {
  it("keeps every route pre-launch noindex without inventing a production origin", () => {
    expect(rootMetadata.robots).toEqual({ index: false, follow: false });
    expect(rootMetadata.metadataBase).toBeUndefined();
    expect(rootMetadata.alternates?.canonical).toBeUndefined();
  });

  it("publishes a robots policy that disallows crawling without a sitemap", () => {
    expect(robots()).toEqual({
      rules: { userAgent: "*", disallow: "/" },
    });
  });

  it("renders a branded 404 with a clear route back to the Home", () => {
    render(<NotFound />);

    expect(
      screen.getByRole("heading", { level: 1, name: "This page is outside our signal." }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Return to Home" })).toHaveAttribute("href", "/");
  });

  it("recovers through the error boundary without showing technical error details", () => {
    const reset = vi.fn();
    render(
      <ErrorBoundary
        error={new Error("private stack trace and internal error details")}
        reset={reset}
      />,
    );

    expect(screen.getByRole("heading", { level: 1, name: "We hit an unexpected interruption." })).toBeInTheDocument();
    expect(screen.getByText("The page could not be loaded right now. You can try again or return to the Home." )).toBeInTheDocument();
    expect(screen.queryByText(/private stack trace|internal error details/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(reset).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("link", { name: "Return to Home" })).toHaveAttribute("href", "/");
  });
});
