import Image from "next/image";
import type { ReactNode } from "react";
import { sceneStyles as ss } from "@/components/site/scene";
import type { FlatTopic } from "@/lib/technology";
import { RunSimulator } from "./simulation/RunSimulator";
import { Figure, ForecastCases, FluidCurves, HistoryCases, StaticLayers } from "./simulation/SimFigures";
import { SimulatorSections } from "./simulation/SimulatorSections";
import s from "./simulation/Simulation.module.css";
import { Crumb, SectionHeading, TopicNext, topicStyles as t } from "./TopicParts";

/**
 * Topic 3.4 — Reservoir Simulation. Page structure and layout only: five steps, each with a short explanation
 * and a conceptual figure (simulation/SimFigures.tsx). Step 03 is interactive (simulation/RunSimulator.tsx:
 * time slider, play / pause / reset, pressure ↔ water saturation) on a conceptual model (conceptModel.ts) —
 * simplified relationships, not a simulator. The hero grid can reuse it later.
 * Sections 06–08 (simulation/SimulatorSections.tsx): principles, commercial simulators, open-source / Python simulators.
 */

/** Hero links to the sections after the five workflow steps */
const MORE: [string, string][] = [["principles", "Inside the Simulator"], ["commercial", "Commercial Simulators"], ["open-source", "Open Source & Python"]];

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

interface Step {
  id: string;
  title: string;
  label: string;
  body: string;
  terms: [string, string][];
  figure: ReactNode;
}

const STEPS: Step[] = [
  {
    id: "static-model",
    title: "Build the Reservoir",
    label: "Static Model",
    body: "저류층을 3차원 격자(셀)로 나누고, 각 셀에 공극률·투과도·포화도 등 암석과 유체의 물성을 부여해 정적 모델을 만듭니다.",
    terms: [
      ["Reservoir Grid", "저류층을 작은 셀로 나누어 구조와 물성 분포를 표현"],
      ["Porosity", "공극률 — 암석 부피 중 유체가 차지할 수 있는 공간의 비율"],
      ["Permeability", "투과도 — 유체가 암석을 통과해 흐를 수 있는 정도"],
      ["Saturation", "포화도 — 공극을 채운 각 유체(오일·가스·물)의 비율"],
    ],
    figure: <StaticLayers />,
  },
  {
    id: "dynamic-model",
    title: "Define Fluid Behavior",
    label: "Dynamic Model",
    body: "여러 유체가 함께 흐를 때의 거동과, 압력 변화에 따른 유체와 암석의 특성 변화를 정의합니다.",
    terms: [
      ["Relative Permeability", "상대투과도 — 여러 유체가 함께 흐를 때 각 유체의 흐름 능력을 포화도의 함수로 표현"],
      ["PVT", "압력·부피·온도에 따른 유체 특성(체적계수, 점성도 등)의 변화"],
      ["Rock Compressibility", "암석 압축률 — 압력 변화에 따른 공극 부피의 변화"],
    ],
    figure: <FluidCurves />,
  },
  {
    id: "run",
    title: "Run the Simulation",
    label: "Initialization · Well Schedule · Time Steps",
    body: "초기 상태를 설정하고 유정 운영 일정을 입력한 뒤, 시간 단계마다 각 셀의 압력과 포화도 변화를 계산합니다.",
    terms: [
      ["Initialization", "초기 압력과 유체 분포(유체 접촉면 등) 설정"],
      ["Well Schedule", "유정별 생산·주입 시점과 운영 조건 입력"],
      ["Pressure & Saturation", "시간에 따른 압력 및 포화도 변화 계산"],
    ],
    figure: <RunSimulator />,
  },
  {
    id: "history-matching",
    title: "Match the Past",
    label: "History Matching",
    body: "계산된 생산량과 압력을 실제 생산이력과 비교하고, 불확실한 변수를 조정해 모델이 과거 거동을 재현하도록 보정합니다.",
    terms: [
      ["Compare", "실제 생산이력과 계산 결과 비교"],
      ["Calibrate", "모델 보정 및 Case 비교"],
    ],
    figure: <HistoryCases />,
  },
  {
    id: "forecast",
    title: "Explore the Future",
    label: "Forecast",
    body: "보정된 모델로 향후 생산 거동을 예측하고, 개발 대안별 결과를 비교합니다.",
    terms: [
      ["Base Case", "현재 운영 조건을 유지할 때의 예측"],
      ["New Production Wells", "신규 생산정을 시추하는 경우의 예측"],
      ["Water Injection", "물 주입 시나리오별 결과 비교"],
    ],
    figure: <ForecastCases />,
  },
];

const pad = (i: number) => String(i + 1).padStart(2, "0");

/** Hero concept: fluid flow & pressure → production forecast → development planning (three line drawings, one style) */
const CONCEPT: [string, ReactNode][] = [
  ["유체 흐름·압력 변화", (
    <g key="flow">
      <path d="M6 22C34 16 70 18 114 24V36C70 30 34 30 6 36Z" className={s.cSand} />
      <path d="M6 36C34 30 70 30 114 36V56C70 50 34 50 6 56Z" className={s.cRes} />
      <path d="M6 56C34 50 70 50 114 56V74H6Z" className={s.cBase} />
      <path d="M18 46C30 41 42 49 54 44M64 45C76 40 86 47 96 43" className={s.cFlow} />
      <path d="M50 41.5l4 2.5-3.5 3M92 40.5l4 2.5-3.5 3" className={s.cFlow} />
      <path d="M104 6V47" className={s.cWell} />
      <circle cx="104" cy="47" r="2.6" className={s.cDot} />
    </g>
  )],
  ["생산량 예측", (
    <g key="rate">
      <path d="M14 8V70H114" className={s.cAxis} />
      <path d="M18 14C26 34 40 50 62 57S100 64 112 65V70H18Z" className={s.cArea} />
      <path d="M18 14C26 34 40 50 62 57S100 64 112 65" className={s.cCurve} />
      <path d="M62 10V70" className={s.cNow} />
    </g>
  )],
  ["개발 계획 수립", (
    <g key="cases">
      <path d="M14 8V70H114" className={s.cAxis} />
      <path d="M18 52C28 44 38 40 50 40" className={s.cHist} />
      <path d="M50 40C70 36 92 22 112 16" className={s.cCurve} />
      <path d="M50 40C72 38 92 34 112 32" className={s.cCase} />
      <path d="M50 40C72 42 92 50 112 54" className={s.cCaseSoft} />
      <circle cx="50" cy="40" r="2.6" className={s.cDot} />
    </g>
  )],
];

