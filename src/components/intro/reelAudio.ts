/**
 * Synthesized sound design for the 15 s intro reel (Web Audio, no audio files).
 * Times are seconds from the reel start and mirror the visual timeline in ShowReel / ShowReel.module.css.
 *
 *  0.1  sonar ping (+ echo)            — rings in the dark
 *  1.8  sea swell                      — the platform photo
 *  3.4  dive / submerge                — camera goes under water
 *  5.0  seismic booms (5.0, 6.0)       — wavefronts
 *  5.5  reflection pulses (×4, 1 s)    — horizons light up on the beat
 *  5–12 low drone                      — subsurface bed
 *  9.0  drill riser → 9.85 impact      — the well reaches the reservoir
 * 10.2  ticks                          — development wells
 * 10.5  production pulse               — fluid flow
 * 12.0  upward whoosh, 12.55 cut       — rise to daylight
 * 13.0  bright chime                   — presenter card
 */

type Ctx = BaseAudioContext;

function noise(ctx: Ctx, seconds: number) {
  const buf = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * seconds), ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

function impulse(ctx: Ctx, seconds: number, decay: number) {
  const len = Math.ceil(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** decay;
  }
  return buf;
}

/** Attack → peak → exponential decay on a gain param. */
function env(p: AudioParam, t: number, attack: number, peak: number, decay: number) {
  p.setValueAtTime(0.0001, t);
  p.exponentialRampToValueAtTime(peak, t + attack);
  p.exponentialRampToValueAtTime(0.0001, t + attack + decay);
}

