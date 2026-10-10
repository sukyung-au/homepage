/**
 * Canvas renderer for the v2 intro reel — pure 2D vector motion graphics, drawn as a function of time t (s).
 *
 *  0–1.5    Slam: seismic pulse + shockwaves, shattering into horizontal traces
 *  1.5–4    Seismic section scrolls; "WHERE COULD HYDROCARBONS EXIST?" word by word; cyan wipe
 *  4–7      Plunge past sea level; strata slam in on the 8ths, reflections flash, layers fold into an anticline;
 *           EXPLORATION → APPRAISAL
 *  7–10     Laser drill → amber impact → reservoir fills; platform, development wells, flow, production curve;
 *           DEVELOPMENT → PRODUCTION; build-up
 *  10–12.6  Drop → surfacing (no hard cut: a light flash, the zoom eases back, the sea and platform glyph of the
 *           4–10 s frame dissolve into the overburden): the camera rockets up from the reservoir through the strata (10–11), past the
 *           seabed into the sea, which brightens toward the surface while bubbles rise (11–12), breaks the
 *           surface with a short white flash (~12.08) and eases to rest with the waterline on the Hero photo's
 *           horizon; sky, sea and a navy platform silhouette settle onto the photo
 *  12.7–13.5  The canvas crossfades into the Hero photo (shown under it from 12.3), silhouette into platform
 *
 * The rest position and the platform are measured from the live Hero photo marked [data-reel-photo].
 * Canvas type uses the font family of the Hero text marked [data-reel-target].
 */

const NAVY = [11, 26, 44], BG = [246, 248, 251], CYAN_RGB = [18, 164, 217];
const CYAN = "#12A4D9", AMBER = "#F29A1F", WHITE = "#FFFFFF";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const eOutExpo = (x: number) => (x >= 1 ? 1 : 1 - 2 ** (-10 * x));
const eOutCubic = (x: number) => 1 - (1 - x) ** 3;
const eInCubic = (x: number) => x * x * x;
const eInOutCubic = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2);
const eOutBack = (x: number) => 1 + 2.70158 * (x - 1) ** 3 + 1.70158 * (x - 1) ** 2;
const gauss = (x: number) => Math.exp(-x * x);
const blend = (a: number[], b: number[], k: number) => a.map((v, i) => lerp(v, b[i], k));
const rgb = (c: number[]) => `rgb(${c.map(Math.round).join(",")})`;
const mix = (a: number[], b: number[], k: number) => rgb(blend(a, b, k));
/** Piecewise-linear colour ramp over [position, rgb] stops */
const ramp = (stops: [number, number[]][], p: number) => {
  let i = 0;
  while (i < stops.length - 2 && p > stops[i + 1][0]) i++;
  const [p0, c0] = stops[i], [p1, c1] = stops[i + 1];
  return blend(c0, c1, clamp((p - p0) / (p1 - p0)));
};

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
/** Canvas background is gone from here (ShowReelV2 POSTER_AT) */
const POSTER = 12.3;
/** Surface break flash; the camera comes to rest */
const SURFACE = 12.08, REST = 12.6;
/** Hero photo (public/hero-surface.webp): fallback size, horizon as a fraction of its height, and its colours
 *  sampled from the image — sky from the top edge to the horizon, sea by depth below the horizon */
const PHOTO_W = 1536, PHOTO_H = 1024, HZ = 0.422;
const SKY_PHOTO: [number, number[]][] = [[0, [102, 164, 229]], [0.3, [121, 179, 237]], [0.6, [153, 199, 239]], [0.85, [190, 214, 237]], [1, [198, 216, 236]]];
const SEA_PHOTO: [number, number[]][] = [[0, [92, 145, 201]], [0.14, [85, 137, 193]], [0.27, [80, 130, 185]], [0.39, [68, 120, 174]], [0.52, [40, 98, 151]]];
const BIG: [string, number, number][] = [["EXPLORATION", 4.45, 5.65], ["APPRAISAL", 5.75, 6.95], ["DEVELOPMENT", 7.45, 8.62], ["PRODUCTION", 8.72, 9.9]];
/** Short shakes: [time, strength px] */
const SHAKES: [number, number][] = [[0.05, 16], [1.5, 4], [2.0, 4], [2.5, 5], [3.0, 5], ...SLAM.map((s) => [s + 0.2, 4] as [number, number]), [IMPACT, 14], [DROP, 6], [SURFACE, 6]];
/** Horizontal slice glitches: [start, strength] */
const SLICES: [number, number][] = [[1.5, 0.6], [2.0, 0.6], [2.5, 0.8], [3.0, 1], [8.6, 1.4], [DROP, 0.4]];

