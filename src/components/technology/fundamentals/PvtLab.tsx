"use client";
import { useState, type ReactElement } from "react";
import { Choice } from "./Choice";
import s from "./Fundamentals.module.css";

/** 03 — PVT laboratory analyses. Illustrations are schematic: cells, levels and peaks carry no values. */

type TestId = "composition" | "flash" | "differential" | "separator" | "viscosity";

interface Test {
  id: TestId;
  label: string;
  purpose: string;
  procedure: string;
  measurements: string[];
  significance: string;
}

const TESTS: Test[] = [
  {
    id: "composition", label: "Compositional Measurement",
    purpose: "저류층 유체를 이루는 성분과 그 조성(몰 분율)을 파악합니다.",
    procedure: "시료를 대기 조건으로 분리한 가스와 액체를 각각 가스 크로마토그래피 등으로 분석한 뒤, 측정된 기체·액체 비율로 재조합해 저류층 유체의 전체 조성을 구합니다. 무거운 성분은 C7+처럼 하나의 그룹으로 묶어 특성(분자량, 비중)을 측정합니다.",
    measurements: ["성분별 몰 분율 (N₂, CO₂, H₂S, C1 … C6, C7+)", "C7+ 분자량 · 비중"],
    significance: "유체 유형 판단과 상태방정식(EOS) 모델 구성의 기본 입력 자료가 됩니다.",
  },
  {
    id: "flash", label: "Flash Vaporization",
    purpose: "일정한 저류층 온도에서 압력에 따른 유체의 부피 변화와 기포점 압력을 측정합니다. (Constant Composition Expansion)",
    procedure: "PVT 셀에 시료를 넣고 저류층 온도를 유지한 채 압력을 단계적으로 낮춥니다. 발생한 가스를 셀 밖으로 빼지 않고 액체와 함께 두어, 전체 조성이 일정한 상태에서 기체·액체 평형을 이루게 합니다.",
    measurements: ["압력별 전체 부피 (상대 부피)", "기포점 압력 — 압력–부피 기울기가 꺾이는 지점", "기포점 위에서의 원유 압축률"],
    significance: "기포점 압력과 단상 원유의 압축성을 결정해, 저류층 거동 계산과 상거동 해석의 기준이 됩니다.",
  },
  {
    id: "differential", label: "Differential Vaporization",
    purpose: "기포점 아래에서 가스가 원유로부터 분리되어 빠져나가는 과정을 모사해, 남은 원유의 성질 변화를 측정합니다. (Differential Liberation)",
    procedure: "저류층 온도에서 기포점부터 압력을 단계적으로 낮추고, 각 단계에서 발생한 가스를 셀 밖으로 모두 빼내어 부피와 성질을 측정합니다. 이를 대기압까지 반복한 뒤 남은 잔류 원유를 측정합니다.",
    measurements: ["단계별 발생 가스량과 가스 비중, z-factor", "남은 원유의 부피 변화 — 용해 가스비(Rs), 체적계수(Bo)", "원유 밀도, 잔류 원유량"],
    significance: "기포점 아래에서 가스가 원유보다 쉽게 이동하는 저류층 상황을 반영한 원유 물성(Bo, Rs) 자료를 제공합니다.",
  },
  {
    id: "separator", label: "Separator Test",
    purpose: "지상 분리 조건에서 유체가 가스와 원유로 나뉘는 거동을 평가합니다.",
    procedure: "기포점 상태의 시료를 하나 이상의 분리기 압력·온도 단계를 거쳐 저장탱크(stock tank) 조건까지 순차적으로 분리하고, 각 단계의 가스와 최종 원유를 측정합니다. 여러 분리기 압력 조건을 비교하기도 합니다.",
    measurements: ["분리기·저장탱크 가스–원유비(GOR)", "저장탱크 원유 비중(API)", "분리기 조건 기준 체적계수"],
    significance: "실험실 자료를 실제 지상 생산 조건으로 환산하고, 액체 회수에 유리한 분리기 조건을 검토하는 데 활용됩니다.",
  },
  {
    id: "viscosity", label: "Oil Viscosity Measurement",
    purpose: "압력과 온도에 따른 원유 점도를 측정합니다.",
    procedure: "저류층 온도에서 압력을 바꿔 가며 점도계(예: rolling-ball, capillary)로 원유 점도를 측정합니다. 기포점 아래에서는 가스가 분리된 뒤 남은 원유의 점도를 측정합니다.",
    measurements: ["압력별 원유 점도 (기포점 위·아래)", "기포점에서의 점도", "필요 시 온도별 점도"],
    significance: "유동 저항과 이동도 계산에 쓰입니다. 기포점 아래에서는 용해 가스가 빠져나가 원유 점도가 커집니다.",
  },
];

