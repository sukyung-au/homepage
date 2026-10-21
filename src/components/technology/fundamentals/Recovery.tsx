"use client";
import { useState, type ReactElement } from "react";
import { ChevronDown } from "lucide-react";
import s from "./Fundamentals.module.css";

/** 07 — Production & recovery methods. Diagrams are schematic and carry no values. */


type GroupId = "mobility" | "chemical" | "thermal" | "miscible";
interface Group {
  id: GroupId;
  label: string;
  purpose: string;
  principle: string;
  methods: [string, string][];
}

const GROUPS: Group[] = [
  {
    id: "mobility", label: "Mobility Control",
    purpose: "주입 유체가 원유보다 지나치게 빨리 이동해 일부 경로로만 흐르는 현상(fingering, 조기 돌파)을 줄입니다.",
    principle: "주입 유체의 이동도를 낮추거나 고투과 구간을 막아, 주입 유체가 저류층을 더 고르게 소인(sweep)하도록 합니다.",
    methods: [
      ["Polymer", "주입수에 고분자를 넣어 점도를 높이고 물–원유 이동도비를 낮춤"],
      ["Foam", "가스를 거품 형태로 주입해 가스의 이동도를 낮춤"],
      ["Polymer Gel", "고투과 구간(thief zone)을 막아 주입 유체의 흐름을 다른 구간으로 전환"],
    ],
  },
  {
    id: "chemical", label: "Chemical",
    purpose: "모세관력 때문에 공극에 갇힌 잔류 원유를 움직입니다.",
    principle: "원유–물 계면장력을 크게 낮추거나 젖음성을 바꿔, 갇혀 있던 원유 방울이 공극 목을 통과할 수 있게 합니다.",
    methods: [
      ["Surfactant", "계면활성제로 원유–물 계면장력을 낮춤"],
      ["Alkali", "원유 속 산성 성분과 반응해 저류층 안에서 계면활성 물질을 생성"],
      ["ASP", "Alkali + Surfactant + Polymer — 계면장력 감소와 이동도 제어를 함께 적용"],
    ],
  },
  {
    id: "thermal", label: "Thermal",
    purpose: "점도가 높아 잘 흐르지 않는 중질유·초중질유의 유동성을 높입니다.",
    principle: "저류층에 열을 공급하면 원유 점도가 크게 낮아져 생산정으로 흐르기 쉬워집니다.",
    methods: [
      ["Steam Injection", "증기를 주입해 원유를 가열 (주기적 주입 또는 연속 증기공법)"],
      ["SAGD", "상·하부 수평정 쌍 — 상부에 증기를 주입하고, 가열된 원유가 중력으로 하부 생산정에 배수"],
      ["In-situ Combustion", "공기를 주입해 저류층 안의 원유 일부를 연소시켜 열을 발생"],
    ],
  },
  {
    id: "miscible", label: "Miscible",
    purpose: "주입 가스·용매와 원유 사이의 계면을 없애 잔류 원유를 회수합니다.",
    principle: "충분한 압력(최소혼화압력, MMP 이상)에서 주입 유체가 원유와 섞여 하나의 상처럼 거동하며, 원유의 팽윤과 점도 감소도 일어납니다.",
    methods: [
      ["CO₂", "원유와 혼화되거나 원유를 팽윤시키고 점도를 낮춤"],
      ["N₂", "높은 압력에서 혼화 또는 비혼화 가스로 주입해 원유를 밀어내고 압력을 유지"],
      ["Miscible Solvent", "LPG 등 탄화수소 용매가 원유와 혼화"],
    ],
  },
];

function MobilityFig() {
  return (
    <svg viewBox="0 0 280 150" className={s.graph} role="img" aria-label="Water injection fingers through the oil; with polymer the front is more uniform">
      <text x="8" y="14" className={s.gTiny}>Water only</text>
      <rect x="8" y="20" width="264" height="48" className={s.eorOil} />
      <path d="M8,20 H60 C80,26 70,32 120,34 C80,38 90,44 70,48 C110,52 150,56 96,62 C60,64 50,68 8,68 Z" className={s.eorWater} />
      <text x="8" y="88" className={s.gTiny}>With polymer</text>
      <rect x="8" y="94" width="264" height="48" className={s.eorOil} />
      <path d="M8,94 H120 C128,106 124,130 120,142 H8 Z" className={s.eorPolymer} />
    </svg>
  );
}

