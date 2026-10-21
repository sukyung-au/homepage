"use client";
import { useState } from "react";
import { Choice } from "./Choice";
import { line, resample, spline, yAtX, type Pt } from "./geom";
import s from "./Fundamentals.module.css";

/**
 * 02 — Phase behaviour. Conceptual diagrams only (no PVT data): shapes and the relative positions of the
 * critical point, reservoir temperature and separator conditions follow the standard textbook classification
 * (e.g. McCain, The Properties of Petroleum Fluids); axes carry no values.
 */

const X0 = 56, X1 = 580, Y0 = 24, Y1 = 262;

function Axes({ x, y }: { x: string; y: string }) {
  return (
    <g>
      <path d={`M${X0},${Y0 - 6} L${X0},${Y1} L${X1 + 6},${Y1}`} className={s.gAxis} />
      <text x={X1} y={Y1 + 22} className={s.gAxisLabel} textAnchor="end">{x} →</text>
      <text x={X0 - 14} y={Y0 + 4} className={s.gAxisLabel} textAnchor="end" transform={`rotate(-90 ${X0 - 14} ${Y0 + 4})`}>{y} →</text>
    </g>
  );
}

/* ───────────── A. Single component: P–V and P–T ───────────── */

// Saturation dome of the P–V diagram: CP at the top; left side = bubble-point (saturated liquid), right = dew-point (saturated vapour)
const CP_V: Pt = [250, 74];
const domeL = (u: number) => CP_V[0] - 138 * u ** 0.55;
const domeR = (u: number) => CP_V[0] + 280 * u ** 0.8;
const domeY = (u: number) => CP_V[1] + 182 * u;
const DOME: Pt[] = [
  ...Array.from({ length: 41 }, (_, i) => { const u = 1 - i / 40; return [domeL(u), domeY(u)] as Pt; }),
  ...Array.from({ length: 40 }, (_, i) => { const u = (i + 1) / 40; return [domeR(u), domeY(u)] as Pt; }),
];

/** Subcritical isotherm: steep liquid branch → flat two-phase segment at the vapour pressure → vapour branch */
function isotherm(u: number) {
  const y = domeY(u), xl = domeL(u), xr = domeR(u);
  const liq = `M${(xl - 22).toFixed(1)},${Y0 + 6} L${xl.toFixed(1)},${y.toFixed(1)}`;
  const flat = `L${xr.toFixed(1)},${y.toFixed(1)}`;
  const vap = `C${(xr + 20).toFixed(1)},${(y + 18).toFixed(1)} ${(X1 - 40).toFixed(1)},${Math.min(Y1 - 4, y + 34).toFixed(1)} ${X1},${Math.min(Y1 - 2, y + 40).toFixed(1)}`;
  return { d: liq + flat + vap, y, xl, xr };
}
const T1 = isotherm(0.72), T2 = isotherm(0.4);

