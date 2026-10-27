"use client";
import { useState, type ReactElement } from "react";
import { Choice } from "../fundamentals/Choice";
import f from "../fundamentals/Fundamentals.module.css";
import w from "./WellTest.module.css";

/**
 * 06 Type curves and 07 Flowing material balance of topic 3.3. Conceptual shapes only, no values; descriptions
 * follow the S&P Global Harmony typecurve / FMB theory pages (see SOURCES in WellTestTopic).
 */

type Pt = [number, number];
/** A curve is a chain of cubic Bézier segments [p0, c1, c2, p3]; the same data draws the line and samples the points. */
type Curve = [Pt, Pt, Pt, Pt][];

const path = (c: Curve) => `M${c[0][0].join(",")} ` + c.map(([, a, b, p]) => `C${a.join(",")} ${b.join(",")} ${p.join(",")}`).join(" ");
const line = (a: Pt, b: Pt): [Pt, Pt, Pt, Pt] => [a, a, b, b];

function at([p0, p1, p2, p3]: [Pt, Pt, Pt, Pt], t: number): Pt {
  const u = 1 - t;
  const k = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
  return [0, 1].map((i) => k[0] * p0[i] + k[1] * p1[i] + k[2] * p2[i] + k[3] * p3[i]) as Pt;
}

/** n points spread over the curve; `jitter` (fixed, in px) imitates noisy field data */
function sample(c: Curve, n: number, jitter: number[] = []): Pt[] {
  return Array.from({ length: n }, (_, i) => {
    const g = (i + 0.5) / n * c.length;
    const seg = Math.min(c.length - 1, Math.floor(g));
    const [x, y] = at(c[seg], g - seg);
    return [x, y + (jitter[i % (jitter.length || 1)] ?? 0)];
  });
}

const NOISE = [-7, 5, -3, 8, -6, 2, 6, -8, 4, -2, 7, -5];

function Dots({ pts, muted }: { pts: Pt[]; muted?: boolean }) {
  return <g>{pts.map(([x, y], i) => <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r="3.6" className={muted ? w.dotMuted : w.dot} />)}</g>;
}

function Axes({ x, y, x0 = 60, x1 = 548, y0 = 16, y1 = 300 }: { x: string; y: string; x0?: number; x1?: number; y0?: number; y1?: number }) {
  return (
    <>
      <path d={`M${x0},${y0} V${y1} H${x1}`} className={f.gAxis} />
      <text x={x1} y={y1 + 22} className={f.gAxisLabel} textAnchor="end">{x}</text>
      <text x={x0 - 16} y={y0 + 2} className={f.gAxisLabel} transform={`rotate(-90 ${x0 - 16} ${y0 + 2})`} textAnchor="end">{y}</text>
    </>
  );
}

/* ── Type curve figures ── */

function Fetkovich() {
  const join: Pt = [300, 130];
  const transient: Curve[] = [
    [[[70, 40], [150, 60], [230, 92], join]],
    [[[70, 72], [160, 86], [240, 106], join]],
    [[[70, 104], [170, 112], [250, 120], join]],
  ];
  const arps: [string, Curve, Pt][] = [
    ["b = 1 · harmonic", [[join, [380, 160], [460, 190], [540, 214]]], [540, 204]],
    ["b = 0.5", [[join, [380, 172], [450, 214], [520, 276]]], [470, 272]],
    ["b = 0 · exponential", [[join, [350, 168], [380, 228], [398, 300]]], [382, 292]],
  ];
  const data: Curve = [...transient[1], ...arps[1][1]];
  return (
    <svg viewBox="0 0 560 330" className={f.graph} role="img" aria-label="Conceptual Fetkovich type curves: transient stems on the left blend into Arps decline stems on the right; field data follow one transient stem and one b stem">
      <path d="M300,16 V272" className={f.gGuide} />
      <text x="180" y="30" className={f.gTiny} textAnchor="middle">Transient stems (re/rwa)</text>
      <text x="424" y="30" className={f.gTiny} textAnchor="middle">Arps decline stems (b)</text>
      {transient.map((c, i) => <path key={i} d={path(c)} className={i === 1 ? w.stemOn : w.stem} />)}
      {arps.map(([label, c, [lx, ly]], i) => (
        <g key={label}>
          <path d={path(c)} className={i === 1 ? w.stemOn : w.stem} />
          <text x={lx} y={ly} className={f.gTiny} textAnchor="end">{label}</text>
        </g>
      ))}
      <Dots pts={sample(data, 14, NOISE.map((n) => n / 2))} />
      <Axes x="Decline time tDd (log) →" y="Decline rate qDd (log) →" />
    </svg>
  );
}

