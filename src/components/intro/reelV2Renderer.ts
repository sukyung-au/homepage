/**
 * Canvas renderer for the v2 intro reel — pure 2D vector motion graphics, drawn as a function of time t (s).
 *
 *  0–1.5    Slam: seismic pulse + shockwaves, shattering into horizontal traces
 *  1.5–4    Seismic section scrolls; "WHERE COULD HYDROCARBONS EXIST?" word by word; cyan wipe
 *  4–7      Plunge past sea level; strata slam in on the 8ths, reflections flash, layers fold into an anticline;
 *           EXPLORATION → APPRAISAL
 *  7–10     Laser drill → amber impact → reservoir fills; platform, development wells, flow, production curve;
 *           DEVELOPMENT → PRODUCTION; build-up
 *  10–12.3  Drop: the section explodes into particles, camera rockets up, vortex; background turns daylight
 *  12.3–14  Particles converge onto the live Hero title / tagline / presenter (the canvas is transparent by then)
 *
 * The final targets are sampled from the real DOM text marked [data-reel-target], so the last frame is the Hero.
 */

const NAVY = [11, 26, 44], BG = [246, 248, 251];
const CYAN = "#12A4D9", AMBER = "#F29A1F", WHITE = "#FFFFFF";
/** Particle palette: [on dark, on daylight] */
const PALETTE: [number[], number[]][] = [
  [[18, 164, 217], [10, 92, 219]], // cyan → blue
  [[31, 79, 209], [11, 26, 44]], // blue → navy
  [[255, 255, 255], [11, 26, 44]], // white → navy
  [[242, 154, 31], [242, 154, 31]], // amber
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const eOutExpo = (x: number) => (x >= 1 ? 1 : 1 - 2 ** (-10 * x));
const eOutCubic = (x: number) => 1 - (1 - x) ** 3;
const eInCubic = (x: number) => x * x * x;
const eInOutCubic = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2);
const eOutBack = (x: number) => 1 + 2.70158 * (x - 1) ** 3 + 1.70158 * (x - 1) ** 2;
const gauss = (x: number) => Math.exp(-x * x);
const mix = (a: number[], b: number[], k: number) => `rgb(${a.map((v, i) => Math.round(lerp(v, b[i], k))).join(",")})`;

function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Timeline constants (s) — the soundtrack in reelAudioV2.ts uses the same beats */
const WORDS: [string, number][] = [["WHERE", 1.5], ["COULD", 2.0], ["HYDROCARBONS", 2.5], ["EXIST?", 3.0]];
const SLAM = [4.4, 4.65, 4.9, 5.15, 5.4, 5.65, 5.9];
const IMPACT = 7.25;
const DEV_WELLS: [number, number][] = [[-0.2, 7.75], [0.17, 8.0], [-0.09, 8.25]];
const DROP = 10.0;
const BIG: [string, number, number][] = [["EXPLORATION", 4.45, 5.65], ["APPRAISAL", 5.75, 6.95], ["DEVELOPMENT", 7.45, 8.62], ["PRODUCTION", 8.72, 9.9]];
/** Short shakes: [time, strength px] */
const SHAKES: [number, number][] = [[0.05, 16], [1.5, 4], [2.0, 4], [2.5, 5], [3.0, 5], ...SLAM.map((s) => [s + 0.2, 4] as [number, number]), [IMPACT, 14], [DROP, 18]];
/** Horizontal slice glitches: [start, strength] */
const SLICES: [number, number][] = [[1.5, 0.6], [2.0, 0.6], [2.5, 0.8], [3.0, 1], [8.6, 1.4], [DROP, 1.2]];

interface Particle { x: number; y: number; vx: number; vy: number; spin: number; size: number; c: number; d: number; tx: number; ty: number }