function PVDiagram() {
  return (
    <svg viewBox="0 0 620 300" className={s.graph} role="img" aria-label="Conceptual pressure–volume diagram of a pure substance: saturation dome with bubble-point and dew-point curves meeting at the critical point, and isotherms below, at and above the critical temperature">
      <Axes x="Volume (specific)" y="Pressure" />
      <path d={line(DOME) + "Z"} className={s.gTwoPhase} />
      <path d={line(DOME.slice(0, 41))} className={s.gBubble} />
      <path d={line(DOME.slice(40))} className={s.gDew} />
      <path d={T1.d} className={s.gIso} />
      <path d={T2.d} className={s.gIso} />
      <path d={`M${CP_V[0] - 34},${Y0 + 6} C${CP_V[0] - 14},${CP_V[1] - 30} ${CP_V[0] - 6},${CP_V[1]} ${CP_V[0]},${CP_V[1]} C${CP_V[0] + 40},${CP_V[1] + 2} ${X1 - 120},${CP_V[1] + 60} ${X1},${CP_V[1] + 86}`} className={s.gIsoC} />
      <path d={`M${CP_V[0] + 6},${Y0 + 6} C${CP_V[0] + 40},${Y0 + 40} ${X1 - 160},${Y0 + 70} ${X1},${Y0 + 92}`} className={s.gIso} />
      {/* phase transition along T1: bubble point → dew point at constant pressure */}
      <circle cx={T2.xl} cy={T2.y} r="4" className={s.gDotBubble} />
      <circle cx={T2.xr} cy={T2.y} r="4" className={s.gDotDew} />
      <circle cx={CP_V[0]} cy={CP_V[1]} r="5" className={s.gCp} />
      <text x={CP_V[0] + 10} y={CP_V[1] - 8} className={s.gNote}>Critical point</text>
      <text x={T2.xl - 8} y={T2.y - 8} className={s.gTiny} textAnchor="end">Bubble point</text>
      <text x={T2.xr + 6} y={T2.y - 8} className={s.gTiny}>Dew point</text>
      <text x={CP_V[0] + 30} y={T1.y - 26} className={s.gRegion} textAnchor="middle">Liquid + Vapor</text>
      <text x={X0 + 18} y={Y1 - 70} className={s.gRegion}>Liquid</text>
      <text x={X1 - 4} y={Y1 - 50} className={s.gRegion} textAnchor="end">Vapor</text>
      <text x={T1.xl - 26} y={Y0 + 18} className={s.gTiny} textAnchor="end">T₁</text>
      <text x={T2.xl - 26} y={Y0 + 18} className={s.gTiny} textAnchor="end">T₂</text>
      <text x={CP_V[0] - 38} y={Y0 + 18} className={s.gTinyBlue} textAnchor="end">T<tspan baselineShift="sub" fontSize="8">c</tspan></text>
      <text x={CP_V[0] + 10} y={Y0 + 18} className={s.gTiny}>T₃</text>
      <text x={X1} y={Y0 + 10} className={s.gTiny} textAnchor="end">T₁ &lt; T₂ &lt; T<tspan baselineShift="sub" fontSize="8">c</tspan> &lt; T₃</text>
    </svg>
  );
}

// P–T: vapour-pressure curve ending at the critical point
const VP: Pt[] = spline([[96, 250], [200, 232], [300, 190], [380, 138], [440, 92]]);
const CP_T = VP[VP.length - 1];
const PATH_X = 300, PATH_Y = yAtX(VP, PATH_X) ?? 190;

function PTDiagram() {
  return (
    <svg viewBox="0 0 620 300" className={s.graph} role="img" aria-label="Conceptual pressure–temperature diagram of a pure substance: the vapour-pressure curve separates liquid and vapour and ends at the critical point; above the critical temperature and pressure the fluid is supercritical">
      <Axes x="Temperature" y="Pressure" />
      <path d={`M${X0},${CP_T[1]} L${X1},${CP_T[1]} M${CP_T[0]},${Y0} L${CP_T[0]},${Y1}`} className={s.gGuide} />
      <rect x={CP_T[0]} y={Y0} width={X1 - CP_T[0]} height={CP_T[1] - Y0} className={s.gSuper} />
      <path d={line(VP)} className={s.gVp} />
      <path d={`M${PATH_X},${Y0 + 28} L${PATH_X},${Y1 - 22}`} className={s.gPath} markerEnd="url(#pb-arrow)" />
      <defs>
        <marker id="pb-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 Z" className={s.gHead} /></marker>
      </defs>
      <circle cx={PATH_X} cy={PATH_Y} r="4" className={s.gDotBubble} />
      <circle cx={CP_T[0]} cy={CP_T[1]} r="5" className={s.gCp} />
      <text x={CP_T[0] - 10} y={CP_T[1] - 10} className={s.gNote} textAnchor="end">Critical point</text>
      <text x={PATH_X + 10} y={PATH_Y + 4} className={s.gTiny}>Bubble point = Dew point (vapor pressure)</text>
      <text x={PATH_X - 10} y={Y0 + 40} className={s.gTiny} textAnchor="end">Isothermal pressure drop</text>
      <text x={150} y={110} className={s.gRegion}>Liquid</text>
      <text x={430} y={226} className={s.gRegion}>Vapor</text>
      <text x={(CP_T[0] + X1) / 2} y={Y0 + 34} className={s.gRegion} textAnchor="middle">Supercritical</text>
      <text x={130} y={258} className={s.gTiny} transform="rotate(-6 130 258)">Vapor-pressure curve</text>
      <text x={CP_T[0]} y={Y1 + 14} className={s.gTiny} textAnchor="middle">T<tspan baselineShift="sub" fontSize="8">c</tspan></text>
      <text x={X0 - 6} y={CP_T[1] + 4} className={s.gTiny} textAnchor="end">P<tspan baselineShift="sub" fontSize="8">c</tspan></text>
    </svg>
  );
}

