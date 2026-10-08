"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./site-navigation.module.css";

const navigation = [
  { href: "/solutions", label: "Solutions" },
  { href: "/technology", label: "Technology" },
  { href: "/research", label: "Research" },
  { href: "/company", label: "Company" },
] as const;

function RouteLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return <>
    {navigation.map((item) => (
      <a
        aria-current={pathname === item.href ? "page" : undefined}
        className={styles.link}
        href={item.href}
        key={item.href}
        onClick={onNavigate}
      >
        {item.label}
      </a>
    ))}
  </>;
}

/** Route-aware desktop rail and keyboard-operated compact mobile menu. */
export function SiteNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const desktopNavigationRef = useRef<HTMLElement>(null);
  const mobileNavigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;

    const mobileViewport = window.matchMedia("(max-width: 48rem)");
    const closeMenuOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) return;

      const focusedElement = document.activeElement;
      const focusWillBeHidden =
        triggerRef.current?.getAttribute("aria-expanded") === "true" ||
        focusedElement === triggerRef.current ||
        (focusedElement instanceof Node && mobileNavigationRef.current?.contains(focusedElement));
      if (focusWillBeHidden) {
        const desktopLinks = desktopNavigationRef.current;
        const focusTarget =
          desktopLinks?.querySelector<HTMLAnchorElement>('a[aria-current="page"]') ??
          desktopLinks?.querySelector<HTMLAnchorElement>("a");
        focusTarget?.focus();
      }

      setOpen(false);
    };

    mobileViewport.addEventListener("change", closeMenuOnDesktop);
    return () => mobileViewport.removeEventListener("change", closeMenuOnDesktop);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return <div className={styles.navigationShell}>
    <nav className={styles.desktopNavigation} aria-label="Main navigation" ref={desktopNavigationRef}>
      <RouteLinks />
    </nav>
    <button
      aria-controls="mobile-primary-navigation"
      aria-expanded={open}
      aria-label={open ? "Close navigation menu" : "Open navigation menu"}
      className={`${styles.menuTrigger} ${open ? styles.menuTriggerOpen : ""}`}
      data-site-menu-trigger=""
      onClick={() => setOpen((value) => !value)}
      ref={triggerRef}
      type="button"
    >
      <span aria-hidden="true" className={styles.menuGlyph}><span /><span /></span>
    </button>
    <nav
      aria-hidden={!open}
      aria-label="Mobile navigation"
      className={`${styles.mobileNavigation} ${open ? styles.mobileNavigationOpen : ""}`}
      id="mobile-primary-navigation"
      inert={!open}
      ref={mobileNavigationRef}
    >
      <p className={styles.menuEyebrow}>NEX LABS / NAVIGATION</p>
      <RouteLinks onNavigate={() => setOpen(false)} />
      <a
        aria-current={pathname === "/contact" ? "page" : undefined}
        className={styles.mobileContact}
        href="/contact"
        onClick={() => setOpen(false)}
      >
        Contact Nex Labs <span aria-hidden="true">→</span>
      </a>
    </nav>
  </div>;
}
