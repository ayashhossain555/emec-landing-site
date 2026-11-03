import type { CSSProperties } from "react";

/**
 * Typed helper for passing CSS custom properties (e.g. `--min` for `.grid-fit`,
 * `--eyebrow`, `--dot`) through React's `style` prop.
 */
export function vars(custom: Record<`--${string}`, string | number>, rest?: CSSProperties): CSSProperties {
  return { ...(custom as CSSProperties), ...rest };
}