interface PhotoFit { x: number; w: number; h: number; hY: number }

export function createRenderer(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;
  let W = 0, H = 0, dpr = 1;
  let traceSeeds: number[] = [];
  let fit: PhotoFit | null = null;

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
    fit = null;
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
    topGlyph(t, eOutBack(seg(t, 7.55, 7.8)));
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
    prodCurve(t);
  }

  /** Into the drop the platform glyph and the production curve fade out (they finish in surfacing()). */
  const dropOut = (t: number) => 1 - seg(t, 9.8, 10.1);

  function topGlyph(t: number, pk: number) {
    const a = dropOut(t);
    if (pk <= 0 || a <= 0) return;
    ctx.save();
    ctx.globalAlpha *= a;
    ctx.translate(cx(), seaY());
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

  /** Production curve across the frame */
  function prodCurve(t: number) {
    const pc = eInOutCubic(seg(t, 8.5, 9.75)), a = dropOut(t);
    if (pc > 0 && a > 0) {
      ctx.save();
      ctx.globalAlpha *= a;
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

  /* ── 10–13.5 s: surfacing — the camera rises from the reservoir through the strata and the sea, breaks the
     surface and settles on the Hero photo's horizon, then crossfades into the photo ── */
  // World above the 4–10 s section (y in px of that frame): N_OVER extra overburden bands, the seabed, then
  // DEPTH of water up to the sea surface. liftAt(t) is how far the camera has risen (the world shifts down).
  const N_OVER = 5, BAND_H = 0.28, DEPTH = 2.8;
  const bedY = () => H * (BASES[0] - N_OVER * BAND_H);
  const surfY = () => bedY() - DEPTH * H;
  /** Overburden boundary j: 0 = top horizon of the section, N_OVER = seabed. The fold flattens upward. */
  const over = (j: number, x: number) =>
    j === 0 ? hz(0, x, 1)
      : j === N_OVER ? bedY() + 0.004 * H * Math.sin(x / (0.05 * W))
        : H * (BASES[0] - j * BAND_H) - (1 - j / N_OVER) * H * AMPS[0] * gauss((x - cx()) / (0.27 * W)) + 0.008 * H * Math.sin(x / (0.09 * W) + j * 2.3);
  /** Sea surface; `a` calms the swell to the photo's flat horizon */
  const wave = (x: number, t: number, a = 1) => surfY() + a * (0.006 * H * Math.sin(x / (0.05 * W) + t * 5) + 0.004 * H * Math.sin(x / (0.021 * W) - t * 7));

  /** Where the Hero photo (object-fit: cover) is drawn; the camera comes to rest on its horizon. */
  function photoFit(): PhotoFit {
    if (fit) return fit;
    const img = document.querySelector<HTMLImageElement>("[data-reel-photo]");
    const nw = img?.naturalWidth || PHOTO_W, nh = img?.naturalHeight || PHOTO_H;
    let box = { left: 0, top: 0, width: W, height: H }, px = 1, py = 0;
    const r = img?.getBoundingClientRect();
    // Desktop: the photo is the full-bleed backdrop. Otherwise (mobile layout) assume it covers the viewport.
    if (img && r && r.width >= 0.9 * W && r.height >= 0.9 * H && Math.abs(r.top) < 2) {
      box = r;
      const [ox, oy] = getComputedStyle(img).objectPosition.split(" ").map((v) => parseFloat(v) / 100);
      if (Number.isFinite(ox)) px = ox;
      if (Number.isFinite(oy)) py = oy;
    }
    const s = Math.max(box.width / nw, box.height / nh), w = nw * s, h = nh * s, x = box.left + (box.width - w) * px, y = box.top + (box.height - h) * py;
    const f = { x, w, h, hY: y + HZ * h };
    if (!img || img.complete) fit = f;
    return f;
  }

  /** Camera rise in screen heights: Hermite keys [t, rise, rise speed /s] — launch, strata, sea, ease to rest */
  const liftAt = (t: number) => {
    const rest = (photoFit().hY - surfY()) / H;
    const LIFT: [number, number, number][] = [[DROP, 0, 2.0], [11.0, 2.2, 1.9], [12.0, rest - 0.35, 1.6], [REST, rest, 0]];
    if (t <= DROP) return 0;
    if (t >= REST) return rest;
    let i = 0;
    while (t > LIFT[i + 1][0]) i++;
    const [t0, p0, m0] = LIFT[i], [t1, p1, m1] = LIFT[i + 1], d = t1 - t0, s = (t - t0) / d;
    return (2 * s ** 3 - 3 * s * s + 1) * p0 + (s ** 3 - 2 * s * s + s) * d * m0 + (-2 * s ** 3 + 3 * s * s) * p1 + (s ** 3 - s * s) * d * m1;
  };

  function band(top: (x: number) => number, bottom: (x: number) => number, fill: string) {
    const X = xs();
    ctx.fillStyle = fill;
    ctx.beginPath();
    X.forEach((x, j) => (j ? ctx.lineTo(x, top(x)) : ctx.moveTo(x, top(x))));
    [...X].reverse().forEach((x) => ctx.lineTo(x, bottom(x)));
    ctx.fill();
    ctx.strokeStyle = "rgba(18,164,217,0.22)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    X.forEach((x, j) => (j ? ctx.lineTo(x, top(x)) : ctx.moveTo(x, top(x))));
    ctx.stroke();
  }

  /** Navy silhouette of the photo's platform, traced in photo fractions; P maps them into the world. */
  function platform(P: (fx: number, fy: number) => [number, number], w: number) {
    const poly = (pts: [number, number][]) => {
      ctx.beginPath();
      pts.forEach(([fx, fy], i) => { const [x, y] = P(fx, fy); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); });
      ctx.closePath();
      ctx.fill();
    };
    const rect = (x0: number, y0: number, x1: number, y1: number) => poly([[x0, y0], [x1, y0], [x1, y1], [x0, y1]]);
    const line = (x0: number, y0: number, x1: number, y1: number, lw: number) => {
      ctx.lineWidth = lw * w;
      ctx.beginPath(); ctx.moveTo(...P(x0, y0)); ctx.lineTo(...P(x1, y1)); ctx.stroke();
    };
    ctx.fillStyle = ctx.strokeStyle = "rgb(11,26,44)";
    poly([[0.792, 0.051], [0.803, 0.051], [0.836, 0.405], [0.772, 0.405]]); // derrick
    rect(0.789, 0.046, 0.806, 0.057);
    line(0.612, 0.228, 0.695, 0.405, 0.006); // cranes
    line(0.918, 0.244, 0.866, 0.405, 0.006);
    rect(0.712, 0.34, 0.854, 0.425); // modules
    rect(0.648, 0.375, 0.7, 0.425);
    rect(0.53, 0.42, 0.89, 0.45); // decks
    rect(0.555, 0.45, 0.9, 0.575);
    const legs = [0.615, 0.66, 0.72, 0.76, 0.8, 0.865]; // jacket
    legs.forEach((lx) => line(lx, 0.575, lx, 0.72, 0.008));
    line(0.615, 0.625, 0.865, 0.625, 0.003);
    line(0.615, 0.665, 0.865, 0.665, 0.003);
    legs.slice(1).forEach((lx, i) => { line(legs[i], 0.575, lx, 0.665, 0.002); line(lx, 0.575, legs[i], 0.665, 0.002); });
  }

  function surfacing(t: number) {
    const fade = 1 - seg(t, 12.7, 13.5);
    if (t < DROP || fade <= 0) return;
    const pf = photoFit(), off = liftAt(t) * H, x0 = cx(), sY = surfY(), bY = bedY(), visible = (a: number, b: number) => b + off > 0 && a + off < H;
    // m: colours, swell and underwater detail ease into the photo as the camera comes to rest
    const m = eInOutCubic(seg(t, 11.8, REST)), calm = 1 - m;
    const P = (fx: number, fy: number): [number, number] => [pf.x + fx * pf.w, sY + (fy - HZ) * pf.h];
    ctx.save();
    ctx.globalAlpha = fade;
    ctx.save();
    ctx.translate(0, off);

    // sky above the surface: pale daylight → the photo's sky
    if (sY + off > 0) {
      const top = sY - HZ * pf.h, g = ctx.createLinearGradient(0, top, 0, sY);
      [0, 0.3, 0.6, 0.75, 0.85, 0.93, 1].forEach((p) => {
        const haze = clamp(1 - ((1 - p) * HZ * pf.h) / (0.35 * H));
        g.addColorStop(p, rgb(blend(blend(BG, CYAN_RGB, 0.12 * haze), ramp(SKY_PHOTO, p), m)));
      });
      ctx.fillStyle = g;
      ctx.fillRect(0, -off, W, sY + off + 0.02 * H);
    }

    // sea: brighter toward the surface, settling on the photo's sea near the surface
    if (visible(sY - 0.02 * H, bY)) {
      const X = xs(), D = bY - sY, g = ctx.createLinearGradient(0, sY, 0, bY);
      const deep: [number, number[]][] = [[0, blend(CYAN_RGB, [255, 255, 255], 0.35)], [0.12, blend(CYAN_RGB, NAVY, 0.1)], [0.5, blend(CYAN_RGB, NAVY, 0.55)], [1, [11, 42, 69]]];
      const near = SEA_PHOTO.map(([d, c]): [number, number[]] => [Math.min(1, (d * pf.h) / D), c]), last = near[near.length - 1][0];
      near.forEach(([p, c]) => g.addColorStop(p, rgb(blend(ramp(deep, p), c, m))));
      deep.filter(([p]) => p > last).forEach(([p, c]) => g.addColorStop(p, rgb(c)));
      ctx.beginPath();
      X.forEach((x, j) => (j ? ctx.lineTo(x, wave(x, t, calm)) : ctx.moveTo(x, wave(x, t, calm))));
      ctx.lineTo(W + 40, bY + 0.1 * H); ctx.lineTo(-40, bY + 0.1 * H);
      ctx.closePath();
      ctx.fillStyle = g;
      ctx.fill();
      // light shafts from the surface
      if (calm > 0) {
        ctx.save();
        ctx.clip();
        const rg = ctx.createLinearGradient(0, sY, 0, sY + 1.6 * H);
        rg.addColorStop(0, `rgba(255,255,255,${0.16 * calm})`);
        rg.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = rg;
        for (let i = 0; i < 7; i++) {
          const x = (i / 6) * W * 1.1 - 0.05 * W + 0.03 * W * Math.sin(t * 1.3 + i * 2), w = (0.03 + 0.03 * (i % 3)) * W;
          ctx.beginPath();
          ctx.moveTo(x, sY); ctx.lineTo(x + w, sY); ctx.lineTo(x + w - 0.5 * W, sY + 1.6 * H); ctx.lineTo(x - 0.5 * W - w, sY + 1.6 * H);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    // overburden, then the frozen section below it (the last band runs on past the bottom of the frame)
    for (let j = N_OVER; j >= 1; j--) if (visible(over(j, 0) - 0.05 * H, over(j - 1, 0) + 0.15 * H)) band((x) => over(j, x), (x) => over(j - 1, x), BANDS[(j * 3) % 7]);
    for (let i = 1; i < 7; i++) if (visible(H * BASES[i - 1] - 0.15 * H, i === 6 ? 6 * H : H * BASES[i] + 0.05 * H)) band((x) => boundary(i, x, 1), (x) => (i === 6 ? 6 * H : boundary(i + 1, x, 1)), BANDS[i]);

    // the 4–10 s frame's sea and first band dissolve into the overburden as the camera launches
    const top0 = 1 - seg(t, DROP, 10.25);
    if (top0 > 0) {
      const X = xs(), g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#081422"); g.addColorStop(0.16, "#0A1A2C"); g.addColorStop(0.17, "#0B2A45"); g.addColorStop(1, "#08182A");
      ctx.save();
      ctx.globalAlpha *= top0;
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(-40, 0); ctx.lineTo(W + 40, 0);
      [...X].reverse().forEach((x) => ctx.lineTo(x, seabed(x)));
      ctx.fill();
      band(seabed, (x) => hz(0, x, 1), BANDS[0]);
      ctx.strokeStyle = WHITE; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, seaY()); ctx.lineTo(W, seaY()); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x0, seaY()); ctx.lineTo(x0, bY); ctx.stroke();
      ctx.restore();
    }
    topGlyph(t, 1);

    // reservoir, wells, riser up to the platform's jacket
    const cy = crestY(1);
    if (cy + off < H + 0.4 * H) {
      ctx.save();
      accumPath(1);
      ctx.fillStyle = AMBER; ctx.shadowColor = AMBER; ctx.shadowBlur = 30;
      ctx.fill();
      ctx.restore();
      const g = ctx.createRadialGradient(x0, cy, 0, x0, cy, 0.3 * W);
      g.addColorStop(0, `rgba(242,154,31,${0.35 * seg(t, DROP, 10.3)})`);
      g.addColorStop(1, "rgba(242,154,31,0)");
      ctx.fillStyle = g;
      ctx.fillRect(x0 - 0.3 * W, cy - 0.3 * W, 0.6 * W, 0.6 * W);
      ctx.strokeStyle = "rgba(255,255,255,0.85)";
      ctx.lineWidth = 1.6;
      DEV_WELLS.forEach(([dx]) => {
        ctx.beginPath();
        for (let i = 0; i <= 40; i++) { const [x, y] = devWellPt(dx, i / 40, 1); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
        ctx.stroke();
      });
    }
    ctx.strokeStyle = WHITE;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x0, cy); ctx.lineTo(x0, bY); ctx.stroke();
    if (calm > 0) {
      ctx.strokeStyle = `rgba(255,255,255,${0.55 * calm})`;
      ctx.beginPath(); ctx.moveTo(x0, bY); ctx.lineTo(...P(0.72, 0.72)); ctx.stroke();
    }

    // sea surface: shimmer just below, the waterline, the platform on the photo's horizon
    if (visible(sY - HZ * pf.h, sY + 0.4 * pf.h)) {
      const X = xs();
      if (calm > 0) {
        ctx.strokeStyle = `rgba(255,255,255,${0.35 * calm})`;
        ctx.lineWidth = 1;
        for (let k = 1; k <= 3; k++) {
          ctx.beginPath();
          X.forEach((x, j) => { const y = wave(x, t + k * 0.4, calm) + k * 0.018 * H; if (j) ctx.lineTo(x, y); else ctx.moveTo(x, y); });
          ctx.stroke();
        }
      }
      ctx.strokeStyle = `rgba(255,255,255,${1 - 0.8 * m})`;
      ctx.lineWidth = 2.5 - 1.5 * m;
      ctx.beginPath();
      X.forEach((x, j) => (j ? ctx.lineTo(x, wave(x, t, calm)) : ctx.moveTo(x, wave(x, t, calm))));
      ctx.stroke();
      platform(P, pf.w);
    }
    ctx.restore();

    prodCurve(t);

    // speed lines while rocketing through the strata, thinning out in the water
    const sl = 1 - seg(t, 10.9, 11.6);
    if (sl > 0) {
      const r = rng(17);
      ctx.strokeStyle = `rgba(255,255,255,${0.4 * sl})`;
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 60; i++) {
        const x = r() * W, len = (0.15 + r() * 0.35) * H, y = (r() * H + (t - DROP) * 3.4 * H) % (H + len) - len;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + len); ctx.stroke();
      }
    }

    // bubbles rising in the water
    const top = Math.max(0, sY + off), bottom = Math.min(H, bY + off), ba = 0.6 * seg(t, 10.85, 11.25) * calm;
    if (ba > 0 && bottom > top) {
      ctx.save();
      ctx.beginPath(); ctx.rect(0, top, W, bottom - top); ctx.clip();
      const r = rng(41);
      ctx.strokeStyle = `rgba(255,255,255,${ba})`;
      ctx.lineWidth = 1.2;
      for (let i = 0; i < 80; i++) {
        const bx = r() * W, base = r(), sp = 0.5 + r() * 0.9, rad = 1.5 + r() ** 2 * 7;
        const y = H + 20 - ((base * (H + 40) + (t - 10.8) * sp * H) % (H + 40)), x = bx + 6 * Math.sin(t * 3 + i);
        ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.stroke();
      }
      ctx.restore();
    }

    // the Hero's pale scrim behind the copy (Hero.module.css .scrim, desktop only), so the crossfade is seamless
    if (m > 0 && W >= 900) {
      const g = ctx.createLinearGradient(0, 0, W, 0);
      g.addColorStop(0, `rgba(246,248,251,${0.66 * m})`);
      g.addColorStop(0.28, `rgba(246,248,251,${0.42 * m})`);
      g.addColorStop(0.46, "rgba(246,248,251,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }
    ctx.restore();
  }

  /** Breaking the surface: a short white flash. */
  function surfaceFlash(t: number) {
    const a = 0.7 * gauss((t - SURFACE) / 0.05);
    if (a < 0.01) return;
    ctx.fillStyle = `rgba(255,255,255,${a})`;
    ctx.fillRect(0, 0, W, H);
  }

  /* ── Frame ── */
  function draw(t: number) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    // background: black → navy section → daylight → transparent (the Hero page shows through)
    const day = eInOutCubic(seg(t, 11.5, 12.3));
    const bgAlpha = 1 - seg(t, POSTER, 12.55);
    if (bgAlpha > 0) {
      ctx.globalAlpha = bgAlpha;
      ctx.fillStyle = t < 4 ? "#000" : mix(NAVY, BG, day);
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;
    }

    const sh = shakeAt(t), r = rng(Math.floor(t * 60));
    ctx.save();
    ctx.translate((r() - 0.5) * 2 * sh, (r() - 0.5) * 2 * sh);
    const zoom = 1 + 0.05 * (t < DROP ? eInCubic(seg(t, 9.0, 9.9)) : 1 - eInOutCubic(seg(t, DROP, 10.4)));
    if (zoom > 1) { ctx.translate(W / 2, H / 2); ctx.scale(zoom, zoom); ctx.translate(-W / 2, -H / 2); }

    if (t < 1.8) slam(t);
    if (t >= 1.3 && t < 4.0) seismic(t);
    section(t);
    words(t);
    if (t >= 4.4 && t < DROP) bigWords(t);
    wipe(t);
    surfacing(t);
    ctx.restore();

    // pre-drop breath, drop flash
    if (t > 9.88 && t < DROP) { ctx.fillStyle = "rgba(0,0,0,0.12)"; ctx.fillRect(0, 0, W, H); }
    const fl = seg(t, DROP, DROP + 0.12);
    if (t >= DROP && fl < 1) { ctx.fillStyle = `rgba(255,255,255,${0.3 * (1 - fl)})`; ctx.fillRect(0, 0, W, H); }

    surfaceFlash(t);

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
