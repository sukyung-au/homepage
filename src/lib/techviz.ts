/**
 * Procedural technical visualizations in the system's subsurface colormaps.
 * Stand-ins until real seismic / log / model exports are supplied. Deterministic per seed.
 */
type RGB = [number, number, number];
type RGBA = RGB | [number, number, number, number];
type Rand = () => number;
type Ctx = CanvasRenderingContext2D;
export interface VizOptions {
  fault: boolean;
  mask: boolean;
}

export function rng(seed: number): Rand {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const hex = (h: string): RGB => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const RAMP = ["#0B1F6B", "#1F4FD1", "#16A3D8", "#3CC48C", "#E9D43A", "#F29A1F", "#D6402B"].map(hex);
const SEIS = ["#1C3F9E", "#6F8FD0", "#F4F1EA", "#D88A70", "#B8322A"].map(hex);

function ramp(stops: RGB[], t: number): RGB {
  t = Math.max(0, Math.min(0.9999, t));
  const p = t * (stops.length - 1), i = Math.floor(p), f = p - i, a = stops[i], b = stops[i + 1];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
}

function waves(r: Rand, n: number, amp: number) {
  const w: [number, number, number][] = [];
  for (let i = 0; i < n; i++) w.push([(amp * (r() * 0.6 + 0.4)) / (i + 1), (i + 1) * (1.5 + r() * 2), r() * 6.28]);
  return (u: number) => w.reduce((s, [a, f, p]) => s + a * Math.sin(u * f + p), 0);
}

function pixels(ctx: Ctx, W: number, H: number, fn: (u: number, v: number) => RGBA) {
  const img = ctx.createImageData(W, H), d = img.data;
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const c = fn(x / W, y / H), i = (y * W + x) * 4;
      d[i] = c[0];
      d[i + 1] = c[1];
      d[i + 2] = c[2];
      d[i + 3] = c.length === 4 ? c[3] : 255;
    }
  ctx.putImageData(img, 0, 0);
}

function seismic(ctx: Ctx, W: number, H: number, r: Rand, opt: VizOptions) {
  const st = waves(r, 4, 0.05), fq = waves(r, 3, 4), fx = 0.58 + r() * 0.1, nz = () => r() * 0.16 - 0.08;
  pixels(ctx, W, H, (u, v) => {
    const bump = 0.13 * Math.exp(-(((u - 0.42) / 0.2) ** 2));
    let t = v + st(u) * 0.8 + bump * (0.4 + v * 0.6);
    if (opt.fault && u > fx + 0.22 * (v - 0.2)) t += 0.045;
    const f = 22 + fq(t * 3);
    let a = Math.sin(t * f * 6.28) * (0.55 + 0.45 * Math.sin(t * 41 + u * 2.1)) * (0.7 + 0.3 * Math.sin(t * 9));
    a += nz();
    return ramp(SEIS, (a + 1) / 2);
  });
}

function strata(ctx: Ctx, W: number, H: number, r: Rand, opt: VizOptions) {
  const st = waves(r, 3, 0.025), fx = 0.66;
  const L: [number, string][] = [[0, "#CFE5F1"], [0.1, "#E8DFCB"], [0.22, "#D5CDBE"], [0.33, "#E3D3AE"], [0.45, "#9DAFC2"], [0.53, "RES"], [0.63, "#7E8C9C"], [0.76, "#4A5160"], [0.9, "#363A44"]];
  const cols = L.map((l) => (l[1] === "RES" ? null : hex(l[1]))), oil = hex("#F29A1F"), oil2 = hex("#D6402B"), wat = hex("#7FA6C9");
  pixels(ctx, W, H, (u, v) => {
    const bump = 0.16 * Math.exp(-(((u - 0.4) / 0.22) ** 2));
    let t = v;
    if (v > 0.1) t = v + (bump + st(u)) * Math.min(1, (v - 0.1) * 4);
    if (opt.fault && u > fx + 0.18 * (v - 0.3) && v > 0.12) t -= 0.05;
    let k = 0;
    for (let i = 0; i < L.length; i++) if (t >= L[i][0]) k = i;
    if (v < 0.1) return cols[0]!;
    const c = L[k][1] === "RES" ? (v < 0.47 ? ramp([oil2, oil], (v - 0.32) / 0.15) : wat) : cols[k]!;
    const lam = 0.94 + 0.06 * Math.sin(t * 620 + Math.sin(u * 9) * 2);
    return [c[0] * lam, c[1] * lam, c[2] * lam];
  });
}

