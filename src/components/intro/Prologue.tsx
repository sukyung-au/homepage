"use client";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import s from "./Prologue.module.css";

/**
 * Presenter-driven self-introduction shown after the v2 intro reel on /presentation, before the Hero.
 * Step 0 shows the title and presenter; each Space / → reveals the next card (← steps back). After the third
 * card the "Why I built this" message and EXPLORE THE WEBSITE appear — the Hero opens only from that button,
 * never from another key press. Rendered as ShowReelV2's "prologue" phase (page scroll stays locked).
 */

const STAGES = [
  {
    num: "01", key: "Background", ko: "전공에서 배운 지식", en: "Earth Resources System Engineering", sub: "세종대학교 지구자원시스템공학 전공",
    body: "전공 지식이 실제 산업에서 어떻게 활용되는지 경험하고자 한국석유공사에 지원",
  },
  {
    num: "02", key: "Experience", ko: "현장에서 경험한 협업", en: "Multidisciplinary Collaboration", sub: "Geology · Geophysics · Reservoir Engineering",
    body: "교육과 회의 참석을 통해 석유개발이 다양한 기술 분야의 협업으로 이루어진다는 점을 이해",
  },
  {
    num: "03", key: "Outcome", ko: "배움을 디지털 결과물로", en: "Digital Knowledge Portal", sub: "Oil & Gas Development Website",
    body: "인턴 기간에 학습한 석유개발 기술을 체계적으로 정리하고 AI를 활용해 홈페이지를 제작",
  },
];
const LAST = STAGES.length;

function Strata() {
  return (
    <svg viewBox="0 0 120 64" className={s.glyph} aria-hidden>
      <path d="M0,16 C30,8 70,10 120,18 L120,30 C80,24 40,22 0,30 Z" className={s.band1} />
      <path d="M0,30 C40,22 80,24 120,30 L120,44 C80,38 40,38 0,46 Z" className={s.band2} />
      <path d="M0,46 C40,38 80,38 120,44 L120,64 L0,64 Z" className={s.band3} />
      <line x1="60" y1="0" x2="60" y2="52" className={s.wellLine} />
      <circle cx="60" cy="52" r="3" className={s.wellDot} />
    </svg>
  );
}

function Disciplines() {
  return (
    <svg viewBox="0 0 120 64" className={s.glyph} aria-hidden>
      <circle cx="44" cy="26" r="20" className={s.ring} />
      <circle cx="76" cy="26" r="20" className={s.ring} />
      <circle cx="60" cy="44" r="20" className={s.ringBlue} />
      <text x="34" y="24" className={s.ringText}>G</text>
      <text x="80" y="24" className={s.ringText}>GP</text>
      <text x="54" y="54" className={s.ringTextBlue}>RE</text>
    </svg>
  );
}

/** A small browser window showing the homepage hero */
function MiniSite() {
  return (
    <div className={s.browser} aria-hidden>
      <div className={s.browserBar}>
        <i /><i /><i />
        <span className={s.url}>homepage-sukyung.vercel.app</span>
      </div>
      <div className={s.browserView}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero-surface.webp" alt="" className={s.browserImg} />
        <span className={s.browserNav}><b>Oil &amp; Gas</b> Development</span>
        <span className={s.browserTitle}>Oil &amp; Gas<br />Development</span>
      </div>
    </div>
  );
}

const VISUALS = [<Strata key="a" />, <Disciplines key="b" />, <MiniSite key="c" />];

export function Prologue({ onBegin }: { onBegin: () => void }) {
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const next = useCallback(() => setStep((n) => Math.min(LAST, n + 1)), []);
  const back = useCallback(() => setStep((n) => Math.max(0, n - 1)), []);

  // Space / → / PageDown advance, ← / PageUp go back. Held keys do not repeat; Space never starts the intro.
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      const k = e.code;
      if (k === "Space" || k === "ArrowRight" || k === "PageDown" || k === "ArrowDown") {
        e.preventDefault();
        if (!e.repeat) next();
      } else if (k === "ArrowLeft" || k === "PageUp" || k === "ArrowUp") {
        e.preventDefault();
        if (!e.repeat) back();
      }
    };
    // a focused button would otherwise "click" on Space keyup
    const onUp = (e: KeyboardEvent) => { if (e.code === "Space") e.preventDefault(); };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => { window.removeEventListener("keydown", onDown); window.removeEventListener("keyup", onUp); };
  }, [next, back]);

  const done = step >= LAST;
  // fade out, then hand over to the Hero (immediately with reduced motion)
  const begin = () => {
    if (leaving) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return onBegin();
    setLeaving(true);
    window.setTimeout(onBegin, 500);
  };
  return (
    <section className={s.prologue} aria-label="Self-introduction" data-step={step} data-leaving={leaving || undefined}>
      <div className={s.inner}>
        <header className={s.head}>
          <span className={s.kicker}>KNOC <span>/</span> Internship Final Presentation</span>
          <h1 className={s.title}>From Academic Knowledge<br />to Industry Experience.</h1>
          <p className={s.presenter}>
            <b>어수경</b>
            <span>한국석유공사 미주/유럽기술팀 인턴</span>
          </p>
        </header>

        <ol className={s.stages} aria-live="polite">
          {STAGES.map((st, i) => {
            const shown = step > i;
            return (
              <li key={st.num} className={s.stage} data-shown={shown || undefined} aria-hidden={!shown}>
                {i > 0 && <span className={s.link} data-shown={shown || undefined} aria-hidden />}
                <div className={s.card}>
                  <div className={s.cardHead}>
                    <span className={s.num}>{st.num}</span>
                    <span className={s.stageKey}>{st.key}</span>
                  </div>
                  <div className={s.visual}>{VISUALS[i]}</div>
                  <span className={s.ko}>{st.ko}</span>
                  <h2 className={s.en}>{st.en}</h2>
                  <span className={s.sub}>{st.sub}</span>
                  <p className={s.body}>{st.body}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <footer className={s.foot}>
          <div className={s.why} data-shown={done || undefined} aria-hidden={!done}>
            <span className={s.kickerBlue}>Why I built this</span>
            <p className={s.whyTitle}>Turning What I Learned Into Something I Can Share.</p>
            <p className={s.whyBody}>석유개발의 전반적인 과정과 주요 기술에 대한 배움을 체계적으로 정리하고, AI를 활용해 직관적인 기술 지식 홈페이지로 구현했습니다.</p>
          </div>
          <div className={s.actions}>
            {done ? (
              <button type="button" className={s.begin} onClick={begin}>
                Explore the Website <ArrowRight size={16} aria-hidden />
              </button>
            ) : (
              <span className={s.beginSlot} aria-hidden />
            )}
            <div className={s.stepper}>
              <button type="button" className={s.stepBtn} onClick={(e) => { back(); e.currentTarget.blur(); }} disabled={step === 0} aria-label="Previous step"><ArrowLeft size={14} aria-hidden /></button>
              <span className={s.dots} aria-label={`Step ${step} of ${LAST}`}>
                {STAGES.map((st, i) => <i key={st.num} data-on={step > i || undefined} />)}
              </span>
              <button type="button" className={s.stepBtn} onClick={(e) => { next(); e.currentTarget.blur(); }} disabled={done} aria-label="Next step"><ArrowRight size={14} aria-hidden /></button>
            </div>
            <span className={s.keys}>Space / → next · ← back</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
