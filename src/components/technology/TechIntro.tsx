"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, Laptop, Network, Users } from "lucide-react";
import s from "./TechIntro.module.css";

/**
 * Petroleum Technology — Introduction, in two presenter-paced steps (after the approved design draft).
 * Step 01: the four disciplines around one development goal, centred; the entrance plays once on load (~1.6 s).
 * Step 02 (next arrow / →): the collaboration diagram eases left and smaller while My Learning Journey appears
 * step by step. Previous (← ) returns to step 01; the journey replays each time. Only the section's content
 * changes — the page never scrolls. After the entrance nothing moves on its own. CSS motion only; reduced motion
 * switches instantly. Images are the site's own illustrative (AI-generated) assets — no company or field data.
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
  { title: "Connecting the Knowledge", desc: "석유개발 과정에서 각 기술의 연계성 이해", Icon: Network },
  { title: "Digital Knowledge Portal", desc: "석유개발 기술 지식 포털 구축", Icon: Laptop },
];

const v = (o: Record<string, string | number>) => o as CSSProperties;

export function TechIntro({ next }: { next: string }) {
  const [step, setStep] = useState(0);
  const ref = useRef<HTMLElement>(null);

  // ← / → step through the intro while it is on screen (presentation clicker or keyboard)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || (e.target as HTMLElement).closest?.("input, textarea, select, [contenteditable]")) return;
      const r = ref.current?.getBoundingClientRect();
      if (!r || r.bottom < window.innerHeight * 0.5 || r.top > window.innerHeight * 0.5) return;
      if (e.key === "ArrowRight") { setStep(1); e.preventDefault(); }
      else if (e.key === "ArrowLeft") { setStep(0); e.preventDefault(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section ref={ref} className={s.intro} data-step={step} aria-labelledby="tech-intro-title">
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
                <circle cx="220" cy="220" r="212" className={s.ringOuter} />
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

          <div className={s.journey} aria-hidden={step === 0} inert={step === 0}>
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

        <div className={s.controls}>
          <a href={`#${next}`} className={s.down} aria-label="Technology 목차로 이동" tabIndex={step === 1 ? 0 : -1} aria-hidden={step === 0}>
            <ChevronDown size={20} strokeWidth={2.2} aria-hidden />
          </a>
          <div className={s.stepper}>
            <span className={s.stepLabel} aria-live="polite">{step === 0 ? "Multidisciplinary Collaboration" : "My Learning Journey"}</span>
            <button type="button" className={s.stepBtn} onClick={() => setStep(0)} disabled={step === 0} aria-label="이전: Multidisciplinary Collaboration"><ArrowLeft size={18} aria-hidden /></button>
            <span className={s.dots} aria-label={`Step ${step + 1} of 2`}><i data-on="" /><i data-on={step === 1 || undefined} /></span>
            <button type="button" className={`${s.stepBtn} ${s.stepNext}`} onClick={() => setStep(1)} disabled={step === 1} aria-label="다음: My Learning Journey"><ArrowRight size={18} aria-hidden /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
