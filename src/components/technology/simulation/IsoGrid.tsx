import s from "./Simulation.module.css";

/**
 * 2.5D (isometric) reservoir grid — the shared visual of the Reservoir Simulation topic.
 *
 * Built to become the interactive model later: pass `field` (one value 0–1 per top-face cell, row-major
 * [j][i]) and a `ramp` to colour the cells, e.g. pressure or water saturation at a chosen time step. Without a
 * field the grid renders as an empty (uncoloured) model. Nothing here is computed or measured data.
 */

export type Ramp = "pressure" | "saturation" | "porosity" | "permeability";
export interface IsoWell {
  i: number;
  j: number;
  kind: "producer" | "injector";
  label?: string;
  /** Not on yet (drawn faded) */
  inactive?: boolean;
  /** Put the label beside the wellhead instead of above it (keeps neighbouring labels apart) */
  labelSide?: "left" | "right";
}
export interface IsoGridProps {
  nx?: number;
  ny?: number;
  nz?: number;
  /** Cell edge length in SVG units */
  cell?: number;
  /** Layer thickness in SVG units */
  layer?: number;
  field?: number[][];
  ramp?: Ramp;
  wells?: IsoWell[];
  /** Hide well labels (small multiples) */
  compact?: boolean;
  /** Space above the grid for wellheads and labels (SVG units) */
  top?: number;
  label: string;
  className?: string;
}

const COS = Math.cos(Math.PI / 6), SIN = 0.5;
/** Two-stop colour ramps (low → high), from the design palette */
const RAMPS: Record<Ramp, [number[], number[]]> = {
  pressure: [[232, 240, 251], [74, 132, 224]],
  saturation: [[232, 240, 251], [18, 164, 217]],
  porosity: [[246, 239, 222], [242, 154, 31]],
  permeability: [[232, 240, 251], [11, 26, 44]],
};
export const rampColor = (ramp: Ramp, v: number) => {
  const [a, b] = RAMPS[ramp], k = Math.min(1, Math.max(0, v));
  return `rgb(${a.map((x, n) => Math.round(x + (b[n] - x) * k)).join(",")})`;
};

export function IsoGrid({ nx = 10, ny = 6, nz = 3, cell = 24, layer = 14, field, ramp = "saturation", wells = [], compact, top: topPad, label, className }: IsoGridProps) {
  const cx = cell * COS, cy = cell * SIN;
  const top = topPad ?? (compact ? 8 : 64);
  const ox = ny * cx + 4;
  const P = (i: number, j: number, k = 0): [number, number] => [ox + (i - j) * cx, top + (i + j) * cy + k * layer];
  const pts = (...p: [number, number][]) => p.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const w = (nx + ny) * cx + 8, h = top + (nx + ny) * cy + nz * layer + 6;
  const fill = (i: number, j: number) => (field ? rampColor(ramp, field[j]?.[i] ?? 0) : undefined);

  const cells = [];
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    cells.push(<polygon key={`t${i}-${j}`} points={pts(P(i, j), P(i + 1, j), P(i + 1, j + 1), P(i, j + 1))} className={s.cellTop} style={{ fill: fill(i, j) }} data-cell={`${i},${j}`} />);
  }
  const sides = [];
  for (let k = 0; k < nz; k++) {
    for (let i = 0; i < nx; i++) sides.push(<polygon key={`f${i}-${k}`} points={pts(P(i, ny, k), P(i + 1, ny, k), P(i + 1, ny, k + 1), P(i, ny, k + 1))} className={s.cellLeft} style={{ fill: fill(i, ny - 1), opacity: field ? 0.85 : undefined }} />);
    for (let j = 0; j < ny; j++) sides.push(<polygon key={`r${j}-${k}`} points={pts(P(nx, j, k), P(nx, j + 1, k), P(nx, j + 1, k + 1), P(nx, j, k + 1))} className={s.cellRight} style={{ fill: fill(nx - 1, j), opacity: field ? 0.7 : undefined }} />);
  }

  return (
    <svg viewBox={`0 0 ${w.toFixed(0)} ${h.toFixed(0)}`} className={[s.iso, className].filter(Boolean).join(" ")} role="img" aria-label={label}>
      <g data-layer="grid">{cells}{sides}</g>
      <g data-layer="wells">
        {wells.map((wl) => {
          const [x, y] = P(wl.i + 0.5, wl.j + 0.5);
          const head = y - (compact ? 10 : 46);
          return (
            <g key={`${wl.i}-${wl.j}`} className={[wl.kind === "injector" ? s.injector : s.producer, wl.inactive && s.wellOff].filter(Boolean).join(" ")} data-well={wl.kind}>
              <line x1={x} y1={head} x2={x} y2={y} className={s.wellLine} />
              <line x1={x} y1={y} x2={x} y2={y + nz * layer} className={s.wellInside} />
              <circle cx={x} cy={y} r={compact ? 1.8 : 2.6} className={s.wellPoint} />
              {!compact && <circle cx={x} cy={head} r={3.2} className={s.wellHead} />}
              {!compact && wl.label && (wl.labelSide
                ? <text x={x + (wl.labelSide === "left" ? -8 : 8)} y={head + 4} textAnchor={wl.labelSide === "left" ? "end" : "start"} className={s.wellLabel}>{wl.label}</text>
                : <text x={x} y={head - 9} textAnchor="middle" className={s.wellLabel}>{wl.label}</text>)}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/** Smooth, deterministic pattern for property illustrations (no values are implied). */
export function conceptPattern(nx: number, ny: number, seed: number): number[][] {
  return Array.from({ length: ny }, (_, j) =>
    Array.from({ length: nx }, (_, i) => 0.5 + 0.26 * Math.sin(i * 0.8 + seed) + 0.2 * Math.cos(j * 1.1 + seed * 1.7)),
  );
}
