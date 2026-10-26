import type { CSSProperties } from "react";
import { ImageSlot } from "@/components/ds/ImageSlot";
import { sceneStyles as ss } from "@/components/site/scene";
import { SectionHeading, topicStyles as t } from "./TopicParts";
import s from "./RoleOfReservoirEngineering.module.css";
import f from "./ReservoirFluids.module.css";

/**
 * Topic 3.1 additions — the two property models the dynamic model needs beside the static model:
 * the fluid model (PVT analysis) and rock–fluid properties (SCAL: relative permeability, capillary pressure).
 * Qualitative text, definitions checked against the SLB Energy Glossary (see docs/codex/CONTENT-re-fluids-scal.md).
 * Both charts are conceptual SVGs with no values; lab photographs are Codex-generated illustrations
 * (docs/codex/TASK-re-fluids-scal-images.md) and show a placeholder until `src` is set.
 */

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");
const pad = (i: number) => String(i + 1).padStart(2, "0");
const v = (o: Record<string, number>) => o as CSSProperties;

type Img = { id: string; placeholder: string; src?: string; alt?: string };
const IMAGES: Record<"pvtLab" | "corePlugs" | "coreflood", Img> = {
  pvtLab: { id: "re-pvt-lab", placeholder: "PVT laboratory — high-pressure visual cell with a reservoir fluid sample", src: "/images/technology/engineering/re-pvt-lab.webp", alt: "고압 가시 셀로 저류층 유체 시료를 분석하는 PVT 실험실을 표현한 AI 생성 이미지" },
  corePlugs: { id: "re-core-plugs", placeholder: "Cylindrical sandstone core plugs prepared for special core analysis", src: "/images/technology/engineering/re-core-plugs.webp", alt: "특수 코어 분석을 위해 준비된 원통형 사암 코어 플러그를 표현한 AI 생성 이미지" },
  coreflood: { id: "re-coreflood", placeholder: "Core-flooding apparatus — core holder, pumps and flow lines in a laboratory", src: "/images/technology/engineering/re-coreflood.webp", alt: "코어 홀더와 펌프, 배관으로 이루어진 코어 유동 실험 장치를 표현한 AI 생성 이미지" },
};

function Bullets({ items }: { items: string[] }) {
  return <ul className={s.bullets}>{items.map((x) => <li key={x}>{x}</li>)}</ul>;
}

/* ───────────── Fluid model (PVT) ───────────── */

const PVT_TESTS: [string, string, string][] = [
  ["Sampling", "시료 채취", "MDT·RCI 같은 지층 시험기로 저류층에서 직접 받거나, 지상 분리기의 오일과 가스를 받아 저류층 조건의 비율로 재조합합니다."],
  ["Compositional Analysis", "조성 분석", "시료를 구성하는 탄화수소와 비탄화수소 성분의 비율을 분석합니다."],
  ["Constant Composition Expansion", "정조성 팽창 (CCE)", "시료의 양을 그대로 둔 채 압력을 낮추며 부피 변화를 측정해, 포화압(기포점·이슬점)과 압축률을 구합니다."],
  ["Differential Liberation", "차등 분리 (DL)", "압력을 단계적으로 낮출 때마다 빠져나온 가스를 제거하며, 저류층에서 오일의 부피·용해가스·밀도가 변하는 과정을 모사합니다."],
  ["Separator Test", "분리기 시험", "지상 분리기 조건을 거쳐 최종적으로 얻는 오일 부피와 가스량을 측정합니다."],
  ["Viscosity", "점도 측정", "압력에 따른 유체 점도를 측정합니다. 점도는 유체가 흐르는 속도를 좌우합니다."],
];