function Blasingame() {
  const h: Pt = [300, 120];
  const stems: Curve[] = [
    [[[70, 40], [170, 70], [250, 96], h]],
    [[[70, 74], [170, 94], [250, 108], h]],
    [[[70, 104], [170, 112], [250, 116], h]],
  ];
  const harmonic: Curve = [line(h, [480, 300])];
  const integral: Curve = [[[70, 58], [170, 80], [260, 100], [320, 126]], line([320, 126], [490, 296])];
  const derivative: Curve = [[[70, 170], [160, 174], [240, 168], [290, 166]], [[290, 166], [330, 166], [380, 214], [440, 288]]];
  return (
    <svg viewBox="0 0 560 330" className={f.graph} role="img" aria-label="Conceptual Blasingame type curves: normalized rate, rate integral and rate integral derivative against material balance time; transient stems converge into a single harmonic stem">
      {stems.map((c, i) => <path key={i} d={path(c)} className={i === 1 ? w.stemOn : w.stem} />)}
      <path d={path(harmonic)} className={w.stemOn} />
      <path d={path(integral)} className={w.integral} />
      <path d={path(derivative)} className={w.derivative} />
      <Dots pts={sample([...stems[1], ...harmonic], 14, NOISE)} />
      <text x="410" y="200" className={f.gTinyBlue}>Single harmonic stem</text>
      <text x="410" y="214" className={f.gTiny}>boundary-dominated flow</text>
      <text x="74" y="30" className={f.gTiny}>Transient stems (re/rwa)</text>
      <Axes x="Material balance time (log) →" y="q/Δp (log) →" />
    </svg>
  );
}

function AgarwalGardner() {
  const rate: Curve = [[[70, 60], [160, 92], [220, 112], [260, 130]], [[260, 130], [280, 150], [292, 200], [300, 300]]];
  const invDer: Curve = [[[70, 150], [130, 154], [190, 150], [230, 150]], [[230, 150], [255, 150], [275, 190], [290, 300]]];
  const fit: Pt[] = [[380, 60], [548 - 18, 300]];
  const pts: Pt[] = [0.12, 0.22, 0.32, 0.42, 0.52].map((t) => [fit[0][0] + (fit[1][0] - fit[0][0]) * t, fit[0][1] + (fit[1][1] - fit[0][1]) * t + NOISE[Math.round(t * 10)] / 3]);
  return (
    <svg viewBox="0 0 560 330" className={f.graph} role="img" aria-label="Conceptual Agarwal-Gardner plots: log-log normalized rate and inverse semi-log derivative on the left; rate against cumulative on Cartesian axes on the right, a straight line extrapolated to fluid in place">
      <path d={path(rate)} className={w.stemOn} />
      <path d={path(invDer)} className={w.derivative} />
      <Dots pts={sample([rate[0]], 7, NOISE)} />
      <text x="120" y="56" className={f.gTiny}>Normalized rate</text>
      <text x="96" y="140" className={f.gTiny}>Inverse derivative</text>
      <Axes x="Time (log) →" y="Rate · 1/derivative (log)" x1={320} />

      <path d={`M${fit[0][0]},${fit[0][1]} L${fit[1][0]},${fit[1][1]}`} className={w.extrap} />
      <Dots pts={pts} />
      <circle cx={fit[1][0]} cy={fit[1][1]} r="5" className={w.intercept} />
      <text x={fit[1][0] - 22} y="294" className={f.gTinyBlue} textAnchor="end">Fluid in place</text>
      <Axes x="Cumulative →" y="q/Δp" x0={380} y0={40} />
    </svg>
  );
}

