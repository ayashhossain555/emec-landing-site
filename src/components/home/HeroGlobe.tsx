"use client";

import { geoDistance, geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, MultiPolygon } from "geojson";
import { useEffect, useRef } from "react";
import { feature, merge } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import worldAtlas from "world-atlas/countries-110m.json";

/** `labelLeft` draws the label on the pin's left so neighbours near the HQ don't overlap its label. */
type Site = { name: string; sub?: string; id: string; at: [number, number]; hq?: boolean; labelLeft?: boolean };

// ISO 3166-1 numeric ids, matching world-atlas feature ids.
const SITES: Site[] = [
  { name: "Bangladesh", sub: "HQ · Dhaka", id: "050", at: [90.41, 23.81], hq: true },
  { name: "Bhutan", id: "064", at: [89.6, 27.4], labelLeft: true },
  { name: "India", id: "356", at: [80.5, 23.5], labelLeft: true },
  { name: "Japan", id: "392", at: [138.5, 36.2] },
  { name: "Ireland", id: "372", at: [-8.0, 53.3] },
  { name: "USA", id: "840", at: [-98.5, 39.5] },
];
const ACTIVE = new Set(SITES.map((s) => s.id));
const HQ = SITES[0].at;

const topo = worldAtlas as unknown as Topology<{ countries: GeometryCollection<object> }>;
const countries = (feature(topo, topo.objects.countries) as FeatureCollection).features as Feature[];
const land = merge(topo, topo.objects.countries.geometries as Parameters<typeof merge>[1]) as MultiPolygon;
const graticule = geoGraticule10();

/**
 * Rotating orthographic globe showing where EMEC works, with animated arcs
 * from the Dhaka HQ. Drag to rotate. `reserveBottom` keeps the globe clear
 * of the overlay strip rendered on top of it by the hero.
 */
export function HeroGlobe({ reserveBottom = 130 }: { reserveBottom?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;

    const rootStyle = getComputedStyle(document.documentElement);
    const displayFont = rootStyle.getPropertyValue("--font-barlow").trim() || "'Barlow Condensed', sans-serif";
    const monoFont = rootStyle.getPropertyValue("--font-jetbrains").trim() || "'JetBrains Mono', monospace";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const proj = geoOrthographic().clipAngle(90).precision(0.4);
    const path = geoPath(proj, ctx);
    let W = 0, H = 0, R = 0;
    let rot: [number, number, number] = [-75, -18, 0];
    let dragging = false;
    let last = performance.now();
    const t0 = last;
    let raf = 0;

    const size = () => {
      const rect = cv.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = rect.width; H = rect.height;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const strip = Math.min(reserveBottom, H * 0.24);
      R = Math.min(W * 0.44, (H - strip) * 0.44);
      proj.translate([W / 2, (H - strip) / 2]).scale(R);
    };
    const ro = new ResizeObserver(size);
    ro.observe(cv);
    size();

    const visible = (p: [number, number]) => geoDistance(p, [-rot[0], -rot[1]]) < Math.PI / 2 - 0.05;

    const draw = (now: number) => {
      const dt = now - last; last = now;
      if (!dragging && !reduceMotion) rot = [rot[0] + dt * 0.006, rot[1], 0];
      proj.rotate(rot);
      ctx.clearRect(0, 0, W, H);

      // Sphere
      ctx.beginPath(); path({ type: "Sphere" });
      const [cx, cy] = proj.translate();
      const g = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      g.addColorStop(0, "#ffffff"); g.addColorStop(1, "#eef3ea");
      ctx.fillStyle = g; ctx.fill();
      ctx.lineWidth = 1; ctx.strokeStyle = "#b9cbb0"; ctx.stroke();
      ctx.beginPath(); path(graticule); ctx.strokeStyle = "rgba(95,154,138,0.16)"; ctx.lineWidth = 0.7; ctx.stroke();

      // Land + highlighted countries
      ctx.beginPath(); path(land); ctx.fillStyle = "#cbd8c2"; ctx.fill();
      for (const f of countries) {
        if (!ACTIVE.has(String(f.id))) continue;
        ctx.beginPath(); path(f); ctx.fillStyle = f.id === "050" ? "#2a8fc4" : "#7bae9f"; ctx.fill();
      }
      ctx.beginPath(); path(land); ctx.strokeStyle = "rgba(246,247,244,0.9)"; ctx.lineWidth = 0.5; ctx.stroke();

      // Animated arcs from HQ
      const phase = reduceMotion ? 0 : ((now - t0) / 2400) % 1;
      for (const s of SITES) {
        if (s.hq) continue;
        ctx.beginPath(); path({ type: "LineString", coordinates: [HQ, s.at] });
        ctx.setLineDash([3, 4]); ctx.lineDashOffset = -phase * 14;
        ctx.strokeStyle = "rgba(23,48,43,0.55)"; ctx.lineWidth = 1.2; ctx.stroke(); ctx.setLineDash([]);
      }

      // Pins + labels
      for (const s of SITES) {
        if (!visible(s.at)) continue;
        const pt = proj(s.at);
        if (!pt) continue;
        const [x, y] = pt;
        if (s.hq) {
          const pr = 6 + phase * 16;
          ctx.beginPath(); ctx.arc(x, y, pr, 0, 7);
          ctx.strokeStyle = `rgba(232,189,42,${1 - phase})`; ctx.lineWidth = 2; ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(x, y, s.hq ? 6 : 4.5, 0, 7);
        ctx.fillStyle = "#e8bd2a"; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = "#17302b"; ctx.stroke();

        const fs = Math.max(13, Math.min(18, R * 0.075));
        ctx.font = `600 ${fs}px ${displayFont}`;
        const tw = ctx.measureText(s.name).width;
        const bh = s.sub ? fs * 2.1 : fs * 1.35;
        const bw = Math.max(tw, s.sub ? ctx.measureText(s.sub).width * 0.72 : 0) + 14;
        const lx = s.labelLeft ? x - 10 - bw : x + 10, ly = y - 10;
        ctx.fillStyle = "rgba(23,48,43,0.92)"; ctx.fillRect(lx, ly - bh + 4, bw, bh);
        ctx.fillStyle = "#f6f7f4"; ctx.fillText(s.name, lx + 7, ly - (s.sub ? fs * 0.85 : 2));
        if (s.sub) {
          ctx.font = `500 ${fs * 0.62}px ${monoFont}`;
          ctx.fillStyle = "#b0c584"; ctx.fillText(s.sub.toUpperCase(), lx + 7, ly);
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    // Drag to rotate
    let start: { x: number; y: number; r: [number, number, number] } | null = null;
    const onDown = (e: PointerEvent) => {
      dragging = true; start = { x: e.clientX, y: e.clientY, r: [...rot] };
      cv.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!start) return;
      const k = 90 / R;
      rot = [start.r[0] + (e.clientX - start.x) * k, Math.max(-60, Math.min(60, start.r[1] - (e.clientY - start.y) * k)), 0];
    };
    const onEnd = () => { start = null; dragging = false; };
    cv.addEventListener("pointerdown", onDown);
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerup", onEnd);
    cv.addEventListener("pointercancel", onEnd);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      cv.removeEventListener("pointerdown", onDown);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerup", onEnd);
      cv.removeEventListener("pointercancel", onEnd);
    };
  }, [reserveBottom]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Globe highlighting the countries where EMEC works: Bangladesh (HQ), Bhutan, India, Japan, Ireland and the USA"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", cursor: "grab", touchAction: "none" }}
    />
  );
}
