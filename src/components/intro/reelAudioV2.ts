/**
 * Synthesized soundtrack for the v2 reel (Web Audio, no audio files). 120 BPM — one beat = 0.5 s.
 * Times (s from start) match reelV2Renderer.ts:
 *
 *  0.05  slam: sub boom + crack            1.5–3.0  word hits on the beat
 *  0.5   shatter shimmer → riser to 1.5    1.5–9.9  kick / clap / hats / bass groove
 *  3.72  wipe whoosh                       4.0      plunge whoosh
 *  4.4–5.9  strata slams on the 8ths       6.0      fold riser
 *  7.0   laser zap → 7.25 impact           7.75–8.25  well plucks
 *  8.6   whip                              9.0–9.88  snare roll build, 9.88 gap
 * 10.0   DROP: boom + stab, half-time kicks, upward whoosh
 * 12.3   reverse swell into 13.15 poster chord   14.2  air for the photo reveal
 */

type Ctx = BaseAudioContext;

function noise(ctx: Ctx, seconds: number) {
  const buf = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * seconds), ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}
function impulse(ctx: Ctx, seconds: number, decay: number) {
  const len = Math.ceil(ctx.sampleRate * seconds), buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** decay;
  }
  return buf;
}
function env(p: AudioParam, t: number, attack: number, peak: number, decay: number) {
  p.setValueAtTime(0.0001, t);
  p.exponentialRampToValueAtTime(peak, t + attack);
  p.exponentialRampToValueAtTime(0.0001, t + attack + decay);
}

