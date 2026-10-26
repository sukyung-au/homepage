import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowLeft } from "lucide-react";
import { ArrowCTA } from "@/components/ds/ArrowCTA";
import { DeviatedWell, FieldSection, Platform, wellPoint, type Camera } from "@/components/home/FieldSection";
import { sceneStyles as ss } from "@/components/site/scene";
import { categoryHref, topicLink, type FlatTopic } from "@/lib/technology";
import { sceneId } from "@/lib/stages";
import { FluidModelSection, FluidsReferences, RelPermSection } from "./ReservoirFluidsSections";
import { RevealScope, ScrollHint } from "./RevealScope";
import { REVEAL_BOOT } from "./revealBoot";
import { Crumb, SectionHeading, topicStyles as t } from "./TopicParts";
import s from "./RoleOfReservoirEngineering.module.css";

/**
 * Topic 3.1 — Role of Reservoir Engineering. Text follows the internship course outline as provided; every
 * figure is a conceptual illustration (no field data, no values).
 *
 * Scroll motion: elements marked [data-reveal] play a short entrance once when they reach the viewport
 * (RevealScope + the motion rules in RoleOfReservoirEngineering.module.css). `--i` orders items inside a group,
 * `--d` sequences the dynamic-model diagram (in steps; collapsed to 0 when the layout stacks).
 *
 * Sections 04 Fluid Model (PVT) and 05 SCAL were added later from public glossary definitions; they live in
 * ReservoirFluidsSections.tsx with their own sources block at the end of the page.
 */

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/* ── 02 Across the field lifecycle ── */
const LIFECYCLE: { en: string; ko: string; items: string[]; key?: boolean }[] = [
  { en: "Post-Discovery Appraisal", ko: "탐사 후 평가", items: ["지질·유체·저류층 특성 분석", "초기 저류층 모델 작성"] },
  { en: "FDP Preparation", ko: "FDP 작성", items: ["동적 저류층 모델 구축", "History Matching", "생산정 위치, 주입 전략 등 개발전략 시뮬레이션"], key: true },
  { en: "Economics & Risk", ko: "경제성·위험 평가", items: ["생산 예측과 경제성 모델 결합", "개발 시나리오 비교", "민감도 분석"] },
  { en: "Development & Production", ko: "개발 및 생산", items: ["생산 모니터링", "동적자료 분석", "저류층 특성화", "생산 최적화", "모델 업데이트"] },
  { en: "Decommissioning", ko: "폐쇄", items: ["잔존 저류량 및 회수가능량 평가", "폐쇄 계획 수립 지원"] },
];

/* ── 03 Dynamic reservoir model ── */
const STATIC_DATA = ["지질 및 지구물리 해석 결과", "저류층 구조와 물성 분포"];
const DYNAMIC_DATA = ["압력 자료", "생산 자료", "유체 거동 관련 자료"];
const MODEL = ["저류층 구조와 유체 유동의 수치적 모사", "생산 및 압력 거동 예측"];
const MATCHING = ["실제 관측된 생산·압력 이력과 모델 결과 비교", "모델의 불확실한 변수 조정 및 정합성 개선"];
const SCENARIOS = ["생산정 수와 위치", "주입 전략", "생산량 예측", "불확실성 및 민감도 평가"];

/* ── 04 Key deliverables ── */
const DELIVERABLES: [string, string][] = [
  ["Reservoir Properties", "유체 특성, 저류층 압력, 저류층 크기 및 물성, 생산성 평가"],
  ["Dynamic Model & Simulation", "정합된 동적 저류층 모델 및 시뮬레이션 결과, 모델 가정과 불확실성 범위"],
  ["Production Profile", "유정 및 저류층별 시간에 따른 유·가스 생산량 예측"],
  ["Development Scenarios", "생산정 수와 위치, 운영 방법, 주입 전략, 인공채유 적용 등 개발 대안 비교"],
  ["In-Place Volumes & Reserves", "물질수지 분석과 저류층 시뮬레이션을 통한 초기 부존량 및 회수가능량·매장량 추정"],
  ["Data Acquisition Plan", "모델 신뢰도 향상을 위한 추가 자료 확보 및 후속 분석 계획"],
  ["Production Optimization", "생산 운영 중 발생 가능한 문제에 대한 대응, 모니터링 및 최적화 지침"],
  ["Fluid & Rock–Fluid Models", "PVT 실험에 맞춘 유체 모델과 SCAL 자료로 정한 상대투과도·모세관압 곡선"],
];

