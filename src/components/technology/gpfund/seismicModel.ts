/**
 * Topic 1.2 conceptual seismic modelling in normalized units: a Ricker wavelet, convolution of a reflection
 * coefficient series with it, and a wedge model. Shapes follow the physics; there are no real values.
 */

/** Ricker wavelet sample at time t (samples) for peak frequency f (cycles per sample). */
export function ricker(t: number, f: number) {
  const a = Math.PI * Math.PI * f * f * t * t;
  return (1 - 2 * a) * Math.exp(-a);
}

/** Convolve sparse spikes { at: sample index, r: reflection coefficient } with a Ricker wavelet. */
export function synth(n: number, spikes: { at: number; r: number }[], f: number) {
  const out = new Array<number>(n).fill(0);
  const half = Math.ceil(1.6 / f);
  for (const s of spikes) {
    for (let k = -half; k <= half; k++) {
      const i = Math.round(s.at) + k;
      if (i >= 0 && i < n) out[i] += s.r * ricker(k + Math.round(s.at) - s.at, f);
    }
  }
  return out;
}

/** Normal-incidence reflection coefficient between two impedances. */
export const rc = (z1: number, z2: number) => (z2 - z1) / (z2 + z1);

/** Vertical wiggle path: samples run down the y axis from y0 with step dy, deflected about x by scale. */
export function wiggle(trace: number[], x: number, y0: number, dy: number, scale: number) {
  return "M" + trace.map((v, i) => `${(x + v * scale).toFixed(1)},${(y0 + i * dy).toFixed(1)}`).join(" L");
}

/** Filled positive lobes of a wiggle (the classic variable-area display). */
export function wiggleFill(trace: number[], x: number, y0: number, dy: number, scale: number) {
  let d = "";
  let open = false;
  trace.forEach((v, i) => {
    const y = (y0 + i * dy).toFixed(1);
    if (v > 0) {
      if (!open) { d += `M${x},${y} `; open = true; }
      d += `L${(x + v * scale).toFixed(1)},${y} `;
    } else if (open) {
      d += `L${x},${y} Z `;
      open = false;
    }
  });
  if (open) d += `L${x},${(y0 + (trace.length - 1) * dy).toFixed(1)} Z`;
  return d;
}
