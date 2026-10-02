import {
  precisionBladesGeometry,
  precisionBladesTransform,
} from "../brand/precision-blades";
import styles from "./brand-mark.module.css";
import { useId } from "react";

type BrandMarkProps = {
  className?: string;
  decorative?: boolean;
};

/**
 * Renders the traced owner-approved flat silhouette with its exact chrome
 * source artwork clipped inside the vector master.
 */
export function BrandMark({ className, decorative = true }: BrandMarkProps) {
  const clipId = `${useId().replaceAll(":", "")}-silhouette`;

  return (
    <svg
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : "Nex Labs N mark"}
      className={[styles.mark, className].filter(Boolean).join(" ")}
      focusable="false"
      role={decorative ? undefined : "img"}
      viewBox="0 0 335 335"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={clipId}>
          <path
            d={precisionBladesGeometry.silhouette}
            transform={precisionBladesTransform}
          />
        </clipPath>
      </defs>
      <g
        aria-hidden="true"
        className={styles.assembly}
        data-master-geometry=""
      >
        <path
          data-master-path=""
          d={precisionBladesGeometry.silhouette}
          fill="#8d9db0"
          transform={precisionBladesTransform}
        />
      </g>
      <image
        aria-hidden="true"
        className={styles.material}
        clipPath={`url(#${clipId})`}
        href="/brand/nex-n-precision-blades-chrome-material.png"
        height="286"
        preserveAspectRatio="none"
        width="289"
        x="27"
        y="14"
      />
      <path
        aria-hidden="true"
        className={styles.lightSweep}
        clipPath={`url(#${clipId})`}
        d="M31 20 312 297"
        pathLength="1"
      />
    </svg>
  );
}
