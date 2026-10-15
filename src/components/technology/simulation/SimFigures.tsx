import type { ReactNode } from "react";
import { IsoGrid, conceptFront, conceptPattern, rampColor, type Ramp } from "./IsoGrid";
import s from "./Simulation.module.css";

/**
 * Step figures for the Reservoir Simulation topic. Each is a self-contained, server-rendered conceptual
 * illustration (axes are named, never scaled; no values) so it can be swapped for an interactive version later.
 */

const NX = 10, NY = 6;
export const SIM_WELLS = [
  { i: 3, j: 2, kind: "producer" as const, label: "Producer" },
  { i: 6, j: 3, kind: "producer" as const, label: "Producer" },
  { i: 9, j: 0, kind: "injector" as const, label: "Injector" },
];

export function Figure({ children, caption = "Conceptual illustration — not to scale, no data.", note }: { children: ReactNode; caption?: string; note?: string }) {
  return (
    <figure className={s.figure}>
      {children}
      <figcaption className={s.caption}>
        {caption}
        {note && <span className={s.soon}>{note}</span>}
      </figcaption>
    </figure>
  );
}

/** Small "low → high" legend for a ramp (no values) */
function RampKey({ ramp, label }: { ramp: Ramp; label: string }) {
  return (
    <span className={s.key}>
      <span className={s.keyBar} style={{ background: `linear-gradient(90deg, ${rampColor(ramp, 0)}, ${rampColor(ramp, 1)})` }} />
      {label} · low → high
    </span>
  );
}

/** Hero: empty grid model with producers and the injector — the future interactive view */
export function HeroModel() {
  return (
    <Figure note="Interactive time view · in preparation">
      <IsoGrid nx={NX} ny={NY} nz={3} cell={30} layer={18} wells={SIM_WELLS} label="Conceptual 2.5D reservoir grid with two production wells and one injection well" className={s.heroIso} />
    </Figure>
  );
}

/** 01 Static model: one grid, three cell properties */
export function StaticLayers() {
  const props: [Ramp, string, number][] = [["porosity", "Porosity", 1], ["permeability", "Permeability", 3], ["saturation", "Saturation", 5]];
  return (
    <Figure>
      <div className={s.layers}>
        {props.map(([ramp, name, seed]) => (
          <div key={name} className={s.layer}>
            <IsoGrid nx={NX} ny={NY} nz={1} cell={13} layer={6} compact field={conceptPattern(NX, NY, seed)} ramp={ramp} label={`Conceptual grid coloured by ${name.toLowerCase()}`} />
            <span className={s.layerName}>{name}</span>
            <RampKey ramp={ramp} label={name} />
          </div>
        ))}
      </div>
    </Figure>
  );
}

/** Axes frame for the small conceptual charts */
function Axes({ x, y, children, w = 220, h = 140 }: { x: string; y: string; children: ReactNode; w?: number; h?: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={w > 220 ? `${s.chart} ${s.chartWide}` : s.chart} role="img" aria-label={`${y} versus ${x} (conceptual)`}>
      <line x1="22" y1="12" x2="22" y2={h - 22} className={s.axis} />
      <line x1="22" y1={h - 22} x2={w - 6} y2={h - 22} className={s.axis} />
      <text x="26" y="10" className={s.axisLabel}>{y}</text>
      <text x={w - 6} y={h - 8} textAnchor="end" className={s.axisLabel}>{x}</text>
      {children}
    </svg>
  );
}

/** 02 Dynamic model: relative permeability, PVT, rock compressibility */
export function FluidCurves() {
  return (
    <Figure>
      <div className={s.trio}>
        <div>
          <Axes x="Water saturation" y="Relative permeability">
            <path d="M30,24 C70,40 120,96 196,116" className={s.lineNavy} />
            <path d="M30,118 C100,116 150,90 196,30" className={s.lineBlue} />
            <text x="40" y="38" className={s.tag}>Oil</text>
            <text x="178" y="44" className={s.tagBlue}>Water</text>
          </Axes>
          <span className={s.trioName}>Relative Permeability</span>
        </div>
        <div>
          <Axes x="Pressure" y="Oil formation volume factor">
            <path d="M28,100 C70,84 110,62 130,48 L196,58" className={s.lineNavy} />
            <line x1="130" y1="48" x2="130" y2="118" className={s.guide} />
            <text x="134" y="112" className={s.tag}>Bubble point</text>
          </Axes>
          <span className={s.trioName}>PVT</span>
        </div>
        <div>
          <Axes x="Pressure" y="Pore volume">
            <path d="M28,104 L196,52" className={s.lineNavy} />
          </Axes>
          <span className={s.trioName}>Rock Compressibility</span>
        </div>
      </div>
    </Figure>
  );
}

