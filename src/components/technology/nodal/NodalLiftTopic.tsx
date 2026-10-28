import type { CSSProperties, JSX } from "react";
import { sceneStyles as ss } from "@/components/site/scene";
import type { FlatTopic } from "@/lib/technology";
import { RevealScope } from "../RevealScope";
import { REVEAL_BOOT } from "../revealBoot";
import { Crumb, TopicNext, topicStyles as t } from "../TopicParts";
import { Details } from "../fundamentals/Details";
import { SectionShell } from "../fundamentals/SectionShell";
import f from "../fundamentals/Fundamentals.module.css";
import r from "../RoleOfReservoirEngineering.module.css";
import { NodalExplorer } from "./NodalExplorer";
import { EspPic, GasLiftPic, HydraulicPic, IprFigure, PcpPic, PlungerPic, ProductionSystem, RodPumpPic, VlpFigure } from "./NodalFigures";
import n from "./Nodal.module.css";

/**
 * Topic 3.5 — Nodal Analysis & Artificial Lift: the production system, inflow (IPR) and outflow (VLP), the
 * operating point, and the main artificial lift methods. Opening and motion follow topic 3.1; numbered sections
 * reuse topic 3.2's SectionShell and Details. Text is qualitative and follows SOURCES; figures are conceptual.
 */

const v = (o: Record<string, number>) => o as CSSProperties;

/* ── 02 System ── */
const SEGMENTS: [string, string][] = [
  ["Reservoir", "다공성 암석을 지나 유정까지 흐르며 생기는 압력 손실 — 투과도, 두께, 유체 점성도가 좌우"],
  ["Completion", "천공과 유정 주변(스킨)을 지나며 생기는 손실 — 손상되면 커지고 자극하면 줄어듦"],
  ["Tubing", "유체 기둥의 무게(중력)와 관 벽 마찰로 생기는 손실"],
  ["Choke & Flowline", "초크와 지상 배관을 지나며 생기는 손실"],
  ["Separator", "도착 압력 — 지상 처리 시설의 조건으로 정해짐"],
];

/* ── 06 Lift methods ── */
const LIFTS: { name: string; ko: string; family: "Pump" | "Gas"; Pic: () => JSX.Element; how: string; fit: string; watch: string }[] = [
  { name: "Rod Pump", ko: "로드 펌프 · 빔 펌프", family: "Pump", Pic: RodPumpPic, how: "지상의 빔 펌프 유닛이 회전 운동을 상하 왕복 운동으로 바꿔, 로드를 통해 바닥의 플런저 펌프를 움직입니다. 이동 밸브와 고정 밸브가 번갈아 열리며 유체를 퍼 올립니다.", fit: "설치·운영 비용이 낮고 정비가 쉬워 육상의 저유량 유정에 널리 쓰임", watch: "펌프에 가스가 들어가면 효율이 떨어짐 · 지상 공간이 필요" },
  { name: "ESP", ko: "전기 수중 펌프", family: "Pump", Pic: EspPic, how: "생산관 끝에 매단 전기 모터가 여러 단의 원심 펌프를 돌립니다. 전력은 생산관에 고정한 케이블로 지상에서 공급합니다.", fit: "중·고유량 유정, 경사가 큰 유정, 해상·심해 유정 · 회전 속도 조절로 생산량 대응", watch: "모래·고형물, 점성 유체, 많은 가스에 성능과 수명이 영향을 받음" },
  { name: "PCP", ko: "프로그레싱 캐비티 펌프", family: "Pump", Pic: PcpPic, how: "나선형 로터가 고정자(스테이터) 안에서 돌며 생긴 공간이 유체를 연속적으로 위로 옮깁니다. 로터는 지상 모터나 바닥의 전기 모터로 돌립니다.", fit: "점성이 높은 유체와 모래가 섞인 유체에 강함", watch: "고정자 고무(엘라스토머)가 유체·온도에 따라 손상될 수 있음" },
  { name: "Gas Lift", ko: "가스 리프트", family: "Gas", Pic: GasLiftPic, how: "고압 가스를 환형 공간으로 넣어 생산관의 가스 리프트 밸브로 주입합니다. 가스가 섞여 유체 기둥이 가벼워지면 바닥 압력이 낮아져 저류층 압력으로 유체가 올라옵니다.", fit: "경사가 큰 유정, 가스가 많은 유정, 해상·심해 유정", watch: "생산 기간 내내 고압 가스 공급과 압축 비용이 필요" },
  { name: "Plunger Lift", ko: "플런저 리프트", family: "Gas", Pic: PlungerPic, how: "유정을 잠시 닫아 압력을 모았다가 열면, 생산관 안의 플런저가 위로 올라가며 그 위에 쌓인 액체를 지표로 밀어 올립니다. 유정 자체의 에너지를 씁니다.", fit: "생산관에 액체가 쌓여(liquid loading) 생산이 줄어든 가스정", watch: "생산이 주기적·간헐적으로 이루어짐" },
  { name: "Hydraulic Pump", ko: "유압 펌프", family: "Pump", Pic: HydraulicPic, how: "지상에서 동력 유체를 내려보내 바닥의 제트·피스톤 펌프를 움직이고, 동력 유체는 생산 유체와 섞여 함께 올라옵니다.", fit: "바닥 펌프를 순환시켜 꺼낼 수 있어 정비가 쉬움 · 중질유 생산에 자주 쓰임", watch: "동력 유체를 공급·처리할 지상 설비가 필요" },
];

