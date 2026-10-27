import { ImageSlot } from "@/components/ds/ImageSlot";
import { Details } from "./Details";
import s from "./Fundamentals.module.css";
import a from "./LabAdditions.module.css";

/**
 * Additions to topic 3.2, moved here from topic 3.1 (they were its "Fluid Model" and "Rock–Fluid Properties"
 * sections). Only what the course-based sections did not already cover:
 * - 03 PVT: fluid sampling and how the PVT report becomes the fluid model (black-oil vs compositional).
 * - 05 Multiphase: saturation–height (FWL, OWC, transition zone) and how SCAL measures rock–fluid properties.
 * Qualitative text checked against the SLB Energy Glossary (docs/codex/CONTENT-re-fluids-scal.md); the chart is
 * conceptual (no values); lab photographs are AI-generated illustrations (public/images/technology/engineering).
 */

type Img = { id: string; placeholder: string; src: string; alt: string };
const IMAGES: Record<"pvtLab" | "corePlugs" | "coreflood", Img> = {
  pvtLab: { id: "re-pvt-lab", placeholder: "PVT laboratory — high-pressure visual cell with a reservoir fluid sample", src: "/images/technology/engineering/re-pvt-lab.webp", alt: "고압 가시 셀로 저류층 유체 시료를 분석하는 PVT 실험실을 표현한 AI 생성 이미지" },
  corePlugs: { id: "re-core-plugs", placeholder: "Cylindrical sandstone core plugs prepared for special core analysis", src: "/images/technology/engineering/re-core-plugs.webp", alt: "특수 코어 분석을 위해 준비된 원통형 사암 코어 플러그를 표현한 AI 생성 이미지" },
  coreflood: { id: "re-coreflood", placeholder: "Core-flooding apparatus — core holder, pumps and flow lines in a laboratory", src: "/images/technology/engineering/re-coreflood.webp", alt: "코어 홀더와 펌프, 배관으로 이루어진 코어 유동 실험 장치를 표현한 AI 생성 이미지" },
};

function Photo({ img, ratio = "4 / 3", sizes }: { img: Img; ratio?: string; sizes: string }) {
  return (
    <div className={a.photo} style={{ aspectRatio: ratio }}>
      <ImageSlot {...img} sizes={sizes} />
    </div>
  );
}

function List({ items }: { items: [string, string][] }) {
  return (
    <dl className={a.list}>
      {items.map(([t, d]) => (
        <div key={t}><dt>{t}</dt><dd>{d}</dd></div>
      ))}
    </dl>
  );
}

/* ───────────── 03 PVT: sampling → fluid model ───────────── */

const SAMPLES: [string, string][] = [
  ["Downhole Sample", "MDT·RCI 같은 지층 시험기로 저류층에서 직접 받은 시료입니다. 펌프 아웃으로 시추이수 오염이 줄어든 것을 확인한 뒤 채취합니다."],
  ["Surface Recombination", "지상 분리기의 오일과 가스를 각각 받아, 측정한 가스-오일 비율대로 실험실에서 다시 섞어 저류층 유체를 재현합니다."],
];

const KEY_PROPS: [string, string][] = [
  ["Bubble / Dew Point", "가스가 처음 빠져나오는(기포점) 또는 액체가 처음 맺히는(이슬점) 압력"],
  ["Formation Volume Factor (Bo · Bg)", "저류층 부피와 지상 부피의 비. 부존량을 지상 부피로 환산"],
  ["Solution Gas–Oil Ratio (Rs)", "저류층 오일에 녹아 있다가 지상에서 빠져나오는 가스의 양"],
  ["Viscosity (μ)", "유동도와 생산성, 주입수의 전진 거동에 영향"],
  ["Compressibility", "압력 변화에 따른 유체 부피 변화. 압력 거동 해석에 사용"],
];

