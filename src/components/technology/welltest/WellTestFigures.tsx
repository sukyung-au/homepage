"use client";
import { useState } from "react";
import { Choice } from "../fundamentals/Choice";
import f from "../fundamentals/Fundamentals.module.css";
import w from "./WellTest.module.css";

/**
 * Conceptual figures of topic 3.3. Shapes only — no values. The derivative signatures follow
 * "Basic Derivative Diagnostics" (SWP Short Course) and the whitson⁺ PTA / RTA manuals (see SOURCES in WellTestTopic).
 */

/** 01 — A well test: rate history (top) and the bottomhole pressure response (bottom) */
export function RateHistory() {
  return (
    <svg viewBox="0 0 560 330" className={f.graph} role="img" aria-label="Conceptual well test: the well flows at a constant rate and pressure draws down, then it is shut in and pressure builds up">
      <rect x="110" y="16" width="220" height="296" className={w.flowBand} />
      <path d="M50,16 V110 H540" className={f.gAxis} />
      <path d="M50,110 H110 V54 H330 V110 H540" className={w.rate} />
      <text x="220" y="44" className={f.gTinyBlue} textAnchor="middle">Flow period · constant rate</text>
      <text x="435" y="100" className={f.gTiny} textAnchor="middle">Shut-in · rate = 0</text>
      <text x="36" y="18" className={f.gAxisLabel} transform="rotate(-90 36 18)" textAnchor="end">Rate</text>

      <path d="M50,150 V300 H540" className={f.gAxis} />
      <path d="M50,168 H110 C118,228 150,250 200,258 S300,266 330,268 C338,214 370,198 430,192 S510,187 540,186" className={w.pressure} />
      <path d="M50,168 H540" className={f.gGuide} />
      <text x="56" y="162" className={f.gTiny}>Initial pressure</text>
      <text x="220" y="250" className={f.gNote} textAnchor="middle">Drawdown</text>
      <text x="435" y="214" className={f.gNote} textAnchor="middle">Buildup</text>
      <text x="36" y="150" className={f.gAxisLabel} transform="rotate(-90 36 150)" textAnchor="end">Bottomhole pressure</text>
      <text x="540" y="324" className={f.gAxisLabel} textAnchor="end">Time →</text>
    </svg>
  );
}

/** 03 — Small rate-over-pressure pictograms for the test types */
export function TestPictogram({ kind }: { kind: "drawdown" | "buildup" | "falloff" }) {
  const rate = {
    drawdown: "M10,54 H40 V22 H190",
    buildup: "M10,54 H22 V22 H100 V54 H190",
    falloff: "M10,30 H22 V62 H100 V30 H190",
  }[kind];
  const zero = kind === "falloff" ? 30 : 54;
  const p = {
    drawdown: "M10,92 H40 C46,120 70,130 110,134 S170,140 190,141",
    buildup: "M10,92 H22 C28,120 50,130 100,134 C106,108 130,100 160,97 S184,95 190,95",
    falloff: "M10,134 H22 C28,106 50,96 100,92 C106,118 130,126 160,129 S184,131 190,131",
  }[kind];
  return (
    <svg viewBox="0 0 200 150" className={f.graph} role="img" aria-hidden>
      <path d={`M10,${zero} H190`} className={f.gGuide} />
      <path d={rate} className={w.rate} />
      <path d={p} className={w.pressure} />
      <text x="194" y="18" className={f.gTiny} textAnchor="end">{kind === "falloff" ? "Injection rate" : "Rate"}</text>
      <text x="194" y="84" className={f.gTiny} textAnchor="end">Pressure</text>
    </svg>
  );
}

/* ── 04 Log-log diagnostic plot ── */

type Regime = "storage" | "radial" | "no-flow" | "constant" | "closed";

