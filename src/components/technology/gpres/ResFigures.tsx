import f from "../fundamentals/Fundamentals.module.css";
import g from "../gpfund/GpFund.module.css";
import s from "./Res.module.css";

/** Topic 1.3 figures: a marine CSEM layout, the invasion profile around a borehole, and a log track. No values. */

/* ── 03 Marine CSEM layout ── */
const RECEIVERS = [300, 360, 420, 480, 540, 600];

export function CsemLayout() {
  return (
    <svg viewBox="0 0 640 380" className={f.graph} role="img" aria-label="Marine CSEM: a vessel tows a horizontal electric dipole source close to the seafloor; receivers on the seafloor record the field. Energy guided along a resistive reservoir arrives stronger than energy through conductive sediments; in shallow water an airwave through the atmosphere also reaches the receivers">
      <rect x="0" y="40" width="640" height="150" className={s.sea} />
      <rect x="0" y="190" width="640" height="190" className={g.layer1} />
      <path d="M300,292 C360,272 500,272 580,292 C500,304 360,304 300,292 Z" className={s.reservoir} />
      <path d="M0,40 H640" className={g.surface} />
      <path d="M0,190 H640" className={g.surface} />

      <path d="M92,32 H150 L142,42 H100 Z" className={s.vessel} />
      <path d="M100,42 C110,110 150,160 178,172" className={s.cable} />
      <path d="M180,172 H240" className={s.dipole} />
      <circle cx="180" cy="172" r="3.5" className={s.dipoleEnd} />
      <circle cx="240" cy="172" r="3.5" className={s.dipoleEnd} />
      {RECEIVERS.map((x) => <rect key={x} x={x - 7} y="180" width="14" height="10" rx="2" className={s.receiver} />)}

      <path d="M230,178 C270,236 330,236 360,192" className={s.pathSed} />
      <path d="M232,178 L310,286 H520 L540,192" className={s.pathRes} markerEnd="url(#rs-head)" />
      <path d="M236,170 L262,44 M262,26 H596 M600,44 L600,178" className={s.pathAir} />

      <text x="121" y="20" className={f.gNote} textAnchor="middle">Survey vessel</text>
      <text x="210" y="160" className={f.gTiny} textAnchor="middle">Dipole source</text>
      <text x="450" y="174" className={f.gNote} textAnchor="middle">Seafloor receivers</text>
      <text x="430" y="20" className={f.gTiny} textAnchor="middle">Airwave · matters in shallow water</text>
      <text x="24" y="262" className={f.gTiny}>Conductive sediments · strong attenuation</text>
      <text x="440" y="324" className={f.gTinyBlue} textAnchor="middle">Resistive reservoir · weak attenuation</text>
      <text x="16" y="120" className={f.gTiny}>Seawater</text>
      <defs><marker id="rs-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 Z" className={s.headBlue} /></marker></defs>
    </svg>
  );
}

/* ── 05 Invasion profile ── */
const ZONES: { x0: number; x1: number; cls: string; label: string; sub: string }[] = [
  { x0: 40, x1: 110, cls: "bore", label: "Borehole", sub: "mud" },
  { x0: 110, x1: 210, cls: "flushed", label: "Flushed zone", sub: "Rxo · mud filtrate" },
  { x0: 210, x1: 300, cls: "transition", label: "Transition", sub: "" },
  { x0: 300, x1: 600, cls: "virgin", label: "Undisturbed zone", sub: "Rt · original fluids" },
];
const READS: [string, number][] = [["Shallow", 170], ["Medium", 270], ["Deep", 470]];

