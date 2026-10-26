import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowLeft } from "lucide-react";
import { ArrowCTA } from "@/components/ds/ArrowCTA";
import { ImageSlot } from "@/components/ds/ImageSlot";
import { FieldSection, H, Rig, VerticalWell, type Camera } from "@/components/home/FieldSection";
import { sceneStyles as ss } from "@/components/site/scene";
import { categoryHref, topicLink, type FlatTopic } from "@/lib/technology";
import { sceneId } from "@/lib/stages";
import { RevealScope, ScrollHint } from "./RevealScope";
import { Crumb, SectionHeading, topicStyles as t } from "./TopicParts";
import s from "./RoleOfReservoirEngineering.module.css";
import g from "./RoleOfGeology.module.css";

/**
 * Topic 2.1 — Role of Geology. Qualitative synthesis of the references listed below;
 * no field measurements or numerical assumptions. See docs/codex/CONTENT-role-of-geology.md.
 * Figures are schematic, not a reconstruction of a particular reservoir.
 */

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/* ── 02 Across the field lifecycle ── */
const LIFECYCLE: { en: string; ko: string; items: string[]; key?: boolean }[] = [
  { en: "Exploration", ko: "탐사", items: ["분지와 퇴적환경 이해", "저류암·덮개암과 트랩 검토"] },
  { en: "Post-Discovery Appraisal", ko: "발견 후 평가", items: ["코어·검층 자료 해석", "시추공 간 지층 대비", "저류층 분포와 연속성 평가"] },
  { en: "FDP Preparation", ko: "FDP 작성", items: ["구조·층서 골격 통합", "퇴적상과 물성 분포 모델링", "지질 시나리오와 불확실성 정리"], key: true },
  { en: "Development Drilling", ko: "개발 시추", items: ["시추 목표 구간 선정 지원", "새 시추 자료와 지질 예측 비교"] },
  { en: "Production", ko: "생산", items: ["저류공학과 모델 정합성 검토", "저류층 연결성 해석 갱신", "후속 개발의 지질적 근거 제공"] },
];

/* ── 03 From observations to a static model ── */
const WORKFLOW = [
  {
    en: "Rock & Well Data", ko: "암석과 시추공 자료",
    body: "코어와 암편으로 암석을 관찰하고, 검층 자료와 함께 시추공에서 만난 지층의 특성을 해석합니다.",
    items: ["암상과 퇴적구조 관찰", "코어·검층 자료의 연계"],
  },
  {
    en: "Stratigraphic Framework", ko: "층서 골격과 지층 대비",
    body: "시추공 사이의 지층을 대비하고 지구물리의 구조 해석과 연결해, 저류층의 공간적 골격을 구성합니다.",
    items: ["지층 경계와 두께 해석", "구조·층서 자료 통합"],
  },
  {
    en: "Depositional Facies", ko: "퇴적환경과 퇴적상",
    body: "암석이 쌓인 환경을 해석하고, 퇴적상(facies)의 분포와 관계를 이용해 시추공 사이의 저류암을 추정합니다.",
    items: ["퇴적상 분포 모델링", "저류층의 연속성과 불균질성 검토"],
  },
  {
    en: "Property Distribution", ko: "저류층 물성 분포",
    body: "암석물리 평가 결과와 퇴적상 모델을 통합해 공극률·투과도 등의 공간 분포를 모델에 반영합니다.",
    items: ["자료의 해상도와 규모 차이 고려", "여러 지질 시나리오의 불확실성 비교"],
  },
];

/* ── 04 Petrophysics: how logs are acquired, what each log measures, how they are interpreted ── */
/** Codex-generated illustrations (docs/codex/TASK-geology-petrophysics-images.md). Placeholder until `src` is set. */
const PETRO_IMAGES = {
  toolstring: { id: "ge-log-toolstring", placeholder: "Wireline logging tool string lowered on a cable into a borehole through layered rock — cutaway illustration" } as { id: string; placeholder: string; src?: string; alt?: string },
  interpretation: { id: "ge-log-interpretation", placeholder: "Well log interpretation display — gamma ray, resistivity and density–neutron tracks beside an interpreted lithology and fluid column" } as { id: string; placeholder: string; src?: string; alt?: string },
};

const ACQUISITION: [string, string, string][] = [
  ["Wireline Logging", "와이어라인 검층", "시추를 마친 구간에 검층 장비를 케이블로 내렸다가 끌어올리면서 깊이에 따라 연속으로 측정합니다. 여러 장비를 연결한 툴 스트링으로 한 번에 여러 물성을 기록합니다."],
  ["Logging While Drilling", "시추 중 검층 (LWD)", "시추 장비의 하부 조립체에 센서를 달아 시추하는 동안 측정합니다. 시추이수가 지층에 스며들기 전의 상태를 기록하고, 결과를 실시간으로 시추 방향 결정에 활용합니다."],
];

