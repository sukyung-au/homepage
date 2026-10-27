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
import { FmbExplorer, TypeCurveExplorer } from "./RtaAnalysis";
import { DiagnosticExplorer, RateHistory, RtaPlot, TestPictogram } from "./WellTestFigures";
import w from "./WellTest.module.css";

/**
 * Topic 3.3 — Pressure & Rate Transient Analysis (PTA · RTA). Opening and motion follow topic 3.1
 * (RoleOfReservoirEngineering.module.css); numbered sections reuse topic 3.2's SectionShell and Details.
 * Text is qualitative (no values) and follows the sources listed in SOURCES; figures are conceptual shapes.
 */

const v = (o: Record<string, number>) => o as CSSProperties;

/* ── 02 PTA vs RTA ── */
const COMPARE: { tag: string; title: string; ko: string; rows: [string, string][] }[] = [
  {
    tag: "PTA", title: "Pressure Transient Analysis", ko: "압력 천이 분석 · 유정 시험",
    rows: [
      ["Data", "유량을 의도적으로 바꾼 뒤(생산·폐쇄·주입) 기록한 바닥 압력, 대개 유정 바닥에서 측정"],
      ["Time Scale", "계획된 시험 기간 — 유동 구간과 폐쇄 구간"],
      ["Main Outputs", "투과도-두께(kh), 스킨, 저장 효과, 경계의 종류와 거리, 유체 생산 능력"],
      ["Key Plot", "압력 변화와 압력 미분의 log-log 진단 그래프, 반대수(semi-log) 그래프"],
    ],
  },
  {
    tag: "RTA", title: "Rate Transient Analysis", ko: "생산 거동 분석 · 생산 자료 분석",
    rows: [
      ["Data", "생산 중에 쌓인 유량과 유동 바닥압 — 유량과 압력이 함께 변하는 일상 생산 자료"],
      ["Time Scale", "장기간 쌓인 생산 이력"],
      ["Main Outputs", "유동 지배 변수, 배유 면적·연결된 부피, 원시 탄화수소량, 생산 예측"],
      ["Key Plot", "압력 정규화 유량(q/Δp)과 그 미분의 log-log 그래프, 유형곡선(type curve)"],
    ],
  },
];

/* ── 03 PTA test types ── */
const TESTS: { kind: "drawdown" | "buildup" | "falloff"; title: string; body: string }[] = [
  { kind: "drawdown", title: "Drawdown Test", body: "유정을 일정한 유량(또는 정해진 유량 순서)으로 생산하면서 바닥 압력이 내려가는 과정을 기록합니다. 이론적으로 해석이 가장 단순한 시험이지만, 유량이 일정하게 유지되지 않으면 해석이 크게 달라집니다." },
  { kind: "buildup", title: "Buildup Test", body: "일정 기간 생산한 뒤 유정을 닫고, 압력이 회복되는 과정을 기록합니다. 폐쇄 후 유정 안의 유체가 안정되어 해석하기 좋은 압력 자료를 얻을 수 있고, 유동 능력·투과도-두께·스킨을 구하는 데 쓰입니다." },
  { kind: "falloff", title: "Injection & Fall-off Test", body: "주입정에서 수행하는 시험으로, 주입 구간은 생산정의 drawdown에, 주입을 멈춘 뒤 압력이 내려가는 fall-off 구간은 buildup에 해당합니다." },
];

/* ── 05 RTA methods ── */
const RTA_METHODS: [string, string][] = [
  ["Rate-Normalized Pressure", "유량과 압력이 함께 변하는 생산 자료를 비교할 수 있도록 압력 강하를 유량으로 나누어(또는 그 역수로) 정규화합니다."],
  ["Material Balance Time", "변하는 유량 이력을 등가의 일정 유량 시간으로 바꾸는 시간 함수로, Palacio와 Blasingame(1993)이 제안했습니다."],
  ["Flow-Regime Diagnosis", "log-log 그래프의 기울기로 유동 구간을 구분합니다. 늦은 시간의 단위 기울기는 경계 지배 유동을 뜻합니다."],
  ["Type Curves", "자료를 미리 계산된 모델 곡선에 겹쳐 맞추고, 맞춘 곡선에서 저류층 변수와 원시 탄화수소량을 읽습니다 — 06."],
  ["Flowing Material Balance", "경계 지배 유동 구간의 직선을 연장해 원시 탄화수소량을 구합니다 — 07."],
  ["Production Forecast", "해석한 모델과 감퇴곡선으로 앞으로의 생산량을 예측합니다."],
];

