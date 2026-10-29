import type { CSSProperties } from "react";
import { sceneStyles as ss } from "@/components/site/scene";
import type { FlatTopic } from "@/lib/technology";
import { RevealScope } from "../RevealScope";
import { REVEAL_BOOT } from "../revealBoot";
import { Crumb, TopicNext, topicStyles as t } from "../TopicParts";
import { Details } from "../fundamentals/Details";
import { SectionShell } from "../fundamentals/SectionShell";
import f from "../fundamentals/Fundamentals.module.css";
import r from "../RoleOfReservoirEngineering.module.css";
import { ConvolutionFigure, DepthTime, RayPaths, WaveTypes, WedgeFigure } from "./GpFigures";
import { PolarityExplorer } from "./PolarityExplorer";
import g from "./GpFund.module.css";

/**
 * Topic 1.2 — Fundamentals of Geophysics: the physics behind topic 1.1's workflow — survey methods, seismic waves,
 * impedance and reflection, the convolutional model, resolution and time-to-depth. Opening and motion follow
 * topic 3.1; numbered sections reuse topic 3.2's SectionShell and Details. Text is qualitative and follows SOURCES.
 */

const v = (o: Record<string, number>) => o as CSSProperties;

/* ── 02 Methods ── */
const METHODS: { name: string; ko: string; how: string; property: string; key?: boolean }[] = [
  { name: "Seismic", ko: "탄성파 탐사", key: true, how: "지표나 해상에서 인공 진원으로 탄성파를 보내고, 지층 경계에서 반사되어 돌아오는 신호를 수진기로 기록합니다.", property: "탄성파 속도와 밀도 — 음향 임피던스" },
  { name: "Gravity", ko: "중력 탐사", how: "지점마다 중력 가속도를 측정해 보정한 뒤, 기준값과의 차이(Bouguer·free-air 이상)를 지도로 만듭니다.", property: "암석의 밀도" },
  { name: "Magnetics", ko: "자력 탐사", how: "자력계로 지구 자기장의 세기를 측정합니다. 넓은 지역은 항공기로 측정하는 항공 자력 탐사로 조사합니다.", property: "암석에 포함된 자성 광물" },
  { name: "Electromagnetic", ko: "전자기 탐사", how: "자연적이거나 인공적으로 만든 전자기장을 측정해 지하의 전기적 성질 변화를 지도로 만듭니다.", property: "비저항 등 전기적 성질" },
];

/* ── 06 Resolution ── */
const RES_POINTS: [string, string][] = [
  ["Wavelength", "파장 λ = v / f · 속도가 빠르거나 주파수가 낮을수록 파장이 길어지고, 구분할 수 있는 지층의 두께도 커집니다."],
  ["Depth", "높은 주파수는 전파 시간이 길어질수록 더 많이 감쇠합니다. 그래서 깊은 곳일수록 자료의 주파수가 낮아지고 해상도가 떨어집니다."],
  ["Horizontal", "반사 에너지는 한 점이 아니라 프레넬 대(Fresnel zone)라는 면적에서 돌아옵니다. 이 면적보다 작은 구조는 수평으로 구분하기 어렵고, 마이그레이션으로 수평 해상도를 높입니다."],
];

