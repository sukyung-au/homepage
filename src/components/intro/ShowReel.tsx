"use client";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { PRESENTER } from "@/lib/presentation";
import { STAGES } from "@/lib/stages";
import { playReelAudio } from "./reelAudio";
import s from "./ShowReel.module.css";

/**
 * 15-second intro reel for the presentation. One continuous camera move: a seismic ping in the dark →
 * the offshore platform → down through the water → reflections light up in the strata → the well reaches
 * the reservoir → fast rise back to daylight → presenter card → the reel fades away onto the live Hero.
 *
 * Timing lives here (seconds) and in ShowReel.module.css (`world` keyframes). The reel waits on a black
 * screen until Space / Enter / click, so the presenter controls the start (and the browser allows sound).
 * Esc skips, R replays, M toggles sound. The synthesized soundtrack is in reelAudio.ts.
 * Phase is mirrored on <html data-reel> so the Hero copy can stay hidden and then reveal on cue.
 */

type Phase = "waiting" | "playing" | "done" | "gone";

/** Start time of each Journey stage in the HUD; the last entry switches the HUD off. */
const STAGE_AT = [5.0, 7.0, 9.0, 10.5, 12.0, 12.7];
const REVEAL_AT = 14.2;
const END_AT = 15.0;

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");
const at = (d: number, dur?: number) => ({ "--d": `${d}s`, ...(dur ? { "--dur": `${dur}s` } : {}) }) as CSSProperties;

/* ── Strata geometry (viewBox 1600 × 1800, stretched to the section; strokes are non-scaling) ── */
const W = 1600, HH = 1800, CX = 800;
type Hz = (x: number) => number;
const hz = (base: number, amp: number, ph = 0, wob = 6): Hz => (x) =>
  base - amp * Math.exp(-(((x - CX) / 430) ** 2)) + wob * Math.sin(x / 97 + ph);
const XS = Array.from({ length: W / 20 + 1 }, (_, i) => i * 20);
const line = (f: Hz, xs = XS) => xs.map((x, i) => `${i ? "L" : "M"}${x},${f(x).toFixed(1)}`).join(" ");
const band = (a: Hz, b: Hz) => `${line(a)} ${[...XS].reverse().map((x) => `L${x},${b(x).toFixed(1)}`).join(" ")} Z`;

const SEABED = hz(40, 0, 0, 4);
const HORIZONS: Hz[] = [SEABED, hz(230, 40, 1), hz(430, 70, 2), hz(620, 100, 3), hz(720, 120, 4), hz(900, 130, 5), hz(1010, 130, 6), hz(1250, 110, 7), hz(1550, 80, 8), () => HH];
const FILLS = ["#123A5C", "#10324F", "#0F2B45", "#13304C", "#0E253D", "#162C45", "#0D2136", "#0C1D31", "#0B1A2C"];
const RES_TOP = HORIZONS[5], RES_BASE = HORIZONS[6];
const OWC = 860;
/** Horizons that light up as seismic reflections, with their beat (s). */
const REFLECTIONS: [Hz, number][] = [[HORIZONS[1], 5.5], [HORIZONS[2], 6.5], [HORIZONS[3], 7.5], [HORIZONS[4], 8.5]];
/** Hydrocarbon column: crest of the reservoir down to the fluid contact. */
const ACCUM = (() => {
  const xs = XS.filter((x) => RES_TOP(x) < OWC);
  return `${line(RES_TOP, xs)} ${[...xs].reverse().map((x) => `L${x},${Math.min(OWC, RES_BASE(x)).toFixed(1)}`).join(" ")} Z`;
})();
const CREST_Y = RES_TOP(CX);
const devWell = (tx: number) => `M${CX},${SEABED(CX)} C${CX},320 ${tx},${RES_TOP(tx) - 360} ${tx},${RES_TOP(tx) + 4}`;
const midRes = (x: number) => (RES_TOP(x) + Math.min(OWC, RES_BASE(x))) / 2;
const flowPath = (from: number, to: number) => line(midRes, Array.from({ length: 12 }, (_, i) => from + ((to - from) * i) / 11));

