import type { CSSProperties, JSX } from "react";
import Link from "next/link";
import { sceneStyles as ss } from "@/components/site/scene";
import type { FlatTopic } from "@/lib/technology";
import { RevealScope } from "../RevealScope";
import { REVEAL_BOOT } from "../revealBoot";
import { Crumb, TopicNext, topicStyles as t } from "../TopicParts";
import { Details } from "../fundamentals/Details";
import { SectionShell } from "../fundamentals/SectionShell";
import f from "../fundamentals/Fundamentals.module.css";
import r from "../RoleOfReservoirEngineering.module.css";
import { DCA_LEGEND, DeclinePlot, MethodTimeline, PrmsFramework, PzPlot, SimForecast, SimMatch, SimModel, TankModel, VolumetricBlock } from "./ReservesFigures";
import x from "./Reserves.module.css";

/**
 * Topic 3.5 — Reserves Estimation: the PRMS classification, then four estimation methods (volumetric, material
 * balance, decline curve analysis, reservoir simulation) and how they compare. Opening and motion follow topic
 * 3.1; numbered sections reuse topic 3.2's SectionShell and Details. Text is qualitative and follows the sources
 * in SOURCES; figures are conceptual (no values).
 */

const v = (o: Record<string, number>) => o as CSSProperties;
const RE = "/technology/engineering";

/* ── 02 Classification ── */
const CATEGORIES: [string, string][] = [
  ["Reserves", "발견된 저류층에서 개발 사업을 통해, 기준일 이후 정해진 조건에서 상업적으로 회수할 수 있을 것으로 예상되는 양"],
  ["Contingent", "발견됐고 회수할 수 있지만, 하나 이상의 조건(우발 요인) 때문에 아직 상업적이라고 보기 어려운 양"],
  ["Prospective", "아직 발견되지 않은 집적에서 앞으로의 개발로 회수할 수 있을 것으로 추정하는 양"],
];
const RESERVE_CATS: [string, string][] = [
  ["1P · Proved", "합리적 확실성으로 회수가 예상되는 양 — 확률적 방법이면 실제 회수량이 이 값 이상일 확률이 90% 이상"],
  ["2P · + Probable", "Proved와 Probable의 합 — 같은 기준으로 50% 이상"],
  ["3P · + Possible", "Proved, Probable, Possible의 합 — 같은 기준으로 10% 이상"],
];

/* ── 03 Volumetric inputs ── */
const INPUTS: { sym: string; ko: string; from: string; href?: string; link?: string }[] = [
  { sym: "A · h", ko: "면적과 순 두께", from: "탄성파 해석과 지질 모델의 구조도·두께도", href: "/technology/geophysics/gp-fdp-role", link: "1.1" },
  { sym: "φ", ko: "공극률", from: "물리검층과 코어 분석", href: "/technology/geology/ge-fdp-role", link: "2.1" },
  { sym: "Sw", ko: "물 포화도", from: "물리검층 해석과 모세관압 자료", href: `${RE}/re-fundamentals`, link: "3.2" },
  { sym: "Bo · Bg", ko: "체적계수", from: "PVT 실험 — 저류층 조건의 부피를 지표 조건으로 환산", href: `${RE}/re-fundamentals`, link: "3.2" },
];

/* ── 06 Simulation steps ── */
const SIM_STEPS: { title: string; body: string; Fig: () => JSX.Element }[] = [
  { title: "Build the Model", body: "정적 모델(구조·암상·공극률·투과도)을 격자로 나누고, 유체·암석 물성과 유정을 넣어 동적 모델을 만듭니다.", Fig: SimModel },
  { title: "Match the History", body: "실제 생산량과 압력 이력을 재현할 때까지 불확실한 입력값을 조정합니다(이력 맞춤).", Fig: SimMatch },
  { title: "Forecast Scenarios", body: "맞춘 모델로 개발 계획별 생산을 예측하고, 불확실성을 반영한 여러 경우(낮음·기준·높음)로 매장량 범위를 냅니다.", Fig: SimForecast },
];

