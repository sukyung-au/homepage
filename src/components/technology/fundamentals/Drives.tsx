"use client";
import { useState } from "react";
import { Choice } from "./Choice";
import { ReservoirSection, type SectionKind } from "./ReservoirSection";
import s from "./Fundamentals.module.css";

/** 06 — Reservoir drive mechanisms (the four covered by the course material). Pressure trends are qualitative. */

type DriveId = "solution" | "gas-cap" | "water" | "combination";

interface Drive {
  id: DriveId;
  label: string;
  energy: string;
  principle: string;
  pressure: string;
  production: string;
}

const DRIVES: Drive[] = [
  {
    id: "solution", label: "Solution Gas Drive",
    energy: "원유와, 기포점 아래에서 원유로부터 분리되는 용해가스의 팽창",
    principle: "가스캡이나 활성 대수층이 없는 저류층에서, 압력이 낮아지며 원유에서 빠져나온 가스가 팽창해 원유를 생산정으로 밀어냅니다.",
    pressure: "외부 에너지 공급이 없어 저류층 압력이 비교적 빠르게, 지속적으로 감소합니다.",
    production: "초기에는 GOR이 낮다가, 분리된 가스가 유동하기 시작하면 빠르게 증가합니다. 물 생산은 거의 없고, 회수율은 상대적으로 낮습니다.",
  },
  {
    id: "gas-cap", label: "Gas Cap Drive",
    energy: "원유층 위에 있는 가스캡(gas cap)의 팽창 (용해가스 팽창도 함께 작용)",
    principle: "압력이 낮아지면 가스캡이 팽창하며 가스–원유 경계(GOC)가 아래로 내려오고, 원유를 생산정 쪽으로 밀어냅니다.",
    pressure: "가스캡의 팽창으로 압력이 유지되어, 용해가스 구동보다 완만하게 감소합니다.",
    production: "가스캡이 생산정에 가까워지면, 특히 구조 상부의 유정에서 GOR이 계속 증가합니다. 물 생산은 거의 없습니다.",
  },
  {
    id: "water", label: "Water Drive",
    energy: "저류층과 연결된 대수층(aquifer)의 물 팽창과 저류층으로의 물 유입",
    principle: "원유를 생산하면서 생긴 압력 감소를 대수층의 물이 들어와 보충하고, 물–원유 경계(OWC)가 올라오며 원유를 밀어냅니다.",
    pressure: "대수층이 충분히 강하면 저류층 압력이 비교적 높게 유지되며 천천히 감소합니다.",
    production: "GOR은 비교적 낮게 유지되고, 시간이 지나며 구조 하부 유정부터 water cut이 증가합니다. 일반적으로 회수율이 높은 편입니다.",
  },
  {
    id: "combination", label: "Combination Drive",
    energy: "두 가지 이상의 구동 에너지 — 예: 가스캡 팽창 + 대수층 물 유입 + 용해가스 팽창",
    principle: "여러 메커니즘이 동시에 작용합니다. 각 에너지의 상대적 크기와 생산 방식에 따라 저류층 거동이 달라집니다.",
    pressure: "작용하는 메커니즘의 조합과 세기에 따라 달라집니다. 대수층과 가스캡이 강할수록 압력이 잘 유지됩니다.",
    production: "구조 상부에서는 가스, 하부에서는 물의 영향이 나타날 수 있어, 유정 위치와 생산량 관리가 중요합니다.",
  },
];

/** Qualitative pressure-vs-time trends; the selected mechanism is highlighted */
const TRENDS: Record<Exclude<DriveId, "combination">, string> = {
  solution: "M40,24 C90,80 130,118 200,140 S300,160 340,164",
  "gas-cap": "M40,24 C100,52 170,80 240,98 S320,116 340,120",
  water: "M40,24 C110,34 180,44 250,52 S320,60 340,62",
};

function PressureTrend({ id }: { id: DriveId }) {
  return (
    <svg viewBox="0 0 360 190" className={s.graph} role="img" aria-label="Qualitative reservoir pressure versus time: fastest decline for solution gas drive, slower for gas cap drive, best maintained for water drive">
      <path d="M40,14 V170 H352" className={s.gAxis} />
      {(Object.keys(TRENDS) as (keyof typeof TRENDS)[]).map((k) => (
        <path key={k} d={TRENDS[k]} className={k === id ? s.trendOn : id === "combination" ? s.trendMid : s.trendOff} />
      ))}
      {id === "combination" && <path d="M40,24 C100,44 170,64 240,78 S320,90 340,92" className={s.trendCombo} />}
      <text x="344" y={id === "solution" ? 160 : 156} className={s.gTiny} textAnchor="end">Solution gas</text>
      <text x="344" y="114" className={s.gTiny} textAnchor="end">Gas cap</text>
      <text x="344" y="56" className={s.gTiny} textAnchor="end">Water</text>
      {id === "combination" && <text x="250" y="72" className={s.gTinyBlue} textAnchor="end">Combination (depends on mix)</text>}
      <text x="352" y="186" className={s.gAxisLabel} textAnchor="end">Time / cumulative production →</text>
      <text x="26" y="16" className={s.gAxisLabel} transform="rotate(-90 26 16)" textAnchor="end">Reservoir pressure →</text>
    </svg>
  );
}

export function Drives() {
  const [id, setId] = useState<DriveId>("solution");
  const d = DRIVES.find((x) => x.id === id)!;
  return (
    <div className={s.figBlock}>
      <Choice idBase="drive" label="Drive mechanism" value={id} onChange={setId} options={DRIVES.map((x, i) => ({ id: x.id, label: x.label, sub: String(i + 1).padStart(2, "0") }))} />
      <div id="drive-panel" role="tabpanel" aria-labelledby={`drive-tab-${id}`} className={s.driveGrid}>
        <figure className={s.figure}>
          <ReservoirSection kind={id as SectionKind} label={`Conceptual cross-section: ${d.label}`} />
          <figcaption className={s.caption}>Conceptual cross-section · arrows show the main energy source · not to scale</figcaption>
        </figure>
        <dl className={s.driveDefs}>
          <div><dt>Main Energy Source</dt><dd>{d.energy}</dd></div>
          <div><dt>Working Principle</dt><dd>{d.principle}</dd></div>
          <div><dt>Typical Pressure Behavior</dt><dd>{d.pressure}</dd></div>
          <div><dt>Production Characteristics</dt><dd>{d.production}</dd></div>
        </dl>
        <figure className={`${s.figure} ${s.trendFig}`}>
          <PressureTrend id={id} />
          <figcaption className={s.caption}>Qualitative trend · no values</figcaption>
        </figure>
      </div>
    </div>
  );
}