const SINGLE = {
  pv: {
    label: "P–V Diagram",
    title: "Pressure–Volume at constant temperature",
    body: "임계온도보다 낮은 온도에서 압력을 낮추면, 액체는 거의 부피 변화 없이 압력이 떨어지다가 기포점에서 첫 기포가 생깁니다. 이후 기체와 액체가 공존하는 동안 압력은 증기압으로 일정하게 유지되고, 이슬점에서 마지막 액체가 사라지면 기체만 남습니다.",
    points: [
      ["Bubble point", "액체에서 첫 기포가 생기는 지점(포화 액체)"],
      ["Dew point", "기체에서 마지막 액체가 사라지는 지점(포화 기체)"],
      ["Critical point", "기포점 곡선과 이슬점 곡선이 만나 액체와 기체의 성질이 같아지는 지점"],
    ],
  },
  pt: {
    label: "P–T Diagram",
    title: "Pressure–Temperature of a pure substance",
    body: "단일 성분 물질에서는 기포점과 이슬점이 같은 압력·온도에 놓여 하나의 증기압 곡선을 이룹니다. 곡선 위쪽은 액체, 아래쪽은 기체이며, 곡선은 임계점에서 끝납니다. 임계온도와 임계압력을 모두 넘으면 액체와 기체를 구분할 수 없는 초임계 유체가 됩니다.",
    points: [
      ["Phase transition", "곡선을 가로지를 때 액체 ↔ 기체 상변화가 일어남"],
      ["Critical point", "증기압 곡선의 끝점 (Tc, Pc)"],
      ["Multicomponent", "혼합물에서는 이 곡선이 기포점·이슬점 곡선으로 나뉘어 상포락선(phase envelope)이 됨"],
    ],
  },
} as const;