export function scheduleReelV2(ctx: Ctx, out: AudioNode, t0: number) {
  const T = (s: number) => t0 + s;
  const white = noise(ctx, 2);

  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -16;
  comp.ratio.value = 5;
  comp.attack.value = 0.003;
  comp.release.value = 0.12;
  // brick-wall-ish limiter so drops and impacts never clip
  const limiter = ctx.createDynamicsCompressor();
  limiter.threshold.value = -4;
  limiter.knee.value = 0;
  limiter.ratio.value = 20;
  limiter.attack.value = 0.001;
  limiter.release.value = 0.08;
  const trim = ctx.createGain();
  trim.gain.value = 1.15;
  comp.connect(limiter).connect(trim).connect(out);
  const dry = ctx.createGain();
  dry.gain.value = 0.85;
  dry.connect(comp);
  const verb = ctx.createConvolver();
  verb.buffer = impulse(ctx, 2.6, 3);
  const wet = ctx.createGain();
  wet.gain.value = 0.45;
  verb.connect(wet).connect(comp);

  const voice = (send = 0.2) => {
    const g = ctx.createGain();
    g.gain.value = 0.0001;
    g.connect(dry);
    if (send > 0) { const s = ctx.createGain(); s.gain.value = send; g.connect(s).connect(verb); }
    return g;
  };
  const osc = (type: OscillatorType, freq: number, t: number, dur: number, dest: AudioNode) => {
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    o.connect(dest);
    o.start(t);
    o.stop(t + dur);
    return o;
  };
  const noiseSrc = (t: number, dur: number, dest: AudioNode) => {
    const n = ctx.createBufferSource();
    n.buffer = white;
    n.loop = true;
    n.playbackRate.value = 0.8 + Math.random() * 0.4;
    n.connect(dest);
    n.start(t);
    n.stop(t + dur);
  };
  const filter = (type: BiquadFilterType, freq: number, q = 0.7) => {
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    return f;
  };

  /* ── Instruments ── */
  const kick = (t: number, peak = 0.9) => {
    const g = voice(0.05);
    env(g.gain, t, 0.003, peak, 0.32);
    const o = osc("sine", 150, t, 0.4, g);
    o.frequency.exponentialRampToValueAtTime(45, t + 0.12);
    const c = voice(0);
    env(c.gain, t, 0.001, peak * 0.25, 0.02);
    const hp = filter("highpass", 2500);
    hp.connect(c);
    noiseSrc(t, 0.04, hp);
  };
  const clap = (t: number, peak = 0.35) => {
    const g = voice(0.35);
    [0, 0.012, 0.024].forEach((d) => env(g.gain, t + d, 0.002, peak, 0.12));
    const bp = filter("bandpass", 1500, 1.2);
    bp.connect(g);
    noiseSrc(t, 0.2, bp);
  };
  const hat = (t: number, peak = 0.08) => {
    const g = voice(0.05);
    env(g.gain, t, 0.001, peak, 0.05);
    const hp = filter("highpass", 7500);
    hp.connect(g);
    noiseSrc(t, 0.07, hp);
  };
  const bass = (t: number, freq: number, dur = 0.22, peak = 0.22) => {
    const f = filter("lowpass", 900, 6);
    f.frequency.setValueAtTime(900, t);
    f.frequency.exponentialRampToValueAtTime(140, t + dur);
    const g = voice(0);
    env(g.gain, t, 0.004, peak, dur);
    f.connect(g);
    osc("sawtooth", freq, t, dur + 0.05, f);
  };
  const boom = (t: number, peak: number, decay = 1.6) => {
    const g = voice(0.5);
    env(g.gain, t, 0.006, peak, decay);
    const o = osc("sine", 110, t, decay + 0.2, g);
    o.frequency.exponentialRampToValueAtTime(28, t + 0.8);
    const n = voice(0.4);
    env(n.gain, t, 0.002, peak * 0.5, 0.35);
    const lp = filter("lowpass", 1800);
    lp.connect(n);
    noiseSrc(t, 0.4, lp);
  };
  const sweep = (t: number, dur: number, type: BiquadFilterType, from: number, to: number, peak: number, q = 0.8, send = 0.3) => {
    const f = filter(type, from, q);
    f.frequency.setValueAtTime(from, t);
    f.frequency.exponentialRampToValueAtTime(to, t + dur);
    const g = voice(send);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(peak, t + dur * 0.8);
    g.gain.linearRampToValueAtTime(0, t + dur);
    f.connect(g);
    noiseSrc(t, dur + 0.05, f);
  };
  const stab = (t: number, freqs: number[], peak: number, decay: number, type: OscillatorType = "sawtooth") => {
    const f = filter("lowpass", 3200, 1);
    f.frequency.setValueAtTime(3200, t);
    f.frequency.exponentialRampToValueAtTime(500, t + decay);
    const g = voice(0.5);
    env(g.gain, t, 0.005, peak, decay);
    f.connect(g);
    freqs.forEach((fr) => { osc(type, fr, t, decay + 0.1, f); osc(type, fr * 1.006, t, decay + 0.1, f); });
  };
  const pluck = (t: number, freq: number) => {
    const g = voice(0.5);
    env(g.gain, t, 0.002, 0.14, 0.35);
    osc("triangle", freq, t, 0.4, g);
  };

  /* E minor: E1 41.2, G1 49, A1 55, B1 61.7, D2 73.4 */
  const E = 41.2, G = 49, A = 55, D = 73.42;

  /* ── 0–1.5: slam & shatter ── */
  boom(T(0.05), 1.0, 2.2);
  sweep(T(0.05), 0.5, "highpass", 6000, 1200, 0.25, 0.7, 0.6); // crack
  [2637, 3136, 3951].forEach((f, i) => { const g = voice(0.8); env(g.gain, T(0.5 + i * 0.07), 0.004, 0.05, 0.5); osc("sine", f, T(0.5 + i * 0.07), 0.6, g); });
  sweep(T(0.6), 0.9, "bandpass", 400, 5000, 0.18, 2, 0.3); // riser into the beat

  /* ── 1.5–9.88: groove ── */
  const groove: [number, number][] = []; // [time, bass freq]
  for (let s = 1.5; s < 9.88; s += 0.25) groove.push([s, s < 4 ? E : s < 7 ? (Math.floor((s - 4) / 1) % 2 ? G : E) : s < 8.5 ? A : D]);
  for (let s = 1.5; s < 9.0; s += 0.5) kick(T(s), s >= 4.4 && s < 6.0 ? 0.6 : 0.85);
  for (let s = 2.0; s < 9.0; s += 1.0) clap(T(s));
  for (let s = 1.75; s < 9.88; s += 0.5) hat(T(s), 0.09);
  for (let s = 4.0; s < 9.88; s += 0.25) hat(T(s), 0.035);
  groove.forEach(([s, f], i) => bass(T(s), i % 4 === 2 ? f * 2 : f));

  // word hits
  [1.5, 2.0, 2.5, 3.0].forEach((s, i) => stab(T(s), [E * 8, G * 8, 61.74 * 8].map((f) => f * 2 ** (i / 12)), 0.08, 0.25));

  sweep(T(3.62), 0.4, "bandpass", 800, 7000, 0.3, 1.2, 0.3); // wipe
  sweep(T(4.0), 0.45, "lowpass", 5000, 120, 0.4, 1, 0.3); // plunge

  // strata slams
  [4.4, 4.65, 4.9, 5.15, 5.4, 5.65, 5.9].forEach((s, i) => {
    kick(T(s + 0.2), 0.75);
    const g = voice(0.3);
    env(g.gain, T(s + 0.2), 0.003, 0.22, 0.2);
    osc("triangle", 98 * 2 ** (-i / 12), T(s + 0.2), 0.25, g);
  });
  sweep(T(6.0), 0.75, "bandpass", 200, 2400, 0.22, 3, 0.4); // fold

  // laser & impact
  const zg = voice(0.3);
  env(zg.gain, T(7.0), 0.01, 0.16, 0.25);
  osc("sawtooth", 2400, T(7.0), 0.28, zg).frequency.exponentialRampToValueAtTime(180, T(7.25));
  boom(T(7.25), 1.0, 1.8);
  stab(T(7.25), [A * 4, A * 6, 130.8 * 2], 0.12, 0.9);

  [[7.75, 659.25], [8.0, 783.99], [8.25, 987.77]].forEach(([s, f]) => pluck(T(s), f));
  sweep(T(8.5), 0.25, "bandpass", 600, 6000, 0.3, 1.5, 0.2); // whip

  // build: accelerating snare roll + riser
  for (let s = 9.0, step = 0.125; s < 9.85; s += step, step = Math.max(0.04, step * 0.86)) clap(T(s), 0.12 + (s - 9.0) * 0.25);
  sweep(T(9.0), 0.88, "highpass", 300, 9000, 0.3, 0.8, 0.2);

  /* ── 10: DROP ── */
  boom(T(10.0), 1.0, 2.4);
  stab(T(10.0), [E * 4, E * 6, G * 8, 61.74 * 8], 0.16, 1.4);
  [10.0, 10.5, 11.0, 11.5].forEach((s) => kick(T(s), 1.0));
  [10.75, 11.75].forEach((s) => clap(T(s), 0.3));
  sweep(T(10.0), 1.1, "highpass", 200, 8000, 0.28, 0.7, 0.5); // rocket up
  sweep(T(10.9), 1.4, "bandpass", 900, 300, 0.12, 4, 0.6); // vortex

  /* ── 12.3: converge → poster ── */
  sweep(T(12.3), 0.85, "bandpass", 300, 4000, 0.22, 1.5, 0.6); // reverse swell
  [1318.5, 1567.98, 1975.5, 2637].forEach((f, i) => pluck(T(12.4 + i * 0.16), f)); // sparkle as particles land
  [164.8, 246.9, 329.6, 392, 493.9].forEach((f, i) => {
    const g = voice(0.8);
    env(g.gain, T(13.15 + i * 0.015), 0.01, 0.06, 2.2);
    osc(i < 2 ? "triangle" : "sine", f, T(13.15), 2.4, g);
  });
  boom(T(13.15), 0.35, 1.2);
  sweep(T(14.1), 0.9, "lowpass", 600, 3000, 0.08, 0.7, 0.6); // air for the photo reveal
}