/* ── 05 From analysis to decision ── */
const CHAIN = ["Reservoir Understanding", "Production Forecast", "Development Scenarios", "Field Development Decisions"];
const DECISIONS = ["생산정 수와 위치", "생산 및 주입 전략", "예상 생산량", "개발 시나리오 비교", "경제성·위험 검토"];
const FDP_DISCIPLINES: [string, string, boolean?][] = [
  ["Geology", "지질"], ["Geophysics", "지구물리"], ["Reservoir Engineering", "저류공학", true], ["Drilling", "시추"],
  ["Production", "생산"], ["Facilities", "시설"], ["Economics", "경제성"],
];

const pad = (i: number) => String(i + 1).padStart(2, "0");
/** Custom properties for the motion stylesheet */
const v = (o: Record<string, number>) => o as CSSProperties;

function Bullets({ items, className }: { items: string[]; className?: string }) {
  return <ul className={cx(s.bullets, className)}>{items.map((x) => <li key={x}>{x}</li>)}</ul>;
}

/** Opening figure: the shared Journey field section, framed on the reservoir with a producer pair and an injector. */
function OpeningFigure() {
  const cam: Camera = { x: 300, y: 20, w: 640, h: 470 };
  const [px, py] = wellPoint(520, 590, 332, 0.82);
  const [ix, iy] = wellPoint(860, 800, 410, 0.7);
  const oil: [number, number, number][] = [[400, 350, 0], [440, 346, 0], [640, 350, 180], [690, 354, 180]];
  return (
    <figure className={s.openFigure} data-reveal="figure">
      <FieldSection
        camera={cam}
        label="Conceptual reservoir cross-section: production wells draw fluid from the reservoir while an injection well supports pressure"
        tags={[
          { x: px, y: py, label: "Production Well", sub: "Producer", seq: 1 },
          { x: ix, y: iy, label: "Injection Well", sub: "Injector", side: "left", seq: 2 },
          { x: 400, y: 350, label: "Fluid Flow", sub: "Toward the producers", minor: true, seq: 3 },
          { x: 330, y: 400, label: "Reservoir", sub: "Rock · fluids · pressure", minor: true, seq: 4 },
        ]}
      >
        <Platform x={520} />
        <DeviatedWell from={520} tx={470} ty={330} />
        <DeviatedWell from={520} tx={590} ty={332} />
        <DeviatedWell from={860} tx={800} ty={410} kind="injector" />
        <g className={s.flow} data-layer="fluid-flow">
          {/* pulse order follows the flow: outer chevron first, then the one nearer the producers */}
          {oil.map(([x, y, r], i) => <path key={x} d="M-7,-4 L0,0 L-7,4" transform={`translate(${x} ${y}) rotate(${r})`} style={v({ "--i": [0, 1, 1, 0][i] })} />)}
          {[[792, 418], [770, 426]].map(([x, y], i) => <path key={x} d="M-7,-4 L0,0 L-7,4" transform={`translate(${x} ${y}) rotate(200)`} className={s.inject} style={v({ "--i": i })} />)}
        </g>
      </FieldSection>
      <figcaption className={s.caption}>Conceptual illustration — not to scale.</figcaption>
    </figure>
  );
}

/** History matching sketch: observed points, the model before and after calibration. No values. */
function MatchGraph() {
  const obs: [number, number][] = [[34, 40], [62, 52], [92, 60], [124, 74], [152, 80], [184, 92], [214, 98], [246, 108], [276, 112]];
  return (
    <figure className={s.graph}>
      <svg viewBox="0 0 300 170" role="img" aria-label="Conceptual history match: model results before and after calibration compared with observed history">
        <line x1="20" y1="14" x2="20" y2="146" className={s.axis} />
        <line x1="20" y1="146" x2="292" y2="146" className={s.axis} />
        <text x="24" y="12" className={s.axisLabel}>Pressure / Rate</text>
        <text x="292" y="162" textAnchor="end" className={s.axisLabel}>Time</text>
        <path d="M24,36 C90,40 170,62 290,74" className={s.before} />
        <path d="M24,36 C80,48 170,92 290,114" className={s.after} />
        {obs.map(([x, y], i) => <circle key={x} cx={x} cy={y} r="3" className={s.obs} style={v({ "--i": i })} />)}
      </svg>
      <div className={s.legend}>
        <span><i className={s.lgObs} />Observed</span>
        <span><i className={s.lgBefore} />Model · before</span>
        <span><i className={s.lgAfter} />Model · matched</span>
      </div>
      <figcaption className={s.caption}>Conceptual illustration — not measured data.</figcaption>
    </figure>
  );
}