/* Schematic PVT cell: piston, gas cap (top) and liquid (bottom); heights are fractions of the cell */
function Cell({ x, gas, liquid, label, out }: { x: number; gas: number; liquid: number; label: string; out?: boolean }) {
  const top = 30, h = 120, w = 54;
  const volume = gas + liquid; // fraction of the cell occupied below the piston
  const piston = top + h * (1 - volume);
  const gy = piston, ly = top + h * (1 - liquid);
  return (
    <g>
      <rect x={x} y={top} width={w} height={h} className={s.cell} />
      <rect x={x + 2} y={piston - 8} width={w - 4} height={8} className={s.piston} />
      <line x1={x + w / 2} y1={top - 14} x2={x + w / 2} y2={piston - 8} className={s.pistonRod} />
      {gas > 0 && <rect x={x + 2} y={gy} width={w - 4} height={ly - gy} className={s.cellGas} />}
      <rect x={x + 2} y={ly} width={w - 4} height={top + h - ly - 2} className={s.cellOil} />
      {out && (
        <g>
          <path d={`M${x + w},${gy + 6} h18`} className={s.cellOut} markerEnd="url(#pvt-arrow)" />
          <text x={x + w + 4} y={gy - 2} className={s.gTiny}>gas out</text>
        </g>
      )}
      <text x={x + w / 2} y={top + h + 18} className={s.gTiny} textAnchor="middle">{label}</text>
    </g>
  );
}

function Defs() {
  return (
    <defs>
      <marker id="pvt-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L8,4 L0,8 Z" className={s.gHead} /></marker>
    </defs>
  );
}

function FlashFigure() {
  return (
    <svg viewBox="0 0 420 180" className={s.graph} role="img" aria-label="Flash vaporization: pressure is lowered in steps and the liberated gas stays in the cell with the liquid">
      <Defs />
      <Cell x={14} gas={0} liquid={0.55} label="P > Pb" />
      <Cell x={114} gas={0} liquid={0.58} label="P = Pb" />
      <Cell x={214} gas={0.18} liquid={0.52} label="P < Pb" />
      <Cell x={314} gas={0.36} liquid={0.48} label="P ≪ Pb" />
      <text x={210} y={14} className={s.gNote} textAnchor="middle">Gas stays in contact with liquid · composition constant</text>
    </svg>
  );
}

function DifferentialFigure() {
  return (
    <svg viewBox="0 0 420 180" className={s.graph} role="img" aria-label="Differential vaporization: at each pressure step the liberated gas is removed from the cell">
      <Defs />
      <Cell x={14} gas={0} liquid={0.58} label="P = Pb" />
      <Cell x={104} gas={0.16} liquid={0.54} label="Step 1" out />
      <Cell x={204} gas={0.14} liquid={0.5} label="Step 2" out />
      <Cell x={304} gas={0} liquid={0.44} label="Residual oil" />
      <text x={210} y={14} className={s.gNote} textAnchor="middle">Liberated gas removed at every step</text>
    </svg>
  );
}

function CompositionFigure() {
  const peaks: [string, number][] = [["N₂", 0.12], ["CO₂", 0.14], ["C1", 0.92], ["C2", 0.42], ["C3", 0.36], ["iC4", 0.16], ["nC4", 0.22], ["iC5", 0.12], ["nC5", 0.14], ["C6", 0.2], ["C7+", 0.62]];
  return (
    <svg viewBox="0 0 420 180" className={s.graph} role="img" aria-label="Schematic chromatogram: one peak per component group from nitrogen to C7-plus; heights are illustrative">
      <path d="M24,150 H404" className={s.gAxis} />
      {peaks.map(([k, v], i) => {
        const x = 40 + i * 34, y = 150 - v * 120;
        return (
          <g key={k}>
            <path d={`M${x - 8},150 Q${x},${y - 6} ${x + 8},150`} className={i === peaks.length - 1 ? s.peakHeavy : s.peak} />
            <text x={x} y={166} className={s.gTiny} textAnchor="middle">{k}</text>
          </g>
        );
      })}
      <text x={404} y={18} className={s.gTiny} textAnchor="end">Schematic · peak heights illustrative</text>
    </svg>
  );
}

