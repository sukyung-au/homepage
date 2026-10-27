"use client";
import { useState } from "react";
import { Choice } from "./Choice";
import { Details } from "./Details";
import { ReservoirSection, type SectionKind } from "./ReservoirSection";
import s from "./Fundamentals.module.css";

/**
 * 06 — Reservoir drive mechanisms: the four from the course material plus rock & fluid expansion, gravity drainage
 * and compaction (SLB Oilfield Review "Defining Reservoir Drive Mechanisms", SLB glossary, SPE PetroWiki).
 * Pressure trends are qualitative and drawn only for the four course mechanisms.
 */

type DriveId = "expansion" | "solution" | "gas-cap" | "water" | "gravity" | "compaction" | "combination";

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
    id: "expansion", label: "Rock & Fluid Expansion",
    energy: "기포점보다 높은 압력(미포화 저류층)에서 일어나는 원유·지층수·암석 입자의 팽창과 공극 부피 감소",
    principle: "미포화 저류층에서는 압력이 낮아져도 원유에서 가스가 분리되지 않습니다. 대신 원유와 지층수, 암석 입자가 팽창하고 공극 부피가 줄어들며, 그만큼의 원유가 공극에서 밀려나 생산정으로 흐릅니다.",
    pressure: "원유와 암석의 압축률이 작아 압력이 비교적 빠르게 감소합니다. 압력이 기포점 아래로 내려가면 용해가스 구동이 시작됩니다.",
    production: "기포점에 도달하기 전에는 가스가 원유에 녹은 채로 생산됩니다. 다른 구동 메커니즘에 비해 회수 효율이 가장 낮은 편입니다.",
  },
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
    id: "gravity", label: "Gravity Drainage",
    energy: "유체 간 밀도 차이 — 중력에 의해 가스는 위로, 원유는 아래로 분리",
    principle: "분리된 가스는 구조 상부의 가스캡으로 올라가고, 원유는 아래로 흘러내려 생산정으로 배출됩니다. 그래서 생산정을 원유층의 가능한 낮은 위치에 완결하는 것이 유리합니다.",
    pressure: "중력은 저류층에 항상 작용하지만 유체가 분리되어 평형을 이룰 시간이 필요합니다. 천천히 생산할수록 최종 회수율이 크게 향상될 수 있습니다.",
    production: "1차 회수 메커니즘 가운데 가장 드문 편입니다. 두께가 두꺼운 가스 컨덴세이트 저류층, 얕고 투과도가 높으며 경사가 급한 저류층에서 효과가 크고, 수직 투과도·경사·상대투과도·생산량이 효율을 좌우합니다.",
  },
  {
    id: "compaction", label: "Compaction Drive",
    energy: "유체 생산으로 공극압이 낮아질 때 수축하는 암석 골격 — 공극 부피 감소",
    principle: "상부 지층의 하중을 함께 지탱하던 공극압이 낮아지면 암석 골격이 압밀되어 공극 부피가 줄어듭니다. 줄어든 공극 부피만큼 유체가 밀려나 생산에 에너지를 보탭니다.",
    pressure: "공극 압축률이 매우 큰 저류층에서 두드러집니다. 압력이 기포점 아래로 내려가면 용해가스 구동이 함께 작용합니다.",
    production: "드문 메커니즘이지만, 압밀이 일어나면 그렇지 않은 저류층보다 회수율이 높아집니다. 대개 용해가스·물·가스캡 구동과 함께 나타나며, 과도한 압밀은 생산상의 문제를 일으키기도 합니다.",
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
const TRENDS: Partial<Record<DriveId, string>> = {
  solution: "M40,24 C90,80 130,118 200,140 S300,160 340,164",
  "gas-cap": "M40,24 C100,52 170,80 240,98 S320,116 340,120",
  water: "M40,24 C110,34 180,44 250,52 S320,60 340,62",
};

const HAS_TREND = (id: DriveId) => id in TRENDS || id === "combination";

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
  const [id, setId] = useState<DriveId>("expansion");
  const d = DRIVES.find((x) => x.id === id)!;
  return (
    <div>
      <Choice idBase="drive" label="Drive mechanism" value={id} onChange={setId} options={DRIVES.map((x) => ({ id: x.id, label: x.label }))} />
      <div id="drive-panel" role="tabpanel" aria-labelledby={`drive-tab-${id}`}>
        <figure className={`${s.figure} ${s.wideFigure}`}>
          <ReservoirSection kind={id as SectionKind} label={`Conceptual cross-section: ${d.label}`} />
          <figcaption className={s.caption}>Conceptual cross-section · arrows show the main energy source · not to scale</figcaption>
        </figure>
        <div className={s.driveText}>
          <div>
            <h4 className={s.miniHead}>Main Energy Source</h4>
            <p className={s.lead}>{d.energy}</p>
          </div>
          <div>
            <h4 className={s.miniHead}>Working Principle</h4>
            <p className={s.p}>{d.principle}</p>
          </div>
        </div>
        <div className={s.driveDetails}>
        <Details summary="Pressure behavior & production characteristics">
          <div className={HAS_TREND(id) ? s.driveMore : undefined}>
            <dl className={s.defs}>
              <div><dt>Typical Pressure Behavior</dt><dd>{d.pressure}</dd></div>
              <div><dt>Production Characteristics</dt><dd>{d.production}</dd></div>
            </dl>
            {HAS_TREND(id) && (
              <figure className={`${s.figure} ${s.trendFig}`}>
                <PressureTrend id={id} />
                <figcaption className={s.caption}>Qualitative trend · no values</figcaption>
              </figure>
            )}
          </div>
        </Details>
        </div>
      </div>
    </div>
  );
}