/* ── 07 Selection ── */
const FACTORS: [string, string][] = [
  ["Reservoir & Rate", "저류층 압력과 생산성, 기대 생산량"],
  ["Fluids", "가스 비율, 모래·고형물, 점성, 부식성"],
  ["Well Geometry", "깊이, 경사, 완결 방식"],
  ["Surface & Location", "육상·해상, 설치 공간, 전력·가스 공급"],
  ["Economics", "늘어나는 생산의 가치 대비 장비·설치·유지 비용"],
];

const SOURCES: [string, string][] = [
  ["SLB Energy Glossary · Nodal analysis", "https://glossary.slb.com/en/terms/n/nodal_analysis"],
  ["SLB Energy Glossary · Inflow performance relationship", "https://glossary.slb.com/en/terms/i/inflow_performance_relationship"],
  ["SLB Energy Glossary · Artificial lift", "https://glossary.slb.com/en/terms/a/artificial_lift"],
  ["whitson⁺ User Manual · IPR/VLP (nodal analysis)", "https://manual.whitson.com/modules/well-performance/nodal-analysis/"],
  ["SLB Oilfield Review · Defining Artificial Lift", "https://www.slb.com/resource-library/oilfield-review/defining-series/defining-artificial-lift"],
  ["SLB Oilfield Review · Defining Rod Pumps", "https://www.slb.com/resource-library/oilfield-review/defining-series/defining-rod-pumps"],
  ["SLB Oilfield Review · Defining ESP", "https://www.slb.com/resource-library/oilfield-review/defining-series/defining-esp"],
  ["SLB Oilfield Review · Defining PCPs", "https://www.slb.com/resource-library/oilfield-review/defining-series/defining-pcp"],
  ["SLB Oilfield Review · Defining Gas Lift", "https://www.slb.com/resource-library/oilfield-review/defining-series/defining-gas-lift"],
  ["SLB Oilfield Review · Defining Plunger Lift", "https://www.slb.com/resource-library/oilfield-review/defining-series/defining-plunger-lift"],
];