const LOGS: { en: string; ko: string; principle: string; measures: string; use: string }[] = [
  { en: "Gamma Ray (GR)", ko: "자연 감마선", principle: "지층이 자연적으로 방출하는 감마선을 측정합니다. 점토 광물이 많은 셰일은 방사성 원소가 많아 값이 높게 나타납니다.", measures: "자연 방사능", use: "셰일·사암 구분, 셰일 부피 추정, 시추공 간 지층 대비" },
  { en: "Spontaneous Potential (SP)", ko: "자연 전위", principle: "시추이수와 지층수의 염분 차이로 생기는 자연 전위를 측정합니다. 투수성 지층에서 전위가 기준선에서 벗어납니다.", measures: "자연 전위 차", use: "투수층 구분, 지층수 비저항 추정 (수성 이수에서 측정)" },
  { en: "Resistivity", ko: "비저항 (Laterolog · Induction)", principle: "지층에 전류를 흘리거나(Laterolog) 유도 전류를 일으켜(Induction) 전기가 통하는 정도를 측정합니다. 염수는 전기가 잘 통하고 탄화수소는 거의 통하지 않습니다.", measures: "지층 비저항 (얕은·깊은 조사 깊이)", use: "탄화수소·물 구간 구분, 수포화도 계산, 이수 침입 확인" },
  { en: "Density", ko: "밀도 (감마-감마)", principle: "선원에서 쏜 감마선이 지층의 전자와 충돌해 산란·흡수되는 정도를 검출기로 측정합니다. 함께 측정하는 광전 흡수 지수(Pe)는 암석 종류를 반영합니다.", measures: "체적 밀도, 광전 흡수 지수", use: "밀도 공극률 계산, 암상 판별" },
  { en: "Neutron", ko: "중성자", principle: "선원에서 쏜 중성자가 지층의 수소 원자와 충돌해 감속되는 정도를 측정합니다. 공극 속 물과 오일의 수소량을 반영합니다.", measures: "수소 지수 (중성자 공극률)", use: "공극률 계산, 밀도 검층과 함께 가스 구간 판별" },
  { en: "Sonic", ko: "음파", principle: "송신기에서 낸 음파가 지층을 지나 수신기에 닿는 시간을 측정합니다. 공극이 많을수록 음파가 느리게 전달됩니다.", measures: "음파 전달 시간 (slowness)", use: "공극률 계산, 탄성파 자료와의 연결(Well tie), 암석 역학 물성" },
  { en: "Nuclear Magnetic Resonance (NMR)", ko: "핵자기공명", principle: "자기장 속에서 공극 유체에 든 수소 원자핵의 공명 신호가 사라지는 시간(이완 시간)을 측정합니다.", measures: "공극률, 공극 크기 분포", use: "암석 종류와 무관한 공극률, 유동 가능 유체와 구속수 구분, 투과도 추정" },
  { en: "Caliper", ko: "공경", principle: "기계식 팔이 시추공 벽에 닿아 시추공의 지름을 깊이별로 측정합니다.", measures: "시추공 지름", use: "공벽 붕괴 구간 확인, 다른 검층 자료의 품질 검토" },
];

const INTERPRET: [string, string, string][] = [
  ["Lithology & Shale Volume", "암상과 셰일 부피", "감마선·SP로 셰일과 저류암을 구분하고, 지층에 섞인 셰일의 양을 추정합니다."],
  ["Porosity", "공극률", "밀도·중성자·음파·NMR 자료로 공극률을 계산하고, 밀도와 중성자 곡선이 서로 반대로 벌어지는 구간에서 가스를 확인합니다."],
  ["Water Saturation", "수포화도", "깊은 조사 비저항과 공극률, 지층수 비저항을 Archie 식에 넣어 공극 중 물이 차지하는 비율을 계산합니다. 나머지가 탄화수소입니다."],
  ["Net Reservoir & Pay", "순저류층과 생산 대상 구간", "셰일 부피·공극률·수포화도 기준을 함께 적용해 저류층으로 볼 구간과 탄화수소를 생산할 구간을 정합니다."],
];