function Npi() {
  const dp: Curve = [[[70, 250], [150, 196], [220, 168], [300, 156]], [[300, 156], [380, 142], [450, 112], [540, 60]]];
  const integral: Curve = [[[70, 272], [160, 228], [240, 200], [320, 186]], [[320, 186], [400, 172], [470, 142], [540, 100]]];
  const der: Curve = [[[70, 286], [150, 248], [220, 226], [280, 222]], line([280, 222], [370, 222]), [[370, 222], [420, 220], [460, 184], [540, 112]]];
  return (
    <svg viewBox="0 0 560 330" className={f.graph} role="img" aria-label="Conceptual NPI type curves: normalized pressure, pressure integral and pressure integral derivative rise with material balance time, like an extended drawdown test">
      <path d={path(dp)} className={w.stemOn} />
      <path d={path(integral)} className={w.integral} />
      <path d={path(der)} className={w.derivative} />
      <Dots pts={sample(dp, 12, NOISE)} />
      <text x="326" y="214" className={f.gTiny} textAnchor="middle">Flat · radial flow</text>
      <text x="470" y="200" className={f.gTiny}>Unit slope · BDF</text>
      <Axes x="Material balance time (log) →" y="Δp/q (log) →" />
    </svg>
  );
}

function Wattenbarger() {
  const c: Curve = [line([70, 280], [330, 150]), [[330, 150], [360, 135], [380, 118], [400, 98]], line([400, 98], [478, 20])];
  return (
    <svg viewBox="0 0 560 330" className={f.graph} role="img" aria-label="Conceptual Wattenbarger type curve: a single curve with a half slope during linear flow, then a unit slope once the drainage boundary is reached">
      <path d={path(c)} className={w.stemOn} />
      <Dots pts={sample(c, 12, NOISE.map((n) => n / 2))} />
      <text x="190" y="196" className={f.gTinyBlue} transform="rotate(-26.6 190 196)">½ slope · linear flow</text>
      <text x="446" y="78" className={f.gTinyBlue}>Unit slope · boundary</text>
      <text x="300" y="290" className={f.gTiny} textAnchor="middle">One curve for any rectangular geometry (scaled variables)</text>
      <Axes x="Scaled time (log) →" y="Scaled pressure (log) →" />
    </svg>
  );
}

type CurveId = "fetkovich" | "blasingame" | "agarwal" | "npi" | "wattenbarger";

