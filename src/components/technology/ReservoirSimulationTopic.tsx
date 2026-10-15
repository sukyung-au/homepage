import type { ReactNode } from "react";
import { sceneStyles as ss } from "@/components/site/scene";
import type { FlatTopic } from "@/lib/technology";
import { RunSimulator } from "./simulation/RunSimulator";
import { ForecastCases, FluidCurves, HeroModel, HistoryCases, StaticLayers } from "./simulation/SimFigures";
import s from "./simulation/Simulation.module.css";
import { Crumb, SectionHeading, TopicNext, topicStyles as t } from "./TopicParts";

/**
 * Topic 3.2 — Reservoir Simulation. Page structure and layout only: five steps, each with a short explanation
 * and a conceptual figure (simulation/SimFigures.tsx). Step 03 is interactive (simulation/RunSimulator.tsx:
 * time slider, play / pause / reset, pressure ↔ water saturation) on a conceptual model (conceptModel.ts) —
 * simplified relationships, not a simulator. The hero grid can reuse it later.
 */

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

export function ReservoirSimulationTopic({ topic, prev, next }: { topic: FlatTopic; prev?: FlatTopic; next?: FlatTopic }) {
  const cat = topic.category;
  return (
    <>
      {/* Hero — text left, conceptual grid model right */}
      <section className={t.intro} data-category={cat.id} data-topic={topic.id} data-section="opening">
        <Crumb topic={topic} />
        <div className={s.hero}>
          <div className={s.heroText}>
            <div className={ss.eyebrow}>
              <span>{cat.num}</span><span className={ss.eyebrowRule} /><span className={ss.eyebrowLabel}>{cat.label}</span>
              <span className={ss.eyebrowNum}>· {topic.num}</span>
            </div>
            <h1 className={s.h1}>{topic.title}</h1>
            {topic.sub && <p className={s.sub}>{topic.sub}</p>}
            <p className={`${ss.body} ${s.lede}`}>
              저류층 시뮬레이션은 저류층을 작은 격자로 나누고, 각 셀의 암석·유체 특성과 유정 운영 조건을 바탕으로 시간에 따른 압력과 유체 포화도 변화를 수치적으로 계산하는 방법입니다.
            </p>
            <ol className={s.steps} aria-label="Simulation workflow">
              {STEPS.map((st, i) => (
                <li key={st.id}><a href={`#${st.id}`}><span>{pad(i)}</span>{st.title}</a></li>
              ))}
            </ol>
            <div className={t.meta}>
              <span>Topic {topic.num} of {cat.topics.length}</span>
              <span>{cat.label} · {cat.ko}</span>
            </div>
          </div>
          <HeroModel />
        </div>
      </section>

      {/* 01–05 — the workflow */}
      {STEPS.map((st, i) => (
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

      <TopicNext topic={topic} prev={prev} next={next} />
    </>
  );
}