const PVT_PROPS: [string, string, string][] = [
  ["Bubble / Dew Point", "포화압", "가스가 처음 빠져나오는(기포점) 또는 액체가 처음 맺히는(이슬점) 압력"],
  ["Formation Volume Factor", "지층 부피 계수 (Bo · Bg)", "저류층 조건의 부피와 지상 조건 부피의 비. 부존량을 지상 부피로 환산할 때 사용"],
  ["Solution Gas–Oil Ratio", "용해가스비 (Rs)", "저류층 오일에 녹아 있다가 지상에서 빠져나오는 가스의 양"],
  ["Viscosity", "점도 (μ)", "유동도와 생산성, 주입수의 전진 거동에 영향"],
  ["Compressibility", "압축률", "압력 변화에 따른 유체 부피 변화. 압력 거동 해석에 사용"],
  ["Density & GOR", "밀도와 가스유비", "압력 구배 해석과 생산 중 가스유비 변화 예측에 사용"],
];

const FLUID_MODELS: [string, string, string[]][] = [
  ["Black-Oil Model", "블랙오일 모델", ["오일·가스·물의 세 상(phase)으로 단순화", "압력에 따른 Bo·Rs·점도 표로 유체를 표현", "조성 변화가 크지 않은 일반 오일·건가스에 적합"]],
  ["Compositional (EOS) Model", "조성 모델", ["성분별로 상거동을 계산하는 상태방정식(EOS) 사용", "PVT 실험 결과에 맞춰 EOS를 보정(tuning)", "휘발성 오일, 가스 응축물, 가스 주입처럼 조성 변화가 중요할 때 사용"]],
];

/** Conceptual P–T phase envelope: bubble-point and dew-point curves meeting at the critical point,
 *  an isothermal depletion path at reservoir temperature, and the separator at surface conditions. */
function PhaseEnvelope() {
  const env = "M70,236 C80,150 150,70 230,58 C300,48 352,92 372,236";
  return (
    <figure className={f.chart}>
      <svg viewBox="0 0 420 290" role="img" aria-label="Conceptual pressure–temperature phase diagram: the bubble-point and dew-point curves meet at the critical point; a reservoir oil drops in pressure at constant temperature until it reaches the bubble point and gas is released" className={f.svg}>
        <path d="M40,20 V250 H404" className={f.axis} />
        <text x="44" y="16" className={f.lbl}>Pressure ↑</text>
        <text x="404" y="268" textAnchor="end" className={f.lbl}>Temperature →</text>
        <path d={`${env} Z`} className={f.twoPhase} />
        <path d="M70,236 C80,150 150,70 230,58" className={f.bubble} />
        <path d="M230,58 C300,48 352,92 372,236" className={f.dew} />
        <text x="176" y="176" className={f.lblMuted}>Two-phase region</text>
        <text x="64" y="44" className={f.lblMuted}>Liquid</text>
        <text x="372" y="44" className={f.lblMuted} textAnchor="end">Gas</text>
        <circle cx="230" cy="58" r="4.5" className={f.crit} />
        <text x="238" y="44" className={f.lbl}>Critical point</text>
        {/* isothermal depletion at reservoir temperature */}
        <path d="M168,30 V150" className={f.path} />
        <path d="M163,140 L168,150 L173,140" className={f.path} />
        <circle cx="168" cy="30" r="4.5" className={f.res} />
        <text x="176" y="34" className={f.lbl}>Reservoir</text>
        {/* where the depletion path meets the bubble-point curve (y computed from the curve) */}
        <circle cx="168" cy="81.6" r="4" className={f.bp} />
        <text x="176" y="94" className={f.lbl}>Bubble point</text>
        {/* surface separator: low pressure and temperature, inside the two-phase region */}
        <circle cx="118" cy="226" r="4" className={f.sep} />
        <text x="126" y="222" className={f.lbl}>Separator</text>
      </svg>
      <div className={f.legend}>
        <span><i className={f.lgBubble} />Bubble-point curve</span>
        <span><i className={f.lgDew} />Dew-point curve</span>
        <span><i className={f.lgPath} />Pressure drop at reservoir temperature</span>
      </div>
      <figcaption className={s.caption}>Conceptual phase diagram of a reservoir oil — not measured data.</figcaption>
    </figure>
  );
}

