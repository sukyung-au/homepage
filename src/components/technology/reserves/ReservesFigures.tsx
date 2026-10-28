import f from "../fundamentals/Fundamentals.module.css";
import x from "./Reserves.module.css";

/**
 * Topic 4.1 figures. Conceptual shapes only: no axis values, no field data. Curve shapes follow the
 * relations they illustrate (Arps decline, straight-line p/z) so the pictures read correctly.
 */

/* ── Opening: which method, when ── */
const PHASES: [number, string][] = [[190, "Discovery"], [285, "Appraisal"], [385, "Development"], [490, "Production"], [585, "Mature"]];
const BARS: { y: number; label: string; from: number; strong: number; key?: boolean }[] = [
  { y: 140, label: "Volumetric", from: 170, strong: 400 },
  { y: 180, label: "Reservoir Simulation", from: 320, strong: 620, key: true },
  { y: 220, label: "Material Balance", from: 430, strong: 620 },
  { y: 260, label: "Decline Curve Analysis", from: 490, strong: 620 },
];

export function MethodTimeline() {
  return (
    <svg viewBox="0 0 640 340" className={f.graph} role="img" aria-label="Conceptual timeline: volumetric estimates are used from discovery, reservoir simulation from development planning, material balance and decline curve analysis once production and pressure history exist; the range of estimates narrows as data accumulate">
      <path d="M170,32 C330,52 450,62 620,66 L620,76 C450,80 330,90 170,112 Z" className={x.funnel} />
      <text x="176" y="76" className={f.gTinyBlue}>Range of estimates</text>
      <text x="620" y="22" className={f.gTiny} textAnchor="end">narrows as data accumulate →</text>
      {BARS.map((b) => (
        <g key={b.label}>
          <text x="160" y={b.y + 13} className={f.gNote} textAnchor="end">{b.label}</text>
          <rect x={b.from} y={b.y} width={620 - b.from} height="18" rx="2" className={x.barSoft} />
          <rect x={b.from} y={b.y} width={b.strong - b.from} height="18" rx="2" className={b.key ? x.barKey : x.bar} />
        </g>
      ))}
      <path d="M170,300 H620" className={f.gAxis} />
      {PHASES.map(([px, label]) => (
        <g key={label}>
          <path d={`M${px},296 V304`} className={f.gAxis} />
          <text x={px} y="322" className={f.gTiny} textAnchor="middle">{label}</text>
        </g>
      ))}
      <text x="620" y="338" className={f.gAxisLabel} textAnchor="end">Field life →</text>
    </svg>
  );
}

/* ── 02 PRMS framework (simplified from PRMS Figure 1.1) ── */
export function PrmsFramework() {
  const cols = [200, 327, 454, 580];
  const row = (y: number, h: number, labels: string[], cls: string) => labels.map((l, i) => (
    <g key={l}>
      <rect x={cols[i] + 2} y={y} width={cols[i + 1] - cols[i] - 4} height={h} rx="2" className={cls} />
      <text x={(cols[i] + cols[i + 1]) / 2} y={y + h / 2 + 4} className={f.gNote} textAnchor="middle">{l}</text>
    </g>
  ));
  return (
    <svg viewBox="0 0 640 380" className={f.graph} role="img" aria-label="Simplified PRMS resources classification: discovered commercial quantities are Production and Reserves (1P, 2P, 3P); discovered sub-commercial quantities are Contingent Resources (1C, 2C, 3C); undiscovered quantities are Prospective Resources (low, best, high); the rest is unrecoverable">
      <rect x="20" y="20" width="84" height="226" rx="2" className={x.cellDim} />
      <text x="62" y="128" className={f.gNote} textAnchor="middle">Discovered</text>
      <text x="62" y="144" className={f.gTiny} textAnchor="middle">PIIP</text>
      <rect x="20" y="254" width="84" height="100" rx="2" className={x.cellDim} />
      <text x="62" y="300" className={f.gNote} textAnchor="middle">Undiscovered</text>
      <text x="62" y="316" className={f.gTiny} textAnchor="middle">PIIP</text>

      <rect x="108" y="20" width="88" height="128" rx="2" className={x.cellDim} />
      <text x="152" y="88" className={f.gNote} textAnchor="middle">Commercial</text>
      <rect x="108" y="152" width="88" height="94" rx="2" className={x.cellDim} />
      <text x="152" y="196" className={f.gNote} textAnchor="middle">Sub-</text>
      <text x="152" y="210" className={f.gNote} textAnchor="middle">commercial</text>

      <rect x="202" y="20" width="376" height="34" rx="2" className={x.cellProd} />
      <text x="390" y="41" className={f.gNote} textAnchor="middle">Production</text>
      <text x="390" y="74" className={f.gTinyBlue} textAnchor="middle">RESERVES</text>
      {row(82, 66, ["1P · Proved", "2P · + Probable", "3P · + Possible"], x.cellReserve)}
      <text x="390" y="168" className={f.gTiny} textAnchor="middle">CONTINGENT RESOURCES</text>
      {row(176, 40, ["1C", "2C", "3C"], x.cellContingent)}
      <rect x="202" y="220" width="376" height="26" rx="2" className={x.cellDim} />
      <text x="390" y="237" className={f.gTiny} textAnchor="middle">Unrecoverable</text>
      <text x="390" y="270" className={f.gTiny} textAnchor="middle">PROSPECTIVE RESOURCES</text>
      {row(278, 40, ["Low", "Best", "High"], x.cellProspect)}
      <rect x="202" y="322" width="376" height="32" rx="2" className={x.cellDim} />
      <text x="390" y="342" className={f.gTiny} textAnchor="middle">Unrecoverable</text>

      <path d="M610,350 V30" className={x.arrow} markerEnd="url(#rs-head)" />
      <text x="626" y="190" className={f.gTiny} textAnchor="middle" transform="rotate(-90 626 190)">Increasing chance of commerciality</text>
      <path d="M210,370 H570" className={x.arrow} markerEnd="url(#rs-head)" />
      <text x="390" y="366" className={f.gTiny} textAnchor="middle">Range of uncertainty</text>
      <defs>
        <marker id="rs-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 Z" className={x.arrowHead} />
        </marker>
      </defs>
    </svg>
  );
}

