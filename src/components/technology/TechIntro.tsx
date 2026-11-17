import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import s from "./TechIntro.module.css";

/**
 * Petroleum Technology — Introduction. Four disciplines around one development goal (left) and how the knowledge
 * on this site was built (right). The entrance plays once on load in about three seconds (CSS only); afterwards
 * the only motion is a very slow drift of the outer ring. Reduced motion shows the finished state.
 * Images are the site's own illustrative (AI-generated) assets — no company or field data.
 */

const FIELDS: { en: string; ko: string; desc: string; img: string; pos: string }[] = [
  { en: "Geology", ko: "지질", desc: "지층과 지질구조 해석", img: "/images/technology/geology/ge-wf-strata.webp", pos: "tl" },
  { en: "Geophysics", ko: "지구물리", desc: "탄성파 자료와 지하구조 해석", img: "/images/technology/geophysics/gp-seismic-section.webp", pos: "tr" },
  { en: "Reservoir Engineering", ko: "저류공학", desc: "저류층 평가 및 생산 예측", img: "/images/technology/engineering/re-reservoir-cutaway.webp", pos: "bl" },
  { en: "Facilities", ko: "시설", desc: "생산·처리 시설 및 개발 연계", img: "/images/journey/journey-production.webp", pos: "br" },
];

/** Link ends at each card's inner corner (percent of the diagram); lines run under the hub and end in a node */
const ENDS: Record<string, [number, number]> = { tl: [31, 40], tr: [69, 40], bl: [31, 60], br: [69, 60] };

const STEPS: [string, string, string][] = [
  ["01", "Expert Mentoring", "각 분야 전문가분들의 실무 중심 교육"],
  ["02", "Knowledge Structuring", "배운 내용을 체계적으로 정리하고 연결"],
  ["03", "Digital Knowledge Portal", "석유개발 기술 지식 포털 구축"],
];

const v = (o: Record<string, string | number>) => o as CSSProperties;

export function TechIntro({ next }: { next: string }) {
  return (
    <section className={s.intro} aria-labelledby="tech-intro-title">
      <div className={s.inner}>
        <header className={s.head}>
          <p className={s.label}>KNOC <span aria-hidden>/</span> Petroleum Technology</p>
          <h2 id="tech-intro-title" className={s.title}>
            <span>Different Expertise.</span>
            <span className={s.accent}>One Development Goal.</span>
          </h2>
          <p className={s.sub}>석유개발은 지질, 지구물리, 저류공학, 시설 등 다양한 전문 분야의 유기적인 협업을 통해 이루어집니다.</p>
        </header>

        <div className={s.body}>
          <div className={s.collab}>
            <p className={s.colLabel}>Multidisciplinary Collaboration</p>
            <div className={s.diagram}>
              <svg className={s.links} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                {FIELDS.map((f, i) => {
                  const [x, y] = ENDS[f.pos];
                  return <path key={f.pos} d={`M50,50 L${x},${y}`} className={s.link} style={v({ "--i": i })} />;
                })}
              </svg>
              {FIELDS.map((f, i) => <span key={f.pos} className={s.node} style={v({ left: `${ENDS[f.pos][0]}%`, top: `${ENDS[f.pos][1]}%`, "--i": i })} aria-hidden />)}
              <div className={s.hub}>
                <svg className={s.rings} viewBox="0 0 440 440" aria-hidden>
                  <circle cx="220" cy="220" r="158" pathLength={1} className={s.ringInner} />
                  <g className={s.drift}><circle cx="220" cy="220" r="206" className={s.ringOuter} /></g>
                </svg>
                <div className={s.disc}>
                  <Image src="/hero-surface.webp" alt="" fill sizes="260px" className={s.discImg} />
                </div>
                <p className={s.hubLabel}>Oil &amp; Gas<br />Development</p>
              </div>
              {FIELDS.map((f, i) => (
                <article key={f.pos} className={`${s.card} ${s[f.pos]}`} style={v({ "--i": i })}>
                  <div className={s.cardImg}><Image src={f.img} alt="" fill sizes="(max-width: 899px) 45vw, 300px" /></div>
                  <div className={s.cardText}>
                    <h3>{f.en} <span>{f.ko}</span></h3>
                    <p>{f.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className={s.journey}>
            <p className={s.colLabel}>My Learning Journey</p>
            <ol className={s.steps}>
              {STEPS.map(([n, t, d], i) => (
                <li key={n} className={i === STEPS.length - 1 ? `${s.step} ${s.stepGoal}` : s.step} style={v({ "--i": i })}>
                  <span className={s.stepNum}>{n}</span>
                  <div>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </div>
                  {i < STEPS.length - 1 && <span className={s.stepLink} aria-hidden />}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <a href={`#${next}`} className={s.down} aria-label="Technology 목차로 이동">
          <ArrowDown size={20} aria-hidden />
        </a>
      </div>
    </section>
  );
}
