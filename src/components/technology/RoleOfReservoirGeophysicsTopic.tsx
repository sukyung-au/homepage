import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowLeft } from "lucide-react";
import { ArrowCTA } from "@/components/ds/ArrowCTA";
import { ImageSlot } from "@/components/ds/ImageSlot";
import { FieldSection, H, Rig, SeismicSurvey, VerticalWell, horizonPath, type Camera } from "@/components/home/FieldSection";
import fs from "@/components/home/FieldSection.module.css";
import { sceneStyles as ss } from "@/components/site/scene";
import { categoryHref, topicHref, topicLink, type FlatTopic } from "@/lib/technology";
import { sceneId } from "@/lib/stages";
import { RevealScope, ScrollHint } from "./RevealScope";
import { REVEAL_BOOT } from "./revealBoot";
import { Crumb, SectionHeading, topicStyles as t } from "./TopicParts";
import s from "./RoleOfReservoirEngineering.module.css";
import g from "./RoleOfReservoirGeophysics.module.css";

/**
 * Topic 1.1 — Role of Reservoir Geophysics. Same page structure, layout and scroll motion as topic 3.1
 * (shares RoleOfReservoirEngineering.module.css); only the workflow image cards have their own styles.
 *
 * Text is a qualitative draft (no field data, no values) to be checked against the course material.
 * Workflow photos are AI-generated illustrations produced by Codex — see docs/codex/TASK-geophysics-images.md.
 * Until a card's `src` is set, ImageSlot shows its art-direction placeholder.
 */

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/* ── 02 Across the field lifecycle ── */
const LIFECYCLE: { en: string; ko: string; items: string[]; key?: boolean }[] = [
  { en: "Exploration", ko: "탐사", items: ["지역 탄성파 자료 해석", "유망구조(prospect) 도출", "탐사정 위치 선정 지원"] },
  { en: "Post-Discovery Appraisal", ko: "발견 후 평가", items: ["3D 탄성파 해석", "시추공 자료와 탄성파 자료 연결(Well tie)", "저류층 분포와 범위 평가"] },
  { en: "FDP Preparation", ko: "FDP 작성", items: ["구조·단층 해석 결과 제공", "시간-심도 변환", "탄성파 속성·역산을 이용한 저류층 특성화", "정적 저류층 모델 입력 자료 작성"], key: true },
  { en: "Development Drilling", ko: "개발 시추", items: ["개발정 위치·궤적 선정 지원", "시추 결과를 반영한 해석 갱신"] },
  { en: "Production", ko: "생산", items: ["시간경과(4D) 탄성파 모니터링", "유체 이동과 미회수 구역 파악", "추가 시추 위치 검토 지원"] },
];

/* ── 03 From seismic signal to subsurface model ── */
interface Step { en: string; ko: string; body: string; items: string[]; img: { id: string; placeholder: string; src?: string; alt?: string } }
const WORKFLOW: Step[] = [
  {
    en: "Seismic Acquisition", ko: "탄성파 자료 취득",
    body: "음원에서 발생한 탄성파가 지층 경계에서 반사되어 돌아오는 신호를 수신기로 기록합니다.",
    items: ["해상: 탐사선이 음원과 스트리머를 예인", "목적에 맞는 2D·3D 탐사 설계"],
    img: { id: "gp-acquisition", placeholder: "Marine seismic vessel towing streamers at sea, aerial view", src: "/images/technology/geophysics/gp-acquisition.webp", alt: "스트리머를 예인하는 해상 탄성파 탐사선을 표현한 AI 생성 이미지" },
  },
  {
    en: "Processing & Imaging", ko: "자료처리와 영상화",
    body: "잡음을 줄이고 신호를 보정한 뒤, 반사 신호를 지하의 올바른 위치로 옮겨 지하 영상을 만듭니다.",
    items: ["잡음 제거와 신호 보정", "속도 분석", "구조보정(Migration)"],
    img: { id: "gp-seismic-section", placeholder: "Processed seismic section — layered reflections over a folded structure", src: "/images/technology/geophysics/gp-seismic-section.webp", alt: "지층 반사면이 배사 구조로 휘어진 탄성파 단면을 표현한 AI 생성 이미지" },
  },
  {
    en: "Seismic Interpretation", ko: "탄성파 해석",
    body: "반사면(horizon)과 단층을 추적해 지하 구조를 해석하고, 시추공 자료와 연결해 반사면의 지질학적 의미를 확인합니다.",
    items: ["합성 탄성파 기록을 이용한 Well tie", "Horizon·단층 해석", "시간 구조도 작성"],
    img: { id: "gp-interpretation", placeholder: "Interpreter at a workstation with a 3D seismic volume and picked horizons", src: "/images/technology/geophysics/gp-interpretation.webp", alt: "3D 탄성파 자료와 해석된 반사면을 보며 작업하는 해석 작업 화면을 표현한 AI 생성 이미지" },
  },
  {
    en: "Reservoir Characterization", ko: "저류층 특성화",
    body: "탄성파 속성과 역산 결과로 저류층의 분포와 특성을 추정하고, 시간 영역의 해석 결과를 심도 영역으로 변환합니다.",
    items: ["탄성파 속성 분석", "탄성파 역산(Inversion)", "시간-심도 변환과 심도 구조도"],
    img: { id: "gp-attribute-map", placeholder: "Map view of a seismic attribute over the reservoir, colour-ramped", src: "/images/technology/geophysics/gp-attribute-map.webp", alt: "저류층 위의 탄성파 속성 분포를 색으로 나타낸 평면도를 표현한 AI 생성 이미지" },
  },
];