/** 03 Run: initialization → well schedule → time steps (conceptual water front from the injector) */
export function RunSteps() {
  const inj: [number, number][] = [[9.5, 0.5]];
  const rows: [string, number, number, string][] = [["Producer", 6, 100, s.barNavy], ["Producer", 22, 100, s.barNavy], ["Injector", 34, 100, s.barBlue]];
  return (
    <Figure note="Time slider · in preparation">
      <div className={s.run}>
        <div className={s.schedule} aria-label="Conceptual well schedule">
          <span className={s.runLabel}>Well schedule</span>
          {rows.map(([name, a, b, cls], n) => (
            <div key={n} className={s.schedRow}>
              <span>{name}</span>
              <span className={s.track}><span className={cls} style={{ left: `${a}%`, width: `${b - a}%` }} /></span>
            </div>
          ))}
          <div className={s.schedAxis}><span>Start</span><span>Time →</span></div>
        </div>
        <div className={s.frames}>
          {[["Initialization", 0], ["Time step", 3], ["Later time step", 6]].map(([name, r]) => (
            <div key={name} className={s.frame}>
              <IsoGrid nx={NX} ny={NY} nz={2} cell={11} layer={6} compact field={conceptFront(NX, NY, inj, r as number)} ramp="saturation" wells={SIM_WELLS} label={`${name}: conceptual water saturation`} />
              <span className={s.frameName}>{name}</span>
            </div>
          ))}
        </div>
        <RampKey ramp="saturation" label="Water saturation" />
      </div>
    </Figure>
  );
}

/** 04 History matching: observed history vs calibration cases */
export function HistoryCases() {
  const obs: [number, number][] = [[34, 108], [56, 92], [78, 82], [100, 76], [124, 74], [146, 76], [170, 80], [194, 86], [216, 90], [240, 96], [262, 100]];
  return (
    <Figure>
      <Axes x="Time" y="Production rate / Pressure" w={300} h={170}>
        <path d="M28,112 C80,70 160,52 290,60" className={s.caseA} />
        <path d="M28,112 C80,96 160,104 290,128" className={s.caseB} />
        <path d="M28,114 C70,82 130,68 290,104" className={s.lineBlue} />
        {obs.map(([x, y]) => <circle key={x} cx={x} cy={y} r="3" className={s.obs} />)}
      </Axes>
      <div className={s.legend}>
        <span><i className={s.lgObs} />Observed history</span>
        <span><i className={s.lgCaseA} />Case A</span>
        <span><i className={s.lgCaseB} />Case B</span>
        <span><i className={s.lgMatch} />Calibrated case</span>
      </div>
    </Figure>
  );
}

/** 05 Forecast: from the matched history into alternative development cases */
export function ForecastCases() {
  return (
    <Figure>
      <Axes x="Time" y="Production rate" w={300} h={170}>
        <path d="M28,120 C50,60 90,50 140,62" className={s.lineNavy} />
        <line x1="140" y1="14" x2="140" y2="148" className={s.guide} />
        <text x="144" y="22" className={s.tag}>Forecast →</text>
        <path d="M140,62 C190,80 240,100 290,116" className={s.caseBase} />
        <path d="M140,62 C160,44 200,50 290,84" className={s.lineBlue} />
        <path d="M140,62 C190,64 240,72 290,92" className={s.lineCyan} />
      </Axes>
      <div className={s.legend}>
        <span><i className={s.lgHist} />History (matched)</span>
        <span><i className={s.lgBase} />Base case</span>
        <span><i className={s.lgMatch} />New production wells</span>
        <span><i className={s.lgCyan} />Water injection</span>
      </div>
    </Figure>
  );
}