/* ── 06 Deliverables ── */
const OUTPUTS: [string, string][] = [
  ["Permeability-Thickness (kh)", "방사류 구간에서 구하는 저류층의 유동 능력"],
  ["Skin", "유정 주변의 손상(+) 또는 자극(−) 정도 — 산출 효율 진단"],
  ["Boundaries & Distances", "봉쇄 단층, 일정 압력 경계 등 경계의 종류와 위치"],
  ["Connected Volume", "유정이 연결된 공극 부피, 배유 면적, 원시 탄화수소량"],
  ["Well Productivity", "유정의 생산 능력과 시간에 따른 변화"],
  ["Production Forecast", "해석 모델을 바탕으로 한 생산 예측"],
];

const HARMONY = "https://www.ihsenergy.ca/support/documentation_ca/Harmony_Enterprise/2023_1/content/html_files/ref_materials/analysis_method_theory/typecurve/";

/* ── 06 How type-curve matching works ── */
const MATCHING = [
  "실제 자료를 유형곡선과 같은 크기의 log-log 그래프에 그립니다. 단위가 바뀌어도 로그 축에서는 자료 전체가 평행 이동할 뿐입니다.",
  "두 그래프의 축을 평행하게 유지한 채 자료를 움직여 가장 잘 맞는 곡선을 찾고, 그 곡선의 매개변수(re/rwa, re/xf, b 등)를 기록합니다.",
  "일치점의 좌표를 자료 그래프와 유형곡선에서 각각 읽어 투과도, 스킨, 면적, 원시 유체량을 계산합니다.",
  "맞춘 곡선을 마지막 자료 너머로 연장하면 앞으로의 생산량 예측이 됩니다.",
];

const SOURCES: [string, string][] = [
  ["SLB Energy Glossary · Pressure transient analysis", "https://glossary.slb.com/en/terms/p/pressure_transient_analysis"],
  ["SLB Energy Glossary · Buildup test", "https://glossary.slb.com/en/terms/b/buildup_test"],
  ["SLB Energy Glossary · Skin", "https://glossary.slb.com/en/terms/s/skin"],
  ["whitson⁺ User Manual · PTA", "https://manual.whitson.com/modules/well-performance/pta/"],
  ["whitson⁺ User Manual · Classical RTA", "https://manual.whitson.com/modules/well-performance/analytical_rta/"],
  ["SWP Short Course · Basic Derivative Diagnostics", "https://www.swpshortcourse.org/sites/default/files/papers/1994022.pdf"],
  ["S&P Global Harmony · Fetkovich typecurve theory", `${HARMONY}fetkovich_typecurve_theory.htm`],
  ["S&P Global Harmony · Blasingame typecurve theory", `${HARMONY}blasingame_typecurve_theory.htm`],
  ["S&P Global Harmony · Agarwal-Gardner typecurve theory", `${HARMONY}agarwal-gardner_typecurve_theory.htm`],
  ["S&P Global Harmony · NPI typecurve theory", `${HARMONY}npi_typecurve_theory.htm`],
  ["S&P Global Harmony · Wattenbarger typecurve theory", "https://www.ihsenergy.ca/support/documentation_ca/Harmony_Enterprise/2021_2/content/html_files/ref_materials/analysis_method_theory/typecurve/wattenbarger_typecurve_theory.htm"],
  ["S&P Global Harmony · Flowing Material Balance theory", "https://www.ihsenergy.ca/support/documentation_ca/Harmony/content/html_files/reference_material/analysis_method_theory/fmb_theory.htm"],
  ["SPE · Flow Regimes and the Diagnostic Plot", "https://onepetro.org/books/book/42/chapter/10956781/Flow-Regimes-and-the-Diagnostic-Plot"],
];