export function SingleComponent() {
  const [tab, setTab] = useState<"pv" | "pt">("pv");
  const d = SINGLE[tab];
  return (
    <div className={s.figBlock}>
      <Choice idBase="single" label="Single-component diagram" value={tab} onChange={setTab} options={[{ id: "pv", label: SINGLE.pv.label }, { id: "pt", label: SINGLE.pt.label }]} />
      <div id="single-panel" role="tabpanel" aria-labelledby={`single-tab-${tab}`} className={s.figGrid}>
        <figure className={s.figure}>
          {tab === "pv" ? <PVDiagram /> : <PTDiagram />}
          <figcaption className={s.caption}>Conceptual diagram · not to scale · no measured data</figcaption>
        </figure>
        <div className={s.figText}>
          <h4 className={s.figTitle}>{d.title}</h4>
          <p className={s.p}>{d.body}</p>
          <dl className={s.defs}>
            {d.points.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
        </div>
      </div>
    </div>
  );
}

/* ───────────── B. Reservoir fluid types (multicomponent phase envelopes) ───────────── */

type FluidId = "black-oil" | "volatile-oil" | "gas-condensate" | "wet-gas" | "dry-gas";

interface Fluid {
  id: FluidId;
  label: string;
  /** Envelope control points from the low-pressure end of the bubble-point curve, through the critical point
   *  (index cp), along the dew-point curve back to low pressure */
  env: Pt[];
  cp: number;
  /** Reservoir temperature (x), initial pressure (y) */
  tres: number;
  pi: number;
  sep: Pt;
  /** Quality-line positions between the bubble (0) and dew (1) curves */
  quality: number[];
  summary: string;
  points: [string, string][];
}

const FLUIDS: Fluid[] = [
  {
    id: "black-oil", label: "Black Oil",
    env: [[70, 262], [120, 206], [190, 136], [262, 90], [330, 72], [392, 90], [440, 130], [456, 176], [430, 226], [330, 258], [160, 268]],
    cp: 5, tres: 210, pi: 40, sep: [112, 246], quality: [0.25, 0.5, 0.75],
    summary: "저류층 온도가 임계온도보다 충분히 낮은 원유입니다. 압력이 기포점 아래로 내려가면 용해가스가 분리되기 시작하고, 지상 분리기 조건은 상포락선 안쪽의 액체가 많은 영역에 놓입니다.",
    points: [
      ["Reservoir T", "임계온도보다 낮음 — 초기에는 단상 액체"],
      ["Depletion", "기포점 아래에서 가스가 분리되며 2상 영역으로 들어감"],
      ["Quality lines", "비교적 고르게 분포 — 감압에 따른 가스 발생이 완만함"],
    ],
  },
  {
    id: "volatile-oil", label: "Volatile Oil",
    env: [[70, 262], [118, 204], [176, 146], [236, 104], [276, 84], [306, 88], [346, 116], [372, 162], [364, 214], [304, 252], [160, 268]],
    cp: 5, tres: 284, pi: 40, sep: [112, 246], quality: [0.07, 0.16, 0.3],
    summary: "저류층 온도가 임계온도에 가까운 원유입니다. 기포점 바로 아래에서도 많은 가스가 발생해, 품질선(quality line)이 기포점 곡선 근처에 촘촘하게 모입니다.",
    points: [
      ["Reservoir T", "임계온도보다 낮지만 가까움 — 초기에는 단상 액체"],
      ["Depletion", "기포점 아래에서 짧은 감압에도 가스 분율이 크게 증가"],
      ["Quality lines", "기포점 곡선 쪽으로 밀집"],
    ],
  },
  {
    id: "gas-condensate", label: "Gas Condensate",
    env: [[70, 262], [100, 214], [142, 170], [186, 136], [232, 96], [282, 76], [340, 86], [390, 130], [410, 182], [388, 230], [318, 258], [160, 268]],
    cp: 3, tres: 332, pi: 40, sep: [124, 246], quality: [0.55, 0.75, 0.9],
    summary: "저류층 온도가 임계온도와 크리콘더템(cricondentherm) 사이에 있는 유체입니다. 초기에는 기체지만, 압력이 상부 이슬점 아래로 떨어지면 저류층 안에서 액체가 응축되는 역행 응축(retrograde condensation)이 일어납니다.",
    points: [
      ["Reservoir T", "Tc < T < cricondentherm — 초기에는 단상 기체"],
      ["Depletion", "이슬점 아래에서 저류층 내 액체 응축(역행 응축)"],
      ["Surface", "지상 분리기에서 콘덴세이트(액체)가 회수됨"],
    ],
  },
  {
    id: "wet-gas", label: "Wet Gas",
    env: [[70, 262], [96, 222], [124, 186], [150, 158], [190, 138], [232, 146], [258, 178], [262, 206], [244, 240], [190, 262], [110, 270]],
    cp: 3, tres: 430, pi: 40, sep: [150, 250], quality: [0.5, 0.75],
    summary: "저류층 온도가 크리콘더템보다 높아, 저류층에서 압력이 떨어져도 계속 기체 상태로 남는 가스입니다. 그러나 지상 분리기의 압력·온도는 상포락선 안쪽에 있어, 지상에서는 액체(콘덴세이트)가 분리됩니다.",
    points: [
      ["Reservoir T", "크리콘더템보다 높음 — 저류층 감압 동안 단상 기체 유지"],
      ["Reservoir", "저류층 안에서는 액체가 생기지 않음"],
      ["Surface", "분리기 조건이 상포락선 안 → 지상에서 액체 발생"],
    ],
  },
  {
    id: "dry-gas", label: "Dry Gas",
    env: [[62, 264], [76, 236], [94, 208], [110, 190], [138, 180], [162, 194], [172, 220], [164, 246], [130, 264], [84, 272]],
    cp: 3, tres: 430, pi: 40, sep: [300, 250], quality: [0.5],
    summary: "주로 메탄으로 이루어진 가스입니다. 상포락선이 낮은 온도 쪽에 작게 놓여, 저류층 감압 경로와 지상 분리기 조건이 모두 상포락선 밖에 있습니다. 따라서 저류층과 지상 어디에서도 액체가 거의 생기지 않습니다.",
    points: [
      ["Reservoir T", "크리콘더템보다 훨씬 높음 — 저류층에서 단상 기체"],
      ["Surface", "분리기 조건도 상포락선 밖 → 지상에서도 액체가 거의 없음"],
      ["vs Wet Gas", "차이는 지상 분리 조건이 상포락선 안(Wet)인지 밖(Dry)인지"],
    ],
  },
];

function Envelope({ f }: { f: Fluid }) {
  const bubble = spline(f.env.slice(0, f.cp + 1));
  const dew = spline(f.env.slice(f.cp));
  const cp = f.env[f.cp];
  const full = [...bubble, ...dew.slice(1)];
  // quality lines: interpolate between the bubble curve (CP → low P) and the dew curve (CP → low P)
  const n = 40, b = resample([...bubble].reverse(), n), dw = resample(dew, n);
  const quality = f.quality.map((q) => b.map((p, i) => [p[0] + (dw[i][0] - p[0]) * q, p[1] + (dw[i][1] - p[1]) * q] as Pt));
  const dewCross = f.id === "gas-condensate" ? yAtX(dew, f.tres) : undefined;
  const bubbleCross = f.id === "black-oil" || f.id === "volatile-oil" ? yAtX(bubble, f.tres) : undefined;
  const pathEnd = Y1 - 14;
  const retro = f.id === "gas-condensate";
  return (
    <svg viewBox="0 0 620 300" className={s.graph} role="img" aria-label={`Conceptual phase envelope of ${f.label} with the reservoir temperature path and separator conditions`}>
      <defs>
        <marker id={`fl-arrow-${f.id}`} viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L8,4 L0,8 Z" className={s.gHead} /></marker>
        <clipPath id={`fl-clip-${f.id}`}><path d={line(full) + "Z"} /></clipPath>
      </defs>
      <Axes x="Temperature" y="Pressure" />
      <path d={line(full) + "Z"} className={s.gTwoPhase} />
      {retro && <rect x={cp[0]} y={Y0} width={X1} height={Y1} clipPath={`url(#fl-clip-${f.id})`} className={s.gRetro} />}
      {quality.map((q, i) => <path key={i} d={line(q)} className={s.gQuality} />)}
      <path d={line(bubble)} className={s.gBubble} />
      <path d={line(dew)} className={s.gDew} />
      {/* reservoir temperature path (isothermal depletion) */}
      <path d={`M${f.tres},${f.pi} L${f.tres},${pathEnd}`} className={s.gPath} markerEnd={`url(#fl-arrow-${f.id})`} />
      <circle cx={f.tres} cy={f.pi} r="4" className={s.gStart} />
      {/* to the surface separator */}
      <path d={`M${f.tres},${pathEnd} Q${(f.tres + f.sep[0]) / 2},${Y1 + 4} ${f.sep[0] + 8},${f.sep[1] + 2}`} className={s.gSepPath} />
      <rect x={f.sep[0] - 5} y={f.sep[1] - 5} width="10" height="10" className={s.gSep} />
      <circle cx={cp[0]} cy={cp[1]} r="5" className={s.gCp} />
      {bubbleCross !== undefined && <circle cx={f.tres} cy={bubbleCross} r="4" className={s.gDotBubble} />}
      {dewCross !== undefined && <circle cx={f.tres} cy={dewCross} r="4" className={s.gDotDew} />}

      <text x={cp[0] + (f.id === "gas-condensate" || f.id === "wet-gas" || f.id === "dry-gas" ? -10 : 10)} y={cp[1] - 10} className={s.gNote} textAnchor={f.id === "gas-condensate" || f.id === "wet-gas" || f.id === "dry-gas" ? "end" : "start"}>Critical point</text>
      <text x={f.tres + 8} y={f.pi + 4} className={s.gTiny}>Initial reservoir condition</text>
      <text x={f.tres + 8} y={pathEnd - 6} className={s.gTiny}>Reservoir T (isothermal depletion)</text>
      <text x={f.sep[0] + 10} y={f.sep[1] + 4} className={s.gTiny}>Separator</text>
      {bubbleCross !== undefined && <text x={f.tres - 8} y={bubbleCross - 6} className={s.gTiny} textAnchor="end">Bubble point</text>}
      {dewCross !== undefined && <text x={f.tres + 8} y={dewCross - 4} className={s.gTiny}>Dew point</text>}
      {retro && <text x={(cp[0] + f.tres) / 2 + 30} y={f.env[6][1] + 26} className={s.gTinyBlue} textAnchor="middle">Retrograde region</text>}
      {f.env[2][0] > 150 && <text x={f.env[2][0] - 10} y={f.env[2][1] - 4} className={s.gLegendText} textAnchor="end">Bubble-point curve</text>}
      <text x={f.env[f.env.length - 4][0] + 10} y={f.env[f.env.length - 4][1]} className={s.gLegendText}>Dew-point curve</text>
      <text x={f.id === "dry-gas" || f.id === "wet-gas" ? 110 : 120} y={Y0 + 40} className={s.gRegion}>{f.id === "black-oil" || f.id === "volatile-oil" ? "Liquid" : ""}</text>
      <text x={X1 - 20} y={Y0 + 70} className={s.gRegion} textAnchor="end">Gas</text>
      <text x={(f.env[0][0] + cp[0]) / 2 + 24} y={(cp[1] + Y1) / 2 + 22} className={s.gRegionSmall}>Two-phase</text>
    </svg>
  );
}

export function FluidTypes() {
  const [id, setId] = useState<FluidId>("black-oil");
  const f = FLUIDS.find((x) => x.id === id)!;
  return (
    <div className={s.figBlock}>
      <Choice idBase="fluid" label="Reservoir fluid type" value={id} onChange={setId} options={FLUIDS.map((x, i) => ({ id: x.id, label: x.label, sub: String(i + 1).padStart(2, "0") }))} />
      <div id="fluid-panel" role="tabpanel" aria-labelledby={`fluid-tab-${id}`} className={s.figGrid}>
        <figure className={s.figure}>
          <Envelope f={f} />
          <div className={s.legend}>
            <span><i className={s.lgBubble} />Bubble-point curve</span>
            <span><i className={s.lgDew} />Dew-point curve</span>
            <span><i className={s.lgQuality} />Quality lines (liquid %)</span>
            <span><i className={s.lgPath} />Reservoir T path</span>
            <span><i className={s.lgSep} />Separator conditions</span>
          </div>
          <figcaption className={s.caption}>Conceptual phase envelope · relative positions only · no measured PVT data</figcaption>
        </figure>
        <div className={s.figText}>
          <h4 className={s.figTitle}>{f.label}</h4>
          <p className={s.p}>{f.summary}</p>
          <dl className={s.defs}>
            {f.points.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
        </div>
      </div>
    </div>
  );
}
