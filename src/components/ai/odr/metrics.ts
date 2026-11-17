/**
 * ODR dashboard — metric definitions and aggregation rules, reproduced from the Black Gold ODR dashboard
 * (the browser dashboard the automation program generates). Only the definitions and rules are reproduced here;
 * every value shown on this site comes from demoData.ts (synthetic). Keep wellValue / selectionTotal identical to
 * the program's logic — scripts/verify-odr-metrics.mjs checks them.
 */

/** bbl per m³ (the program's conversion factor) */
export const BBL = 6.28981;

export type Val = number | null;

/* ───────── Plant (field-level) metrics ───────── */

export type PlantKey = "bitumen" | "wor" | "sor" | "emulsion" | "steam" | "pipeline" | "bit_comp" | "dil_comp" | "dil_ratio";

/** Field-level daily raw values, as the ODR reports them (m³ unless noted) */
export interface PlantDay {
  bitumen: Val; // m³
  water: Val; // produced water, m³
  steam: Val; // steam to wells, CWE m³
  pipeline: Val; // pipeline dilbit, bbl/d
  bitComp: Val; // bitumen component, m³
  dilComp: Val; // diluent component, m³
}

export interface PlantMetric {
  key: PlantKey;
  label: string;
  unit: string;
  digits: number;
  group: "생산" | "판매·성분";
  /** Definition shown under the chart */
  def: string;
  color: string;
  value: (d: PlantDay) => Val;
  /** Calculation basis shown in the tooltip */
  detail?: (d: PlantDay) => string | null;
}

const n0 = (v: number) => v.toLocaleString("en-US", { maximumFractionDigits: 0 });
const mul = (v: Val) => (v === null ? null : v * BBL);

export const PLANT: PlantMetric[] = [
  { key: "bitumen", label: "Bitumen", unit: "bbl/d", digits: 0, group: "생산", color: "#2a78d6",
    def: "ODR Bitumen 생산량 (m³ × 6.28981)", value: (d) => mul(d.bitumen) },
  { key: "wor", label: "WOR", unit: "m³/m³", digits: 2, group: "생산", color: "#c98500",
    def: "Produced Water ÷ Bitumen", value: (d) => (d.water !== null && d.bitumen ? d.water / d.bitumen : null),
    detail: (d) => (d.water !== null && d.bitumen ? `Water ${n0(d.water)} ÷ Bitumen ${n0(d.bitumen)} m³` : null) },
  { key: "sor", label: "SOR", unit: "m³/m³", digits: 2, group: "생산", color: "#6250d6",
    def: "Steam ÷ Bitumen", value: (d) => (d.steam !== null && d.bitumen ? d.steam / d.bitumen : null),
    detail: (d) => (d.steam !== null && d.bitumen ? `Steam ${n0(d.steam)} ÷ Bitumen ${n0(d.bitumen)} m³` : null) },
  { key: "emulsion", label: "Emulsion", unit: "bbl/d", digits: 0, group: "생산", color: "#1baf7a",
    def: "(Bitumen + Produced Water) m³ × 6.28981", value: (d) => (d.bitumen === null || d.water === null ? null : (d.bitumen + d.water) * BBL),
    detail: (d) => (d.bitumen === null || d.water === null ? null : `Bitumen ${n0(d.bitumen)} m³ + Produced Water ${n0(d.water)} m³`) },
  { key: "steam", label: "Steam to Wells", unit: "CWE bbl/d", digits: 0, group: "생산", color: "#eb6834",
    def: "Steam to Wells, CWE m³ × 6.28981", value: (d) => mul(d.steam) },
  { key: "pipeline", label: "Pipeline Dilbit", unit: "bbl/d", digits: 0, group: "판매·성분", color: "#1c5cab",
    def: "ODR Pipeline Dilbit", value: (d) => d.pipeline },
  { key: "bit_comp", label: "Bitumen Component", unit: "bbl/d", digits: 0, group: "판매·성분", color: "#5598e7",
    def: "Bitumen Component m³ × 6.28981", value: (d) => mul(d.bitComp), detail: (d) => (d.bitComp === null ? null : `원본 ${n0(d.bitComp)} m³`) },
  { key: "dil_comp", label: "Diluent Component", unit: "bbl/d", digits: 0, group: "판매·성분", color: "#008300",
    def: "Diluent Component m³ × 6.28981", value: (d) => mul(d.dilComp), detail: (d) => (d.dilComp === null ? null : `원본 ${n0(d.dilComp)} m³`) },
  { key: "dil_ratio", label: "Diluent/Bitumen", unit: "%", digits: 1, group: "판매·성분", color: "#8a4fbf",
    def: "Diluent Component ÷ Bitumen Component × 100 — 같은 날 두 값이 모두 있고 Bitumen이 0이 아닐 때만",
    value: (d) => (d.dilComp !== null && d.bitComp ? (d.dilComp / d.bitComp) * 100 : null),
    detail: (d) => (d.dilComp !== null && d.bitComp ? `Diluent ${n0(d.dilComp)} m³ ÷ Bitumen ${n0(d.bitComp)} m³` : null) },
];

