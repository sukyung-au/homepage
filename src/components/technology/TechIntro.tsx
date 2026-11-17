import Image from "next/image";
import type { CSSProperties } from "react";
import { BookOpen, ChevronDown, Laptop, Users } from "lucide-react";
import s from "./TechIntro.module.css";

/**
 * Petroleum Technology — Introduction. Four disciplines around one development goal (left) and how the knowledge
 * on this site was built (right), after the approved design draft. The entrance plays once on load in about
 * three seconds (CSS only); afterwards the only motion is a very slow drift of the outer ring. Reduced motion
 * shows the finished state. Images are the site's own illustrative (AI-generated) assets — no company or field data.
 */

const FIELDS: { en: string; ko: string; desc: string; img: string; pos: "tl" | "tr" | "bl" | "br" }[] = [
  { en: "Geology", ko: "지질", desc: "지층과 지질구조 해석", img: "/images/technology/geology/ge-wf-strata.webp", pos: "tl" },
  { en: "Geophysics", ko: "지구물리", desc: "탄성파 자료와 지하구조 해석", img: "/images/technology/geophysics/gp-seismic-section.webp", pos: "tr" },
  { en: "Reservoir Engineering", ko: "저류공학", desc: "저류층 평가 및 생산 예측", img: "/images/technology/engineering/re-reservoir-cutaway.webp", pos: "bl" },
  { en: "Facilities", ko: "시설", desc: "생산·처리 시설 및 개발 연계", img: "/images/journey/journey-production.webp", pos: "br" },
];

/** Where each link meets its card (percent of the diagram, on the card's inner edge); links start under the hub */
const ENDS: Record<string, [number, number]> = { tl: [35.5, 30], tr: [64.5, 30], bl: [35.5, 70], br: [64.5, 70] };

const STEPS = [
  { title: "Expert Mentoring", desc: "각 분야 전문가분들의 실무 중심 교육", Icon: Users },
  { title: "Knowledge Structuring", desc: "배운 내용을 체계적으로 정리 · 연계", Icon: BookOpen },
  { title: "Digital Knowledge Portal", desc: "석유개발 기술 지식 포털 구축", Icon: Laptop },
];

const v = (o: Record<string, string | number>) => o as CSSProperties;

export function TechIntro({ next }: { next: string }) {
  return (
    <section className={s.intro} aria-labelledby="tech-intro-title">
      <div className={s.inner}>
        <div className={s.bar}>
          <span>KNOC <i>/</i> Petroleum Technology</span>
          <span className={s.barRule} aria-hidden />
          <span>01 <i>—</i> Introduction</span>
        </div>

        <header className={s.head}>
          <h2 id="tech-intro-title" className={s.title}>
            <span>Different Expertise.</span>
            <span>One <em>Development Goal.</em></span>
          </h2>
          <p className={s.sub}>석유개발은 지질, 지구물리, 저류공학, 시설 등 다양한 전문 분야의 유기적인 협업을 통해 이루어집니다.</p>
        </header>

        <div className={s.body}>
          <div className={s.diagram} role="group" aria-label="Multidisciplinary collaboration: 네 전문 분야가 하나의 석유개발 목표로 연결됩니다">
            <svg className={s.links} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              {FIELDS.map((f, i) => {
                const [x, y] = ENDS[f.pos];
                return <path key={f.pos} d={`M50,50 L${x},${y}`} className={s.link} style={v({ "--i": i })} />;
              })}
            </svg>
            {FIELDS.map((f, i) => (
              <span key={f.pos} className={s.node} style={v({ left: `${ENDS[f.pos][0]}%`, top: `${ENDS[f.pos][1]}%`, "--i": i })} aria-hidden />
            ))}

            <div className={s.hub}>
              <svg className={s.rings} viewBox="0 0 440 440" aria-hidden>
                <circle cx="220" cy="220" r="186" className={s.ringBand} />
                <circle cx="220" cy="220" r="186" pathLength={1} className={s.ringLine} />
                <g className={s.drift}><circle cx="220" cy="220" r="212" className={s.ringOuter} /></g>
              </svg>
              <div className={s.disc}>
                <div className={s.discImg}><Image src="/hero-surface.webp" alt="" fill sizes="216px" /></div>
                <p className={s.hubLabel}>Oil &amp; Gas<br />Development</p>
              </div>
            </div>

            {FIELDS.map((f, i) => (
              <article key={f.pos} className={`${s.card} ${s[f.pos]}`} style={v({ "--i": i })}>
                <div className={s.cardImg}><Image src={f.img} alt="" fill sizes="(max-width: 899px) 30vw, 140px" /></div>
                <div className={s.cardText}>
                  <h3>{f.en}</h3>
                  <span className={s.ko}>{f.ko}</span>
                  <span className={s.dash} aria-hidden />
                  <p>{f.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div className={s.journey}>
            <p className={s.journeyLabel}>My Learning Journey</p>
            <ol className={s.steps}>
              {STEPS.map(({ title, desc, Icon }, i) => (
                <li key={title} className={i === STEPS.length - 1 ? `${s.step} ${s.goal}` : s.step} style={v({ "--i": i })}>
                  <span className={s.icon}><Icon size={30} strokeWidth={1.6} aria-hidden /></span>
                  <div>
                    <h3><span className={s.stepNum}>0{i + 1}</span>{title}</h3>
                    <p>{desc}</p>
                  </div>
                  {i < STEPS.length - 1 && <ChevronDown className={s.chev} size={22} strokeWidth={1.8} aria-hidden />}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <a href={`#${next}`} className={s.down} aria-label="Technology 목차로 이동">
          <ChevronDown size={22} strokeWidth={2.2} aria-hidden />
        </a>
      </div>
    </section>
  );
}