function field(r: Rand, n: number) {
  const b: [number, number, number, number][] = [];
  for (let i = 0; i < n; i++) b.push([r() * 0.8 + 0.1, r() * 0.8 + 0.1, 0.08 + r() * 0.18, r() * 1.4 - 0.4]);
  return (u: number, v: number) => b.reduce((s, [x, y, w, a]) => s + a * Math.exp(-((u - x) ** 2 + (v - y) ** 2) / (w * w)), 0);
}

function range(fn: (u: number, v: number) => number) {
  let mn = 1e9, mx = -1e9;
  for (let i = 0; i < 400; i++) {
    const q = fn((i % 20) / 20, Math.floor(i / 20) / 20);
    mn = Math.min(mn, q);
    mx = Math.max(mx, q);
  }
  return [mn, mx] as const;
}

function reservoir(ctx: Ctx, W: number, H: number, r: Rand, opt: VizOptions) {
  const fn = field(r, 9), edge = waves(r, 5, 0.06), [mn, mx] = range(fn), asp = W / H;
  pixels(ctx, W, H, (u, v) => {
    const dx = (u - 0.5) * asp, dy = v - 0.5, ang = Math.atan2(dy, dx), rad = Math.hypot(dx / (asp * 0.46), dy / 0.42);
    if (opt.mask && rad > 1 + edge(ang)) return [0, 0, 0, 0];
    const q = (fn(u, v) - mn) / (mx - mn), c = ramp(RAMP, q);
    const con = Math.abs(((q * 12) % 1) - 0.5) < 0.035 ? 0.72 : 1;
    const gx = (u * W) % 14 < 1 || (v * H) % 14 < 1 ? 0.93 : 1;
    return [c[0] * con * gx, c[1] * con * gx, c[2] * con * gx];
  });
}

function structure(ctx: Ctx, W: number, H: number, r: Rand) {
  const fn = field(r, 7), [mn, mx] = range(fn);
  const S = ["#0B1F6B", "#1F4FD1", "#16A3D8", "#9AD7EA", "#EEF4F8"].map(hex);
  pixels(ctx, W, H, (u, v) => {
    const q = (fn(u, v) - mn) / (mx - mn), c = ramp(S, q);
    const con = Math.abs(((q * 16) % 1) - 0.5) < 0.04 ? 0.8 : 1;
    return [c[0] * con, c[1] * con, c[2] * con];
  });
}