function ConceptFlow() {
  return (
    <ol className={s.concept} aria-label="저류층 시뮬레이션: 유체 흐름·압력 변화, 생산량 예측, 개발 계획 수립">
      {CONCEPT.map(([ko, art], i) => (
        <li key={ko} className={s.conceptItem}>
          {i > 0 && <span className={s.conceptArrow} aria-hidden />}
          <svg viewBox="0 0 120 80" className={s.conceptArt} aria-hidden>{art}</svg>
          <span className={s.conceptKo}>{ko}</span>
        </li>
      ))}
    </ol>
  );
}

export function ReservoirSimulationTopic({ topic, prev, next }: { topic: FlatTopic; prev?: FlatTopic; next?: FlatTopic }) {
  const cat = topic.category;
  return (
    <>
      {/* Hero — title, the concept in three pictures and the contents left; the Petrel simulation capture right */}
      <section className={t.intro} data-category={cat.id} data-topic={topic.id} data-section="opening">
        <Crumb topic={topic} />
        <div className={s.hero}>
          <div className={s.heroText}>
            <div className={ss.eyebrow}>
              <span>{cat.num}</span><span className={ss.eyebrowRule} /><span className={ss.eyebrowLabel}>{cat.label}</span>
              <span className={ss.eyebrowNum}>· {topic.num}</span>
            </div>
            <h1 className={s.h1}>{topic.title}</h1>
            <span className={s.titleRule} aria-hidden />
            <ConceptFlow />
            <p className={s.stepsLabel} id="sim-contents">Learning Contents</p>
            <ol className={s.steps} aria-labelledby="sim-contents">
              {STEPS.map((st, i) => (
                <li key={st.id}><a href={`#${st.id}`}><span>{pad(i)}</span>{st.title}</a></li>
              ))}
              {MORE.map(([id, title], i) => (
                <li key={id}><a href={`#${id}`}><span>{pad(STEPS.length + i)}</span>{title}</a></li>
              ))}
            </ol>
            <div className={t.meta}>
              <span>Topic {topic.num.split(".")[1]} of {cat.topics.length}</span>
              <span>{cat.label} · {cat.ko}</span>
            </div>
          </div>
          <div className={s.heroShotWrap}>
            <Figure caption="Petrel Reservoir Simulation · 공사 보유 Oil Field 실습">
            <Image src="/images/technology/engineering/re-sim-petrel.webp" alt="Petrel 시뮬레이션 화면: 왼쪽은 저류층 모델의 3D 압력 분포, 오른쪽은 유정의 압력·액체·오일·물 생산 이력 그래프" width={1910} height={980} sizes="(max-width: 899px) 100vw, 1100px" priority className={s.heroShot} />
          </Figure>
          </div>
        </div>
      </section>

      {/* 01–05 — the workflow (03 is the interactive dashboard: heading, collapsible notes, then the viewer) */}
      {STEPS.map((st, i) => st.id === "run" ? (
        <section key={st.id} id={st.id} className={cx(t.section, i % 2 === 0 && t.white, s.stepSection, s.dashSection)} data-section={st.id} data-step={pad(i)}>
          <div className={t.inner}>
            <div className={s.dashHead}>
              <div className={s.dashTitle}>
                <SectionHeading num={pad(i)}>{st.title}</SectionHeading>
                <p className={s.dashLabel}>{st.label}</p>
              </div>
              <div>
                <p className={`${ss.body} ${s.dashBody}`}>{st.body}</p>
                <details className={s.notes}>
                  <summary>Technical notes · {st.terms.map(([en]) => en).join(" · ")}</summary>
                  <dl className={s.notesList}>
                    {st.terms.map(([en, ko]) => (
                      <div key={en}>
                        <dt>{en}</dt>
                        <dd>{ko}</dd>
                      </div>
                    ))}
                  </dl>
                </details>
              </div>
            </div>
            {st.figure}
          </div>
        </section>
      ) : (
        <section key={st.id} id={st.id} className={cx(t.section, i % 2 === 0 && t.white, s.stepSection)} data-section={st.id} data-step={pad(i)}>
          <div className={cx(t.inner, s.step)}>
            <div className={s.stepText}>
              <SectionHeading num={pad(i)}>{st.title}</SectionHeading>
              <p className={s.stepLabel}>{st.label}</p>
              <p className={`${ss.body} ${s.stepBody}`}>{st.body}</p>
              <dl className={s.terms}>
                {st.terms.map(([en, ko]) => (
                  <div key={en}>
                    <dt>{en}</dt>
                    <dd>{ko}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={s.stepVisual} data-visual={st.id}>{st.figure}</div>
          </div>
        </section>
      ))}

      <SimulatorSections />

      <TopicNext topic={topic} prev={prev} next={next} />
    </>
  );
}
