import type { CSSProperties, ReactNode } from "react";
import type { Motif } from "@/content/types";
import styles from "./Artwork.module.css";

/**
 * Engineering-drawing style illustrations that stand in for photography until
 * the client supplies real images. They are pure SVG with no client JS, and are
 * coloured by the design tokens (see Artwork.module.css). The drawing uses a
 * 400×250 space and is cropped to fill any aspect ratio.
 */
interface Props {
  motif: Motif;
  aspect: string;
  tone?: "light" | "dark";
  /** Accessible description; omit for purely decorative use. */
  label?: string;
  /** Portrait motif: initials drawn in the middle. */
  initials?: string;
  /** Changes the contour pattern so neighbouring tiles differ. */
  seed?: number;
  /** Overlay content (e.g. a badge), laid out like the old placeholder. */
  children?: ReactNode;
  style?: CSSProperties;
}

export function Artwork({ motif, aspect, tone = "light", label, initials, seed = 1, children, style }: Props) {
  return (
    <div className={`${styles.frame} ${tone === "dark" ? styles.dark : ""}`} style={{ aspectRatio: aspect, ...style }}>
      <svg
        className={styles.svg}
        viewBox="0 0 400 250"
        preserveAspectRatio={motif === "bridge" ? "xMidYMid meet" : "xMidYMid slice"}
        role={label ? "img" : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
      >
        <rect className={styles.bg} x="-400" y="-400" width="1200" height="1050" />
        {MOTIFS[motif]({ seed, initials })}
      </svg>
      {children && <div className={styles.overlay}>{children}</div>}
    </div>
  );
}

/* ---------- helpers ---------- */

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Concentric, gently irregular rings, like a topographic map. */
function Contours({ cx, cy, rings = 9, step = 22, seed = 1 }: { cx: number; cy: number; rings?: number; step?: number; seed?: number }) {
  const paths: string[] = [];
  for (let i = 0; i < rings; i++) {
    const r = 14 + i * step;
    const pts: string[] = [];
    for (let k = 0; k < 72; k++) {
      const a = (k / 72) * Math.PI * 2;
      const rr = r * (1 + 0.13 * Math.sin(3 * a + seed) + 0.07 * Math.sin(5 * a + seed * 2 + i * 0.4));
      pts.push(`${r1(cx + rr * Math.cos(a) * 1.45)},${r1(cy + rr * Math.sin(a))}`);
    }
    paths.push(`M${pts.join("L")}Z`);
  }
  return (
    <g className={styles.contour}>
      {paths.map((d, i) => <path key={i} d={d} strokeWidth={i % 4 === 3 ? 1.1 : 0.6} />)}
    </g>
  );
}

/** A river: revetment hatching on both banks, water band and a dashed centreline. */
function River({ d, width = 24, hatch = true }: { d: string; width?: number; hatch?: boolean }) {
  return (
    <g>
      {hatch && <path d={d} className={styles.hatch} strokeWidth={width + 12} />}
      <path d={d} className={styles.waterStroke} strokeWidth={width} />
      <path d={d} className={styles.centre} />
    </g>
  );
}

function Label({ x, y, children, anchor = "start" }: { x: number; y: number; children: string; anchor?: "start" | "middle" | "end" }) {
  return <text x={x} y={y} className={styles.text} textAnchor={anchor}>{children}</text>;
}

/** Simple deterministic hash noise in [0,1). */
const noise = (x: number, y: number, s: number) => {
  const v = Math.sin(x * 127.1 + y * 311.7 + s * 74.7) * 43758.5453;
  return v - Math.floor(v);
};

/* ---------- motifs ---------- */

type Draw = (o: { seed: number; initials?: string }) => ReactNode;

const MOTIFS: Record<Motif, Draw> = {
  river: ({ seed }) => {
    const d = "M-30 60 C 60 30, 110 160, 200 125 S 310 30, 430 150";
    return (
      <>
        <Contours cx={300} cy={190} seed={seed} />
        <River d={d} />
        {[[70, 62], [200, 125], [330, 78]].map(([x, y], i) => (
          <g key={i}>
            <line x1={x} y1={y - 34} x2={x} y2={y + 34} className={styles.ink} strokeDasharray="3 3" />
            <circle cx={x} cy={y - 34} r={3} className={styles.accentFill} />
            <Label x={x + 6} y={y - 36}>{`CS-${i + 1}`}</Label>
          </g>
        ))}
        <path d="M 300 215 l 30 0 m -8 -5 l 8 5 l -8 5" className={styles.ink} />
        <Label x={300} y={208}>FLOW</Label>
      </>
    );
  },

  drainage: ({ seed }) => {
    const nodes: [number, number][] = [[50, 35], [120, 60], [95, 120], [180, 105], [250, 70], [330, 45], [300, 130], [210, 175], [140, 165]];
    const edges: [number, number][] = [[0, 1], [1, 3], [2, 3], [3, 7], [4, 3], [5, 4], [6, 7], [8, 7]];
    return (
      <>
        <Contours cx={80} cy={40} seed={seed} />
        <River d="M-20 232 C 100 205, 260 250, 420 218" width={30} hatch={false} />
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} className={styles.pipe} />
        ))}
        <line x1={210} y1={175} x2={225} y2={222} className={styles.pipe} />
        {nodes.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={4.5} className={styles.node} />)}
        <path d="M 225 222 l -6 -9 l 12 0 z" className={styles.accentFill} />
        <Label x={236} y={212}>OUTFALL</Label>
        <Label x={56} y={30}>MH-01</Label>
      </>
    );
  },

  bridge: () => {
    // Drawn wider than the frame and fitted with "meet", so the river banks
    // stay in view at any aspect ratio (21:8 hero through 1:1 card).
    const piers = [-40, 40, 120, 200, 280, 360, 440];
    const bedY = (x: number) => Math.max(172, 214 - 46 * Math.pow((x - 200) / 260, 2));
    const xs = Array.from({ length: 61 }, (_, i) => -400 + i * 20);
    return (
      <>
        <rect x={-400} y={150} width={1200} height={300} className={styles.waterFill} />
        <path d={`M-400 150 ${xs.slice(1).map((x, i) => `Q ${x - 10} ${i % 2 ? 153 : 147} ${x} 150`).join(" ")}`} className={styles.waterLine} />
        <path d={`M-400 ${bedY(-400)} ${xs.map((x) => `L${x} ${r1(bedY(x))}`).join(" ")} L800 450 L-400 450Z`} className={styles.soil} />
        {piers.map((x) => (
          <g key={x}>
            <rect x={x - 3.5} y={112} width={7} height={bedY(x) - 112} className={styles.inkFill} />
            <path d={`M ${x - 16} ${bedY(x) - 1} Q ${x} ${bedY(x) + 13} ${x + 16} ${bedY(x) - 1}`} className={styles.ink} strokeDasharray="3 3" />
          </g>
        ))}
        <rect x={-400} y={106} width={1200} height={7} className={styles.inkFill} />
        <line x1={-400} y1={99} x2={800} y2={99} className={styles.ink} strokeDasharray="1 6" />
        <Label x={128} y={143}>HFL</Label>
        <Label x={208} y={bedY(200) + 20}>SCOUR</Label>
        <path d="M 30 182 l 30 0 m -7 -5 l 7 5 l -7 5" className={styles.ink} />
      </>
    );
  },

  biodiversity: ({ seed }) => {
    const trees: [number, number, number][] = [[40, 40, 14], [70, 28, 10], [30, 80, 11], [330, 190, 15], [365, 170, 11], [300, 222, 10], [355, 220, 13], [110, 200, 12], [80, 222, 9], [300, 40, 12], [345, 55, 9]];
    return (
      <>
        <Contours cx={200} cy={125} seed={seed} rings={7} step={26} />
        <River d="M-20 150 C 90 120, 140 60, 220 110 S 330 160, 420 80" width={26} hatch={false} />
        <rect x={150} y={96} width={8} height={40} className={styles.inkFill} transform="rotate(-8 154 116)" />
        {trees.map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r} className={styles.leaf} />
            <circle cx={x} cy={y} r={r * 0.45} className={styles.leafCore} />
          </g>
        ))}
        {[[200, 40], [250, 200], [60, 130]].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width={26} height={26} className={styles.ink} strokeDasharray="3 3" />
        ))}
        <path d="M 240 52 q 6 -6 12 0 q 6 -6 12 0 M 262 34 q 5 -5 10 0 q 5 -5 10 0" className={styles.ink} />
        <Label x={200} y={34}>Q-01</Label>
      </>
    );
  },

  field: ({ seed }) => {
    const rows = [50, 80, 110, 140, 170];
    const path = rows.map((y, i) => (i % 2 ? `L 340 ${y} L 60 ${y}` : `L 60 ${y} L 340 ${y}`)).join(" ").replace(/^L/, "M");
    return (
      <>
        <Contours cx={210} cy={130} seed={seed} rings={10} step={20} />
        <path d={path} className={styles.flight} />
        {rows.flatMap((y) => [100, 160, 220, 280].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r={1.8} className={styles.inkFill} />))}
        <g transform="translate(250 80)">
          <line x1={-14} y1={-14} x2={14} y2={14} className={styles.inkBold} />
          <line x1={14} y1={-14} x2={-14} y2={14} className={styles.inkBold} />
          {[[-14, -14], [14, -14], [-14, 14], [14, 14]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={7} className={styles.rotor} />)}
          <rect x={-5} y={-5} width={10} height={10} className={styles.accentFill} />
        </g>
        <g transform="translate(70 238)">
          <line x1={0} y1={-34} x2={-14} y2={0} className={styles.inkBold} />
          <line x1={0} y1={-34} x2={14} y2={0} className={styles.inkBold} />
          <line x1={0} y1={-34} x2={0} y2={0} className={styles.inkBold} />
          <rect x={-7} y={-46} width={14} height={12} className={styles.inkFill} />
          <line x1={7} y1={-40} x2={180} y2={-158} className={styles.ink} strokeDasharray="2 4" />
        </g>
        <Label x={268} y={64}>UAV</Label>
        <Label x={88} y={204}>TS-1</Label>
      </>
    );
  },

  dashboard: () => (
    <>
      <rect x={20} y={18} width={360} height={214} className={styles.panel} />
      <rect x={20} y={18} width={360} height={16} className={styles.inkFill} />
      {[30, 40, 50].map((x) => <circle key={x} cx={x} cy={26} r={2.5} className={styles.dot} />)}
      <rect x={20} y={34} width={74} height={198} className={styles.soft} />
      {[50, 64, 78, 92, 106].map((y, i) => <rect key={y} x={30} y={y} width={i === 1 ? 50 : 40} height={5} className={i === 1 ? styles.accentFill : styles.bar} />)}
      <rect x={104} y={44} width={266} height={124} className={styles.mapBg} />
      <path d="M100 140 C 150 90, 200 160, 260 110 S 340 60, 374 90" className={styles.waterStroke} strokeWidth={10} />
      {[["M120 122 C 140 106, 160 112, 176 124", styles.segGood], ["M190 130 C 215 140, 235 128, 252 116", styles.segWarn], ["M268 106 C 290 90, 315 74, 340 72", styles.segBad]].map(([d, cls], i) => (
        <path key={i} d={d} className={cls} />
      ))}
      <g transform="translate(300 64)"><circle r={4} className={styles.accentFill} /><circle r={9} className={styles.ink} /></g>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const h = [24, 38, 30, 46, 34, 52, 40][i];
        return <rect key={i} x={114 + i * 18} y={224 - h} width={11} height={h} className={i === 5 ? styles.accentFill : styles.bar} />;
      })}
      <rect x={250} y={180} width={120} height={44} className={styles.soft} />
      <Label x={258} y={196}>REVETMENT · km 12.4</Label>
      <rect x={258} y={204} width={70} height={6} className={styles.segGoodFill} />
    </>
  ),

  flood: ({ seed }) => {
    const cells: ReactNode[] = [];
    const size = 16;
    for (let gy = 0; gy < 16; gy++) {
      for (let gx = 0; gx < 26; gx++) {
        const x = gx * size, y = gy * size;
        const riverY = 130 + 45 * Math.sin((x + 20) / 70);
        const dist = Math.abs(y + size / 2 - riverY);
        const v = 1 - dist / 70 + (noise(gx, gy, seed) - 0.5) * 0.55;
        const cls = v > 0.55 ? styles.cellWet : v > 0.3 ? styles.cellDamp : styles.cellDry;
        cells.push(<rect key={`${gx}-${gy}`} x={x + 1} y={y + 1} width={size - 2} height={size - 2} className={cls} />);
      }
    }
    return (
      <>
        {cells}
        <path d={`M-10 ${130 + 45 * Math.sin(10 / 70)} ${Array.from({ length: 22 }, (_, i) => `L${i * 20} ${r1(130 + 45 * Math.sin((i * 20 + 20) / 70))}`).join(" ")}`} className={styles.inkBold} />
        <rect x={60} y={40} width={250} height={170} className={styles.aoi} />
        <Label x={64} y={34}>AOI · SAR VV</Label>
        <rect x={322} y={196} width={10} height={10} className={styles.cellWet} />
        <Label x={337} y={205}>FLOOD</Label>
      </>
    );
  },

  assets: ({ seed }) => (
    <>
      <Contours cx={120} cy={110} seed={seed} rings={8} step={22} />
      <River d="M-20 40 C 60 70, 80 150, 150 170 S 230 210, 250 260" width={20} />
      {[[60, 70], [118, 150], [190, 190], [40, 140], [150, 90]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d="M0 0 C -9 -12, -9 -22, 0 -22 C 9 -22, 9 -12, 0 0 Z" className={i === 2 ? styles.pinAlert : styles.pin} />
          <circle cy={-15} r={3} className={styles.dot} />
        </g>
      ))}
      <rect x={236} y={24} width={146} height={202} className={styles.panel} />
      <rect x={236} y={24} width={146} height={22} className={styles.inkFill} />
      <Label x={246} y={39}>ASSET REGISTER</Label>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <circle cx={252} cy={66 + i * 26} r={4} className={i === 2 ? styles.segBadFill : i === 4 ? styles.segWarnFill : styles.segGoodFill} />
          <rect x={264} y={62 + i * 26} width={60 + ((i * 23) % 40)} height={4} className={styles.bar} />
          <rect x={264} y={70 + i * 26} width={36} height={3} className={styles.barSoft} />
        </g>
      ))}
    </>
  ),

  map: () => (
    <>
      <g transform="rotate(-14 200 125)" className={styles.street}>
        {[-40, 10, 60, 110, 160, 210, 260, 310].map((y) => <line key={`h${y}`} x1={-100} y1={y} x2={500} y2={y} />)}
        {[-60, 0, 60, 120, 180, 240, 300, 360, 420].map((x) => <line key={`v${x}`} x1={x} y1={-100} x2={x} y2={350} />)}
      </g>
      <path d="M-20 205 C 60 180, 120 230, 200 210 S 330 170, 420 200" className={styles.road} />
      <path d="M 300 -10 C 280 60, 320 120, 290 260" className={styles.road} />
      <path d="M 40 40 C 70 20, 120 30, 120 60 C 120 90, 70 100, 50 80 C 30 65, 25 50, 40 40Z" className={styles.waterFill} />
      <rect x={180} y={60} width={50} height={36} className={styles.leaf} transform="rotate(-14 205 78)" />
      <g transform="translate(205 140)">
        <circle r={30} className={styles.halo} />
        <path d="M0 0 C -13 -17, -13 -32, 0 -32 C 13 -32, 13 -17, 0 0 Z" className={styles.pinAlert} />
        <circle cy={-21} r={4.5} className={styles.dot} />
      </g>
      <rect x={222} y={100} width={92} height={22} className={styles.inkFill} />
      <text x={230} y={115} className={styles.textOnInk}>EMEC · LALMATIA</text>
    </>
  ),

  portrait: ({ seed, initials }) => (
    <>
      <Contours cx={200} cy={150} seed={seed} rings={11} step={18} />
      <circle cx={200} cy={118} r={64} className={styles.portraitDisc} />
      <text x={200} y={140} className={styles.initials} textAnchor="middle">{initials}</text>
    </>
  ),
};