/* ── 07 Comparison ── */
const COMPARE: { name: string; ko: string; principle: string; data: string; when: string; limit: string }[] = [
  { name: "Volumetric", ko: "체적법", principle: "암석 부피 × 공극률 × 탄화수소 포화도 ÷ 체적계수로 원시 부존량을 구하고, 회수율을 곱함", data: "구조도 · 두께 · 검층 · 코어 · PVT", when: "생산 전 탐사·평가 단계부터", limit: "회수율은 유사 유전이나 시뮬레이션에서 따로 정해야 함 · 입력값 불확실성이 큼" },
  { name: "Material Balance", ko: "물질수지", principle: "생산한 유체량과 그에 따른 압력 강하의 관계로 원시 부존량과 구동 메커니즘을 추정", data: "평균 저류층 압력 이력 · 누적 생산량 · PVT", when: "의미 있는 생산과 압력 강하가 쌓인 뒤", limit: "저류층을 압력이 고르게 퍼진 하나의 탱크로 가정 · 신뢰할 압력 자료 필요" },
  { name: "Decline Curve", ko: "감퇴곡선 분석", principle: "생산량 감소 추세를 Arps 식으로 맞추고 경제 한계까지 연장해 최종 회수량(EUR)을 구함", data: "유정별 생산량 이력", when: "감퇴 추세가 자리 잡은 생산 단계", limit: "운영 조건이 그대로라는 가정 · 경계 지배 유동 이전 자료에 맞추면 과대평가 위험" },
  { name: "Reservoir Simulation", ko: "저류층 시뮬레이션", principle: "격자 모델로 유동을 계산하고, 이력에 맞춘 뒤 개발 시나리오별로 예측", data: "정적 모델 · 유체·암석 물성 · 생산·압력 이력", when: "개발 계획부터 생산 전 기간", limit: "자료와 시간이 많이 듦 · 이력에 맞는 모델이 하나로 정해지지 않음" },
];

const SOURCES: [string, string][] = [
  ["SPE/WPC/AAPG/SPEE/SEG/SPWLA/EAGE · Petroleum Resources Management System (PRMS), revised June 2018", "https://www.spe.org/media/filer_public/0c/83/0c835db9-501f-4ce7-97f1-a1d6bb4e3331/prmgmtsystem_v103.pdf"],
  ["SPE · Assessment of Petroleum Resources Using Deterministic Procedures (PRMS Guidelines)", "https://onepetro.org/books/book/70/chapter/14094907/Assessment-of-Petroleum-Resources-using"],
  ["SLB Energy Glossary · Stock-tank oil initially in place", "https://glossary.slb.com/en/terms/s/stock-tank_oil_initially_in_place"],
  ["SLB Energy Glossary · Recovery factor", "https://glossary.slb.com/en/terms/r/recovery_factor"],
  ["SLB Energy Glossary · Material balance", "https://glossary.slb.com/en/terms/m/material_balance"],
  ["SLB Energy Glossary · Estimated ultimate recovery", "https://glossary.slb.com/en/terms/e/estimated_ultimate_recovery"],
  ["SLB Energy Glossary · History matching", "https://glossary.slb.com/en/terms/h/history_matching"],
  ["S&P Global Harmony · Decline analysis theory", "https://www.ihsenergy.ca/support/documentation_ca/Harmony/content/html_files/reference_material/analysis_method_theory/decline_theory.htm"],
  ["whitson⁺ User Manual · Decline curve analysis", "https://manual.whitson.com/modules/well-performance/decline-curve-analysis/"],
];

