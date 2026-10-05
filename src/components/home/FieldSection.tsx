import type { CSSProperties, ReactNode } from "react";
import s from "./FieldSection.module.css";

/**
 * One illustrative offshore field, shared by every Journey scene so the five stages read as a
 * single continuous world. Geometry lives in "world" units (1000 × 600, y = depth downward);
 * each scene frames it with a camera and adds its own layers. Nothing here is real field data.
 */
export const SEA = 70;
export const OWC = 365;
const CREST_X = 520;

export interface Camera {
  x: number;
  y: number;
  w: number;
  h: number;
}
export const FULL: Camera = { x: 0, y: 0, w: 1000, h: 600 };

const bump = (x: number, base: number, amp: number) => base - amp * Math.exp(-(((x - CREST_X) / 210) ** 2));

/** Horizons, shallow → deep. The reservoir is an anticline whose crest sits under CREST_X. */
export const H = {
  seabed: (x: number) => 150 + 3 * Math.sin(x / 57),
  h1: (x: number) => bump(x, 215, 18),
  h2: (x: number) => bump(x, 280, 35),
  seal: (x: number) => bump(x, 335, 60),
  resTop: (x: number) => bump(x, 385, 70),
  resBase: (x: number) => bump(x, 440, 70),
  h6: (x: number) => bump(x, 500, 55),
  src: (x: number) => bump(x, 560, 30),
  bottom: () => 620,
};
type Fn = (x: number) => number;

const XS = Array.from({ length: 201 }, (_, i) => i * 5);
const pts = (f: Fn, xs = XS) => xs.map((x) => `${x},${f(x).toFixed(1)}`);
/** Polyline path along a horizon */
export const horizonPath = (f: Fn, from = 0, to = 1000) => `M${pts(f, XS.filter((x) => x >= from && x <= to)).join("L")}`;
const band = (top: Fn, bot: Fn) => `M${pts(top).join("L")}L${pts(bot, [...XS].reverse()).join("L")}Z`;

const BANDS: [Fn, Fn, string, string][] = [
  [H.seabed, H.h1, "#E8DFCB", "overburden-1"],
  [H.h1, H.h2, "#D5CDBE", "overburden-2"],
  [H.h2, H.seal, "#E3D3AE", "overburden-3"],
  [H.seal, H.resTop, "#9DAFC2", "seal"],
  [H.resTop, H.resBase, "#7FA6C9", "reservoir-water"],
  [H.resBase, H.h6, "#7E8C9C", "underburden"],
  [H.h6, H.src, "#4A5160", "deep"],
  [H.src, H.bottom, "#363A44", "source"],
];
const oilBottom: Fn = (x) => Math.min(H.resBase(x), OWC);
const OIL = band((x) => Math.min(H.resTop(x), oilBottom(x)), oilBottom);
const SEA_PATH = `M0,${SEA}L1000,${SEA}L${pts(H.seabed, [...XS].reverse()).join("L")}Z`;

export interface FieldTag {
  /** World coordinates of the point being annotated */
  x: number;
  y: number;
  label: string;
  sub?: string;
  /** Step number shown before the label, matching the narrative list */
  step?: string;
  side?: "left" | "right";
  /** Secondary tags are hidden on small screens */
  minor?: boolean;
  /** Ordinal for future sequential reveal */
  seq?: number;
}

export interface FieldSectionProps {
  camera?: Camera;
  /** Stage-specific SVG layers, drawn above the geology */
  children?: ReactNode;
  tags?: FieldTag[];
  /** Fade the geology (calm / ending scenes) */
  muted?: boolean;
  /** Depth-scale marks (world y); omitted = sea level · seabed · reservoir */
  depthMarks?: [number, string][];
  label: string;
  style?: CSSProperties;
}

const pct = (v: number, o: number, len: number) => `${(((v - o) / len) * 100).toFixed(2)}%`;
const DEFAULT_MARKS: [number, string][] = [[SEA, "Sea level"], [150, "Seabed"], [OWC - 30, "Reservoir"]];

