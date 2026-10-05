"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import b from "./bottomNav.module.css";
import s from "./StageNav.module.css";

export interface StageNavItem {
  id: string;
  num: string;
  label: string;
}

export interface StageNavProps {
  stages: StageNavItem[];
  /** Index of the current stage */
  current?: number;
  onSelect?: (index: number) => void;
  cta?: string;
  onCta?: () => void;
  /** 'fixed' on pages (16px from bottom); 'relative' in previews */
  position?: "fixed" | "relative";
  /** Max number of stages shown in the middle window */
  windowSize?: number;
  style?: CSSProperties;
}

/**
 * Sticky bottom navigation showing where the reader is in the development journey.
 * Current stage on the left, a sliding stage window in the middle, progress pips + CTA on the right.
 */
export function StageNav({ stages, current = 0, onSelect, cta = "Explore the Journey", onCta, position = "fixed", windowSize = 5, style }: StageNavProps) {
  const box = useRef<HTMLDivElement>(null);
  const [ws, setWs] = useState(windowSize);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWs(Math.max(1, Math.min(windowSize, Math.floor(el.clientWidth / 150)))));
    ro.observe(el);
    return () => ro.disconnect();
  }, [windowSize]);

  const cur = stages[current];
  const n = stages.length;
  const start = Math.max(0, Math.min(current - (ws > 2 ? 1 : 0), n - ws));
  const vis = stages.slice(start, start + ws);

  return (
    <nav aria-label="Development stages" className={position === "fixed" ? `${b.nav} ${b.fixed}` : b.nav} style={{ position, ...style }}>
      <div className={b.inner}>
        <div className={`${b.shell} ${b.bar}`}>
          <div className={b.current}>
            <span className={b.badge} />
            <div className={b.currentText}>
              <span className={b.kicker}>Current Stage</span>
              <span className={b.currentLabel} aria-live="polite">
                <span className={b.num}>{cur?.num}</span>
                {cur?.label}
                <ArrowRight size={14} aria-hidden />
              </span>
            </div>
          </div>
          <span className={b.divider} />
          <div ref={box} className={b.items} style={{ gridTemplateColumns: `repeat(${vis.length},minmax(0,1fr))` }}>
            {vis.map((st) => {
              const i = stages.indexOf(st), on = i === current, past = i < current;
              const cls = [b.item, on && b.on, past && s.past].filter(Boolean).join(" ");
              return (
                <button key={st.id} type="button" className={cls} onClick={() => onSelect?.(i)} aria-current={on ? "step" : undefined}>
                  <span className={b.itemNum}>{st.num}</span>
                  <span className={b.itemLabel}>{st.label}</span>
                </button>
              );
            })}
          </div>
          <div className={b.end}>
            <div className={s.pips} aria-hidden>
              {stages.map((st, i) => (
                <span key={st.id} className={[s.pip, i < current && s.pipDone, i === current && s.pipOn].filter(Boolean).join(" ")} />
              ))}
            </div>
            <button type="button" className={b.textAction} onClick={onCta}>
              {cta}
              <ArrowRight size={14} aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