export function InvasionProfile() {
  return (
    <svg viewBox="0 0 640 300" className={f.graph} role="img" aria-label="Invasion profile: around the borehole mud filtrate displaces the original fluids in the flushed zone; farther out lies a transition and then the undisturbed zone. Shallow, medium and deep resistivity readings look progressively farther into the formation">
      {ZONES.map((z) => <rect key={z.label} x={z.x0} y="40" width={z.x1 - z.x0} height="150" className={s[z.cls]} />)}
      <path d="M110,40 V190" className={s.mudcake} />
      {ZONES.map((z) => (
        <g key={z.label + "t"}>
          <text x={(z.x0 + z.x1) / 2} y="28" className={f.gNote} textAnchor="middle">{z.label}</text>
          {z.sub && <text x={(z.x0 + z.x1) / 2} y="116" className={f.gTiny} textAnchor="middle">{z.sub}</text>}
        </g>
      ))}
      <text x="114" y="182" className={f.gTiny}>Mudcake</text>
      {READS.map(([label, x], i) => (
        <g key={label}>
          <path d={`M75,${222 + i * 22} H${x}`} className={s.read} markerEnd="url(#rs-read)" />
          <text x={x + 10} y={226 + i * 22} className={f.gTinyBlue}>{label} reading</text>
        </g>
      ))}
      <text x="600" y="294" className={f.gAxisLabel} textAnchor="end">Distance from borehole →</text>
      <defs><marker id="rs-read" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" className={s.headBlue} /></marker></defs>
    </svg>
  );
}

/* ── 06 Log track: gamma ray and resistivity through shale, an oil sand and a water sand ── */
const BEDS: { y0: number; y1: number; cls: string; label: string; gr: number; rt: number }[] = [
  { y0: 30, y1: 100, cls: "shale", label: "Shale", gr: 0.78, rt: 0.3 },
  { y0: 100, y1: 190, cls: "oil", label: "Sand · oil", gr: 0.22, rt: 0.86 },
  { y0: 190, y1: 270, cls: "water", label: "Sand · water", gr: 0.24, rt: 0.12 },
  { y0: 270, y1: 330, cls: "shale", label: "Shale", gr: 0.8, rt: 0.28 },
];

function stepCurve(x0: number, w: number, key: "gr" | "rt") {
  const pts: string[] = [];
  BEDS.forEach((b, i) => {
    const x = x0 + b[key] * w;
    const wob = (y: number) => x + Math.sin(y * 0.21 + i) * 3;
    for (let y = b.y0 + (i ? 6 : 0); y <= b.y1 - 6; y += 6) pts.push(`${wob(y).toFixed(1)},${y}`);
  });
  return "M" + pts.join(" L");
}

export function LogTrack() {
  return (
    <svg viewBox="0 0 560 360" className={f.graph} role="img" aria-label="Conceptual well log: gamma ray is high in shale and low in sand; resistivity is high in the oil-bearing sand and low in the water-bearing sand">
      {BEDS.map((b, i) => (
        <g key={i}>
          <rect x="40" y={b.y0} width="110" height={b.y1 - b.y0} className={s[b.cls]} />
          <text x="95" y={(b.y0 + b.y1) / 2 + 4} className={f.gTiny} textAnchor="middle">{b.label}</text>
          <path d={`M40,${b.y1} H520`} className={g.guide} />
        </g>
      ))}
      <rect x="170" y="30" width="160" height="300" className={s.track} />
      <rect x="350" y="30" width="170" height="300" className={s.track} />
      <path d={stepCurve(180, 140, "gr")} className={s.gr} />
      <path d={stepCurve(360, 150, "rt")} className={s.rt} />
      <text x="95" y="20" className={f.gNote} textAnchor="middle">Lithology</text>
      <text x="250" y="20" className={f.gNote} textAnchor="middle">Gamma ray →</text>
      <text x="435" y="20" className={f.gNote} textAnchor="middle">Resistivity (log) →</text>
      <text x="476" y="152" className={f.gTinyBlue} textAnchor="end">High Rt</text>
      <text x="420" y="236" className={f.gTinyBlue}>Low Rt</text>
      <text x="40" y="352" className={f.gAxisLabel}>Depth ↓</text>
    </svg>
  );
}
