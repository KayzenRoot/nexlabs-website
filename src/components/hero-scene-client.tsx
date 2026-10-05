"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./static-hero.module.css";
import { HeroSceneErrorBoundary } from "./hero-scene-error-boundary";
import {
  readHeroCapabilities,
  resolveHeroQualityTier,
  type HeroQualityTier,
} from "../experience/quality-tier";

const HeroScene = dynamic(
  () => import(/* webpackChunkName: "nexlabs-home-3d" */ "./hero-scene"),
  { ssr: false },
);

/**
 * Owns capability detection, lazy scene admission, readiness and durable poster
 * fallback for the Home hero without blocking semantic content.
 */
export function HeroSceneClient() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [tier, setTier] = useState<HeroQualityTier>("STATIC");
  const [shouldLoad, setShouldLoad] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const failScene = useCallback((reason: unknown) => {
    hostRef.current?.parentElement?.removeAttribute("data-scene-live");
    setFailed(true);
    setSceneReady(false);
    if (process.env.NODE_ENV !== "production") {
      console.info("[nexlabs:hero] Static poster retained after scene failure.", reason);
    }
  }, []);

  useEffect(() => {
    const refreshTier = () => {
      const nextTier = resolveHeroQualityTier(readHeroCapabilities());
      setTier(nextTier);
      if (nextTier === "STATIC") {
        hostRef.current?.parentElement?.removeAttribute("data-scene-live");
        setShouldLoad(false);
        setSceneReady(false);
      }
    };

    refreshTier();
    window.addEventListener("resize", refreshTier, { passive: true });
    const motionPreference = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    );
    motionPreference?.addEventListener("change", refreshTier);

    return () => {
      window.removeEventListener("resize", refreshTier);
      motionPreference?.removeEventListener("change", refreshTier);
    };
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || tier === "STATIC" || failed) return;

    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;
    const scheduleScene = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleHandle = window.requestIdleCallback(
          () => setShouldLoad(true),
          { timeout: 1200 },
        );
      } else {
        timeoutHandle = window.setTimeout(() => setShouldLoad(true), 180);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          scheduleScene();
          observer.disconnect();
        }
      },
      { rootMargin: "120px 0px" },
    );
    observer.observe(host);

    return () => {
      observer.disconnect();
      if (idleHandle !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
    };
  }, [failed, tier]);

  const markSceneReady = useCallback(() => {
    hostRef.current?.parentElement?.setAttribute("data-scene-live", "true");
    setSceneReady(true);
  }, []);

  return (
    <div
      ref={hostRef}
      className={`${styles.sceneLayer} ${sceneReady && !failed ? styles.sceneReady : ""}`}
      data-testid="hero-scene-stage"
      data-quality-tier={tier}
      data-scene-state={
        failed ? "fallback" : sceneReady ? "ready" : shouldLoad ? "loading" : "poster"
      }
      data-identity-source="NEX-N-A-PRECISION-BLADES"
      aria-hidden="true"
    >
      {tier !== "STATIC" && shouldLoad && !failed ? (
        <HeroSceneErrorBoundary onFailure={failScene}>
          <HeroScene
            tier={tier}
            onReady={markSceneReady}
            onFailure={failScene}
          />
        </HeroSceneErrorBoundary>
      ) : null}
    </div>
  );
}
