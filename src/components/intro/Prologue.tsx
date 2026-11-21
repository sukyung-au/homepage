"use client";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import s from "./Prologue.module.css";

/**
 * Presenter-driven self-introduction shown after the v2 intro reel on /presentation, before the Hero.
 * Cards follow the opening script: 01 major → 02 motivation → 03 internship growth. Step 0 shows the title and presenter; each Space / → reveals the next card (← steps back). After the third
 * card EXPLORE MY JOURNEY appears — the Hero opens only from that button,
 * never from another key press. Rendered as ShowReelV2's "prologue" phase (page scroll stays locked).
 */

const STAGES = [
  {
    num: "01", key: "Background", ko: "전공 배경", en: "Earth Resources System Engineering", sub: "세종대학교 지구자원시스템공학 전공",
    body: "지질과 지하자원에 관한 다양한 전공 지식 습득",
  },
  {
    num: "02", key: "Motivation", ko: "지원동기", en: "From Theory to Practice", sub: "Academic Knowledge → Industry Field",
    body: <>전공 지식이 실제 산업 현장에서 어떻게 활용되는지<br className="br-d" /> 직접 경험하고자 한국석유공사 인턴 지원</>,
  },
  {
    num: "03", key: "Growth", ko: "인턴십 경험", en: "Learning & Growth", sub: "KNOC Internship",
    body: <>다양한 교육과 경험을 통해 석유개발에 대한 이해를 넓히고<br className="br-d" /> 한 단계 성장</>,
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

/** An open book (academic knowledge) → a drilling rig on the ground line (the industry field) */
function TheoryToPractice() {
  return (
    <svg viewBox="0 0 120 64" className={s.glyph} aria-hidden>
      <path d="M24,18 C18,14 10,14 4,16 V44 C10,42 18,42 24,46 C30,42 38,42 44,44 V16 C38,14 30,14 24,18 Z" className={s.lineSoft} />
      <path d="M24,18 V46 M9,23 H19 M9,29 H19 M9,35 H17 M29,23 H39 M29,29 H39 M29,35 H37" className={s.line} />
      <path d="M52,31 H70" className={s.lineBlueDash} />
      <path d="M67,27 L71,31 L67,35" className={s.lineBlue} />
      <path d="M78,50 H118" className={s.line} />
      <path d="M89,50 L98,8 L107,50 M92,36 H104 M94.5,24 H101.5 M92,36 L104,50 M104,36 L92,50" className={s.lineNavy} />
      <circle cx="98" cy="8" r="2.4" className={s.dotBlue} />
      <text x="24" y="60" className={s.glyphText} textAnchor="middle">Academic</text>
      <text x="98" y="60" className={s.glyphTextBlue} textAnchor="middle">Industry</text>
    </svg>
  );
}

/** Rising steps: education and experience building up through the internship */
function Growth() {
  return (
    <svg viewBox="0 0 120 64" className={s.glyph} aria-hidden>
      <path d="M4,56 H116" className={s.line} />
      <path d="M10,56 V48 H34 V38 H58 V28 H82 V18 H106" className={s.lineNavy} />
      <path d="M82,18 H106" className={s.lineBlue} />
      <circle cx="10" cy="48" r="2.4" className={s.dotNavy} />
      <circle cx="34" cy="38" r="2.4" className={s.dotNavy} />
      <circle cx="58" cy="28" r="2.4" className={s.dotNavy} />
      <circle cx="82" cy="18" r="2.4" className={s.dotNavy} />
      <path d="M106,18 V4 M101,9 L106,4 L111,9" className={s.lineBlue} />
    </svg>
  );
}

const VISUALS = [<Strata key="a" />, <TheoryToPractice key="b" />, <Growth key="c" />];

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
          <div />
          <div className={s.actions}>
            {done ? (
              <button type="button" className={s.begin} onClick={begin}>
                Explore My Journey <ArrowRight size={16} aria-hidden />
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
