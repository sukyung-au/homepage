/**
 * Topic 3.5 conceptual curves in normalized units (rate and pressure both 0–1). Shapes follow the relations
 * they illustrate — a straight-line IPR above the bubble point and Vogel's IPR below it; a J-shaped VLP with a
 * gravity/slip term that dominates at low rate and a friction term at high rate. Not any real well.
 */

export const PB = 0.6;
const J = 1;

/** Oil rate for a flowing bottomhole pressure (straight line above PB, Vogel below). */
export function iprRate(pr: number, pwf: number) {
  const pb = Math.min(PB, pr);
  const qb = J * Math.max(pr - pb, 0);
  if (pwf >= pb) return J * (pr - pwf);
  const x = pwf / pb;
  return qb + ((J * pb) / 1.8) * (1 - 0.2 * x - 0.8 * x * x);
}

/** Bottomhole pressure the tubing needs to lift a given rate; `lift` is pressure added by artificial lift. */
export function vlpPressure(q: number, pwh: number, lift = 0) {
  return pwh + 0.03 / (q + 0.06) + 0.6 * q * q - lift;
}

export const X = (q: number) => 56 + q * 480;
export const Y = (p: number) => 286 - p * 260;

export function iprPath(pr: number) {
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const pwf = pr - (pr * i) / 60;
    pts.push(`${X(iprRate(pr, pwf)).toFixed(1)},${Y(pwf).toFixed(1)}`);
  }
  return "M" + pts.join(" L");
}

export function vlpPath(pwh: number, lift = 0) {
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const q = 0.01 + (0.89 * i) / 60;
    const p = vlpPressure(q, pwh, lift);
    if (p > 1.05) continue;
    pts.push(`${X(q).toFixed(1)},${Y(Math.max(p, 0)).toFixed(1)}`);
  }
  return "M" + pts.join(" L");
}

/** The stable operating point: the highest-rate crossing of IPR and VLP, or null when the well cannot flow. */
export function operatingPoint(pr: number, pwh: number, lift = 0): { q: number; p: number } | null {
  let found: { q: number; p: number } | null = null;
  let prev: number | null = null;
  for (let i = 0; i <= 400; i++) {
    const pwf = pr - (pr * i) / 400;
    const q = iprRate(pr, pwf);
    const diff = vlpPressure(Math.max(q, 0.001), pwh, lift) - pwf;
    if (prev !== null && Math.sign(diff) !== Math.sign(prev)) found = { q, p: pwf };
    prev = diff;
  }
  return found;
}