function ChemicalFig() {
  return (
    <svg viewBox="0 0 280 150" className={s.graph} role="img" aria-label="A trapped oil droplet cannot pass a pore throat; with lower interfacial tension it deforms and passes">
      {[0, 140].map((ox) => (
        <g key={ox}>
          <path d={`M${ox + 8},40 H${ox + 54} Q${ox + 66},60 ${ox + 78},40 H${ox + 132} M${ox + 8},110 H${ox + 54} Q${ox + 66},90 ${ox + 78},110 H${ox + 132}`} className={s.throat} />
        </g>
      ))}
      <circle cx="44" cy="75" r="22" className={s.eorOilDrop} />
      <path d="M198,75 C190,64 204,66 218,71 C232,75 240,70 252,74 C240,80 232,76 218,80 C204,84 190,86 198,75 Z" className={s.eorOilDrop} />
      <text x="70" y="136" className={s.gTiny} textAnchor="middle">High IFT: trapped</text>
      <text x="210" y="136" className={s.gTiny} textAnchor="middle">Low IFT: deforms, passes</text>
    </svg>
  );
}

function ThermalFig() {
  return (
    <svg viewBox="0 0 280 150" className={s.graph} role="img" aria-label="Conceptual heavy-oil viscosity falls steeply as temperature rises">
      <path d="M30,10 V122 H272" className={s.gAxis} />
      <path d="M40,18 C60,80 90,104 140,112 S240,118 266,118" className={s.gCurve} />
      <text x="272" y="140" className={s.gAxisLabel} textAnchor="end">Temperature →</text>
      <text x="18" y="12" className={s.gAxisLabel} transform="rotate(-90 18 12)" textAnchor="end">Oil viscosity →</text>
      <text x="150" y="96" className={s.gTiny}>heating lowers viscosity</text>
    </svg>
  );
}

function MiscibleFig() {
  return (
    <svg viewBox="0 0 280 150" className={s.graph} role="img" aria-label="Injected gas mixes with oil in a miscible zone ahead of it, so no interface separates them">
      <defs>
        <linearGradient id="mis-grad" x1="0" x2="1"><stop offset="0" stopColor="#E8F0FB" /><stop offset="1" stopColor="#F29A1F" /></linearGradient>
      </defs>
      <rect x="8" y="46" width="90" height="56" className={s.eorGas} />
      <rect x="98" y="46" width="80" height="56" fill="url(#mis-grad)" />
      <rect x="178" y="46" width="94" height="56" className={s.eorOil} />
      <text x="53" y="38" className={s.gTiny} textAnchor="middle">Gas / solvent</text>
      <text x="138" y="38" className={s.gTiny} textAnchor="middle">Miscible zone</text>
      <text x="225" y="38" className={s.gTiny} textAnchor="middle">Oil</text>
      <text x="140" y="124" className={s.gTiny} textAnchor="middle">no interface — above MMP</text>
    </svg>
  );
}

const EOR_FIGS: Record<GroupId, () => ReactElement> = { mobility: MobilityFig, chemical: ChemicalFig, thermal: ThermalFig, miscible: MiscibleFig };

export function EorClassification() {
  const [open, setOpen] = useState<Set<GroupId>>(new Set(["mobility"]));
  const toggle = (id: GroupId) => setOpen((o) => { const n = new Set(o); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const all = open.size === GROUPS.length;
  return (
    <div className={s.eor}>
      <div className={s.eorHead}>
        <span className={s.kickerBlue}>EOR Classification</span>
        <button type="button" className={s.textBtn} onClick={() => setOpen(all ? new Set() : new Set(GROUPS.map((g) => g.id)))}>{all ? "Collapse all" : "Expand all"}</button>
      </div>
      <ul className={s.eorList}>
        {GROUPS.map((g, i) => {
          const on = open.has(g.id);
          const Fig = EOR_FIGS[g.id];
          return (
            <li key={g.id} className={s.eorItem} data-open={on || undefined}>
              <h4 className={s.eorTitleRow}>
                <button type="button" className={s.eorToggle} aria-expanded={on} aria-controls={`eor-${g.id}`} onClick={() => toggle(g.id)}>
                  <span className={s.eorNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={s.eorLabel}>{g.label}</span>
                  <span className={s.eorMethods}>{g.methods.map(([m]) => m).join(" · ")}</span>
                  <ChevronDown size={18} aria-hidden className={s.eorChevron} />
                </button>
              </h4>
              <div id={`eor-${g.id}`} className={s.eorBody} hidden={!on}>
                <figure className={s.figure}><Fig /></figure>
                <div>
                  <dl className={s.eorDefs}>
                    <div><dt>Purpose</dt><dd>{g.purpose}</dd></div>
                    <div><dt>Principle</dt><dd>{g.principle}</dd></div>
                  </dl>
                  <ul className={s.methodList}>
                    {g.methods.map(([m, d]) => <li key={m}><b>{m}</b><span>{d}</span></li>)}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <p className={s.note}>EOR 기술의 적용 가능성은 저류층(심도, 온도, 투과도, 불균질성)과 유체(점도, 조성) 조건에 따라 달라지며, 적용 전 실험과 시뮬레이션으로 검토합니다.</p>
    </div>
  );
}