/* ── 05 MDT / RCI: formation pressure and fluid sampling by depth ── */
const FORMATION_TEST: { en: string; ko: string; body: string; items: string[] }[] = [
  {
    en: "Fluid Type by Depth", ko: "깊이별 유체 종류 확인",
    body: "여러 깊이에서 지층압을 측정해 깊이-압력 그래프를 그리면 구간마다 기울기, 즉 압력 구배가 달라집니다. 압력 구배는 유체의 밀도를 반영하므로 가스·오일·물 구간을 구분할 수 있습니다.",
    items: ["깊이별 지층압 측정", "압력 구배로 유체 밀도와 종류 판단", "공내 유체 분석(DFA)으로 유체 특성 보완"],
  },
  {
    en: "Fluid Contacts", ko: "유체 경계(Contact) 측정",
    body: "서로 다른 유체의 압력 구배선이 만나는 깊이에서 가스-오일 경계(GOC)와 오일-물 경계(OWC)를 추정합니다. 검층으로 해석한 경계와 비교해 탄화수소가 차 있는 구간의 범위를 정합니다.",
    items: ["구배선의 교점으로 GOC·OWC 추정", "검층 해석 결과와 비교", "탄화수소 구간 높이와 부피 평가의 입력"],
  },
  {
    en: "Mobility", ko: "유동도(Mobility) 확인",
    body: "프리테스트에서 소량의 유체를 뽑아 낸 뒤 압력이 떨어졌다가 회복되는 거동으로 유동도를 추정합니다. 유체가 지층에서 얼마나 쉽게 흐르는지 깊이별로 비교할 수 있습니다.",
    items: ["프리테스트의 압력 강하·회복 해석", "유동도 = 유효 투과도 ÷ 유체 점도", "흐름이 좋은 구간과 시료 채취 위치 선정"],
  },
  {
    en: "Fluid Sampling", ko: "유체 시료 취득",
    body: "프로브를 지층에 밀착시켜 유체를 펌핑하고, 시추이수 여과액에 의한 오염이 충분히 줄어든 것을 확인한 뒤 대표 시료를 시료통에 담아 지상으로 회수합니다.",
    items: ["펌프 아웃으로 오염 감소 확인", "깊이별 대표 유체 시료 채취", "실험실 PVT·조성 분석으로 연계"],
  },
];

/* ── 06 Key deliverables ── */
const DELIVERABLES: [string, string][] = [
  ["Structural & Stratigraphic Framework", "지구물리 해석과 시추공 지층 대비를 통합한 저류층 경계·두께·구조 골격"],
  ["Depositional & Facies Model", "퇴적환경 해석과 퇴적상 분포, 저류암의 연속성과 불균질성에 대한 지질적 설명"],
  ["Petrophysical Evaluation", "검층·코어 자료로 해석한 셰일 부피, 공극률, 수포화도와 순저류층·생산 대상 구간"],
  ["Reservoir Property Model", "코어·검층 평가와 퇴적상에 근거한 공극률·투과도 등 물성의 공간 분포"],
  ["Static Reservoir Model", "구조·층서·퇴적상·물성을 통합해 부피 평가와 동적 시뮬레이션에 전달하는 모델"],
  ["Fluid Contacts & Pressure Profile", "MDT·RCI 깊이별 압력 구배로 해석한 유체 경계(GOC·OWC)와 구간 간 압력 연결성"],
  ["Geological Scenarios", "자료가 부족한 구간의 대안적 지질 해석과 모델별 주요 가정·불확실성"],
  ["Well Planning Input", "저류층의 위치·두께·암상 예측과 시추 목표 구간 검토를 위한 지질 자료"],
];

/* ── 07 From geological understanding to decisions ── */
const CHAIN = ["Geological Evidence", "Static Reservoir Model", "Dynamic Simulation", "Field Development Decisions"];
const DECISIONS = ["개발정의 목표 저류층과 위치", "저류층 연결성과 구획화 검토", "부피 평가와 생산 예측의 입력 자료", "지질 시나리오별 개발 대안 비교"];
const FDP_DISCIPLINES: [string, string, boolean?][] = [
  ["Geology", "지질", true], ["Geophysics", "지구물리"], ["Reservoir Engineering", "저류공학"], ["Drilling", "시추"],
  ["Production", "생산"], ["Facilities", "시설"], ["Economics", "경제성"],
];
const REFERENCES = [
  { title: "GEUS · Petrophysical reservoir analysis", href: "https://eng.geus.dk/energy-resources/oil-and-gas/reservoir-characterisation/petrophysical-reservoir-analysis" },
  { title: "SLB · Facies modeling", href: "https://glossary.slb.com/terms/f/facies_modeling" },
  { title: "GEUS · Reservoir modelling", href: "https://eng.geus.dk/energy-resources/oil-and-gas/reservoir-characterisation/reservoir-modelling" },
  { title: "SLB · Reservoir characterization model", href: "https://glossary.slb.com/terms/r/reservoir_characterization_model" },
  { title: "SLB · Geological model based on sequence stratigraphy", href: "https://www.slb.com/resource-library/case-study-with-navigation/so/predict-reservoir-facies-kuwait-cs" },
  { title: "SLB · Wireline log", href: "https://glossary.slb.com/terms/w/wireline_log" },
  { title: "SLB · Gamma ray log", href: "https://glossary.slb.com/terms/g/gamma_ray_log" },
  { title: "SLB · Spontaneous potential", href: "https://glossary.slb.com/terms/s/spontaneous_potential" },
  { title: "SLB · Resistivity log", href: "https://glossary.slb.com/terms/r/resistivity_log" },
  { title: "SLB · Induction", href: "https://glossary.slb.com/terms/i/induction" },
  { title: "SLB · Gamma-gamma (density) log", href: "https://glossary.slb.com/terms/g/gamma-gamma_log" },
  { title: "SLB · Neutron log", href: "https://glossary.slb.com/terms/n/neutron_log" },
  { title: "SLB · Sonic log", href: "https://glossary.slb.com/terms/s/sonic_log" },
  { title: "SLB · Nuclear magnetic resonance", href: "https://glossary.slb.com/terms/n/nuclear_magnetic_resonance" },
  { title: "SLB · Caliper log", href: "https://glossary.slb.com/terms/c/caliper_log" },
  { title: "SLB · Archie equation", href: "https://glossary.slb.com/terms/a/archie_equation" },
  { title: "SLB · Water saturation", href: "https://glossary.slb.com/terms/w/water_saturation" },
  { title: "SLB · Wireline formation tester", href: "https://glossary.slb.com/terms/w/wireline_formation_tester" },
  { title: "SLB · Pressure gradient", href: "https://glossary.slb.com/terms/p/pressure_gradient" },
  { title: "SLB · Fluid contact", href: "https://glossary.slb.com/terms/f/fluid_contact" },
  { title: "SLB · Mobility", href: "https://glossary.slb.com/terms/m/mobility" },
];