export function ShowReel() {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [stage, setStage] = useState(-1);
  const [run, setRun] = useState(0);
  const [muted, setMuted] = useState(false);
  const audio = useRef<ReturnType<typeof playReelAudio> | null>(null);

  const start = useCallback(() => {
    window.scrollTo(0, 0);
    setStage(-1);
    setPhase("playing");
    audio.current?.stop();
    audio.current = playReelAudio();
    if (muted) audio.current.toggleMute();
  }, [muted]);
  useEffect(() => () => audio.current?.stop(), []);

  // Mirror the phase on <html> for the Hero reveal and scroll lock.
  useEffect(() => {
    document.documentElement.dataset.reel = phase === "gone" ? "done" : phase;
  }, [phase]);
  useEffect(() => () => void delete document.documentElement.dataset.reel, []);

  // Keyed on "running" (not phase) so the playing → done switch doesn't cancel the remaining timers.
  const running = phase === "playing" || phase === "done";
  useEffect(() => {
    if (!running) return;
    const timers = [
      ...STAGE_AT.map((t, i) => setTimeout(() => setStage(i), t * 1000)),
      setTimeout(() => setPhase("done"), REVEAL_AT * 1000),
      setTimeout(() => setPhase("gone"), END_AT * 1000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [running, run]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase === "waiting" && (e.code === "Space" || e.code === "Enter")) {
        e.preventDefault();
        start();
      } else if (e.code === "Escape" && phase !== "gone") {
        audio.current?.stop();
        setPhase("gone");
      } else if (e.code === "KeyM") {
        audio.current?.toggleMute();
        setMuted((m) => !m);
      } else if (e.code === "KeyR" && phase === "gone") {
        window.scrollTo(0, 0);
        setRun((r) => r + 1);
        setPhase("waiting");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, start]);

  if (phase === "gone") return null;
  const playing = phase !== "waiting";

  return (
    <div key={run} className={cx(s.reel, playing && s.playing)} onClick={playing ? undefined : start} aria-label="Intro reel" role="presentation">
      {/* The camera: sky (photo) → water → strata, moved by the `world` keyframes */}
      <div className={s.world} aria-hidden>
        <section className={s.sky}><div className={s.photo} /></section>
        <section className={s.water}>
          <div className={s.rays} />
        </section>
        <section className={s.strata}>
          <svg className={s.svg} viewBox={`0 0 ${W} ${HH}`} preserveAspectRatio="none">
            {HORIZONS.slice(0, -1).map((f, i) => <path key={i} d={band(f, HORIZONS[i + 1])} fill={FILLS[i]} />)}
            {HORIZONS.slice(1, -1).map((f, i) => <path key={i} d={line(f)} className={s.horizon} vectorEffect="non-scaling-stroke" />)}
            <path d={line(SEABED)} className={s.seabed} vectorEffect="non-scaling-stroke" />

            {/* Seismic wavefronts from the surface */}
            {[5.0, 6.0].map((d) => <circle key={d} cx={CX} cy={0} r={1100} className={s.wave} style={at(d)} vectorEffect="non-scaling-stroke" />)}
            {/* Reflections light up on the beat */}
            {REFLECTIONS.map(([f, d]) => <path key={d} d={line(f)} pathLength={1} className={s.reflect} style={at(d)} vectorEffect="non-scaling-stroke" />)}

            {/* Discovery: the well reaches the crest, the accumulation appears */}
            <path d={ACCUM} className={s.accum} />
            <path d={`M${CX},${SEABED(CX)} L${CX},${CREST_Y + 4}`} pathLength={1} className={s.well} style={at(9.0)} vectorEffect="non-scaling-stroke" />
            {/* Development: more wells fan out to the reservoir */}
            {[[560, 10.2], [1040, 10.35]].map(([tx, d]) => (
              <path key={tx} d={devWell(tx)} pathLength={1} className={cx(s.well, s.devWell)} style={at(d)} vectorEffect="non-scaling-stroke" />
            ))}
            {/* Production: fluid moves toward the wells */}
            {[flowPath(380, 760), flowPath(1220, 840)].map((d, i) => <path key={i} d={d} pathLength={1} className={s.flow} vectorEffect="non-scaling-stroke" />)}
          </svg>
          <div className={s.flash} style={{ top: `${(CREST_Y / HH) * 100}%` }} />
        </section>
      </div>

      {/* 0–2 s: ping in the dark */}
      <div className={s.intro} aria-hidden>
        <svg viewBox="-200 -200 400 400" className={s.rings}>
          {[0.1, 0.35, 0.6].map((d) => <circle key={d} r={180} style={at(d)} vectorEffect="non-scaling-stroke" />)}
          <circle r={3} className={s.dot} />
        </svg>
      </div>

      {/* Captions: 3–5 words each */}
      <p className={cx(s.cap, s.question)} style={at(0.4, 1.9)}>Where could hydrocarbons exist?</p>
      <p className={cx(s.cap, s.lead)} style={at(2.5, 1.5)}>It starts at the surface.</p>
      {[[5.2, 1.8, "Exploration"], [7.0, 1.95, "Appraisal"], [9.0, 1.5, "Development"], [10.5, 1.6, "Production"]].map(([d, dur, t]) => (
        <p key={t as string} className={cx(s.cap, s.stageCap)} style={at(d as number, dur as number)}>{t}</p>
      ))}

      {/* HUD: the five Journey stages tick through */}
      <ol className={cx(s.hud, stage >= 0 && stage < STAGES.length && s.hudOn)} aria-hidden>
        {STAGES.map((st, i) => (
          <li key={st.id} className={cx(i === stage && s.active, i < stage && s.past)}>
            <span>{st.num}</span>{st.label}
          </li>
        ))}
      </ol>
      <div className={s.curve} aria-hidden>
        <span>Production · illustrative</span>
        <svg viewBox="0 0 240 90" preserveAspectRatio="none">
          <path d="M0,70 C14,18 30,10 52,12 C90,16 120,40 160,58 S220,76 240,78" pathLength={1} vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      {/* 12.5 s: surfacing into daylight, presenter card */}
      <div className={s.daylight} />
      <div className={s.credit}>
        <span className={s.creditEvent} style={at(13.0)}>{PRESENTER.event}</span>
        <span className={s.creditName} style={at(13.15)}>{PRESENTER.name}</span>
        <span className={s.creditTeam} style={at(13.3)}>{PRESENTER.org} · {PRESENTER.team}</span>
      </div>

      {!playing && <p className={s.hint}>Press Space to begin · M sound {muted ? "off" : "on"}</p>}
    </div>
  );
}