export function ReservesTopic({ topic, prev, next }: { topic: FlatTopic; prev?: FlatTopic; next?: FlatTopic }) {
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
              매장량은 앞으로 상업적으로 생산할 수 있다고 추정하는 석유·가스의 양입니다. 자료가 적은 초기에는 체적법으로, 생산과 압력 이력이 쌓이면 물질수지·감퇴곡선 분석·저류층 시뮬레이션으로 추정하고, 서로 다른 방법의 결과를 비교하며 추정을 다듬어 갑니다.
            </p>
            <div className={t.meta} data-reveal="up" style={v({ "--i": 4 })}>
              <span>Topic {topic.num} of {cat.topics.length}</span>
              <span>{cat.label} · {cat.ko}</span>
            </div>
          </div>
          <figure className={r.openFigure} data-reveal="up" style={v({ "--i": 2 })}>
            <MethodTimeline />
            <figcaption className={r.caption}>Which method, when — conceptual. Shapes only, no values.</figcaption>
          </figure>
        </div>
      </section>

      {/* 02 — Classification */}
      <SectionShell id="classification" num="02" white title="Resources and Reserves"
        summary="석유개발 업계는 매장량과 자원량을 PRMS(Petroleum Resources Management System)로 분류합니다. 발견 여부와 상업성으로 등급을 나누고, 불확실성의 범위로 범주를 나눕니다.">
        <div className={x.split}>
          <figure className={x.fig} data-reveal="up">
            <PrmsFramework />
            <figcaption className={x.caption}>Resources classification framework, simplified from PRMS (2018) Figure 1.1 · not to scale</figcaption>
          </figure>
          <div className={x.text} data-reveal="up" style={v({ "--i": 1 })}>
            <ul className={x.categories}>
              {CATEGORIES.map(([k, d]) => <li key={k}><span className={x.catKey}>{k}</span><span className={x.catBody}>{d}</span></li>)}
            </ul>
            <p className={f.pSmall}>매장량이 되려면 네 가지 조건을 모두 만족해야 합니다.</p>
            <div className={x.criteria}><span>Discovered</span><span>Recoverable</span><span>Commercial</span><span>Remaining</span></div>
          </div>
        </div>
        <div className={x.more} data-reveal="up">
          <Details summary="1P, 2P, 3P — expressing uncertainty">
            <ul className={x.categories}>
              {RESERVE_CATS.map(([k, d]) => <li key={k}><span className={x.catKey}>{k}</span><span className={x.catBody}>{d}</span></li>)}
            </ul>
            <p className={f.pSmall}>같은 방식으로 Contingent Resources는 1C·2C·3C, Prospective Resources는 Low·Best·High(1U·2U·3U)로 나타냅니다. 아래 네 가지 방법은 모두 이 범위를 정하는 데 쓰입니다.</p>
          </Details>
        </div>
      </SectionShell>

      {/* 03 — Volumetric */}
      <SectionShell id="volumetric" num="03" title="Volumetric Method"
        summary="저류층 암석의 부피와 그 안의 공극, 공극을 채운 탄화수소의 비율로 원시 부존량을 계산하고, 회수율을 곱해 회수 가능량을 구합니다. 생산 자료가 없어도 쓸 수 있어 탐사·평가 단계의 기본 방법입니다.">
        <figure className={`${x.fig} ${x.figNarrow}`} data-reveal="up">
          <VolumetricBlock />
          <figcaption className={x.caption}>From bulk rock to hydrocarbon in place · conceptual</figcaption>
        </figure>
        <div className={x.pair} style={{ marginTop: 48 }}>
          <div className={x.text} data-reveal="up">
            <p className={x.formula}>
              N = A · h · φ · (1 − Sw) / Bo
              <small>원시 원유 부존량(STOIIP) · 가스는 Bo 대신 Bg를 써서 G를 구함</small>
            </p>
            <p className={x.formula}>
              Reserves = N × Recovery Factor
              <small>회수율은 유사 유전의 실적이나 시뮬레이션으로 정함</small>
            </p>
          </div>
          <ul className={x.inputs} data-reveal="up" style={v({ "--i": 1 })}>
            {INPUTS.map((i) => (
              <li key={i.sym}>
                <span className={x.sym}>{i.sym} <span className={x.from}>{i.ko}</span></span>
                <span className={x.from}>{i.from}{i.href && <> · <Link href={i.href}>{i.link}</Link></>}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={x.more} data-reveal="up">
          <Details summary="Deterministic or probabilistic">
            <p className={f.p}>각 입력값에 하나의 대표값을 넣어 계산하면 결정론적(deterministic) 추정이 됩니다. 입력값마다 가능한 범위를 분포로 주고 여러 번 계산(Monte Carlo)하면 결과도 분포로 나오며, 여기서 P90 · P50 · P10 값을 읽어 1P · 2P · 3P와 연결할 수 있습니다.</p>
          </Details>
        </div>
      </SectionShell>

      {/* 04 — Material balance */}
      <SectionShell id="material-balance" num="04" white title="Material Balance"
        summary="저류층을 하나의 탱크로 보고, 꺼낸 유체의 양과 그만큼 줄어든 압력 사이의 수지를 맞춥니다. 저류층의 모양을 몰라도 압력과 생산 이력으로 원시 부존량과 구동 메커니즘을 추정할 수 있습니다.">
        <div className={x.pair}>
          <figure className={x.fig} data-reveal="up">
            <TankModel />
            <figcaption className={x.caption}>Tank model · production = expansion + influx</figcaption>
          </figure>
          <figure className={x.fig} data-reveal="up" style={v({ "--i": 1 })}>
            <PzPlot />
            <figcaption className={x.caption}>Gas reservoir p/z plot · conceptual, no values</figcaption>
          </figure>
        </div>
        <div className={x.pair} style={{ marginTop: 40 }}>
          <p className={f.p} data-reveal="up">생산으로 꺼낸 오일·가스·물의 부피는 저류층 안에서 유체와 암석이 팽창한 부피, 그리고 대수층에서 들어온 물의 부피와 같아야 합니다. 평균 저류층 압력과 누적 생산량, PVT 자료를 이 관계에 넣으면 처음에 있던 양을 거꾸로 구할 수 있습니다.</p>
          <p className={f.p} data-reveal="up" style={v({ "--i": 1 })}>물의 유입이 없는 가스 저류층에서는 <b>p/z</b>를 누적 가스 생산량에 대해 그리면 직선이 되고, 이 직선을 p/z = 0까지 연장한 값이 원시 가스 부존량(G)입니다. 점들이 직선보다 위로 휘면 물의 유입(물 구동)을 의심해야 합니다.</p>
        </div>
      </SectionShell>

      {/* 05 — DCA */}
      <SectionShell id="dca" num="05" title="Decline Curve Analysis"
        summary="생산량이 시간에 따라 줄어드는 추세를 경험식에 맞추고, 그 곡선을 경제 한계까지 연장해 최종 회수량(EUR)을 구합니다. 생산 자료만 있으면 되므로 가장 간단하게, 많은 유정에 적용할 수 있습니다.">
        <figure className={x.fig} data-reveal="up">
          <DeclinePlot />
          <div className={x.legend}>
            {DCA_LEGEND.map((l, i) => <span key={l.label}><i className={`${x.lg} ${[x.lgExp, x.lgHyp, x.lgHar][i]}`} />{l.label}</span>)}
          </div>
          <figcaption className={x.caption}>Arps decline on a semi-log plot · EUR = cumulative production + forecast to the economic limit · conceptual</figcaption>
        </figure>
        <div className={x.pair} style={{ marginTop: 40 }}>
          <p className={f.p} data-reveal="up">Arps 감퇴식은 감퇴 지수 <b>b</b>로 곡선의 모양을 나눕니다. b = 0이면 감퇴율이 일정한 지수(exponential) 감퇴로 반대수 그래프에서 직선이 되고, b = 1이면 조화(harmonic) 감퇴, 그 사이면 쌍곡선(hyperbolic) 감퇴입니다. b가 클수록 곡선이 완만해져 경제 한계에 늦게 닿고 EUR이 커집니다.</p>
          <p className={f.p} data-reveal="up" style={v({ "--i": 1 })}>감퇴곡선은 운영 조건이 그대로 유지되고, 유정이 경계의 영향을 받는 경계 지배 유동 상태라는 가정에서 의미가 있습니다. 그 이전 자료에 맞추면 b가 1보다 크게 나와 EUR을 과대평가할 수 있어, 일정한 감퇴율에 이르면 지수 감퇴로 바꾸는 방식(modified hyperbolic)을 함께 씁니다.</p>
        </div>
      </SectionShell>

      {/* 06 — Simulation */}
      <SectionShell id="simulation" num="06" white title="Reservoir Simulation"
        summary="3차원 격자 모델에서 유체 흐름을 계산해 생산을 예측합니다. 과거 이력에 맞춘 모델로 신규 시추·주입 같은 개발 계획별 매장량을 평가할 수 있어, 다른 방법으로는 다루기 어려운 변화를 반영합니다.">
        <ol className={x.steps}>
          {SIM_STEPS.map(({ title, body, Fig }, i) => (
            <li key={title} data-reveal="up" style={v({ "--i": i })}>
              <Fig />
              <span className={x.stepNum}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={x.stepTitle}>{title}</h3>
              <p className={x.stepBody}>{body}</p>
            </li>
          ))}
        </ol>
        <p className={`${f.pSmall} ${x.more}`} data-reveal="up">시뮬레이션의 원리와 사용하는 소프트웨어는 <Link href={`${RE}/re-simulation`}>3.4 Reservoir Simulation</Link>에서, 이력 맞춤에 쓰는 압력·생산 해석은 <Link href={`${RE}/re-well-test`}>3.3 Pressure &amp; Rate Transient Analysis</Link>에서 다룹니다.</p>
      </SectionShell>

      {/* 07 — Comparison */}
      <SectionShell id="compare" num="07" title="Choosing and Combining Methods"
        summary="방법마다 필요한 자료와 쓸 수 있는 시기가 다릅니다. 실무에서는 한 가지 결과만 쓰기보다 여러 방법을 함께 적용해 서로 검증합니다.">
        <div className={x.table} role="table" aria-label="Reserves estimation methods compared" data-reveal="up">
          <div className={`${x.tRow} ${x.tHead}`} role="row">
            <span role="columnheader">Method</span><span role="columnheader">Principle</span><span role="columnheader">Data</span><span role="columnheader">When</span><span role="columnheader">Limits</span>
          </div>
          {COMPARE.map((c) => (
            <div key={c.name} className={x.tRow} role="row">
              <span role="rowheader"><span className={x.tName}>{c.name}</span><br />{c.ko}</span>
              <span role="cell" data-k="Principle">{c.principle}</span>
              <span role="cell" data-k="Data">{c.data}</span>
              <span role="cell" data-k="When">{c.when}</span>
              <span role="cell" data-k="Limits">{c.limit}</span>
            </div>
          ))}
        </div>
        <p className={x.cross} data-reveal="up">
          <b>Cross-check.</b> 예를 들어 체적법으로 구한 원시 부존량과 물질수지로 구한 값이 크게 다르면, 저류층 범위나 연결성, 대수층의 영향을 다시 검토할 신호가 됩니다. 생산이 진행될수록 성과 기반 방법(물질수지·감퇴곡선·시뮬레이션)의 비중이 커지고, 추정의 범위는 좁아집니다.
        </p>
        <div className={x.more} data-reveal="up">
          <Details summary="Sources">
            <p className={f.pSmall}>이 페이지의 설명은 아래 자료의 정의와 원리를 바탕으로 정성적으로 정리했습니다. 그림은 개념도이며 특정 저류층이나 유정의 자료가 아닙니다.</p>
            <ul className={x.sourceList}>
              {SOURCES.map(([label, href]) => <li key={href}><a href={href} target="_blank" rel="noopener noreferrer">{label}</a></li>)}
            </ul>
          </Details>
        </div>
      </SectionShell>

      <TopicNext topic={topic} prev={prev} next={next} />
    </RevealScope>
  );
}