/* ── 04 Key deliverables ── */
const DELIVERABLES: [string, string][] = [
  ["Structural Interpretation", "주요 반사면(horizon)과 단층 해석 결과, 트랩 구조의 형태와 폐합"],
  ["Time & Depth Structure Maps", "시간 구조도와 시간-심도 변환을 거친 심도 구조도"],
  ["Velocity Model", "시간 영역의 해석을 심도 영역으로 바꾸는 데 쓰이는 속도 모델"],
  ["Reservoir Distribution", "탄성파 속성·역산 결과를 이용한 저류층 분포와 특성 추정"],
  ["Gross Rock Volume Input", "구조와 유체 경계를 바탕으로 한 저류층 암석 부피 산정 자료"],
  ["Uncertainty Range", "해석과 심도 변환의 불확실성 범위, 구조 시나리오"],
  ["Well Placement Support", "개발정 위치·궤적 선정을 위한 구조 정보와 단층 등 시추 위험 요소"],
];

/* ── 05 From image to decision ── */
const CHAIN = ["Seismic Data", "Subsurface Image", "Reservoir Model", "Field Development Decisions"];
const DECISIONS = ["개발정 위치와 궤적", "저류층 범위와 부피 평가", "구조 불확실성 시나리오", "추가 탄성파 자료(3D·4D) 취득 필요성"];
const FDP_DISCIPLINES: [string, string, boolean?][] = [
  ["Geology", "지질"], ["Geophysics", "지구물리", true], ["Reservoir Engineering", "저류공학"], ["Drilling", "시추"],
  ["Production", "생산"], ["Facilities", "시설"], ["Economics", "경제성"],
];

const pad = (i: number) => String(i + 1).padStart(2, "0");
const v = (o: Record<string, number>) => o as CSSProperties;

function Bullets({ items, className }: { items: string[]; className?: string }) {
  return <ul className={cx(s.bullets, className)}>{items.map((x) => <li key={x}>{x}</li>)}</ul>;
}

/** Opening figure: the shared Journey field section with a seismic survey, interpreted horizons and a well tie. */
function OpeningFigure() {
  const cam: Camera = { x: 60, y: 20, w: 820, h: 470 };
  return (
    <figure className={s.openFigure} data-reveal="figure">
      <FieldSection
        camera={cam}
        label="Conceptual cross-section: a seismic vessel records reflections from layer boundaries, interpreted horizons outline the structure and a well ties the seismic to the rock"
        tags={[
          { x: 200, y: 66, label: "Seismic Survey", sub: "Source · streamer · receivers", seq: 1 },
          { x: 300, y: H.seal(300), label: "Reflections", sub: "Layer boundaries", side: "left", seq: 2 },
          { x: 720, y: H.resTop(720), label: "Interpreted Horizon", sub: "Top reservoir", side: "left", seq: 3 },
          { x: 520, y: 236, label: "Well Tie", sub: "Seismic ↔ rock", seq: 4 },
        ]}
      >
        <SeismicSurvey x={170} />
        <g className={g.interp} data-layer="interpretation" data-sequence="3">
          <path d={horizonPath(H.seal, 250, 860)} className={fs.line} />
          <path d={horizonPath(H.resTop, 250, 860)} className={fs.line} />
        </g>
        <g data-layer="well-tie" data-sequence="4">
          <Rig x={520} />
          <VerticalWell x={520} to={340} />
        </g>
      </FieldSection>
      <figcaption className={s.caption}>Conceptual illustration — not to scale.</figcaption>
    </figure>
  );
}

