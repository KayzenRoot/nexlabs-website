"use client";

import { useEffect } from "react";

/** Adds viewport-linked depth to marked artwork without moving semantic content off screen. */
export function ScrollReveal() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-world-reveal]"));
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reducedMotion || targets.length === 0) return;
    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((target) => target.classList.add("world-visible"));
      return;
    }

    const root = document.documentElement;
    root.classList.add("visual-reveal-ready");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("world-visible");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08, rootMargin: "0px 0px 36px 0px" });
    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      root.classList.remove("visual-reveal-ready");
    };
  }, []);

  return null;
}