const REGIMES: { id: Regime; label: string; signature: string; tells: string }[] = [
  {
    id: "storage", label: "Wellbore Storage",
    signature: "초기에 압력 변화(Δp)와 압력 미분 곡선이 단위 기울기(1:1)로 겹칩니다. 저장 효과가 끝나면 미분 곡선이 정점을 지나 내려오며 ‘혹(hump)’ 모양을 만듭니다.",
    tells: "유정을 지상에서 열거나 닫을 때 유정 내부 유체의 압축·팽창 때문에 생기는 현상으로, 저류층 반응을 가리므로 해석 구간에서 구분해 내야 합니다.",
  },
  {
    id: "radial", label: "Radial Flow",
    signature: "미분 곡선이 일정한 값으로 평탄해집니다. 무한작용 방사류(IARF) 구간으로, 반대수(semi-log) 그래프에서는 직선이 됩니다.",
    tells: "직선의 기울기에서 투과도-두께(kh), 절편에서 스킨(skin)을 구합니다. 스킨이 양수면 손상, 음수면 자극(stimulation)을 뜻합니다.",
  },
  {
    id: "no-flow", label: "No-Flow Boundary",
    signature: "평탄하던 미분 곡선이 위로 벗어난 뒤, 처음 값의 약 두 배 높이에서 다시 평탄해집니다(단층 하나 같은 비유동 경계).",
    tells: "봉쇄 단층 같은 경계가 있다는 신호이고, 반응이 나타나는 시점으로 경계까지의 거리를 추정합니다.",
  },
  {
    id: "constant", label: "Constant-Pressure Boundary",
    signature: "대수층 같은 일정 압력 공급원이 압력 하강을 멈추게 해, 미분 곡선이 평탄 구간에서 아래로 떨어집니다.",
    tells: "가장자리 물 구동(edgewater drive)처럼 압력을 지지하는 경계가 있다는 신호입니다.",
  },
  {
    id: "closed", label: "Closed System",
    signature: "시험이 충분히 길면 압력이 유동에 기여하는 공극 부피 전체에 닿고, 생산(drawdown) 중 미분 곡선이 늦은 시간에 단위 기울기로 올라갑니다(의사정상상태).",
    tells: "연결된 공극 부피의 한계에 도달했다는 신호로, 연결 부피를 추정하는 근거가 됩니다.",
  },
];

/** Late-time derivative and Δp per regime; early time (storage → hump → plateau) is shared */
const LATE: Record<Regime, { dp: string; der: string }> = {
  storage:   { dp: "C480,94 510,92 540,90", der: "H540" },
  radial:    { dp: "C480,94 510,92 540,90", der: "H540" },
  "no-flow": { dp: "C480,92 510,84 540,76", der: "C420,200 440,172 470,170 H540" },
  constant:  { dp: "C480,98 510,102 540,104", der: "C420,200 450,240 540,300" },
  closed:    { dp: "C480,90 510,76 540,58", der: "C410,200 420,190 430,180 L520,90" },
};

const BAND: Record<Regime, [number, number]> = {
  storage: [62, 205], radial: [262, 390], "no-flow": [390, 540], constant: [390, 540], closed: [390, 540],
};