const pad = (i: number) => String(i + 1).padStart(2, "0");
const v = (o: Record<string, number>) => o as CSSProperties;

function Bullets({ items, className }: { items: string[]; className?: string }) {
  return <ul className={cx(s.bullets, className)}>{items.map((x) => <li key={x}>{x}</li>)}</ul>;
}

/** Shared field section: geological context, observed wells and the reservoir interval. */
function OpeningFigure() {
  const cam: Camera = { x: 150, y: 0, w: 800, h: 520 };
  return (
    <figure className={s.openFigure} data-reveal="figure">
      <FieldSection
        camera={cam}
        label="지층과 덮개암, 저류암을 두 시추공과 함께 보여 주는 개념 단면도"
        tags={[
          { x: 330, y: H.seal(330), label: "Seal", sub: "덮개암", side: "left", seq: 1 },
          { x: 500, y: H.resTop(500) + 24, label: "Reservoir", sub: "저류암의 구조와 두께", seq: 2 },
          { x: 750, y: 260, label: "Well Data", sub: "코어 · 검층", side: "left", seq: 3 },
        ]}
      >
        <Rig x={400} /><VerticalWell x={400} to={430} />
        <Rig x={750} /><VerticalWell x={750} to={460} />
      </FieldSection>
      <figcaption className={s.caption}>Conceptual illustration — not to scale.</figcaption>
    </figure>
  );
}

/** Illustrative geometry only: the panels contain no measured logs or property values. */
function WorkflowFigure({ step }: { step: number }) {
  const labels = ["암석 시료와 검층 곡선의 개념도", "세 시추공 사이의 지층 대비 개념도", "저류암과 주변 퇴적상의 평면 분포 개념도", "모델 격자에 배정된 상대적 물성 분포 개념도"];
  return (
    <svg viewBox="0 0 320 240" role="img" aria-label={labels[step]} className={g.diagram}>
      {step === 0 && <>
        {[0, 1, 2, 3, 4].map(i => <rect key={i} x="60" y={58 + i * 29} width="48" height="28" rx="3" fill={["#9DAFC2", "#D8B57A", "#C8DBE8", "#D8B57A", "#9DAFC2"][i]} />)}
        <path d="M154 50V211M215 50V211M270 50V211" className={g.guide} />
        <path d="M181 53L170 67L192 80L168 95L176 109L195 123L174 138L190 152L168 169L189 183L179 207" className={g.trace} />
        <path d="M240 53C208 78 266 90 232 117S259 151 235 171S249 194 231 207" className={g.traceAlt} />
      </>}
      {step === 1 && <>
        <path d="M48 103L153 77L272 112V151L153 118L48 143Z" fill="#D8B57A" opacity=".65" />
        <path d="M48 75L153 55L272 84M48 103L153 77L272 112M48 143L153 118L272 151M48 181L153 161L272 190" className={g.trace} />
        {[48, 153, 272].map(x => <g key={x}><path d={`M${x} 48V207`} className={g.well} /><circle cx={x} cy="48" r="4" fill="#0B1A2C" /></g>)}
      </>}
      {step === 2 && <>
        <rect x="30" y="50" width="260" height="160" rx="4" fill="#C8DBE8" />
        <path d="M35 185C101 193 79 121 156 132S210 62 284 70" stroke="#9DAFC2" strokeWidth="55" fill="none" />
        <path d="M35 185C101 193 79 121 156 132S210 62 284 70" stroke="#D8B57A" strokeWidth="26" fill="none" />
        {[[80, 162], [161, 130], [245, 84]].map(([x,y]) => <circle key={x} cx={x} cy={y} r="5" fill="#0B1A2C" stroke="white" strokeWidth="2" />)}
      </>}
      {step === 3 && <>
        {Array.from({ length: 10 }, (_, x) => Array.from({ length: 6 }, (_, y) => {
          const colors = ["#DCE8F0", "#9AC8DF", "#5FAACD", "#177EA9", "#0A5CDB"];
          const index = Math.max(0, 4 - Math.floor(Math.abs(y - 2.5 + Math.sin(x * .7)) + Math.abs(x - 5) * .3));
          return <rect key={`${x}-${y}`} x={31+x*26} y={55+y*26} width="24" height="24" fill={colors[index]} />;
        }))}
      </>}
    </svg>
  );
}

