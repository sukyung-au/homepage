"use client";
import { useEffect, useMemo, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { IsoGrid, rampColor } from "./IsoGrid";
import { MODEL_WELLS, NX, NY, STEPS, fieldAt, phaseAt, pressureAt, waterAt, type Mode } from "./conceptModel";
import s from "./Simulation.module.css";

/** Milliseconds per time step while playing (full run ≈ 6 s) */
const TICK = 100;

const MODES: Record<Mode, { label: string; ramp: "pressure" | "saturation"; low: string; high: string; meaning: string }> = {
  pressure: {
    label: "Pressure",
    ramp: "pressure",
    low: "Lower",
    high: "Initial pressure",
    meaning: "각 셀의 압력을 초기 압력 대비 상대값으로 표시합니다. 유체가 빠져나가는 생산정 주변에서 압력이 먼저 낮아지고, 주입정 주변은 주입된 물이 압력을 지지합니다.",
  },
  water: {
    label: "Water Saturation",
    ramp: "saturation",
    low: "Initial",
    high: "Swept by injected water",
    meaning: "각 셀의 공극 중 물이 차지하는 정도를 초기 상태 대비로 표시합니다. 주입된 물은 투과도가 높은 셀과 생산정 방향으로 더 빨리 퍼집니다.",
  },
};

/**
 * Interactive view for "Run the Simulation": a time slider with play / pause / reset, a pressure ↔ water
 * saturation toggle, and the well schedule with a time cursor. Values come from conceptModel.ts (simplified
 * relationships, not simulator output).
 */
export function RunSimulator() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [mode, setMode] = useState<Mode>("pressure");
  const t = step / STEPS;
  const running = playing && step < STEPS;

  // One time step per tick while playing; stops by itself at the last step
  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => setStep((k) => Math.min(STEPS, k + 1)), TICK);
    return () => clearTimeout(id);
  }, [running, step]);

  const field = useMemo(() => fieldAt(mode, t), [mode, t]);
  const m = MODES[mode];
  const phase = phaseAt(t);
  const wells = MODEL_WELLS.map((w) => ({ i: w.i, j: w.j, kind: w.kind, label: w.label, inactive: t < w.on }));

  const togglePlay = () => {
    if (running) setPlaying(false);
    else { if (step >= STEPS) setStep(0); setPlaying(true); }
  };
  const reset = () => { setPlaying(false); setStep(0); };

  return (
    <figure className={s.sim} aria-label="Conceptual reservoir simulation viewer">
      <div className={s.simBar}>
        <div className={s.modes} role="group" aria-label="Displayed property">
          {(Object.keys(MODES) as Mode[]).map((k) => (
            <button key={k} type="button" aria-pressed={mode === k} className={mode === k ? s.modeOn : s.mode} onClick={() => setMode(k)}>{MODES[k].label}</button>
          ))}
        </div>
        <span className={s.stepRead}>Time step <b>{step}</b> / {STEPS}</span>
      </div>

      <IsoGrid nx={NX} ny={NY} nz={3} cell={30} layer={18} field={field} ramp={m.ramp} wells={wells} label={`${m.label} at time step ${step} of ${STEPS} (conceptual)`} className={s.simGrid} />

      <div className={s.simKey}>
        <span className={s.keyEnd}>{m.low}</span>
        <span className={s.keyBarWide} style={{ background: `linear-gradient(90deg, ${rampColor(m.ramp, 0)}, ${rampColor(m.ramp, 1)})` }} />
        <span className={s.keyEnd}>{m.high}</span>
        <span className={s.keyNote}>{mode === "pressure" ? "relative to initial pressure" : "relative to initial water saturation"}</span>
      </div>

      <div className={s.controls}>
        <button type="button" className={s.ctrlMain} onClick={togglePlay} aria-label={running ? "Pause" : "Play"}>
          {running ? <Pause size={16} aria-hidden /> : <Play size={16} aria-hidden />}
          <span>{running ? "Pause" : "Play"}</span>
        </button>
        <button type="button" className={s.ctrl} onClick={reset} aria-label="Reset to the initial state"><RotateCcw size={15} aria-hidden /><span>Reset</span></button>
        <input
          type="range" min={0} max={STEPS} step={1} value={step} className={s.slider}
          onChange={(e) => { setPlaying(false); setStep(Number(e.target.value)); }}
          aria-label="Simulation time" aria-valuetext={`Time step ${step} of ${STEPS}: ${phase.title}`}
        />
      </div>

      <div className={s.schedule} aria-label="Well schedule">
        <span className={s.runLabel}>Well schedule</span>
        {MODEL_WELLS.map((w) => (
          <div key={w.id} className={s.schedRow}>
            <span>{w.label}</span>
            <span className={s.track}>
              <span className={w.kind === "injector" ? s.barBlue : s.barNavy} style={{ left: `${w.on * 100}%`, width: `${(1 - w.on) * 100}%` }} />
              <span className={s.cursor} style={{ left: `${t * 100}%` }} aria-hidden />
            </span>
          </div>
        ))}
      </div>

      <div className={s.explain}>
        <div aria-live="polite">
          <span className={s.phaseTitle}>{phase.title}</span>
          <p>{phase.body}</p>
        </div>
        <div>
          <span className={s.phaseTitle}>{m.label}</span>
          <p>{m.meaning}</p>
        </div>
      </div>

      <ul className={s.readout} aria-label="Values at the wells (relative)">
        {MODEL_WELLS.map((w) => {
          const v = mode === "pressure" ? pressureAt(w.i, w.j, t) : waterAt(w.i, w.j, t);
          return (
            <li key={w.id}>
              <span>{w.label}</span>
              <span className={s.meter}><span style={{ width: `${Math.round(v * 100)}%`, background: rampColor(m.ramp, 0.85) }} /></span>
              <span className={s.meterVal}>{mode === "pressure" ? `${Math.round(v * 100)}% of initial` : v < 0.05 ? "initial" : v < 0.5 ? "rising" : "high"}</span>
            </li>
          );
        })}
      </ul>

      <figcaption className={s.caption}>
        Conceptual model — simplified relationships for teaching, not output of a reservoir simulator (e.g. ECLIPSE, INTERSECT). No field data.
      </figcaption>
    </figure>
  );
}
