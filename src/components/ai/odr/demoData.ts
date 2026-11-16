import type { PlantDay, Val, WellRaw } from "./metrics";

/**
 * Synthetic data for the ODR dashboard demo. Nothing here comes from the field: every series is generated from a
 * fixed seed, so the demo looks the same on every visit. Only the shape of the data follows the program — raw daily
 * volumes in m³ (steam as CWE m³), BHP in kPa, days missing from the workbook, gaps in single values — so that the
 * real metric definitions and Selection Total rules (metrics.ts) have something meaningful to work on.
 */

function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = rng(20261116);
const noise = (a: number) => (rand() * 2 - 1) * a;
const round = (v: number, d = 1) => Math.round(v * 10 ** d) / 10 ** d;

const START = Date.UTC(2026, 6, 20); // 2026-07-20
const SPAN = 98;
/** Calendar days with no workbook row (the program skips them and breaks the line) */
const NOT_IN_EXCEL = new Set([20, 21, 45]);

const iso = (t: number) => new Date(t).toISOString().slice(0, 10);
const offsets = Array.from({ length: SPAN }, (_, k) => k).filter((k) => !NOT_IN_EXCEL.has(k));

/** Day list (ISO dates), only days that exist in the workbook */
export const DAYS: string[] = offsets.map((k) => iso(START + k * 86400000));

/** Planned slowdown in the synthetic timeline: output eases down, holds, then recovers */
function slowdown(k: number) {
  if (k < 34 || k > 50) return 1;
  if (k < 38) return 1 - (k - 33) * 0.1;
  if (k < 44) return 0.6;
  return 0.6 + (k - 43) * 0.057;
}

/* ───────── Field ───────── */

export const PLANT_DAYS: PlantDay[] = offsets.map((k) => {
  const f = slowdown(k);
  const bitumen = round((1430 + 70 * Math.sin(k / 9) + k * 0.9 + noise(28)) * f, 0);
  const water = round(bitumen * (2.55 + 0.16 * Math.sin(k / 13) + noise(0.05)), 0);
  const steam = round(bitumen * (2.7 + 0.14 * Math.cos(k / 11) + noise(0.05) + (1 - f) * 0.9), 0);
  const bitComp = round(bitumen * (0.62 + noise(0.015)), 0);
  const blend = k < 60 ? 0.47 : 0.52; // blend change partway through
  const dilComp = k === 27 || k === 71 ? null : round(bitComp * (blend + 0.012 * Math.sin(k / 6) + noise(0.006)), 0);
  const pipeline = round((bitComp + (dilComp ?? bitComp * blend)) * 6.28981 * (0.985 + noise(0.01)), 0);
  return { bitumen, water, steam, pipeline, bitComp, dilComp };
});

/* ───────── Wells ───────── */

export interface DemoWell {
  id: string;
  pad: string;
  name: string;
  raw: WellRaw;
}

const WELL_SPECS: [pad: string, name: string, oil: number, wor: number, sor: number, bhp: number][] = [
  ["A", "A-1", 90, 2.4, 3.1, 2900], ["A", "A-2", 140, 1.9, 2.6, 3100], ["A", "A-3", 70, 3.0, 3.6, 2750],
  ["A", "A-4", 190, 1.7, 2.3, 3250], ["A", "A-5", 110, 2.2, 2.9, 3000],
  ["B", "B-1", 160, 2.0, 2.5, 3150], ["B", "B-2", 120, 2.6, 3.0, 2950], ["B", "B-3", 60, 3.3, 3.9, 2650],
  ["B", "B-4", 210, 1.6, 2.2, 3350], ["B", "B-5", 100, 2.5, 3.2, 2850], ["B", "B-6", 130, 2.1, 2.8, 3050], ["B", "B-7", 80, 2.8, 3.4, 2800],
];

export const WELLS: DemoWell[] = WELL_SPECS.map(([pad, name, oil0, wor0, sor0, bhp0], w) => {
  const raw: WellRaw = { oil: [], water: [], steam: [], bhp: [] };
  const phase = w * 1.7;
  offsets.forEach((k) => {
    const f = slowdown(k);
    // A-4 comes online in week 3 and ramps up; B-3 is shut in for ten days (reports 0 — excluded from ratios and BHP)
    if (name === "A-4" && k < 18) { raw.oil.push(null); raw.water.push(null); raw.steam.push(null); raw.bhp.push(null); return; }
    const ramp = name === "A-4" ? Math.min(1, 0.35 + (k - 18) * 0.05) : 1;
    if (name === "B-3" && k >= 62 && k < 72) { raw.oil.push(0); raw.water.push(0); raw.steam.push(0); raw.bhp.push(0); return; }
    const oil = Math.max(0, oil0 * f * ramp * (1 + 0.08 * Math.sin(k / 8 + phase) + noise(0.06)));
    const water = oil * (wor0 + 0.2 * Math.sin(k / 12 + phase) + noise(0.08));
    const steam = oil * (sor0 + 0.18 * Math.cos(k / 10 + phase) + noise(0.07) + (1 - f) * 0.8);
    const bhp = bhp0 * (1 + 0.025 * Math.sin(k / 15 + phase) + noise(0.01)) * (0.92 + 0.08 * f);
    // occasional single-value gaps, as in a real workbook
    const gap = rand();
    raw.oil.push(round(oil));
    raw.water.push(gap < 0.025 ? null : round(water));
    raw.steam.push(gap > 0.98 ? null : round(steam));
    raw.bhp.push(round(bhp, 0));
  });
  return { id: `${pad}/${name}`, pad, name, raw };
});

export const PADS = ["A", "B"].map((pad) => ({ pad, wells: WELLS.filter((w) => w.pad === pad) }));

/* ───────── Operating status (selected day) ───────── */

const walk = (start: number, lo: number, hi: number, step: number) => {
  let v = start;
  return DAYS.map(() => (v = Math.min(hi, Math.max(lo, v + noise(step)))));
};

export const TANKS: { name: string; values: number[] }[] = [
  { name: "Sales Tank 1", values: walk(42, 15, 80, 6) },
  { name: "Sales Tank 2", values: walk(35, 15, 80, 6) },
  { name: "Off-spec Tank", values: walk(10, 3, 30, 2) },
  { name: "Diluent Tank", values: walk(68, 40, 90, 4) },
];

/** Quality checks with their limits (as on the program's status panel); values are synthetic */
export const CHECKS: { name: string; unit: string; limit: number; values: Val[] }[] = [
  { name: "Dilbit Sales Tank BS&W", unit: "%", limit: 0.5, values: DAYS.map(() => round(0.12 + rand() * 0.25, 2)) },
  { name: "Hardness", unit: "ppb", limit: 100, values: DAYS.map((_, i) => (i === 52 ? 118 : round(20 + rand() * 45, 0))) },
  { name: "Iron", unit: "ppb", limit: 100, values: DAYS.map(() => round(rand() * 12, 0)) },
];
