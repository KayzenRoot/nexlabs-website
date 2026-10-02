import { precisionBladesGeometry } from "../brand/precision-blades";
import styles from "./brand-mark.module.css";

type BrandMarkProps = {
  className?: string;
  decorative?: boolean;
};

/** A CSS-animated, server-rendered instance of the canonical flat N mark. */
export function BrandMark({ className, decorative = true }: BrandMarkProps) {
  return (
    <svg
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : "Nex Labs N mark"}
      className={[styles.mark, className].filter(Boolean).join(" ")}
      focusable="false"
      role={decorative ? undefined : "img"}
      viewBox="0 0 264 264"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(4 4)">
        <g className={styles.assembly}>
          <path className={styles.leftBlade} d={precisionBladesGeometry.leftBlade} />
          <path className={styles.diagonalBridge} d={precisionBladesGeometry.diagonalBridge} />
          <path className={styles.rightBlade} d={precisionBladesGeometry.rightBlade} />
        </g>
      </g>
      <g transform="translate(4 4)">
        <path
          aria-hidden="true"
          className={styles.lightSweep}
          d="M48 202 179 37"
          pathLength="1"
        />
      </g>
    </svg>
  );
}