export function FluidModelSection({ num, white }: { num: string; white?: boolean }) {
  return (
    <section className={cx(t.section, white && t.white)} data-section="fluid-model">
      <div className={t.inner}>
        <div className={s.head} data-reveal="up">
          <SectionHeading num={num}>Fluid Model — PVT Analysis</SectionHeading>
          <p className={`${ss.body} ${s.headBody}`}>PVT 분석은 저류층 유체가 압력·부피·온도에 따라 어떻게 변하는지 실험으로 측정하는 작업입니다. 그 결과로 만든 유체 모델은 부존량 환산, 동적 시뮬레이션, 생산 설비 설계의 기초가 됩니다.</p>
        </div>

        <div className={f.row}>
          <div className={f.photo} data-reveal="up">
            <ImageSlot {...IMAGES.pvtLab} sizes="(max-width: 1100px) 100vw, 40vw" />
          </div>
          <ol className={f.steps}>
            {PVT_TESTS.map(([en, ko, body], i) => (
              <li key={en} data-reveal="up" style={v({ "--i": i })}>
                <span className={s.delNum}>{pad(i)}</span>
                <div>
                  <h3 className={f.title}>{en}</h3>
                  <span className={s.stageKo}>{ko}</span>
                  <p className={f.body}>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className={f.row}>
          <div data-reveal="up"><PhaseEnvelope /></div>
          <div>
            <h3 className={f.subHead} data-reveal="up">Key Fluid Properties</h3>
            <dl className={f.props}>
              {PVT_PROPS.map(([en, ko, body], i) => (
                <div key={en} data-reveal="up" style={v({ "--i": i % 2 })}>
                  <dt><span className={f.title}>{en}</span><span className={s.stageKo}>{ko}</span></dt>
                  <dd className={f.body}>{body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <h3 className={f.subHead} data-reveal="up">Choosing the Fluid Model</h3>
        <div className={f.models}>
          {FLUID_MODELS.map(([en, ko, items], i) => (
            <div key={en} className={f.model} data-reveal="up" style={v({ "--i": i })}>
              <h4 className={f.title}>{en}</h4>
              <span className={s.stageKo}>{ko}</span>
              <Bullets items={items} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Rock–fluid properties (SCAL) ───────────── */

const SCAL_MEASURES: [string, string, string][] = [
  ["Relative Permeability", "상대투과도", "두 유체가 함께 흐를 때 각 유체가 흐를 수 있는 정도를 포화도에 따라 나타냅니다. 주입수가 오일을 밀어내는 거동과 회수율을 좌우합니다."],
  ["Capillary Pressure", "모세관압", "작은 공극에서 두 유체 사이에 생기는 압력 차입니다. 초기 포화도 분포와 유체 경계 위 전이대의 두께를 설명합니다. (아래 Capillary Pressure 참고)"],
  ["Wettability", "습윤성", "암석 표면이 물과 오일 중 어느 쪽에 더 잘 젖는지를 나타냅니다. 상대투과도와 잔류 오일의 양에 영향을 줍니다."],
  ["Residual Saturations", "잔류 포화도", "더 이상 밀려나지 않는 물(비환원 수포화도 Swi)과 오일(잔류 오일 포화도 Sor)의 양입니다. 회수할 수 있는 오일의 한계를 정합니다."],
  ["Electrical Properties", "전기적 물성", "검층의 수포화도 계산(Archie 식)에 쓰이는 암석의 전기적 특성을 측정해 검층 해석을 보정합니다."],
];

const SCAL_METHODS: [string, string][] = [
  ["Steady-State", "두 유체를 일정한 비율로 함께 주입해 흐름이 안정되면 측정하고, 비율을 바꿔 가며 반복합니다."],
  ["Unsteady-State", "한 유체로 다른 유체를 밀어내는 과정의 생산량과 압력 변화를 해석합니다."],
  ["Centrifuge", "코어를 회전시켜 유체를 빼내며 모세관압과 끝점 포화도를 측정합니다."],
];

/** Conceptual water–oil relative permeability curves between Swi and 1−Sor (Corey-type shapes, no values). */
function RelPermChart() {
  const X0 = 60, X1 = 400, Y0 = 250, Y1 = 30;
  const swi = 0.2, sor = 0.25, kroMax = 0.9, krwMax = 0.38;
  const x = (sw: number) => X0 + sw * (X1 - X0);
  const y = (k: number) => Y0 - k * (Y0 - Y1);
  const n = 40, a = swi, b = 1 - sor;
  const pts = (fn: (sw: number) => number) => Array.from({ length: n + 1 }, (_, i) => { const sw = a + ((b - a) * i) / n; return `${i ? "L" : "M"}${x(sw).toFixed(1)},${y(fn(sw)).toFixed(1)}`; }).join(" ");
  const kro = (sw: number) => kroMax * ((1 - sw - sor) / (1 - swi - sor)) ** 2;
  const krw = (sw: number) => krwMax * ((sw - swi) / (1 - swi - sor)) ** 2.5;
  return (
    <figure className={f.chart}>
      <svg viewBox="0 0 430 300" role="img" aria-label="Conceptual water–oil relative permeability curves: oil relative permeability falls and water relative permeability rises as water saturation increases from the irreducible water saturation to one minus the residual oil saturation" className={f.svg}>
        <rect x={x(a)} y={Y1} width={x(b) - x(a)} height={Y0 - Y1} className={f.mobile} />
        <path d={`M${X0},${Y1 - 10} V${Y0} H${X1 + 10}`} className={f.axis} />
        <text x={X0 + 4} y={Y1 - 14} className={f.lbl}>Relative permeability ↑</text>
        <text x={X1 + 10} y={Y0 + 40} textAnchor="end" className={f.lbl}>Water saturation, Sw →</text>
        {[[a, "Swi"], [b, "1 − Sor"]].map(([sw, l]) => (
          <g key={l as string}>
            <line x1={x(sw as number)} x2={x(sw as number)} y1={Y1} y2={Y0} className={f.end} />
            <text x={x(sw as number)} y={Y0 + 16} textAnchor="middle" className={f.lblStrong}>{l}</text>
          </g>
        ))}
        <path d={pts(kro)} className={f.kro} />
        <path d={pts(krw)} className={f.krw} />
        <circle cx={x(a)} cy={y(kroMax)} r="4" className={f.kroPt} />
        <circle cx={x(b)} cy={y(krwMax)} r="4" className={f.krwPt} />
        <text x={x(a) + 10} y={y(kroMax) + 4} className={f.lblStrong}>kro</text>
        <text x={x(b) - 10} y={y(krwMax) - 8} textAnchor="end" className={f.lblStrong}>krw</text>
        <text x={(x(a) + x(b)) / 2} y={Y1 + 16} textAnchor="middle" className={f.lblMuted}>Both fluids mobile</text>
      </svg>
      <figcaption className={s.caption}>Conceptual relative permeability curves — not measured data.</figcaption>
    </figure>
  );
}

/* ── Capillary pressure & saturation–height ── */

const PC_CURVES: [string, string, string][] = [
  ["Drainage", "배수", "비습윤상(오일·가스)이 물을 밀어내며 들어오는 과정입니다. 탄화수소가 이동해 저류층을 채울 때와 같은 방향이라 초기 포화도 분포를 설명합니다."],
  ["Imbibition", "흡입", "습윤상(물)이 다시 들어와 오일을 밀어내는 과정입니다. 물 주입이나 수층의 상승으로 생산할 때의 거동을 설명합니다."],
];
const PC_METHODS: [string, string][] = [
  ["Porous Plate", "다공판 위에 코어를 올리고 압력을 단계적으로 높이며 평형 포화도를 측정합니다. 저류층 유체를 쓸 수 있지만 시간이 오래 걸립니다."],
  ["Centrifuge", "코어를 회전시켜 원심력으로 유체를 빼내며 측정합니다. 다공판보다 빠릅니다."],
  ["Mercury Injection (MICP)", "수은을 단계적으로 주입해 넓은 압력 범위의 곡선과 공극목 크기 분포를 빠르게 얻습니다. 실제 유체 조건으로 환산해 사용합니다."],
];
const PC_USES: [string, string, string][] = [
  ["Initial Saturation", "초기 포화도 분포", "모세관압을 높이로 바꾼 포화도-높이 관계로 저류층 각 높이의 초기 수포화도를 정하고, 정적·동적 모델을 초기화합니다."],
  ["FWL, OWC & Transition Zone", "자유수면·유체 경계·전이대", "모세관압이 0인 자유수면(FWL) 위로 진입압만큼 올라간 곳에 OWC가 놓이고, 그 위로 수포화도가 서서히 줄어드는 전이대가 이어집니다. 투과도가 낮은 암석일수록 전이대가 두껍습니다."],
  ["Rock Typing & J-Function", "암석 유형과 J 함수", "공극률·투과도가 다른 시료의 곡선을 J 함수로 정규화해 암석 유형별로 묶고, 모델 전체에 적용합니다."],
  ["Seal Capacity", "덮개암 밀봉 능력", "덮개암 시료의 진입압은 덮개암이 지탱할 수 있는 탄화수소 기둥 높이를 가늠하는 근거가 됩니다."],
];

/**
 * Conceptual drainage capillary pressure curve with its height equivalent (h = Pc / Δρg): FWL at Pc = 0,
 * OWC at the entry pressure, the transition zone above it and irreducible water further up; a dashed
 * imbibition curve reaching Pc = 0 at 1 − Sor. Shapes only, no values.
 */
function CapPressureChart() {
  const X0 = 64, X1 = 352, Y0 = 268, Y1 = 34;
  const swi = 0.18, sor = 0.26, pd = 0.12, lam = 1.6;
  const x = (sw: number) => X0 + sw * (X1 - X0);
  const y = (pc: number) => Y0 - pc * (Y0 - Y1);
  const drain = (sw: number) => pd * ((1 - swi) / (sw - swi)) ** (1 / lam);
  const imb = (sw: number) => 0.55 * pd * ((1 - sor - sw) / (1 - sor - swi)) ** 1.4 * ((1 - swi) / (sw - swi)) ** 0.5;
  const path = (fn: (sw: number) => number, a: number, b: number) =>
    Array.from({ length: 61 }, (_, i) => a + ((b - a) * i) / 60)
      .map((sw) => [sw, Math.min(1, fn(sw))] as const)
      .filter(([, pc], i, arr) => pc < 1 || (i > 0 && arr[i - 1][1] < 1) || (i < arr.length - 1 && arr[i + 1][1] < 1))
      .map(([sw, pc], i) => `${i ? "L" : "M"}${x(sw).toFixed(1)},${y(pc).toFixed(1)}`).join(" ");
  // top of the transition zone: where the drainage curve is close to Swi
  const tzTop = drain(swi + 0.06);
  return (
    <figure className={f.chart}>
      <svg viewBox="0 0 440 310" role="img" aria-label="Conceptual capillary pressure curve with height above the free water level: below the oil-water contact the rock is fully water-saturated, above it water saturation falls through the transition zone toward irreducible water saturation" className={f.svg}>
        <rect x={X0} y={y(tzTop)} width={X1 - X0} height={y(pd) - y(tzTop)} className={f.tz} />
        <path d={`M${X0},${Y1 - 10} V${Y0} H${X1 + 8}`} className={f.axis} />
        <path d={`M${X1 + 8},${Y1 - 10} V${Y0}`} className={f.axis} />
        <text x={X0 + 4} y={Y1 - 14} className={f.lbl}>Capillary pressure ↑</text>
        <text x={X1 + 4} y={Y1 - 14} textAnchor="end" className={f.lbl}>Height above FWL ↑</text>
        <text x={X1 + 8} y={Y0 + 40} textAnchor="end" className={f.lbl}>Water saturation, Sw →</text>
        <line x1={x(swi)} x2={x(swi)} y1={Y1} y2={Y0} className={f.end} />
        <text x={x(swi)} y={Y0 + 16} textAnchor="middle" className={f.lblStrong}>Swi</text>
        <line x1={x(1 - sor)} x2={x(1 - sor)} y1={y(0.3)} y2={Y0} className={f.end} />
        <text x={x(1 - sor)} y={Y0 + 16} textAnchor="middle" className={f.lblStrong}>1 − Sor</text>
        <text x={X1} y={Y0 + 16} textAnchor="middle" className={f.lblStrong}>1</text>
        {/* levels */}
        <line x1={X0} x2={X1 + 8} y1={y(pd)} y2={y(pd)} className={f.level} />
        <text x={X1 + 14} y={y(pd) + 4} className={f.lblStrong}>OWC</text>
        <text x={X1 + 14} y={Y0 + 4} className={f.lblStrong}>FWL</text>
        <text x={X1 + 14} y={(y(pd) + y(tzTop)) / 2 + 4} className={f.lbl}>Transition</text>
        <text x={X1 + 14} y={(y(pd) + y(tzTop)) / 2 + 17} className={f.lbl}>zone</text>
        <text x={X1 - 6} y={(y(pd) + Y0) / 2 + 4} textAnchor="end" className={f.lblMuted}>100% water</text>
        <text x={x(swi) + 14} y={Y1 + 14} className={f.lblMuted}>Irreducible water</text>
        {/* curves */}
        <path d={path(drain, swi + 0.004, 1)} className={f.drain} />
        <path d={`M${x(1)},${y(pd)} V${Y0}`} className={f.drainStep} />
        <path d={path(imb, swi + 0.035, 1 - sor)} className={f.imb} />
        <circle cx={x(1)} cy={y(pd)} r="4" className={f.pdPt} />
      </svg>
      <div className={f.legend}>
        <span><i className={f.lgDrain} />Drainage</span>
        <span><i className={f.lgImb} />Imbibition</span>
        <span><i className={f.lgTz} />Transition zone</span>
        <span><i className={f.lgPd} />Entry pressure</span>
      </div>
      <figcaption className={s.caption}>Conceptual curves — not measured data. Height = Pc ÷ (Δρ · g).</figcaption>
    </figure>
  );
}

function CapillaryPressureBlock() {
  return (
    <div className={f.pcBlock}>
      <h3 className={f.subHead} data-reveal="up">Capillary Pressure &amp; Saturation–Height</h3>
      <div className={f.row}>
        <div data-reveal="up"><CapPressureChart /></div>
        <div>
          <p className={f.lead} data-reveal="up">모세관압은 작은 공극 속에서 맞닿은 두 유체 사이의 압력 차로, 비습윤상의 압력에서 습윤상의 압력을 뺀 값입니다. 계면장력이 크고 공극목이 작을수록 커집니다.</p>
          <div className={f.formulas} data-reveal="up">
            <div><span className={f.formula}>Pc = P<sub>nw</sub> − P<sub>w</sub> = 2σ cos θ ⁄ r</span><span className={f.formulaNote}>σ 계면장력 · θ 접촉각 · r 공극목 반경</span></div>
            <div><span className={f.formula}>h = Pc ⁄ (Δρ · g)</span><span className={f.formulaNote}>자유수면(FWL) 위 높이 · Δρ 두 유체의 밀도 차</span></div>
          </div>
          <div className={f.pair}>
            {PC_CURVES.map(([en, ko, body], i) => (
              <div key={en} data-reveal="up" style={v({ "--i": i })}>
                <h4 className={f.title}>{en}</h4>
                <span className={s.stageKo}>{ko}</span>
                <p className={f.body}>{body}</p>
              </div>
            ))}
          </div>
          <h4 className={f.miniHead} data-reveal="up">Measurement</h4>
          <ul className={f.methodList}>
            {PC_METHODS.map(([en, body], i) => (
              <li key={en} data-reveal="up" style={v({ "--i": i })}><b>{en}</b>{body}</li>
            ))}
          </ul>
        </div>
      </div>
      <ol className={f.uses}>
        {PC_USES.map(([en, ko, body], i) => (
          <li key={en} data-reveal="up" style={v({ "--i": i })}>
            <span className={s.delNum}>{pad(i)}</span>
            <div>
              <h4 className={f.title}>{en}</h4>
              <span className={s.stageKo}>{ko}</span>
              <p className={f.body}>{body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function RelPermSection({ num, white }: { num: string; white?: boolean }) {
  return (
    <section className={cx(t.section, white && t.white)} data-section="scal">
      <div className={t.inner}>
        <div className={s.head} data-reveal="up">
          <SectionHeading num={num}>Rock–Fluid Properties — SCAL &amp; Relative Permeability</SectionHeading>
          <p className={`${ss.body} ${s.headBody}`}>특수 코어 분석(SCAL)은 일반 코어 분석이 측정하는 공극률·투과도에 더해, 암석 속에 여러 유체가 함께 있을 때의 거동을 측정합니다. 이 자료가 있어야 동적 모델이 물이나 가스가 오일을 밀어내는 과정을 계산할 수 있습니다.</p>
        </div>

        <div className={f.row}>
          <div className={f.photo} data-reveal="up">
            <ImageSlot {...IMAGES.corePlugs} sizes="(max-width: 1100px) 100vw, 40vw" />
          </div>
          <ol className={f.steps}>
            {SCAL_MEASURES.map(([en, ko, body], i) => (
              <li key={en} data-reveal="up" style={v({ "--i": i })}>
                <span className={s.delNum}>{pad(i)}</span>
                <div>
                  <h3 className={f.title}>{en}</h3>
                  <span className={s.stageKo}>{ko}</span>
                  <p className={f.body}>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className={f.row}>
          <div data-reveal="up">
            <RelPermChart />
            <ul className={f.read}>
              <li><b>끝점</b> Swi에서는 오일만, 1 − Sor에서는 물만 흐릅니다. 두 끝점 사이가 실제로 밀어낼 수 있는 오일의 범위입니다.</li>
              <li><b>곡선 모양</b> 물이 늘수록 오일의 흐름은 줄고 물의 흐름은 늘어납니다. 곡선 모양에 따라 수분율이 오르는 시점이 달라집니다.</li>
              <li><b>습윤성</b> 두 곡선이 교차하는 위치로 암석이 물과 오일 중 어느 쪽에 잘 젖는지 가늠할 수 있습니다.</li>
            </ul>
          </div>
          <div>
            <div className={f.photoWide} data-reveal="up">
              <ImageSlot {...IMAGES.coreflood} sizes="(max-width: 1100px) 100vw, 45vw" />
            </div>
            <h3 className={f.subHead} data-reveal="up">How Relative Permeability Is Measured</h3>
            <ol className={f.methods}>
              {SCAL_METHODS.map(([en, body], i) => (
                <li key={en} data-reveal="up" style={v({ "--i": i })}>
                  <h4 className={f.title}>{en}</h4>
                  <p className={f.body}>{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <CapillaryPressureBlock />

        <div className={f.output} data-reveal="up">
          <span className={f.outputArrow} aria-hidden>→</span>
          <div>
            <h3 className={f.outputTitle}>Into the Dynamic Model</h3>
            <p className={f.outputBody}>정적 모델이 저류층의 형태와 물성을 정하고, 유체 모델(PVT)과 암석-유체 물성(SCAL)이 그 안에서 유체가 어떻게 변하고 흐르는지를 정합니다. 세 가지가 함께 들어가야 동적 모델이 생산과 압력 거동을 계산할 수 있습니다.</p>
          </div>
        </div>
        <p className={s.caption}>Laboratory photographs are AI-generated illustrations, not records of a specific laboratory or sample.</p>
      </div>
    </section>
  );
}

const FLUIDS_REFERENCES = [
  { title: "SLB · PVT", href: "https://glossary.slb.com/terms/p/pvt" },
  { title: "SLB · Constant composition expansion", href: "https://glossary.slb.com/terms/c/constant_composition_expansion" },
  { title: "SLB · Bubblepoint", href: "https://glossary.slb.com/terms/b/bubblepoint" },
  { title: "SLB · Dewpoint", href: "https://glossary.slb.com/terms/d/dewpoint" },
  { title: "SLB · Oil formation volume factor", href: "https://glossary.slb.com/terms/o/oil_formation_volume_factor" },
  { title: "SLB · Solution gas", href: "https://glossary.slb.com/terms/s/solution_gas" },
  { title: "SLB · Gas/oil ratio (GOR)", href: "https://glossary.slb.com/terms/g/gor" },
  { title: "SLB · Equation of state", href: "https://glossary.slb.com/terms/e/equation_of_state" },
  { title: "SLB · Viscosity", href: "https://glossary.slb.com/terms/v/viscosity" },
  { title: "SLB · SCAL", href: "https://glossary.slb.com/terms/s/scal" },
  { title: "SLB · Routine core analysis", href: "https://glossary.slb.com/terms/r/routine_core_analysis" },
  { title: "SLB · Relative permeability", href: "https://glossary.slb.com/terms/r/relative_permeability" },
  { title: "SLB · Capillary pressure curve", href: "https://glossary.slb.com/terms/c/capillary_pressure_curve" },
  { title: "SLB · Drainage", href: "https://glossary.slb.com/terms/d/drainage" },
  { title: "SLB · Imbibition", href: "https://glossary.slb.com/terms/i/imbibition" },
  { title: "SLB · Interfacial tension", href: "https://glossary.slb.com/terms/i/interfacial_tension" },
  { title: "SLB · Contact angle", href: "https://glossary.slb.com/terms/c/contact_angle" },
  { title: "SLB · Oil-water contact", href: "https://glossary.slb.com/terms/o/oil-water_contact" },
  { title: "SLB · Wettability", href: "https://glossary.slb.com/terms/w/wettability" },
  { title: "SLB · Irreducible water", href: "https://glossary.slb.com/terms/i/irreducible_water" },
  { title: "SLB · Residual oil saturation", href: "https://glossary.slb.com/terms/r/residual_oil_saturation" },
];

/** Sources for the Fluid Model and SCAL sections (the rest of topic 3.1 follows the course outline). */
export function FluidsReferences({ white }: { white?: boolean }) {
  return (
    <section className={cx(t.section, white && t.white)} data-section="references" aria-labelledby="re-references">
      <div className={t.inner}>
        <h2 id="re-references" className={s.decideTitle}>Sources &amp; Further Reading</h2>
        <p className={f.sourceNote}>Fluid Model과 SCAL 구간은 아래 공개 용어 정의를 바탕으로 정리한 개요입니다. 특정 유전의 실험 결과가 아닙니다.</p>
        <ul className={f.sources}>
          {FLUIDS_REFERENCES.map((r) => <li key={r.href}><a href={r.href} target="_blank" rel="noopener noreferrer">{r.title}</a></li>)}
        </ul>
      </div>
    </section>
  );
}