/** Arrow between two stages of the model diagram; `loop` adds the calibration return path. */
function FlowLink({ loop, d }: { loop?: boolean; d: number }) {
  return (
    <div className={cx(s.link, loop && s.linkLoop)} aria-hidden data-reveal="link" style={v({ "--d": d })}>
      <svg viewBox="0 0 60 120" preserveAspectRatio="none">
        <path d="M2,60 L54,60" className={s.linkLine} />
        <path d="M48,55 L56,60 L48,65" className={cx(s.linkLine, s.linkHead)} />
        {loop && (
          <>
            <path d="M56,40 C40,14 20,14 4,40" className={s.loopLine} />
            <path d="M3,32 L4,41 L12,37" className={cx(s.loopLine, s.loopHead)} />
          </>
        )}
      </svg>
    </div>
  );
}

export function RoleOfReservoirEngineeringTopic({ topic, next }: { topic: FlatTopic; prev?: FlatTopic; next?: FlatTopic }) {
  const cat = topic.category;
  const sameCat = next && next.category.id === cat.id;
  const nextHref = topicLink(next);
  return (
    <RevealScope className={s.motion}>
      {/* Before first paint: arm the entrance states (skipped for reduced motion; released if JS never loads) */}
      <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOT }} />
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
              저류공학은 저류층의 물성과 유체 거동을 분석하고, 생산량을 예측하며, 개발 전략 수립과 생산 최적화에 필요한 기술적 근거를 제공하는 분야입니다.
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
            <SectionHeading num="02">One Discipline. Across the Field Life.</SectionHeading>
            <p className={`${ss.body} ${s.headBody}`}>저류공학은 탐사 후 평가부터 개발, 생산, 폐쇄까지 여러 단계에 참여하며, 새로운 데이터를 반영해 저류층 모델과 개발 전략을 지속적으로 갱신합니다.</p>
          </div>
          <ol className={s.timeline} aria-label="Reservoir engineering across the field lifecycle">
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
            <span className={s.feedbackLabel}>Production data → model update</span>
          </div>
          <div className={s.update} data-reveal="up" style={v({ "--d": 1.6 })}>
            <span className={s.updateMark} aria-hidden>↻</span>
            <div>
              <h3 className={s.updateTitle}>Continuous Model Update</h3>
              <p className={s.updateBody}>개발·생산 단계의 모니터링과 동적자료 분석 결과는 저류층 모델 갱신으로 이어지고, 갱신된 모델은 다시 개발 전략과 생산 최적화에 반영됩니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Dynamic reservoir model */}
      <section className={t.section} data-section="dynamic-model">
        <div className={t.inner}>
          <div className={s.head} data-reveal="up">
            <SectionHeading num="03">Building a Dynamic Picture of the Reservoir</SectionHeading>
            <p className={`${ss.body} ${s.headBody}`}>정적·동적 자료를 통합해 저류층의 구조와 유체 거동을 모사하고, 관측된 생산·압력 이력과 모델 예측 결과를 비교하여 개발 시나리오를 평가합니다.</p>
          </div>
          <div className={s.model} aria-label="From static and dynamic data to development scenarios">
            <div className={s.inputs}>
              <div className={s.block} data-step="static" data-reveal="up" style={v({ "--d": 0 })}>
                <svg viewBox="0 0 80 28" className={s.glyph} aria-hidden>
                  <path d="M0,8 C20,4 40,3 80,9 M0,16 C24,11 46,10 80,17 M0,24 C26,19 50,18 80,25" />
                </svg>
                <h3 className={s.blockTitle}>Static Data</h3>
                <Bullets items={STATIC_DATA} />
              </div>
              <span className={s.plus} aria-hidden data-reveal="up" style={v({ "--d": 0.1 })}>+</span>
              <div className={s.block} data-step="dynamic" data-reveal="up" style={v({ "--d": 0.15 })}>
                <svg viewBox="0 0 80 28" className={s.glyph} aria-hidden>
                  <path d="M0,4 C18,6 30,14 44,18 C58,22 70,24 80,25" />
                </svg>
                <h3 className={s.blockTitle}>Dynamic Data</h3>
                <Bullets items={DYNAMIC_DATA} />
              </div>
            </div>
            <FlowLink d={0.4} />
            <div className={cx(s.block, s.core)} data-step="model" data-reveal="up" style={v({ "--d": 0.6 })}>
              <svg viewBox="0 0 120 52" className={s.grid} aria-hidden>
                <path d="M2,40 C30,14 90,14 118,40 L118,50 L2,50 Z" className={s.gridFill} />
                {[14, 26, 38, 50, 62, 74, 86, 98, 110].map((x) => <line key={x} x1={x} y1="8" x2={x} y2="50" />)}
                {[20, 32, 44].map((y) => <line key={y} x1="2" y1={y} x2="118" y2={y} />)}
              </svg>
              <h3 className={s.blockTitle}>Dynamic Reservoir Model</h3>
              <Bullets items={MODEL} />
            </div>
            <FlowLink loop d={0.95} />
            <div className={cx(s.block, s.match)} data-step="history-matching" data-reveal="up" style={v({ "--d": 1.15 })}>
              <h3 className={s.blockTitle}>History Matching</h3>
              <MatchGraph />
              <Bullets items={MATCHING} />
              <p className={s.loopNote}>↺ 정합 결과에 따라 모델 변수를 조정합니다.</p>
            </div>
            <FlowLink d={2.35} />
            <div className={cx(s.block, s.scen)} data-step="scenarios" data-reveal="up" style={v({ "--d": 2.55 })}>
              <svg viewBox="0 0 80 40" className={s.glyph} aria-hidden>
                <path d="M2,20 L28,20 M28,20 C44,20 50,6 78,6 M28,20 L78,20 M28,20 C44,20 50,34 78,34" />
                <circle cx="78" cy="6" r="2.5" /><circle cx="78" cy="20" r="2.5" /><circle cx="78" cy="34" r="2.5" />
              </svg>
              <h3 className={s.blockTitle}>Development Scenarios</h3>
              <Bullets items={SCENARIOS} />
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Fluid model (PVT) · 05 — Rock–fluid properties (SCAL) */}
      <FluidModelSection num="04" white />
      <RelPermSection num="05" />

      {/* 06 — Key deliverables */}
      <section className={cx(t.section, t.white)} data-section="deliverables">
        <div className={t.inner}>
          <div className={s.head} data-reveal="up">
            <SectionHeading num="06">What Reservoir Engineering Delivers</SectionHeading>
            <p className={`${ss.body} ${s.headBody}`}>저류공학 분석은 FDP 수립과 개발 의사결정에 필요한 기술적 결과물을 제공합니다.</p>
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

      {/* 07 — From analysis to decision */}
      <section className={t.section} data-section="decision">
        <div className={t.inner}>
          <div className={s.head} data-reveal="up">
            <SectionHeading num="07">From Reservoir Understanding to Field Decisions</SectionHeading>
            <p className={`${ss.body} ${s.headBody}`}>저류공학적 분석 결과는 다양한 개발 대안을 비교하고, 생산성과 경제성 및 불확실성을 고려한 개발 전략 수립에 활용됩니다.</p>
          </div>
          <ol className={s.chain} aria-label="From reservoir understanding to field development decisions" data-reveal="chain">
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
              <p className={s.fdpBody}>FDP는 지질·지구물리·저류공학·시추·생산·시설·경제성 등 여러 분야의 평가 결과를 통합하는 과정입니다. 저류공학은 그중 저류층 거동과 생산 예측에 관한 기술적 근거를 제공합니다.</p>
            </div>
          </div>
        </div>
      </section>

      <FluidsReferences white />

      {/* Closing — next topic and a way back to the Journey's FDP */}
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