/* ───────── Well metrics ───────── */

export type WellKey = "oil" | "emulsion" | "sor" | "wor" | "steam" | "bhp";

/** One well's daily raw values: oil · water · steam in m³ (steam CWE), BHP in kPa. Indexed like the day list. */
export interface WellRaw {
  oil: Val[];
  water: Val[];
  steam: Val[];
  bhp: Val[];
}

export interface WellMetric {
  key: WellKey;
  label: string;
  unit: string;
  digits: number;
  group: "prod" | "inj";
  def: string;
  /** Selection Total rule, as the program states it */
  total: string;
  /** Line style in Overlay (colour = well, dash = metric) */
  dash: string;
}

export const WELL_METRICS: WellMetric[] = [
  { key: "oil", label: "Oil", unit: "bbl/d", digits: 0, group: "prod", def: "Oil m³ × 6.28981", total: "합계", dash: "" },
  { key: "emulsion", label: "Emulsion", unit: "bbl/d", digits: 0, group: "prod", def: "(Oil + Water) m³ × 6.28981", total: "합계 (Oil·Water가 모두 있는 Well만)", dash: "7 4" },
  { key: "sor", label: "SOR", unit: "m³/m³", digits: 2, group: "prod", def: "Steam ÷ Oil", total: "ΣSteam ÷ ΣOil", dash: "12 4 2 4" },
  { key: "wor", label: "WOR", unit: "m³/m³", digits: 2, group: "prod", def: "Water ÷ Oil", total: "ΣWater ÷ ΣOil", dash: "3 3" },
  { key: "steam", label: "Steam", unit: "CWE bbl/d", digits: 0, group: "inj", def: "Steam CWE m³ × 6.28981", total: "합계", dash: "1.5 4" },
  { key: "bhp", label: "BHP", unit: "kPa", digits: 0, group: "inj", def: "Bottom-hole pressure (kPa)", total: "평균 (0 초과 값만 — 0 이하는 정지 Well 표시값으로 보고 제외)", dash: "18 5" },
];

export const wellMetric = (k: WellKey) => WELL_METRICS.find((m) => m.key === k)!;

/** Overlay groups metrics by unit, one y-axis per unit (Steam shares bbl/d as CWE). */
export const UNIT_PANELS: [string, WellKey[]][] = [["bbl/d", ["oil", "emulsion", "steam"]], ["m³/m³", ["sor", "wor"]], ["kPa", ["bhp"]]];

/** Σtop ÷ Σoil over the wells that have a top value and a non-zero oil value (the program's ratio()). */
export function ratio(tops: Val[], oils: Val[]): Val {
  let a = 0, b = 0, n = 0;
  tops.forEach((t, k) => {
    const o = oils[k];
    if (t !== null && o) { a += t; b += o; n++; }
  });
  return n && b ? a / b : null;
}