export function createRenderer(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;
  let W = 0, H = 0, dpr = 1;
  let particles: Particle[] | null = null;
  let targetsReady = false;
  let titleBox = { x: 0, y: 0, w: 0, h: 0 };
  let traceSeeds: number[] = [];

  const font = () => {
    const el = document.querySelector<HTMLElement>("[data-reel-target]");
    return (el && getComputedStyle(el).fontFamily) || "Inter, system-ui, sans-serif";
  };
  let family = "Inter, system-ui, sans-serif";

  function resize() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    family = font();
    particles = null;
    targetsReady = false;
    const r = rng(7);
    traceSeeds = Array.from({ length: 64 }, () => r());
  }
  resize();

  /* ── Cross-section geometry ── */
  const seaY = () => 0.16 * H;
  const cx = () => 0.56 * W;
  const BASES = [0.3, 0.42, 0.54, 0.66, 0.78, 0.9];
  const AMPS = [0.035, 0.055, 0.075, 0.1, 0.11, 0.09];
  const OWC = () => 0.62 * H;
  const foldAt = (t: number) => (t < 6.0 ? 0 : eOutBack(seg(t, 6.0, 6.7)));
  const seabed = (x: number) => seaY() + 0.07 * H + 0.004 * H * Math.sin(x / (0.05 * W));
  const hz = (k: number, x: number, fold: number) =>
    H * BASES[k] - fold * H * AMPS[k] * gauss((x - cx()) / (0.27 * W)) + H * 0.006 * Math.sin(x / (0.07 * W) + k * 1.7);
  /** Boundary i: 0 = seabed, 1..6 = horizons, 7 = bottom of the frame */
  const boundary = (i: number, x: number, fold: number) => (i === 0 ? seabed(x) : i === 7 ? H + 40 : hz(i - 1, x, fold));
  const resTop = (x: number, fold: number) => hz(3, x, fold);
  const crestY = (fold: number) => resTop(cx(), fold);
  const BANDS = ["#10304F", "#163B60", "#0F2A47", "#1A416A", "#0D2338", "#14345A", "#0B1F33"];
  const xs = () => { const a: number[] = []; for (let x = -40; x <= W + 40; x += 16) a.push(x); return a; };

  const shakeAt = (t: number) => {
    let a = 0;
    for (const [s, k] of SHAKES) if (t >= s && t < s + 0.6) a += k * Math.exp(-(t - s) * 9);
    return a;
  };
  const sliceAt = (t: number) => {
    let a = 0;
    for (const [s, k] of SLICES) if (t >= s && t < s + 0.14) a = Math.max(a, k * (1 - (t - s) / 0.14));
    return a;
  };

  function setFont(weight: number, size: number, spacing = "0px") {
    ctx.font = `${weight} ${size}px ${family}`;
    (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = spacing;
  }

  /* ── 0–1.5 s: slam ── */
  function slam(t: number) {
    const C = [W / 2, H / 2], diag = Math.hypot(W, H);
    const k = seg(t, 0.05, 0.55);
    // glowing core
    const core = 1 - seg(t, 0.05, 0.9);
    if (core > 0) {
      const g = ctx.createRadialGradient(C[0], C[1], 0, C[0], C[1], 0.22 * H);
      g.addColorStop(0, `rgba(255,255,255,${core})`);
      g.addColorStop(0.25, `rgba(18,164,217,${0.8 * core})`);
      g.addColorStop(1, "rgba(18,164,217,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }
    // shockwave rings
    [0, 0.07, 0.15].forEach((d, i) => {
      const p = seg(t, 0.05 + d, 0.75 + d);
      if (p <= 0 || p >= 1) return;
      ctx.strokeStyle = `rgba(18,164,217,${1 - p})`;
      ctx.lineWidth = (6 - i * 2) * (1 - p) + 1;
      ctx.beginPath();
      ctx.arc(C[0], C[1], eOutExpo(p) * diag * 0.55, 0, Math.PI * 2);
      ctx.stroke();
    });
    // geometric shards
    const r = rng(3);
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2 + r() * 0.3, dist = eOutExpo(k) * diag * (0.25 + r() * 0.35), sz = 10 + r() * 26;
      const alpha = 1 - seg(t, 0.4, 1.1);
      if (alpha <= 0) break;
      ctx.save();
      ctx.translate(C[0] + Math.cos(a) * dist, C[1] + Math.sin(a) * dist);
      ctx.rotate(a + t * 6 * (r() - 0.5));
      ctx.fillStyle = i % 3 === 0 ? `rgba(255,255,255,${alpha})` : `rgba(18,164,217,${alpha})`;
      ctx.beginPath();
      ctx.moveTo(sz, 0);
      ctx.lineTo(-sz * 0.5, sz * 0.35);
      ctx.lineTo(-sz * 0.5, -sz * 0.35);
      ctx.fill();
      ctx.restore();
    }
    // shatter into horizontal traces
    const sp = eOutCubic(seg(t, 0.5, 1.4));
    const fade = 1 - seg(t, 1.35, 1.7);
    if (sp > 0 && fade > 0) {
      ctx.lineWidth = 1.6;
      for (let j = 0; j < 44; j++) {
        const y = H / 2 + (j - 21.5) * (H / 44), half = sp * W * (0.35 + traceSeeds[j] * 0.4);
        ctx.strokeStyle = `rgba(18,164,217,${fade * (0.55 + traceSeeds[j] * 0.45)})`;
        ctx.beginPath();
        for (let x = W / 2 - half; x <= W / 2 + half; x += 6) {
          const amp = 6 * Math.exp(-Math.abs(x - W / 2) / (0.3 * W)) * (1 - seg(t, 0.6, 1.6) * 0.6);
          const y2 = y + amp * Math.sin(x / 9 + traceSeeds[j] * 40 + t * 30);
          if (x === W / 2 - half) ctx.moveTo(x, y2); else ctx.lineTo(x, y2);
        }
        ctx.stroke();
      }
    }
  }

  /* ── 1.5–4 s: scrolling seismic section + kinetic words ── */
  function seismic(t: number) {
    const a = seg(t, 1.3, 1.7) * (1 - seg(t, 3.85, 4.0));
    if (a <= 0) return;
    const scroll = (t - 1.3) * 0.9 * W;
    const reflectors = 9;
    ctx.lineWidth = 1.3;
    for (let sx = -10; sx < W + 10; sx += 11) {
      const u = sx + scroll;
      ctx.strokeStyle = `rgba(18,164,217,${0.75 * a})`;
      ctx.beginPath();
      for (let y = 0; y <= H; y += 4) {
        let w = 0;
        for (let r = 0; r < reflectors; r++) {
          const Y = H * (0.12 + 0.1 * r) + 0.05 * H * Math.sin(u / (0.3 * W) + r * 0.9) - 0.04 * H * gauss((((u / W) % 1.4) - 0.7) / 0.25);
          const d = (y - Y) / 7;
          w += (1 - 2 * d * d) * Math.exp(-d * d) * (r % 2 ? 1 : -0.8);
        }
        const x = sx + w * 5;
        if (y === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    // vignette for the words
    const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 0.6 * W);
    g.addColorStop(0, `rgba(0,0,0,${0.6 * a})`);
    g.addColorStop(0.45, `rgba(0,0,0,${0.25 * a})`);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  function words(t: number) {
    if (t < 1.45 || t > 4.0) return;
    const fs = Math.min(0.074 * W, 0.12 * H);
    setFont(700, fs, `${-0.02 * fs}px`);
    ctx.textBaseline = "alphabetic";
    const widths = WORDS.map(([w]) => ctx.measureText(w).width), gap = 0.3 * fs;
    const lines = [[0, 1], [2, 3]];
    const lh = fs * 1.02;
    lines.forEach((ln, li) => {
      const total = ln.reduce((s, i) => s + widths[i], 0) + gap * (ln.length - 1);
      let x = W / 2 - total / 2;
      const y = H / 2 + (li - 0.5) * lh + fs * 0.36;
      ln.forEach((i) => {
        const [w, at] = WORDS[i];
        const k = seg(t, at, at + 0.2);
        if (k > 0) {
          const sc = lerp(1.9, 1, eOutBack(k)), cxw = x + widths[i] / 2;
          const flash = 1 - seg(t, at, at + 0.25);
          ctx.save();
          ctx.translate(cxw, y - fs * 0.35);
          ctx.scale(sc, sc);
          ctx.globalAlpha = clamp(k * 4);
          // motion trail
          if (k < 1) {
            ctx.fillStyle = "rgba(18,164,217,0.35)";
            ctx.fillText(w, -widths[i] / 2 - 0.12 * fs * (1 - k), fs * 0.35);
          }
          ctx.fillStyle = flash > 0 ? mix([18, 164, 217], [255, 255, 255], 1 - flash) : WHITE;
          ctx.fillText(w, -widths[i] / 2, fs * 0.35);
          ctx.restore();
        }
        x += widths[i] + gap;
      });
    });
  }

  function wipe(t: number) {
    const k = seg(t, 3.72, 4.0);
    if (k <= 0 || k >= 1) return;
    const x = eInOutCubic(k) * 1.35 * W - 0.15 * W, skew = 0.18 * H;
    ctx.fillStyle = "rgb(11,26,44)";
    ctx.beginPath();
    ctx.moveTo(-10, 0); ctx.lineTo(x + skew, 0); ctx.lineTo(x - skew, H); ctx.lineTo(-10, H);
    ctx.fill();
    ctx.fillStyle = CYAN;
    const bw = 0.05 * W;
    ctx.beginPath();
    ctx.moveTo(x + skew, 0); ctx.lineTo(x + skew + bw, 0); ctx.lineTo(x - skew + bw, H); ctx.lineTo(x - skew, H);
    ctx.fill();
  }

  /* ── 4–10 s: the cross-section ── */
  function section(t: number) {
    if (t < 4.0 || t >= DROP) return;
    const fold = foldAt(t), X = xs(), sy = seaY();
    // water / sky
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#081422");
    g.addColorStop(0.16, "#0A1A2C");
    g.addColorStop(0.17, "#0B2A45");
    g.addColorStop(1, "#08182A");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // plunge: sea line whips up from below, speed lines
    const pl = seg(t, 4.0, 4.38);
    const lineY = lerp(1.15 * H, sy, eOutExpo(pl));
    if (pl < 1) {
      const r = rng(11);
      ctx.strokeStyle = "rgba(255,255,255,0.35)";
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 46; i++) {
        const x = r() * W, len = (0.1 + r() * 0.3) * H, y = ((1 - pl) * 2.2 * H + r() * H) % (H + len) - len;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + len); ctx.stroke();
      }
    }

    // strata bands slam in on the 8ths
    for (let i = 0; i < 7; i++) {
      const s0 = SLAM[i];
      if (t < s0) continue;
      const k = seg(t, s0, s0 + 0.22), dir = i % 2 ? 1 : -1;
      const off = dir * (1 - eOutBack(k)) * 1.15 * W;
      ctx.save();
      ctx.translate(off, 0);
      ctx.fillStyle = BANDS[i];
      ctx.beginPath();
      X.forEach((x, j) => (j ? ctx.lineTo(x, boundary(i, x, fold)) : ctx.moveTo(x, boundary(i, x, fold))));
      [...X].reverse().forEach((x) => ctx.lineTo(x, boundary(i + 1, x, fold)));
      ctx.fill();
      // reflection flash on landing, softer glow while folding
      const land = t > s0 + 0.22 ? Math.exp(-(t - s0 - 0.22) * 4) : 0;
      const foldGlow = t > 6.0 && t < 7.0 ? 0.5 * Math.sin(seg(t, 6.0, 7.0) * Math.PI) : 0;
      const glow = Math.max(land, foldGlow);
      ctx.strokeStyle = `rgba(18,164,217,${0.22 + 0.78 * glow})`;
      ctx.lineWidth = 1 + 2.5 * glow;
      if (glow > 0.05) { ctx.shadowColor = CYAN; ctx.shadowBlur = 18 * glow; }
      ctx.beginPath();
      X.forEach((x, j) => (j ? ctx.lineTo(x, boundary(i, x, fold)) : ctx.moveTo(x, boundary(i, x, fold))));
      ctx.stroke();
      ctx.restore();
    }

    // sea level
    ctx.strokeStyle = WHITE;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, lineY); ctx.lineTo(W, lineY); ctx.stroke();

    if (t >= 7.0) development(t, fold);
  }

  function accumPath(fold: number) {
    const X = xs().filter((x) => resTop(x, fold) < OWC());
    ctx.beginPath();
    X.forEach((x, j) => (j ? ctx.lineTo(x, resTop(x, fold)) : ctx.moveTo(x, resTop(x, fold))));
    [...X].reverse().forEach((x) => ctx.lineTo(x, Math.min(OWC(), hz(4, x, fold))));
    ctx.closePath();
    return X;
  }
  const devWellPt = (dx: number, u: number, fold: number): [number, number] => {
    const x0 = cx(), y0 = seaY(), tx = cx() + dx * W, ty = resTop(tx, fold) + 4;
    const c1 = [x0, y0 + 0.22 * H], c2 = [tx, ty - 0.16 * H], v = 1 - u;
    return [v ** 3 * x0 + 3 * v * v * u * c1[0] + 3 * v * u * u * c2[0] + u ** 3 * tx, v ** 3 * y0 + 3 * v * v * u * c1[1] + 3 * v * u * u * c2[1] + u ** 3 * ty];
  };

  function development(t: number, fold: number) {
    const x0 = cx(), y0 = seaY(), cy = crestY(fold);
    // reservoir fill grows from the crest
    if (t > IMPACT) {
      const r = eOutCubic(seg(t, IMPACT + 0.05, IMPACT + 0.7)) * 0.55 * W;
      ctx.save();
      ctx.beginPath(); ctx.arc(x0, cy, r, 0, Math.PI * 2); ctx.clip();
      accumPath(fold);
      ctx.fillStyle = AMBER;
      ctx.shadowColor = AMBER; ctx.shadowBlur = 30;
      ctx.fill();
      ctx.restore();
    }
    // flow toward the wells
    if (t > 8.3) {
      const a = seg(t, 8.3, 8.6), r = rng(5), X = xs().filter((x) => resTop(x, fold) < OWC());
      if (X.length) {
        const lo = X[0], hi = X[X.length - 1], wells = [x0, ...DEV_WELLS.map(([dx]) => x0 + dx * W)];
        ctx.fillStyle = `rgba(255,236,200,${0.95 * a})`;
        for (let i = 0; i < 110; i++) {
          const sx = lerp(lo, hi, r()), tx = wells.reduce((b, w) => (Math.abs(w - sx) < Math.abs(b - sx) ? w : b), wells[0]);
          const f = (t * (0.7 + r() * 0.6) + r()) % 1, x = lerp(sx, tx, f);
          const y = (resTop(x, fold) + Math.min(OWC(), hz(4, x, fold))) / 2 + (r() - 0.5) * 0.02 * H;
          ctx.beginPath(); ctx.arc(x, y, 1.8, 0, Math.PI * 2); ctx.fill();
        }
      }
    }
    // laser drill
    const lk = seg(t, 7.0, IMPACT);
    const headY = lerp(y0, cy, eInCubic(lk));
    ctx.save();
    ctx.strokeStyle = WHITE;
    ctx.lineWidth = t < IMPACT + 0.3 ? 3.5 : 2;
    ctx.shadowColor = CYAN; ctx.shadowBlur = t < IMPACT + 0.3 ? 24 : 6;
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, headY); ctx.stroke();
    if (lk < 1) { ctx.fillStyle = WHITE; ctx.beginPath(); ctx.arc(x0, headY, 6, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
    // development wells
    DEV_WELLS.forEach(([dx, at]) => {
      const p = eOutCubic(seg(t, at, at + 0.3));
      if (p <= 0) return;
      ctx.strokeStyle = "rgba(255,255,255,0.85)";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      for (let i = 0; i <= 40; i++) {
        const [x, y] = devWellPt(dx, (i / 40) * p, fold);
        if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
      }
      ctx.stroke();
    });
    // platform glyph
    const pk = eOutBack(seg(t, 7.55, 7.8));
    if (pk > 0) {
      ctx.save();
      ctx.translate(x0, y0);
      ctx.scale(pk, pk);
      const u = 0.012 * W;
      ctx.fillStyle = WHITE;
      ctx.fillRect(-2.6 * u, -1.6 * u, 5.2 * u, 0.45 * u);
      ctx.strokeStyle = WHITE; ctx.lineWidth = 2;
      ctx.beginPath();
      [-2, -0.7, 0.7, 2].forEach((lx) => { ctx.moveTo(lx * u, -1.15 * u); ctx.lineTo(lx * u * 1.15, 0); });
      ctx.moveTo(-0.8 * u, -1.6 * u); ctx.lineTo(0, -4.2 * u); ctx.lineTo(0.8 * u, -1.6 * u);
      ctx.stroke();
      ctx.restore();
    }
    // impact
    const ik = seg(t, IMPACT, IMPACT + 0.55);
    if (ik > 0 && ik < 1) {
      const g = ctx.createRadialGradient(x0, cy, 0, x0, cy, (0.08 + 0.6 * eOutCubic(ik)) * H);
      g.addColorStop(0, `rgba(255,255,255,${1 - ik})`);
      g.addColorStop(0.3, `rgba(242,154,31,${0.85 * (1 - ik)})`);
      g.addColorStop(1, "rgba(242,154,31,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }
    // production curve across the frame
    const pc = eInOutCubic(seg(t, 8.5, 9.75));
    if (pc > 0) {
      const xA = 0.06 * W, xB = 0.94 * W, yLow = 0.42 * H, top = 0.08 * H;
      ctx.strokeStyle = "rgba(255,255,255,0.18)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(xA, top - 0.02 * H); ctx.lineTo(xA, yLow); ctx.lineTo(xB, yLow); ctx.stroke();
      ctx.save();
      ctx.strokeStyle = AMBER; ctx.lineWidth = 3; ctx.shadowColor = AMBER; ctx.shadowBlur = 16;
      ctx.beginPath();
      for (let i = 0; i <= 120 * pc; i++) {
        const u = i / 120, rise = u < 0.1 ? eOutCubic(u / 0.1) : Math.exp(-(u - 0.1) * 2.2);
        const x = lerp(xA, xB, u), y = lerp(yLow, top, rise);
        if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
      }
      ctx.stroke();
      ctx.restore();
    }
  }

  function bigWords(t: number) {
    ctx.textBaseline = "alphabetic";
    for (const [w, t0, t1] of BIG) {
      if (t < t0 || t > t1) continue;
      let fs = Math.min(0.15 * W, 0.26 * H);
      setFont(300, fs, `${-0.025 * fs}px`);
      const fit = (0.91 * W) / ctx.measureText(w).width;
      if (fit < 1) { fs *= fit; setFont(300, fs, `${-0.025 * fs}px`); }
      const xAt = (tt: number) => {
        const enter = eOutExpo(seg(tt, t0, t0 + 0.3)), exit = eInCubic(seg(tt, t1 - 0.17, t1));
        return 0.045 * W + (1 - enter) * 1.0 * W - exit * 1.4 * W - (tt - t0) * 0.03 * W;
      };
      const x = xAt(t), v = x - xAt(t - 1 / 60), y = H * 0.93;
      for (let i = 3; i >= 1; i--) {
        ctx.fillStyle = `rgba(18,164,217,${0.12 * (4 - i)})`;
        if (Math.abs(v) > 2) ctx.fillText(w, x - v * i * 0.9, y);
      }
      ctx.fillStyle = WHITE;
      ctx.fillText(w, x, y);
    }
  }

  /* ── 10–14 s: drop, vortex, converge ── */
  function buildParticles(t: number) {
    const fold = foldAt(t), r = rng(21), P: Particle[] = [];
    const C = [cx(), crestY(fold)];
    const add = (x: number, y: number, c: number, speed: number) => {
      const dx = x - C[0], dy = y - C[1], len = Math.hypot(dx, dy) || 1, sp = speed * 0.45 * (0.3 + r());
      P.push({ x, y, vx: (dx / len) * sp + (r() - 0.5) * 300, vy: (dy / len) * sp + (r() - 0.5) * 300, spin: 0.5 + r() * 0.9, size: 2 + r() * 2.8, c, d: r() * 0.22, tx: W / 2, ty: H / 2 });
    };
    for (let i = 0; i < 7; i++) for (let x = 0; x <= W; x += 7) add(x, boundary(i, x, fold), 0, 1100);
    for (let n = 0; n < 1100; n++) { const x = r() * W, i = Math.floor(r() * 6); add(x, lerp(boundary(i, x, fold), boundary(i + 1, x, fold), r()), 1, 800); }
    const X = xs().filter((x) => resTop(x, fold) < OWC());
    if (X.length) for (let n = 0; n < 520; n++) { const x = lerp(X[0], X[X.length - 1], r()), top = resTop(x, fold); if (top < OWC()) add(x, lerp(top, Math.min(OWC(), hz(4, x, fold)), r()), 3, 1500); }
    for (let n = 0; n < 60; n++) add(cx(), lerp(seaY(), crestY(fold), r()), 2, 900);
    DEV_WELLS.forEach(([dx]) => { for (let n = 0; n < 30; n++) { const [x, y] = devWellPt(dx, r(), fold); add(x, y, 2, 900); } });
    for (let x = 0; x <= W; x += 14) add(x, seaY(), 2, 700);
    for (let n = 0; n < 140; n++) { const u = r(), rise = u < 0.1 ? eOutCubic(u / 0.1) : Math.exp(-(u - 0.1) * 2.2); add(lerp(0.06 * W, 0.94 * W, u), lerp(0.42 * H, 0.08 * H, rise), 3, 900); }
    return P;
  }

  /** Sample the live Hero text (title, tagline, presenter) into particle targets. */
  function buildTargets(P: Particle[]) {
    const off = document.createElement("canvas");
    off.width = Math.ceil(W);
    off.height = Math.ceil(H);
    const o = off.getContext("2d", { willReadFrequently: true })!;
    o.fillStyle = "#000";
    let bx0 = Infinity, by0 = Infinity, bx1 = -Infinity, by1 = -Infinity;
    document.querySelectorAll<HTMLElement>("[data-reel-target]").forEach((el) => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        const text = n.textContent ?? "", cs = getComputedStyle(n.parentElement!);
        o.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        (o as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing;
        o.textBaseline = "alphabetic";
        for (let i = 0; i < text.length; i++) {
          const ch = cs.textTransform === "uppercase" ? text[i].toUpperCase() : text[i];
          if (!ch.trim()) continue;
          const range = document.createRange();
          range.setStart(n, i);
          range.setEnd(n, i + 1);
          const rc = range.getBoundingClientRect();
          if (!rc.width) continue;
          o.fillText(ch, rc.left, rc.top + o.measureText(ch).fontBoundingBoxAscent);
          if (el.tagName === "H1") { bx0 = Math.min(bx0, rc.left); by0 = Math.min(by0, rc.top); bx1 = Math.max(bx1, rc.right); by1 = Math.max(by1, rc.bottom); }
        }
      }
    });
    const img = o.getImageData(0, 0, off.width, off.height).data, pts: [number, number][] = [];
    for (let y = 0; y < off.height; y += 2) for (let x = 0; x < off.width; x += 2) if (img[(y * off.width + x) * 4 + 3] > 120) pts.push([x, y]);
    const r = rng(33);
    for (let i = pts.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [pts[i], pts[j]] = [pts[j], pts[i]]; }
    P.forEach((p, i) => {
      const q = pts.length ? pts[i % pts.length] : [W / 2, H / 2];
      p.tx = q[0] + (r() - 0.5);
      p.ty = q[1] + (r() - 0.5);
    });
    titleBox = isFinite(bx0) ? { x: bx0, y: by0, w: bx1 - bx0, h: by1 - by0 } : { x: W * 0.1, y: H * 0.3, w: W * 0.4, h: H * 0.2 };
  }

  function drop(t: number, day: number) {
    if (t < DROP) return;
    if (!particles) particles = buildParticles(DROP - 0.001);
    if (!targetsReady && t > 11.6) { buildTargets(particles); targetsReady = true; }
    const tau = t - DROP, C = [W / 2, H / 2];
    const rocket = 0.3 * H * eOutCubic(seg(t, DROP, DROP + 1.0)) * (1 - eInOutCubic(seg(t, 11.0, 12.2)));
    const squeeze = lerp(1, 0.62, eInOutCubic(seg(t, 10.6, 12.3)));
    const fade = 1 - seg(t, 13.2, 13.75);
    if (fade <= 0) return;

    // speed lines while the camera rockets up
    const sl = seg(t, DROP, DROP + 1.1);
    if (sl < 1) {
      const r = rng(17);
      ctx.strokeStyle = `rgba(255,255,255,${0.4 * (1 - sl)})`;
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 60; i++) {
        const x = r() * W, len = (0.15 + r() * 0.35) * H, y = (r() * H + sl * 3 * H) % (H + len) - len;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + len); ctx.stroke();
      }
    }

    const cols = PALETTE.map(([a, b]) => mix(a, b, day));
    const buckets: Particle[][] = [[], [], [], []];
    particles.forEach((p) => buckets[p.c].push(p));
    buckets.forEach((list, c) => {
      ctx.fillStyle = cols[c];
      ctx.globalAlpha = fade;
      for (const p of list) {
        const e = (1 - Math.exp(-2.2 * tau)) / 2.2;
        let x = p.x + p.vx * e - C[0], y = p.y + p.vy * e + rocket - C[1];
        const ang = p.spin * tau * tau * 0.55;
        const rx = (x * Math.cos(ang) - y * Math.sin(ang)) * squeeze, ry = (x * Math.sin(ang) + y * Math.cos(ang)) * squeeze;
        x = rx + C[0]; y = ry + C[1];
        const k = targetsReady ? eInOutCubic(seg(t, 12.35 + p.d, 13.15 + p.d)) : 0;
        x = lerp(x, p.tx, k);
        y = lerp(y, p.ty, k);
        const sz = lerp(p.size, 1.6, k);
        ctx.fillRect(x - sz / 2, y - sz / 2, sz, sz);
      }
    });
    ctx.globalAlpha = 1;
  }

  /** Contour-map rings radiating behind the converged title. */
  function radiate(t: number) {
    const a = seg(t, 12.8, 13.3) * (1 - seg(t, 14.15, 14.6));
    if (a <= 0) return;
    const ccx = titleBox.x + titleBox.w * 0.5, ccy = titleBox.y + titleBox.h * 0.5;
    const g = ctx.createRadialGradient(ccx, ccy, 0, ccx, ccy, 0.55 * W);
    g.addColorStop(0, `rgba(18,164,217,${0.14 * a})`);
    g.addColorStop(1, "rgba(18,164,217,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    const grow = eOutCubic(seg(t, 12.8, 14.4));
    ctx.lineWidth = 1;
    for (let j = 1; j <= 7; j++) {
      ctx.strokeStyle = `rgba(10,92,219,${0.16 * a * (1 - j / 9)})`;
      ctx.beginPath();
      ctx.ellipse(ccx, ccy, (0.12 + 0.11 * j + 0.05 * grow) * W, (0.06 + 0.055 * j + 0.025 * grow) * W, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  /* ── Frame ── */
  function draw(t: number) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    // background: black → navy section → daylight → transparent (the Hero page shows through)
    const day = eInOutCubic(seg(t, 11.5, 12.3));
    const bgAlpha = 1 - seg(t, 12.3, 12.55);
    if (bgAlpha > 0) {
      ctx.globalAlpha = bgAlpha;
      ctx.fillStyle = t < 4 ? "#000" : mix(NAVY, BG, day);
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;
    }

    const sh = shakeAt(t), r = rng(Math.floor(t * 60));
    ctx.save();
    ctx.translate((r() - 0.5) * 2 * sh, (r() - 0.5) * 2 * sh);
    const zoom = 1 + 0.05 * eInCubic(seg(t, 9.0, 9.9)) * (t < DROP ? 1 : 0);
    if (zoom > 1) { ctx.translate(W / 2, H / 2); ctx.scale(zoom, zoom); ctx.translate(-W / 2, -H / 2); }

    if (t < 1.8) slam(t);
    if (t >= 1.3 && t < 4.0) seismic(t);
    section(t);
    words(t);
    if (t >= 4.4 && t < DROP) bigWords(t);
    wipe(t);
    ctx.restore();

    // pre-drop breath, drop flash
    if (t > 9.88 && t < DROP) { ctx.fillStyle = "rgba(0,0,0,0.55)"; ctx.fillRect(0, 0, W, H); }
    const fl = seg(t, DROP, DROP + 0.3);
    if (t >= DROP && fl < 1) { ctx.fillStyle = `rgba(255,255,255,${0.75 * (1 - fl)})`; ctx.fillRect(0, 0, W, H); }

    radiate(t);
    drop(t, day);

    // horizontal slice glitch
    const sa = sliceAt(t);
    if (sa > 0) {
      const bands = [[0.18, 0.12, 1], [0.44, 0.1, -1], [0.66, 0.08, 1], [0.82, 0.06, -1]];
      for (const [y, h, d] of bands) {
        const off = d * sa * 0.05 * W;
        ctx.drawImage(canvas, 0, y * H * dpr, W * dpr, h * H * dpr, off, y * H, W, h * H);
      }
    }
  }

  /** Idle frame while waiting for the start key. */
  function idle(now: number) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = `rgba(18,164,217,${0.45 + 0.4 * Math.sin(now / 300)})`;
    ctx.beginPath(); ctx.arc(W / 2, H / 2, 3, 0, Math.PI * 2); ctx.fill();
  }

  return { draw, idle, resize };
}