function DiagnosticPlot({ id }: { id: Regime }) {
  const [x0, x1] = BAND[id];
  const late = LATE[id];
  return (
    <svg viewBox="0 0 560 360" className={f.graph} role="img" aria-label={`Conceptual log-log diagnostic plot of pressure change and pressure derivative; highlighted: ${id}`}>
      <rect x={x0} y="16" width={x1 - x0} height="304" className={w.band} />
      <path d="M60,16 V320 H548" className={f.gAxis} />
      {/* Δp: unit slope with the derivative, then rising slowly */}
      <path d={`M70,300 L170,170 C200,136 240,118 300,108 S400,98 440,96 ${late.dp}`} className={w.dp} />
      {/* derivative: unit slope, hump, plateau, then the late-time signature */}
      <path d={`M70,300 L170,170 C186,150 200,146 214,156 C232,170 248,198 270,200 H390 ${late.der}`} className={w.der} />
      <text x="120" y="226" className={f.gTiny} transform="rotate(-52 120 226)">Unit slope</text>
      {id === "radial" && <text x="326" y="192" className={f.gTinyBlue} textAnchor="middle">Flat derivative</text>}
      {id === "no-flow" && <text x="505" y="160" className={f.gTinyBlue} textAnchor="middle">≈ 2× plateau</text>}
      {id === "constant" && <text x="500" y="250" className={f.gTinyBlue} textAnchor="middle">Derivative drops</text>}
      {id === "closed" && <text x="476" y="166" className={f.gTinyBlue}>Late unit slope</text>}
      {id === "storage" && <text x="214" y="138" className={f.gTinyBlue} textAnchor="middle">Hump</text>}
      <text x="548" y="342" className={f.gAxisLabel} textAnchor="end">Elapsed time (log) →</text>
      <text x="44" y="18" className={f.gAxisLabel} transform="rotate(-90 44 18)" textAnchor="end">Δp and derivative (log) →</text>
    </svg>
  );
}

export function DiagnosticExplorer() {
  const [id, setId] = useState<Regime>("storage");
  const r = REGIMES.find((x) => x.id === id)!;
  return (
    <div>
      <Choice idBase="regime" label="Flow regime" value={id} onChange={setId} options={REGIMES.map((x) => ({ id: x.id, label: x.label }))} />
      <div id="regime-panel" role="tabpanel" aria-labelledby={`regime-tab-${id}`} className={w.explorer}>
        <figure className={w.fig}>
          <DiagnosticPlot id={id} />
          <div className={w.legend}>
            <span><i className={w.lgDp} />Pressure change Δp</span>
            <span><i className={w.lgDer} />Pressure derivative</span>
            <span><i className={w.lgBand} />Highlighted period</span>
          </div>
          <figcaption className={w.caption}>Conceptual log-log diagnostic plot · shapes only, no values</figcaption>
        </figure>
        <div className={w.regimeText}>
          <h4 className={f.miniHead}>Signature</h4>
          <p className={f.lead}>{r.signature}</p>
          <h4 className={f.miniHead}>What It Tells Us</h4>
          <p className={f.p}>{r.tells}</p>
        </div>
      </div>
    </div>
  );
}

/** 05 — RTA diagnostic: pressure-normalized rate vs time, transient linear flow then boundary-dominated flow */
export function RtaPlot() {
  return (
    <svg viewBox="0 0 560 320" className={f.graph} role="img" aria-label="Conceptual rate transient diagnostic: pressure-normalized rate declines with a half slope during transient linear flow, then a unit slope during boundary-dominated flow">
      <rect x="60" y="16" width="270" height="264" className={w.flowBand} />
      <path d="M60,16 V280 H548" className={f.gAxis} />
      <path d="M80,50 L300,160 C320,170 336,180 350,194 L430,274" className={w.der} />
      <path d="M80,40 L330,165" className={f.gGuide} />
      <path d="M350,184 L440,274" className={f.gGuide} />
      <text x="190" y="88" className={f.gTinyBlue} transform="rotate(26.6 190 88)">−½ slope · linear flow (transient)</text>
      <text x="384" y="204" className={f.gTinyBlue}>−1 slope · boundary-dominated</text>
      <text x="196" y="36" className={f.gTiny} textAnchor="middle">Transient flow</text>
      <text x="440" y="36" className={f.gTiny} textAnchor="middle">Boundary-dominated flow</text>
      <text x="548" y="302" className={f.gAxisLabel} textAnchor="end">Time (log) →</text>
      <text x="44" y="18" className={f.gAxisLabel} transform="rotate(-90 44 18)" textAnchor="end">Rate / Δp (log) →</text>
    </svg>
  );
}