/**
 * Conceptual pressure-depth plot beside a wellbore: test points on gas, oil and water gradient lines, the
 * contacts where the lines meet, and sample points. Axes carry no values; slopes are only relative
 * (gas steepest on a depth-down plot, water flattest).
 */
function PressureDepthFigure() {
  // depth (y, down) → pressure (x); one segment per fluid, meeting at the contacts
  const GOC = 132, OWC = 232;
  const P = (z: number) => (z <= GOC ? 150 + (z - 40) * 0.16 : z <= OWC ? 150 + (GOC - 40) * 0.16 + (z - GOC) * 0.62 : 150 + (GOC - 40) * 0.16 + (OWC - GOC) * 0.62 + (z - OWC) * 1.25);
  const line = (a: number, b: number) => `M${P(a).toFixed(1)},${a} L${P(b).toFixed(1)},${b}`;
  /** Faint straight continuation of a fluid's gradient line past its contact */
  const extend = (z0: number, z1: number, slope: number) => `M${P(z0).toFixed(1)},${z0} L${(P(z0) + (z1 - z0) * slope).toFixed(1)},${z1}`;
  const tests = { gas: [52, 80, 108], oil: [150, 178, 206], water: [252, 282, 312] };
  const samples = [178, 282];
  return (
    <figure className={g.ptFigure} data-reveal="up">
      <svg viewBox="0 0 440 370" role="img" aria-label="Conceptual pressure versus depth plot: formation-test points fall on separate gas, oil and water gradient lines, and the lines meet at the gas-oil and oil-water contacts" className={g.ptSvg}>
        {/* wellbore with fluid zones */}
        <rect x="34" y="34" width="44" height={GOC - 34} className={g.zGas} />
        <rect x="34" y={GOC} width="44" height={OWC - GOC} className={g.zOil} />
        <rect x="34" y={OWC} width="44" height={330 - OWC} className={g.zWater} />
        <line x1="56" y1="20" x2="56" y2="336" className={g.bore} />
        {[...tests.gas, ...tests.oil, ...tests.water].map((z) => <path key={z} d={`M56,${z} h10`} className={g.probe} />)}
        <text x="56" y="352" textAnchor="middle" className={g.ptLabel}>Well</text>

        {/* axes */}
        <path d="M120,26 V336 H424" className={g.ptAxis} />
        <text x="424" y="352" textAnchor="end" className={g.ptLabel}>Pressure →</text>
        <text x="112" y="30" textAnchor="end" className={g.ptLabel}>Depth ↓</text>

        {/* contacts */}
        {[[GOC, "GOC"], [OWC, "OWC"]].map(([z, l]) => (
          <g key={l as string}>
            <line x1="34" x2="424" y1={z} y2={z} className={g.contact} />
            <text x="420" y={(z as number) - 6} textAnchor="end" className={g.contactLabel}>{l}</text>
          </g>
        ))}

        {/* gradient lines (with faint continuations past the contacts) */}
        <path d={extend(GOC, GOC + 46, 0.16)} className={g.extGas} />
        <path d={extend(OWC, OWC + 40, 0.62)} className={g.extOil} />
        <path d={line(40, GOC)} className={g.gGas} />
        <path d={line(GOC, OWC)} className={g.gOil} />
        <path d={line(OWC, 330)} className={g.gWater} />

        {/* test points and samples */}
        {tests.gas.map((z) => <circle key={z} cx={P(z)} cy={z} r="4.5" className={g.ptGas} />)}
        {tests.oil.map((z) => <circle key={z} cx={P(z)} cy={z} r="4.5" className={g.ptOil} />)}
        {tests.water.map((z) => <circle key={z} cx={P(z)} cy={z} r="4.5" className={g.ptWater} />)}
        {samples.map((z) => <rect key={z} x={P(z) + 12} y={z - 5} width="10" height="10" transform={`rotate(45 ${P(z) + 17} ${z})`} className={g.sample} />)}

        <text x={P(70) + 12} y="70" className={g.ptLabel}>Gas gradient</text>
        <text x={P(170) + 14} y="168" className={g.ptLabel}>Oil gradient</text>
        <text x={P(300) - 10} y="322" textAnchor="end" className={g.ptLabel}>Water gradient</text>
      </svg>
      <div className={g.ptLegend}>
        <span><i className={g.lgPoint} />Pressure test</span>
        <span><i className={g.lgSample} />Fluid sample</span>
        <span><i className={g.lgContact} />Fluid contact</span>
      </div>
      <figcaption className={s.caption}>Conceptual illustration — relative slopes only, not measured data.</figcaption>
    </figure>
  );
}

