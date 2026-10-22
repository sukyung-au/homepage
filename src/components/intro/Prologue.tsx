"use client";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AboutContent, aboutStyles as s, LAST, STAGES } from "@/components/about/AboutContent";

/**
 * Presenter-driven self-introduction shown after the v2 intro reel on /presentation, before the Hero — the
 * About Me content (components/about) revealed card by card.
 * Step 0 shows the title and presenter; each Space / → reveals the next card (← steps back). After the third
 * card the "Why I built this" message and EXPLORE THE WEBSITE appear — the Hero opens only from that button,
 * never from another key press. Rendered as ShowReelV2's "prologue" phase (page scroll stays locked).
 */

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
      <AboutContent
        step={step}
        actions={
          <>
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
          </>
        }
      />
    </section>
  );
}
