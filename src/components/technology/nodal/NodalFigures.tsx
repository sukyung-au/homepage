import f from "../fundamentals/Fundamentals.module.css";
import { PB, X, Y, iprPath, iprRate, vlpPath } from "./nodalModel";
import n from "./Nodal.module.css";

/** Topic 3.5 figures: the production system, IPR and VLP shapes, and one pictogram per lift method. No values. */

/* ── Opening: reservoir → separator, with the nodes ── */
const SURFACE: { x: number; label: string }[] = [
  { x: 150, label: "Wellhead · pwh" },
  { x: 320, label: "Choke" },
  { x: 560, label: "Separator · psep" },
];

export function ProductionSystem() {
  return (
    <svg viewBox="0 0 640 380" className={f.graph} role="img" aria-label="Production system: fluid flows from the reservoir into the well at the bottomhole node, up the tubing to the wellhead, through the choke and flowline to the separator; pressure falls along the way">
      <rect x="20" y="276" width="600" height="56" className={n.reservoir} />
      <text x="608" y="300" className={f.gNote} textAnchor="end">Reservoir · p̄r</text>
      <path d="M20,90 H620" className={n.ground} />
      <path d="M138,90 V332 M162,90 V332" className={n.casing} />
      <path d="M147,60 V300 M153,60 V300" className={n.tubing} />
      <path d="M150,60 H312 M328,60 H524" className={n.flowline} />
      <path d="M312,52 L320,60 L312,68 M328,52 L320,60 L328,68" className={n.choke} />
      <rect x="524" y="44" width="72" height="32" rx="16" className={n.sep} />
      {[56, 92].map((x) => <path key={x} d={`M${x},318 H132`} className={n.inflow} markerEnd="url(#nd-head)" />)}
      {[244, 208].map((x) => <path key={x} d={`M${x},318 H168`} className={n.inflow} markerEnd="url(#nd-head)" />)}
      <path d="M150,284 V112" className={n.upflow} markerEnd="url(#nd-up)" />
      {SURFACE.map((d) => (
        <g key={d.label}>
          <circle cx={d.x} cy="60" r="6" className={n.node} />
          <text x={d.x} y="32" className={f.gNote} textAnchor="middle">{d.label}</text>
        </g>
      ))}
      <circle cx="150" cy="300" r="8" className={n.nodeKey} />
      <text x="176" y="258" className={f.gTinyBlue}>Bottomhole · pwf</text>
      <text x="176" y="272" className={f.gTiny}>solution node</text>
      <text x="176" y="196" className={f.gTiny}>Tubing — gravity + friction</text>
      <text x="440" y="84" className={f.gTiny} textAnchor="middle">Flowline</text>
      <text x="90" y="356" className={f.gTiny} textAnchor="middle">Inflow through the completion</text>
      <defs>
        <marker id="nd-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" className={n.headAmber} /></marker>
        <marker id="nd-up" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 Z" className={n.headBlue} /></marker>
      </defs>
    </svg>
  );
}

/* ── 03 IPR ── */
const PR = 0.9;
export function IprFigure() {
  const aof = iprRate(PR, 0);
  const qb = iprRate(PR, PB);
  return (
    <svg viewBox="0 0 560 330" className={f.graph} role="img" aria-label="Conceptual inflow performance relationship: rate rises as flowing bottomhole pressure falls; a straight line above the bubble point and a curve below it; the rate at zero bottomhole pressure is the absolute open flow">
      <path d="M56,16 V286 H548" className={f.gAxis} />
      <path d={`M56,${Y(PB)} H${X(qb)}`} className={f.gGuide} />
      <path d={iprPath(PR)} className={n.ipr} />
      <circle cx={X(0)} cy={Y(PR)} r="5" className={n.dot} />
      <text x={X(0) + 12} y={Y(PR) + 4} className={f.gNote}>p̄r · no flow</text>
      <circle cx={X(qb)} cy={Y(PB)} r="5" className={n.dot} />
      <text x={X(qb) + 12} y={Y(PB) - 8} className={f.gTiny}>Bubble point</text>
      <text x={X(0.12)} y={Y(0.82)} className={f.gTinyBlue}>Straight line · single-phase oil</text>
      <text x={X(0.36)} y={Y(0.42)} className={f.gTinyBlue}>Curve · gas comes out of solution</text>
      <circle cx={X(aof)} cy={Y(0)} r="5" className={n.dot} />
      <text x={X(aof)} y={Y(0) - 12} className={f.gNote} textAnchor="middle">AOF</text>
      <text x="548" y="312" className={f.gAxisLabel} textAnchor="end">Rate →</text>
      <text x="38" y="16" className={f.gAxisLabel} transform="rotate(-90 38 16)" textAnchor="end">Flowing bottomhole pressure →</text>
    </svg>
  );
}