/** One well's value for a metric on day i (the program's wellValue()). */
export function wellValue(key: WellKey, w: WellRaw, i: number): Val {
  const o = w.oil[i] ?? null, wa = w.water[i] ?? null, st = w.steam[i] ?? null;
  if (key === "oil") return o === null ? null : o * BBL;
  if (key === "steam") return st === null ? null : st * BBL;
  if (key === "emulsion") return o === null || wa === null ? null : (o + wa) * BBL;
  if (key === "sor") return ratio([st], [o]);
  if (key === "wor") return ratio([wa], [o]);
  return w.bhp[i] ?? null;
}

/** Calculation basis for a well value (tooltip) */
export function wellDetail(key: WellKey, w: WellRaw, i: number): string {
  const r = (v: Val) => (v === null || v === undefined ? "–" : v.toLocaleString("en-US", { maximumFractionDigits: 1 }));
  if (key === "oil") return `원본 ${r(w.oil[i])} m³`;
  if (key === "steam") return `원본 ${r(w.steam[i])} CWE m³`;
  if (key === "emulsion") return `Oil ${r(w.oil[i])} + Water ${r(w.water[i])} m³`;
  if (key === "sor") return `Steam ${r(w.steam[i])} ÷ Oil ${r(w.oil[i])}`;
  if (key === "wor") return `Water ${r(w.water[i])} ÷ Oil ${r(w.oil[i])}`;
  return "";
}

/**
 * Selection Total for day i (the program's selectionTotal()) → [value, wells that contributed].
 * Missing values are skipped, not treated as zero; ratios are re-computed from the summed raw volumes, never
 * added up or averaged; BHP is the mean of values above 0.
 */
export function selectionTotal(key: WellKey, wells: WellRaw[], i: number): [Val, number] {
  const col = (m: keyof WellRaw) => wells.map((w) => w[m][i] ?? null);
  if (key === "oil" || key === "steam") {
    const v = col(key).filter((x): x is number => x !== null);
    return [v.length ? v.reduce((a, b) => a + b, 0) * BBL : null, v.length];
  }
  if (key === "emulsion") {
    const o = col("oil"), wa = col("water");
    const pairs = o.map((x, k) => [x, wa[k]] as const).filter((p): p is readonly [number, number] => p[0] !== null && p[1] !== null);
    return [pairs.length ? pairs.reduce((a, p) => a + p[0] + p[1], 0) * BBL : null, pairs.length];
  }
  if (key === "sor" || key === "wor") {
    const top = col(key === "sor" ? "steam" : "water"), o = col("oil");
    return [ratio(top, o), top.filter((t, k) => t !== null && o[k]).length];
  }
  const v = col("bhp").filter((x): x is number => x !== null && x > 0);
  return [v.length ? v.reduce((a, b) => a + b, 0) / v.length : null, v.length];
}

/** Formatting as on the dashboard */
export function fmt(v: Val | undefined, digits: number): string {
  if (v === null || v === undefined) return "–";
  return v.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

/** First → last visible value: latest value, % change vs the period start, period average */
export function change(points: [number, Val][]) {
  const have = points.filter((p): p is [number, number] => p[1] !== null);
  if (!have.length) return null;
  const [i0, first] = have[0], [i1, value] = have[have.length - 1];
  const avg = have.reduce((a, p) => a + p[1], 0) / have.length;
  const pct = i0 === i1 || !first ? null : ((value - first) / Math.abs(first)) * 100;
  return { i0, i1, value, first, avg, pct };
}

/**
 * Start → end comparison for a dragged range: the metric's value on the end day minus its value on the start day
 * (not the volume accumulated over the range). The % change is not computed when the start value is 0 or missing.
 */
export function pointChange(start: Val, end: Val): { diff: Val; pct: Val } {
  if (start === null || end === null) return { diff: null, pct: null };
  const diff = end - start;
  return { diff, pct: start === 0 ? null : (diff / start) * 100 };
}

/** Signed number for a change: "+1,000" / "-250" */
export const signed = (v: number, digits: number) => `${v > 0 ? "+" : v < 0 ? "-" : ""}${fmt(Math.abs(v), digits)}`;