/* ── 03 Volumetric: bulk volume → pore space → hydrocarbon ── */
const GRAINS: [number, number, number][] = [
  [470, 92, 24], [522, 82, 20], [566, 110, 22], [452, 146, 22], [502, 132, 24], [552, 160, 20],
  [486, 186, 22], [534, 204, 24], [586, 190, 18], [440, 198, 16], [508, 240, 20], [562, 236, 16], [600, 146, 14],
];

export function VolumetricBlock() {
  return (
    <svg viewBox="0 0 640 300" className={f.graph} role="img" aria-label="Conceptual reservoir block with area A and net thickness h; a magnified view shows rock grains, pore space (porosity) and the water that coats the grains (water saturation), with oil filling the rest of the pores">
      <defs>
        <clipPath id="rs-lens"><circle cx="520" cy="160" r="100" /></clipPath>
      </defs>
      <path d="M40,110 L280,80 L360,130 L120,160 Z" className={x.slabTop} />
      <path d="M120,160 L360,130 L360,200 L120,230 Z" className={x.slabFront} />
      <path d="M40,110 L120,160 L120,230 L40,180 Z" className={x.slabSide} />
      <text x="200" y="124" className={f.gNote} textAnchor="middle">A · area</text>
      <path d="M374,130 V200 M368,130 H380 M368,200 H380" className={x.dim} />
      <text x="380" y="222" className={f.gNote} textAnchor="middle">h · net thickness</text>
      <text x="200" y="262" className={f.gTiny} textAnchor="middle">Bulk rock volume = A × h</text>

      <path d="M300,150 L424,130" className={x.lensLine} />
      <g clipPath="url(#rs-lens)">
        <rect x="420" y="60" width="200" height="200" className={x.oil} />
        {GRAINS.map(([cx, cy, r]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r + 4} className={x.water} />)}
        {GRAINS.map(([cx, cy, r]) => <circle key={`g${cx}-${cy}`} cx={cx} cy={cy} r={r} className={x.grain} />)}
      </g>
      <circle cx="520" cy="160" r="100" className={x.lens} />
      <text x="505" y="284" className={f.gTiny} textAnchor="middle">Grains · water film (Sw) · oil in the pores</text>
    </svg>
  );
}

/* ── 04 Material balance: tank, and the gas p/z straight line ── */
export function TankModel() {
  return (
    <svg viewBox="0 0 320 280" className={f.graph} role="img" aria-label="Tank model: the reservoir is treated as one tank; produced oil, gas and water are balanced against expansion of the fluids and rock and against water flowing in from an aquifer">
      <rect x="60" y="70" width="200" height="150" rx="6" className={x.tank} />
      <rect x="62" y="72" width="196" height="36" rx="4" className={x.gasCap} />
      <rect x="62" y="108" width="196" height="76" className={x.oilFill} />
      <rect x="62" y="184" width="196" height="34" rx="4" className={x.waterFill} />
      <text x="160" y="94" className={f.gTiny} textAnchor="middle">Gas cap</text>
      <text x="160" y="150" className={f.gNote} textAnchor="middle">Oil</text>
      <text x="160" y="206" className={f.gTiny} textAnchor="middle">Water</text>
      <path d="M160,70 V24" className={x.flowOut} markerEnd="url(#rs-out)" />
      <text x="172" y="30" className={f.gTinyBlue}>Production</text>
      <text x="172" y="44" className={f.gTiny}>oil · gas · water</text>
      <path d="M10,200 H58" className={x.flowIn} markerEnd="url(#rs-in)" />
      <text x="10" y="236" className={f.gTiny}>Water influx</text>
      <text x="10" y="250" className={f.gTiny}>(aquifer)</text>
      <path d="M272,96 l18,-10 M272,146 l18,0 M272,196 l18,10" className={x.expand} />
      <text x="300" y="150" className={f.gTiny} textAnchor="middle" transform="rotate(90 300 150)">Fluid & rock expansion</text>
      <defs>
        <marker id="rs-out" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 Z" className={x.headBlue} /></marker>
        <marker id="rs-in" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 Z" className={x.headNavy} /></marker>
      </defs>
    </svg>
  );
}

