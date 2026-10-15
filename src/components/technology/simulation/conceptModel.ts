import { conceptPattern } from "./IsoGrid";

/**
 * Conceptual "simulation" for the Run the Simulation step — explicit, simplified relationships in time and
 * space for teaching. It is NOT a reservoir simulator (no flow equations are solved) and its output is not
 * simulator data. All values are relative and dimensionless:
 *   pressure  — fraction of the initial reservoir pressure (1 = initial)
 *   water     — water-saturation index (0 = initial water saturation, 1 = fully swept by injected water)
 *   time      — 0 → 1 over the run, shown as time steps
 *
 * Pressure: each producer, once on, opens a drawdown cone that deepens quickly and widens with time; the
 * reservoir also depletes overall while producing; once injection starts, depletion slows and pressure is
 * supported around the injector.
 * Water saturation: after injection starts, injected water advances from the injector, faster through
 * higher-permeability cells (the 01 permeability pattern) and toward the producers, so the front is uneven;
 * behind the front saturation keeps building up rather than jumping straight to "swept".
 */

export const NX = 10, NY = 6, STEPS = 60;

export interface ModelWell {
  id: string;
  i: number;
  j: number;
  kind: "producer" | "injector";
  label: string;
  /** Start time (0–1); the same schedule as the well-schedule bars */
  on: number;
}

export const MODEL_WELLS: ModelWell[] = [
  { id: "p1", i: 3, j: 2, kind: "producer", label: "Producer 1", on: 0.06 },
  { id: "p2", i: 6, j: 3, kind: "producer", label: "Producer 2", on: 0.22 },
  { id: "inj", i: 9, j: 0, kind: "injector", label: "Injector", on: 0.34 },
];

const PRODUCERS = MODEL_WELLS.filter((w) => w.kind === "producer");
const INJECTOR = MODEL_WELLS.find((w) => w.kind === "injector")!;
const PERM = conceptPattern(NX, NY, 3);

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
/** Smooth start-up after a well comes on */
const rise = (u: number, tau: number) => (u <= 0 ? 0 : 1 - Math.exp(-u / tau));
const dist = (i: number, j: number, w: ModelWell) => Math.hypot(i - w.i, j - w.j);
const smooth = (x: number) => { const k = clamp(x); return k * k * (3 - 2 * k); };

/** Relative pressure (1 = initial) of cell (i, j) at time t */
export function pressureAt(i: number, j: number, t: number) {
  const support = rise(t - INJECTOR.on, 0.15);
  const producing = PRODUCERS.reduce((s, w) => s + Math.max(0, t - w.on), 0);
  let p = 1 - 0.16 * producing * (1 - 0.55 * support);
  for (const w of PRODUCERS) {
    const u = t - w.on;
    if (u <= 0) continue;
    const r = 1.3 + 3 * Math.min(1, u / 0.5), d = dist(i, j, w);
    p -= 0.22 * rise(u, 0.05) * Math.exp(-(d * d) / (2 * r * r));
  }
  const dI = dist(i, j, INJECTOR);
  p += 0.18 * support * Math.exp(-(dI * dI) / (2 * 2.2 * 2.2));
  return clamp(p);
}

/** Water-saturation index (0 = initial, 1 = swept) of cell (i, j) at time t */
export function waterAt(i: number, j: number, t: number) {
  const u = t - INJECTOR.on;
  if (u <= 0) return 0;
  const dx = i - INJECTOR.i, dy = j - INJECTOR.j, d = Math.hypot(dx, dy);
  if (d === 0) return smooth(u / 0.05);
  // how directly this cell lies on the way to a producer (cosine of the angle)
  const align = Math.max(...PRODUCERS.map((w) => {
    const px = w.i - INJECTOR.i, py = w.j - INJECTOR.j;
    return (dx * px + dy * py) / (d * Math.hypot(px, py));
  }));
  const speed = (0.65 + 0.7 * clamp(PERM[j][i])) * (0.75 + 0.45 * Math.max(0, align));
  const front = speed * 6.5 * (u / (1 - INJECTOR.on));
  // a front, with saturation still building up behind it (not a uniform jump to "swept")
  return smooth((front - d) / 1.6) * (0.5 + 0.5 * smooth((front - d) / 4));
}

export type Mode = "pressure" | "water";

/** Display field (0–1 per cell, [j][i]) for the IsoGrid colour ramp */
export function fieldAt(mode: Mode, t: number): number[][] {
  return Array.from({ length: NY }, (_, j) =>
    Array.from({ length: NX }, (_, i) => (mode === "pressure" ? (pressureAt(i, j, t) - P_MIN) / (1 - P_MIN) : waterAt(i, j, t))),
  );
}
/** Lowest relative pressure the colour scale shows (cells below are drawn at the low end) */
export const P_MIN = 0.45;

export interface Phase { from: number; title: string; body: string }
/** Narrative for the current time (conceptual) */
export const PHASES: Phase[] = [
  { from: 0, title: "Initial state", body: "생산 전 초기 상태입니다. 저류층 전체가 초기 압력이고, 물포화도는 초기 상태입니다." },
  { from: 0.06, title: "Production starts", body: "Producer 1이 생산을 시작해, 생산정 주변의 압력이 먼저 낮아집니다." },
  { from: 0.22, title: "Second producer", body: "Producer 2가 추가되어 두 생산정 주변의 압력 강하 영역이 넓어지고, 저류층 전체 압력도 서서히 낮아집니다." },
  { from: 0.34, title: "Water injection", body: "물 주입이 시작되어 주입정 주변의 압력이 지지되고, 주입된 물이 생산정 방향으로 퍼져 나갑니다." },
  { from: 0.75, title: "Later time", body: "주입된 물이 생산정 가까이 도달하는 구간입니다. 물은 투과도가 높은 쪽으로 먼저 이동해 퍼지는 모양이 고르지 않습니다." },
];
export const phaseAt = (t: number) => [...PHASES].reverse().find((p) => t >= p.from)!;