export function RoleOfGeologyTopic({ topic, next }: { topic: FlatTopic; prev?: FlatTopic; next?: FlatTopic }) {
  const cat = topic.category;
  const sameCat = next && next.category.id === cat.id;
  const nextHref = topicLink(next);
  return (
    <RevealScope className={s.motion}>
      {/* 01 — Opening */}
      <section className={t.intro} data-category={cat.id} data-topic={topic.id} data-section="opening">
        <Crumb topic={topic} />
        <div className={s.open}>
          <div className={s.openText}>
            <div className={ss.eyebrow} data-reveal="up" style={v({ "--i": 0 })}>
              <span>{cat.num}</span><span className={ss.eyebrowRule} /><span className={ss.eyebrowLabel}>{cat.label}</span>
              <span className={ss.eyebrowNum}>· {topic.num}</span>
            </div>
            <h1 className={s.h1} data-reveal="up" style={v({ "--i": 1 })}>{topic.title}</h1>
            {topic.sub && <p className={s.sub} data-reveal="up" style={v({ "--i": 2 })}>{topic.sub}</p>}
            <p className={`${ss.body} ${s.lede}`} data-reveal="up" style={v({ "--i": 3 })}>
              지질은 암석과 지층에 남은 기록을 해석해 저류암이 어디에, 어떤 형태로 분포하는지 설명합니다. 코어·검층·탄성파 자료를 통합한 지질 모델은 저류층 평가와 개발 계획의 공간적 기반이 됩니다.
            </p>
            <div className={t.meta} data-reveal="up" style={v({ "--i": 4 })}>
              <span>Topic {topic.num} of {cat.topics.length}</span>
              <span>{cat.label} · {cat.ko}</span>
            </div>
          </div>
          <OpeningFigure />
        </div>
        <ScrollHint className={s.hint} />
      </section>

      {/* 02 — Across the field lifecycle */}
      <section className={cx(t.section, t.white)} data-section="lifecycle">
        <div className={t.inner}>
          <div className={s.head} data-reveal="up">
            <SectionHeading num="02">From Basin Understanding to Field Development</SectionHeading>
            <p className={`${ss.body} ${s.headBody}`}>탐사 단계에서 세운 지질 가설은 시추공 자료로 검토되고, 개발 과정에서 얻는 새로운 자료는 저류층 모델과 시추 계획에 반영됩니다.</p>
          </div>
          <ol className={s.timeline} aria-label="Geology across the field lifecycle">
            {LIFECYCLE.map((st, i) => (
              <li key={st.en} className={cx(s.stage, st.key && s.stageKey)} data-step={pad(i)} data-reveal="stage" style={v({ "--i": i })}>
                <span className={s.node} aria-hidden />
                <span className={s.stageNum}>{pad(i)}</span>
                <h3 className={s.stageTitle}>{st.en}</h3>
                <span className={s.stageKo}>{st.ko}</span>
                <Bullets items={st.items} />
              </li>
            ))}
          </ol>
          <div className={s.feedback} aria-hidden data-reveal="arc">
            <span className={s.feedbackArc} />
            <span className={s.feedbackLabel}>New observations → geological model update</span>
          </div>
          <div className={s.update} data-reveal="up" style={v({ "--d": 1.6 })}>
            <span className={s.updateMark} aria-hidden>↻</span>
            <div>
              <h3 className={s.updateTitle}>Continuous Geological Model Update</h3>
              <p className={s.updateBody}>새 시추공에서 확인된 지층과 물성을 기존 예측과 비교합니다. 저류공학의 동적 분석과 함께 모델의 일관성을 검토하고, 해석이 달라진 부분과 남은 불확실성을 갱신합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Workflow */}
      <section className={t.section} data-section="workflow">
        <div className={t.inner}>
          <div className={s.head} data-reveal="up">
            <SectionHeading num="03">From Rock Evidence to a Static Model</SectionHeading>
            <p className={`${ss.body} ${s.headBody}`}>시추공에서 직접 관찰한 자료와 지층의 공간적 관계를 연결합니다. 구조·층서 골격 위에 퇴적상과 물성을 배치해 저류층을 설명하는 정적 모델을 구성합니다.</p>
          </div>
          <ol className={g.workflow} aria-label="Geological interpretation and modeling workflow">
            {WORKFLOW.map((st, i) => (
              <li key={st.en} className={g.card} data-step={pad(i)} data-reveal="up" style={v({ "--i": i })}>
                <div className={g.photo}>
                  <WorkflowFigure step={i} />
                  <span className={g.photoNum}>{pad(i)}</span>
                </div>
                <h3 className={g.cardTitle}>{st.en}</h3>
                <span className={s.stageKo}>{st.ko}</span>
                <p className={g.cardBody}>{st.body}</p>
                <Bullets items={st.items} />
              </li>
            ))}
          </ol>
          <div className={g.output} data-reveal="up" style={v({ "--d": 1 })}>
            <span className={g.outputArrow} aria-hidden>→</span>
            <div>
              <h3 className={g.outputTitle}>Static Reservoir Model</h3>
              <p className={g.outputBody}>정적 모델은 지층의 형태와 암석 특성의 분포를 표현합니다. 저류공학은 이 모델을 바탕으로 유체·압력 자료를 통합하고 유동을 모사해 생산 거동과 개발 대안을 평가합니다.</p>
            </div>
          </div>
          <p className={s.caption}>Conceptual illustrations — not measured data. Colours distinguish rock types or relative property variation.</p>
        </div>
      </section>

      {/* 04 — Petrophysics */}
      <section className={cx(t.section, t.white)} data-section="petrophysics">
        <div className={t.inner}>
          <div className={s.head} data-reveal="up">
            <SectionHeading num="04">Petrophysics — Reading the Rock Through Logs</SectionHeading>
            <p className={`${ss.body} ${s.headBody}`}>검층은 시추공을 따라 암석과 유체의 물리적 성질을 연속으로 측정하는 작업입니다. 측정 원리가 서로 다른 검층을 함께 해석해 암상, 공극률, 유체의 종류와 양을 깊이별로 평가합니다.</p>
          </div>

          <div className={g.acq}>
            <div className={g.acqPhoto} data-reveal="up">
              <ImageSlot {...PETRO_IMAGES.toolstring} sizes="(max-width: 1100px) 100vw, 33vw" />
            </div>
            {ACQUISITION.map(([en, ko, body], i) => (
              <div key={en} className={g.acqCard} data-reveal="up" style={v({ "--i": i + 1 })}>
                <span className={s.delNum}>{pad(i)}</span>
                <h3 className={g.cardTitle}>{en}</h3>
                <span className={s.stageKo}>{ko}</span>
                <p className={g.cardBody}>{body}</p>
              </div>
            ))}
          </div>

          <h3 className={g.subHead} data-reveal="up">Logging Methods at a Glance</h3>
          <div className={g.logTableWrap} data-reveal="up">
            <table className={g.logTable}>
              <thead>
                <tr><th scope="col">Log</th><th scope="col">원리</th><th scope="col">측정</th><th scope="col">활용</th></tr>
              </thead>
              <tbody>
                {LOGS.map((l) => (
                  <tr key={l.en}>
                    <th scope="row"><span className={g.logName}>{l.en}</span><span className={g.logKo}>{l.ko}</span></th>
                    <td data-label="원리">{l.principle}</td>
                    <td data-label="측정" className={g.logMeasure}>{l.measures}</td>
                    <td data-label="활용">{l.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className={g.subHead} data-reveal="up">From Logs to Reservoir Properties</h3>
          <div className={g.interp}>
            <figure className={g.interpFigure} data-reveal="up">
              <div className={g.interpPhoto}>
                <ImageSlot {...PETRO_IMAGES.interpretation} sizes="(max-width: 1100px) 100vw, 55vw" />
              </div>
              <figcaption className={s.caption}>Illustrative log display — AI-generated, not data from a real well.</figcaption>
            </figure>
            <ol className={g.interpSteps}>
              {INTERPRET.map(([en, ko, body], i) => (
                <li key={en} data-reveal="up" style={v({ "--i": i })}>
                  <span className={s.delNum}>{pad(i)}</span>
                  <div>
                    <h4 className={g.cardTitle}>{en}</h4>
                    <span className={s.stageKo}>{ko}</span>
                    <p className={g.cardBody}>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className={g.output} data-reveal="up">
            <span className={g.outputArrow} aria-hidden>→</span>
            <div>
              <h3 className={g.outputTitle}>Into the Property Model</h3>
              <p className={g.outputBody}>검층 해석 결과는 코어 분석으로 보정한 뒤 시추공 위치의 물성 값이 됩니다. 이 값을 퇴적상 모델과 함께 시추공 사이로 분포시키면 정적 모델의 공극률·수포화도 분포가 만들어집니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — MDT / RCI */}
      <section className={t.section} data-section="formation-testing">
        <div className={t.inner}>
          <div className={s.head} data-reveal="up">
            <SectionHeading num="05">Reading Fluids by Depth — MDT / RCI</SectionHeading>
            <p className={`${ss.body} ${s.headBody}`}>MDT·RCI는 케이블(와이어라인)로 시추공에 내려 프로브를 지층에 밀착시키는 지층 시험 장비입니다. 원하는 깊이마다 지층압을 측정하고 유체를 흘려 보거나 시료를 채취해, 저류층의 유체 분포와 경계를 직접 확인합니다.</p>
          </div>
          <div className={g.pt}>
            <PressureDepthFigure />
            <ol className={g.ptList}>
              {FORMATION_TEST.map((it, i) => (
                <li key={it.en} data-reveal="up" style={v({ "--i": i })}>
                  <span className={s.delNum}>{pad(i)}</span>
                  <div>
                    <h3 className={g.cardTitle}>{it.en}</h3>
                    <span className={s.stageKo}>{it.ko}</span>
                    <p className={g.cardBody}>{it.body}</p>
                    <Bullets items={it.items} />
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className={g.output} data-reveal="up">
            <span className={g.outputArrow} aria-hidden>→</span>
            <div>
              <h3 className={g.outputTitle}>Into the Geological Model</h3>
              <p className={g.outputBody}>확인한 유체 경계는 정적 모델의 유체 분포와 부피 평가에 반영됩니다. 여러 시추공이나 구간의 압력 구배를 비교하면 저류층이 서로 연결되어 있는지, 단층 등으로 구획화되어 있는지를 검토하는 근거도 됩니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Key deliverables */}
      <section className={cx(t.section, t.white)} data-section="deliverables">
        <div className={t.inner}>
          <div className={s.head} data-reveal="up">
            <SectionHeading num="06">What Geology Delivers</SectionHeading>
            <p className={`${ss.body} ${s.headBody}`}>지질 해석은 관찰 자료와 모델 가정을 연결하고, FDP에 필요한 저류층의 공간적 설명과 불확실성을 제공합니다.</p>
          </div>
          <ol className={s.deliverables}>
            {DELIVERABLES.map(([en, ko], i) => (
              <li key={en} data-reveal="row" style={v({ "--i": i % 2 })}>
                <span className={s.delNum}>{pad(i)}</span>
                <div>
                  <h3 className={s.delTitle}>{en}</h3>
                  <p className={s.delBody}>{ko}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 07 — From geological understanding to decision */}
      <section className={t.section} data-section="decision">
        <div className={t.inner}>
          <div className={s.head} data-reveal="up">
            <SectionHeading num="07">From Geological Understanding to Field Decisions</SectionHeading>
            <p className={`${ss.body} ${s.headBody}`}>정적 모델과 대안적 지질 시나리오는 시추 목표 선정과 동적 시뮬레이션의 출발점입니다. 지질 해석의 불확실성은 개발 대안을 비교할 때 함께 검토합니다.</p>
          </div>
          <ol className={s.chain} aria-label="From geological evidence to field development decisions" data-reveal="chain">
            {CHAIN.map((c, i) => (
              <li key={c} className={i === CHAIN.length - 1 ? s.chainLast : undefined} style={v({ "--i": i })}>
                <span className={s.chainNum}>{pad(i)}</span>
                <span className={s.chainTitle}>{c}</span>
              </li>
            ))}
          </ol>
          <div className={s.decide} data-reveal="up">
            <div>
              <h3 className={s.decideTitle}>Decision examples</h3>
              <Bullets items={DECISIONS} className={s.decideList} />
            </div>
            <div className={s.fdp}>
              <h3 className={s.decideTitle}>The FDP integrates many disciplines</h3>
              <ul className={s.disc} aria-label="Disciplines integrated in the FDP">
                {FDP_DISCIPLINES.map(([en, ko, on], i) => (
                  <li key={en} className={on ? s.discOn : undefined} style={v({ "--i": i })}><span>{en}</span><span className={s.discKo}>{ko}</span></li>
                ))}
              </ul>
              <p className={s.fdpBody}>FDP는 지질·지구물리·저류공학·시추·생산·시설·경제성의 평가 결과를 통합합니다. 지질은 지구물리와 구조를 해석하고, 암석물리 평가와 함께 암석 특성을 모델에 반영하며, 저류공학에 정적 모델과 지질 시나리오를 전달합니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={cx(t.section, t.white)} data-section="references" aria-labelledby="geology-references">
        <div className={t.inner}>
          <h2 id="geology-references" className={s.decideTitle}>Sources &amp; Further Reading</h2>
          <p className={g.sourceNote}>공개 전문 자료를 바탕으로 정리한 개요입니다. 특정 유전의 해석이나 강의자료를 재현한 내용은 아닙니다.</p>
          <ul className={g.sources}>{REFERENCES.map(ref => <li key={ref.href}><a href={ref.href}>{ref.title}</a></li>)}</ul>
        </div>
      </section>

      {/* Closing */}
      <section className={t.next}>
        <div className={t.nextRow} data-reveal="up">
          <div className={s.backLinks}>
            <Link href={categoryHref(cat)} className={t.back}><ArrowLeft size={14} aria-hidden /> {cat.num} {cat.label} · Overview</Link>
            <Link href={`/#${sceneId("development")}`} className={t.back}><ArrowLeft size={14} aria-hidden /> Journey · 03 Development &amp; Drilling — FDP</Link>
          </div>
          {next && (
            <div className={t.nextBlock}>
              <div className={`${ss.eyebrow} ${t.nextEyebrow}`}>
                {sameCat ? `Next topic · ${next.num}` : `Next category · ${next.category.num} ${next.category.label}`}
              </div>
              <div className={t.nextTitle}>{next.title}</div>
              {next.sub && <p className={s.nextSub}>{next.sub}</p>}
              <ArrowCTA tone="blue" href={nextHref} title={nextHref ? undefined : "Coming soon"}>{nextHref ? "Continue reading" : "Coming soon"}</ArrowCTA>
            </div>
          )}
        </div>
      </section>
    </RevealScope>
  );
}
