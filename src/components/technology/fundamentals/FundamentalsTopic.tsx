import type { CSSProperties } from "react";
import { sceneStyles as ss } from "@/components/site/scene";
import type { FlatTopic } from "@/lib/technology";
import { RevealScope } from "../RevealScope";
import { REVEAL_BOOT } from "../revealBoot";
import { Crumb, TopicNext, topicStyles as t } from "../TopicParts";
import { STAGES, VARIABLES } from "./content";
import { Details } from "./Details";
import { Drives } from "./Drives";
import { DrawdownExplorer, DrawdownFormula, Permeability, Skin } from "./Flow";
import { CapillaryTubes, PcFormula, PoreDiagram, RelPerm, SatFormula } from "./Multiphase";
import { FluidTypes, SingleComponent } from "./PhaseBehavior";
import { PvtLab } from "./PvtLab";
import { EorClassification } from "./Recovery";
import { ReservoirSection } from "./ReservoirSection";
import { SectionNav } from "./SectionNav";
import { SectionShell } from "./SectionShell";
import s from "./Fundamentals.module.css";

/**
 * Topic 3.2 — Reservoir Engineering Fundamentals: seven sections from fluid properties to recovery.
 * One main visual per section; supporting tables, procedures and extra formulas sit in collapsed <Details>,
 * while the definitions needed to read the main visual stay visible. Diagrams are conceptual (no measured data);
 * the drawdown explorer applies the oilfield-unit pseudo-steady-state radial-flow equation exactly.
 */

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
            {SECTIONS.map((x) => <li key={x.id}><a href={`#${x.id}`}>{x.label}</a></li>)}
          </ol>
        </div>
      </section>

      <SectionNav items={SECTIONS} />

      {/* 01 — wide cross-section, then a horizontal decision flow */}
      <SectionShell id="evaluation" num="01" white title="Understanding the Reservoir Before Developing the Field."
        summary="저류공학적 평가는 저류층 특성을 정확하게 파악해 적절한 개발계획을 세우고, 생산 단계에서는 저류층 거동을 이해해 변화에 대응하기 위해 수행합니다.">
        <figure className={`${s.figure} ${s.wideFigure}`} data-reveal="up">
          <ReservoirSection kind="overview" label="Conceptual reservoir cross-section with a gas cap, oil zone, water below and a producing well" />
          <div className={s.legend}>
            <span><i className={s.lgGas} />Gas</span>
            <span><i className={s.lgOil} />Oil</span>
            <span><i className={s.lgWater} />Water</span>
            <span className={s.legendNote}>Conceptual cross-section · not to scale</span>
          </div>
        </figure>
        <ol className={s.flowRow} aria-label="From dynamic data to decisions" data-reveal="up">
          <li>
            <h3 className={s.flowTitle}>Dynamic Data</h3>
            <p className={s.p}>압력, 생산량, GOR, Water Cut 등 시간에 따라 변하는 동적자료를 핵심 평가 자료로 활용합니다.</p>
          </li>
          <li>
            <h3 className={`${s.flowTitle} ${s.flowTitleBlue}`}>Reservoir Evaluation</h3>
            <p className={s.p}>동적자료로 저류층의 특성과 거동을 해석합니다.</p>
          </li>
          <li>
            <h3 className={s.flowTitle}>Development / Production Decisions</h3>
            <p className={s.p}><b>Development Planning</b> — 정확한 저류층 특성 평가를 통한 적절한 개발계획 수립</p>
            <p className={s.p}><b>Production Management</b> — 생산 단계에서 저류층 거동을 파악하고 변화에 대응</p>
          </li>
        </ol>
      </SectionShell>

      {/* 02 — the phase envelope is the main visual; single-component background is collapsed */}
      <SectionShell id="fluids" num="02" title="How Do Reservoir Fluids Behave?"
        summary="저류층 유체의 유형은 상포락선(phase envelope)에 대한 저류층 온도의 위치와, 지상 분리기 조건의 위치로 구분합니다. 유형을 선택해 감압 경로를 비교하세요.">
        <div data-reveal="up"><FluidTypes /></div>
        <div className={s.background} data-reveal="up">
          <Details summary="Background — Single-component phase behavior (P–V / P–T)">
            <p className={s.p}>단일 성분 물질의 상거동은 임계점, 기포점, 이슬점, 상변화의 기본 개념을 보여 줍니다. 혼합물인 저류층 유체에서는 이 개념이 상포락선으로 확장됩니다.</p>
            <SingleComponent />
          </Details>
        </div>
      </SectionShell>

      {/* 03 — left/right split focused on one selected test */}
      <SectionShell id="pvt" num="03" white title="Measuring the Properties of Reservoir Fluids."
        summary="PVT 보고서는 저류층 유체 시료로 수행한 실험 결과를 정리한 자료입니다. 실험을 하나씩 선택해 목적과 측정 항목을 확인하세요.">
        <div data-reveal="up"><PvtLab /></div>
      </SectionShell>

      {/* 04 — centred equation, the two concepts it depends on, then the explorer */}
      <SectionShell id="flow" num="04" layout="center" title="What Controls the Flow of Fluids?"
        summary="유정으로 모이는 방사상 유동의 압력강하는 암석의 투과도와 유정 주변 상태(skin)에 크게 좌우됩니다.">
        <div className={s.equation} data-reveal="up">
          <DrawdownFormula />
          <p className={s.equationNote}>유전 단위계 · 원형 배수영역 · 단상 · 의사정상상태(pseudo-steady-state) 방사상 유동</p>
          <div className={s.equationDetails}>
            <Details summary="Variables & units">
              <table className={s.varTable}>
                <caption className={s.srOnly}>Variables of the drawdown equation</caption>
                <thead><tr><th scope="col">Symbol</th><th scope="col">Meaning</th><th scope="col">Unit</th></tr></thead>
                <tbody>
                  {VARIABLES.map(([sym, name, unit]) => (
                    <tr key={sym}><td className={s.sym}>{sym.length > 1 ? <>{sym[0]}<sub>{sym.slice(1)}</sub></> : sym}</td><td>{name}</td><td>{unit}</td></tr>
                  ))}
                </tbody>
              </table>
            </Details>
          </div>
        </div>

        <div className={s.concepts} data-reveal="up">
          <div>
            <h3 className={s.conceptTitle}>Permeability <span>k</span></h3>
            <p className={s.lead}>투과도는 암석이 유체를 통과시키는 능력입니다. 공극이 크고 서로 잘 연결될수록 투과도가 높고, 같은 생산량에서 압력강하가 작아집니다.</p>
            <Details summary="High vs low permeability · Darcy's law">
              <Permeability />
              <div className={s.math} dangerouslySetInnerHTML={{ __html: DARCY }} />
              <p className={s.pSmall}>단상·층류 조건의 Darcy 식: 유량 q는 투과도 k, 단면적 A, 압력차 ΔP에 비례하고 점도 μ와 길이 L에 반비례합니다. 단위는 주로 밀리다시(mD)를 씁니다.</p>
            </Details>
          </div>
          <div>
            <h3 className={s.conceptTitle}>Skin Effect <span>s</span></h3>
            <p className={s.lead}>스킨은 유정 주변의 손상(s &gt; 0) 또는 개선(s &lt; 0)으로 생기는 추가 압력강하를 무차원 값으로 나타냅니다. s = 0은 이상적인 기준 상태입니다.</p>
            <Details summary="Positive · zero · negative skin (plan view)">
              <Skin />
            </Details>
          </div>
        </div>

        <div data-reveal="up"><DrawdownExplorer /></div>
      </SectionShell>

      {/* 05 — relative permeability is the main visual; saturation & capillary pressure below */}
      <SectionShell id="multiphase" num="05" white title="When Oil, Water, and Gas Flow Together."
        summary="저류층 공극에는 여러 유체가 함께 존재합니다. 물 포화도에 따라 각 유체의 유동 능력이 어떻게 바뀌는지가 생산 거동을 좌우합니다.">
        <div data-reveal="up"><RelPerm /></div>
        <div className={s.concepts} data-reveal="up">
          <div>
            <h3 className={s.conceptTitle}>Fluid Saturation</h3>
            <SatFormula />
            <p className={s.lead}>포화도(S)는 공극 부피 중 각 유체(물·석유·가스)가 차지하는 비율이며, 세 값을 더하면 1입니다.</p>
            <Details summary="Inside a pore (schematic)">
              <figure className={`${s.figure} ${s.smallFigure}`}><PoreDiagram /><figcaption className={s.caption}>Schematic pore · water-wet</figcaption></figure>
            </Details>
          </div>
          <div>
            <h3 className={s.conceptTitle}>Capillary Pressure</h3>
            <p className={s.lead}>서로 섞이지 않는 두 유체 사이의 압력차입니다. 계면장력과 젖음성이 클수록, 공극이 작을수록 커집니다.</p>
            <Details summary="Young–Laplace relation · capillary tubes">
              <PcFormula />
              <p className={s.pSmall}>모세관 튜브 모델의 관계식: σ 계면장력, θ 접촉각, r 공극(튜브) 반경.</p>
              <figure className={`${s.figure} ${s.smallFigure}`}><CapillaryTubes /><figcaption className={s.caption}>Schematic capillary tubes · water-wet</figcaption></figure>
            </Details>
          </div>
        </div>
      </SectionShell>

      {/* 06 — wide cross-section */}
      <SectionShell id="drives" num="06" title="What Drives Oil Toward the Well?"
        summary="저류층의 자연 에너지가 원유를 생산정으로 밀어내는 방식을 구동 메커니즘이라고 합니다. 교육자료의 네 가지 메커니즘을 비교하세요.">
        <div data-reveal="up"><Drives /></div>
      </SectionShell>

      {/* 07 — the big recovery flow first, then EOR on demand */}
      <SectionShell id="recovery" num="07" white title="From Natural Production to Enhanced Recovery."
        summary="석유 회수는 개념적으로 1차 회수, 2차 회수, 3차 회수(EOR)로 구분합니다. 실제 필드에서는 순서나 시점이 달라질 수 있습니다.">
        <ol className={s.stages} aria-label="Recovery stages">
          {STAGES.map((st, i) => (
            <li key={st.key} className={s.stageItem} data-reveal="up" style={v({ "--i": i })}>
              <h3 className={s.stageTitle}>{st.key}</h3>
              <span className={s.stageKo}>{st.ko}</span>
              <p className={s.p}>{st.body}</p>
            </li>
          ))}
        </ol>
        <dl className={s.footnotes} data-reveal="up">
          <div>
            <dt>Pressure Maintenance</dt>
            <dd>물이나 가스를 주입해 저류층 압력을 일정 수준 이상으로 관리하는 개념입니다. Waterflood 같은 2차 회수 방식과 연결되며, 생산 초기부터 적용되기도 합니다.</dd>
          </div>
          <div>
            <dt>Artificial Lift</dt>
            <dd>펌프나 가스 리프트로 유정 안의 유체를 지상까지 올리는 것을 돕는 기술입니다. 저류층에서 원유를 이동시키는 회수 단계와는 구분됩니다.</dd>
          </div>
        </dl>

        <div data-reveal="up"><EorClassification /></div>

        <blockquote className={s.closing} data-reveal="up">
          <p>Reservoir properties define how fluids behave. Reservoir engineering turns that understanding into production decisions.</p>
        </blockquote>
      </SectionShell>

      <TopicNext topic={topic} prev={prev} next={next} />
    </RevealScope>
  );
}