function SeparatorFigure() {
  return (
    <svg viewBox="0 0 420 180" className={s.graph} role="img" aria-label="Separator test: the sample is flashed through a separator stage to stock-tank conditions; gas leaves at each stage">
      <Defs />
      <rect x={20} y={60} width={50} height={80} rx="6" className={s.cell} />
      <rect x={22} y={72} width={46} height={66} rx="4" className={s.cellOil} />
      <text x={45} y={158} className={s.gTiny} textAnchor="middle">Sample (Pb)</text>
      <path d="M70,110 H128" className={s.cellOut} markerEnd="url(#pvt-arrow)" />
      <rect x={134} y={70} width={110} height={60} rx="30" className={s.cell} />
      <rect x={136} y={102} width={106} height={26} rx="12" className={s.cellOil} />
      <rect x={146} y={76} width={86} height={24} rx="10" className={s.cellGas} />
      <text x={189} y={148} className={s.gTiny} textAnchor="middle">Separator (P, T)</text>
      <path d="M189,70 V36" className={s.cellOut} markerEnd="url(#pvt-arrow)" />
      <text x={196} y={40} className={s.gTiny}>gas</text>
      <path d="M244,114 H300" className={s.cellOut} markerEnd="url(#pvt-arrow)" />
      <rect x={306} y={84} width={80} height={56} className={s.cell} />
      <rect x={308} y={104} width={76} height={34} className={s.cellOil} />
      <path d="M346,84 V50" className={s.cellOut} markerEnd="url(#pvt-arrow)" />
      <text x={352} y={56} className={s.gTiny}>gas</text>
      <text x={346} y={158} className={s.gTiny} textAnchor="middle">Stock tank</text>
    </svg>
  );
}

function ViscosityFigure() {
  // viscosity falls with pressure decrease above Pb (liquid expands), rises below Pb (gas leaves the oil)
  const pb = 250;
  return (
    <svg viewBox="0 0 420 180" className={s.graph} role="img" aria-label="Conceptual oil viscosity versus pressure: viscosity is lowest at the bubble point, increasing above it with pressure and increasing below it as dissolved gas is released">
      <path d="M40,14 V150 H404" className={s.gAxis} />
      <line x1={pb} y1={20} x2={pb} y2={150} className={s.gGuide} />
      <path d={`M60,40 C120,104 190,128 ${pb},132 C300,128 350,112 396,96`} className={s.gCurve} />
      <circle cx={pb} cy={132} r="4" className={s.gDotBubble} />
      <text x={pb + 6} y={30} className={s.gTiny}>Pb</text>
      <text x={404} y={168} className={s.gAxisLabel} textAnchor="end">Pressure →</text>
      <text x={26} y={18} className={s.gAxisLabel} transform="rotate(-90 26 18)" textAnchor="end">Oil viscosity →</text>
      <text x={110} y={70} className={s.gTiny}>below Pb: gas leaves the oil</text>
      <text x={290} y={86} className={s.gTiny}>above Pb: single-phase oil</text>
    </svg>
  );
}

const FIGURES: Record<TestId, () => ReactElement> = {
  composition: CompositionFigure,
  flash: FlashFigure,
  differential: DifferentialFigure,
  separator: SeparatorFigure,
  viscosity: ViscosityFigure,
};

export function PvtLab() {
  const [id, setId] = useState<TestId>("flash");
  const t = TESTS.find((x) => x.id === id)!;
  const Fig = FIGURES[id];
  return (
    <div className={s.figBlock}>
      <div className={s.labGrid}>
        <Choice idBase="pvt" label="PVT laboratory test" variant="list" value={id} onChange={setId} options={TESTS.map((x, i) => ({ id: x.id, label: x.label, sub: String(i + 1).padStart(2, "0") }))} />
        <div id="pvt-panel" role="tabpanel" aria-labelledby={`pvt-tab-${id}`} className={s.labPanel}>
          <figure className={s.figure}><Fig /></figure>
          <dl className={s.labDefs}>
            <div><dt>Purpose</dt><dd>{t.purpose}</dd></div>
            <div><dt>Principle / Procedure</dt><dd>{t.procedure}</dd></div>
            <div><dt>Key Measurements</dt><dd><ul className={s.bullets}>{t.measurements.map((m) => <li key={m}>{m}</li>)}</ul></dd></div>
            <div><dt>Engineering Significance</dt><dd>{t.significance}</dd></div>
          </dl>
        </div>
      </div>

      {/* Flash vs differential, side by side */}
      <div className={s.compare} aria-label="Flash versus differential vaporization">
        <div className={s.compareCol}>
          <span className={s.compareKey}>Flash · Constant Composition</span>
          <FlashFigure />
          <p className={s.pSmall}>발생 가스를 셀 안에 유지 → 전체 조성이 일정한 <b>평형</b> 실험</p>
        </div>
        <div className={s.compareCol}>
          <span className={s.compareKey}>Differential · Liberation</span>
          <DifferentialFigure />
          <p className={s.pSmall}>단계마다 발생 가스를 <b>제거</b> → 남은 원유의 조성이 계속 변함</p>
        </div>
      </div>
    </div>
  );
}