const MODELS: [string, string[]][] = [
  ["Black-Oil Model", ["오일·가스·물의 세 상(phase)으로 단순화", "압력에 따른 Bo·Rs·점도 표로 유체를 표현", "조성 변화가 크지 않은 일반 오일·건가스에 적합"]],
  ["Compositional (EOS) Model", ["성분별 상거동을 상태방정식(EOS)으로 계산", "PVT 실험 결과에 맞춰 EOS를 보정(tuning)", "휘발성 오일, 가스 응축물, 가스 주입처럼 조성 변화가 중요할 때 사용"]],
];

export function PvtToFluidModel() {
  return (
    <div className={s.concepts}>
      <div>
        <h3 className={s.conceptTitle}>Fluid Sampling</h3>
        <Photo img={IMAGES.pvtLab} sizes="(max-width: 900px) 100vw, 45vw" />
        <p className={s.lead}>PVT 실험의 출발점은 저류층 유체를 대표하는 시료입니다. 시료가 저류층 상태를 잘 대표하지 못하면 이후의 모든 실험 결과가 달라집니다.</p>
        <Details summary="Downhole vs surface recombination samples">
          <List items={SAMPLES} />
        </Details>
      </div>
      <div>
        <h3 className={s.conceptTitle}>From PVT Report to Fluid Model</h3>
        <p className={s.lead}>실험 결과에서 얻은 물성으로 유체 모델을 만들고, 이 모델이 부존량 환산과 동적 시뮬레이션, 생산 설비 설계에 쓰입니다.</p>
        <List items={KEY_PROPS} />
        <Details summary="Black-oil vs compositional (EOS) model">
          <div className={a.models}>
            {MODELS.map(([t, items]) => (
              <div key={t}>
                <h4 className={a.h4}>{t}</h4>
                <ul className={a.bullets}>{items.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
        </Details>
      </div>
    </div>
  );
}

/* ───────────── 05 Multiphase: saturation–height ───────────── */

const PC_USES: [string, string][] = [
  ["Initial Saturation", "모세관압을 높이로 바꾼 포화도-높이 관계로 각 높이의 초기 수포화도를 정하고, 정적·동적 모델을 초기화합니다."],
  ["FWL, OWC & Transition Zone", "모세관압이 0인 자유수면(FWL) 위로 진입압만큼 올라간 곳에 OWC가 놓이고, 그 위로 수포화도가 서서히 줄어드는 전이대가 이어집니다. 투과도가 낮은 암석일수록 전이대가 두껍습니다."],
  ["Rock Typing & J-Function", "공극률·투과도가 다른 시료의 곡선을 J 함수로 정규화해 암석 유형별로 묶고 모델 전체에 적용합니다."],
  ["Seal Capacity", "덮개암 시료의 진입압은 덮개암이 지탱할 수 있는 탄화수소 기둥 높이를 가늠하는 근거가 됩니다."],
];
const PC_CURVES: [string, string][] = [
  ["Drainage", "비습윤상(오일·가스)이 물을 밀어내며 들어오는 과정. 탄화수소가 저류층을 채울 때와 같은 방향이라 초기 포화도 분포를 설명합니다."],
  ["Imbibition", "습윤상(물)이 다시 들어와 오일을 밀어내는 과정. 물 주입이나 수층 상승으로 생산할 때의 거동을 설명합니다."],
];
const PC_METHODS: [string, string][] = [
  ["Porous Plate", "다공판 위에서 압력을 단계적으로 높이며 평형 포화도를 측정합니다. 저류층 유체를 쓸 수 있지만 시간이 오래 걸립니다."],
  ["Centrifuge", "코어를 회전시켜 원심력으로 유체를 빼내며 측정합니다. 다공판보다 빠릅니다."],
  ["Mercury Injection (MICP)", "수은을 단계적으로 주입해 넓은 압력 범위의 곡선과 공극목 크기 분포를 빠르게 얻고, 실제 유체 조건으로 환산해 씁니다."],
];

/**
 * Conceptual drainage capillary pressure curve with its height equivalent (h = Pc / Δρg): FWL at Pc = 0,
 * OWC at the entry pressure, the transition zone above it and irreducible water further up; a dashed
 * imbibition curve reaching Pc = 0 at 1 − Sor. Shapes only, no values.
 */
function SaturationHeightChart() {
  const X0 = 64, X1 = 520, Y0 = 250, Y1 = 30;
  const swi = 0.18, sor = 0.26, pd = 0.12, lam = 1.6;
  const x = (sw: number) => X0 + sw * (X1 - X0);
  const y = (pc: number) => Y0 - pc * (Y0 - Y1);
  const drain = (sw: number) => pd * ((1 - swi) / (sw - swi)) ** (1 / lam);
  const imb = (sw: number) => 0.55 * pd * ((1 - sor - sw) / (1 - sor - swi)) ** 1.4 * ((1 - swi) / (sw - swi)) ** 0.5;
  const path = (fn: (sw: number) => number, from: number, to: number) =>
    Array.from({ length: 81 }, (_, i) => from + ((to - from) * i) / 80)
      .map((sw) => [sw, fn(sw)] as const)
      .filter(([, pc]) => pc <= 1.02)
      .map(([sw, pc], i) => `${i ? "L" : "M"}${x(sw).toFixed(1)},${y(Math.min(1, pc)).toFixed(1)}`).join(" ");
  const tzTop = drain(swi + 0.06);
  return (
    <figure className={s.figure}>
      <svg viewBox="0 0 600 300" className={s.graph} role="img" aria-label="Conceptual capillary pressure curve with height above the free water level: below the oil-water contact the rock is fully water-saturated, above it water saturation falls through the transition zone toward irreducible water saturation">
        <rect x={X0} y={y(tzTop)} width={X1 - X0} height={y(pd) - y(tzTop)} className={a.tz} />
        <path d={`M${X0},${Y1 - 10} V${Y0} H${X1 + 8}`} className={s.gAxis} />
        <path d={`M${X1 + 8},${Y1 - 10} V${Y0}`} className={s.gAxis} />
        <text x={X0 + 6} y={Y1 - 14} className={s.gAxisLabel}>Capillary pressure ↑</text>
        <text x={X1 + 2} y={Y1 - 14} textAnchor="end" className={s.gAxisLabel}>Height above FWL ↑</text>
        <text x={X1 + 8} y={Y0 + 40} textAnchor="end" className={s.gAxisLabel}>Water saturation, Sw →</text>
        <line x1={x(swi)} x2={x(swi)} y1={Y1} y2={Y0} className={s.gGuide} />
        <text x={x(swi)} y={Y0 + 16} textAnchor="middle" className={s.gNote}>Swi</text>
        <line x1={x(1 - sor)} x2={x(1 - sor)} y1={y(0.3)} y2={Y0} className={s.gGuide} />
        <text x={x(1 - sor)} y={Y0 + 16} textAnchor="middle" className={s.gNote}>1 − Sor</text>
        <text x={X1} y={Y0 + 16} textAnchor="middle" className={s.gNote}>1</text>
        <line x1={X0} x2={X1 + 8} y1={y(pd)} y2={y(pd)} className={a.level} />
        <text x={X1 + 14} y={y(pd) + 4} className={s.gNote}>OWC</text>
        <text x={X1 + 14} y={Y0 + 4} className={s.gNote}>FWL</text>
        <text x={X1 + 14} y={(y(pd) + y(tzTop)) / 2 - 2} className={s.gTiny}>Transition</text>
        <text x={X1 + 14} y={(y(pd) + y(tzTop)) / 2 + 12} className={s.gTiny}>zone</text>
        <text x={X1 - 6} y={(y(pd) + Y0) / 2 + 4} textAnchor="end" className={s.gTiny}>100% water</text>
        <text x={x(swi) + 14} y={Y1 + 14} className={s.gTiny}>Irreducible water</text>
        <path d={path(drain, swi + 0.004, 1)} className={a.drain} />
        <path d={`M${x(1)},${y(pd)} V${Y0}`} className={a.drainStep} />
        <path d={path(imb, swi + 0.035, 1 - sor)} className={a.imb} />
        <circle cx={x(1)} cy={y(pd)} r="4" className={a.pdPt} />
      </svg>
      <div className={s.legend}>
        <span><i className={a.lgDrain} />Drainage</span>
        <span><i className={a.lgImb} />Imbibition</span>
        <span><i className={a.lgTz} />Transition zone</span>
        <span><i className={a.lgPd} />Entry pressure</span>
      </div>
      <figcaption className={s.caption}>Conceptual curves · not measured data · height = Pc ÷ (Δρ · g)</figcaption>
    </figure>
  );
}

export function SaturationHeight() {
  return (
    <div className={a.block}>
      <div className={s.mainGrid}>
        <SaturationHeightChart />
        <div className={s.aside}>
          <h3 className={s.asideTitle}>Saturation–Height</h3>
          <p className={s.lead}>모세관압은 두 유체의 밀도 차에 의한 부력과 균형을 이룹니다. 그래서 모세관압 곡선은 자유수면(FWL) 위 높이에 따른 수포화도 분포로 바꿔 읽을 수 있습니다.</p>
          <p className={a.formula}>h = P<sub>c</sub> ⁄ (Δρ · g)</p>
          <List items={PC_USES} />
        </div>
      </div>
      <div className={a.detailsRow}>
        <Details summary="Drainage vs imbibition">
          <List items={PC_CURVES} />
        </Details>
        <Details summary="How capillary pressure is measured">
          <List items={PC_METHODS} />
        </Details>
      </div>
    </div>
  );
}

/* ───────────── 05 Multiphase: SCAL ───────────── */

const SCAL_MEASURES: [string, string][] = [
  ["Relative Permeability", "여러 유체가 함께 흐를 때 각 유체의 유동 능력. 주입수가 오일을 밀어내는 거동과 회수율을 좌우합니다."],
  ["Capillary Pressure", "포화도-높이 관계와 전이대, 초기 포화도 분포의 근거입니다."],
  ["Wettability", "암석 표면이 물과 오일 중 어느 쪽에 더 잘 젖는지. 상대투과도와 잔류 오일의 양에 영향을 줍니다."],
  ["Residual Saturations", "더 이상 밀려나지 않는 물(Swi)과 오일(Sor)의 양. 회수할 수 있는 오일의 한계를 정합니다."],
  ["Electrical Properties", "검층의 수포화도 계산(Archie 식)에 쓰이는 암석의 전기적 특성. 검층 해석을 보정합니다."],
];
const SCAL_METHODS: [string, string][] = [
  ["Steady-State", "두 유체를 일정한 비율로 함께 주입해 흐름이 안정되면 측정하고, 비율을 바꿔 가며 반복합니다."],
  ["Unsteady-State", "한 유체로 다른 유체를 밀어내는 과정의 생산량과 압력 변화를 해석합니다."],
  ["Centrifuge", "코어를 회전시켜 유체를 빼내며 모세관압과 끝점 포화도를 측정합니다."],
];

export function ScalLab() {
  return (
    <div className={a.block}>
      <div className={a.scalHead}>
        <h3 className={s.asideTitle}>Measuring Rock–Fluid Properties — SCAL</h3>
        <p className={s.lead}>특수 코어 분석(SCAL)은 일반 코어 분석이 측정하는 공극률·투과도에 더해, 암석 속에 여러 유체가 함께 있을 때의 거동을 측정합니다. 위의 상대투과도와 모세관압 곡선이 바로 이 실험에서 나옵니다.</p>
      </div>
      <div className={a.photos}>
        <figure className={s.figure}>
          <Photo img={IMAGES.corePlugs} sizes="(max-width: 900px) 100vw, 40vw" />
          <figcaption className={s.caption}>Core plugs prepared for SCAL</figcaption>
        </figure>
        <figure className={s.figure}>
          <Photo img={IMAGES.coreflood} ratio="16 / 9" sizes="(max-width: 900px) 100vw, 55vw" />
          <figcaption className={s.caption}>Core-flooding apparatus</figcaption>
        </figure>
      </div>
      <p className={s.caption}>Laboratory photographs are AI-generated illustrations, not records of a specific laboratory or sample.</p>
      <div className={a.detailsRow}>
        <Details summary="What SCAL measures">
          <List items={SCAL_MEASURES} />
        </Details>
        <Details summary="How relative permeability is measured">
          <List items={SCAL_METHODS} />
        </Details>
      </div>
    </div>
  );
}

/* ───────────── Sources for the added parts ───────────── */

const SOURCES: [string, string][] = [
  ["PVT", "https://glossary.slb.com/terms/p/pvt"],
  ["Bubblepoint", "https://glossary.slb.com/terms/b/bubblepoint"],
  ["Dewpoint", "https://glossary.slb.com/terms/d/dewpoint"],
  ["Oil formation volume factor", "https://glossary.slb.com/terms/o/oil_formation_volume_factor"],
  ["Solution gas", "https://glossary.slb.com/terms/s/solution_gas"],
  ["Equation of state", "https://glossary.slb.com/terms/e/equation_of_state"],
  ["Wireline formation tester", "https://glossary.slb.com/terms/w/wireline_formation_tester"],
  ["SCAL", "https://glossary.slb.com/terms/s/scal"],
  ["Routine core analysis", "https://glossary.slb.com/terms/r/routine_core_analysis"],
  ["Relative permeability", "https://glossary.slb.com/terms/r/relative_permeability"],
  ["Capillary pressure curve", "https://glossary.slb.com/terms/c/capillary_pressure_curve"],
  ["Drainage", "https://glossary.slb.com/terms/d/drainage"],
  ["Imbibition", "https://glossary.slb.com/terms/i/imbibition"],
  ["Wettability", "https://glossary.slb.com/terms/w/wettability"],
  ["Irreducible water", "https://glossary.slb.com/terms/i/irreducible_water"],
  ["Residual oil saturation", "https://glossary.slb.com/terms/r/residual_oil_saturation"],
  ["Oil-water contact", "https://glossary.slb.com/terms/o/oil-water_contact"],
];

/** 06 Drive Mechanisms additions: rock & fluid expansion, gravity drainage, compaction */
const DRIVE_SOURCES: [string, string][] = [
  ["SLB Oilfield Review · Defining Reservoir Drive Mechanisms", "https://www.slb.com/resource-library/oilfield-review/defining-series/defining-reservoir-drive-mechanisms"],
  ["SLB · Gravity drainage", "https://glossary.slb.com/en/terms/g/gravity_drainage"],
  ["SLB · Compaction", "https://glossary.slb.com/en/terms/c/compaction"],
  ["SPE PetroWiki · Compaction drive reservoirs", "https://onepetro.org/spe/general-information/1369/Compaction-drive-reservoirs"],
  ["ScienceDirect Topics · Drive Reservoir", "https://www.sciencedirect.com/topics/engineering/drive-reservoir"],
];

export function AddedSources() {
  return (
    <div className={a.sources}>
      <Details summary="Sources — sampling, fluid model, saturation–height, SCAL and added drive mechanisms">
        <p className={s.pSmall}>교육자료 외에 추가한 내용(시료 채취, 유체 모델 선택, 포화도-높이, SCAL)은 아래 SLB Energy Glossary 정의를 바탕으로 정리했습니다. 특정 유전의 실험 결과가 아닙니다.</p>
        <ul className={a.sourceList}>
          {SOURCES.map(([t, href]) => <li key={href}><a href={href} target="_blank" rel="noopener noreferrer">SLB · {t}</a></li>)}
        </ul>
        <p className={s.pSmall}>06의 암석·유체 팽창, 중력 배유, 압밀 구동은 아래 자료를 바탕으로 정성적으로 정리했습니다.</p>
        <ul className={a.sourceList}>
          {DRIVE_SOURCES.map(([t, href]) => <li key={href}><a href={href} target="_blank" rel="noopener noreferrer">{t}</a></li>)}
        </ul>
      </Details>
    </div>
  );
}
