import type { CSSProperties, ReactNode } from "react";
import { sceneStyles as ss } from "@/components/site/scene";
import type { FlatTopic } from "@/lib/technology";
import { RevealScope } from "../RevealScope";
import { REVEAL_BOOT } from "../revealBoot";
import { Crumb, SectionHeading, TopicNext, topicStyles as t } from "../TopicParts";
import { Drives } from "./Drives";
import { STAGES, VARIABLES } from "./content";
import { DrawdownExplorer, DrawdownFormula, Permeability, Skin } from "./Flow";
import { CapillaryTubes, PcFormula, PoreDiagram, RelPerm, SatFormula } from "./Multiphase";
import { FluidTypes, SingleComponent } from "./PhaseBehavior";
import { PvtLab } from "./PvtLab";
import { EorClassification } from "./Recovery";
import { ReservoirSection } from "./ReservoirSection";
import { SectionNav } from "./SectionNav";
import s from "./Fundamentals.module.css";

/**
 * Topic 3.2 — Reservoir Engineering Fundamentals: seven sections from fluid properties to recovery.
 * Diagrams are conceptual (no measured data); the drawdown explorer applies the oilfield-unit pseudo-steady-state
 * radial-flow equation exactly. Entrance motion reuses the topic RevealScope (one-shot, free scrolling).
 */

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");
const v = (o: Record<string, number>) => o as CSSProperties;

const SECTIONS = [
  { id: "evaluation", num: "01", label: "Why Evaluation" },
  { id: "fluids", num: "02", label: "Fluid Properties" },
  { id: "pvt", num: "03", label: "PVT Analysis" },
  { id: "flow", num: "04", label: "Fluid Flow" },
  { id: "multiphase", num: "05", label: "Multiphase Flow" },
  { id: "drives", num: "06", label: "Drive Mechanisms" },
  { id: "recovery", num: "07", label: "Recovery Methods" },
];

const DARCY = `<math display="block" aria-label="q equals k A over mu times delta P over L"><mrow><mi>q</mi><mo>=</mo><mfrac><mrow><mi>k</mi><mo>&#8290;</mo><mi>A</mi></mrow><mi>μ</mi></mfrac><mo>&#8290;</mo><mfrac><mrow><mi>Δ</mi><mi>P</mi></mrow><mi>L</mi></mfrac></mrow></math>`;

function Head({ num, title, children }: { num: string; title: string; children: ReactNode }) {
  return (
    <div className={s.head} data-reveal="up">
      <SectionHeading num={num}>{title}</SectionHeading>
      <div className={s.headBody}>{children}</div>
    </div>
  );
}

function Part({ k, title, children }: { k: string; title: string; children?: ReactNode }) {
  return (
    <div className={s.part} data-reveal="up">
      <span className={s.partKey}>{k}</span>
      <h3 className={s.partTitle}>{title}</h3>
      {children && <p className={s.partBody}>{children}</p>}
    </div>
  );
}