export const REEL_V2_AUDIO_LENGTH = 17.5;

export interface ReelAudio {
  /** Seconds since the reel started, on the audio clock (NaN while the context is not running). */
  elapsed(): number;
  toggleMute(): boolean;
  stop(): void;
}

/** Live playback. Must be called from a user gesture (key/click). */
export function playReelAudioV2(muted = false): ReelAudio {
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AC();
  void ctx.resume();
  const master = ctx.createGain();
  const LEVEL = 0.9;
  master.gain.value = muted ? 0 : LEVEL;
  master.connect(ctx.destination);
  const t0 = ctx.currentTime + 0.05;
  scheduleReelV2(ctx, master, t0);
  let isMuted = muted;
  const closeTimer = setTimeout(() => void ctx.close(), REEL_V2_AUDIO_LENGTH * 1000);
  return {
    elapsed: () => (ctx.state === "running" ? ctx.currentTime - t0 : NaN),
    toggleMute() {
      isMuted = !isMuted;
      master.gain.setTargetAtTime(isMuted ? 0 : LEVEL, ctx.currentTime, 0.05);
      return isMuted;
    },
    stop() {
      clearTimeout(closeTimer);
      if (ctx.state === "closed") return;
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.08);
      setTimeout(() => void ctx.close(), 400);
    },
  };
}
