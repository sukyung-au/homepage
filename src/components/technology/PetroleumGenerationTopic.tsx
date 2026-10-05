import type { ReactNode } from "react";
import { Callout } from "@/components/ds/Callout";
import { DepthRuler } from "@/components/ds/DepthRuler";
import { ImageSlot } from "@/components/ds/ImageSlot";
import { TechViz } from "@/components/ds/TechViz";
import { TextLink } from "@/components/ds/TextLink";
import { sceneStyles as ss } from "@/components/site/scene";
import type { FlatTopic } from "@/lib/technology";
import { EventChart, type PetroleumEvent } from "./EventChart";
import { Crumb, SectionHeading, TopicNext, topicStyles as s } from "./TopicParts";

/** Topic 1.1 — the representative Technology topic page template. */

const ELEMENTS: { n: string; t: string; kr: string; v: ReactNode }[] = [
  { n: "01", t: "Source Rock", kr: "유기물이 풍부한 셰일이 매몰되어 열과 압력을 받으면 케로겐이 석유와 가스로 변합니다.", v: <ImageSlot id="tech-source" placeholder="Photo — organic-rich black shale sample" sizes="25vw" /> },
  { n: "02", t: "Migration", kr: "생성된 탄화수소는 부력에 의해 투수성 지층과 단층을 따라 위쪽으로 이동합니다.", v: <TechViz kind="strata" seed={3} label="Migration through permeable strata" /> },
  { n: "03", t: "Reservoir", kr: "공극과 투과도가 높은 사암·탄산염암이 이동한 유체를 담아 둡니다.", v: <ImageSlot id="tech-core" placeholder="Photo — sandstone core slab" sizes="25vw" /> },
  { n: "04", t: "Trap & Seal", kr: "배사 구조나 단층이 닫힌 형태를 만들고, 불투수성 덮개암이 누출을 막습니다.", v: <TechViz kind="structure" seed={21} label="Structural closure map" /> },
];

const EVENTS: PetroleumEvent[] = [
  ["Source rock", [[10, 18]], "#0B1A2C"],
  ["Reservoir rock", [[30, 14]], "#0B1A2C"],
  ["Seal rock", [[44, 10]], "#0B1A2C"],
  ["Overburden", [[54, 46]], "#8A98A8"],
  ["Trap formation", [[58, 14]], "#0A5CDB"],
  ["Generation · Migration", [[70, 30]], "#F29A1F"],
  ["Preservation", [[72, 28]], "#12A4D9"],
];

const PARAMS: [string, string, string][] = [
  ["Total organic carbon (TOC)", "3.2 wt%", "Rock-Eval pyrolysis"],
  ["Kerogen type", "Type II", "Visual kerogen / HI–OI"],
  ["Vitrinite reflectance (Ro)", "0.85 – 1.10 %", "Oil window"],
  ["Reservoir porosity", "18 – 24 %", "Core & log"],
  ["Permeability", "50 – 400 mD", "Core plug"],
  ["Seal entry pressure", "2.8 MPa", "MICP"],
  ["Hydrocarbon column", "120 m", "Pressure gradient"],
];

export function PetroleumGenerationTopic({ topic, prev, next }: { topic: FlatTopic; prev?: FlatTopic; next?: FlatTopic }) {
  const cat = topic.category;
  return (
    <>
      <section className={s.intro} data-category={cat.id} data-topic={topic.id}>
        <Crumb topic={topic} />
        <div className={ss.wrap} style={{ alignItems: "stretch", marginTop: 40 }}>
          <div className={s.introText}>
            <div className={ss.eyebrow}>
              <span>{cat.num}</span><span className={ss.eyebrowRule} /><span className={ss.eyebrowLabel}>{cat.label}</span>
              <span className={ss.eyebrowNum}>· {topic.num}</span>
            </div>
            <h1 className={s.h1}>{topic.title}</h1>
            <p className={`${ss.body} ${s.lede}`}>
              석유 시스템은 수백만 년에 걸쳐 함께 작동하는 지질학적 과정의 집합입니다. 근원암의 유기물이 탄화수소로 바뀌고, 이동하여 저류암에 모이며, 트랩과 덮개암에 의해 보존됩니다. 각 요소와 그 순서가 모두 맞아야 매장량이 됩니다.
            </p>
            <div className={s.meta}>
              <span>Topic {topic.num} of {cat.topics.length}</span>
              <span>{topic.read} read</span>
              <span>Updated Oct 2026</span>
            </div>
          </div>
          <div className={s.introVisual}>
            <ImageSlot id="tech-hero" placeholder="Photo — coastal cliff outcrop showing layered sedimentary rock" priority sizes="(max-width: 900px) 100vw, 58vw" />
            <Callout x="28%" y="58%" label="Outcrop analogue" sub="Reservoir sandstone" />
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.white}`}>
        <div className={s.inner}>
          <SectionHeading num="2.1">Four elements, one system.</SectionHeading>
          <div className={s.elements}>
            {ELEMENTS.map((e) => (
              <article key={e.n} className={s.element}>
                <span className={s.elNum}>{e.n}</span>
                <h3 className={s.elTitle}>{e.t}</h3>
                <p className={s.elBody}>{e.kr}</p>
                <div className={s.elVisual}>{e.v}</div>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 40 }}><TextLink chevron href="#fig">See the cross-section</TextLink></div>
        </div>
      </section>

      <section id="fig" className={s.section} style={{ paddingBottom: 0 }}>
        <div className={s.inner}><SectionHeading num="2.2">Where the system comes together.</SectionHeading></div>
        <figure className={s.figure}>
          <div className={s.figVisual}>
            <TechViz kind="strata" seed={5} label="Schematic cross-section of an anticlinal trap" />
            <Callout x="40%" y="27%" label="Seal" sub="Shale, 80 m" />
            <Callout x="40%" y="40%" label="Accumulation" sub="Oil leg 120 m" />
            <Callout x="72%" y="58%" label="Normal fault" sub="Migration pathway" />
            <Callout x="22%" y="84%" label="Source kitchen" sub="Ro 0.85 – 1.10 %" />
            <div className={s.figRuler}><DepthRuler marks={["0 m", "1,000", "2,000", "3,000", "4,000 m"]} /></div>
          </div>
          <figcaption className={s.figcaption}>Figure 2.2 — Schematic cross-section of an anticlinal trap. Vertical exaggeration ×5.</figcaption>
        </figure>
      </section>

      <section className={s.section}>
        <div className={s.split}>
          <div className={s.splitText}>
            <SectionHeading num="2.3">Timing is the fifth element.</SectionHeading>
            <p className={`${ss.body} ${s.lede}`}>트랩은 탄화수소가 이동하기 전에 형성되어 있어야 합니다. 이벤트 차트는 각 요소가 언제 만들어졌는지와, 생성·이동이 시작된 임계 시점(critical moment)을 함께 보여줍니다.</p>
          </div>
          <div className={s.splitChart}>
            <EventChart events={EVENTS} ticks={["200 Ma", "150", "100", "50", "0"]} critical="Critical moment · 36 Ma" />
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.white}`}>
        <div className={s.inner}>
          <SectionHeading num="2.4">Key parameters.</SectionHeading>
          <table className={s.table}>
            <thead><tr><th>Parameter</th><th>Value</th><th>Method</th></tr></thead>
            <tbody>{PARAMS.map(([a, b, c]) => <tr key={a}><td>{a}</td><td>{b}</td><td>{c}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <TopicNext topic={topic} prev={prev} next={next} />
    </>
  );
}