export function FundamentalsTopic({ topic, prev, next }: { topic: FlatTopic; prev?: FlatTopic; next?: FlatTopic }) {
  const cat = topic.category;
  return (
    <RevealScope className={s.motion}>
      <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOT }} />

      {/* Opening */}
      <section className={t.intro} data-category={cat.id} data-topic={topic.id} data-section="opening">
        <Crumb topic={topic} />
        <div className={s.open}>
          <div className={s.openText}>
            <div className={ss.eyebrow} data-reveal="up" style={v({ "--i": 0 })}>
              <span>{cat.num}</span><span className={ss.eyebrowRule} /><span className={ss.eyebrowLabel}>{cat.label}</span>
              <span className={ss.eyebrowNum}>· {topic.num}</span>
            </div>
            <h1 className={s.h1} data-reveal="up" style={v({ "--i": 1 })}>{topic.title}</h1>
            <p className={s.sub} data-reveal="up" style={v({ "--i": 2 })}>{topic.sub}</p>
            <p className={`${ss.body} ${s.lede}`} data-reveal="up" style={v({ "--i": 3 })}>
              저류층의 유체 물성, 유동 원리, 구동 메커니즘을 이해하고 실제 생산 및 회수 전략으로 연결합니다.
            </p>
            <div className={t.meta} data-reveal="up" style={v({ "--i": 4 })}>
              <span>Topic {topic.num} of {cat.topics.length}</span>
              <span>{cat.label} · {cat.ko}</span>
            </div>
          </div>
          <ol className={s.toc} aria-label="Topic outline" data-reveal="up" style={v({ "--i": 2 })}>
            {SECTIONS.map((x) => (
              <li key={x.id}><a href={`#${x.id}`}><span>{x.num}</span>{x.label}</a></li>
            ))}
          </ol>
        </div>
      </section>

      <SectionNav items={SECTIONS} />

      {/* 01 — Why reservoir evaluation matters */}
      <section id="evaluation" className={cx(t.section, t.white, s.anchor)} data-section="evaluation">
        <div className={t.inner}>
          <Head num="01" title="Understanding the Reservoir Before Developing the Field.">
            <p className={s.p}>저류공학적 평가는 저류층 특성을 정확하게 파악해 적절한 개발계획을 세우고, 생산 단계에서는 저류층 거동을 이해해 변화에 대응하기 위해 수행합니다.</p>
          </Head>
          <div className={s.evalGrid}>
            <figure className={s.figure} data-reveal="up">
              <ReservoirSection kind="overview" label="Conceptual reservoir cross-section with a gas cap, oil zone, water below and a producing well" />
              <div className={s.legend}>
                <span><i className={s.lgGas} />Gas</span>
                <span><i className={s.lgOil} />Oil</span>
                <span><i className={s.lgWater} />Water</span>
              </div>
              <figcaption className={s.caption}>Conceptual cross-section · not to scale</figcaption>
            </figure>
            <div className={s.evalFlow} data-reveal="up" style={v({ "--d": 0.2 })}>
              <div className={s.flowStep}>
                <span className={s.flowKey}>Dynamic Data</span>
                <p className={s.pSmall}>시간에 따라 변하는 동적자료 — 저류공학의 핵심 평가 자료</p>
                <ul className={s.chips}>
                  {["Pressure", "Production Rate", "GOR", "Water Cut"].map((c) => <li key={c}>{c}</li>)}
                </ul>
              </div>
              <span className={s.flowArrow} aria-hidden>↓</span>
              <div className={cx(s.flowStep, s.flowCore)}>
                <span className={s.flowKey}>Reservoir Evaluation</span>
                <p className={s.pSmall}>동적자료로 저류층 특성과 거동을 해석</p>
              </div>
              <span className={s.flowArrow} aria-hidden>↓</span>
              <div className={s.flowStep}>
                <span className={s.flowKey}>Development / Production Decisions</span>
              </div>
              <div className={s.purposes}>
                <div>
                  <h4 className={s.purposeTitle}>Development Planning</h4>
                  <p className={s.pSmall}>정확한 저류층 특성 평가를 통한 적절한 개발계획 수립</p>
                </div>
                <div>
                  <h4 className={s.purposeTitle}>Production Management</h4>
                  <p className={s.pSmall}>생산 단계에서 저류층 거동을 파악하고 변화에 대응</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Fluid properties & phase behaviour */}
      <section id="fluids" className={cx(t.section, s.anchor)} data-section="fluids">
        <div className={t.inner}>
          <Head num="02" title="How Do Reservoir Fluids Behave?">
            <p className={s.p}>저류층 유체가 기체·액체 중 어떤 상태로 존재하는지는 압력과 온도에 따라 달라집니다. 단일 성분의 상거동에서 출발해, 실제 저류층 유체를 상포락선(phase envelope)으로 구분합니다.</p>
          </Head>
          <Part k="Part A" title="Single-Component Phase Behavior" />
          <div data-reveal="up"><SingleComponent /></div>
          <Part k="Part B" title="Reservoir Fluid Types">
            유체 유형은 상포락선에 대한 저류층 온도의 위치와, 지상 분리기 조건의 위치로 구분합니다.
          </Part>
          <div data-reveal="up"><FluidTypes /></div>
        </div>
      </section>

      {/* 03 — PVT laboratory analysis */}
      <section id="pvt" className={cx(t.section, t.white, s.anchor)} data-section="pvt">
        <div className={t.inner}>
          <Head num="03" title="Measuring the Properties of Reservoir Fluids.">
            <p className={s.p}>PVT 보고서는 저류층 유체 시료로 수행한 실험 결과를 정리한 자료입니다. 주요 분석 다섯 가지를 선택해 목적과 원리를 확인하세요.</p>
          </Head>
          <div data-reveal="up"><PvtLab /></div>
        </div>
      </section>

      {/* 04 — Fluid flow & near-wellbore effects */}
      <section id="flow" className={cx(t.section, s.anchor)} data-section="flow">
        <div className={t.inner}>
          <Head num="04" title="What Controls the Flow of Fluids?">
            <p className={s.p}>유체가 얼마나 쉽게 흐르는지는 암석의 투과도가 결정하고, 유정으로 모이는 방사상 유동의 압력강하는 투과도와 유정 주변 상태(skin)에 크게 좌우됩니다.</p>
          </Head>

          <Part k="A" title="Permeability">
            투과도(k)는 암석이 유체를 통과시키는 능력입니다. 공극이 크고 서로 잘 연결될수록 투과도가 높습니다. 단위는 주로 밀리다시(mD)를 씁니다.
          </Part>
          <div className={s.permRow} data-reveal="up">
            <div className={s.darcy}>
              <span className={s.compareKey}>Darcy&apos;s law · single-phase, laminar</span>
              <div className={s.math} dangerouslySetInnerHTML={{ __html: DARCY }} />
              <p className={s.pSmall}>유량 q는 투과도 k, 단면적 A, 압력차 ΔP에 비례하고, 점도 μ와 길이 L에 반비례합니다.</p>
            </div>
            <Permeability />
          </div>

          <Part k="B" title="Pressure Drawdown & Radial Flow">
            유전 단위계에서 원형 배수영역의 단상, 의사정상상태(pseudo-steady-state) 방사상 유동을 가정한 압력강하 식입니다.
          </Part>
          <div className={s.formulaRow} data-reveal="up">
            <div className={s.formulaBox}><DrawdownFormula /></div>
            <table className={s.varTable}>
              <caption className={s.srOnly}>Variables of the drawdown equation</caption>
              <thead><tr><th scope="col">Symbol</th><th scope="col">Meaning</th><th scope="col">Unit</th></tr></thead>
              <tbody>
                {VARIABLES.map(([sym, name, unit]) => (
                  <tr key={sym}><td className={s.sym}>{sym.length > 1 ? <>{sym[0]}<sub>{sym.slice(1)}</sub></> : sym}</td><td>{name}</td><td>{unit}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <Part k="C" title="Skin Effect">
            스킨(s)은 유정 주변의 손상 또는 개선으로 생기는 추가 압력강하를 무차원 값으로 나타냅니다. 위에서 내려다본 유정 주변 단면입니다.
          </Part>
          <div data-reveal="up"><Skin /></div>

          <div data-reveal="up"><DrawdownExplorer /></div>
        </div>
      </section>

      {/* 05 — Multiphase flow */}
      <section id="multiphase" className={cx(t.section, t.white, s.anchor)} data-section="multiphase">
        <div className={t.inner}>
          <Head num="05" title="When Oil, Water, and Gas Flow Together.">
            <p className={s.p}>저류층 공극에는 여러 유체가 함께 존재합니다. 각 유체가 차지하는 비율, 유체 사이의 압력차, 그리고 각 유체의 유동 능력을 순서대로 살펴봅니다.</p>
          </Head>
          <div className={s.multiGrid}>
            <div className={s.multiItem} data-reveal="up">
              <span className={s.partKey}>01</span>
              <h3 className={s.partTitle}>Fluid Saturation</h3>
              <SatFormula />
              <p className={s.pSmall}>포화도(S)는 공극 부피 중 각 유체(물·석유·가스)가 차지하는 비율이며, 모두 더하면 1입니다.</p>
              <figure className={s.figure}><PoreDiagram /><figcaption className={s.caption}>Schematic pore · water-wet</figcaption></figure>
            </div>
            <div className={s.multiItem} data-reveal="up" style={v({ "--d": 0.15 })}>
              <span className={s.partKey}>02</span>
              <h3 className={s.partTitle}>Capillary Pressure</h3>
              <PcFormula />
              <p className={s.pSmall}>서로 섞이지 않는 두 유체 사이의 압력차입니다. 계면장력(σ)과 젖음성(접촉각 θ)이 클수록, 공극(r)이 작을수록 커집니다. 모세관 튜브 모델의 관계식입니다.</p>
              <figure className={s.figure}><CapillaryTubes /><figcaption className={s.caption}>Schematic capillary tubes · water-wet</figcaption></figure>
            </div>
          </div>
          <Part k="03" title="Relative Permeability">
            여러 유체가 함께 흐를 때 각 유체의 유동 능력을 절대투과도에 대한 비율(kr)로 나타냅니다. 물 포화도에 따라 k<sub>ro</sub>와 k<sub>rw</sub>가 어떻게 바뀌는지 슬라이더로 확인하세요.
          </Part>
          <div data-reveal="up"><RelPerm /></div>
        </div>
      </section>

      {/* 06 — Drive mechanisms */}
      <section id="drives" className={cx(t.section, s.anchor)} data-section="drives">
        <div className={t.inner}>
          <Head num="06" title="What Drives Oil Toward the Well?">
            <p className={s.p}>저류층의 자연 에너지가 원유를 생산정으로 밀어내는 방식을 구동 메커니즘이라고 합니다. 교육자료의 네 가지 메커니즘을 선택해 비교하세요.</p>
          </Head>
          <div data-reveal="up"><Drives /></div>
        </div>
      </section>

      {/* 07 — Production & recovery methods */}
      <section id="recovery" className={cx(t.section, t.white, s.anchor)} data-section="recovery">
        <div className={t.inner}>
          <Head num="07" title="From Natural Production to Enhanced Recovery.">
            <p className={s.p}>석유 회수는 저류층 자연 에너지를 쓰는 1차 회수, 유체 주입으로 압력을 지지하는 2차 회수, 유체와 암석의 상호작용을 바꾸는 3차 회수(EOR)로 구분합니다.</p>
          </Head>

          <ol className={s.stages} aria-label="Recovery stages">
            {STAGES.map((st, i) => (
              <li key={st.key} className={s.stageItem} data-reveal="up" style={v({ "--i": i })}>
                <span className={s.stageNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={s.stageTitle}>{st.key}</h3>
                <span className={s.stageKo}>{st.ko}</span>
                <p className={s.pSmall}>{st.body}</p>
                <span className={s.stageTag}>{st.tag}</span>
              </li>
            ))}
          </ol>
          <p className={s.stageNote} data-reveal="up">Primary · Secondary · Tertiary는 개념적인 회수 단계의 분류이며, 실제 필드에서는 순서나 시점이 달라질 수 있습니다.</p>

          <div className={s.asides} data-reveal="up">
            <div className={s.asideItem}>
              <span className={s.compareKey}>Pressure Maintenance</span>
              <p className={s.pSmall}>물이나 가스를 주입해 저류층 압력을 일정 수준 이상으로 관리하는 개념입니다. Waterflood 같은 2차 회수 방식과 연결되며, 생산 초기부터 적용되기도 합니다.</p>
            </div>
            <div className={s.asideItem}>
              <span className={s.compareKey}>Artificial Lift — not a recovery stage</span>
              <p className={s.pSmall}>펌프나 가스 리프트로 유정 안의 유체를 지상까지 올리는 것을 돕는 기술입니다. 저류층에서 원유를 이동시키는 회수 단계와는 구분됩니다.</p>
            </div>
          </div>

          <div data-reveal="up"><EorClassification /></div>

          <blockquote className={s.closing} data-reveal="up">
            <p>Reservoir properties define how fluids behave. Reservoir engineering turns that understanding into production decisions.</p>
          </blockquote>
        </div>
      </section>

      <TopicNext topic={topic} prev={prev} next={next} />
    </RevealScope>
  );
}
