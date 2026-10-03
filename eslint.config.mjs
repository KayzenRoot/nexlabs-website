import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

/**
 * Next-specific lint rules are temporarily excluded because the current
 * @next/eslint-plugin-next release pulls an unpatched HIGH-severity braces
 * advisory through fast-glob -> micromatch. TypeScript ESLint, typecheck,
 * Next production build, unit tests and browser/a11y checks remain enforced.
 * Restore the Next plugin only after its dependency chain has a patched release.
 */
export default defineConfig([
  ...tseslint.configs.recommended,
  globalIgnores([
    ".next/**",
    "coverage/**",
    "node_modules/**",
    "playwright-report/**",
    "test-results/**",
  ]),
]);