const PZ_PTS: [number, number][] = [70, 104, 140, 172, 206, 240].map((px) => [px, 46 + (190 / 278) * (px - 60)]);

export function PzPlot() {
  return (
    <svg viewBox="0 0 360 296" className={f.graph} role="img" aria-label="Conceptual p/z plot for a gas reservoir: p/z falls on a straight line against cumulative gas produced; extending the line to p/z equal to zero gives the original gas in place; points bending upward suggest water drive">
      <path d="M50,20 V240 H344" className={f.gAxis} />
      <path d="M60,46 L240,169" className={x.fitLine} />
      <path d="M240,169 L338,236" className={x.extrap} />
      {PZ_PTS.map(([px, py]) => <circle key={px} cx={px} cy={py} r="4.5" className={x.point} />)}
      <path d="M206,145.8 C232,154 258,160 284,163" className={x.waterDrive} />
      {[[232, 154], [258, 160], [284, 163]].map(([px, py]) => <circle key={px} cx={px} cy={py} r="4" className={x.pointAmber} />)}
      <text x="290" y="152" className={x.amberText}>water drive?</text>
      <circle cx="338" cy="236" r="6" className={x.target} />
      <text x="338" y="258" className={f.gTinyBlue} textAnchor="middle">G · OGIP</text>
      <text x="300" y="282" className={f.gAxisLabel} textAnchor="end">Cumulative gas produced, Gp →</text>
      <text x="34" y="20" className={f.gAxisLabel} transform="rotate(-90 34 20)" textAnchor="end">p/z →</text>
    </svg>
  );
}

/* ── 05 Decline curve analysis (semi-log rate vs time) ── */
const X = (t: number) => 70 + t * 340;
const Y = (q: number) => 40 + -Math.log10(q) * 180;
const D_HIST = 3;
const B_HIST = 0.5;
const T_NOW = 0.4;
const Q_NOW = 1 / Math.pow(1 + B_HIST * D_HIST * T_NOW, 1 / B_HIST);
const D_NOW = D_HIST / (1 + B_HIST * D_HIST * T_NOW);
const Q_LIMIT = 0.1;
const arps = (b: number, tau: number) => (b === 0 ? Q_NOW * Math.exp(-D_NOW * tau) : Q_NOW / Math.pow(1 + b * D_NOW * tau, 1 / b));

function forecast(b: number) {
  const pts: [number, number][] = [];
  let end: [number, number] | null = null;
  for (let tau = 0; tau <= 1.2001; tau += 0.02) {
    const q = arps(b, tau);
    if (q < Q_LIMIT) { end = [X(T_NOW + tau), Y(Q_LIMIT)]; pts.push(end); break; }
    pts.push([X(T_NOW + tau), Y(q)]);
  }
  return { d: "M" + pts.map(([a, c]) => `${a.toFixed(1)},${c.toFixed(1)}`).join(" L"), end };
}

const HIST_DOTS = Array.from({ length: 16 }, (_, i) => {
  const t = 0.02 + i * 0.025;
  const q = 1 / Math.pow(1 + B_HIST * D_HIST * t, 1 / B_HIST);
  const jitter = [0.06, -0.05, 0.03, -0.07, 0.05, 0.0, -0.04, 0.07, -0.03, 0.04, -0.06, 0.02, 0.05, -0.05, 0.03, -0.02][i];
  return [X(t), Y(q) + jitter * 60] as [number, number];
});

const HIST_FIT = "M" + Array.from({ length: 21 }, (_, i) => {
  const t = (T_NOW * i) / 20;
  return `${X(t).toFixed(1)},${Y(1 / Math.pow(1 + B_HIST * D_HIST * t, 1 / B_HIST)).toFixed(1)}`;
}).join(" L");

const CURVES: { b: number; label: string; cls: string }[] = [
  { b: 0, label: "Exponential · b = 0", cls: x.dcaExp },
  { b: 0.5, label: "Hyperbolic · 0 < b < 1", cls: x.dcaHyp },
  { b: 1, label: "Harmonic · b = 1", cls: x.dcaHar },
];