export function FieldSection({ camera = FULL, children, tags = [], muted, depthMarks = DEFAULT_MARKS, label, style }: FieldSectionProps) {
  const c = camera;
  const inView = (x: number, y: number) => x >= c.x && x <= c.x + c.w && y >= c.y && y <= c.y + c.h;
  return (
    <div className={s.frame} style={{ aspectRatio: `${c.w} / ${c.h}`, ...style }} data-persist="field-section" data-camera={`${c.x} ${c.y} ${c.w} ${c.h}`}>
      <svg className={s.svg} viewBox={`${c.x} ${c.y} ${c.w} ${c.h}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
        <defs>
          <linearGradient id="fs-oil" x1="0" x2="0" y1="315" y2={OWC} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#D6402B" />
            <stop offset="1" stopColor="#F29A1F" />
          </linearGradient>
        </defs>
        <g data-layer="geology" opacity={muted ? 0.5 : 1}>
          <path d={SEA_PATH} fill="#CFE5F1" data-layer="sea" />
          {BANDS.map(([a, b, col, id]) => <path key={id} d={band(a, b)} fill={col} data-layer={id} />)}
          <path d={OIL} fill="url(#fs-oil)" data-layer="hydrocarbons" />
          {[H.h1, H.h2, H.seal, H.resTop, H.resBase, H.h6, H.src].map((f, i) => (
            <path key={i} d={horizonPath(f)} className={s.horizon} />
          ))}
          <path d="M790,165 L860,620" className={s.fault} data-layer="fault" />
        </g>
        <line x1="0" x2="1000" y1={SEA} y2={SEA} className={s.seaLine} data-layer="sea-level" />
        {children}
      </svg>
      <div className={s.depth} data-persist="depth-scale" aria-hidden>
        <span className={s.depthTitle}>Depth</span>
        {depthMarks.filter(([y]) => y >= c.y && y <= c.y + c.h).map(([y, t]) => (
          <span key={t} className={s.depthMark} style={{ top: pct(y, c.y, c.h) }}>{t}</span>
        ))}
      </div>
      {tags.filter((t) => inView(t.x, t.y)).map((t) => (
        <div
          key={t.label}
          className={[s.tag, t.side === "left" && s.left, t.minor && s.minor].filter(Boolean).join(" ")}
          style={{ left: pct(t.x, c.x, c.w), top: pct(t.y, c.y, c.h) }}
          data-step={t.step}
          data-sequence={t.seq}
        >
          <span className={s.dot} />
          <span className={s.leader} />
          <span className={s.text}>
            {t.step && <span className={s.step}>{t.step}</span>}
            <span className={t.step ? s.label : undefined}>{t.label}</span>
            {t.sub && <span className={s.sub}>{t.sub}</span>}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ───────────── Reusable field elements (SVG, world units) ───────────── */

const seabedAt = (x: number) => H.seabed(x);

/** Jack-up drilling rig standing on the seabed */
export function Rig({ x, faded }: { x: number; faded?: boolean }) {
  const sb = seabedAt(x);
  return (
    <g className={s.structure} opacity={faded ? 0.35 : 1} data-layer="rig">
      <line x1={x - 18} y1={sb} x2={x - 18} y2={34} />
      <line x1={x + 18} y1={sb} x2={x + 18} y2={34} />
      <rect x={x - 26} y={50} width={52} height={8} className={s.fill} />
      <path d={`M${x - 8},50 L${x},22 L${x + 8},50`} />
    </g>
  );
}

/** Fixed production platform (jacket + topsides) */
export function Platform({ x, ghost }: { x: number; ghost?: boolean }) {
  const sb = seabedAt(x);
  return (
    <g className={ghost ? `${s.structure} ${s.ghost}` : s.structure} data-layer="platform">
      <path d={`M${x - 26},${sb} L${x - 14},52 M${x + 26},${sb} L${x + 14},52 M${x - 23},${sb - 25} L${x + 21},${sb - 70} M${x + 23},${sb - 25} L${x - 21},${sb - 70}`} />
      <rect x={x - 34} y={40} width={68} height={12} className={ghost ? undefined : s.fill} />
      <rect x={x - 28} y={28} width={22} height={12} className={ghost ? undefined : s.fill} />
      <rect x={x - 2} y={30} width={18} height={10} className={ghost ? undefined : s.fill} />
      <path d={`M${x + 34},44 L${x + 56},20`} />
    </g>
  );
}

/** Seismic survey vessel towing a streamer, with a few reflection ray paths */
export function SeismicSurvey({ x }: { x: number }) {
  const rec = [x + 60, x + 110, x + 160, x + 210];
  return (
    <g data-layer="seismic-survey" data-sequence="1">
      <path d={`M${x - 26},${SEA - 6} L${x + 14},${SEA - 6} L${x + 6},${SEA + 2} L${x - 20},${SEA + 2} Z`} className={s.vessel} />
      <line x1={x + 14} y1={SEA + 4} x2={x + 240} y2={SEA + 4} className={s.streamer} />
      {rec.map((r) => <circle key={r} cx={r} cy={SEA + 4} r={2.2} className={s.receiver} />)}
      {rec.map((r) => {
        const mx = (x + r) / 2;
        return <path key={`ray${r}`} d={`M${x + 4},${SEA + 4} L${mx},${H.seal(mx)} L${r},${SEA + 4}`} className={s.ray} />;
      })}
    </g>
  );
}

/** Vertical well from the seabed to a target depth */
export function VerticalWell({ x, to, faded, kind = "explore" }: { x: number; to: number; faded?: boolean; kind?: string }) {
  return <line x1={x} y1={seabedAt(x)} x2={x} y2={to} className={s.well} opacity={faded ? 0.35 : 1} data-layer={`well-${kind}`} />;
}

/** Point at parameter t (0 = seabed, 1 = target) along a DeviatedWell path */
export function wellPoint(from: number, tx: number, ty: number, t: number): [number, number] {
  const sb = seabedAt(from), u = 1 - t;
  const b = (a: number, c: number, d: number, e: number) => u ** 3 * a + 3 * u * u * t * c + 3 * u * t * t * d + t ** 3 * e;
  return [b(from, from, tx, tx), b(sb, sb + 90, ty - 120, ty)];
}

/** Deviated well from a surface location to a reservoir target */
export function DeviatedWell({ from, tx, ty, kind = "producer", dashed, seq }: { from: number; tx: number; ty: number; kind?: string; dashed?: boolean; seq?: number }) {
  const sb = seabedAt(from);
  return (
    <path
      d={`M${from},${sb} C${from},${sb + 90} ${tx},${ty - 120} ${tx},${ty}`}
      className={[s.well, kind === "injector" && s.injector, dashed && s.planned].filter(Boolean).join(" ")}
      data-layer={`well-${kind}`}
      data-sequence={seq}
    />
  );
}
