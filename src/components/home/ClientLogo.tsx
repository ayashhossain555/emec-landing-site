"use client";

import { useEffect, useRef, useState } from "react";

/** Target visual area (px²) every logo is scaled to, so wide wordmarks and square seals look equally weighted. */
const AREA = 64 * 64;

/**
 * Client logo sized by area rather than by a fixed box: a 5:1 wordmark and a
 * 1:1 seal end up with similar visual weight. Width is derived from the image's
 * natural aspect ratio once it loads; the parent slot caps height and width.
 */
export function ClientLogo({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [width, setWidth] = useState<number>();

  const measure = (img: HTMLImageElement) => {
    const { naturalWidth: w, naturalHeight: h } = img;
    if (w && h) setWidth(Math.round(Math.sqrt(AREA * (w / h))));
  };

  // The image may finish loading before hydration attaches onLoad.
  useEffect(() => {
    if (ref.current?.complete) measure(ref.current);
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export, arbitrary logo aspect ratios
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      style={width ? { width } : undefined}
      onLoad={(e) => measure(e.currentTarget)}
    />
  );
}