/* ── 04 VLP ── */
export function VlpFigure() {
  return (
    <svg viewBox="0 0 560 330" className={f.graph} role="img" aria-label="Conceptual vertical lift performance: the required bottomhole pressure is high at low rate where gravity and liquid slip dominate, reaches a minimum, and rises again at high rate as friction grows">
      <rect x={X(0)} y="16" width={X(0.16) - X(0)} height="270" className={n.unstable} />
      <path d="M56,16 V286 H548" className={f.gAxis} />
      <path d={`M56,${Y(0.32)} H548`} className={f.gGuide} />
      <text x="544" y={Y(0.32) + 16} className={f.gTiny} textAnchor="end">Wellhead pressure</text>
      <path d={vlpPath(0.32)} className={n.vlp} />
      <text x={X(0.08)} y="40" className={f.gTiny} textAnchor="middle">Unstable</text>
      <text x={X(0.08)} y="54" className={f.gTiny} textAnchor="middle">liquid loading</text>
      <text x={X(0.22)} y={Y(0.56)} className={f.gTinyBlue}>Gravity · slip dominate</text>
      <text x={X(0.62)} y={Y(0.72)} className={f.gTinyBlue} textAnchor="end">Friction dominates</text>
      <text x="548" y="312" className={f.gAxisLabel} textAnchor="end">Rate →</text>
      <text x="38" y="16" className={f.gAxisLabel} transform="rotate(-90 38 16)" textAnchor="end">Required bottomhole pressure →</text>
    </svg>
  );
}

/* ── 06 Lift pictograms (viewBox 0 0 120 170): casing, tubing and the device ── */
function Well({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 120 170" className={f.graph} role="img" aria-label={label}>
      <path d="M8,44 H112" className={n.ground} />
      <rect x="46" y="44" width="28" height="118" className={n.annulus} />
      <path d="M46,44 V162 M74,44 V162" className={n.casing} />
      <path d="M56,44 V150 M64,44 V150" className={n.tubing} />
      {children}
    </svg>
  );
}

export function RodPumpPic() {
  return (
    <Well label="Rod pump: a surface beam unit moves a rod string up and down to work a downhole plunger pump">
      <path d="M30,44 L44,14 L58,44" className={n.device} />
      <path d="M14,16 L86,10" className={n.beam} />
      <path d="M86,6 Q96,12 86,22" className={n.beam} />
      <path d="M60,15 V128" className={n.rod} />
      <rect x="55" y="128" width="10" height="18" className={n.pump} />
    </Well>
  );
}
export function EspPic() {
  return (
    <Well label="Electrical submersible pump: a downhole motor drives a multistage centrifugal pump, powered by a cable from the surface">
      <rect x="20" y="28" width="18" height="16" className={n.device} />
      <path d="M38,36 H52 V112" className={n.cable} />
      <rect x="54" y="112" width="12" height="20" className={n.pump} />
      {[116, 120, 124, 128].map((y) => <path key={y} d={`M55,${y} H65`} className={n.stage} />)}
      <rect x="54" y="134" width="12" height="18" className={n.motor} />
    </Well>
  );
}
export function PcpPic() {
  return (
    <Well label="Progressing cavity pump: a helical rotor turns inside a stator to carry fluid upward">
      <rect x="50" y="26" width="20" height="18" className={n.device} />
      <path d="M60,44 V112" className={n.rod} />
      <rect x="54" y="112" width="12" height="38" className={n.stator} />
      <path d="M60,113 C66,118 66,122 60,126 C54,130 54,134 60,138 C66,142 66,146 60,149" className={n.rotor} />
    </Well>
  );
}
export function GasLiftPic() {
  return (
    <Well label="Gas lift: gas injected down the annulus enters the tubing through valves and lightens the fluid column">
      <path d="M100,34 H80 V52" className={n.gas} markerEnd="url(#nd-gas)" />
      {[78, 104, 130].map((y) => <path key={y} d={`M56,${y - 4} L52,${y} L56,${y + 4} Z`} className={n.valve} />)}
      {[[60, 120], [59, 100], [61, 84], [60, 66], [59, 54]].map(([x, y]) => <circle key={y} cx={x} cy={y} r="2.4" className={n.bubble} />)}
      <defs><marker id="nd-gas" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" className={n.headCyan} /></marker></defs>
    </Well>
  );
}
export function PlungerPic() {
  return (
    <Well label="Plunger lift: a free plunger travels up the tubing using the well's own gas pressure and pushes accumulated liquid to the surface">
      <rect x="54" y="22" width="12" height="22" className={n.device} />
      <rect x="56.5" y="70" width="7" height="22" className={n.water} />
      <rect x="56" y="92" width="8" height="10" rx="2" className={n.plunger} />
      <path d="M60,128 V108" className={n.upflowThin} markerEnd="url(#nd-pl)" />
      <defs><marker id="nd-pl" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" className={n.headCyan} /></marker></defs>
    </Well>
  );
}
export function HydraulicPic() {
  return (
    <Well label="Hydraulic pump: power fluid pumped from the surface drives a downhole jet or piston pump, and returns mixed with produced fluid">
      <rect x="18" y="26" width="22" height="18" className={n.device} />
      <path d="M40,34 H50 V128" className={n.power} markerEnd="url(#nd-pw)" />
      <path d="M54,130 L66,130 L62,146 L58,146 Z" className={n.pump} />
      <defs><marker id="nd-pw" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" className={n.headAmber} /></marker></defs>
    </Well>
  );
}