export function RoleOfReservoirGeophysicsTopic({ topic, next }: { topic: FlatTopic; prev?: FlatTopic; next?: FlatTopic }) {
  const cat = topic.category;
  const sameCat = next && next.category.id === cat.id;
  const nextHref = topicLink(next);
  return (
    <RevealScope className={s.motion}>
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
              저류층 지구물리는 탄성파 자료로 지하 구조와 저류층의 분포·특성을 영상화하고 해석하여, 시추공과 시추공 사이의 공간을 채우는 정보를 저류층 모델과 개발 계획에 제공하는 분야입니다.
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
            <SectionHeading num="02">From the First Survey to the Producing Field</SectionHeading>
            <p className={`${ss.body} ${s.headBody}`}>지구물리는 탐사 단계의 유망구조 도출부터 개발·생산 단계의 모니터링까지 참여하며, 새로운 시추 결과와 자료를 반영해 지하 해석을 계속 갱신합니다.</p>
          </div>
          <ol className={s.timeline} aria-label="Reservoir geophysics across the field lifecycle">
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
            <span className={s.feedbackLabel}>New wells → interpretation update</span>
          </div>
          <div className={s.update} data-reveal="up" style={v({ "--d": 1.6 })}>
            <span className={s.updateMark} aria-hidden>↻</span>
            <div>
              <h3 className={s.updateTitle}>Continuous Interpretation Update</h3>
              <p className={s.updateBody}>새로 시추한 정의 결과와 생산 중 취득한 자료는 구조 해석과 속도 모델, 저류층 분포 추정을 갱신하는 근거가 되고, 갱신된 해석은 다시 저류층 모델과 개발 계획에 반영됩니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Workflow */}
      <section className={t.section} data-section="workflow">
        <div className={t.inner}>
          <div className={s.head} data-reveal="up">
            <SectionHeading num="03">From Seismic Signal to Subsurface Model</SectionHeading>
            <p className={`${ss.body} ${s.headBody}`}>탄성파 자료는 취득, 자료처리, 해석, 저류층 특성화를 거치며 지하의 영상이 되고, 지질 해석과 결합해 정적 저류층 모델의 골격이 됩니다.</p>
          </div>
          <ol className={g.workflow} aria-label="Reservoir geophysics workflow">
            {WORKFLOW.map((st, i) => (
              <li key={st.en} className={g.card} data-step={pad(i)} data-reveal="up" style={v({ "--i": i })}>
                <div className={g.photo}>
                  <ImageSlot id={st.img.id} placeholder={st.img.placeholder} src={st.img.src} alt={st.img.alt} sizes="(max-width: 1100px) 100vw, 25vw" />
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
              <p className={g.outputBody}>지구물리 해석 결과는 지질 해석과 함께 정적 저류층 모델의 구조와 물성 분포를 이루고, 이 모델은 저류공학의 동적 모델과 생산 예측으로 이어집니다.</p>
            </div>
          </div>
          <p className={s.caption}>Photographs are AI-generated illustrations, not records of a specific survey or field.</p>
        </div>
      </section>

      {/* 04 — Key deliverables */}
      <section className={cx(t.section, t.white)} data-section="deliverables">
        <div className={t.inner}>
          <div className={s.head} data-reveal="up">
            <SectionHeading num="04">What Reservoir Geophysics Delivers</SectionHeading>
            <p className={`${ss.body} ${s.headBody}`}>지구물리 분석은 FDP 수립에 필요한 지하 구조와 저류층 분포에 관한 결과물을 제공합니다.</p>
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

      {/* 05 — From image to decision */}
      <section className={t.section} data-section="decision">
        <div className={t.inner}>
          <div className={s.head} data-reveal="up">
            <SectionHeading num="05">From Subsurface Image to Field Decisions</SectionHeading>
            <p className={`${ss.body} ${s.headBody}`}>지구물리 해석으로 얻은 지하 영상과 그 불확실성은 개발정 계획과 저류층 부피 평가, 개발 대안 비교의 기초가 됩니다.</p>
          </div>
          <ol className={s.chain} aria-label="From seismic data to field development decisions" data-reveal="chain">
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
              <p className={s.fdpBody}>FDP는 지질·지구물리·저류공학·시추·생산·시설·경제성 등 여러 분야의 평가 결과를 통합하는 과정입니다. 지구물리는 그중 지하 구조와 저류층 분포에 관한 공간적 근거를 제공합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className={t.next}>
        <div className={t.nextRow} data-reveal="up">
          <div className={s.backLinks}>
            {categoryHref(cat) !== topicHref(topic) && (
              <Link href={categoryHref(cat)} className={t.back}><ArrowLeft size={14} aria-hidden /> {cat.num} {cat.label} · Overview</Link>
            )}
            <Link href={`/#${sceneId("exploration")}`} className={t.back}><ArrowLeft size={14} aria-hidden /> Journey · 01 Exploration — Seismic</Link>
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
