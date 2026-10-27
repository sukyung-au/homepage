import s from "./Fundamentals.module.css";

/**
 * Conceptual anticline cross-section in the homepage field-section palette (FieldSection.module.css bands,
 * oil gradient, water blue). One drawing, several states: the overview of 01 and the drive mechanisms of 06.
 * Not to scale; contacts and arrows show relationships only.
 */
export type SectionKind = "overview" | "expansion" | "solution" | "gas-cap" | "water" | "gravity" | "compaction" | "combination";

const W = 600, H = 300;
/** Anticline horizons: quadratic from flank (x=0/600) through the crest control at x=300 */
const horizon = (flank: number, ctrl: number) => `M0,${flank} Q300,${ctrl} ${W},${flank}`;
const TOP = horizon(250, 30), BASE = horizon(300, 100);
const band = (f1: number, c1: number, f2: number, c2: number) => `M0,${f1} Q300,${c1} ${W},${f1} L${W},${f2} Q300,${c2} 0,${f2} Z`;
const RES = band(250, 30, 300, 100);

const GOC = 162, OWC = 196;

function Arrow({ d, tone = "navy" }: { d: string; tone?: "navy" | "white" | "water" | "gas" }) {
  return <path d={d} className={s.secArrow} data-tone={tone} markerEnd={`url(#rs-head-${tone})`} />;
}

export function ReservoirSection({ kind, label }: { kind: SectionKind; label: string }) {
  const gasCap = kind === "overview" || kind === "gas-cap" || kind === "gravity" || kind === "combination";
  const aquifer = kind === "overview" || kind === "water" || kind === "combination";
  const bubbles = kind === "solution" || kind === "gravity" || kind === "combination";
  /** Gravity drainage: producer completed low in the oil column */
  const perf = kind === "gravity" ? [184, 198] : [168, 182];
  const id = `rs-${kind}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={s.section} role="img" aria-label={label}>
      <defs>
        <linearGradient id={`${id}-oil`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F29A1F" />
          <stop offset="1" stopColor="#D6402B" />
        </linearGradient>
        <clipPath id={`${id}-res`}><path d={RES} /></clipPath>
        {(["navy", "white", "water", "gas"] as const).map((t) => (
          <marker key={t} id={`rs-head-${t}`} viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L8,4 L0,8 Z" className={s.secHead} data-tone={t} />
          </marker>
        ))}
      </defs>

      {/* Overburden, seal, reservoir, underburden */}
      <rect width={W} height={H} fill="#E8DFCB" />
      <path d={band(190, -30, 232, 12)} fill="#D5CDBE" />
      <path d={band(232, 12, 250, 30)} fill="#9DAFC2" />
      <path d={`${BASE} L${W},${H} L0,${H} Z`} fill="#7E8C9C" />

      {/* Fluids inside the reservoir */}
      <g clipPath={`url(#${id}-res)`}>
        <rect width={W} height={H} fill={aquifer ? "#7FA6C9" : `url(#${id}-oil)`} />
        {aquifer && <rect y={gasCap ? GOC : 0} width={W} height={OWC - (gasCap ? GOC : 0)} fill={`url(#${id}-oil)`} />}
        {gasCap && <rect width={W} height={GOC} fill="#F4E6C4" />}
        {bubbles && [[240, 168], [270, 182], [330, 166], [362, 180], [300, 186], [214, 186], [388, 188]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3" className={s.secBubble} />
        ))}
      </g>
      <path d={TOP} className={s.secHorizon} />
      <path d={BASE} className={s.secHorizon} />
      {gasCap && <line x1="0" x2={W} y1={GOC} y2={GOC} className={s.secContact} clipPath={`url(#${id}-res)`} />}
      {aquifer && <line x1="0" x2={W} y1={OWC} y2={OWC} className={s.secContact} clipPath={`url(#${id}-res)`} />}

      {/* Producer */}
      <line x1="300" y1="12" x2="300" y2={perf[1]} className={s.secWell} />
      <path d="M292,12 L300,2 L308,12 Z" className={s.secWellHead} />
      <line x1="300" y1={perf[0]} x2="300" y2={perf[1]} className={s.secPerf} />

      {/* Drive arrows */}
      {(kind === "gas-cap" || kind === "combination") && (
        <>
          <Arrow tone="gas" d="M250,142 L270,166" />
          <Arrow tone="gas" d="M350,142 L330,166" />
        </>
      )}
      {(kind === "water" || kind === "combination") && (
        <>
          <Arrow tone="water" d="M40,262 C90,236 140,214 186,202" />
          <Arrow tone="water" d="M560,262 C510,236 460,214 414,202" />
        </>
      )}
      {(kind === "solution" || kind === "overview" || kind === "expansion" || kind === "compaction") && (
        <>
          <Arrow tone="white" d="M214,182 L286,176" />
          <Arrow tone="white" d="M386,182 L314,176" />
        </>
      )}

      {kind === "compaction" && (
        <>
          <Arrow d="M170,96 L178,138" />
          <Arrow d="M430,96 L422,138" />
        </>
      )}
      {kind === "gravity" && (
        <>
          <Arrow tone="gas" d="M200,198 L206,170" />
          <Arrow tone="gas" d="M400,198 L394,170" />
          <Arrow tone="white" d="M240,170 L286,190" />
          <Arrow tone="white" d="M360,170 L314,190" />
        </>
      )}

      {/* Labels */}
      {gasCap && <text x="262" y="154" className={s.secLabel} textAnchor="end">Gas cap</text>}
      <text x={gasCap ? 400 : 420} y={gasCap ? 190 : 166} className={s.secLabelLight} textAnchor="middle">Oil</text>
      {kind === "expansion" && <text x="420" y="202" className={s.secTag} textAnchor="middle">P &gt; P<tspan baselineShift="sub" fontSize="8">b</tspan> · UNDERSATURATED</text>}
      {kind === "compaction" && <text x="590" y="88" className={s.secLabel} textAnchor="end">Overburden load · pore volume shrinks</text>}
      {aquifer && <text x="70" y="256" className={s.secLabelLight}>{kind === "water" || kind === "combination" ? "Aquifer" : "Water"}</text>}
      <text x="310" y="24" className={s.secLabel}>Producer</text>
      {gasCap && <text x="590" y={GOC - 5} className={s.secTag} textAnchor="end">GOC</text>}
      {aquifer && <text x="590" y={OWC - 5} className={s.secTag} textAnchor="end">OWC</text>}
    </svg>
  );
}