export function DeclinePlot() {
  return (
    <svg viewBox="0 0 640 340" className={f.graph} role="img" aria-label="Conceptual decline curve analysis on a semi-log plot: production history is fitted with an Arps curve and extended to the economic limit; exponential, hyperbolic and harmonic forecasts reach the limit at different times and give different ultimate recovery">
      <rect x={X(T_NOW)} y="20" width={620 - X(T_NOW)} height="276" className={x.forecastBand} />
      <path d="M70,16 V296 H624" className={f.gAxis} />
      {HIST_DOTS.map(([a, c]) => <circle key={a} cx={a} cy={c} r="3.5" className={x.point} />)}
      <path d={HIST_FIT} className={x.dcaFit} />
      {CURVES.map((c) => {
        const { d, end } = forecast(c.b);
        return (
          <g key={c.label}>
            <path d={d} className={c.cls} />
            {end && <circle cx={end[0]} cy={end[1]} r="5" className={x.target} />}
          </g>
        );
      })}
      <path d={`M70,${Y(Q_LIMIT)} H620`} className={x.limit} />
      <text x="616" y={Y(Q_LIMIT) + 16} className={x.amberText} textAnchor="end">Economic limit</text>
      <path d={`M${X(T_NOW)},20 V296`} className={f.gGuide} />
      <text x={X(T_NOW) - 8} y="34" className={f.gTiny} textAnchor="end">History (fit)</text>
      <text x={X(T_NOW) + 8} y="34" className={f.gTinyBlue}>Forecast</text>
      <text x="620" y="318" className={f.gAxisLabel} textAnchor="end">Time →</text>
      <text x="54" y="16" className={f.gAxisLabel} transform="rotate(-90 54 16)" textAnchor="end">Rate (log) →</text>
    </svg>
  );
}

export const DCA_LEGEND = CURVES.map(({ label, cls }) => ({ label, cls }));

/* ── 06 Simulation: model → history match → forecast ── */
const GRID = Array.from({ length: 24 }, (_, i) => [i % 6, Math.floor(i / 6)] as const);
const SHADE = [3, 2, 2, 1, 1, 0, 3, 3, 2, 2, 1, 1, 2, 3, 3, 2, 2, 1, 1, 2, 3, 3, 2, 1];

export function SimModel() {
  return (
    <svg viewBox="0 0 220 150" className={f.graph} role="img" aria-label="A gridded reservoir model; cell shading shows varying rock properties">
      {GRID.map(([c, r], i) => (
        <rect key={i} x={20 + c * 30} y={20 + r * 28} width="30" height="28" className={x[`cell${SHADE[i]}`]} />
      ))}
      <path d="M95,6 V132" className={x.wellLine} />
      <circle cx="95" cy="6" r="4" className={x.wellDot} />
    </svg>
  );
}

const OBS: [number, number][] = [[24, 40], [44, 52], [64, 60], [84, 72], [104, 78], [124, 90], [144, 96], [164, 104], [184, 112]];

export function SimMatch() {
  return (
    <svg viewBox="0 0 220 150" className={f.graph} role="img" aria-label="History matching: the first simulated curve misses the observed data; after adjusting the model, the simulated curve follows the data">
      <path d="M16,10 V136 H210" className={f.gAxis} />
      <path d="M20,38 C70,48 130,62 200,72" className={x.before} />
      <path d="M20,36 C70,62 130,88 200,116" className={x.after} />
      {OBS.map(([a, c]) => <circle key={a} cx={a} cy={c} r="3.2" className={x.point} />)}
      <text x="200" y="64" className={f.gTiny} textAnchor="end">before</text>
      <text x="200" y="132" className={f.gTinyBlue} textAnchor="end">after match</text>
    </svg>
  );
}

export function SimForecast() {
  return (
    <svg viewBox="0 0 220 150" className={f.graph} role="img" aria-label="Forecast scenarios: from the matched history, low, best and high cases spread into the future">
      <path d="M16,10 V136 H210" className={f.gAxis} />
      <path d="M20,30 C50,44 70,56 92,64" className={x.after} />
      <path d="M92,64 V136" className={f.gGuide} />
      <path d="M92,64 C130,74 170,80 206,84" className={x.fanHigh} />
      <path d="M92,64 C130,82 170,96 206,104" className={x.fanBest} />
      <path d="M92,64 C130,92 170,114 206,124" className={x.fanLow} />
      <text x="206" y="78" className={f.gTiny} textAnchor="end">High</text>
      <text x="206" y="98" className={f.gTinyBlue} textAnchor="end">Best</text>
      <text x="206" y="118" className={f.gTiny} textAnchor="end">Low</text>
    </svg>
  );
}