const SOURCES: [string, string][] = [
  ["SLB Energy Glossary · Acoustic impedance", "https://glossary.slb.com/en/terms/a/acoustic_impedance"],
  ["SLB Energy Glossary · Reflection coefficient", "https://glossary.slb.com/en/terms/r/reflection_coefficient"],
  ["SLB Energy Glossary · P-wave", "https://glossary.slb.com/en/terms/p/p-wave"],
  ["SLB Energy Glossary · S-wave", "https://glossary.slb.com/en/terms/s/s-wave"],
  ["SLB Energy Glossary · Convolution", "https://glossary.slb.com/en/terms/c/convolution"],
  ["SLB Energy Glossary · Wavelet", "https://glossary.slb.com/en/terms/w/wavelet"],
  ["SLB Energy Glossary · Synthetic seismogram", "https://glossary.slb.com/en/terms/s/synthetic_seismogram"],
  ["SLB Energy Glossary · Fresnel zone", "https://glossary.slb.com/en/terms/f/fresnel_zone"],
  ["SLB Energy Glossary · Two-way traveltime", "https://glossary.slb.com/en/terms/t/two-way_traveltime"],
  ["SLB Energy Glossary · Depth conversion", "https://glossary.slb.com/en/terms/d/depth_conversion"],
  ["SLB Energy Glossary · Gravity survey", "https://glossary.slb.com/en/terms/g/gravity_survey"],
  ["SLB Energy Glossary · Magnetics", "https://glossary.slb.com/en/terms/m/magnetics"],
  ["SLB Energy Glossary · Electromagnetic method", "https://glossary.slb.com/en/terms/e/electromagnetic_method"],
  ["SEG Wiki · Seismic resolution: vertical and horizontal", "https://wiki.seg.org/wiki/Seismic_Resolution:_Vertical_and_Horizontal"],
  ["Geophysics (2010) · The wedge model revisited", "https://pubs.geoscienceworld.org/seg/geophysics/article/75/2/T15/308370/The-wedge-model-revisited-A-physical-modeling"],
];