export function WellTestTopic({ topic, prev, next }: { topic: FlatTopic; prev?: FlatTopic; next?: FlatTopic }) {
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
              유정의 유량을 바꾸면 저류층의 압력이 반응합니다. 그 압력과 유량의 시간 변화를 해석하면 직접 볼 수 없는 저류층의 유동 능력, 유정 주변 상태, 경계와 연결된 부피를 알아낼 수 있습니다.
            </p>
            <div className={t.meta} data-reveal="up" style={v({ "--i": 4 })}>
              <span>Topic {topic.num} of {cat.topics.length}</span>
              <span>{cat.label} · {cat.ko}</span>
            </div>
          </div>
          <figure className={r.openFigure} data-reveal="up" style={v({ "--i": 2 })}>
            <RateHistory />
            <figcaption className={r.caption}>Conceptual well test — flow, then shut-in. Shapes only, no values.</figcaption>
          </figure>
        </div>
      </section>

      {/* 02 — PTA vs RTA */}
      <SectionShell id="pta-rta" num="02" white title="Two Ways to Read Dynamic Data"
        summary="PTA는 계획된 유정 시험의 압력 반응을, RTA는 생산 중에 쌓인 유량과 압력 자료를 해석합니다. 같은 유동 원리를 바탕으로 서로 다른 자료와 시간 규모를 다룹니다.">
        <div className={w.compare}>
          {COMPARE.map((c, i) => (
            <article key={c.tag} className={w.card} data-reveal="up" style={v({ "--i": i })}>
              <span className={w.cardTag}>{c.tag}</span>
              <h3 className={w.cardTitle}>{c.title}</h3>
              <span className={w.cardKo}>{c.ko}</span>
              <dl className={w.rows}>
                {c.rows.map(([k, d]) => <div key={k}><dt>{k}</dt><dd>{d}</dd></div>)}
              </dl>
            </article>
          ))}
        </div>
        <div className={w.inverse} data-reveal="up">
          <span className={w.inverseMark} aria-hidden>⇄</span>
          <div>
            <h3 className={w.inverseTitle}>An Inverse Problem</h3>
            <p className={w.inverseBody}>측정한 것은 유량 이력과 압력 반응이고, 알고 싶은 것은 그 반응을 만든 저류층 모델입니다. 그래서 해석은 먼저 알맞은 모델(유동 형태, 경계, 유정 효과)을 찾고, 다음으로 그 모델의 변수(투과도, 스킨, 경계 위치 등)를 정하는 두 단계로 이루어집니다.</p>
          </div>
        </div>
      </SectionShell>

      {/* 03 — PTA test types */}
      <SectionShell id="tests" num="03" title="Making the Reservoir Respond"
        summary="유정 시험은 유량을 정해진 방식으로 바꾸고 그에 따른 압력 반응을 측정합니다. 시험 방법에 따라 유량 변화와 압력 반응의 모양이 달라집니다.">
        <ol className={w.tests} aria-label="Well test types">
          {TESTS.map((x, i) => (
            <li key={x.kind} className={w.test} data-reveal="up" style={v({ "--i": i })}>
              <div className={w.testPic}><TestPictogram kind={x.kind} /></div>
              <h3 className={w.testTitle}>{x.title}</h3>
              <p className={w.testBody}>{x.body}</p>
            </li>
          ))}
        </ol>
        <div className={w.semilog} data-reveal="up">
          <Details summary="Semi-log analysis: permeability and skin from one straight line">
            <p className={f.p}>무한작용 방사류 구간에서는 바닥 압력을 경과 시간의 로그에 대해 그리면 직선이 됩니다. 이 직선의 기울기는 지층 유동 능력(투과도-두께)에 반비례하므로 투과도를 계산할 수 있고, 직선을 연장한 절편으로 스킨을 구합니다.</p>
            <p className={f.pSmall}>그래서 해석에서는 올바른 반대수 직선 구간을 고르는 것이 중요합니다. 그 구간은 log-log 진단 그래프(04)에서 압력 미분이 평탄한 부분으로 확인합니다.</p>
          </Details>
        </div>
      </SectionShell>

      {/* 04 — Diagnostic plot */}
      <SectionShell id="diagnostic" num="04" white title="Reading the Diagnostic Plot"
        summary="압력 변화와 압력 미분을 log-log 그래프에 그리면 시간에 따라 유동 구간이 모양으로 드러납니다. 구간을 골라 각 신호의 의미를 확인하세요.">
        <div data-reveal="up"><DiagnosticExplorer /></div>
      </SectionShell>

      {/* 05 — RTA */}
      <SectionShell id="rta" num="05" title="Learning From Production Data"
        summary="RTA는 시험을 위해 생산을 멈추지 않고, 이미 쌓인 생산 유량과 유동 바닥압을 해석합니다. 유량과 압력이 함께 변하므로 정규화와 시간 함수를 사용합니다.">
        <div className={w.rta}>
          <figure className={w.fig} data-reveal="up">
            <RtaPlot />
            <figcaption className={w.caption}>Conceptual RTA diagnostic for a multi-fractured horizontal well · shapes only, no values</figcaption>
          </figure>
          <dl className={w.methods} data-reveal="up" style={v({ "--i": 1 })}>
            {RTA_METHODS.map(([k, d]) => <div key={k}><dt>{k}</dt><dd>{d}</dd></div>)}
          </dl>
        </div>
        <div className={w.note} data-reveal="up">
          <Details summary="Reading the slopes — and their limits">
            <p className={f.p}>저투과도 저류층의 다단 수압파쇄 수평정에서는 무한작용 선형 유동(−½ 기울기)이 생산 이력의 상당 부분 동안 이어지고, 저류층 경계에 닿으면 경계 지배 유동(−1 기울기)으로 바뀝니다. 기존 가스 저류층에서는 경계 지배 유동이 생산 초기에 비교적 일찍 나타나기도 합니다.</p>
            <p className={f.pSmall}>같은 단위 기울기라도 이른 시간이면 유정 저장 효과, 늦은 시간이면 경계 지배 유동일 가능성이 높으므로 시간 순서를 함께 봐야 합니다. 유동 구간 사이의 전환이 뚜렷하지 않을 수 있고, 해석적 RTA는 다상 유동과 중첩 효과를 엄밀하게 반영하지 못한다는 한계가 있습니다.</p>
          </Details>
        </div>
      </SectionShell>

      {/* 06 — Type curves */}
      <SectionShell id="type-curves" num="06" white title="Type Curves: Matching Production to Models"
        summary="유형곡선은 이상화한 저류층·유정 모델의 해를 무차원 곡선으로 그려 둔 것입니다. 생산 자료를 겹쳐 가장 잘 맞는 곡선을 찾으면 저류층 변수와 원시 탄화수소량을 읽을 수 있습니다. 종류별로 비교해 보세요.">
        <div data-reveal="up"><TypeCurveExplorer /></div>
        <div className={w.matching} data-reveal="up">
          <Details summary="How type-curve matching works">
            <ol className={w.matchSteps}>{MATCHING.map((m) => <li key={m}>{m}</li>)}</ol>
            <p className={f.pSmall}>정규화 유량, 적분, 미분 곡선을 함께 맞추면 일치가 더 확실해집니다. 반대로 천이 구간 자료만 있으면 여러 곡선에 똑같이 맞을 수 있어, 저류층 크기와 원시 유체량은 경계 지배 유동 자료가 있어야 정해집니다.</p>
          </Details>
        </div>
      </SectionShell>

      {/* 07 — Flowing material balance */}
      <SectionShell id="fmb" num="07" title="Flowing Material Balance: Estimating OGIP"
        summary="Flowing Material Balance(FMB)는 경계 지배 유동 구간의 유동 압력과 유량으로 원시 탄화수소량을 구합니다. 세 단계를 차례로 눌러 OGIP를 구하는 과정을 확인하세요.">
        <div data-reveal="up"><FmbExplorer /></div>
        <div className={w.matching} data-reveal="up">
          <Details summary="Why a straight line?">
            <p className={f.p}>모든 경계에 압력이 도달한 의사정상 상태에서 유량이 일정하면 저류층 모든 곳의 압력이 같은 속도로 내려갑니다. 그래서 유동 압력의 변화가 평균 저류층 압력의 변화를 따라가고, 물질수지 관계를 생산 중의 자료로 쓸 수 있습니다.</p>
            <p className={f.pSmall}>정규화 유량을 정규화 누적 생산량에 대해 그리면 의사정상 상태 식의 역수 형태가 되어 내려가는 직선이 됩니다. 이 직선은 Agarwal-Gardner의 유량–누적 생산량 해석과 같은 식에 바탕을 둡니다. 직선 구간을 어떻게 고르느냐에 따라 결과가 달라지므로 해석에는 판단이 필요합니다.</p>
          </Details>
        </div>
      </SectionShell>

      {/* 08 — Outputs */}
      <SectionShell id="outputs" num="08" white title="From Transient Data to the Reservoir Model"
        summary="PTA와 RTA의 결과는 저류층 모델의 입력과 검증 자료가 되고, 이어지는 저류층 시뮬레이션과 생산 예측의 기초가 됩니다.">
        <ol className={r.deliverables}>
          {OUTPUTS.map(([en, ko], i) => (
            <li key={en} data-reveal="row" style={v({ "--i": i % 2 })}>
              <span className={r.delNum}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className={r.delTitle}>{en}</h3>
                <p className={r.delBody}>{ko}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className={w.sources} data-reveal="up">
          <Details summary="Sources">
            <p className={f.pSmall}>이 페이지의 설명은 아래 자료의 정의와 해석 원리를 바탕으로 정성적으로 정리했습니다. 그래프는 개념도이며 특정 유정의 자료가 아닙니다.</p>
            <ul className={w.sourceList}>
              {SOURCES.map(([label, href]) => <li key={href}><a href={href} target="_blank" rel="noopener noreferrer">{label}</a></li>)}
            </ul>
          </Details>
        </div>
      </SectionShell>

      <TopicNext topic={topic} prev={prev} next={next} />
    </RevealScope>
  );
}