export function NodalLiftTopic({ topic, prev, next }: { topic: FlatTopic; prev?: FlatTopic; next?: FlatTopic }) {
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
              석유와 가스는 저류층에서 유정으로 들어와 생산관을 타고 지표의 분리기까지 흐르며, 지나는 곳마다 압력을 잃습니다. 노달 분석은 이 생산 시스템 전체를 한 번에 보고 유정이 얼마나 생산할지 예측하며, 압력이 부족해지면 인공채유로 에너지를 더합니다.
            </p>
            <div className={t.meta} data-reveal="up" style={v({ "--i": 4 })}>
              <span>Topic {topic.num} of {cat.topics.length}</span>
              <span>{cat.label} · {cat.ko}</span>
            </div>
          </div>
          <figure className={r.openFigure} data-reveal="up" style={v({ "--i": 2 })}>
            <ProductionSystem />
            <figcaption className={r.caption}>The production system, from reservoir to separator · conceptual, not to scale</figcaption>
          </figure>
        </div>
      </section>

      {/* 02 — System */}
      <SectionShell id="system" num="02" white title="One System, Many Pressure Losses"
        summary="노달 분석은 완결과 생산 시스템을 이루는 각 요소의 성능을 예측하는 분석 도구입니다. 저류층 압력에서 분리기 압력까지, 유체가 지나는 구간마다 생기는 압력 손실을 더해 전체를 봅니다.">
        <ol className={n.segments}>
          {SEGMENTS.map(([k, d], i) => (
            <li key={k} data-reveal="up" style={v({ "--i": i })}>
              <span className={n.segNum}>{String(i + 1).padStart(2, "0")}</span>
              <strong>{k}</strong>
              <span>{d}</span>
            </li>
          ))}
        </ol>
        <div className={n.callout} data-reveal="up">
          <span className={n.calloutMark} aria-hidden>●</span>
          <p className={f.p}>시스템 안의 한 지점을 <b>노드(node)</b>로 정하고, 그 위쪽(유입)과 아래쪽(유출)의 성능을 각각 계산해 노드에서 만나게 합니다. 대개 유정 바닥을 노드로 잡으며, 이때 유입은 IPR, 유출은 VLP 곡선으로 나타냅니다. 노달 분석으로 완결 설계를 저류층에 맞추고, 생산을 제한하는 구간을 찾습니다.</p>
        </div>
      </SectionShell>

      {/* 03 — IPR */}
      <SectionShell id="ipr" num="03" title="Inflow: What the Reservoir Can Deliver"
        summary="IPR(Inflow Performance Relationship)은 유정의 생산량을 유동 바닥 압력에 대해 나타낸 관계입니다. 바닥 압력을 낮출수록(drawdown이 클수록) 저류층에서 더 많은 유체가 들어옵니다.">
        <div className={n.split}>
          <figure className={n.fig} data-reveal="up">
            <IprFigure />
            <figcaption className={n.caption}>Conceptual IPR · shapes only, no values</figcaption>
          </figure>
          <div className={n.text} data-reveal="up" style={v({ "--i": 1 })}>
            <p className={f.p}>바닥 압력이 저류층 압력과 같으면 흐름이 없고, 바닥 압력을 0까지 낮췄을 때의 이론적 최대 유량을 <b>AOF</b>(Absolute Open Flow)라고 합니다.</p>
            <p className={f.p}>바닥 압력이 기포점보다 높아 오일이 단상으로 흐르는 동안 IPR은 직선에 가깝습니다. 기포점 아래에서는 용해 가스가 빠져나와 오일의 흐름을 방해하므로 곡선이 휘며, 이를 Vogel의 IPR 식으로 나타냅니다.</p>
            <p className={f.pSmall}>곡선의 모양은 저류층 유체의 조성과 유동 조건에서의 상 거동으로 정해집니다. 실제 IPR은 여러 drawdown에서 측정한 생산량으로 만듭니다.</p>
          </div>
        </div>
      </SectionShell>

      {/* 04 — VLP */}
      <SectionShell id="vlp" num="04" white title="Outflow: What the Tubing Can Lift"
        summary="VLP(Vertical Lift Performance, 또는 TPR)는 정해진 유정 상부 압력에서 유체를 일정한 유량으로 지표까지 올리는 데 필요한 바닥 압력입니다. 생산관 크기, 유체, 유정 상부 압력에 따라 달라집니다.">
        <div className={n.split}>
          <figure className={n.fig} data-reveal="up">
            <VlpFigure />
            <figcaption className={n.caption}>Conceptual VLP · shapes only, no values</figcaption>
          </figure>
          <div className={n.text} data-reveal="up" style={v({ "--i": 1 })}>
            <p className={f.p}>유량이 적으면 가스가 액체를 충분히 끌어올리지 못해 액체가 생산관에 쌓이고(liquid loading), 유체 기둥의 무게 때문에 높은 바닥 압력이 필요합니다.</p>
            <p className={f.p}>유량이 많아지면 관 벽의 마찰이 커져 다시 필요한 압력이 올라갑니다. 생산관이 좁을수록 같은 유량에서 마찰 손실이 커집니다. 그래서 VLP는 가운데가 낮은 J자 모양이 됩니다.</p>
          </div>
        </div>
      </SectionShell>

      {/* 05 — Operating point */}
      <SectionShell id="operating-point" num="05" title="Where Inflow Meets Outflow"
        summary="IPR과 VLP를 한 그래프에 그리면 두 곡선이 만나는 점이 유정이 실제로 생산하는 유량입니다. 조건이 바뀔 때 교점이 어떻게 움직이는지 확인해 보세요.">
        <div data-reveal="up"><NodalExplorer /></div>
      </SectionShell>

      {/* 06 — Artificial lift */}
      <SectionShell id="artificial-lift" num="06" white title="Artificial Lift: Adding Energy to the Well"
        summary="인공채유는 유정 안의 유체 기둥에 에너지를 더해 생산을 시작하거나 늘리는 모든 방식입니다. 저류층 압력이 원래 낮거나 생산으로 줄어들면, 많은 유정은 도움 없이는 경제적인 유량을 낼 수 없습니다.">
        <div className={n.families} data-reveal="up">
          <div><span className={n.famTag}>Pump</span><p className={f.pSmall}>바닥에 설치한 펌프가 유체에 압력을 직접 더합니다.</p></div>
          <div><span className={`${n.famTag} ${n.famGas}`}>Gas</span><p className={f.pSmall}>가스로 유체 기둥을 가볍게 하거나 유정의 가스 압력을 이용해 액체를 밀어 올립니다.</p></div>
        </div>
        <ul className={n.lifts}>
          {LIFTS.map(({ name, ko, family, Pic, how, fit, watch }, i) => (
            <li key={name} className={n.lift} data-reveal="up" style={v({ "--i": i % 3 })}>
              <div className={n.pic}><Pic /></div>
              <div className={n.liftHead}>
                <h3 className={n.liftName}>{name}</h3>
                <span className={`${n.famTag} ${family === "Gas" ? n.famGas : ""}`}>{family}</span>
              </div>
              <span className={n.liftKo}>{ko}</span>
              <p className={n.liftBody}>{how}</p>
              <dl className={n.liftRows}>
                <div><dt>Suited to</dt><dd>{fit}</dd></div>
                <div><dt>Watch for</dt><dd>{watch}</dd></div>
              </dl>
            </li>
          ))}
        </ul>
      </SectionShell>

      {/* 07 — Selection */}
      <SectionShell id="selection" num="07" title="Choosing a Lift Method"
        summary="어떤 인공채유 방식이 맞는지는 저류층과 유체, 유정의 형태, 지상 조건, 경제성을 함께 따져 정합니다. 유정의 생애 동안 조건이 바뀌면 방식도 바뀔 수 있습니다.">
        <ul className={n.factors}>
          {FACTORS.map(([k, d], i) => (
            <li key={k} data-reveal="up" style={v({ "--i": i })}><strong>{k}</strong><span>{d}</span></li>
          ))}
        </ul>
        <div className={n.callout} data-reveal="up">
          <span className={n.calloutMark} aria-hidden>↻</span>
          <p className={f.p}>예를 들어 생산 초기에 다른 방식을 쓰던 유정도, 생산량이 줄어 운영비 부담이 커지면 로드 펌프로 바꾸는 경우가 많습니다. 노달 분석은 이런 선택에서 각 방식이 만들 운전점을 비교하는 도구가 됩니다.</p>
        </div>
        <div className={n.more} data-reveal="up">
          <Details summary="Sources">
            <p className={f.pSmall}>이 페이지의 설명은 아래 자료의 정의와 원리를 바탕으로 정성적으로 정리했습니다. 그래프와 그림은 개념도이며 특정 유정의 자료가 아닙니다.</p>
            <ul className={n.sourceList}>
              {SOURCES.map(([label, href]) => <li key={href}><a href={href} target="_blank" rel="noopener noreferrer">{label}</a></li>)}
            </ul>
          </Details>
        </div>
      </SectionShell>

      <TopicNext topic={topic} prev={prev} next={next} />
    </RevealScope>
  );
}
