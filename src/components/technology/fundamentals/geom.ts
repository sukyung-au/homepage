/**
 * Small geometry helpers for the conceptual diagrams of topic 3.2 (SVG user units, y grows downward).
 * Curves are smooth Catmull-Rom splines through hand-placed control points, sampled to polylines so the
 * same samples can be reused (e.g. to interpolate quality lines between the bubble- and dew-point curves).
 */
export type Pt = [number, number];

/** Dense samples of a Catmull-Rom spline through `pts` (endpoints included). */
export function spline(pts: Pt[], perSeg = 16): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    for (let k = 0; k < perSeg; k++) {
      const t = k / perSeg, t2 = t * t, t3 = t2 * t;
      const f = (a: number, b: number, c: number, d: number) =>
        0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

export const line = (pts: Pt[]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join("");

/** Resample a polyline to n points evenly by index along its length */
export function resample(pts: Pt[], n: number): Pt[] {
  const d = [0];
  for (let i = 1; i < pts.length; i++) d.push(d[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = d[d.length - 1], out: Pt[] = [];
  for (let k = 0; k < n; k++) {
    const s = (total * k) / (n - 1);
    let i = 1;
    while (i < d.length - 1 && d[i] < s) i++;
    const f = (s - d[i - 1]) / (d[i] - d[i - 1] || 1);
    out.push([pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f]);
  }
  return out;
}

/** y of a polyline at x (first crossing), or undefined */
export function yAtX(pts: Pt[], x: number): number | undefined {
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    if ((x0 - x) * (x1 - x) <= 0 && x0 !== x1) return y0 + ((x - x0) / (x1 - x0)) * (y1 - y0);
  }
  return undefined;
}