function wellLog(ctx: Ctx, w: number, h: number, r: Rand) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, w, h);
  const sand = waves(r, 6, 1), N = Math.floor(h / 2);
  const tr = ([[0, 0.12], [0.12, 0.34], [0.34, 0.56], [0.56, 0.78], [0.78, 1]] as const).map(([a, b]) => [a * w, b * w] as const);
  ctx.strokeStyle = "#DCE3EC";
  ctx.lineWidth = 1;
  tr.forEach(([a]) => { ctx.beginPath(); ctx.moveTo(a + 0.5, 0); ctx.lineTo(a + 0.5, h); ctx.stroke(); });
  for (let y = 0; y < h; y += h / 12) { ctx.beginPath(); ctx.moveTo(tr[1][0], y); ctx.lineTo(w, y); ctx.stroke(); }
  const z: number[] = [], gr: number[] = [], rs: number[] = [], rh: number[] = [], nph: number[] = [], hc: boolean[] = [];
  for (let i = 0; i <= N; i++) {
    const d = i / N, s = sand(d * 8) + 0.25 * Math.sin(d * 90 + r() * 0.3) + (r() - 0.5) * 0.35;
    const isS = s > 0.15, isHC = isS && d > 0.38 && d < 0.62;
    z.push(d * h);
    gr.push(isS ? 0.18 + r() * 0.1 : 0.7 + r() * 0.18);
    rs.push(isHC ? 0.75 + r() * 0.15 : isS ? 0.3 + r() * 0.08 : 0.2 + r() * 0.08);
    rh.push(isS ? 0.4 + r() * 0.06 : 0.62 + r() * 0.06);
    nph.push(isS ? (isHC ? 0.25 : 0.38) + r() * 0.05 : 0.7 + r() * 0.06);
    hc.push(isHC);
  }
  const X = (t: readonly [number, number], v: number) => t[0] + 8 + v * (t[1] - t[0] - 16);
  ctx.fillStyle = "rgba(242,154,31,0.22)";
  ctx.beginPath();
  ctx.moveTo(tr[1][0], 0);
  z.forEach((y, i) => ctx.lineTo(X(tr[1], gr[i]), y));
  ctx.lineTo(tr[1][0], h);
  ctx.fill();
  const line = (t: readonly [number, number], arr: number[], col: string, dash?: number[]) => {
    ctx.strokeStyle = col;
    ctx.lineWidth = 1.4;
    ctx.setLineDash(dash || []);
    ctx.beginPath();
    z.forEach((y, i) => (i ? ctx.lineTo(X(t, arr[i]), y) : ctx.moveTo(X(t, arr[i]), y)));
    ctx.stroke();
    ctx.setLineDash([]);
  };
  line(tr[1], gr, "#C77A10");
  line(tr[2], rs, "#0A5CDB");
  ctx.fillStyle = "rgba(214,64,43,0.16)";
  z.forEach((y, i) => { if (hc[i]) ctx.fillRect(X(tr[3], rh[i]), y, X(tr[3], nph[i]) - X(tr[3], rh[i]), h / N + 0.5); });
  line(tr[3], rh, "#D6402B");
  line(tr[3], nph, "#12A4D9", [4, 3]);
  z.forEach((y, i) => {
    ctx.fillStyle = hc[i] ? "#F29A1F" : gr[i] < 0.4 ? "#E3D3AE" : "#9DAFC2";
    ctx.fillRect(tr[4][0] + 8, y, tr[4][1] - tr[4][0] - 16, h / N + 0.5);
  });
  ctx.fillStyle = "#8A98A8";
  ctx.font = "10px Inter, sans-serif";
  for (let k = 1; k < 12; k++) ctx.fillText(String(2400 + k * 25), 6, (k * h) / 12 + 3);
}

function decline(ctx: Ctx, w: number, h: number, r: Rand) {
  ctx.clearRect(0, 0, w, h);
  const p = { l: 44, r: 16, t: 16, b: 28 }, W = w - p.l - p.r, H = h - p.t - p.b;
  ctx.strokeStyle = "#DCE3EC";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) { const y = p.t + (H * i) / 4; ctx.beginPath(); ctx.moveTo(p.l, y); ctx.lineTo(w - p.r, y); ctx.stroke(); }
  const N = 120;
  const s = (fn: (x: number) => number, col: string, width: number, dash?: number[]) => {
    ctx.strokeStyle = col;
    ctx.lineWidth = width;
    ctx.setLineDash(dash || []);
    ctx.beginPath();
    for (let i = 0; i <= N; i++) {
      const x = i / N, X = p.l + x * W, Y = p.t + H * (1 - fn(x));
      if (i) ctx.lineTo(X, Y); else ctx.moveTo(X, Y);
    }
    ctx.stroke();
    ctx.setLineDash([]);
  };
  const noise = () => (r() - 0.5) * 0.025;
  s((x) => (Math.min(0.92, x * 12) * 0.92) / (1 + 3.2 * x) ** 0.9 + noise(), "#0A5CDB", 2);
  s((x) => Math.max(0, (x - 0.2) * 1.05) ** 0.8 * 0.85, "#12A4D9", 1.6);
  s((x) => 0.88 - 0.42 * x - 0.08 * Math.sin(x * 3), "#0B1A2C", 1.2, [5, 4]);
  ctx.fillStyle = "#8A98A8";
  ctx.font = "10px Inter, sans-serif";
  ["0", "5", "10", "15", "20 yr"].forEach((t, i) => ctx.fillText(t, p.l + (W * i) / 4 - (i ? 8 : 0), h - 8));
}

export type VizKind = "seismic" | "strata" | "reservoir" | "structure" | "log" | "decline";

/** Raster kinds render per-pixel into a low-res buffer that is upscaled. */
export const RASTER: Partial<Record<VizKind, (ctx: Ctx, W: number, H: number, r: Rand, opt: VizOptions) => void>> = {
  seismic, strata, reservoir, structure,
};
/** Vector kinds draw directly at device resolution. */
export const VECTOR: Partial<Record<VizKind, (ctx: Ctx, w: number, h: number, r: Rand) => void>> = {
  log: wellLog, decline,
};