const CURVES: { id: CurveId; label: string; Figure: () => ReactElement; plots: string; idea: string; gives: string; note: string }[] = [
  {
    id: "fetkovich", label: "Fetkovich", Figure: Fetkovich,
    plots: "무차원 감퇴 유량(qDd) vs 무차원 감퇴 시간(tDd)",
    idea: "Arps 감퇴곡선은 경계 지배 유동 구간에만 적용됩니다. Fetkovich는 유정 시험 이론의 천이 유동 곡선(왼쪽)을 Arps 곡선(오른쪽, b = 0 지수 ~ b = 1 조화)에 이어 붙여 생산 전 기간을 하나의 그래프로 다뤘습니다. 두 영역은 지수 감퇴곡선에서 만납니다.",
    gives: "왼쪽 천이 곡선 일치로 투과도와 스킨, 오른쪽 감퇴 곡선 일치로 감퇴 변수 → 궁극 가채량(EUR), 원시 유체량, 배유 면적",
    note: "천이 구간 자료만으로는 여러 곡선에 똑같이 맞아 저류층 크기를 정할 수 없습니다. b가 1보다 크게 나오면 아직 천이 유동일 가능성이 있습니다.",
  },
  {
    id: "blasingame", label: "Blasingame", Figure: Blasingame,
    plots: "정규화 유량(q/Δp), 유량 적분, 유량 적분 미분 vs 물질수지 시간",
    idea: "물질수지 시간을 쓰면 유량과 유동 압력이 함께 변하는 자료도 경계 지배 유동 구간에서 하나의 조화(harmonic) 곡선으로 모입니다. 적분 곡선은 잡음을 줄여 주고, 세 곡선을 함께 맞추면 일치가 더 확실해집니다.",
    gives: "투과도, 스킨, 파쇄 반길이·전도도, 배유 면적, 원시 석유·가스량",
    note: "가스정은 압력에 따른 물성 변화를 반영하기 위해 의사압력과 의사시간을 사용합니다.",
  },
  {
    id: "agarwal", label: "Agarwal-Gardner", Figure: AgarwalGardner,
    plots: "정규화 유량과 역 반대수 미분 vs 시간, 그리고 유량 vs 누적 생산량",
    idea: "Fetkovich·Blasingame의 방법을 바탕으로 하되, 무차원 변수를 유정 시험의 정의로 사용합니다. 유량–누적 생산량 그래프에서는 경계 지배 유동 자료가 직선이 되고, 이 직선을 연장한 x절편이 원시 유체량을 가리킵니다.",
    gives: "투과도, 스킨 또는 파쇄 반길이, 저류층 반경·면적, 원시 유체량",
    note: "유량–누적 생산량 직선은 07의 Flowing Material Balance와 같은 원리입니다.",
  },
  {
    id: "npi", label: "NPI", Figure: Npi,
    plots: "정규화 압력(Δp/q), 압력 적분, 압력 적분 미분 vs 물질수지 시간",
    idea: "유량 대신 압력을 기준으로 한 유형곡선입니다(Blasingame 등, 1989). 진단 그래프가 긴 drawdown 시험과 같아 유정 시험 해석과 자연스럽게 이어지고, 압력 적분이 잡음이 많은 자료를 매끄럽게 합니다.",
    gives: "투과도, 스킨 또는 파쇄 반길이, 배유 면적, 원시 유체량",
    note: "미분이 평탄하면 방사류, 늦은 시간 단위 기울기로 오르면 경계 지배 유동 — 04의 진단 그래프와 같은 방식으로 읽습니다.",
  },
  {
    id: "wattenbarger", label: "Wattenbarger", Figure: Wattenbarger,
    plots: "척도화한 압력 vs 척도화한 시간 (선형 유동용)",
    idea: "배유 경계까지 수압파쇄가 뻗은 치밀 가스정처럼 선형 유동이 오래 이어지는 유정을 위한 유형곡선입니다. 직사각형 저류층 가운데 파쇄정 모델을 쓰며, 변수를 척도화하면 형상과 관계없이 하나의 곡선으로 모입니다.",
    gives: "선형 유동 변수(투과도와 파쇄·배유 형상이 결합된 값), 경계 도달 이후 배유 부피",
    note: "셰일·치밀 가스정 해석에 특히 유용합니다.",
  },
];

export function TypeCurveExplorer() {
  const [id, setId] = useState<CurveId>("fetkovich");
  const c = CURVES.find((x) => x.id === id)!;
  return (
    <div>
      <Choice idBase="typecurve" label="Type curve" value={id} onChange={setId} options={CURVES.map((x) => ({ id: x.id, label: x.label }))} />
      <div id="typecurve-panel" role="tabpanel" aria-labelledby={`typecurve-tab-${id}`} className={w.explorer}>
        <figure className={w.fig}>
          <c.Figure />
          <div className={w.legend}>
            <span><i className={w.lgDer} />Matched curve</span>
            {(id === "fetkovich" || id === "blasingame") && <span><i className={w.lgStem} />Other stems</span>}
            {(id === "blasingame" || id === "npi") && <span><i className={w.lgIntegral} />Integral</span>}
            {id !== "fetkovich" && id !== "wattenbarger" && <span><i className={w.lgDerivative} />Derivative</span>}
            <span><i className={w.lgDot} />Production data</span>
          </div>
          <figcaption className={w.caption}>Conceptual type curves · shapes only, no values</figcaption>
        </figure>
        <dl className={w.methods}>
          <div><dt>What Is Plotted</dt><dd>{c.plots}</dd></div>
          <div><dt>Key Idea</dt><dd>{c.idea}</dd></div>
          <div><dt>What It Gives</dt><dd>{c.gives}</dd></div>
          <div><dt>Keep in Mind</dt><dd>{c.note}</dd></div>
        </dl>
      </div>
    </div>
  );
}

/* ── 07 Flowing material balance ── */

type Step = "plot" | "fit" | "ogip";