/** Schedule the whole reel on `ctx`, starting at absolute context time `t0`, into `out`. */
export function scheduleReel(ctx: Ctx, out: AudioNode, t0: number) {
  const T = (s: number) => t0 + s;
  const white = noise(ctx, 2);

  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -14;
  comp.ratio.value = 4;
  comp.connect(out);
  const dry = ctx.createGain();
  dry.gain.value = 0.9;
  dry.connect(comp);
  const verb = ctx.createConvolver();
  verb.buffer = impulse(ctx, 3, 3);
  const wet = ctx.createGain();
  wet.gain.value = 0.55;
  verb.connect(wet).connect(comp);

  /** Gain node routed to dry and (optionally) reverb. */
  const voice = (send = 0.3) => {
    const g = ctx.createGain();
    g.gain.value = 0.0001;
    g.connect(dry);
    if (send > 0) {
      const s = ctx.createGain();
      s.gain.value = send;
      g.connect(s).connect(verb);
    }
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

  /* Sonar ping with a filtered feedback echo */
  const ping = (t: number) => {
    const g = voice(0.6);
    env(g.gain, t, 0.004, 0.32, 1.3);
    osc("sine", 1180, t, 1.5, g);
    const h = voice(0.4);
    env(h.gain, t, 0.004, 0.06, 0.5);
    osc("sine", 2360, t, 0.6, h);
    const delay = ctx.createDelay(1);
    delay.delayTime.value = 0.34;
    const fb = ctx.createGain();
    fb.gain.value = 0.38;
    const lp = filter("lowpass", 2200);
    g.connect(delay).connect(lp).connect(fb).connect(delay);
    lp.connect(dry);
  };

  /* Filtered-noise swell: sea, dive, risers, whooshes */
  const swell = (t: number, dur: number, type: BiquadFilterType, from: number, to: number, peak: number, q = 0.7, send = 0.3) => {
    const f = filter(type, from, q);
    f.frequency.setValueAtTime(from, t);
    f.frequency.exponentialRampToValueAtTime(to, t + dur);
    const g = voice(send);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(peak, t + dur * 0.75);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    f.connect(g);
    noiseSrc(t, dur + 0.05, f);
  };

  /* Low boom: pitch-dropping sine + short noise thump */
  const boom = (t: number, peak: number, decay = 1.6) => {
    const g = voice(0.5);
    env(g.gain, t, 0.008, peak, decay);
    const o = osc("sine", 95, t, decay + 0.2, g);
    o.frequency.exponentialRampToValueAtTime(30, t + 0.9);
    const n = voice(0.2);
    env(n.gain, t, 0.002, peak * 0.35, 0.25);
    const lp = filter("lowpass", 220);
    lp.connect(n);
    noiseSrc(t, 0.3, lp);
  };

  /* Reflection beat: sub pulse + glassy tick */
  const pulse = (t: number, i: number) => {
    const g = voice(0.15);
    env(g.gain, t, 0.005, 0.55, 0.4);
    const o = osc("sine", 72, t, 0.5, g);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.25);
    const h = voice(0.7);
    env(h.gain, t, 0.003, 0.05, 0.6);
    osc("sine", 1568 * 2 ** (i / 12), t, 0.7, h);
  };

  const tick = (t: number, freq: number, peak = 0.08) => {
    const g = voice(0.5);
    env(g.gain, t, 0.002, peak, 0.12);
    osc("triangle", freq, t, 0.2, g);
  };

  /* ── Timeline ── */
  ping(T(0.1));

  swell(T(1.7), 1.9, "lowpass", 600, 2200, 0.4, 0.7, 0.2); // sea air
  swell(T(3.1), 2.0, "lowpass", 2600, 160, 0.55, 1.2, 0.4); // submerge

  // Subsurface drone 5.0 → 12.4
  const droneF = filter("lowpass", 160, 1.5);
  droneF.frequency.setValueAtTime(160, T(5));
  droneF.frequency.exponentialRampToValueAtTime(700, T(12.2));
  const drone = voice(0.25);
  drone.gain.setValueAtTime(0.0001, T(4.8));
  drone.gain.exponentialRampToValueAtTime(0.16, T(6));
  drone.gain.setValueAtTime(0.16, T(12.2));
  drone.gain.exponentialRampToValueAtTime(0.0001, T(12.55));
  droneF.connect(drone);
  [55, 55.35, 82.4].forEach((f) => osc("sawtooth", f, T(4.8), 7.8, droneF));

  boom(T(5.0), 0.7);
  boom(T(6.0), 0.5);
  [5.5, 6.5, 7.5, 8.5].forEach((s, i) => pulse(T(s), i * 2));

  swell(T(9.0), 0.85, "bandpass", 250, 2600, 0.22, 2.5, 0.2); // drill riser
  boom(T(9.85), 1.0, 2.2); // impact
  swell(T(9.85), 0.6, "highpass", 1200, 5000, 0.18, 0.7, 0.8); // impact air

  tick(T(10.2), 880);
  tick(T(10.35), 1175);
  for (let s = 10.5; s < 12.0; s += 0.25) {
    const g = voice(0.1);
    env(g.gain, T(s), 0.004, s % 0.5 < 0.01 ? 0.32 : 0.2, 0.18);
    osc("sine", 55, T(s), 0.25, g);
  }

  swell(T(11.9), 0.65, "highpass", 300, 7000, 0.3, 0.7, 0.4); // rise to daylight

  // Presenter chime (E major add9, soft)
  [659.25, 987.77, 1318.51, 1479.98].forEach((f, i) => {
    const g = voice(0.9);
    env(g.gain, T(13.0 + i * 0.04), 0.02, 0.07, 2.6);
    osc("sine", f, T(13.0 + i * 0.04), 2.8, g);
  });
}

/** Total length incl. reverb tail. */
export const REEL_AUDIO_LENGTH = 17.5;

/** Live playback. Must be called from a user gesture (key/click). */
export function playReelAudio() {
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AC();
  void ctx.resume();
  const master = ctx.createGain();
  master.gain.value = 0.9;
  master.connect(ctx.destination);
  scheduleReel(ctx, master, ctx.currentTime + 0.03);
  let muted = false;
  const closeTimer = setTimeout(() => void ctx.close(), REEL_AUDIO_LENGTH * 1000);
  return {
    toggleMute() {
      muted = !muted;
      master.gain.setTargetAtTime(muted ? 0 : 0.9, ctx.currentTime, 0.05);
      return muted;
    },
    /** Quick fade-out, then release the context. */
    stop() {
      clearTimeout(closeTimer);
      if (ctx.state === "closed") return;
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.08);
      setTimeout(() => void ctx.close(), 400);
    },
  };
}