export function GpFundamentalsTopic({ topic, prev, next }: { topic: FlatTopic; prev?: FlatTopic; next?: FlatTopic }) {
  const cat = topic.category;
  return (
    <RevealScope className={r.motion}>
      <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOT }} />

      {/* 01 — Opening */}
      <section className={t.intro} data-category={cat.id} data-topic={topic.id} data-section="opening">
        <Crumb topic={topic} />
        <div className={r.open}>
          <div className={r.openText}>
            <div className={ss.eyebrow} data-reveal="up" style={v({ "--i": 0 })}>
              <span>{cat.num}</span><span className={ss.eyebrowRule} /><span className={ss.eyebrowLabel}>{cat.label}</span>
              <span className={ss.eyebrowNum}>· {topic.num}</span>
            </div>
            <h1 className={r.h1} data-reveal="up" style={v({ "--i": 1 })}>{topic.title}</h1>
            {topic.sub && <p className={r.sub} data-reveal="up" style={v({ "--i": 2 })}>{topic.sub}</p>}
            <p className={`${ss.body} ${r.lede}`} data-reveal="up" style={v({ "--i": 3 })}>
              지구물리는 지하를 직접 보지 않고, 지표에서 측정한 물리량으로 그 아래를 추정합니다. 탄성파 탐사에서는 땅속으로 보낸 파동이 지층 경계에서 반사되어 돌아오는 시간과 세기를 기록합니다. 이 페이지는 Topic 1.1의 작업 흐름 뒤에 있는 물리 원리를 정리합니다.
            </p>
            <div className={t.meta} data-reveal="up" style={v({ "--i": 4 })}>
              <span>Topic {topic.num} of {cat.topics.length}</span>
              <span>{cat.label} · {cat.ko}</span>
            </div>
          </div>
          <figure className={r.openFigure} data-reveal="up" style={v({ "--i": 2 })}>
            <RayPaths />
            <figcaption className={r.caption}>Seismic reflection: source, layers, receivers and the recorded trace · conceptual, not to scale</figcaption>
          </figure>
        </div>
      </section>

      {/* 02 — Methods */}
      <SectionShell id="methods" num="02" white title="Four Ways to Sense the Subsurface"
        summary="지구물리 탐사는 측정하는 물리량에 따라 나뉩니다. 각 방법은 암석의 서로 다른 성질에 반응하므로, 무엇을 찾는지에 따라 방법을 고르거나 함께 씁니다.">
        <ul className={g.methods}>
          {METHODS.map(({ name, ko, how, property, key }, i) => (
            <li key={name} className={`${g.method} ${key ? g.methodKey : ""}`} data-reveal="up" style={v({ "--i": i })}>
              <h3 className={g.methodName}>{name}</h3>
              <span className={g.methodKo}>{ko}</span>
              <p className={g.methodBody}>{how}</p>
              <dl className={g.methodRow}><div><dt>Responds to</dt><dd>{property}</dd></div></dl>
            </li>
          ))}
        </ul>
        <div className={g.callout} data-reveal="up">
          <span className={g.calloutMark} aria-hidden>●</span>
          <p className={f.p}>저류층의 구조와 지층을 자세히 그리는 데에는 탄성파 탐사가 중심이 됩니다. 이 페이지의 나머지 부분은 탄성파 탐사의 원리를 다룹니다.</p>
        </div>
      </SectionShell>

      {/* 03 — Waves */}
      <SectionShell id="waves" num="03" title="Seismic Waves: P and S"
        summary="탄성파는 암석을 이루는 입자를 흔들며 전파됩니다. 입자가 움직이는 방향에 따라 P파와 S파로 나뉩니다.">
        <div className={g.split}>
          <figure className={g.fig} data-reveal="up">
            <WaveTypes />
            <figcaption className={g.caption}>Particle motion in P- and S-waves · conceptual</figcaption>
          </figure>
          <div className={g.text} data-reveal="up" style={v({ "--i": 1 })}>
            <p className={f.p}><b>P파</b>(압축파)는 입자가 파동의 진행 방향과 같은 방향으로 흔들리며 압축과 팽창을 반복합니다. 일반적인 탄성파 자료가 기록하는 것은 P파입니다.</p>
            <p className={f.p}><b>S파</b>(전단파)는 입자가 진행 방향에 수직으로 흔들립니다. 유체는 전단 변형에 저항하지 못하므로 S파는 유체를 통과하지 못합니다.</p>
            <p className={f.pSmall}>암석의 탄성파 속도는 암석의 종류뿐 아니라 공극과 그 안을 채운 유체에 따라서도 달라집니다.</p>
          </div>
        </div>
      </SectionShell>

      {/* 04 — Impedance */}
      <SectionShell id="impedance" num="04" white title="Acoustic Impedance & Reflection"
        summary="탄성파는 성질이 다른 두 지층의 경계에서 일부는 반사되고 일부는 투과합니다. 얼마나, 어떤 극성으로 반사될지는 두 지층의 음향 임피던스 차이로 정해집니다.">
        <div className={g.formulas} data-reveal="up">
          <div className={g.formula}>
            <span className={g.formulaEq}>Z = ρ · V</span>
            <span className={g.formulaKey}>음향 임피던스 = 밀도 × 탄성파 속도</span>
          </div>
          <div className={g.formula}>
            <span className={g.formulaEq}>R = (Z<sub>2</sub> − Z<sub>1</sub>) / (Z<sub>2</sub> + Z<sub>1</sub>)</span>
            <span className={g.formulaKey}>수직 입사 반사계수 — 반사파와 입사파 진폭의 비 · Z₁ 위 지층, Z₂ 아래 지층</span>
          </div>
        </div>
        <div data-reveal="up"><PolarityExplorer /></div>
      </SectionShell>

      {/* 05 — Convolution */}
      <SectionShell id="convolution" num="05" title="From Reflectivity to a Seismic Trace"
        summary="탄성파 트레이스는 경계마다의 반사계수 계열(reflectivity)에 웨이블릿을 합성곱(convolution)한 결과로 볼 수 있습니다. 이를 합성곱 모델이라고 합니다.">
        <figure className={`${g.fig} ${g.figNarrow}`} data-reveal="up">
          <ConvolutionFigure />
          <figcaption className={g.caption}>Impedance → reflection coefficients ✱ wavelet = trace · computed from normalized values, no units</figcaption>
        </figure>
        <div className={g.callout} data-reveal="up">
          <span className={g.calloutMark} aria-hidden>✱</span>
          <div className={g.text}>
            <p className={f.p}><b>웨이블릿</b>은 진폭, 주파수, 위상으로 표현되는 짧은 파형입니다. 경계가 가까이 붙어 있으면 각 경계의 웨이블릿이 겹쳐 트레이스에서는 하나의 파형처럼 보입니다.</p>
            <p className={f.p}>시추공의 음파·밀도 검층으로 반사계수를 구하고 웨이블릿과 합성곱하면 <b>합성 탄성파 기록(synthetic seismogram)</b>이 됩니다. Topic 1.1의 웰 타이(well tie)는 이 합성 기록을 실제 탄성파 자료와 맞추는 작업입니다.</p>
          </div>
        </div>
      </SectionShell>

      {/* 06 — Resolution */}
      <SectionShell id="resolution" num="06" white title="Resolution & Tuning"
        summary="탄성파 자료로 구분할 수 있는 지층의 두께에는 한계가 있습니다. 지층이 약 1/4 파장보다 얇아지면 윗면과 아랫면의 반사가 서로 간섭해 두께를 따로 읽기 어려워집니다.">
        <div className={g.split}>
          <figure className={g.fig} data-reveal="up">
            <WedgeFigure />
            <figcaption className={g.caption}>Wedge model · synthetic traces from normalized values, no units</figcaption>
          </figure>
          <div className={g.text} data-reveal="up" style={v({ "--i": 1 })}>
            <p className={f.p}>쐐기 모양 지층(wedge model)으로 이를 확인합니다. 지층이 두꺼울 때는 윗면과 아랫면의 반사가 따로 보이지만, 얇아지면 두 반사가 겹치면서 진폭이 커져 최대가 되었다가 다시 작아집니다.</p>
            <p className={f.p}>진폭이 최대가 되는 두께를 <b>튜닝 두께</b>라고 하며, 이보다 얇은 지층에서는 진폭에 두께의 영향이 섞입니다. 진폭을 해석할 때 이 효과를 함께 고려합니다.</p>
          </div>
        </div>
        <ul className={g.points}>
          {RES_POINTS.map(([k, d], i) => (
            <li key={k} data-reveal="up" style={v({ "--i": i })}><strong>{k}</strong><span>{d}</span></li>
          ))}
        </ul>
      </SectionShell>

      {/* 07 — Time to depth */}
      <SectionShell id="time-depth" num="07" title="Time, Not Depth"
        summary="탄성파 자료의 세로축은 깊이가 아니라 왕복 주시(two-way time)입니다. 파동이 반사면까지 내려갔다가 돌아오는 데 걸린 시간이므로, 깊이로 바꾸려면 속도를 알아야 합니다.">
        <div className={g.split}>
          <figure className={g.fig} data-reveal="up">
            <DepthTime />
            <figcaption className={g.caption}>The same layers in depth and in time · conceptual</figcaption>
          </figure>
          <div className={g.text} data-reveal="up" style={v({ "--i": 1 })}>
            <p className={f.p}>속도가 일정하다면 깊이와 왕복 주시는 <b>t = 2z / v</b>의 관계입니다. 실제 지하는 지층마다 속도가 달라, 같은 두께라도 빠른 지층은 시간 단면에서 얇게, 느린 지층은 두껍게 보입니다.</p>
            <p className={f.p}>그래서 시추공의 속도 자료와 탄성파 속도로 <b>속도 모델</b>을 만들어 시간 단면을 깊이로 변환합니다. Topic 1.1의 시간-심도 변환이 이 단계입니다.</p>
          </div>
        </div>
        <div className={g.more} data-reveal="up">
          <Details summary="Sources">
            <p className={f.pSmall}>이 페이지의 설명은 아래 자료의 정의와 원리를 바탕으로 정성적으로 정리했습니다. 그림은 정규화한 값으로 계산한 개념도이며 특정 지역의 자료가 아닙니다.</p>
            <ul className={g.sourceList}>
              {SOURCES.map(([label, href]) => <li key={href}><a href={href} target="_blank" rel="noopener noreferrer">{label}</a></li>)}
            </ul>
          </Details>
        </div>
      </SectionShell>

      <TopicNext topic={topic} prev={prev} next={next} />
    </RevealScope>
  );
}