const FMB_STEPS: { id: Step; label: string; title: string; body: string }[] = [
  {
    id: "plot", label: "1 · Plot the Data", title: "정규화 유량 vs 정규화 누적 생산량",
    body: "생산 중 측정한 유량과 유동 압력으로 정규화 유량(q/Δp, 가스는 의사압력 사용)과 정규화 누적 생산량을 계산해 직교 좌표에 그립니다. 생산을 멈추고 압력을 측정하지 않아도 됩니다.",
  },
  {
    id: "fit", label: "2 · Fit the BDF Trend", title: "경계 지배 유동 구간에 직선 맞추기",
    body: "모든 경계에 압력이 도달한 경계 지배(의사정상) 유동 구간의 자료는 직선 위에 놓입니다. 초기 천이 구간의 자료는 이 관계를 따르지 않으므로 제외합니다. 어느 구간을 직선으로 볼지는 해석자의 판단이 필요합니다.",
  },
  {
    id: "ogip", label: "3 · Extrapolate → OGIP", title: "직선을 연장한 x절편 = OGIP",
    body: "맞춘 직선을 유량이 0이 되는 곳까지 연장하면, x절편이 원시 가스 부존량(OGIP)입니다. 유정이 연결된 부피를 기준으로 한 값이며, 일정 유량·변동 유량 모두에, 석유와 가스 모두에 적용할 수 있습니다.",
  },
];

const FMB_A: Pt = [60, 70];
const FMB_B: Pt = [470, 300];
const fmbY = (x: number) => FMB_A[1] + (x - FMB_A[0]) * (FMB_B[1] - FMB_A[1]) / (FMB_B[0] - FMB_A[0]);
const TRANSIENT: Pt[] = [[68, 34], [80, 26], [94, 18], [110, 10], [124, 4]].map(([x, o]) => [x, fmbY(x) - o]);
const BDF: Pt[] = [140, 160, 180, 200, 220, 240, 260, 280, 300, 320].map((x, i) => [x, fmbY(x) + NOISE[i] / 2]);

function FmbPlot({ step }: { step: Step }) {
  const fit = step !== "plot";
  return (
    <svg viewBox="0 0 560 340" className={f.graph} role="img" aria-label="Conceptual flowing material balance: normalized rate against normalized cumulative production; boundary-dominated points fall on a straight line whose x-intercept is the original gas in place">
      {fit && <path d={`M130,${fmbY(130)} L330,${fmbY(330)}`} className={w.fit} />}
      {step === "ogip" && (
        <>
          <path d={`M330,${fmbY(330)} L${FMB_B[0]},${FMB_B[1]}`} className={w.extrap} />
          <circle cx={FMB_B[0]} cy={FMB_B[1]} r="6" className={w.intercept} />
          <text x={FMB_B[0]} y={FMB_B[1] - 16} className={f.gNote} textAnchor="middle">OGIP</text>
          <text x={FMB_B[0]} y={FMB_B[1] - 30} className={f.gTiny} textAnchor="middle">x-intercept</text>
        </>
      )}
      <Dots pts={TRANSIENT} muted={fit} />
      <Dots pts={BDF} />
      {fit && <text x="132" y="40" className={f.gTiny}>Transient — not on the line</text>}
      {fit && <text x="250" y={fmbY(250) - 22} className={f.gTinyBlue}>Boundary-dominated flow</text>}
      <Axes x="Normalized cumulative production →" y="Normalized rate q/Δp →" />
    </svg>
  );
}

export function FmbExplorer() {
  const [step, setStep] = useState<Step>("plot");
  const s = FMB_STEPS.find((x) => x.id === step)!;
  return (
    <div>
      <Choice idBase="fmb" label="Flowing material balance step" value={step} onChange={setStep} options={FMB_STEPS.map((x) => ({ id: x.id, label: x.label }))} />
      <div id="fmb-panel" role="tabpanel" aria-labelledby={`fmb-tab-${step}`} className={w.explorer}>
        <figure className={w.fig}>
          <FmbPlot step={step} />
          <figcaption className={w.caption}>Conceptual FMB plot (Cartesian) · shapes only, no values</figcaption>
        </figure>
        <div className={w.regimeText}>
          <h4 className={f.miniHead}>{s.label}</h4>
          <p className={f.lead}>{s.title}</p>
          <p className={f.p}>{s.body}</p>
        </div>
      </div>
    </div>
  );
}
